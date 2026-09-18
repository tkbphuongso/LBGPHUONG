import { TeacherInfo, TimetableSlot, SchoolConfig, TKBScenario } from "../types";
import {
  OFFICIAL_SCHOOL_CONFIG,
  OFFICIAL_CLASSES,
  OFFICIAL_TEACHERS,
  OFFICIAL_TIMETABLE_SLOTS,
} from "./officialTimetableData";

export const DEFAULT_SCHOOL_CONFIG: SchoolConfig = OFFICIAL_SCHOOL_CONFIG;
export const DEFAULT_CLASSES: string[] = OFFICIAL_CLASSES;
export const DEFAULT_TEACHERS: TeacherInfo[] = OFFICIAL_TEACHERS;
export const INITIAL_TIMETABLE_SLOTS: TimetableSlot[] = OFFICIAL_TIMETABLE_SLOTS;
export const DEFAULT_TIMETABLE_SLOTS: TimetableSlot[] = OFFICIAL_TIMETABLE_SLOTS;
export const SCHOOL_CLASSES: string[] = OFFICIAL_CLASSES;
export type { TKBScenario };

export const SCHOOL_TKB_SCENARIOS: TKBScenario[] = [
  {
    id: "tkb-tan-thanh-official-2026",
    name: "TKB Trường Chính Năm Học 2026-2027 (Chuẩn Phân Công Mới)",
    badge: "Mới Nhất / Chính Thức",
    description: "Thời khóa biểu thực hiện theo sự phân công mới của nhà trường. Áp dụng toàn trường từ Khối 1 đến Khối 5 (20 lớp: 1A1 đến 5A4, 35 giáo viên).",
    slots: OFFICIAL_TIMETABLE_SLOTS,
  },
  {
    id: "tkb-kieu-phuong-1a1",
    name: "TKB Lớp 1A1 - Cô Phan Nguyễn Thị Kiều Phương",
    badge: "Lớp 1A1",
    description: "Thời khóa biểu chuyên biệt theo phân công mới của Cô Phương (GVCN 1A1, TTCM Khối 1 - 16 tiết dạy + 7 tiết kiêm nhiệm).",
    slots: OFFICIAL_TIMETABLE_SLOTS,
  },
];
