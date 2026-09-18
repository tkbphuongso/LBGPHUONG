import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { SchoolConfigModal } from "./components/SchoolConfigModal";
import { TimetableManager } from "./components/TimetableManager";
import { LichBaoGiangView } from "./components/LichBaoGiangView";
import { KHBDView } from "./components/KHBDView";
import { TeacherScheduleExport } from "./components/TeacherScheduleExport";
import { IntegrationDirectory } from "./components/IntegrationDirectory";
import { AIGeneratorModal } from "./components/AIGeneratorModal";
import { KHBDUploadModal } from "./components/KHBDUploadModal";
import {
  DEFAULT_SCHOOL_CONFIG,
  DEFAULT_TIMETABLE_SLOTS,
  DEFAULT_TEACHERS,
  SCHOOL_CLASSES,
} from "./data/defaultTimetable";
import { CLASS_GVCN_MAP } from "./data/officialTimetableData";
import { SAMPLE_LESSON_PLANS_WEEK_1, buildSyncedWeekKHBD } from "./data/curriculumData";
import { GradeNumber, KHBDLessonPlan, LBGItem, SchoolConfig, TeacherInfo, TimetableSlot } from "./types";
import { Upload, Sparkles, RefreshCw } from "lucide-react";
import { calculateWeekDates, getDateForDay } from "./utils/dateHelper";

