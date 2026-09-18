import { TeacherInfo, TimetableSlot, SchoolConfig, LBGItem, KHBDLessonPlan, GradeNumber } from "../types";
import { getTeacherAssignedSlots } from "./teacherMatcher";
import { getConcreteLessonContent } from "../data/concreteLessonPlans";
import { getDateForDay } from "./dateHelper";
import { CLASS_GVCN_MAP } from "../data/officialTimetableData";

/**
 * Calculates calendar date string for a given day of the week (2 = Thứ Hai ... 6 = Thứ Sáu)
 */
export function getDateForDayOfWeek(startDateStr: string, day: number, week: number = 1): string {
  return getDateForDay(week, day, startDateStr);
}

/**
 * Robust matcher to find custom or uploaded lesson plan in customPlansMap
 */
export function findMatchingCustomPlan(
  customPlansMap: Record<string, KHBDLessonPlan> | undefined,
  criteria: {
    planId?: string;
    className?: string;
    day: number;
    session: "Sáng" | "Chiều";
    period: number;
    week?: number;
    subject?: string;
    ppct?: number;
    grade?: GradeNumber;
  }
): KHBDLessonPlan | undefined {
  if (!customPlansMap) return undefined;

  // 1. Direct planId match
  if (criteria.planId && customPlansMap[criteria.planId]) {
    return customPlansMap[criteria.planId];
  }

  // 2. Class slot keys
  if (criteria.className) {
    const k1 = `khbd_cls_${criteria.className}_${criteria.day}_${criteria.session}_${criteria.period}`;
    if (customPlansMap[k1]) return customPlansMap[k1];

    const k2 = `cls_${criteria.className}_${criteria.day}_${criteria.session}_${criteria.period}`;
    if (customPlansMap[k2]) return customPlansMap[k2];

    if (criteria.week) {
      const k3 = `slot_w${criteria.week}_c${criteria.className}_d${criteria.day}_s${criteria.session}_p${criteria.period}`;
      if (customPlansMap[k3]) return customPlansMap[k3];
    }
  }

  // 3. Subject and PPCT keys (matches uploaded lessons by PPCT or subject)
  if (criteria.subject && criteria.ppct) {
    const cleanSubj = criteria.subject.replace(/\s*\(.*?\)/g, "").trim();
    if (criteria.grade) {
      const k4 = `subj_${cleanSubj}_g${criteria.grade}_p${criteria.ppct}`;
      if (customPlansMap[k4]) return customPlansMap[k4];
    }
    if (criteria.week) {
      const k5 = `subj_${cleanSubj}_w${criteria.week}_p${criteria.ppct}`;
      if (customPlansMap[k5]) return customPlansMap[k5];
    }
  }

  // 4. Scan existing custom plans in map
  const allPlans = Object.values(customPlansMap);

  // 4a. Match by exact slot in class
  if (criteria.className) {
    const slotMatch = allPlans.find(
      (p) =>
        (!p.className || p.className === criteria.className) &&
        p.day === criteria.day &&
        p.session === criteria.session &&
        p.period === criteria.period &&
        (!criteria.week || !p.week || p.week === criteria.week)
    );
    if (slotMatch) return slotMatch;
  }

  // 4b. Match by Subject and PPCT
  if (criteria.subject && criteria.ppct) {
    const cleanSubj = criteria.subject.replace(/\s*\(.*?\)/g, "").trim().toLowerCase();
    const ppctMatch = allPlans.find((p) => {
      const pSubj = (p.subject || "").replace(/\s*\(.*?\)/g, "").trim().toLowerCase();
      return (
        pSubj === cleanSubj &&
        p.ppct === criteria.ppct &&
        (!criteria.grade || !p.grade || p.grade === criteria.grade) &&
        (!criteria.week || !p.week || p.week === criteria.week)
      );
    });
    if (ppctMatch) return ppctMatch;
  }

  return undefined;
}

/**
 * Derives personalized LBG items and KHBD lesson plans specifically for a teacher
 * strictly based on their assigned timetable slots and LBG in chronological order.
 */
