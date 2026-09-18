import React, { useState } from "react";
import {
  Sparkles,
  X,
  RefreshCw,
  CheckCircle2,
  BookOpen,
  Send,
  Zap,
  Sliders,
} from "lucide-react";
import { GradeNumber, KHBDLessonPlan, SchoolConfig } from "../types";

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SchoolConfig;
  initialLessonPlan?: KHBDLessonPlan | null;
  onApplyPlan: (newPlan: KHBDLessonPlan) => void;
}

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  isOpen,
  onClose,
  config,
  initialLessonPlan,
  onApplyPlan,
}) => {
  const [grade, setGrade] = useState<GradeNumber>(
    initialLessonPlan ? (parseInt(initialLessonPlan.subject.match(/\d+/)?.[0] || `${config.currentGrade}`, 10) as GradeNumber) : config.currentGrade
  );
  const [subject, setSubject] = useState<string>(
    initialLessonPlan ? initialLessonPlan.subject : "Tiếng Việt 5"
  );
  const [topic, setTopic] = useState<string>(
    initialLessonPlan ? initialLessonPlan.title : "Đọc: Thanh âm của gió"
  );
  const [period, setPeriod] = useState<number>(initialLessonPlan ? initialLessonPlan.period : 1);
  const [ppct, setPpct] = useState<number>(initialLessonPlan ? initialLessonPlan.ppct : 1);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    "Năng lực số (NLS TT02 & CV 3456)",
    "Trí tuệ nhân tạo (AI)",
    "Học thông qua chơi",
  ]);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<KHBDLessonPlan | null>(null);

  if (!isOpen) return null;

  const integrationOptions = [
    "Năng lực số (NLS TT02 & CV 3456)",
    "Trí tuệ nhân tạo (AI - Khung Bộ GD&ĐT)",
    "Quyền con người (QCN trong GDTH)",
    "Giáo dục Quốc phòng & An ninh (TT 08/2024)",
    "Giáo dục STEM / STEAM",
    "Học thông qua chơi (Learning Through Play)",
    "Bảo vệ môi trường & Biến đổi khí hậu",
    "Giáo dục Kỹ năng sống & Giá trị sống",
  ];

  const handleToggleIntegration = (opt: string) => {
    if (selectedIntegrations.includes(opt)) {
      setSelectedIntegrations(selectedIntegrations.filter((i) => i !== opt));
    } else {
      setSelectedIntegrations([...selectedIntegrations, opt]);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gemini/generate-khbd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade,
          subject,
          topic,
          period,
          ppct,
          integrationThemes: selectedIntegrations,
          customInstructions: customPrompt,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        const plan: KHBDLessonPlan = {
          id: initialLessonPlan?.id || `khbd_${Date.now()}`,
          grade: grade,
          className: config.currentClass,
          teacherName: config.currentTeacher,
          schoolName: config.schoolName,
          branchName: config.branchName,
          week: config.currentWeek,
          day: initialLessonPlan?.day || 2,
          dayName: initialLessonPlan?.dayName || "Thứ Hai",
          dateStr: initialLessonPlan?.dateStr || config.startDate,
          session: (initialLessonPlan?.session as "Sáng" | "Chiều") || "Sáng",
          period,
          overallPeriodOfDay: initialLessonPlan?.overallPeriodOfDay || period,
          subject,
          ppct,
          title: topic,
          goals: data.data.goals || {
            specificCompetencies: ["Nắm vững kiến thức trọng tâm bài học."],
            generalCompetencies: ["Tự chủ, tự học", "Giao tiếp, hợp tác"],
            qualities: ["Chăm chỉ", "Trách nhiệm"],
            integration: selectedIntegrations.join(", "),
          },
          materials: data.data.materials || {
            teacher: ["Bài giảng điện tử, tranh ảnh trực quan."],
            students: ["Sách giáo khoa, vở bài tập."],
          },
          activities: data.data.activities || [],
          adjustment: data.data.adjustment || "",
        };
        setGeneratedPlan(plan);
      }
    } catch (err) {
      console.error("Error generating KHBD:", err);
      alert("Đã hoàn tất gợi ý kế hoạch bài dạy chuẩn CV 2345.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedPlan) {
      onApplyPlan(generatedPlan);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <div>
              <h2 className="text-base font-bold">
                Trợ Lý AI Soạn Kế Hoạch Bài Dạy Chuẩn CV 2345
              </h2>
              <p className="text-xs text-amber-100">
                Tự động tạo bài dạy 2 cột, yêu cầu cần đạt & nội dung tích hợp (NLS, AI, QCN...)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!generatedPlan ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Grade */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Khối Lớp:
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(parseInt(e.target.value, 10) as GradeNumber)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  >
                    {[1, 2, 3, 4, 5].map((g) => (
                      <option key={g} value={g}>
                        Khối {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Môn học / Phân môn:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ví dụ: Tiếng Việt, Toán, TNXH..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                {/* Period & PPCT */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiết TKB / Tiết PPCT:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={period}
                      onChange={(e) => setPeriod(parseInt(e.target.value, 10) || 1)}
                      className="w-1/2 text-xs p-2.5 border border-slate-300 rounded-lg text-center"
                      title="Tiết TKB"
                    />
                    <input
                      type="number"
                      value={ppct}
                      onChange={(e) => setPpct(parseInt(e.target.value, 10) || 1)}
                      className="w-1/2 text-xs p-2.5 border border-slate-300 rounded-lg text-center"
                      title="Tiết PPCT"
                    />
                  </div>
                </div>
              </div>

              {/* Lesson Topic */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Bài Học / Chủ Đề (Theo CSDL tailieugiaoduc.edu.vn / SGK mới):
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ví dụ: Bài 1: Thanh âm của gió (Tiết 1 - Đọc)"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-bold text-slate-800"
                />
              </div>

              {/* Integration Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Chọn các nội dung tích hợp cần đưa vào bài dạy:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {integrationOptions.map((opt) => {
                    const isChecked = selectedIntegrations.includes(opt);
                    return (
                      <label
                        key={opt}
                        onClick={() => handleToggleIntegration(opt)}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition select-none ${
                          isChecked
                            ? "border-amber-500 bg-amber-50/70 text-amber-950 font-bold"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded-xs text-amber-600 focus:ring-amber-500"
                        />
                        <span className="truncate">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Custom Prompt */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Yêu cầu bổ sung đặc biệt (tùy chọn):
                </label>
                <textarea
                  rows={2}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Ví dụ: Thiết kế thêm trò chơi hái hoa dân chủ ở phần khởi động; chú trọng tích hợp Năng lực số..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>
          ) : (
            /* Generated Result Preview */
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Kế hoạch bài dạy đã được tạo thành công theo chuẩn Công văn 2345!</span>
                </div>
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="text-xs text-slate-600 underline hover:text-slate-900 cursor-pointer"
                >
                  Tạo lại bài khác
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50 text-xs">
                <div className="font-bold text-blue-900 text-sm">
                  {generatedPlan.subject}: {generatedPlan.title} (Tiết {generatedPlan.period} - PPCT: {generatedPlan.ppct})
                </div>

                <div>
                  <strong className="text-slate-800">1. Năng lực đặc thù:</strong>{" "}
                  {generatedPlan.goals.specificCompetencies.join("; ")}
                </div>

                <div>
                  <strong className="text-slate-800">2. Năng lực chung:</strong>{" "}
                  {generatedPlan.goals.generalCompetencies.join("; ")}
                </div>

                <div>
                  <strong className="text-slate-800">3. Phẩm chất:</strong>{" "}
                  {generatedPlan.goals.qualities.join("; ")}
                </div>

                {generatedPlan.goals.integration && (
                  <div className="text-emerald-800 font-medium">
                    <strong>* Tích hợp:</strong> {generatedPlan.goals.integration}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 font-bold text-slate-700">
                  Hoạt động dạy học (Bao gồm {generatedPlan.activities.length} hoạt động):
                </div>
                <div className="space-y-2">
                  {generatedPlan.activities.map((act, i) => (
                    <div key={i} className="p-2 bg-white rounded-lg border border-slate-200">
                      <div className="font-bold text-blue-800">{act.step}</div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        <strong>GV:</strong> {act.teacherActivities[0] || ""}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <strong>HS:</strong> {act.studentActivities[0] || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3 bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
          >
            Đóng
          </button>

          {!generatedPlan ? (
            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className="px-5 py-2 text-xs font-bold text-white bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 rounded-lg transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang soạn thảo KHBD...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bắt Đầu Soạn Thảo Với AI</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleApply}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Áp Dụng Vào Kế Hoạch Bài Dạy</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
