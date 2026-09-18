// src/utils/dateHelper.ts
// Tiện ích tính toán và đồng bộ thời gian từ Tuần 1 đến Tuần 35 theo Năm học 2026 - 2027

export interface WeekDateRange {
  week: number;
  startDate: string; // DD/MM/YYYY (Thứ Hai)
  endDate: string;   // DD/MM/YYYY (Thứ Sáu)
  saturdayDate: string; // DD/MM/YYYY (Thứ Bảy)
  semester: 1 | 2;
  semesterName: string; // "Học kì I" | "Học kì II"
  dayDates: Record<number, string>; // 2 -> Thứ Hai, 3 -> Thứ Ba, ..., 6 -> Thứ Sáu, 7 -> Thứ Bảy
}

// Mặc định Thứ Hai tuần 1 năm học 2026 - 2027 là ngày 07/09/2026
export const DEFAULT_BASE_MONDAY_STR = "07/09/2026";

/**
 * Phân tích chuỗi ngày DD/MM/YYYY thành Date object
 */
export function parseDateVN(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.trim().split(/[\/\-\.]/);
  if (parts.length === 3) {
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);
    if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
      return new Date(y, m, d);
    }
  }
  return null;
}

/**
 * Định dạng Date object thành chuỗi DD/MM/YYYY
 */
export function formatDateVN(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

/**
 * Tìm ngày Thứ Hai của tuần chứa một ngày bất kì
 */
export function getMondayOfWeek(date: Date): Date {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.getFullYear(), date.getMonth(), diff);
}

/**
 * Tính toán chính xác khoảng thời gian (Từ ngày ... đến ngày ...) và các ngày trong tuần
 * cho bất kì tuần nào từ Tuần 1 đến Tuần 35
 */
export function calculateWeekDates(week: number, baseDateStr?: string): WeekDateRange {
  const safeWeek = Math.max(1, Math.min(35, week || 1));

  // Xác định ngày Thứ Hai gốc của Tuần 1
  let baseMonday: Date;
  const parsed = parseDateVN(baseDateStr || DEFAULT_BASE_MONDAY_STR);
  if (parsed && !isNaN(parsed.getTime())) {
    baseMonday = getMondayOfWeek(parsed);
  } else {
    baseMonday = new Date(2026, 8, 7); // 07/09/2026
  }

  // Thứ Hai của tuần được chọn = baseMonday + (week - 1) * 7 ngày
  const weekMonday = new Date(baseMonday.getTime());
  weekMonday.setDate(baseMonday.getDate() + (safeWeek - 1) * 7);

  // Tính các ngày trong tuần
  const dayDates: Record<number, string> = {};
  for (let day = 2; day <= 7; day++) {
    const currentDayDate = new Date(weekMonday.getTime());
    currentDayDate.setDate(weekMonday.getDate() + (day - 2));
    dayDates[day] = formatDateVN(currentDayDate);
  }

  const startDate = dayDates[2]; // Thứ Hai
  const endDate = dayDates[6];   // Thứ Sáu
  const saturdayDate = dayDates[7]; // Thứ Bảy

  const semester = safeWeek <= 18 ? 1 : 2;
  const semesterName = semester === 1 ? "Học kì I" : "Học kì II";

  return {
    week: safeWeek,
    startDate,
    endDate,
    saturdayDate,
    semester,
    semesterName,
    dayDates,
  };
}

/**
 * Lấy ngày cụ thể (DD/MM/YYYY) cho một thứ trong tuần (day: 2 = Thứ Hai, 6 = Thứ Sáu)
 */
export function getDateForDay(week: number, day: number, baseDateStr?: string): string {
  const weekDates = calculateWeekDates(week, baseDateStr);
  return weekDates.dayDates[day] || weekDates.startDate;
}
