import React, { useState, useMemo } from "react";
import {
  FileText,
  Download,
  FileDown,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  Calendar,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Tag,
  Layers,
  User,
  School,
  Clock,
  Search,
  Filter,
  Check,
  Printer,
  ShieldCheck,
  Award,
  Sun,
  Sunset,
  Info,
  Upload,
} from "lucide-react";
import { KHBDLessonPlan, LBGItem, SchoolConfig, TeacherInfo, TimetableSlot } from "../types";
import { exportKHBDToWord, exportTKBToWord } from "../utils/docxExport";
import { INTEGRATION_CATEGORIES } from "../data/curriculumData";
import { buildTeacherLBGAndKHBD, buildClassLBGAndKHBD } from "../utils/teacherScheduleHelper";
import { CLASS_GVCN_MAP } from "../data/officialTimetableData";

interface KHBDViewProps {
  teachers: TeacherInfo[];
  slots: TimetableSlot[];
  config: SchoolConfig;
  onUpdateConfig: (newConfig: Partial<SchoolConfig>) => void;
  classes: string[];
  onOpenAIModalForLesson: (lessonPlan: KHBDLessonPlan) => void;
  customPlansMap?: Record<string, KHBDLessonPlan>;
  onSaveCustomPlan?: (plan: KHBDLessonPlan) => void;
  onOpenKHBDUpload?: () => void;
}

