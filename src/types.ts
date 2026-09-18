export type GradeNumber = 1 | 2 | 3 | 4 | 5;

export type DayOfWeek = 2 | 3 | 4 | 5 | 6; // Thứ 2 đến Thứ 6

export interface SchoolConfig {
  department: string; // PHÒNG GD&ĐT HUYỆN TÂN THẠNH / SỞ GD&ĐT
  schoolName: string; // TRƯỜNG TIỂU HỌC TÂN THẠNH
  branchName: string; // Điểm trường / Phân hiệu (nếu có)
  academicYear: string; // 2025 - 2026 / 2026 - 2027
  currentWeek: number; // Tuần 1, 2, 3...
  startDate: string; // 08/09/2025
  endDate: string; // 12/09/2025
  currentGrade: GradeNumber;
  currentClass: string; // "5A", "2A", "1A"...
  currentTeacher: string; // "Nguyễn Hoàng Tuấn"
  fontSize: 12 | 13 | 14;
}

export interface TeacherInfo {
  id: string;
  name: string;
  shortName: string;
  role: string; // "GVCN 5A", "GV Môn Mĩ thuật", etc.
  isSpecialist: boolean;
  subjects: string[]; // ["Toán", "Tiếng Việt"] or ["GDTC", "Bóng rổ"]
  assignedClasses: string[]; // ["1A", "2A", "5A", ...]
}

export interface TimetableSlot {
  day: DayOfWeek; // 2..6
  dayName: string; // "Thứ Hai", "Thứ Ba"...
  session: "Sáng" | "Chiều";
  period: number; // 1..5 for Sáng, 1..3 for Chiều
  classSubjectMap: Record<string, { subject: string; teacherName?: string; note?: string }>;
}

export interface LBGItem {
  id: string;
  day: DayOfWeek;
  dayName: string;
  dateStr: string;
  session: "Sáng" | "Chiều";
  period: number; // 1..5 or 1..3 (overall up to 7 periods/day)
  overallPeriodOfDay: number; // 1..7 (for 7-period day counting)
  subject: string;
  subSubject?: string;
  ppctLessonNumber: string | number; // Tiết PPCT
  lessonTitle: string; // Tên bài dạy / Hoạt động GD
  integrationNote: string; // Tích hợp NLS, AI, QCN, QPAN, Dinh dưỡng, BVMT, KNS...
  teacherName: string;
  className: string;
  grade: GradeNumber;
  isOtherTeacher?: boolean; // Tiết do GV khác / GV chuyên trách giảng dạy
}

export interface KHBDActivity {
  id?: string;
  step: string; // "1. Khởi động", "2. Khám phá", "3. Luyện tập / Thực hành", "4. Vận dụng / Trải nghiệm"
  time?: string; // "5-7 phút", "10-15 phút"...
  target: string; // Mục tiêu của hoạt động
  teacherActivities: string[]; // Hoạt động của giáo viên (cột 1)
  studentActivities: string[]; // Hoạt động của học sinh (cột 2)
}

export interface KHBDLessonPlan {
  id: string;
  grade: GradeNumber;
  className: string;
  teacherName: string;
  schoolName: string;
  branchName?: string;
  week: number;
  day: DayOfWeek;
  dayName: string;
  dateStr: string;
  session: "Sáng" | "Chiều";
  period: number;
  overallPeriodOfDay: number;
  subject: string;
  subSubject?: string;
  ppct: string | number;
  title: string;
  goals: {
    specificCompetencies: string[]; // 1. Năng lực đặc thù
    generalCompetencies: string[]; // 2. Năng lực chung
    qualities: string[]; // 3. Phẩm chất
    integration?: string; // Tích hợp liên môn, NLS, AI, QCN, QPAN...
  };
  materials: {
    teacher: string[];
    students: string[];
  };
  activities: KHBDActivity[];
  adjustment?: string; // IV. Điều chỉnh sau bài dạy
  isOtherTeacher?: boolean; // Tiết do GV khác / GV chuyên trách giảng dạy
}

export interface IntegrationReference {
  category: "AI" | "NLS" | "QCN" | "QPAN" | "DINH_DUONG" | "BVMT" | "KNS" | "STEM" | "GDDP";
  name: string;
  grade: GradeNumber;
  code?: string;
  subject: string;
  lessonName?: string;
  content: string;
  suggestedActivity: string;
}

export interface TKBScenario {
  id: string;
  name: string;
  badge: string;
  description: string;
  slots: TimetableSlot[];
}

export type LBGValidationStatus =
  | "MATCH"
  | "TITLE_MISMATCH"
  | "PPCT_MISMATCH"
  | "BOTH_MISMATCH"
  | "MISSING_IN_KHDH"
  | "SPECIALIST_SKIPPED";

export interface LBGValidationIssue {
  id: string; // matches LBGItem id
  lbgItem: LBGItem;
  expectedKhdhItem?: KHBDLessonPlan;
  status: LBGValidationStatus;
  severity: "error" | "warning" | "success" | "info";
  titleDifference?: {
    actual: string;
    expected: string;
  };
  ppctDifference?: {
    actual: string | number;
    expected: string | number;
  };
  message: string;
  suggestedFix?: {
    ppctLessonNumber: string | number;
    lessonTitle: string;
    subSubject?: string;
  };
}

export interface LBGValidationReport {
  totalChecked: number;
  matchCount: number;
  mismatchCount: number;
  titleMismatchCount: number;
  ppctMismatchCount: number;
  bothMismatchCount: number;
  skippedCount: number;
  isValid: boolean;
  issues: LBGValidationIssue[];
  issuesMap: Record<string, LBGValidationIssue>;
  khdhSource: "uploaded" | "curriculum_preset" | "none";
  khdhSourceName: string;
  khdhTotalLessons: number;
}
