import React, { useState } from "react";
import {
  Users,
  Download,
  FileDown,
  Calendar,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  BookOpen,
  Filter,
  Grid,
  List,
} from "lucide-react";
import { KHBDLessonPlan, LBGItem, SchoolConfig, TeacherInfo, TimetableSlot } from "../types";
import { exportLBGToWord, exportKHBDToWord, exportTKBToWord } from "../utils/docxExport";
import { getTeacherAssignedSlots, isTeacherMatchingSlot } from "../utils/teacherMatcher";
import { getConcreteLessonContent } from "../data/concreteLessonPlans";

interface TeacherScheduleExportProps {
  teachers: TeacherInfo[];
  slots: TimetableSlot[];
  config: SchoolConfig;
  classes: string[];
  masterLBG: LBGItem[];
  masterKHBD: KHBDLessonPlan[];
}

function getDateForDay(startDateStr: string, day: number): string {
  if (!startDateStr) return "";
  const parts = startDateStr.split(/[\/\-]/);
  if (parts.length === 3) {
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);
    const date = new Date(y, m, d);
    if (!isNaN(date.getTime())) {
      const offset = Math.max(0, day - 2);
      date.setDate(date.getDate() + offset);
      const dayStr = String(date.getDate()).padStart(2, "0");
      const monthStr = String(date.getMonth() + 1).padStart(2, "0");
      return `${dayStr}/${monthStr}/${date.getFullYear()}`;
    }
  }
  return startDateStr;
}