export function App() {
  const [config, setConfig] = useState<SchoolConfig>(DEFAULT_SCHOOL_CONFIG);
  const [slots, setSlots] = useState<TimetableSlot[]>(DEFAULT_TIMETABLE_SLOTS);
  const [teachers, setTeachers] = useState<TeacherInfo[]>(DEFAULT_TEACHERS);
  const [classes] = useState<string[]>(SCHOOL_CLASSES);
  const [activeTab, setActiveTab] = useState<"tkb" | "lbg" | "khbd" | "teachers" | "integration">("lbg");

  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [aiTargetLessonPlan, setAiTargetLessonPlan] = useState<KHBDLessonPlan | null>(null);

  // Quick TKB Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadText, setUploadText] = useState<string>("");
  const [isParsingAI, setIsParsingAI] = useState<boolean>(false);

  // KHBD / KHDH Upload Modal state
  const [isKHBDUploadOpen, setIsKHBDUploadOpen] = useState<boolean>(false);

  // Lesson plans master state
  const [lessonPlans, setLessonPlans] = useState<KHBDLessonPlan[]>(() => {
    return buildSyncedWeekKHBD(DEFAULT_TIMETABLE_SLOTS, DEFAULT_SCHOOL_CONFIG, SAMPLE_LESSON_PLANS_WEEK_1);
  });

  // User customized lesson plans map (preserves edits across teachers and weeks)
  const [customPlansMap, setCustomPlansMap] = useState<Record<string, KHBDLessonPlan>>({});

  const handleSaveCustomPlan = (plan: KHBDLessonPlan) => {
    setCustomPlansMap((prev) => {
      const updated = { ...prev };
      updated[plan.id] = plan;
      if (plan.className && plan.day && plan.period) {
        updated[`khbd_cls_${plan.className}_${plan.day}_${plan.session}_${plan.period}`] = plan;
        updated[`cls_${plan.className}_${plan.day}_${plan.session}_${plan.period}`] = plan;
        updated[`slot_w${plan.week || config.currentWeek}_c${plan.className}_d${plan.day}_s${plan.session}_p${plan.period}`] = plan;
      }
      if (plan.subject && plan.ppct) {
        const cleanSubj = plan.subject.replace(/\s*\(.*?\)/g, "").trim();
        updated[`subj_${cleanSubj}_g${plan.grade || config.currentGrade}_p${plan.ppct}`] = plan;
        updated[`subj_${cleanSubj}_w${plan.week || config.currentWeek}_p${plan.ppct}`] = plan;
      }
      return updated;
    });
  };

  const handleApplyUploadedKHBD = (
    plans: KHBDLessonPlan[],
    targetWeek: number,
    targetGrade: GradeNumber,
    targetClass: string
  ) => {
    // 1. Update config if target class, week, or grade differs
    setConfig((prev) => ({
      ...prev,
      currentWeek: targetWeek,
      currentGrade: targetGrade,
      currentClass: targetClass,
    }));

    // 2. Index into customPlansMap with comprehensive lookup keys
    setCustomPlansMap((prev) => {
      const updated = { ...prev };
      plans.forEach((plan) => {
        updated[plan.id] = plan;
        if (plan.className && plan.day && plan.period) {
          updated[`khbd_cls_${plan.className}_${plan.day}_${plan.session}_${plan.period}`] = plan;
          updated[`cls_${plan.className}_${plan.day}_${plan.session}_${plan.period}`] = plan;
          updated[`slot_w${targetWeek}_c${plan.className}_d${plan.day}_s${plan.session}_p${plan.period}`] = plan;
        }
        if (plan.subject && plan.ppct) {
          const cleanSubj = plan.subject.replace(/\s*\(.*?\)/g, "").trim();
          updated[`subj_${cleanSubj}_g${targetGrade}_p${plan.ppct}`] = plan;
          updated[`subj_${cleanSubj}_w${targetWeek}_p${plan.ppct}`] = plan;
        }
      });
      return updated;
    });

    // 3. Update master lesson plans
    setLessonPlans((prev) => {
      const map = new Map<string, KHBDLessonPlan>();
      prev.forEach((p) => map.set(p.id, p));
      plans.forEach((p) => map.set(p.id, p));
      return Array.from(map.values());
    });
  };

  // Derive LBG items from active class timetable slots
  const [lbgItems, setLbgItems] = useState<LBGItem[]>([]);

  // Synchronize both LBG and KHBD whenever slots or class/week changes
  useEffect(() => {
    const targetClass = config.currentClass;
    const generatedLBG: LBGItem[] = [];

    // Order slots by day and session/period
    const sortedSlots = [...slots].sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      if (a.session !== b.session) return a.session === "Sáng" ? -1 : 1;
      return a.period - b.period;
    });

    // Synchronize KHBD for current class & week
    const syncedKHBD = buildSyncedWeekKHBD(sortedSlots, config, lessonPlans);
    setLessonPlans(syncedKHBD);

    let periodCounter = 1;
    let currentDay = 0;

    sortedSlots.forEach((slot) => {
      if (slot.day !== currentDay) {
        currentDay = slot.day;
        periodCounter = 1;
      }

      const classEntry = slot.classSubjectMap[targetClass];
      const subject = classEntry?.subject || "Tự học / GD rèn luyện";

      // Match with known KHBD if available
      const matchedPlan = syncedKHBD.find(
        (p) => p.day === slot.day && p.period === slot.period && p.session === slot.session
      );

      const slotDateStr = getDateForDay(config.currentWeek || 1, slot.day, config.startDate);

      generatedLBG.push({
        id: `lbg_${slot.day}_${slot.session}_${slot.period}`,
        day: slot.day,
        dayName: slot.dayName,
        dateStr: slotDateStr,
        session: slot.session,
        period: slot.period,
        overallPeriodOfDay: periodCounter,
        subject: subject,
        ppctLessonNumber: matchedPlan?.ppct || periodCounter,
        lessonTitle: matchedPlan?.title || `Tiết dạy ${subject} theo PPCT tuần ${config.currentWeek}`,
        integrationNote: "", // Blank by default per requirement: "Thiết kế LBG bỏ cột tích hợp thay ghi chú ( bỏ trống )"
        teacherName: classEntry?.teacherName || config.currentTeacher,
        className: config.currentClass,
        grade: config.currentGrade,
      });

      periodCounter++;
    });

    setLbgItems(generatedLBG);
  }, [config.currentClass, config.currentGrade, config.currentWeek, slots, config.startDate]);

  const handleUpdateConfig = (newConfig: Partial<SchoolConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };

      // Auto update startDate and endDate when currentWeek changes
      if (newConfig.currentWeek && newConfig.currentWeek !== prev.currentWeek) {
        const weekDates = calculateWeekDates(newConfig.currentWeek, prev.startDate);
        updated.startDate = weekDates.startDate;
        updated.endDate = weekDates.endDate;
      }

      // Auto-assign teacher if class switched and no custom teacher set
      if (newConfig.currentClass && newConfig.currentClass !== prev.currentClass) {
        updated.currentClass = newConfig.currentClass;
        if (!newConfig.currentTeacher) {
          updated.currentTeacher = CLASS_GVCN_MAP[newConfig.currentClass] || updated.currentTeacher;
        }
      }

      // Auto-assign teacher if grade switched and no custom teacher set
      if (newConfig.currentGrade && newConfig.currentGrade !== prev.currentGrade) {
        const grade = newConfig.currentGrade;
        if (grade === 1) {
          updated.currentTeacher = "Cô Phan Nguyễn Thị Kiều Phương";
          updated.currentClass = "1A1";
        } else if (grade === 2) {
          updated.currentTeacher = "Cô Thúy";
          updated.currentClass = "2A1";
        } else if (grade === 3) {
          updated.currentTeacher = "Cô K. Ngân";
          updated.currentClass = "3A1";
        } else if (grade === 4) {
          updated.currentTeacher = "Cô D. Hằng";
          updated.currentClass = "4A3";
        } else if (grade === 5) {
          updated.currentTeacher = "Cô Linh";
          updated.currentClass = "5A1";
        }
      }
      return updated;
    });
  };

  const handleOpenAIForLesson = (plan: KHBDLessonPlan) => {
    setAiTargetLessonPlan(plan);
    setIsAIModalOpen(true);
  };

  const handleApplyAILessonPlan = (newPlan: KHBDLessonPlan) => {
    handleSaveCustomPlan(newPlan);
    const exists = lessonPlans.some((p) => p.id === newPlan.id);
    if (exists) {
      setLessonPlans(lessonPlans.map((p) => (p.id === newPlan.id ? newPlan : p)));
    } else {
      setLessonPlans([newPlan, ...lessonPlans]);
    }
  };

  // AI TKB Text parser and synchronizer
  const handleAITKBParse = async () => {
    if (!uploadText.trim()) return;
    setIsParsingAI(true);
    try {
      const res = await fetch("/api/gemini/parse-tkb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: uploadText }),
      });
      const data = await res.json();
      if (data.success && data.data && data.data.schedule) {
        const newSlots = [...slots];
        data.data.schedule.forEach((parsedItem: any) => {
          const idx = newSlots.findIndex(
            (s) => s.day === parsedItem.day && s.period === parsedItem.period && s.session === parsedItem.session
          );
          if (idx >= 0) {
            newSlots[idx].classSubjectMap = {
              ...newSlots[idx].classSubjectMap,
              ...parsedItem.classAssignments,
            };
          }
        });
        setSlots(newSlots);
        setIsUploadModalOpen(false);
        setUploadText("");
      }
    } catch (err) {
      console.error(err);
      setIsUploadModalOpen(false);
    } finally {
      setIsParsingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Primary Header */}
      <Header
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
        onOpenAIModal={() => {
          setAiTargetLessonPlan(null);
          setIsAIModalOpen(true);
        }}
        onOpenKHBDUpload={() => setIsKHBDUploadOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "tkb" && (
          <TimetableManager
            slots={slots}
            onUpdateSlots={setSlots}
            config={config}
            teachers={teachers}
            classes={classes}
          />
        )}

        {activeTab === "lbg" && (
          <LichBaoGiangView
            teachers={teachers}
            slots={slots}
            config={config}
            onUpdateConfig={handleUpdateConfig}
            classes={classes}
            customPlansMap={customPlansMap}
            onSaveCustomPlan={handleSaveCustomPlan}
            onOpenKHBDUpload={() => setIsKHBDUploadOpen(true)}
          />
        )}

        {activeTab === "khbd" && (
          <KHBDView
            teachers={teachers}
            slots={slots}
            config={config}
            onUpdateConfig={handleUpdateConfig}
            classes={classes}
            onOpenAIModalForLesson={handleOpenAIForLesson}
            customPlansMap={customPlansMap}
            onSaveCustomPlan={handleSaveCustomPlan}
            onOpenKHBDUpload={() => setIsKHBDUploadOpen(true)}
          />
        )}

        {activeTab === "teachers" && (
          <TeacherScheduleExport
            teachers={teachers}
            slots={slots}
            config={config}
            classes={classes}
            masterLBG={lbgItems}
            masterKHBD={lessonPlans}
          />
        )}

        {activeTab === "integration" && <IntegrationDirectory />}
      </main>

      {/* Footer info */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Hệ Thống Quản Lý TKB, LBG & KHBD - Trường Tiểu Học Tân Thạnh (Xã Tân Thạnh)</span>
            <span>•</span>
            <span>Chuẩn Công Văn 2345/BGDĐT & GDPT 2018</span>
          </div>
          <div>
            Xuất Word font 12, 13, 14 • LBG 7 tiết/ngày • Bỏ cột tích hợp thay ghi chú • Đồng bộ TKB & KHBD tức thì
          </div>
        </div>
      </footer>

      {/* Configuration Modal */}
      <SchoolConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={config}
        onSave={(newCfg) => setConfig(newCfg)}
      />

      {/* AI Generator Modal */}
      <AIGeneratorModal
        isOpen={isAIModalOpen}
        onClose={() => {
          setIsAIModalOpen(false);
          setAiTargetLessonPlan(null);
        }}
        config={config}
        initialLessonPlan={aiTargetLessonPlan}
        onApplyPlan={handleApplyAILessonPlan}
      />

      {/* Global TKB Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Đưa Thời Khóa Biểu Mới Lên - Tự Động Đồng Bộ LBG & KHBD
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                📌 <strong>Quy trình đồng bộ:</strong> Dán văn bản TKB trường học hoặc dữ liệu phân công mới thay đổi vào khung bên dưới. Khi bấm Cập nhật, hệ thống sẽ tự động điều chỉnh cả Thời Khóa Biểu, Lịch Báo Giảng và Kế Hoạch Bài Dạy (kể cả các môn giáo viên chuyên: GDTC, Âm nhạc, Mĩ thuật, Tiếng Anh, Tin học).
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung TKB (Sao chép từ Word, Excel hoặc nhập tay):
                </label>
                <textarea
                  rows={8}
                  value={uploadText}
                  onChange={(e) => setUploadText(e.target.value)}
                  placeholder={`Ví dụ:\nThứ Hai: Sáng: HĐTN(CC), TV, TV, Toán | Chiều: TV, TV, TNXH\nThứ Ba: Sáng: Toán, TCTH, HĐTT, Đạo đức | Chiều: GDTC(Nhàn), GDTC(Nhàn), HĐTN\nThứ Tư: Sáng: TV, TV, Toán, MT(Thy), BDMT(Thy) | Chiều: TV, TV, TNXH\nThứ Năm: Sáng: AN(Tuệ), BDAN(Tuệ), TV, TV, TNXH | Chiều: SHCM\nThứ Sáu: Sáng: TV, TV, Toán, T.cường T, HĐTN(SHL) | Chiều: TV, TV, Toán`}
                  className="w-full text-xs font-mono p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Tải mẫu nhanh:</span>
                <button
                  type="button"
                  onClick={() => {
                    setUploadText(`THỜI KHÓA BIỂU NĂM HỌC 2025-2026 - TRƯỜNG TIỂU HỌC TÂN THẠNH
Lớp 1A - GV: Cô Phan Nguyễn Thị Kiều Phương
Thứ Hai: Sáng: HĐTN(CC), TV, TV, Toán | Chiều: TV, TV, TNXH
Thứ Ba: Sáng: Toán, TCTH, HĐTT, Đạo đức | Chiều: GDTC(Nhàn), GDTC(Nhàn), HĐTN(Kiều Phương)
Thứ Tư: Sáng: TV, TV, Toán, MT(Thy), BDMT(Thy) | Chiều: TV, TV, TNXH
Thứ Năm: Sáng: AN(Tuệ), BDAN(Tuệ), TV, TV, TNXH | Chiều: SHCM
Thứ Sáu: Sáng: TV, TV, Toán, T.cường T, HĐTN(SHL) | Chiều: TV, TV, Toán`);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition font-medium cursor-pointer"
                >
                  Tải mẫu TKB Lớp 1A (Cô Kiều Phương)
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-2 bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={handleAITKBParse}
                disabled={isParsingAI || !uploadText.trim()}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                {isParsingAI ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang phân tích & Đồng bộ TKB...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Cập Nhật & Đồng Bộ Toàn Bộ LBG/KHBD</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KHBD & KHDH Upload Modal */}
      <KHBDUploadModal
        isOpen={isKHBDUploadOpen}
        onClose={() => setIsKHBDUploadOpen(false)}
        config={config}
        onApplyPlans={handleApplyUploadedKHBD}
      />
    </div>
  );
}

export default App;