export function buildTeacherLBGAndKHBD(
  teacher: TeacherInfo,
  slots: TimetableSlot[],
  config: SchoolConfig,
  customPlansMap?: Record<string, KHBDLessonPlan>
): {
  teacherLBGItems: LBGItem[];
  teacherKHBDPlans: KHBDLessonPlan[];
} {
  // If teacher is a GVCN (homeroom teacher):
  // Their weekly LBG and KHBD must show all 30-32 periods of their homeroom class.
  // Per user requirement: "LBG, KHBD các tiết GVCN không dạy vẫn lên LBG, KHBD nhưng không ghi tên bài dạy, chỉ ghi môn dạy và tên GV chuyên dạy thôi".
  if (!teacher.isSpecialist && teacher.assignedClasses && teacher.assignedClasses.length > 0) {
    const homeroomClass = teacher.assignedClasses[0];
    const { classLBGItems, classKHBDPlans } = buildClassLBGAndKHBD(
      homeroomClass,
      slots,
      config,
      customPlansMap,
      teacher
    );
    return {
      teacherLBGItems: classLBGItems,
      teacherKHBDPlans: classKHBDPlans,
    };
  }

  const teacherAssignments = getTeacherAssignedSlots(slots, teacher);
  const currentWeek = config.currentWeek || 1;

  // Pre-calculate weekly periods count per subject & class
  const weeklyTotals: Record<string, number> = {};
  teacherAssignments.forEach((item) => {
    const clean = item.subject.replace(/\s*\(.*?\)/g, "").trim();
    const key = `${clean}_${item.className}`;
    weeklyTotals[key] = (weeklyTotals[key] || 0) + 1;
  });

  const subjectCounters: Record<string, number> = {};
  const teacherLBGItems: LBGItem[] = [];
  const teacherKHBDPlans: KHBDLessonPlan[] = [];

  teacherAssignments.forEach((item) => {
    const { slot, className: cls, subject } = item;
    const grade = (parseInt(cls.charAt(0), 10) || 1) as GradeNumber;
    const cleanSubj = subject.replace(/\s*\(.*?\)/g, "").trim();

    // Track sequential PPCT per subject & class
    const counterKey = `${cleanSubj}_${cls}`;
    const countInWeek = (subjectCounters[counterKey] || 0) + 1;
    subjectCounters[counterKey] = countInWeek;

    const totalPerWeek = weeklyTotals[counterKey] || 1;
    const currentPpct = (currentWeek - 1) * totalPerWeek + countInWeek;

    // Unique ID for this teacher lesson slot
    const planId = `khbd_${teacher.id}_${slot.day}_${slot.session}_${slot.period}_${cls}`;

    const concreteData = getConcreteLessonContent(cleanSubj, grade, currentPpct, currentWeek);
    const customPlan = findMatchingCustomPlan(customPlansMap, {
      planId,
      className: cls,
      day: slot.day,
      session: slot.session,
      period: slot.period,
      week: currentWeek,
      subject: cleanSubj,
      ppct: currentPpct,
      grade,
    });

    const dateStr = getDateForDay(currentWeek, slot.day, config.startDate);

    const lbgItem: LBGItem = {
      id: `lbg_${teacher.id}_${slot.day}_${slot.session}_${slot.period}_${cls}`,
      day: slot.day,
      dayName: slot.dayName,
      dateStr: dateStr,
      session: slot.session,
      period: slot.period,
      overallPeriodOfDay: slot.session === "Sáng" ? slot.period : slot.period + 4,
      subject: teacher.isSpecialist ? `${subject} (${cls})` : subject,
      ppctLessonNumber: currentPpct,
      lessonTitle: customPlan?.title || concreteData.title || `Bài học Tuần ${currentWeek} - ${cleanSubj}`,
      integrationNote: "", // Blank per school regulations
      teacherName: teacher.name,
      className: cls,
      grade: grade,
    };
    teacherLBGItems.push(lbgItem);

    const khbdPlan: KHBDLessonPlan = customPlan
      ? {
          ...customPlan,
          day: slot.day,
          dayName: slot.dayName,
          dateStr: dateStr,
          session: slot.session,
          period: slot.period,
          className: cls,
          teacherName: teacher.name,
          ppct: currentPpct,
        }
      : {
          id: planId,
          grade: grade,
          className: cls,
          teacherName: teacher.name,
          schoolName: config.schoolName,
          branchName: config.branchName,
          week: currentWeek,
          day: slot.day,
          dayName: slot.dayName,
          dateStr: dateStr,
          session: slot.session,
          period: slot.period,
          overallPeriodOfDay: slot.session === "Sáng" ? slot.period : slot.period + 4,
          subject: cleanSubj,
          subSubject: concreteData.subSubject,
          ppct: currentPpct,
          title: concreteData.title,
          goals: concreteData.goals,
          materials: concreteData.materials,
          activities: concreteData.activities,
          adjustment: concreteData.adjustment || "",
        };

    teacherKHBDPlans.push(khbdPlan);
  });

  return { teacherLBGItems, teacherKHBDPlans };
}

/**
 * Derives full class LBG and KHBD (all 32 slots of a specific class)
 */
