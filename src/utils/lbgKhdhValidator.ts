import {
  LBGItem,
  KHBDLessonPlan,
  SchoolConfig,
  LBGValidationIssue,
  LBGValidationReport,
  LBGValidationStatus,
  GradeNumber,
} from "../types";
import { get35WeekCurriculumEntry } from "../data/curriculum35Weeks";

/**
 * Normalizes text for comparison:
 * - Trims and lowercases
 * - Normalizes unicode (NFC)
 * - Removes accents/diacritics for relaxed match or keeps normalized accents
 * - Strips redundant punctuation (commas, colons, hyphens, parentheses)
 * - Normalizes spacing
 */
export function normalizeLessonTitle(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFC")
    // Remove common prefixes like "bài 1:", "bài 01.", "tiết 1:", "tiết 01 -"
    .replace(/^bài\s*\d+[\s\:\.\-]+/i, "")
    .replace(/^tiết\s*\d+[\s\:\.\-]+/i, "")
    // Remove sub-period tags like "(tiết 1)", "(tiết 2)"
    .replace(/\(tiết\s*\d+[^)]*\)/gi, "")
    // Replace punctuation with space
    .replace(/[\:\–\-\,\.\;\(\)\[\]\{\}\/\\\"\'\`\~]/g, " ")
    // Collapse multiple spaces
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Standardizes subject names to canonical primary school subjects
 */
export function canonicalSubject(subj: string): string {
  if (!subj) return "";
  const s = subj.toLowerCase().trim();
  if (s.includes("tiếng việt") || s.includes("t.việt") || s.startsWith("tv")) return "Tiếng Việt";
  if (s.includes("toán") || s.includes("math")) return "Toán";
  if (s.includes("khoa học") || s.startsWith("kh")) return "Khoa học";
  if (s.includes("lịch sử") || s.includes("địa lí") || s.includes("ls&đl") || s.includes("lsdl")) return "Lịch sử và Địa lí";
  if (s.includes("đạo đức") || s.startsWith("đđ") || s.startsWith("dd")) return "Đạo đức";
  if (s.includes("hoạt động trải nghiệm") || s.includes("trải nghiệm") || s.startsWith("hđtn") || s.startsWith("hdtn")) return "Hoạt động trải nghiệm";
  if (s.includes("công nghệ") || s.startsWith("cn")) return "Công nghệ";
  if (s.includes("tin học") || s.startsWith("th")) return "Tin học";
  if (s.includes("thể chất") || s.includes("gdtc")) return "Giáo dục Thể chất";
  if (s.includes("âm nhạc") || s.startsWith("an")) return "Âm nhạc";
  if (s.includes("mĩ thuật") || s.includes("mỹ thuật") || s.startsWith("mt")) return "Mĩ thuật";
  if (s.includes("tiếng anh") || s.includes("anh văn") || s.startsWith("ta")) return "Tiếng Anh";
  return subj.trim();
}

/**
 * Checks if two lesson titles are semantically equivalent
 */
export function areTitlesMatching(actualTitle: string, expectedTitle: string): boolean {
  if (!actualTitle || !expectedTitle) return false;

  const actualRaw = actualTitle.trim().toLowerCase();
  const expectedRaw = expectedTitle.trim().toLowerCase();
  if (actualRaw === expectedRaw) return true;

  const normActual = normalizeLessonTitle(actualTitle);
  const normExpected = normalizeLessonTitle(expectedTitle);
  if (normActual === normExpected && normActual.length > 0) return true;

  // Partial containment if one title contains the core of the other and length is meaningful
  if (normActual.length >= 6 && normExpected.length >= 6) {
    if (normActual.includes(normExpected) || normExpected.includes(normActual)) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if PPCT numbers are matching
 */
export function arePpctMatching(actualPpct: string | number, expectedPpct: string | number): boolean {
  if (actualPpct === expectedPpct) return true;

  const actNum = typeof actualPpct === "number" ? actualPpct : parseInt(String(actualPpct).replace(/\D/g, ""), 10);
  const expNum = typeof expectedPpct === "number" ? expectedPpct : parseInt(String(expectedPpct).replace(/\D/g, ""), 10);

  if (!isNaN(actNum) && !isNaN(expNum)) {
    return actNum === expNum;
  }

  return String(actualPpct).trim().toLowerCase() === String(expectedPpct).trim().toLowerCase();
}

/**
 * Validates the current LBG items against uploaded KHDH plans or official curriculum
 */
export function validateLBGAgainstKHDH(
  lbgItems: LBGItem[],
  uploadedKhdhPlans: KHBDLessonPlan[] | undefined,
  config: SchoolConfig,
  customPlansMap?: Record<string, KHBDLessonPlan>
): LBGValidationReport {
  const issues: LBGValidationIssue[] = [];
  const issuesMap: Record<string, LBGValidationIssue> = {};

  const currentGrade = config.currentGrade || 1;
  const currentWeek = config.currentWeek || 1;

  // Determine KHDH source
  const hasUploaded = uploadedKhdhPlans && uploadedKhdhPlans.length > 0;
  const khdhSource: "uploaded" | "curriculum_preset" | "none" = hasUploaded ? "uploaded" : "curriculum_preset";
  const khdhSourceName = hasUploaded
    ? `Kế hoạch dạy học đã tải lên (${uploadedKhdhPlans.length} bài)`
    : `KHDH Phân phối chương trình chuẩn Bộ GD&ĐT (Khối ${currentGrade}, Tuần ${currentWeek})`;

  // Filter KHDH pool for current grade & week
  const khdhPool = hasUploaded
    ? uploadedKhdhPlans.filter((p) => (!p.grade || p.grade === currentGrade) && (!p.week || p.week === currentWeek))
    : [];

  // Group KHDH by canonical subject
  const khdhBySubject: Record<string, KHBDLessonPlan[]> = {};
  khdhPool.forEach((p) => {
    const cSubj = canonicalSubject(p.subject);
    if (!khdhBySubject[cSubj]) khdhBySubject[cSubj] = [];
    khdhBySubject[cSubj].push(p);
  });

  // Track subject period occurrence on LBG
  const lbgSubjectOccurrence: Record<string, number> = {};

  let matchCount = 0;
  let titleMismatchCount = 0;
  let ppctMismatchCount = 0;
  let bothMismatchCount = 0;
  let skippedCount = 0;

  for (const item of lbgItems) {
    // 1. Skip items taught by specialist teachers if marked as isOtherTeacher
    if (item.isOtherTeacher) {
      skippedCount++;
      const issue: LBGValidationIssue = {
        id: item.id,
        lbgItem: item,
        status: "SPECIALIST_SKIPPED",
        severity: "info",
        message: `Tiết do ${item.teacherName} giảng dạy (Không bắt buộc đối soát tên bài)`,
      };
      issues.push(issue);
      issuesMap[item.id] = issue;
      continue;
    }

    const cSubj = canonicalSubject(item.subject);
    const occurrence = (lbgSubjectOccurrence[cSubj] || 0) + 1;
    lbgSubjectOccurrence[cSubj] = occurrence;

    // 2. Find matching KHDH item
    let expectedPlan: KHBDLessonPlan | undefined = undefined;

    // Strategy A: Find in uploaded plans by slot
    if (hasUploaded) {
      expectedPlan = khdhPool.find(
        (p) => p.day === item.day && p.period === item.period && p.session === item.session
      );
    }

    // Strategy B: Find in uploaded plans by subject & occurrence
    if (!expectedPlan && khdhBySubject[cSubj] && khdhBySubject[cSubj][occurrence - 1]) {
      expectedPlan = khdhBySubject[cSubj][occurrence - 1];
    }

    // Strategy C: Find by PPCT in uploaded plans
    if (!expectedPlan && hasUploaded && item.ppctLessonNumber) {
      expectedPlan = khdhPool.find((p) => {
        const pSubj = canonicalSubject(p.subject);
        return pSubj === cSubj && arePpctMatching(p.ppct, item.ppctLessonNumber);
      });
    }

    // Strategy D: Fallback to customPlansMap or Official Curriculum 35 Weeks
    if (!expectedPlan) {
      const fallbackEntry = get35WeekCurriculumEntry(
        item.subject,
        currentGrade,
        typeof item.ppctLessonNumber === "number" ? item.ppctLessonNumber : parseInt(String(item.ppctLessonNumber), 10) || occurrence,
        currentWeek,
        occurrence
      );

      if (fallbackEntry) {
        expectedPlan = {
          id: `khdh_ref_${currentGrade}_w${currentWeek}_${cSubj}_${occurrence}`,
          grade: currentGrade,
          className: item.className || config.currentClass,
          teacherName: item.teacherName || config.currentTeacher,
          schoolName: config.schoolName,
          week: currentWeek,
          day: item.day,
          dayName: item.dayName,
          dateStr: item.dateStr,
          session: item.session,
          period: item.period,
          overallPeriodOfDay: item.overallPeriodOfDay,
          subject: item.subject,
          subSubject: fallbackEntry.subSubject,
          ppct: fallbackEntry.ppct,
          title: fallbackEntry.title,
          goals: {
            specificCompetencies: [],
            generalCompetencies: [],
            qualities: [],
            integration: fallbackEntry.integrationNote,
          },
          materials: { teacher: [], students: [] },
          activities: [],
        };
      }
    }

    // 3. Compare LBG with Expected Plan
    if (!expectedPlan) {
      const issue: LBGValidationIssue = {
        id: item.id,
        lbgItem: item,
        status: "MISSING_IN_KHDH",
        severity: "warning",
        message: `Chưa tìm thấy kế hoạch dạy học tương ứng cho môn ${item.subject} (tiết ${occurrence} trong tuần)`,
      };
      issues.push(issue);
      issuesMap[item.id] = issue;
      continue;
    }

    const titleMatch = areTitlesMatching(item.lessonTitle, expectedPlan.title);
    const ppctMatch = arePpctMatching(item.ppctLessonNumber, expectedPlan.ppct);

    let status: LBGValidationStatus = "MATCH";
    let severity: "error" | "warning" | "success" = "success";
    let message = "Khớp hoàn toàn với Kế hoạch dạy học";

    if (!titleMatch && !ppctMatch) {
      status = "BOTH_MISMATCH";
      severity = "error";
      bothMismatchCount++;
      titleMismatchCount++;
      ppctMismatchCount++;
      message = `Sai lệch cả Tiết PPCT (LBG: ${item.ppctLessonNumber} vs KHDH: ${expectedPlan.ppct}) và Tên bài học`;
    } else if (!titleMatch) {
      status = "TITLE_MISMATCH";
      severity = "error";
      titleMismatchCount++;
      message = `Sai lệch tên bài học so với KHDH (KHDH: "${expectedPlan.title}")`;
    } else if (!ppctMatch) {
      status = "PPCT_MISMATCH";
      severity = "warning";
      ppctMismatchCount++;
      message = `Sai lệch tiết PPCT (LBG đang ghi: Tiết ${item.ppctLessonNumber}, KHDH là: Tiết ${expectedPlan.ppct})`;
    } else {
      matchCount++;
    }

    const issue: LBGValidationIssue = {
      id: item.id,
      lbgItem: item,
      expectedKhdhItem: expectedPlan,
      status,
      severity,
      message,
      titleDifference: !titleMatch
        ? {
            actual: item.lessonTitle,
            expected: expectedPlan.title,
          }
        : undefined,
      ppctDifference: !ppctMatch
        ? {
            actual: item.ppctLessonNumber,
            expected: expectedPlan.ppct,
          }
        : undefined,
      suggestedFix:
        !titleMatch || !ppctMatch
          ? {
              ppctLessonNumber: expectedPlan.ppct,
              lessonTitle: expectedPlan.title,
              subSubject: expectedPlan.subSubject,
            }
          : undefined,
    };

    issues.push(issue);
    issuesMap[item.id] = issue;
  }

  const mismatchCount = titleMismatchCount + ppctMismatchCount - bothMismatchCount;
  const isValid = mismatchCount === 0;

  return {
    totalChecked: lbgItems.length,
    matchCount,
    mismatchCount,
    titleMismatchCount,
    ppctMismatchCount,
    bothMismatchCount,
    skippedCount,
    isValid,
    issues,
    issuesMap,
    khdhSource,
    khdhSourceName,
    khdhTotalLessons: hasUploaded ? uploadedKhdhPlans.length : 35 * 30,
  };
}