export const TeacherScheduleExport: React.FC<TeacherScheduleExportProps> = ({
  teachers,
  slots,
  config,
  classes,
  masterLBG,
  masterKHBD,
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[0]?.id || "");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<"all" | "homeroom" | "specialist">("all");
  const [selectedFontSize, setSelectedFontSize] = useState<12 | 13 | 14>(config.fontSize || 13);
  const [previewMode, setPreviewMode] = useState<"grid" | "list" | "khbd">("grid");

  const filteredTeachers = teachers.filter((t) => {
    if (selectedRoleFilter === "homeroom") return !t.isSpecialist;
    if (selectedRoleFilter === "specialist") return t.isSpecialist;
    return true;
  });

  const activeTeacher = teachers.find((t) => t.id === selectedTeacherId) || teachers[0];

  // Calculate teacher's slots & weekly teaching periods using robust matching
  const teacherAssignments = activeTeacher
    ? getTeacherAssignedSlots(slots, activeTeacher)
    : [];

  // Generate tailored LBG for this teacher strictly chronologically with empty Ghi chú column
  const subjectCounters: Record<string, number> = {};
  const teacherLBGItems: LBGItem[] = teacherAssignments.map((item, idx) => {
    const { slot, className: cls, subject } = item;
    const grade = (parseInt(cls.charAt(0), 10) || 1) as 1 | 2 | 3 | 4 | 5;
    const cleanSubj = subject.replace(/\s*\(.*?\)/g, "").trim();

    const counterKey = `${cleanSubj}_${cls}`;
    subjectCounters[counterKey] = (subjectCounters[counterKey] || 0) + 1;
    const currentPpct = subjectCounters[counterKey];

    const concreteData = getConcreteLessonContent(cleanSubj, grade, currentPpct, config.currentWeek || 1);

    return {
      id: `lbg_t_${idx}`,
      day: slot.day,
      dayName: slot.dayName,
      dateStr: getDateForDay(config.startDate, slot.day),
      session: slot.session,
      period: slot.period,
      overallPeriodOfDay: slot.session === "Sáng" ? slot.period : slot.period + 4,
      subject: activeTeacher.isSpecialist ? `${subject} (${cls})` : subject,
      ppctLessonNumber: currentPpct,
      lessonTitle: concreteData.title || `Bài học Tuần ${config.currentWeek} - ${cleanSubj}`,
      integrationNote: "", // Bỏ trống cột ghi chú LBG theo đúng yêu cầu
      teacherName: activeTeacher?.name || config.currentTeacher,
      className: cls,
      grade: grade,
    };
  });

  // Generate tailored KHBD for this teacher strictly matching chronological order of TKB and LBG
  const teacherKHBDPlans: KHBDLessonPlan[] = teacherLBGItems.map((lbg, idx) => {
    const cleanSubj = lbg.subject.replace(/\s*\(.*?\)/g, "").trim();
    const lessonPpct = typeof lbg.ppctLessonNumber === "number" ? lbg.ppctLessonNumber : Number(lbg.ppctLessonNumber) || (idx + 1);
    const concreteData = getConcreteLessonContent(cleanSubj, lbg.grade, lessonPpct, config.currentWeek || 1);

    return {
      id: `khbd_t_${idx}`,
      grade: lbg.grade,
      className: lbg.className,
      teacherName: lbg.teacherName,
      schoolName: config.schoolName,
      branchName: config.branchName,
      week: config.currentWeek,
      day: lbg.day,
      dayName: lbg.dayName,
      dateStr: lbg.dateStr,
      session: lbg.session,
      period: lbg.period,
      overallPeriodOfDay: lbg.overallPeriodOfDay,
      subject: cleanSubj,
      subSubject: concreteData.subSubject,
      ppct: lessonPpct,
      title: concreteData.title || lbg.lessonTitle,
      goals: concreteData.goals,
      materials: concreteData.materials,
      activities: concreteData.activities,
      adjustment: concreteData.adjustment || ""
    };
  });

  const handleExportTeacherTKB = () => {
    if (!activeTeacher) return;
    exportTKBToWord(slots, classes, { ...config, fontSize: selectedFontSize }, activeTeacher.name);
  };

  const handleExportTeacherLBG = () => {
    if (!activeTeacher) return;
    exportLBGToWord(
      teacherLBGItems,
      {
        ...config,
        currentTeacher: activeTeacher.name,
        currentClass: activeTeacher.isSpecialist ? "Nhiều lớp" : (activeTeacher.assignedClasses[0] || config.currentClass),
        fontSize: selectedFontSize,
      },
      `LBG_Tuan_${config.currentWeek}_GV_${activeTeacher.name.replace(/\s+/g, "_")}_Font${selectedFontSize}.docx`
    );
  };

  const handleExportTeacherKHBDOnly = () => {
    if (!activeTeacher) return;
    const teacherSlug = activeTeacher.name.replace(/^(Cô|Thầy|GV)\s+/i, "").replace(/\s+/g, "_");
    exportKHBDToWord(
      teacherKHBDPlans,
      {
        ...config,
        currentTeacher: activeTeacher.name,
        currentClass: activeTeacher.isSpecialist ? "Nhiều lớp" : (activeTeacher.assignedClasses[0] || config.currentClass),
        fontSize: selectedFontSize,
      },
      {
        customFileName: `KHBD_Tuan_${config.currentWeek}_GV_${teacherSlug}_Font${selectedFontSize}.docx`,
      }
    );
  };

  const handleExportTeacherCombined = () => {
    if (!activeTeacher) return;
    const teacherSlug = activeTeacher.name.replace(/^(Cô|Thầy|GV)\s+/i, "").replace(/\s+/g, "_");
    exportKHBDToWord(
      teacherKHBDPlans,
      {
        ...config,
        currentTeacher: activeTeacher.name,
        currentClass: activeTeacher.isSpecialist ? "Nhiều lớp" : (activeTeacher.assignedClasses[0] || config.currentClass),
        fontSize: selectedFontSize,
      },
      {
        includeLBGPage1: true,
        lbgItems: teacherLBGItems,
        customFileName: `Ho_So_Gop_LBG_Kem_KHBD_Tuan_${config.currentWeek}_GV_${teacherSlug}_Font${selectedFontSize}.docx`,
      }
    );
  };

  const daysOfWeek = [
    { day: 2, name: "Thứ Hai" },
    { day: 3, name: "Thứ Ba" },
    { day: 4, name: "Thứ Tư" },
    { day: 5, name: "Thứ Năm" },
    { day: 6, name: "Thứ Sáu" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              TRUNG TÂM XUẤT HỒ SƠ DẠY HỌC THEO CÁ NHÂN GIÁO VIÊN
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Hỗ trợ xuất riêng Thời khóa biểu (TKB), Lịch báo giảng (LBG) và Giáo án KHBD gộp cho từng Giáo viên chủ nhiệm & Giáo viên chuyên trách (Tiếng Anh, Tin học, GDTC, Âm nhạc, Mĩ thuật...)
          </p>
        </div>

        {/* Font size choice */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Cỡ chữ Word:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            {[12, 13, 14].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedFontSize(size as 12 | 13 | 14)}
                className={`px-2.5 py-1 rounded-sm font-bold transition cursor-pointer ${
                  selectedFontSize === size
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Font {size} pt
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Teacher Selection + Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Teachers Directory */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg mb-3">
              <button
                onClick={() => setSelectedRoleFilter("all")}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition cursor-pointer text-center ${
                  selectedRoleFilter === "all"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tất cả ({teachers.length})
              </button>
              <button
                onClick={() => setSelectedRoleFilter("homeroom")}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition cursor-pointer text-center ${
                  selectedRoleFilter === "homeroom"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                GVCN
              </button>
              <button
                onClick={() => setSelectedRoleFilter("specialist")}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition cursor-pointer text-center ${
                  selectedRoleFilter === "specialist"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                GV Chuyên
              </button>
            </div>

            {/* List of Teachers */}
            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {filteredTeachers.map((teacher) => {
                const isSelected = teacher.id === activeTeacher?.id;
                const assignedCount = getTeacherAssignedSlots(slots, teacher).length;
                return (
                  <div
                    key={teacher.id}
                    onClick={() => setSelectedTeacherId(teacher.id)}
                    className={`p-3 rounded-lg border transition cursor-pointer ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {teacher.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          teacher.isSpecialist
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {teacher.isSpecialist ? "GV Chuyên" : "GVCN"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 flex items-center justify-between">
                      <span className="truncate max-w-[190px]">{teacher.role}</span>
                      <span className="font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded-sm text-[10px]">
                        {assignedCount} tiết
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Detailed Export Hub for Active Teacher */}
        <div className="lg:col-span-8">
          {activeTeacher ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
              {/* Profile Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                    {activeTeacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {activeTeacher.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-0.5">
                      <span className="font-medium text-emerald-800">{activeTeacher.role}</span>
                      <span>•</span>
                      <span>
                        Môn đảm nhiệm:{" "}
                        <strong className="text-slate-800">
                          {activeTeacher.subjects?.join(", ") || "Toàn bộ môn GVCN"}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-center shrink-0">
                  <div className="text-xs text-emerald-800 font-semibold">Tổng tiết TKB trong tuần</div>
                  <div className="text-lg font-bold text-emerald-950">
                    {teacherAssignments.length} tiết / tuần
                  </div>
                </div>
              </div>

              {/* Action Buttons Hub */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Chọn Loại Hồ Sơ Cần Tải File Word (.docx):
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Export 1: TKB */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3 hover:border-blue-300 transition">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-slate-900">
                        1. Thời Khóa Biểu Cá Nhân
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        Bảng TKB tuần riêng biệt cho giáo viên, chuẩn 7 tiết/ngày (Sáng 4, Chiều 3).
                      </p>
                    </div>
                    <button
                      onClick={handleExportTeacherTKB}
                      className="w-full py-2 px-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải TKB Word</span>
                    </button>
                  </div>

                  {/* Export 2: LBG */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3 hover:border-indigo-300 transition">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-slate-900">
                        2. Lịch Báo Giảng Cá Nhân
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        LBG đầy đủ thông tin GV, Lớp, Phân hiệu, tiết PPCT. Cột Ghi chú để trống.
                      </p>
                    </div>
                    <button
                      onClick={handleExportTeacherLBG}
                      className="w-full py-2 px-3 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải LBG Word</span>
                    </button>
                  </div>

                  {/* Export 3: KHBD Standalone */}
                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col justify-between space-y-3 hover:border-blue-400 transition">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-blue-200 text-blue-800 flex items-center justify-center mb-2">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-blue-950">
                        3. KHBD Chi Tiết Cả Tuần
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        Tất cả các tiết KHBD theo đúng thứ tự trong ngày của LBG và TKB (CV 2345).
                      </p>
                    </div>
                    <button
                      onClick={handleExportTeacherKHBDOnly}
                      className="w-full py-2 px-3 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải KHBD Word</span>
                    </button>
                  </div>

                  {/* Export 4: Combined LBG Trang 1 + KHBD */}
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex flex-col justify-between space-y-3 hover:border-emerald-500 transition">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                        <FileDown className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-emerald-950">
                        4. Hồ Sơ Gộp (LBG + KHBD)
                      </h5>
                      <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                        Trang 1 là Lịch báo giảng, tiếp theo là toàn bộ KHBD 2 cột theo chuẩn CV 2345.
                      </p>
                    </div>
                    <button
                      onClick={handleExportTeacherCombined}
                      className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Tải Gộp Word (VIP)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Preview of Teaching Assignments */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Xem Trước Lịch Giảng Dạy & Kế Hoạch Bài Dạy ({teacherAssignments.length} tiết)
                  </h4>

                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                    <button
                      onClick={() => setPreviewMode("grid")}
                      className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 cursor-pointer ${
                        previewMode === "grid"
                          ? "bg-white text-emerald-800 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Grid className="w-3 h-3" />
                      <span>Lưới Tuần</span>
                    </button>
                    <button
                      onClick={() => setPreviewMode("list")}
                      className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 cursor-pointer ${
                        previewMode === "list"
                          ? "bg-white text-emerald-800 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <List className="w-3 h-3" />
                      <span>Danh Sách LBG</span>
                    </button>
                    <button
                      onClick={() => setPreviewMode("khbd")}
                      className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 cursor-pointer ${
                        previewMode === "khbd"
                          ? "bg-white text-blue-800 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>KHBD Chi Tiết ({teacherKHBDPlans.length})</span>
                    </button>
                  </div>
                </div>

                {previewMode === "grid" ? (
                  /* Weekly Grid Preview */
                  <div className="border border-slate-200 rounded-lg overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-center">
                          <th className="p-2.5 border-r border-slate-200 w-20">Buổi</th>
                          <th className="p-2.5 border-r border-slate-200 w-12">Tiết</th>
                          {daysOfWeek.map((d) => (
                            <th key={d.day} className="p-2.5 border-r last:border-r-0 border-slate-200">
                              {d.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Sáng (1..5) */}
                        {[1, 2, 3, 4, 5].map((pNum, pIdx) => (
                          <tr key={`grid-s-${pNum}`} className={`border-b border-slate-200 ${pIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                            {pIdx === 0 && (
                              <td rowSpan={5} className="p-2.5 border-r border-slate-200 font-bold text-center bg-emerald-50/80 text-emerald-900 align-middle">
                                SÁNG
                              </td>
                            )}
                            <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50">
                              {pNum}
                            </td>
                            {daysOfWeek.map((d) => {
                              const slot = slots.find((s) => s.day === d.day && s.period === pNum && s.session === "Sáng");
                              const matched: { cls: string; subject: string }[] = [];
                              if (slot) {
                                Object.entries(slot.classSubjectMap).forEach(([cls, entry]: [string, { subject: string; teacherName?: string }]) => {
                                  if (isTeacherMatchingSlot(entry, activeTeacher)) {
                                    matched.push({ cls, subject: entry.subject });
                                  }
                                });
                              }

                              return (
                                <td key={`grid-s-${d.day}-${pNum}`} className={`p-2 border-r last:border-r-0 border-slate-200 text-center ${matched.length > 0 ? "bg-emerald-50/50 font-semibold text-emerald-950" : "text-slate-300"}`}>
                                  {matched.length > 0 ? (
                                    matched.map((m, mIdx) => (
                                      <div key={mIdx} className="py-0.5">
                                        <span className="px-1.5 py-0.5 rounded-sm bg-emerald-700 text-white text-[10px] font-bold mr-1">
                                          Lớp {m.cls}
                                        </span>
                                        <span className="text-slate-800 text-xs font-semibold">{m.subject}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <span>—</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}

                        {/* Chiều (1..3) */}
                        {[1, 2, 3].map((pNum, pIdx) => (
                          <tr key={`grid-c-${pNum}`} className={`border-b border-slate-200 ${pIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                            {pIdx === 0 && (
                              <td rowSpan={3} className="p-2.5 border-r border-slate-200 font-bold text-center bg-teal-50/80 text-teal-900 align-middle">
                                CHIỀU
                              </td>
                            )}
                            <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50">
                              {pNum}
                            </td>
                            {daysOfWeek.map((d) => {
                              const slot = slots.find((s) => s.day === d.day && s.period === pNum && s.session === "Chiều");
                              const matched: { cls: string; subject: string }[] = [];
                              if (slot) {
                                Object.entries(slot.classSubjectMap).forEach(([cls, entry]: [string, { subject: string; teacherName?: string }]) => {
                                  if (isTeacherMatchingSlot(entry, activeTeacher)) {
                                    matched.push({ cls, subject: entry.subject });
                                  }
                                });
                              }

                              return (
                                <td key={`grid-c-${d.day}-${pNum}`} className={`p-2 border-r last:border-r-0 border-slate-200 text-center ${matched.length > 0 ? "bg-emerald-50/50 font-semibold text-emerald-950" : "text-slate-300"}`}>
                                  {matched.length > 0 ? (
                                    matched.map((m, mIdx) => (
                                      <div key={mIdx} className="py-0.5">
                                        <span className="px-1.5 py-0.5 rounded-sm bg-teal-700 text-white text-[10px] font-bold mr-1">
                                          Lớp {m.cls}
                                        </span>
                                        <span className="text-slate-800 text-xs font-semibold">{m.subject}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <span>—</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : previewMode === "list" ? (
                  /* Chronological List Preview */
                  <div className="border border-slate-200 rounded-lg overflow-hidden max-h-[380px] overflow-y-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-slate-100 text-slate-800 font-bold sticky top-0">
                        <tr>
                          <th className="p-2.5 border-b border-r border-slate-200 text-center w-12">STT</th>
                          <th className="p-2.5 border-b border-r border-slate-200 text-center w-20">Thứ</th>
                          <th className="p-2.5 border-b border-r border-slate-200 text-center w-16">Buổi</th>
                          <th className="p-2.5 border-b border-r border-slate-200 text-center w-14">Tiết</th>
                          <th className="p-2.5 border-b border-r border-slate-200 text-center w-20">Lớp</th>
                          <th className="p-2.5 border-b border-r border-slate-200">Môn học / Tiết dạy</th>
                          <th className="p-2.5 border-b border-slate-200 text-center w-20">Tiết PPCT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teacherAssignments.map((item, idx) => {
                          const lbgItem = teacherLBGItems[idx];
                          return (
                            <tr
                              key={idx}
                              className={`border-b border-slate-200 hover:bg-emerald-50/40 ${
                                idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                              }`}
                            >
                              <td className="p-2 border-r border-slate-200 text-center text-slate-500 font-semibold">
                                {idx + 1}
                              </td>
                              <td className="p-2 border-r border-slate-200 text-center font-semibold text-slate-800">
                                {item.slot.dayName}
                              </td>
                              <td className="p-2 border-r border-slate-200 text-center font-medium text-slate-600">
                                {item.slot.session}
                              </td>
                              <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-900">
                                {item.slot.period}
                              </td>
                              <td className="p-2 border-r border-slate-200 text-center font-bold text-emerald-800 bg-emerald-50/50">
                                Lớp {item.className}
                              </td>
                              <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">
                                {item.subject}
                              </td>
                              <td className="p-2 text-center font-bold text-blue-700 bg-blue-50/40">
                                {lbgItem?.ppctLessonNumber || idx + 1}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* KHBD Detailed Chronological Preview */
                  <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span>
                        <strong>Thứ tự giáo án:</strong> Sắp xếp chính xác theo trình tự thời gian từng ngày (Thứ Hai ➔ Thứ Sáu), từng buổi (Sáng ➔ Chiều), và từng tiết (Tiết 1 ➔ Tiết 4/5) của TKB & LBG.
                      </span>
                      <span className="font-bold text-blue-800 bg-white px-2 py-0.5 rounded-sm border border-blue-200 shrink-0">
                        {teacherKHBDPlans.length} giáo án
                      </span>
                    </div>

                    {teacherKHBDPlans.map((plan, planIdx) => (
                      <div key={plan.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition shadow-xs">
                        {/* Plan Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-blue-700 text-white font-bold text-xs">
                              {plan.dayName}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 font-semibold text-xs">
                              Buổi {plan.session} • Tiết {plan.period}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">
                              Lớp {plan.className}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              Ngày dạy: <strong>{plan.dateStr}</strong>
                            </span>
                          </div>
                          <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                            Tiết PPCT: {plan.ppct}
                          </span>
                        </div>

                        {/* Title */}
                        <div className="mt-2.5">
                          <h5 className="text-sm font-bold text-slate-900">
                            {plan.subject.toUpperCase()}{plan.subSubject ? ` (${plan.subSubject.toUpperCase()})` : ""}: {plan.title}
                          </h5>
                        </div>

                        {/* Goals summary */}
                        <div className="mt-2 text-xs text-slate-700 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                          <div>
                            <span className="font-bold text-blue-800">1. Yêu cầu cần đạt: </span>
                            <span>{plan.goals.specificCompetencies?.join("; ") || plan.goals.generalCompetencies?.join("; ")}</span>
                          </div>
                          <div>
                            <span className="font-bold text-blue-800">2. Đồ dùng dạy học: </span>
                            <span>{plan.materials.teacher}</span>
                          </div>
                        </div>

                        {/* Activities Steps */}
                        <div className="mt-3 space-y-2">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                            Tiến trình các hoạt động dạy học (Chuẩn CV 2345):
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {plan.activities.map((act, actIdx) => (
                              <div key={actIdx} className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs">
                                <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                                  <span className="text-blue-700">{act.step}</span>
                                  <span className="text-slate-500 font-normal">{act.time}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700 mt-1.5 pt-1.5 border-t border-slate-100">
                                  <div>
                                    <span className="font-semibold text-slate-900 block mb-0.5">Hoạt động của giáo viên:</span>
                                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                                      {act.teacherActivities.slice(0, 3).map((tAct, tIdx) => (
                                        <li key={tIdx} className="truncate">{tAct.replace(/^[-*•]\s*/, "")}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-slate-900 block mb-0.5">Hoạt động của học sinh:</span>
                                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                                      {act.studentActivities.slice(0, 3).map((sAct, sIdx) => (
                                        <li key={sIdx} className="truncate">{sAct.replace(/^[-*•]\s*/, "")}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
