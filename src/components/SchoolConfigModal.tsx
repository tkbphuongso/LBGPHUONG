import React, { useState } from "react";
import { X, Building2, User, BookOpen, Calendar, Type, Check } from "lucide-react";
import { GradeNumber, SchoolConfig } from "../types";
import { CLASS_GVCN_MAP } from "../data/officialTimetableData";

interface SchoolConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SchoolConfig;
  onSave: (newConfig: SchoolConfig) => void;
}

export const SchoolConfigModal: React.FC<SchoolConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<SchoolConfig>(config);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Thiết Lập Thông Tin Trường, Giáo Viên & Lớp Học
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phòng GD&ĐT / Sở GD&ĐT
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ví dụ: PHÒNG GD&ĐT HUYỆN TÂN THẠNH"
                required
              />
            </div>

            {/* School Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên Trường Tiểu Học
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) =>
                  setFormData({ ...formData, schoolName: e.target.value })
                }
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ví dụ: TRƯỜNG TIỂU HỌC TÂN THẠNH"
                required
              />
            </div>

            {/* Branch / Phân hiệu */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phân Hiệu / Điểm Trường (nếu có)
              </label>
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) =>
                  setFormData({ ...formData, branchName: e.target.value })
                }
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ví dụ: Điểm Trung Tâm hoặc Phân Hiệu 1"
              />
            </div>

            {/* Teacher Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên Giáo Viên Giảng Dạy
              </label>
              <input
                type="text"
                value={formData.currentTeacher}
                onChange={(e) =>
                  setFormData({ ...formData, currentTeacher: e.target.value })
                }
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium text-blue-900"
                placeholder="Ví dụ: Nguyễn Hoàng Tuấn / Cao Thị Khánh Linh"
                required
              />
            </div>

            {/* Grade */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Khối Lớp
              </label>
              <select
                value={formData.currentGrade}
                onChange={(e) => {
                  const g = parseInt(e.target.value, 10) as GradeNumber;
                  const gradeTeachers: Record<number, { teacher: string; defaultClass: string }> = {
                    1: { teacher: "Cô Phan Nguyễn Thị Kiều Phương", defaultClass: "1A1" },
                    2: { teacher: "Cô Thúy", defaultClass: "2A1" },
                    3: { teacher: "Cô K. Ngân", defaultClass: "3A1" },
                    4: { teacher: "Cô D. Hằng", defaultClass: "4A3" },
                    5: { teacher: "Cô Linh", defaultClass: "5A1" },
                  };
                  const def = gradeTeachers[g] || { teacher: formData.currentTeacher, defaultClass: `${g}A1` };
                  setFormData({
                    ...formData,
                    currentGrade: g,
                    currentClass: def.defaultClass,
                    currentTeacher: def.teacher,
                  });
                }}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
              >
                <option value={1}>Khối 1</option>
                <option value={2}>Khối 2</option>
                <option value={3}>Khối 3</option>
                <option value={4}>Khối 4</option>
                <option value={5}>Khối 5</option>
              </select>
            </div>

            {/* Class */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên Lớp Học
              </label>
              <div className="flex gap-1.5 mb-1.5">
                {[1, 2, 3, 4].map((sec) => {
                  const cName = `${formData.currentGrade}A${sec}`;
                  const isSelected = formData.currentClass === cName;
                  return (
                    <button
                      key={cName}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          currentClass: cName,
                          currentTeacher: CLASS_GVCN_MAP[cName] || formData.currentTeacher,
                        })
                      }
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition cursor-pointer ${
                        isSelected
                          ? "bg-blue-700 text-white border-blue-700 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {cName}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                value={formData.currentClass}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setFormData({
                    ...formData,
                    currentClass: e.target.value,
                    currentTeacher: CLASS_GVCN_MAP[val] || formData.currentTeacher,
                  });
                }}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-bold text-slate-800"
                placeholder="Ví dụ: 1A1, 1A2, 2A1, 5A4..."
                required
              />
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Năm Học
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ví dụ: 2025 - 2026 hoặc 2026 - 2027"
                required
              />
            </div>

            {/* Current Week */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tuần Học Thứ
              </label>
              <select
                value={formData.currentWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentWeek: parseInt(e.target.value, 10),
                  })
                }
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
              >
                {[...Array(35)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tuần {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Từ Ngày (Thứ Hai)
              </label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ví dụ: 08/09/2025"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Đến Ngày (Thứ Sáu)
              </label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ví dụ: 12/09/2025"
                required
              />
            </div>
          </div>

          {/* Word Export Font Size Selector (Per prompt: Hỗ trợ tải word font 12, 13, 14) */}
          <div className="pt-3 border-t border-slate-200">
            <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-blue-700" />
              <span>Cỡ chữ xuất file Word (Font Size):</span>
            </label>
            <div className="flex items-center gap-3">
              {[12, 13, 14].map((size) => {
                const isSelected = formData.fontSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        fontSize: size as 12 | 13 | 14,
                      })
                    }
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? "border-blue-700 bg-blue-50 text-blue-800 font-bold"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-blue-700" />}
                    <span>Font {size} pt (Times New Roman)</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              * Quy chuẩn văn bản tiểu học thường dùng font 13 pt hoặc 14 pt, bảng biểu có thể chọn font 12 pt.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition cursor-pointer"
            >
              Lưu Thiết Lập & Đồng Bộ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