export function buildClassLBGAndKHBD(
  className: string,
  slots: TimetableSlot[],
  config: SchoolConfig,
  customPlansMap?: Record<string, KHBDLessonPlan>,
  forTeacher?: TeacherInfo
): {
  classLBGItems: LBGItem[];
  classKHBDPlans: KHBDLessonPlan[];
} {
  const grade = (parseInt(className.charAt(0), 10) || 1) as GradeNumber;
  const currentWeek = config.currentWeek || 1;

  const sortedSlots = [...slots].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    if (a.session !== b.session) return a.session === "Sáng" ? -1 : 1;
    return a.period - b.period;
  });

  // Pre-calculate weekly periods count per subject
  const weeklyTotals: Record<string, number> = {};
  sortedSlots.forEach((slot) => {
    const entry = slot.classSubjectMap[className];
    const raw = entry?.subject || "";
    if (raw && raw !== "—" && raw !== "SHCM") {
      const clean = raw.replace(/\s*\(.*?\)/g, "").trim();
      weeklyTotals[clean] = (weeklyTotals[clean] || 0) + 1;
    }
  });

  const subjectCounters: Record<string, number> = {};
  const classLBGItems: LBGItem[] = [];
  const classKHBDPlans: KHBDLessonPlan[] = [];

  sortedSlots.forEach((slot) => {
    const entry = slot.classSubjectMap[className];
    const rawSubject = entry?.subject || "";
    if (!rawSubject || rawSubject === "—" || rawSubject === "SHCM") return;

    const cleanSubj = rawSubject.replace(/\s*\(.*?\)/g, "").trim();
    const countInWeek = (subjectCounters[cleanSubj] || 0) + 1;
    subjectCounters[cleanSubj] = countInWeek;

    const totalPerWeek = weeklyTotals[cleanSubj] || 1;
    const currentPpct = (currentWeek - 1) * totalPerWeek + countInWeek;

    const planId = `khbd_cls_${className}_${slot.day}_${slot.session}_${slot.period}`;
    const concreteData = getConcreteLessonContent(cleanSubj, grade, currentPpct, currentWeek);
    const customPlan = findMatchingCustomPlan(customPlansMap, {
      planId,
      className,
      day: slot.day,
      session: slot.session,
      period: slot.period,
      week: currentWeek,
      subject: cleanSubj,
      ppct: currentPpct,
      grade,
    });

    const rawTeacher = entry?.teacherName?.trim() || "";
    const homeroomTeacher = forTeacher?.name || CLASS_GVCN_MAP[className] || config.currentTeacher;
    let teacherName = "";
    let isOtherTeacher = false;

    if (
      rawTeacher === "D. Hằng" ||
      rawTeacher === "D.Hằng" ||
      rawTeacher.toLowerCase().includes("d. hằng") ||
      rawTeacher.toLowerCase().includes("d.hằng")
    ) {
      teacherName = "Cô D. Hằng";
    } else if (rawTeacher === "Hằng" || rawTeacher.toLowerCase() === "cô hằng") {
      teacherName = "Cô Hằng (Anh văn)";
    } else if (rawTeacher === "My" || rawTeacher.toLowerCase() === "cô my") {
      teacherName = "Cô Nguyễn Trúc My";
    } else if (rawTeacher === "Toàn" || rawTeacher.toLowerCase() === "thầy toàn") {
      teacherName = "Thầy Toàn";
    } else if (rawTeacher === "Sơn" || rawTeacher.toLowerCase() === "thầy sơn") {
      teacherName = "Thầy Sơn";
    } else if (rawTeacher === "Sum" || rawTeacher.toLowerCase() === "thầy sum") {
      teacherName = "Thầy Sum";
    } else if (rawTeacher === "Như" || rawTeacher.toLowerCase() === "cô như") {
      teacherName = "Cô Huỳnh Thị Như";
    } else if (rawTeacher === "Dánh" || rawTeacher.toLowerCase() === "thầy dánh") {
      teacherName = "Thầy Dánh";
    } else if (rawTeacher === "Thơ" || rawTeacher.toLowerCase() === "cô thơ") {
      teacherName = "Cô Thơ";
    } else if (rawTeacher === "Ngân" || rawTeacher.toLowerCase() === "cô ngân") {
      teacherName = "Cô Ngân";
    } else if (rawTeacher === "Tâm" || rawTeacher.toLowerCase() === "cô tâm") {
      teacherName = "Cô Lê Thị Thanh Tâm";
    } else if (rawTeacher === "Dung" || rawTeacher.toLowerCase() === "cô dung") {
      teacherName = "Cô Dung";
    } else if (rawTeacher === "Tú Trinh" || rawTeacher === "Trinh") {
      teacherName = "Cô Tú Trinh";
    } else if (rawTeacher) {
      teacherName =
        rawTeacher.startsWith("Cô ") || rawTeacher.startsWith("Thầy ")
          ? rawTeacher
          : `GV. ${rawTeacher}`;
    } else {
      // Slot without teacher specified in cell
      const lowerSubj = cleanSubj.toLowerCase();
      if (lowerSubj.includes("tiếng anh") || lowerSubj.startsWith("ta")) {
        teacherName = "Cô Hằng (Anh văn)";
        isOtherTeacher = true;
      } else if (lowerSubj.includes("tin học") || lowerSubj.startsWith("th")) {
        teacherName = "Thầy Toàn";
        isOtherTeacher = true;
      } else if (lowerSubj.includes("âm nhạc") || lowerSubj.startsWith("an")) {
        teacherName = "Cô Huỳnh Thị Như";
        isOtherTeacher = true;
      } else if (lowerSubj.includes("mĩ thuật") || lowerSubj.startsWith("mt")) {
        teacherName = "Thầy Dánh";
        isOtherTeacher = true;
      } else if (lowerSubj.includes("giáo dục thể chất") || lowerSubj.includes("gdtc")) {
        teacherName = "Thầy Sơn";
        isOtherTeacher = true;
      } else {
        teacherName = homeroomTeacher;
        isOtherTeacher = false;
      }
    }

    // Verify if teacherName is different from the homeroom teacher of this class
    if (teacherName && !isOtherTeacher) {
      const isDHangHomeroom = homeroomTeacher.includes("D. Hằng") || homeroomTeacher.includes("D.Hằng");
      if (isDHangHomeroom) {
        isOtherTeacher = teacherName !== "Cô D. Hằng";
      } else {
        const cleanHome = homeroomTeacher.replace(/^(Cô|Thầy|GV)\s+/i, "").toLowerCase();
        const cleanCur = teacherName.replace(/^(Cô|Thầy|GV)\s+/i, "").toLowerCase();
        isOtherTeacher = !cleanHome.includes(cleanCur) && !cleanCur.includes(cleanHome);
      }
    }

    const dateStr = getDateForDay(currentWeek, slot.day, config.startDate);

    // If taught by another teacher (GV chuyên / GV khác):
    // Display what teacher, what subject, and omit lesson title per user requirement!
    const displayLessonTitle = isOtherTeacher
      ? `${teacherName} dạy`
      : (customPlan?.title || concreteData.title || `Bài học Tuần ${currentWeek} - ${cleanSubj}`);

    const lbgItem: LBGItem = {
      id: `lbg_cls_${className}_${slot.day}_${slot.session}_${slot.period}`,
      day: slot.day,
      dayName: slot.dayName,
      dateStr: dateStr,
      session: slot.session,
      period: slot.period,
      overallPeriodOfDay: slot.session === "Sáng" ? slot.period : slot.period + 4,
      subject: cleanSubj,
      ppctLessonNumber: isOtherTeacher ? "—" : currentPpct,
      lessonTitle: displayLessonTitle,
      integrationNote: isOtherTeacher ? `${teacherName} dạy` : "",
      teacherName: teacherName,
      className: className,
      grade: grade,
      isOtherTeacher: isOtherTeacher,
    };
    classLBGItems.push(lbgItem);

    const khbdPlan: KHBDLessonPlan = customPlan
      ? {
          ...customPlan,
          day: slot.day,
          dayName: slot.dayName,
          dateStr: dateStr,
          session: slot.session,
          period: slot.period,
          className: className,
          teacherName: teacherName,
          ppct: isOtherTeacher ? "—" : currentPpct,
          isOtherTeacher: isOtherTeacher,
        }
      : {
          id: planId,
          grade: grade,
          className: className,
          teacherName: teacherName,
          schoolName: config.schoolName,
          branchName: config.branchName,
          week: currentWeek,
          day: slot.day,
          dayName: slot.dayName,
          dateStr: dateStr,
          session: slot.session,
          period: slot.period,
          overallPeriodOfDay: slot.session === "Sáng" ? slot.period : slot.period + 4,
          subject: cleanSubj,
          subSubject: isOtherTeacher ? undefined : concreteData.subSubject,
          ppct: isOtherTeacher ? "—" : currentPpct,
          title: displayLessonTitle,
          goals: isOtherTeacher
            ? { specificCompetencies: [], generalCompetencies: [], qualities: [] }
            : concreteData.goals,
          materials: isOtherTeacher
            ? { teacher: [], students: [] }
            : concreteData.materials,
          activities: isOtherTeacher ? [] : concreteData.activities,
          adjustment: isOtherTeacher ? "" : (concreteData.adjustment || ""),
          isOtherTeacher: isOtherTeacher,
        };

    classKHBDPlans.push(khbdPlan);
  });

  return { classLBGItems, classKHBDPlans };
}
