import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Tag,
  Copy,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  Cpu,
  HeartHandshake,
  Sprout,
  Activity,
  Award,
} from "lucide-react";
import { INTEGRATION_CATEGORIES } from "../data/curriculumData";

export const IntegrationDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("nls");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeCategory =
    INTEGRATION_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
    INTEGRATION_CATEGORIES[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredItems = activeCategory.items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              Chỉ Đạo Chuyên Môn GDTH
            </span>
            <span className="text-xs text-slate-500">
              Khung Năng Lực & Tích Hợp Giáo Dục Tiểu Học
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-bold text-slate-900 mt-1">
            DANH MỤC NỘI DUNG TÍCH HỢP CHUẨN VÀO KẾ HOẠCH BÀI DẠY (KHBD)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Tích hợp Năng lực số (TT 02/2024/BGDĐT, CV 3456), Trí tuệ nhân tạo (AI), Quyền con người (QCN), Giáo dục QPAN (TT 08/2024), STEM...
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm nội dung tích hợp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Main Grid: Categories Selector + Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Categories List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <div className="text-xs font-bold text-slate-500 uppercase px-2 py-1 tracking-wider">
              Khung Tích Hợp Chuyên Đề
            </div>
            {INTEGRATION_CATEGORIES.map((cat) => {
              const isSelected = cat.id === activeCategory.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setSearchTerm("");
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "border-blue-700 bg-blue-50/90 text-blue-950 font-bold shadow-xs"
                      : "border-transparent hover:border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{cat.icon}</span>
                    <div>
                      <div className="text-xs leading-snug">{cat.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {cat.items.length} chỉ tiêu / mục tiêu
                      </div>
                    </div>
                  </div>
                  {isSelected && <Tag className="w-3.5 h-3.5 text-blue-700" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Category Details & Quick Copy Items */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
            {/* Header of Active Category */}
            <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl flex items-start gap-3">
              <span className="text-2xl">{activeCategory.icon}</span>
              <div>
                <h3 className="text-base font-bold text-blue-950">
                  {activeCategory.name}
                </h3>
                <p className="text-xs text-blue-900/80 mt-1 leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>
            </div>

            {/* List of Integration Criteria */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span>Nội Dung / Yêu Cầu Cần Đạt Cụ Thể (Bấm sao chép để dán vào KHBD):</span>
                <span className="text-blue-700">{filteredItems.length} nội dung</span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredItems.map((item, idx) => {
                  const isCopied = copiedText === item;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/20 transition flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-800 font-medium leading-relaxed">
                          {item}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopy(item)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md transition shrink-0 cursor-pointer ${
                          isCopied
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-700"
                        }`}
                        title="Sao chép nội dung này để đưa vào giáo án"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
