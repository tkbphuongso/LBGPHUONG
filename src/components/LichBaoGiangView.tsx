import React, { useState, useMemo } from "react";
import {
  Calendar,
  Download,
  Edit2,
  Plus,
  Trash2,
  Sparkles,
  Save,
  CheckCircle2,
  BookOpen,
  Filter,
  Layers,
  FileDown,
  User,
  School,
  Clock,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Wand2,
  Sun,
  Sunset,
  Upload,
} from "lucide-react";
import {
  KHBDLessonPlan,
  LBGItem,
  SchoolConfig,
  TeacherInfo,
  TimetableSlot,
  LBGValidationIssue,
} from "../types";
import { exportLBGToWord, exportKHBDToWord, exportTKBToWord } from "../utils/docxExport";
import { buildTeacherLBGAndKHBD, buildClassLBGAndKHBD } from "../utils/teacherScheduleHelper";
import { CLASS_GVCN_MAP } from "../data/officialTimetableData";
import { validateLBGAgainstKHDH } from "../utils/lbgKhdhValidator";
import { LBGValidationModal } from "./LBGValidationModal";

interface LichBaoGiangViewProps {
  teachers: TeacherInfo[];
  slots: TimetableSlot[];
  config: SchoolConfig;
  onUpdateConfig: (newConfig: Partial<SchoolConfig>) => void;
  classes: string[];
  customPlansMap?: Record<string, KHBDLessonPlan>;
  onSaveCustomPlan?: (plan: KHBDLessonPlan) => void;
  onSaveMultipleCustomPlans?: (plans: KHBDLessonPlan[]) => void;
  uploadedKhdhPlans?: KHBDLessonPlan[];
  onOpenKHBDUpload?: () => void;
}

