import React from "react";
import {
  GraduationCap,
  Calendar,
  Settings,
  FileText,
  Clock,
  BookOpen,
  Sparkles,
  Layers,
  FileDown,
  Upload,
} from "lucide-react";
import { GradeNumber, SchoolConfig } from "../types";
import { CLASS_GVCN_MAP } from "../data/officialTimetableData";

interface HeaderProps {
  config: SchoolConfig;
  onUpdateConfig: (newConfig: Partial<SchoolConfig>) => void;
  onOpenConfigModal: () => void;
  onOpenAIModal: () => void;
  onOpenKHBDUpload?: () => void;
  activeTab: "tkb" | "lbg" | "khbd" | "teachers" | "integration";
  setActiveTab: (tab: "tkb" | "lbg" | "khbd" | "teachers" | "integration") => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onUpdateConfig,
  onOpenConfigModal,
  onOpenAIModal,
  onOpenKHBDUpload,
  activeTab,
  setActiveTab,
}) => {
  const grades: GradeNumber[] = [1, 2, 3, 4, 5];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & School Info */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  CV 2345/BGDĐT • GDPT 2018
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {config.department}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {config.schoolName}
                {config.branchName ? ` (${config.branchName})` : ""}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span>
                  Lớp: <strong className="text-blue-700">{config.currentClass}</strong>
                </span>
                <span>•</span>
                <span>
                  GV: <strong className="text-slate-800">{config.currentTeacher}</strong>
                </span>
                <span>•</span>
                <span>
                  Năm học: <strong>{config.academicYear}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & AI */}
          <div className="flex items-center flex-wrap gap-2">
            {onOpenKHBDUpload && (
              <button
                onClick={onOpenKHBDUpload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
                title="Tải lên file Word (.docx) hoặc dán văn bản KHDH/KHBD để tự động đồng bộ vào LBG, KHBD và TKB"
              >
                <Upload className="w-4 h-4" />
                <span>Tải Lên KHBD / KHDH</span>
              </button>
            )}

            <button
              onClick={onOpenAIModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold hover:from-amber-600 hover:to-orange-700 transition shadow-xs cursor-pointer"
              title="Soạn giáo án hoặc tích hợp tự động với Trí tuệ nhân tạo Gemini"
            >
              <Sparkles className="w-4 h-4" />
              <span>Trợ lý AI Soạn KHBD</span>
            </button>

            <button
              onClick={onOpenConfigModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium transition cursor-pointer border border-slate-200"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Đổi GV, Trường & Lớp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grade Selector & Main Nav Tabs */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 py-2">
          {/* Grade switch buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-medium text-slate-500 mr-1 whitespace-nowrap">
              Khối lớp:
            </span>
            {grades.map((grade) => {
              const isSelected = config.currentGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => {
                    const defaultClassForGrade = grade === 4 ? "4A3" : `${grade}A1`;
                    onUpdateConfig({
                      currentGrade: grade,
                      currentClass: defaultClassForGrade,
                      currentTeacher: CLASS_GVCN_MAP[defaultClassForGrade],
                    });
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-blue-700 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  Khối {grade}
                </button>
              );
            })}

            {/* Quick Class Switcher within current grade */}
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-300">
              <span className="text-xs font-medium text-slate-500 mr-0.5">Lớp:</span>
              {[1, 2, 3, 4].map((sec) => {
                const clsName = `${config.currentGrade}A${sec}`;
                const isClsSelected = config.currentClass === clsName;
                return (
                  <button
                    key={clsName}
                    onClick={() => {
                      onUpdateConfig({
                        currentClass: clsName,
                        currentTeacher: CLASS_GVCN_MAP[clsName],
                      });
                    }}
                    className={`px-2 py-0.5 text-xs font-bold rounded transition cursor-pointer ${
                      isClsSelected
                        ? "bg-blue-800 text-white shadow-xs"
                        : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {clsName}
                  </button>
                );
              })}
            </div>

            {/* Week switch selector */}
            <div className="flex items-center gap-1 ml-3 pl-3 border-l border-slate-300">
              <span className="text-xs text-slate-500 whitespace-nowrap">Tuần:</span>
              <select
                value={config.currentWeek}
                onChange={(e) =>
                  onUpdateConfig({ currentWeek: parseInt(e.target.value, 10) })
                }
                className="text-xs font-bold bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 focus:outline-blue-600"
              >
                {[...Array(35)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tuần {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Functional Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("tkb")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                activeTab === "tkb"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Thời Khóa Biểu (TKB)</span>
            </button>

            <button
              onClick={() => setActiveTab("lbg")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                activeTab === "lbg"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Lịch Báo Giảng (LBG)</span>
            </button>

            <button
              onClick={() => setActiveTab("khbd")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                activeTab === "khbd"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Kế Hoạch Bài Dạy (2345)</span>
            </button>

            <button
              onClick={() => setActiveTab("teachers")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                activeTab === "teachers"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Xuất Theo Giáo Viên</span>
            </button>

            <button
              onClick={() => setActiveTab("integration")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                activeTab === "integration"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Khung Tích Hợp (NLS/AI/QCN/QPAN)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
