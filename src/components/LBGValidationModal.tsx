import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Wand2,
  FileText,
  Upload,
  X,
  Filter,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  HelpCircle,
} from "lucide-react";
import {
  LBGValidationReport,
  LBGValidationIssue,
  LBGItem,
  KHBDLessonPlan,
  SchoolConfig,
} from "../types";

interface LBGValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: LBGValidationReport;
  config: SchoolConfig;
  onApplyFixSingle: (issue: LBGValidationIssue) => void;
  onApplyFixAll: () => void;
  onOpenKHBDUpload?: () => void;
}

export const LBGValidationModal: React.FC<LBGValidationModalProps> = ({
  isOpen,
  onClose,
  report,
  config,
  onApplyFixSingle,
  onApplyFixAll,
  onOpenKHBDUpload,
}) => {
  const [filterType, setFilterType] = useState<
    "all" | "mismatch" | "title" | "ppct" | "match"
  >("mismatch");

  if (!isOpen) return null;

  const filteredIssues = report.issues.filter((issue) => {
    if (filterType === "all") return true;
    if (filterType === "mismatch")
      return (
        issue.status === "TITLE_MISMATCH" ||
        issue.status === "PPCT_MISMATCH" ||
        issue.status === "BOTH_MISMATCH" ||
        issue.status === "MISSING_IN_KHDH"
      );
    if (filterType === "title")
      return (
        issue.status === "TITLE_MISMATCH" || issue.status === "BOTH_MISMATCH"
      );
    if (filterType === "ppct")
      return (
        issue.status === "PPCT_MISMATCH" || issue.status === "BOTH_MISMATCH"
      );
    if (filterType === "match") return issue.status === "MATCH";
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                report.isValid
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {report.isValid ? (
                <ShieldCheck className="w-6 h-6" />
              ) : (
                <ShieldAlert className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Đối Soát Tính Hợp Lệ Lịch Báo Giảng & KHDH
                </h3>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    report.isValid
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {report.isValid ? "Khớp Chuẩn 100%" : `${report.mismatchCount} Sai Lệch`}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Nguồn đối soát:{" "}
                <strong className="text-slate-700">{report.khdhSourceName}</strong> • Khối{" "}
                {config.currentGrade}, Tuần {config.currentWeek}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary Stat Cards */}
        <div className="p-4 bg-white border-b border-slate-100 grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Tổng số tiết</div>
            <div className="text-lg font-bold text-slate-800">{report.totalChecked}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="text-xs text-emerald-700 font-medium">Khớp chuẩn KHDH</div>
            <div className="text-lg font-bold text-emerald-700">{report.matchCount}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
            <div className="text-xs text-rose-700 font-medium">Lệch tên bài dạy</div>
            <div className="text-lg font-bold text-rose-700">{report.titleMismatchCount}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
            <div className="text-xs text-amber-700 font-medium">Lệch tiết PPCT</div>
            <div className="text-lg font-bold text-amber-700">{report.ppctMismatchCount}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
            <div className="text-xs text-blue-700 font-medium">Tiết GV chuyên</div>
            <div className="text-lg font-bold text-blue-700">{report.skippedCount}</div>
          </div>
        </div>

        {/* Filter and Actions Bar */}
        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Lọc:
            </span>

            <button
              onClick={() => setFilterType("mismatch")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                filterType === "mismatch"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Sai lệch ({report.mismatchCount})
            </button>

            <button
              onClick={() => setFilterType("title")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                filterType === "title"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Lệch tên bài ({report.titleMismatchCount})
            </button>

            <button
              onClick={() => setFilterType("ppct")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                filterType === "ppct"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Lệch PPCT ({report.ppctMismatchCount})
            </button>

            <button
              onClick={() => setFilterType("match")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                filterType === "match"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Khớp chuẩn ({report.matchCount})
            </button>

            <button
              onClick={() => setFilterType("all")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                filterType === "all"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Tất cả ({report.totalChecked})
            </button>
          </div>

          {report.mismatchCount > 0 && (
            <button
              onClick={onApplyFixAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Đồng bộ tất cả {report.mismatchCount} tiết theo KHDH</span>
            </button>
          )}
        </div>

        {/* Detailed Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-xs font-bold uppercase border-b border-slate-200">
                <th className="p-2.5 w-24 text-center">Thứ / Tiết</th>
                <th className="p-2.5 w-32">Môn học</th>
                <th className="p-2.5 w-5/12">Hiện tại trên Lịch Báo Giảng</th>
                <th className="p-2.5 w-5/12">Chuẩn theo Kế hoạch dạy học</th>
                <th className="p-2.5 w-28 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    Không có tiết nào trong danh mục lọc này.
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => {
                  const isMismatch =
                    issue.status === "TITLE_MISMATCH" ||
                    issue.status === "PPCT_MISMATCH" ||
                    issue.status === "BOTH_MISMATCH";

                  return (
                    <tr
                      key={issue.id}
                      className={`transition ${
                        isMismatch ? "bg-amber-50/40 hover:bg-amber-50" : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Slot Info */}
                      <td className="p-2.5 text-center font-semibold text-slate-700 border-r border-slate-100">
                        <div className="font-bold text-blue-800">{issue.lbgItem.dayName}</div>
                        <div className="text-[11px] text-slate-500">
                          {issue.lbgItem.session} - Tiết {issue.lbgItem.period}
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="p-2.5 font-bold text-slate-900 border-r border-slate-100">
                        <div>{issue.lbgItem.subject}</div>
                        {issue.lbgItem.isOtherTeacher && (
                          <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-1.5 py-0.2 rounded inline-block mt-0.5">
                            {issue.lbgItem.teacherName} dạy
                          </span>
                        )}
                      </td>

                      {/* Actual LBG */}
                      <td className="p-2.5 border-r border-slate-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                              issue.ppctDifference
                                ? "bg-rose-100 text-rose-800 border border-rose-200"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            Tiết PPCT: {issue.lbgItem.ppctLessonNumber}
                          </span>
                          {issue.ppctDifference && (
                            <span className="text-[10px] text-rose-600 font-bold">
                              (Lệch PPCT)
                            </span>
                          )}
                        </div>
                        <div
                          className={`font-medium ${
                            issue.titleDifference
                              ? "text-rose-900 font-bold bg-rose-50 p-1.5 rounded border border-rose-200"
                              : "text-slate-800"
                          }`}
                        >
                          {issue.lbgItem.lessonTitle}
                        </div>
                      </td>

                      {/* Expected KHDH */}
                      <td className="p-2.5 border-r border-slate-100">
                        {issue.expectedKhdhItem ? (
                          <>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Tiết PPCT: {issue.expectedKhdhItem.ppct}
                              </span>
                            </div>
                            <div className="text-emerald-950 font-semibold bg-emerald-50/80 p-1.5 rounded border border-emerald-200">
                              {issue.expectedKhdhItem.title}
                            </div>
                          </>
                        ) : (
                          <div className="text-slate-400 italic">Chưa có dữ liệu KHDH</div>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-2.5 text-center">
                        {isMismatch && issue.suggestedFix ? (
                          <button
                            onClick={() => onApplyFixSingle(issue)}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-2xs whitespace-nowrap"
                            title="Cập nhật tiết này theo KHDH"
                          >
                            Đồng bộ
                          </button>
                        ) : issue.status === "MATCH" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Khớp
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onOpenKHBDUpload && (
              <button
                onClick={() => {
                  onClose();
                  onOpenKHBDUpload();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium transition"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Tải lên file KHDH (.docx) khác</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {report.mismatchCount > 0 && (
              <button
                onClick={onApplyFixAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
              >
                <Wand2 className="w-4 h-4" />
                <span>Sửa toàn bộ theo KHDH ({report.mismatchCount} tiết)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