export const KHBDView: React.FC<KHBDViewProps> = ({
  teachers,
  slots,
  config,
  onUpdateConfig,
  classes,
  onOpenAIModalForLesson,
  customPlansMap = {},
  onSaveCustomPlan,
  onOpenKHBDUpload,
}) => {
  // Mode: "teacher" (soạn riêng cho từng giáo viên) or "class" (xem theo lớp học)
  const [viewMode, setViewMode] = useState<"teacher" | "class">("teacher");

  // Selected teacher for teacher mode
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(() => {
    // Default to teacher matching config.currentTeacher
    const matched = teachers.find(
      (t) =>
        t.name.toLowerCase().includes(config.currentTeacher.toLowerCase()) ||
        config.currentTeacher.toLowerCase().includes(t.name.toLowerCase()) ||
        (t.shortName && config.currentTeacher.toLowerCase().includes(t.shortName.toLowerCase()))
    );
    return matched?.id || teachers[0]?.id || "t-kieu-phuong";
  });

  // Selected class for class mode
  const [selectedClass, setSelectedClass] = useState<string>(config.currentClass || "1A1");

  // Day filter
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | "all">("all");

  // Font size for export
  const [selectedFontSize, setSelectedFontSize] = useState<12 | 13 | 14>(config.fontSize || 13);

  // Search query for teacher selector
  const [teacherSearchQuery, setTeacherSearchQuery] = useState<string>("");
  const [teacherFilterTab, setTeacherFilterTab] = useState<"all" | "gvcn" | "specialist">("all");

  // Integration selector popup
  const [showIntegrationSelector, setShowIntegrationSelector] = useState<boolean>(false);

  // Save notification toast
  const [savedToastMessage, setSavedToastMessage] = useState<string | null>(null);

  // Active teacher object
  const activeTeacher = useMemo(() => {
    return teachers.find((t) => t.id === selectedTeacherId) || teachers[0];
  }, [teachers, selectedTeacherId]);

  // Derived LBG & KHBD based on current view mode
  const { currentLBGItems, currentKHBDPlans } = useMemo(() => {
    if (viewMode === "teacher" && activeTeacher) {
      const { teacherLBGItems, teacherKHBDPlans } = buildTeacherLBGAndKHBD(
        activeTeacher,
        slots,
        config,
        customPlansMap
      );
      return { currentLBGItems: teacherLBGItems, currentKHBDPlans: teacherKHBDPlans };
    } else {
      const { classLBGItems, classKHBDPlans } = buildClassLBGAndKHBD(
        selectedClass,
        slots,
        config,
        customPlansMap
      );
      return { currentLBGItems: classLBGItems, currentKHBDPlans: classKHBDPlans };
    }
  }, [viewMode, activeTeacher, selectedClass, slots, config, customPlansMap]);

  // Selected active plan ID
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  // Ensure an active plan is selected
  const activePlan = useMemo(() => {
    if (!currentKHBDPlans || currentKHBDPlans.length === 0) return null;
    const found = currentKHBDPlans.find((p) => p.id === selectedPlanId);
    return found || currentKHBDPlans[0];
  }, [currentKHBDPlans, selectedPlanId]);

  // Filtered plans list
  const filteredPlans = useMemo(() => {
    if (selectedDayFilter === "all") return currentKHBDPlans;
    return currentKHBDPlans.filter((p) => p.day === selectedDayFilter);
  }, [currentKHBDPlans, selectedDayFilter]);

  // Filtered teachers list for teacher dropdown
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(teacherSearchQuery.toLowerCase()) ||
        t.role.toLowerCase().includes(teacherSearchQuery.toLowerCase()) ||
        (t.shortName && t.shortName.toLowerCase().includes(teacherSearchQuery.toLowerCase())) ||
        (t.assignedClasses && t.assignedClasses.some((c) => c.toLowerCase().includes(teacherSearchQuery.toLowerCase())));

      if (!matchesSearch) return false;

      if (teacherFilterTab === "gvcn") return !t.isSpecialist;
      if (teacherFilterTab === "specialist") return t.isSpecialist;
      return true;
    });
  }, [teachers, teacherSearchQuery, teacherFilterTab]);

  // Switch active teacher
  const handleSelectTeacher = (teacher: TeacherInfo) => {
    setSelectedTeacherId(teacher.id);
    onUpdateConfig({
      currentTeacher: teacher.name,
      ...(teacher.assignedClasses && teacher.assignedClasses.length > 0
        ? { currentClass: teacher.assignedClasses[0] }
        : {}),
    });
    // Reset active plan
    setSelectedPlanId("");
  };

  // Switch active class
  const handleSelectClass = (cls: string) => {
    setSelectedClass(cls);
    const grade = (parseInt(cls.charAt(0), 10) || 1) as 1 | 2 | 3 | 4 | 5;
    onUpdateConfig({
      currentClass: cls,
      currentGrade: grade,
    });
    setSelectedPlanId("");
  };

  // Save current plan
  const handleSavePlan = (updatedPlan: KHBDLessonPlan) => {
    if (onSaveCustomPlan) {
      onSaveCustomPlan(updatedPlan);
    }
    setSavedToastMessage(`Đã lưu kế hoạch bài dạy: ${updatedPlan.title}`);
    setTimeout(() => setSavedToastMessage(null), 3000);
  };

  // Add an activity step to active plan
  const handleAddActivity = () => {
    if (!activePlan) return;
    const standardSteps = [
      "1. Hoạt động khởi động",
      "2. Hoạt động hình thành kiến thức mới (nếu có)",
      "3. Hoạt động luyện tập thực hành",
      "4. Hoạt động vận dụng, trải nghiệm",
    ];
    const nextIdx = activePlan.activities.length;
    const defaultStepName = nextIdx < 4 ? standardSteps[nextIdx] : `${nextIdx + 1}. Hoạt động mở rộng, trải nghiệm`;

    const newAct = {
      id: `act_${Date.now()}`,
      step: defaultStepName,
      time: "5 - 7 phút",
      target: "Củng cố kiến thức, liên hệ thực tế hoặc rèn luyện nâng cao.",
      teacherActivities: [
        "- Nêu câu hỏi mở hoặc giao nhiệm vụ trải nghiệm.",
        "- Quan sát, hướng dẫn và nhận xét tuyên dương học sinh.",
      ],
      studentActivities: [
        "- Lắng nghe, trao đổi nhóm hoặc liên hệ thực tế bản thân.",
        "- Báo cáo kết quả và tự đánh giá bài làm.",
      ],
    };
    const updated: KHBDLessonPlan = {
      ...activePlan,
      activities: [...activePlan.activities, newAct],
    };
    handleSavePlan(updated);
  };

  // Insert standard integration note
  const handleInsertIntegration = (integrationText: string) => {
    if (!activePlan) return;
    const updated: KHBDLessonPlan = {
      ...activePlan,
      goals: {
        ...activePlan.goals,
        integration: activePlan.goals.integration
          ? `${activePlan.goals.integration}; ${integrationText}`
          : integrationText,
      },
    };
    handleSavePlan(updated);
    setShowIntegrationSelector(false);
  };

  // Export standalone KHBD Word document
  const handleExportStandaloneWord = () => {
    if (currentKHBDPlans.length === 0) return;
    const teacherSlug = activeTeacher?.name.replace(/^(Cô|Thầy|GV)\s+/i, "").replace(/\s+/g, "_") || "GV";
    const customFileName =
      viewMode === "teacher"
        ? `KHBD_Tuan_${config.currentWeek}_GV_${teacherSlug}_Font${selectedFontSize}.docx`
        : `KHBD_Tuan_${config.currentWeek}_Lop_${selectedClass}_Font${selectedFontSize}.docx`;

    const homeroomTeacher = teachers.find((t) => !t.isSpecialist && t.assignedClasses?.includes(selectedClass));
    const classTeacherName = homeroomTeacher?.name || CLASS_GVCN_MAP[selectedClass] || config.currentTeacher;
    const exportTeacherName = viewMode === "teacher" ? activeTeacher.name : classTeacherName;

    exportKHBDToWord(
      currentKHBDPlans,
      {
        ...config,
        fontSize: selectedFontSize,
        currentTeacher: exportTeacherName,
        currentClass: viewMode === "teacher" ? (activeTeacher.assignedClasses?.[0] || config.currentClass) : selectedClass,
      },
      {
        includeLBGPage1: false,
        customFileName,
      }
    );
  };

  // Export combined Word document (Page 1 = Teacher's personal LBG + Pages 2+ = Teacher's KHBD)
  const handleExportCombinedWord = () => {
    if (currentKHBDPlans.length === 0) return;
    const teacherSlug = activeTeacher?.name.replace(/^(Cô|Thầy|GV)\s+/i, "").replace(/\s+/g, "_") || "GV";
    const customFileName =
      viewMode === "teacher"
        ? `Ho_So_Gop_LBG_Kem_KHBD_Tuan_${config.currentWeek}_GV_${teacherSlug}_Font${selectedFontSize}.docx`
        : `Ho_So_Gop_LBG_Kem_KHBD_Tuan_${config.currentWeek}_Lop_${selectedClass}_Font${selectedFontSize}.docx`;

    const homeroomTeacher = teachers.find((t) => !t.isSpecialist && t.assignedClasses?.includes(selectedClass));
    const classTeacherName = homeroomTeacher?.name || CLASS_GVCN_MAP[selectedClass] || config.currentTeacher;
    const exportTeacherName = viewMode === "teacher" ? activeTeacher.name : classTeacherName;

    exportKHBDToWord(
      currentKHBDPlans,
      {
        ...config,
        fontSize: selectedFontSize,
        currentTeacher: exportTeacherName,
        currentClass: viewMode === "teacher" ? (activeTeacher.assignedClasses?.[0] || config.currentClass) : selectedClass,
      },
      {
        includeLBGPage1: true,
        lbgItems: currentLBGItems,
        customFileName,
      }
    );
  };

  // Export teacher timetable
  const handleExportTimetable = () => {
    if (viewMode === "teacher" && activeTeacher) {
      exportTKBToWord(
        slots,
        classes,
        { ...config, fontSize: selectedFontSize, currentTeacher: activeTeacher.name },
        activeTeacher.name
      );
    } else {
      exportTKBToWord(
        slots,
        [selectedClass],
        { ...config, fontSize: selectedFontSize, currentClass: selectedClass }
      );
    }
  };

  const daysList = [
    { day: 2, name: "Thứ Hai" },
    { day: 3, name: "Thứ Ba" },
    { day: 4, name: "Thứ Tư" },
    { day: 5, name: "Thứ Năm" },
    { day: 6, name: "Thứ Sáu" },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {savedToastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{savedToastMessage}</span>
        </div>
      )}

      {/* Primary Header & Mode Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                Công Văn 2345/BGDĐT-GDTH
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Soạn Đúng Phân Công TKB & LBG
              </span>
              <span className="text-xs text-slate-500">
                GDPT 2018 • Trường Tiểu Học Tân Thạnh (Năm học {config.academicYear})
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              {viewMode === "teacher" ? (
                <span>
                  KẾ HOẠCH BÀI DẠY SOẠN RIÊNG:{" "}
                  <span className="text-blue-700">{activeTeacher?.name.toUpperCase()}</span> - TUẦN {config.currentWeek}
                </span>
              ) : (
                <span>
                  KẾ HOẠCH BÀI DẠY TOÀN LỚP: <span className="text-blue-700">LỚP {selectedClass}</span> - TUẦN {config.currentWeek}
                </span>
              )}
            </h2>

            <p className="text-xs text-slate-600 mt-1">
              {viewMode === "teacher" ? (
                <>
                  Giáo viên: <strong>{activeTeacher?.name}</strong> • Nhiệm vụ: <strong>{activeTeacher?.role}</strong> • Tổng số tiết giảng dạy:{" "}
                  <strong className="text-blue-700">{currentKHBDPlans.length} tiết / tuần</strong> • Khối: {activeTeacher?.assignedClasses?.join(", ") || `Khối ${config.currentGrade}`}
                </>
              ) : (
                <>
                  Xem tổng hợp 32 tiết của lớp <strong>{selectedClass}</strong> • GVCN:{" "}
                  <strong>
                    {teachers.find((t) => !t.isSpecialist && t.assignedClasses?.includes(selectedClass))?.name ||
                      CLASS_GVCN_MAP[selectedClass] ||
                      config.currentTeacher}
                  </strong>
                </>
              )}
            </p>
          </div>

          {/* Mode Switch & Font Controls */}
          <div className="flex items-center flex-wrap gap-2">
            {/* View Mode Toggle */}
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode("teacher")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  viewMode === "teacher"
                    ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Soạn Theo Giáo Viên (Khuyên dùng)</span>
              </button>

              <button
                onClick={() => setViewMode("class")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  viewMode === "class"
                    ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <School className="w-3.5 h-3.5 text-emerald-600" />
                <span>Xem Theo Lớp Học</span>
              </button>
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
              <span className="text-xs text-slate-500 font-medium">Cỡ chữ Word:</span>
              <select
                value={selectedFontSize}
                onChange={(e) => {
                  const sz = parseInt(e.target.value, 10) as 12 | 13 | 14;
                  setSelectedFontSize(sz);
                  onUpdateConfig({ fontSize: sz });
                }}
                className="text-xs font-bold bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-800 focus:outline-blue-600 cursor-pointer"
              >
                <option value={12}>12 pt</option>
                <option value={13}>13 pt (Chuẩn)</option>
                <option value={14}>14 pt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Selector Bar (Teacher or Class) */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {viewMode === "teacher" ? (
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quick Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-semibold text-slate-500 mr-1 whitespace-nowrap">
                  Bộ lọc GV:
                </span>
                <button
                  onClick={() => setTeacherFilterTab("all")}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition cursor-pointer whitespace-nowrap ${
                    teacherFilterTab === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Tất cả ({teachers.length})
                </button>
                <button
                  onClick={() => setTeacherFilterTab("gvcn")}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition cursor-pointer whitespace-nowrap ${
                    teacherFilterTab === "gvcn"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  GV Chủ Nhiệm (20)
                </button>
                <button
                  onClick={() => setTeacherFilterTab("specialist")}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition cursor-pointer whitespace-nowrap ${
                    teacherFilterTab === "specialist"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  GV Bộ Môn Chuyên (15)
                </button>
              </div>

              {/* Teacher Search and Dropdown */}
              <div className="flex-1 flex items-center gap-2 max-w-md">
                <div className="relative flex-1">
                  <select
                    value={selectedTeacherId}
                    onChange={(e) => {
                      const t = teachers.find((item) => item.id === e.target.value);
                      if (t) handleSelectTeacher(t);
                    }}
                    className="w-full text-xs font-bold bg-white border border-blue-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden shadow-xs cursor-pointer"
                  >
                    {filteredTeachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold text-slate-500 mr-1 whitespace-nowrap">
                Chọn Lớp Học:
              </span>
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => handleSelectClass(cls)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition cursor-pointer whitespace-nowrap ${
                    selectedClass === cls
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          )}

          {/* Week Selector */}
          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg shrink-0">
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-xs text-blue-900 font-bold">Tuần:</span>
            <select
              value={config.currentWeek}
              onChange={(e) => onUpdateConfig({ currentWeek: parseInt(e.target.value, 10) })}
              className="text-xs font-bold bg-white border border-blue-300 rounded px-2 py-0.5 text-blue-900 focus:outline-blue-600 cursor-pointer"
            >
              {[...Array(35)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tuần {i + 1}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-blue-700 font-medium hidden sm:inline">({config.startDate} - {config.endDate})</span>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {onOpenKHBDUpload && (
              <button
                onClick={onOpenKHBDUpload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
                title="Tải lên file Word (.docx) hoặc dán văn bản KHDH/KHBD để tự động cập nhật bài dạy và phân phối chương trình"
              >
                <Upload className="w-4 h-4" />
                <span>Tải Lên / Đồng Bộ KHBD</span>
              </button>
            )}

            <button
              onClick={handleExportStandaloneWord}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              title="Xuất kế hoạch bài dạy cả tuần ra file Word (Font 12/13/14pt)"
            >
              <Download className="w-4 h-4" />
              <span>Tải KHBD Tuần (Word)</span>
            </button>

            <button
              onClick={handleExportCombinedWord}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              title="Xuất file gộp: Trang 1 là Lịch Báo Giảng + Các trang sau là Kế Hoạch Bài Dạy chi tiết"
            >
              <FileDown className="w-4 h-4" />
              <span>Tải Gộp (LBG + KHBD)</span>
            </button>

            <button
              onClick={handleExportTimetable}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition border border-slate-200 cursor-pointer"
              title="Tải thời khóa biểu cá nhân của giáo viên ra Word"
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Tải TKB Cá Nhân</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Split View (Lesson Navigation List on Left, Active KHBD Plan on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lesson Navigation List */}
        <div className="lg:col-span-4 space-y-3">
          {/* Day Filter Toolbar */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
            <button
              onClick={() => setSelectedDayFilter("all")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                selectedDayFilter === "all"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tất cả ({currentKHBDPlans.length})
            </button>

            {daysList.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDayFilter(d.day)}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                  selectedDayFilter === d.day
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {d.name.replace("Thứ ", "T")}
              </button>
            ))}
          </div>

          {/* Lessons List - Separated into Morning & Afternoon */}
          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredPlans.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p>Không có tiết dạy nào được phân công trong ngày này.</p>
              </div>
            ) : (
              (() => {
                const morningPlans = filteredPlans.filter((p) => p.session === "Sáng");
                const afternoonPlans = filteredPlans.filter((p) => p.session === "Chiều");

                const renderPlanItem = (plan: KHBDLessonPlan, idx: number) => {
                  const isSelected = activePlan?.id === plan.id;
                  const isCustomized = customPlansMap[plan.id] !== undefined;
                  const isSpecialist = plan.isOtherTeacher;

                  return (
                    <button
                      key={plan.id || idx}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`w-full text-left p-3 rounded-xl border transition cursor-pointer relative ${
                        isSelected
                          ? "bg-blue-50/90 border-blue-500 shadow-xs ring-1 ring-blue-500"
                          : isSpecialist
                          ? "bg-amber-50/40 hover:bg-amber-50/90 border-amber-200/80 shadow-xs"
                          : "bg-white hover:bg-slate-50 border-slate-200 shadow-xs"
                      }`}
                    >
                      {/* Header Tags */}
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {plan.dayName} • {plan.session} Tiết {plan.period}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Lớp {plan.className}
                          </span>
                          {isSpecialist ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
                              GV chuyên
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                              PPCT: {plan.ppct}
                            </span>
                          )}
                        </div>

                        {isCustomized && !isSpecialist && (
                          <span className="text-[10px] text-blue-600 font-medium bg-blue-100/70 px-1 rounded">
                            Đã sửa
                          </span>
                        )}
                      </div>

                      {/* Subject & Sub-subject */}
                      <div className="text-xs font-bold text-slate-900 line-clamp-1 flex items-center gap-1">
                        <span>{plan.subject}</span>
                        {plan.subSubject && <span className="font-normal text-slate-500">({plan.subSubject})</span>}
                      </div>

                      {/* Title: If specialist teacher, omit lesson title */}
                      <div className="text-xs line-clamp-2 mt-0.5">
                        {isSpecialist ? (
                          <span className="text-amber-800 font-medium italic">
                            ({plan.teacherName} dạy — Không ghi tên bài học)
                          </span>
                        ) : (
                          <span className="text-slate-600">{plan.title}</span>
                        )}
                      </div>
                    </button>
                  );
                };

                return (
                  <>
                    {morningPlans.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-200/80 text-blue-900 text-[11px] font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <Sun className="w-3.5 h-3.5 text-amber-500" />
                            BUỔI SÁNG
                          </span>
                          <span className="text-blue-700 font-normal">{morningPlans.length} tiết</span>
                        </div>
                        {morningPlans.map(renderPlanItem)}
                      </div>
                    )}

                    {afternoonPlans.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <Sunset className="w-3.5 h-3.5 text-orange-500" />
                            BUỔI CHIỀU
                          </span>
                          <span className="text-amber-700 font-normal">{afternoonPlans.length} tiết</span>
                        </div>
                        {afternoonPlans.map(renderPlanItem)}
                      </div>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>

        {/* Right Column: Active KHBD Lesson Plan Details (CV 2345 2-Column Format) */}
        <div className="lg:col-span-8">
          {activePlan ? (
            activePlan.isOtherTeacher ? (
              <div className="bg-white rounded-2xl border border-amber-200 shadow-xs p-6 space-y-6">
                {/* Specialist Teacher Header */}
                <div className="border-b border-amber-100 pb-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
                      {activePlan.dayName} • Ngày {activePlan.dateStr}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5">
                      {activePlan.session === "Sáng" ? (
                        <Sun className="w-3.5 h-3.5 text-amber-600" />
                      ) : (
                        <Sunset className="w-3.5 h-3.5 text-orange-600" />
                      )}
                      BUỔI {activePlan.session.toUpperCase()} • Tiết {activePlan.period}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Lớp {activePlan.className}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200">
                      Tiết Giáo viên chuyên trách
                    </span>
                  </div>

                  <div className="space-y-1 mt-2">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      MÔN: {activePlan.subject.toUpperCase()}
                      {activePlan.subSubject ? ` (${activePlan.subSubject.toUpperCase()})` : ""}
                    </h2>
                    <p className="text-sm font-bold text-amber-800">
                      Giáo viên giảng dạy: {activePlan.teacherName} (Giáo viên chuyên trách)
                    </p>
                  </div>
                </div>

                {/* Regulation & Guidance Card */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <div className="space-y-2 text-xs text-amber-950">
                      <div className="font-bold text-sm text-amber-900">
                        Quy định chuyên môn về Lịch báo giảng & Kế hoạch bài dạy
                      </div>
                      <p className="leading-relaxed">
                        • <strong>Lịch báo giảng (LBG):</strong> Đã phân tách rõ ràng theo <strong>Buổi {activePlan.session}</strong>, Tiết {activePlan.period}, môn <strong>{activePlan.subject}</strong> và hiển thị thông tin <strong>{activePlan.teacherName} dạy</strong>. Không cần ghi tên bài học theo đúng chỉ đạo.
                      </p>
                      <p className="leading-relaxed">
                        • <strong>Kế hoạch bài dạy (KHBD):</strong> Tiết này do giáo viên chuyên môn ({activePlan.teacherName}) tự quản lý và soạn kế hoạch bài dạy chuyên biệt. Giáo viên chủ nhiệm không phải soạn các hoạt động chi tiết cho tiết học này.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
              {/* Plan Header & Action Bar */}
              <div className="border-b border-slate-200 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
                      {activePlan.dayName} • Ngày {activePlan.dateStr}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-bold">
                      {activePlan.session} • Tiết {activePlan.period}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Lớp {activePlan.className}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                      Tiết PPCT: {activePlan.ppct}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {onOpenKHBDUpload && (
                      <button
                        onClick={onOpenKHBDUpload}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold transition border border-teal-200 cursor-pointer"
                        title="Tải lên file Word hoặc dán nội dung KHBD/KHDH để cập nhật bài dạy"
                      >
                        <Upload className="w-3.5 h-3.5 text-teal-600" />
                        <span>Tải Lên KHBD</span>
                      </button>
                    )}

                    {/* Gemini AI Assistant Button */}
                    <button
                      onClick={() => onOpenAIModalForLesson(activePlan)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold hover:from-amber-600 hover:to-orange-700 transition shadow-xs cursor-pointer"
                      title="Sử dụng Trí tuệ nhân tạo Gemini để soạn hoặc tối ưu hóa hoạt động bài dạy"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Trợ lý AI Gemini</span>
                    </button>

                    {/* Standard Integration Selector Button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowIntegrationSelector(!showIntegrationSelector)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition border border-indigo-200 cursor-pointer"
                        title="Chèn nội dung tích hợp chuẩn theo hướng dẫn Bộ GD&ĐT"
                      >
                        <Award className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Chèn Tích Hợp Chuẩn</span>
                        <ChevronDown className="w-3 h-3 text-indigo-500" />
                      </button>

                      {showIntegrationSelector && (
                        <div className="absolute right-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-30 text-xs space-y-1">
                          <div className="font-bold text-slate-800 px-2 py-1 border-b border-slate-100">
                            Chọn nội dung tích hợp (Bộ GD&ĐT):
                          </div>
                          {INTEGRATION_CATEGORIES.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => handleInsertIntegration(`${cat.name}: ${cat.items[0] || cat.description}`)}
                              className="w-full text-left px-2 py-1.5 hover:bg-slate-100 rounded text-slate-700 transition cursor-pointer"
                            >
                              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">{cat.items[0] || cat.description}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={() => handleSavePlan(activePlan)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Lưu Giáo Án</span>
                    </button>
                  </div>
                </div>

                {/* Lesson Subject & Editable Title */}
                <div className="space-y-3 bg-blue-50/40 p-4 rounded-xl border border-blue-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500">Môn học: </span>
                      <strong className="text-blue-900 text-sm font-bold">{activePlan.subject}</strong>
                      {activePlan.subSubject && (
                        <span className="text-blue-700 ml-1 font-medium">({activePlan.subSubject})</span>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Số tiết theo phân phối chương trình: </span>
                      <strong className="text-amber-800 text-sm font-bold">Tiết {activePlan.ppct}</strong>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <label className="text-xs font-bold text-slate-800">
                        Tên bài học:
                      </label>
                      <span className="text-[11px] text-slate-500 italic">
                        (Nêu tên bài học và số tiết bài học nếu bài học đó có nhiều tiết)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={activePlan.title}
                      placeholder="Ví dụ: Bài 1: Điều kì diệu (Tiết 1: Đọc)"
                      onChange={(e) => {
                        const updated = { ...activePlan, title: e.target.value };
                        handleSavePlan(updated);
                      }}
                      className="w-full text-sm sm:text-base font-bold text-slate-900 bg-white hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-500 rounded-lg px-3 py-2 focus:outline-hidden transition shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* Phần I: Yêu cầu cần đạt (CV 2345) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    I. YÊU CẦU CẦN ĐẠT (MỤC TIÊU BÀI HỌC)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* 1. Năng lực đặc thù */}
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>1. Năng lực đặc thù:</span>
                    </div>
                    <textarea
                      rows={3}
                      value={activePlan.goals.specificCompetencies.join("\n")}
                      onChange={(e) => {
                        const list = e.target.value.split("\n").filter((l) => l.trim().length > 0);
                        const updated = {
                          ...activePlan,
                          goals: { ...activePlan.goals, specificCompetencies: list },
                        };
                        handleSavePlan(updated);
                      }}
                      className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                      placeholder="Mỗi dòng là một năng lực đặc thù..."
                    />
                  </div>

                  {/* 2. Năng lực chung */}
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-800">2. Năng lực chung:</div>
                    <textarea
                      rows={3}
                      value={activePlan.goals.generalCompetencies.join("\n")}
                      onChange={(e) => {
                        const list = e.target.value.split("\n").filter((l) => l.trim().length > 0);
                        const updated = {
                          ...activePlan,
                          goals: { ...activePlan.goals, generalCompetencies: list },
                        };
                        handleSavePlan(updated);
                      }}
                      className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                      placeholder="Mỗi dòng là một năng lực chung (Tự chủ, Giao tiếp, Giải quyết vấn đề)..."
                    />
                  </div>

                  {/* 3. Phẩm chất chủ yếu */}
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-800">3. Phẩm chất chủ yếu:</div>
                    <textarea
                      rows={2}
                      value={activePlan.goals.qualities.join("\n")}
                      onChange={(e) => {
                        const list = e.target.value.split("\n").filter((l) => l.trim().length > 0);
                        const updated = {
                          ...activePlan,
                          goals: { ...activePlan.goals, qualities: list },
                        };
                        handleSavePlan(updated);
                      }}
                      className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                      placeholder="Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm..."
                    />
                  </div>

                  {/* Tích hợp liên môn / NLS / AI */}
                  <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-200 space-y-2">
                    <div className="font-bold text-indigo-900 flex items-center justify-between">
                      <span>4. Tích hợp giáo dục:</span>
                      <span className="text-[10px] text-indigo-600">NLS, AI, QCN, STEM</span>
                    </div>
                    <textarea
                      rows={2}
                      value={activePlan.goals.integration || ""}
                      onChange={(e) => {
                        const updated = {
                          ...activePlan,
                          goals: { ...activePlan.goals, integration: e.target.value },
                        };
                        handleSavePlan(updated);
                      }}
                      className="w-full text-xs text-indigo-950 bg-white border border-indigo-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      placeholder="Nội dung tích hợp..."
                    />
                  </div>
                </div>
              </div>

              {/* Phần II: Đồ dùng dạy học và học liệu */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  II. ĐỒ DÙNG DẠY HỌC VÀ HỌC LIỆU
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-800">Đồ dùng của Giáo viên:</div>
                    <input
                      type="text"
                      value={activePlan.materials.teacher.join("; ")}
                      onChange={(e) => {
                        const list = e.target.value.split(";").map((s) => s.trim()).filter((s) => s.length > 0);
                        const updated = {
                          ...activePlan,
                          materials: { ...activePlan.materials, teacher: list },
                        };
                        handleSavePlan(updated);
                      }}
                      className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-800">Đồ dùng của Học sinh:</div>
                    <input
                      type="text"
                      value={activePlan.materials.students.join("; ")}
                      onChange={(e) => {
                        const list = e.target.value.split(";").map((s) => s.trim()).filter((s) => s.length > 0);
                        const updated = {
                          ...activePlan,
                          materials: { ...activePlan.materials, students: list },
                        };
                        handleSavePlan(updated);
                      }}
                      className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Phần III: Các hoạt động dạy học chủ yếu (Bảng 2 cột chuẩn CV 2345) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Nêu rõ: <strong>1. Hoạt động khởi động</strong>; <strong>2. Hoạt động hình thành kiến thức mới (nếu có)</strong>; <strong>3. Hoạt động luyện tập thực hành</strong>; <strong>4. Hoạt động vận dụng, trải nghiệm</strong>
                    </p>
                  </div>

                  <button
                    onClick={handleAddActivity}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition border border-blue-200 cursor-pointer whitespace-nowrap self-start"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Bước Hoạt Động</span>
                  </button>
                </div>

                {/* Standard step names datalist */}
                <datalist id="cv2345-step-suggestions">
                  <option value="1. Hoạt động khởi động" />
                  <option value="2. Hoạt động hình thành kiến thức mới (nếu có)" />
                  <option value="3. Hoạt động luyện tập thực hành" />
                  <option value="4. Hoạt động vận dụng, trải nghiệm" />
                </datalist>

                <div className="space-y-4">
                  {activePlan.activities.map((activity, actIdx) => (
                    <div
                      key={activity.id || actIdx}
                      className="border border-slate-200 rounded-xl overflow-hidden shadow-xs"
                    >
                      {/* Step Header */}
                      <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            list="cv2345-step-suggestions"
                            value={activity.step}
                            onChange={(e) => {
                              const newActs = [...activePlan.activities];
                              newActs[actIdx].step = e.target.value;
                              handleSavePlan({ ...activePlan, activities: newActs });
                            }}
                            className="text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded px-2.5 py-1 flex-1 max-w-md shadow-2xs"
                          />
                          <input
                            type="text"
                            value={activity.time}
                            onChange={(e) => {
                              const newActs = [...activePlan.activities];
                              newActs[actIdx].time = e.target.value;
                              handleSavePlan({ ...activePlan, activities: newActs });
                            }}
                            className="text-xs text-slate-600 bg-white border border-slate-300 rounded px-2 py-1 w-24 text-center shadow-2xs"
                          />
                        </div>

                        {activePlan.activities.length > 1 && (
                          <button
                            onClick={() => {
                              const newActs = activePlan.activities.filter((_, i) => i !== actIdx);
                              handleSavePlan({ ...activePlan, activities: newActs });
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition cursor-pointer"
                            title="Xóa bước hoạt động này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Step Target / Objective */}
                      <div className="px-4 py-2 bg-slate-50/50 border-b border-slate-200 text-xs flex items-center gap-2">
                        <span className="font-semibold text-slate-700 whitespace-nowrap">Mục tiêu bước:</span>
                        <input
                          type="text"
                          value={activity.target}
                          onChange={(e) => {
                            const newActs = [...activePlan.activities];
                            newActs[actIdx].target = e.target.value;
                            handleSavePlan({ ...activePlan, activities: newActs });
                          }}
                          className="text-xs text-slate-700 bg-transparent border-b border-dashed border-slate-300 focus:border-blue-500 w-full focus:outline-hidden py-0.5"
                        />
                      </div>

                      {/* 2-Column Table: Hoạt động của Giáo Viên vs Hoạt động của Học Sinh */}
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs">
                        {/* Column 1: Hoạt động của Giáo Viên */}
                        <div className="p-3.5 space-y-2 bg-white">
                          <div className="font-bold text-blue-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            Hoạt động của Giáo viên
                          </div>
                          <textarea
                            rows={activity.teacherActivities.length > 4 ? activity.teacherActivities.length + 1 : 5}
                            value={activity.teacherActivities.join("\n")}
                            onChange={(e) => {
                              const lines = e.target.value.split("\n");
                              const newActs = [...activePlan.activities];
                              newActs[actIdx].teacherActivities = lines;
                              handleSavePlan({ ...activePlan, activities: newActs });
                            }}
                            className="w-full text-xs text-slate-800 font-sans leading-relaxed bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                            placeholder="Nhập từng hoạt động của giáo viên..."
                          />
                        </div>

                        {/* Column 2: Hoạt động của Học Sinh */}
                        <div className="p-3.5 space-y-2 bg-slate-50/30">
                          <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            Hoạt động của Học sinh
                          </div>
                          <textarea
                            rows={activity.studentActivities.length > 4 ? activity.studentActivities.length + 1 : 5}
                            value={activity.studentActivities.join("\n")}
                            onChange={(e) => {
                              const lines = e.target.value.split("\n");
                              const newActs = [...activePlan.activities];
                              newActs[actIdx].studentActivities = lines;
                              handleSavePlan({ ...activePlan, activities: newActs });
                            }}
                            className="w-full text-xs text-slate-800 font-sans leading-relaxed bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                            placeholder="Nhập từng hoạt động của học sinh..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phần IV: Điều chỉnh sau bài dạy */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  IV. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ)
                </h3>
                <textarea
                  rows={2}
                  value={activePlan.adjustment || ""}
                  onChange={(e) => {
                    handleSavePlan({ ...activePlan, adjustment: e.target.value });
                  }}
                  className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                  placeholder="Ghi chú nhận xét hoặc điều chỉnh nội dung sau khi giảng dạy thực tế..."
                />
              </div>
            </div>
            )
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium">Chưa có kế hoạch bài dạy nào được chọn.</p>
              <p className="text-xs text-slate-400 mt-1">
                Vui lòng chọn một tiết dạy trong danh sách bên trái hoặc chọn giáo viên khác.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