export const LichBaoGiangView: React.FC<LichBaoGiangViewProps> = ({
  teachers,
  slots,
  config,
  onUpdateConfig,
  classes,
  customPlansMap = {},
  onSaveCustomPlan,
  onSaveMultipleCustomPlans,
  uploadedKhdhPlans,
  onOpenKHBDUpload,
}) => {
  // Mode: "teacher" (LBG cá nhân của từng GV) or "class" (LBG toàn lớp)
  const [viewMode, setViewMode] = useState<"teacher" | "class">("teacher");

  // Validation modal state
  const [isValidationModalOpen, setIsValidationModalOpen] = useState<boolean>(false);

  // Selected teacher
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(() => {
    const matched = teachers.find(
      (t) =>
        t.name.toLowerCase().includes(config.currentTeacher.toLowerCase()) ||
        config.currentTeacher.toLowerCase().includes(t.name.toLowerCase()) ||
        (t.shortName && config.currentTeacher.toLowerCase().includes(t.shortName.toLowerCase()))
    );
    return matched?.id || teachers[0]?.id || "t-kieu-phuong";
  });

  // Selected class
  const [selectedClass, setSelectedClass] = useState<string>(config.currentClass || "1A1");

  // Day filter
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | "all">("all");
  const [selectedFontSize, setSelectedFontSize] = useState<12 | 13 | 14>(config.fontSize || 13);
  const [teacherFilterTab, setTeacherFilterTab] = useState<"all" | "gvcn" | "specialist">("all");

  // Active teacher
  const activeTeacher = useMemo(() => {
    return teachers.find((t) => t.id === selectedTeacherId) || teachers[0];
  }, [teachers, selectedTeacherId]);

  // Derived LBG & KHBD based on active mode
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

  // Filtered teachers list
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      if (teacherFilterTab === "gvcn") return !t.isSpecialist;
      if (teacherFilterTab === "specialist") return t.isSpecialist;
      return true;
    });
  }, [teachers, teacherFilterTab]);

  // Group items by day
  const filteredItems = useMemo(() => {
    if (selectedDayFilter === "all") return currentLBGItems;
    return currentLBGItems.filter((item) => item.day === selectedDayFilter);
  }, [currentLBGItems, selectedDayFilter]);

  const daysMap = useMemo(() => {
    const map: Record<number, LBGItem[]> = {};
    filteredItems.forEach((item) => {
      if (!map[item.day]) map[item.day] = [];
      map[item.day].push(item);
    });
    return map;
  }, [filteredItems]);

  // Automatic validation of current LBG items against uploaded KHDH / official curriculum
  const validationReport = useMemo(() => {
    return validateLBGAgainstKHDH(currentLBGItems, uploadedKhdhPlans, config, customPlansMap);
  }, [currentLBGItems, uploadedKhdhPlans, config, customPlansMap]);

  // Fix single lesson discrepancy
  const handleApplyFixSingle = (issue: LBGValidationIssue) => {
    if (!issue.suggestedFix || !onSaveCustomPlan) return;
    const planToUpdate: KHBDLessonPlan = {
      ...(issue.expectedKhdhItem || {}),
      id: issue.expectedKhdhItem?.id || `plan_fix_${issue.lbgItem.id}`,
      grade: config.currentGrade,
      className: issue.lbgItem.className || config.currentClass,
      teacherName: issue.lbgItem.teacherName || config.currentTeacher,
      schoolName: config.schoolName,
      week: config.currentWeek,
      day: issue.lbgItem.day,
      dayName: issue.lbgItem.dayName,
      dateStr: issue.lbgItem.dateStr,
      session: issue.lbgItem.session,
      period: issue.lbgItem.period,
      overallPeriodOfDay: issue.lbgItem.overallPeriodOfDay,
      subject: issue.lbgItem.subject,
      subSubject: issue.suggestedFix.subSubject || issue.expectedKhdhItem?.subSubject || "",
      ppct: issue.suggestedFix.ppctLessonNumber,
      title: issue.suggestedFix.lessonTitle,
      goals: issue.expectedKhdhItem?.goals || {
        specificCompetencies: [],
        generalCompetencies: [],
        qualities: [],
        integration: "",
      },
      materials: issue.expectedKhdhItem?.materials || { teacher: [], students: [] },
      activities: issue.expectedKhdhItem?.activities || [],
    };
    onSaveCustomPlan(planToUpdate);
  };

  // Fix all lesson discrepancies in 1-click
  const handleApplyFixAll = () => {
    const plansToUpdate: KHBDLessonPlan[] = [];
    validationReport.issues.forEach((issue) => {
      if (issue.suggestedFix) {
        plansToUpdate.push({
          ...(issue.expectedKhdhItem || {}),
          id: issue.expectedKhdhItem?.id || `plan_fix_${issue.lbgItem.id}`,
          grade: config.currentGrade,
          className: issue.lbgItem.className || config.currentClass,
          teacherName: issue.lbgItem.teacherName || config.currentTeacher,
          schoolName: config.schoolName,
          week: config.currentWeek,
          day: issue.lbgItem.day,
          dayName: issue.lbgItem.dayName,
          dateStr: issue.lbgItem.dateStr,
          session: issue.lbgItem.session,
          period: issue.lbgItem.period,
          overallPeriodOfDay: issue.lbgItem.overallPeriodOfDay,
          subject: issue.lbgItem.subject,
          subSubject: issue.suggestedFix.subSubject || issue.expectedKhdhItem?.subSubject || "",
          ppct: issue.suggestedFix.ppctLessonNumber,
          title: issue.suggestedFix.lessonTitle,
          goals: issue.expectedKhdhItem?.goals || {
            specificCompetencies: [],
            generalCompetencies: [],
            qualities: [],
            integration: "",
          },
          materials: issue.expectedKhdhItem?.materials || { teacher: [], students: [] },
          activities: issue.expectedKhdhItem?.activities || [],
        });
      }
    });

    if (plansToUpdate.length > 0) {
      if (onSaveMultipleCustomPlans) {
        onSaveMultipleCustomPlans(plansToUpdate);
      } else if (onSaveCustomPlan) {
        plansToUpdate.forEach((p) => onSaveCustomPlan(p));
      }
    }
  };

  const handleSelectTeacher = (teacher: TeacherInfo) => {
    setSelectedTeacherId(teacher.id);
    onUpdateConfig({
      currentTeacher: teacher.name,
      ...(teacher.assignedClasses && teacher.assignedClasses.length > 0
        ? { currentClass: teacher.assignedClasses[0] }
        : {}),
    });
  };

  const handleSelectClass = (cls: string) => {
    setSelectedClass(cls);
    const grade = (parseInt(cls.charAt(0), 10) || 1) as 1 | 2 | 3 | 4 | 5;
    onUpdateConfig({
      currentClass: cls,
      currentGrade: grade,
    });
  };

  // Homeroom teacher for selected class
  const homeroomTeacher = teachers.find(
    (t) => !t.isSpecialist && t.assignedClasses?.includes(selectedClass)
  );
  const classTeacherName =
    homeroomTeacher?.name || CLASS_GVCN_MAP[selectedClass] || config.currentTeacher;

  // Export LBG Word
  const handleExportLBG = () => {
    const teacherSlug = activeTeacher?.name.replace(/^(Cô|Thầy|GV)\s+/i, "").replace(/\s+/g, "_") || "GV";
    const customTitle =
      viewMode === "teacher"
        ? `LỊCH BÁO GIẢNG TUẦN ${config.currentWeek} - GIÁO VIÊN: ${activeTeacher?.name.toUpperCase()}`
        : `LỊCH BÁO GIẢNG TUẦN ${config.currentWeek} - LỚP ${selectedClass}`;

    const customFileName =
      viewMode === "teacher"
        ? `Lich_Bao_Giang_Tuan_${config.currentWeek}_GV_${teacherSlug}_Font${selectedFontSize}.docx`
        : `Lich_Bao_Giang_Tuan_${config.currentWeek}_Lop_${selectedClass}_Font${selectedFontSize}.docx`;

    exportLBGToWord(
      currentLBGItems,
      {
        ...config,
        fontSize: selectedFontSize,
        currentTeacher: viewMode === "teacher" ? activeTeacher.name : classTeacherName,
        currentClass: viewMode === "teacher" ? (activeTeacher.assignedClasses?.[0] || config.currentClass) : selectedClass,
      },
      customTitle,
      customFileName
    );
  };

  // Export combined Word
  const handleExportCombined = () => {
    const teacherSlug = activeTeacher?.name.replace(/^(Cô|Thầy|GV)\s+/i, "").replace(/\s+/g, "_") || "GV";
    const customFileName =
      viewMode === "teacher"
        ? `Ho_So_Gop_LBG_Kem_KHBD_Tuan_${config.currentWeek}_GV_${teacherSlug}_Font${selectedFontSize}.docx`
        : `Ho_So_Gop_LBG_Kem_KHBD_Tuan_${config.currentWeek}_Lop_${selectedClass}_Font${selectedFontSize}.docx`;

    exportKHBDToWord(
      currentKHBDPlans,
      {
        ...config,
        fontSize: selectedFontSize,
        currentTeacher: viewMode === "teacher" ? activeTeacher.name : classTeacherName,
        currentClass: viewMode === "teacher" ? (activeTeacher.assignedClasses?.[0] || config.currentClass) : selectedClass,
      },
      {
        includeLBGPage1: true,
        lbgItems: currentLBGItems,
        customFileName,
      }
    );
  };

  const daysList = [
    { day: 2, name: "Thứ Hai" },
    { day: 3, name: "Thứ Ba" },
    { day: 4, name: "Thứ Tư" },
    { day: 5, name: "Thứ Năm" },
    { day: 6, name: "Thứ Sáu" },
  ];

  const sortedDays = Object.keys(daysMap)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {/* Top Header & Mode Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                Kế Hoạch Giảng Dạy Tuần {config.currentWeek}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Đồng Bộ Với TKB & KHBD
              </span>
              <span className="text-xs text-slate-500">
                (7 Tiết / Ngày • Bỏ cột tích hợp thay ghi chú theo quy định)
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {viewMode === "teacher" ? (
                <span>
                  LỊCH BÁO GIẢNG CÁ NHÂN:{" "}
                  <span className="text-blue-700">{activeTeacher?.name.toUpperCase()}</span>
                </span>
              ) : (
                <span>
                  LỊCH BÁO GIẢNG TOÀN LỚP: <span className="text-blue-700">LỚP {selectedClass}</span>
                </span>
              )}
            </h2>

            <p className="text-xs text-slate-600 mt-1">
              {config.schoolName} • Tuần {config.currentWeek} (Từ {config.startDate} đến {config.endDate}) •{" "}
              {viewMode === "teacher" ? (
                <>
                  Giáo viên: <strong>{activeTeacher?.name}</strong> ({activeTeacher?.role}) • Tổng số:{" "}
                  <strong className="text-blue-700">{currentLBGItems.length} tiết giảng dạy</strong>
                </>
              ) : (
                <>
                  Lớp: <strong>{selectedClass}</strong> • GVCN: <strong>{classTeacherName}</strong>
                </>
              )}
            </p>
          </div>

          {/* Mode Switch & Controls */}
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
                <span>LBG Cá Nhân Giáo Viên</span>
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
                <span>LBG Toàn Lớp</span>
              </button>
            </div>

            {/* Week Selector */}
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
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
            </div>

            {/* Font Selector */}
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
                <option value={13}>13 pt</option>
                <option value={14}>14 pt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Selector Bar */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {viewMode === "teacher" ? (
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-semibold text-slate-500 mr-1 whitespace-nowrap">Bộ lọc:</span>
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
                  GV Chuyên (15)
                </button>
              </div>

              <div className="flex-1 max-w-md">
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
          ) : (
            <div className="flex-1 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold text-slate-500 mr-1 whitespace-nowrap">Chọn Lớp:</span>
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

          {/* Export Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {onOpenKHBDUpload && (
              <button
                onClick={onOpenKHBDUpload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
                title="Tải lên file Word (.docx) hoặc dán văn bản KHDH/KHBD để tự động cập nhật tên bài và phân phối chương trình"
              >
                <Upload className="w-4 h-4" />
                <span>Tải Lên / Đồng Bộ KHBD</span>
              </button>
            )}

            <button
              onClick={handleExportLBG}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải LBG Word</span>
            </button>

            <button
              onClick={handleExportCombined}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Tải Gộp (LBG + KHBD)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KHDH Audit & Validation Status Bar */}
      {validationReport.isValid ? (
        <div className="bg-emerald-50/90 border border-emerald-300/80 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-emerald-950">
                  Lịch Báo Giảng Hợp Lệ: Khớp 100% Kế Hoạch Dạy Học
                </span>
                <span className="text-[11px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                  {validationReport.matchCount}/{validationReport.totalChecked - validationReport.skippedCount} tiết chuẩn
                </span>
              </div>
              <p className="text-xs text-emerald-700 mt-0.5">
                Nguồn đối soát: <strong className="text-emerald-900">{validationReport.khdhSourceName}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsValidationModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition cursor-pointer shadow-2xs"
            >
              Xem Chi Tiết Đối Soát
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-linear-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-amber-950">
                  Cảnh Báo Sai Lệch Lịch Báo Giảng So Với KHDH
                </span>
                <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                  {validationReport.mismatchCount} tiết chưa khớp
                </span>
              </div>
              <div className="text-xs text-amber-800 mt-0.5 flex items-center gap-3 flex-wrap">
                <span>
                  • Lệch tên bài: <strong className="text-rose-700 font-bold">{validationReport.titleMismatchCount} tiết</strong>
                </span>
                <span>
                  • Lệch tiết PPCT: <strong className="text-amber-900 font-bold">{validationReport.ppctMismatchCount} tiết</strong>
                </span>
                <span className="text-slate-600 hidden md:inline">
                  • Nguồn: {validationReport.khdhSourceName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            <button
              onClick={handleApplyFixAll}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
              title="Tự động sửa toàn bộ tên bài học và số tiết PPCT bị lệch theo KHDH"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Sửa Tất Cả Theo KHDH ({validationReport.mismatchCount})</span>
            </button>
            <button
              onClick={() => setIsValidationModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-bold transition cursor-pointer shadow-2xs"
            >
              Bảng Đối Soát ({validationReport.mismatchCount})
            </button>
          </div>
        </div>
      )}

      {/* Day Filter Toolbar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-500 mr-1 whitespace-nowrap">Lọc theo thứ:</span>
        <button
          onClick={() => setSelectedDayFilter("all")}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
            selectedDayFilter === "all"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Cả tuần ({currentLBGItems.length} tiết)
        </button>

        {daysList.map((d) => (
          <button
            key={d.day}
            onClick={() => setSelectedDayFilter(d.day)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
              selectedDayFilter === d.day
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* LBG Table: Exactly matching standard school template */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white text-xs font-bold text-center">
                <th className="p-3 border border-slate-700 w-32">Thứ, ngày</th>
                <th className="p-3 border border-slate-700 w-20">Buổi</th>
                <th className="p-3 border border-slate-700 w-16">Tiết</th>
                <th className="p-3 border border-slate-700 w-44 text-left">Môn học</th>
                <th className="p-3 border border-slate-700 w-24">Tiết PPCT</th>
                <th className="p-3 border border-slate-700 text-left">Tên bài dạy / Hoạt động giáo dục</th>
                <th className="p-3 border border-slate-700 w-32 text-center">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-200">
              {sortedDays.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Không có tiết giảng dạy nào trong ngày này.
                  </td>
                </tr>
              ) : (
                sortedDays.map((dayKey) => {
                  const dayItems = daysMap[dayKey];
                  const morningItems = dayItems.filter((i) => i.session === "Sáng");
                  const afternoonItems = dayItems.filter((i) => i.session === "Chiều");
                  const orderedItems = [...morningItems, ...afternoonItems];

                  return orderedItems.map((item, itemIdx) => {
                    const isFirstItemOfDay = itemIdx === 0;
                    const isFirstMorning = morningItems.length > 0 && itemIdx === 0;
                    const isFirstAfternoon =
                      afternoonItems.length > 0 && itemIdx === morningItems.length;

                    return (
                      <tr
                        key={item.id}
                        className={`transition ${
                          item.session === "Sáng"
                            ? "bg-white hover:bg-blue-50/40"
                            : "bg-amber-50/20 hover:bg-amber-50/50"
                        } ${isFirstAfternoon ? "border-t-2 border-amber-300" : ""}`}
                      >
                        {/* Day & Date cell (rowSpan for first item of day) */}
                        {isFirstItemOfDay && (
                          <td
                            rowSpan={orderedItems.length}
                            className="p-3 border border-slate-200 align-top font-bold text-slate-900 text-center bg-slate-50"
                          >
                            <div className="text-xs text-blue-700 font-bold">{item.dayName}</div>
                            <div className="text-[11px] text-slate-500 font-normal mt-0.5">{item.dateStr}</div>
                          </td>
                        )}

                        {/* Session cell: rowSpan for morning, and rowSpan for afternoon */}
                        {isFirstMorning && (
                          <td
                            rowSpan={morningItems.length}
                            className="p-2.5 border border-slate-200 text-center font-bold text-blue-900 bg-blue-50/60"
                          >
                            <div className="flex flex-col items-center justify-center gap-0.5">
                              <Sun className="w-3.5 h-3.5 text-amber-500" />
                              <span className="text-[11px] tracking-wide">SÁNG</span>
                            </div>
                          </td>
                        )}

                        {isFirstAfternoon && (
                          <td
                            rowSpan={afternoonItems.length}
                            className="p-2.5 border border-slate-200 text-center font-bold text-amber-900 bg-amber-100/50"
                          >
                            <div className="flex flex-col items-center justify-center gap-0.5">
                              <Sunset className="w-3.5 h-3.5 text-orange-500" />
                              <span className="text-[11px] tracking-wide">CHIỀU</span>
                            </div>
                          </td>
                        )}

                        {/* Period */}
                        <td className="p-2.5 border border-slate-200 text-center font-bold text-slate-900">
                          {item.period}
                        </td>

                        {/* Subject */}
                        <td className="p-2.5 border border-slate-200 font-bold text-blue-900">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>{item.subject}</span>
                            {item.isOtherTeacher && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
                                GV chuyên
                              </span>
                            )}
                            {item.className && viewMode === "teacher" && (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                {item.className}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* PPCT */}
                        <td className="p-2.5 border border-slate-200 text-center font-semibold text-amber-800">
                          {item.isOtherTeacher ? (
                            "—"
                          ) : (() => {
                            const issue = validationReport.issuesMap[item.id];
                            if (issue && issue.ppctDifference) {
                              return (
                                <div className="flex flex-col items-center justify-center gap-1">
                                  <span className="text-slate-800 font-bold">{item.ppctLessonNumber}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApplyFixSingle(issue);
                                    }}
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold border border-amber-300 transition cursor-pointer"
                                    title={`KHDH chuẩn là Tiết ${issue.expectedKhdhItem?.ppct}. Bấm để đồng bộ theo KHDH`}
                                  >
                                    <AlertTriangle className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                                    <span>KHDH: {issue.expectedKhdhItem?.ppct}</span>
                                  </button>
                                </div>
                              );
                            }
                            return item.ppctLessonNumber;
                          })()}
                        </td>

                        {/* Lesson Title: per user requirement: phần GV khác dạy (GV chuyên) vẫn để thông tin GV tên gì, dạy môn gì, không cần ghi tên bài học. */}
                        <td className="p-2.5 border border-slate-200 text-slate-800 font-medium">
                          {item.isOtherTeacher ? (
                            <span className="inline-flex items-center gap-1 text-amber-800 font-semibold italic bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              ({item.teacherName} dạy)
                            </span>
                          ) : (() => {
                            const issue = validationReport.issuesMap[item.id];
                            if (issue && issue.titleDifference) {
                              return (
                                <div className="space-y-1">
                                  <div className="text-slate-900 font-bold">{item.lessonTitle}</div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                                      <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
                                      <span>KHDH: <strong>{issue.expectedKhdhItem?.title}</strong></span>
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleApplyFixSingle(issue);
                                      }}
                                      className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shadow-2xs"
                                      title="Đồng bộ tên bài này theo đúng KHDH"
                                    >
                                      Sửa theo KHDH
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                            return item.lessonTitle;
                          })()}
                        </td>

                        {/* Ghi chú */}
                        <td className="p-2.5 border border-slate-200 text-center">
                          {item.isOtherTeacher ? (
                            <span className="text-amber-900 font-semibold text-xs">
                              {item.teacherName} dạy
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">{item.integrationNote || "—"}</span>
                          )}
                        </td>
                      </tr>
                    );
                  });
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LBG Validation & Audit Modal */}
      <LBGValidationModal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        report={validationReport}
        config={config}
        onApplyFixSingle={handleApplyFixSingle}
        onApplyFixAll={handleApplyFixAll}
        onOpenKHBDUpload={onOpenKHBDUpload}
      />
    </div>
  );
};
