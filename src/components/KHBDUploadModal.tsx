import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Calendar,
  X,
  ListFilter,
  ArrowRight,
} from "lucide-react";
import mammoth from "mammoth";
import { GradeNumber, KHBDLessonPlan, SchoolConfig } from "../types";
import { parseUploadedKHBDText } from "../utils/khbdParser";
import { get35WeekCurriculumEntry } from "../data/curriculum35Weeks";

interface KHBDUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SchoolConfig;
  onApplyPlans: (plans: KHBDLessonPlan[], targetWeek: number, targetGrade: GradeNumber, targetClass: string) => void;
}

export const KHBDUploadModal: React.FC<KHBDUploadModalProps> = ({
  isOpen,
  onClose,
  config,
  onApplyPlans,
}) => {
  const [activeTab, setActiveTab] = useState<"file" | "text" | "preset">("file");
  const [targetWeek, setTargetWeek] = useState<number>(config.currentWeek || 1);
  const [targetGrade, setTargetGrade] = useState<GradeNumber>(config.currentGrade || 4);
  const [targetClass, setTargetClass] = useState<string>(config.currentClass || "4A1");

  const [rawText, setRawText] = useState<string>("");
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [parsedPlans, setParsedPlans] = useState<KHBDLessonPlan[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle file upload (.docx, .txt, .json)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessingFile(true);
    setParseError(null);
    setSuccessMessage(null);

    try {
      if (file.name.endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;
        setRawText(text);
        const plans = parseUploadedKHBDText(text, {
          grade: targetGrade,
          currentClass: targetClass,
          currentWeek: targetWeek,
          currentTeacher: config.currentTeacher,
        });
        setParsedPlans(plans);
        if (plans.length === 0) {
          setParseError("Đã đọc file Word nhưng chưa nhận diện được cấu trúc bài học. Bạn có thể xem hoặc chỉnh sửa văn bản ở ô bên dưới.");
        }
      } else {
        const text = await file.text();
        setRawText(text);
        const plans = parseUploadedKHBDText(text, {
          grade: targetGrade,
          currentClass: targetClass,
          currentWeek: targetWeek,
          currentTeacher: config.currentTeacher,
        });
        setParsedPlans(plans);
        if (plans.length === 0) {
          setParseError("Chưa nhận diện được cấu trúc bài học. Vui lòng kiểm tra định dạng văn bản.");
        }
      }
    } catch (err: any) {
      setParseError(`Lỗi khi đọc file: ${err.message || "Không thể đọc nội dung file."}`);
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Re-parse when text changes in Tab 2
  const handleParseText = () => {
    setParseError(null);
    setSuccessMessage(null);
    if (!rawText.trim()) {
      setParseError("Vui lòng nhập hoặc dán nội dung văn bản KHBD/KHDH.");
      return;
    }

    const plans = parseUploadedKHBDText(rawText, {
      grade: targetGrade,
      currentClass: targetClass,
      currentWeek: targetWeek,
      currentTeacher: config.currentTeacher,
    });

    setParsedPlans(plans);
    if (plans.length === 0) {
      setParseError("Không tìm thấy tiết học hợp lệ. Hãy đảm bảo nội dung có tên môn học, tiết PPCT và tên bài dạy.");
    }
  };

  // Preset load: Load official 35-week curriculum into parsed plans
  const handleLoadOfficialCurriculum = () => {
    setParseError(null);
    setSuccessMessage(null);

    const generated: KHBDLessonPlan[] = [];
    const subjects = [
      { name: "Tiếng Việt", count: 7 },
      { name: "Toán", count: 5 },
      { name: "Khoa học", count: 2 },
      { name: "Lịch sử và Địa lí", count: 2 },
      { name: "Đạo đức", count: 1 },
      { name: "Hoạt động trải nghiệm", count: 3 },
      { name: "Tin học", count: 1 },
      { name: "Công nghệ", count: 1 },
      { name: "Giáo dục Thể chất", count: 2 },
      { name: "Âm nhạc", count: 1 },
      { name: "Mĩ thuật", count: 1 },
      { name: "Tiếng Anh", count: 4 },
    ];

    let autoPpctCounter = 1;
    subjects.forEach((subj) => {
      for (let p = 1; p <= subj.count; p++) {
        const entry = get35WeekCurriculumEntry(subj.name, targetGrade, targetWeek, p, autoPpctCounter++);
        if (entry) {
          generated.push({
            id: `khbd_preset_${targetGrade}_w${targetWeek}_${subj.name}_${p}`,
            grade: targetGrade,
            className: targetClass,
            teacherName: config.currentTeacher,
            schoolName: "Trường Tiểu Học Tân Thạnh",
            branchName: "Xã Tân Thạnh",
            week: targetWeek,
            day: 2,
            dayName: "Thứ Hai",
            dateStr: "",
            period: 1,
            overallPeriodOfDay: 1,
            session: "Sáng",
            subject: subj.name,
            subSubject: entry.subSubject,
            ppct: entry.ppct,
            title: entry.title,
            goals: entry.detailedGoals,
            materials: {
              teacher: ["Sách giáo khoa, kế hoạch bài dạy", "Bộ đồ dùng dạy học chuẩn Bộ GD&ĐT"],
              students: ["Sách giáo khoa, vở ghi, đồ dùng học tập cá nhân"],
            },
            activities: [
              {
                id: "act_1",
                step: "1. Hoạt động khởi động",
                target: "Tạo tâm thế hứng thú học tập và kết nối kiến thức bài học.",
                teacherActivities: ["- Giáo viên tổ chức trò chơi kết nối hoặc đặt câu hỏi gợi mở."],
                studentActivities: ["- Học sinh tham gia trò chơi hào hứng, chia sẻ hiểu biết."],
              },
              {
                id: "act_2",
                step: "2. Hoạt động hình thành kiến thức mới (nếu có)",
                target: "Khám phá và chiếm lĩnh kiến thức trọng tâm của bài học.",
                teacherActivities: ["- Hướng dẫn học sinh quan sát tranh ảnh, ngữ liệu SGK và phát hiện kiến thức."],
                studentActivities: ["- Học sinh thảo luận nhóm, thực hiện nhiệm vụ khám phá."],
              },
              {
                id: "act_3",
                step: "3. Hoạt động luyện tập thực hành",
                target: "Rèn luyện kĩ năng, giải bài tập và củng cố kiến thức vừa học.",
                teacherActivities: ["- Giao bài tập theo phân hóa, quan sát hỗ trợ học sinh còn lúng túng."],
                studentActivities: ["- Tự làm bài vào vở, đổi chéo vở kiểm tra bài bạn."],
              },
              {
                id: "act_4",
                step: "4. Hoạt động vận dụng, trải nghiệm",
                target: "Vận dụng kiến thức vào thực tiễn cuộc sống và chia sẻ với người thân.",
                teacherActivities: ["- Nêu câu hỏi liên hệ thực tế, dặn dò học sinh chuẩn bị bài sau."],
                studentActivities: ["- Liên hệ bản thân và gia đình, ghi nhớ kiến thức bài học."],
              },
            ],
            adjustment: "",
          });
        }
      }
    });

    setParsedPlans(generated);
    setRawText(`KẾ HOẠCH DẠY HỌC CHUẨN BỘ GD&ĐT (KẾT NỐI TRI THỨC) - KHỐI ${targetGrade} TUẦN ${targetWeek}\nTổng số tiết: ${generated.length} tiết`);
  };

  // Insert sample text
  const handleInsertSampleText = () => {
    const sample = `KẾ HOẠCH DẠY HỌC TUẦN 1 - KHỐI 4
Thứ Hai:
- Tiết 1: Hoạt động trải nghiệm - Tiết 1: Sinh hoạt dưới cờ: Khai giảng năm học mới
- Tiết 2: Tiếng Việt - Tiết 1: Bài 1: Điều kì diệu (Tiết 1: Đọc)
- Tiết 3: Tiếng Việt - Tiết 2: Bài 1: Điều kì diệu (Tiết 2: Luyện từ và câu: Danh từ)
- Tiết 4: Toán - Tiết 1: Bài 1: Ôn tập các số đến 100 000 (Tiết 1)

Thứ Ba:
- Tiết 1: Toán - Tiết 2: Bài 1: Ôn tập các số đến 100 000 (Tiết 2: Luyện tập)
- Tiết 2: Tiếng Việt - Tiết 3: Bài 1: Điều kì diệu (Tiết 3: Viết: Tìm hiểu cách viết đoạn văn)
- Tiết 3: Tiếng Anh - Tiết 1: Unit Starter: Hello again (Lesson 1)
- Tiết 4: Đạo đức - Tiết 1: Bài 1: Người lao động quanh em (Tiết 1)

Thứ Tư:
- Tiết 1: Tiếng Việt - Tiết 4: Bài 2: Thi nhạc (Tiết 1: Đọc)
- Tiết 2: Toán - Tiết 3: Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 100 000 (Tiết 1)
- Tiết 3: Khoa học - Tiết 1: Bài 1: Tính chất của nước (Tiết 1)
- Tiết 4: Lịch sử và Địa lí - Tiết 1: Bài 1: Làm quen với phương tiện học tập môn Lịch sử và Địa lí (Tiết 1)`;

    setRawText(sample);
    const plans = parseUploadedKHBDText(sample, {
      grade: targetGrade,
      currentClass: targetClass,
      currentWeek: targetWeek,
      currentTeacher: config.currentTeacher,
    });
    setParsedPlans(plans);
  };

  // Apply to LBG, KHBD and TKB
  const handleApply = () => {
    if (parsedPlans.length === 0) {
      setParseError("Chưa có kế hoạch bài dạy nào được nhận diện. Vui lòng tải file hoặc nhập văn bản trước.");
      return;
    }

    onApplyPlans(parsedPlans, targetWeek, targetGrade, targetClass);
    setSuccessMessage(`Đã đồng bộ thành công ${parsedPlans.length} bài dạy vào Lịch Báo Giảng, KHBD và Thời Khóa Biểu!`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-amber-300">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                Tải Lên / Nhập KHBD & KHDH
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Tự động đồng bộ LBG, KHBD & TKB
                </span>
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Đồng bộ bài dạy phù hợp nội dung tải lên hoặc phân phối chương trình chính khóa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target settings bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700">Khối lớp:</span>
              <select
                value={targetGrade}
                onChange={(e) => setTargetGrade(parseInt(e.target.value, 10) as GradeNumber)}
                className="bg-white border border-slate-300 rounded-md px-2 py-1 font-bold text-slate-800"
              >
                {[1, 2, 3, 4, 5].map((g) => (
                  <option key={g} value={g}>
                    Khối {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700">Lớp học:</span>
              <input
                type="text"
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value.toUpperCase())}
                className="bg-white border border-slate-300 rounded-md px-2 py-1 font-bold text-slate-800 w-20 text-center"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700">Tuần dạy:</span>
              <select
                value={targetWeek}
                onChange={(e) => setTargetWeek(parseInt(e.target.value, 10))}
                className="bg-white border border-slate-300 rounded-md px-2 py-1 font-bold text-amber-800"
              >
                {Array.from({ length: 35 }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w}>
                    Tuần {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic">
            Chuẩn CV 2345/BGDĐT • 4 bước hoạt động chủ yếu
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-2 pt-2 text-xs">
          <button
            onClick={() => setActiveTab("file")}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "file"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tải File Word (.docx) / Văn Bản</span>
          </button>

          <button
            onClick={() => setActiveTab("text")}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "text"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Dán Nội Dung KHDH / KHBD</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("preset");
              handleLoadOfficialCurriculum();
            }}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "preset"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>KHDH Chuẩn Bộ GD&ĐT (35 Tuần)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Tab 1: File Upload */}
          {activeTab === "file" && (
            <div className="space-y-4">
              <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-blue-50/30 transition cursor-pointer">
                <input
                  type="file"
                  accept=".docx,.txt,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-slate-800">
                    Kéo thả hoặc nhấn để chọn file Kế hoạch bài dạy / Kế hoạch dạy học
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Hỗ trợ định dạng Microsoft Word (.docx), file văn bản (.txt) hoặc file JSON
                  </div>
                </div>
                {fileName && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg text-xs font-semibold border border-blue-200">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>File đã chọn: {fileName}</span>
                  </div>
                )}
              </label>

              {isProcessingFile && (
                <div className="text-center py-4 text-xs font-semibold text-blue-700 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang trích xuất và phân tích kế hoạch bài dạy từ file Word...</span>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Textarea paste */}
          {activeTab === "text" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Dán nội dung KHBD hoặc bảng phân phối chương trình KHDH vào đây:
                </label>
                <button
                  type="button"
                  onClick={handleInsertSampleText}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline cursor-pointer"
                >
                  + Dán mẫu thử nghiệm
                </button>
              </div>

              <textarea
                rows={8}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Dán nội dung kế hoạch bài dạy hoặc danh sách phân phối chương trình theo tuần..."
                className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-blue-500 transition"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleParseText}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Phân Tích & Nhận Diện Bài Học</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Official Preset */}
          {activeTab === "preset" && (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-950 text-sm">
                    Kế Hoạch Dạy Học Chuẩn Bộ GD&ĐT (Bộ sách Kết nối tri thức với cuộc sống)
                  </div>
                  <div className="mt-1 leading-relaxed">
                    Hệ thống đã tự động nạp toàn bộ phân phối chương trình chuẩn cho <strong>Khối {targetGrade}</strong> - <strong>Tuần {targetWeek}</strong> với đầy đủ các môn (Toán, Tiếng Việt, Khoa học, Lịch sử và Địa lí, Đạo đức, HĐTN, Tin học, Công nghệ, GDTC, Âm nhạc, Mĩ thuật, Tiếng Anh).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {parseError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Parsed Lessons Table Preview */}
          {parsedPlans.length > 0 && (
            <div className="space-y-3 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>
                    Danh sách {parsedPlans.length} bài dạy nhận diện được (sẽ đồng bộ vào LBG & KHBD):
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Bạn có thể chỉnh sửa trực tiếp tên bài học trong bảng bên dưới
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
                    <tr>
                      <th className="p-2.5 w-12 text-center">STT</th>
                      <th className="p-2.5 w-28">Môn học</th>
                      <th className="p-2.5 w-24 text-center">Tiết PPCT</th>
                      <th className="p-2.5">Tên bài học (nêu rõ số tiết nếu nhiều tiết)</th>
                      <th className="p-2.5 w-28 text-center">Cấu trúc 4 bước</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {parsedPlans.map((plan, idx) => (
                      <tr key={plan.id || idx} className="hover:bg-blue-50/40 transition">
                        <td className="p-2.5 text-center font-semibold text-slate-500">{idx + 1}</td>
                        <td className="p-2.5 font-bold text-blue-900">{plan.subject}</td>
                        <td className="p-2.5 text-center font-bold text-amber-800">Tiết {plan.ppct}</td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={plan.title}
                            onChange={(e) => {
                              const updated = [...parsedPlans];
                              updated[idx].title = e.target.value;
                              setParsedPlans(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-medium text-slate-900 text-xs focus:border-blue-500 focus:outline-hidden"
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{plan.activities?.length || 4} bước</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition cursor-pointer"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={parsedPlans.length === 0}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm ${
              parsedPlans.length > 0
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Đồng bộ vào LBG, KHBD & TKB ({parsedPlans.length} bài dạy)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
