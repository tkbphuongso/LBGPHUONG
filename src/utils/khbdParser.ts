import { KHBDLessonPlan, KHBDActivity, GradeNumber, DayOfWeek } from "../types";
import { getConcreteLessonContent } from "../data/concreteLessonPlans";

/**
 * Parses uploaded raw text (from .docx, .txt or copy-paste) of KHBD or KHDH
 * into structured KHBDLessonPlan entries.
 */
export function parseUploadedKHBDText(
  rawText: string,
  options: {
    grade: GradeNumber;
    currentClass: string;
    currentWeek: number;
    currentTeacher: string;
  }
): KHBDLessonPlan[] {
  const plans: KHBDLessonPlan[] = [];
  if (!rawText || !rawText.trim()) return plans;

  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);

  // Strategy 1: Check if the text contains full KHBD documents (markers like "Môn học:" or "KẾ HOẠCH BÀI DẠY" or "Tên bài học:")
  const isFullKHBD =
    lines.some((l) => /môn\s*học\s*[\:\-]/i.test(l)) ||
    lines.some((l) => /kế\s*hoạch\s*bài\s*dạy/i.test(l)) ||
    lines.some((l) => /tên\s*bài\s*học\s*[\:\-]/i.test(l));

  if (isFullKHBD) {
    return parseFullKHBDDocuments(rawText, options);
  }

  // Strategy 2: Check if text is tabular KHDH / LBG distribution (e.g. lines with Thứ, Tiết, Môn, PPCT, Tên bài)
  return parseKHDHDistributionList(lines, options);
}

/**
 * Parser for full KHBD lesson plan documents
 */
function parseFullKHBDDocuments(
  rawText: string,
  options: {
    grade: GradeNumber;
    currentClass: string;
    currentWeek: number;
    currentTeacher: string;
  }
): KHBDLessonPlan[] {
  const result: KHBDLessonPlan[] = [];

  // Split into lesson blocks by markers like "KẾ HOẠCH BÀI DẠY" or "Môn học:"
  const sections = rawText.split(/(?=(?:KẾ HOẠCH BÀI DẠY|GIÁO ÁN|Môn học\s*[\:\-]))/i).filter((s) => s.trim().length > 30);

  let fallbackPpct = 1;
  let fallbackDay = 2;
  let fallbackPeriod = 1;

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const secLines = sec.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);

    let subject = "Toán";
    let subSubject = "";
    let ppct = fallbackPpct;
    let title = "";
    let day = fallbackDay;
    let period = fallbackPeriod;
    let session: "Sáng" | "Chiều" = "Sáng";

    const specificCompetencies: string[] = [];
    const generalCompetencies: string[] = [];
    const qualities: string[] = [];
    let integration = "";
    const teacherMaterials: string[] = [];
    const studentMaterials: string[] = [];

    // Parse headers
    for (const line of secLines) {
      // Subject & PPCT
      const subjMatch = line.match(/Môn(?:\s+học)?\s*[\:\-]\s*([^–\-\(\;\n]+)/i);
      if (subjMatch) {
        subject = subjMatch[1].trim();
      }

      const ppctMatch = line.match(/(?:PPCT|phân phối chương trình|Tiết\s*(?:theo)?\s*PPCT)\s*[\:\-]?\s*(?:Tiết\s*)?(\d+)/i);
      if (ppctMatch) {
        ppct = parseInt(ppctMatch[1], 10);
      }

      // Title
      const titleMatch = line.match(/Tên\s*bài\s*(?:học|dạy)?\s*[\:\-]\s*(.+)/i);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }

      // Day / Period if specified
      const dayMatch = line.match(/(?:Thứ|Day)\s*(Hai|Ba|Tư|Năm|Sáu|Bảy|CN|2|3|4|5|6|7)/i);
      if (dayMatch) {
        const dStr = dayMatch[1].toLowerCase();
        if (dStr === "hai" || dStr === "2") day = 2;
        else if (dStr === "ba" || dStr === "3") day = 3;
        else if (dStr === "tư" || dStr === "4") day = 4;
        else if (dStr === "năm" || dStr === "5") day = 5;
        else if (dStr === "sáu" || dStr === "6") day = 6;
      }

      const sessionMatch = line.match(/Buổi\s*[\:\-]?\s*(Sáng|Chiều)/i);
      if (sessionMatch) {
        session = sessionMatch[1].toLowerCase().includes("chiều") ? "Chiều" : "Sáng";
      }

      const periodMatch = line.match(/Tiết\s*(?:thời khóa biểu|TKB)?\s*[\:\-]?\s*(\d)/i);
      if (periodMatch) {
        period = parseInt(periodMatch[1], 10);
      }
    }

    // Clean Subject
    const normSubj = subject.toLowerCase();
    if (normSubj.includes("toán")) subject = "Toán";
    else if (normSubj.includes("tiếng việt") || normSubj.includes("tv")) subject = "Tiếng Việt";
    else if (normSubj.includes("khoa học") || normSubj.includes("kh")) subject = "Khoa học";
    else if (normSubj.includes("lịch sử") || normSubj.includes("địa lí") || normSubj.includes("ls&đl")) subject = "Lịch sử và Địa lí";
    else if (normSubj.includes("đạo đức")) subject = "Đạo đức";
    else if (normSubj.includes("hoạt động trải nghiệm") || normSubj.includes("hđtn")) subject = "Hoạt động trải nghiệm";
    else if (normSubj.includes("tin học") || normSubj.includes("th")) subject = "Tin học";
    else if (normSubj.includes("công nghệ") || normSubj.includes("cn")) subject = "Công nghệ";
    else if (normSubj.includes("giáo dục thể chất") || normSubj.includes("gdtc")) subject = "Giáo dục Thể chất";
    else if (normSubj.includes("âm nhạc") || normSubj.includes("an")) subject = "Âm nhạc";
    else if (normSubj.includes("mĩ thuật") || normSubj.includes("mt")) subject = "Mĩ thuật";
    else if (normSubj.includes("tiếng anh") || normSubj.includes("ta")) subject = "Tiếng Anh";

    // If title was missing from header, look for first emphasized line after "Kế hoạch bài dạy"
    if (!title) {
      for (const line of secLines) {
        if (
          !line.toLowerCase().includes("kế hoạch bài dạy") &&
          !line.toLowerCase().includes("môn học") &&
          !line.toLowerCase().includes("yêu cầu cần đạt") &&
          (line.toLowerCase().startsWith("bài") || line.toLowerCase().startsWith("tiết"))
        ) {
          title = line.trim();
          break;
        }
      }
    }

    if (!title) {
      title = `Bài học ${subject} (Tiết ${ppct})`;
    }

    // Parse Activities (4 standard steps)
    const activities: KHBDActivity[] = parse4ActivitiesFromText(sec);

    // Fallback concrete lesson content if activities are empty
    const concrete = getConcreteLessonContent(subject, options.grade, ppct, options.currentWeek);

    const plan: KHBDLessonPlan = {
      id: `khbd_uploaded_${options.grade}_w${options.currentWeek}_p${ppct}_${i}`,
      grade: options.grade,
      className: options.currentClass,
      teacherName: options.currentTeacher,
      schoolName: "Trường Tiểu Học Tân Thạnh",
      branchName: "Xã Tân Thạnh",
      week: options.currentWeek,
      day: day as DayOfWeek,
      dayName: day === 2 ? "Thứ Hai" : day === 3 ? "Thứ Ba" : day === 4 ? "Thứ Tư" : day === 5 ? "Thứ Năm" : "Thứ Sáu",
      dateStr: "",
      period,
      overallPeriodOfDay: period,
      session,
      subject,
      subSubject: subSubject || concrete.subSubject || "",
      ppct,
      title,
      goals: {
        specificCompetencies: specificCompetencies.length > 0 ? specificCompetencies : concrete.goals.specificCompetencies,
        generalCompetencies: generalCompetencies.length > 0 ? generalCompetencies : concrete.goals.generalCompetencies,
        qualities: qualities.length > 0 ? qualities : concrete.goals.qualities,
        integration: integration || concrete.goals.integration || "",
      },
      materials: {
        teacher: teacherMaterials.length > 0 ? teacherMaterials : concrete.materials.teacher,
        students: studentMaterials.length > 0 ? studentMaterials : concrete.materials.students,
      },
      activities: activities.length > 0 ? activities : concrete.activities,
      adjustment: "",
    };

    result.push(plan);

    fallbackPpct++;
    fallbackPeriod++;
    if (fallbackPeriod > 4) {
      fallbackPeriod = 1;
      fallbackDay++;
      if (fallbackDay > 6) fallbackDay = 2;
    }
  }

  return result;
}

/**
 * Parses tabular or list KHDH (Phân phối chương trình / Kế hoạch dạy học)
 */
function parseKHDHDistributionList(
  lines: string[],
  options: {
    grade: GradeNumber;
    currentClass: string;
    currentWeek: number;
    currentTeacher: string;
  }
): KHBDLessonPlan[] {
  const result: KHBDLessonPlan[] = [];

  let currentDay: DayOfWeek = 2;
  let currentSession: "Sáng" | "Chiều" = "Sáng";
  let currentPeriod = 1;
  let autoPpct = 1;

  for (const line of lines) {
    // Check day indicators
    if (/thứ\s*hai|^thứ\s*2/i.test(line)) currentDay = 2;
    else if (/thứ\s*ba|^thứ\s*3/i.test(line)) currentDay = 3;
    else if (/thứ\s*tư|^thứ\s*4/i.test(line)) currentDay = 4;
    else if (/thứ\s*năm|^thứ\s*5/i.test(line)) currentDay = 5;
    else if (/thứ\s*sáu|^thứ\s*6/i.test(line)) currentDay = 6;

    // Check session indicators
    if (/buổi\s*chiều|chiều\s*[\:\-]/i.test(line)) currentSession = "Chiều";
    else if (/buổi\s*sáng|sáng\s*[\:\-]/i.test(line)) currentSession = "Sáng";

    // Split line by tab, semicolon, comma, or pipe if table row
    const parts = line.split(/[\t\|\;]+/).map((p) => p.trim()).filter((p) => p.length > 0);

    let subject = "";
    let ppct = 0;
    let title = "";

    if (parts.length >= 3) {
      // Table row like: [Tiết, Môn, PPCT, Tên bài] or [Thứ, Buổi, Tiết, Môn, PPCT, Tên bài]
      for (const part of parts) {
        const ppctMatch = part.match(/^(?:tiết\s*)?(\d+)$/i);
        const subjMatch = detectSubjectName(part);
        if (subjMatch) {
          subject = subjMatch;
        } else if (ppctMatch && !ppct && parseInt(ppctMatch[1], 10) > 0) {
          ppct = parseInt(ppctMatch[1], 10);
        } else if (part.length > 4 && !title) {
          title = part;
        }
      }
    } else {
      // Line like: "Tiết 2: Tiếng Việt - Tiết 1: Bài 1: Điều kì diệu (Tiết 1: Đọc)"
      // Or: "Toán - Tiết 1: Bài 1: Ôn tập các số đến 100 000 (Tiết 1)"
      subject = detectSubjectName(line) || "";
      const ppctMatch = line.match(/(?:tiết\s*ppct|tiết)\s*(\d+)/i);
      if (ppctMatch) {
        ppct = parseInt(ppctMatch[1], 10);
      }

      // Extract title after hyphen or colon
      const titleMatch = line.match(/(?:[\:\-]\s*)(Bài\s*.+|Sinh hoạt\s*.+|Ôn tập\s*.+|Luyện tập\s*.+|Chủ đề\s*.+)/i);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    if (!subject) continue; // Skip lines that don't match any subject

    if (!ppct) ppct = autoPpct++;
    if (!title) title = `Bài học ${subject} (Tiết ${ppct})`;

    const concrete = getConcreteLessonContent(subject, options.grade, ppct, options.currentWeek);

    const plan: KHBDLessonPlan = {
      id: `khbd_uploaded_${options.grade}_w${options.currentWeek}_p${ppct}_${result.length}`,
      grade: options.grade,
      className: options.currentClass,
      teacherName: options.currentTeacher,
      schoolName: "Trường Tiểu Học Tân Thạnh",
      branchName: "Xã Tân Thạnh",
      week: options.currentWeek,
      day: currentDay,
      dayName: currentDay === 2 ? "Thứ Hai" : currentDay === 3 ? "Thứ Ba" : currentDay === 4 ? "Thứ Tư" : currentDay === 5 ? "Thứ Năm" : "Thứ Sáu",
      dateStr: "",
      period: currentPeriod,
      overallPeriodOfDay: currentPeriod,
      session: currentSession,
      subject,
      subSubject: concrete.subSubject || "",
      ppct,
      title,
      goals: concrete.goals,
      materials: concrete.materials,
      activities: concrete.activities,
      adjustment: "",
    };

    result.push(plan);

    currentPeriod++;
    if (currentPeriod > 4) {
      currentPeriod = 1;
      if (currentSession === "Sáng") {
        currentSession = "Chiều";
      } else {
        currentSession = "Sáng";
        currentDay = (currentDay < 6 ? currentDay + 1 : 2) as DayOfWeek;
      }
    }
  }

  return result;
}

/**
 * Detect standard primary school subject name from arbitrary text
 */
function detectSubjectName(text: string): string | null {
  const s = text.toLowerCase();
  if (s.includes("toán")) return "Toán";
  if (s.includes("tiếng việt") || s.includes("tv")) return "Tiếng Việt";
  if (s.includes("khoa học") || s.includes("kh")) return "Khoa học";
  if (s.includes("lịch sử") || s.includes("địa lí") || s.includes("ls&đl") || s.includes("địa lý")) return "Lịch sử và Địa lí";
  if (s.includes("tự nhiên và xã hội") || s.includes("tn&xh")) return "Tự nhiên và Xã hội";
  if (s.includes("đạo đức")) return "Đạo đức";
  if (s.includes("hoạt động trải nghiệm") || s.includes("hđtn") || s.includes("hđtt")) return "Hoạt động trải nghiệm";
  if (s.includes("tin học") || s.includes("th")) return "Tin học";
  if (s.includes("công nghệ") || s.includes("cn")) return "Công nghệ";
  if (s.includes("giáo dục thể chất") || s.includes("gdtc")) return "Giáo dục Thể chất";
  if (s.includes("âm nhạc") || s.includes("an")) return "Âm nhạc";
  if (s.includes("mĩ thuật") || s.includes("mt")) return "Mĩ thuật";
  if (s.includes("tiếng anh") || s.includes("ta")) return "Tiếng Anh";
  return null;
}

/**
 * Parse 4 standard activities:
 * 1. Hoạt động khởi động
 * 2. Hoạt động hình thành kiến thức mới (nếu có)
 * 3. Hoạt động luyện tập thực hành
 * 4. Hoạt động vận dụng, trải nghiệm
 */
function parse4ActivitiesFromText(sectionText: string): KHBDActivity[] {
  const activities: KHBDActivity[] = [];

  const actPatterns = [
    {
      step: "1. Hoạt động khởi động",
      regex: /(?:1[\.\:\-]|Hoạt động\s*1[\:\-]?|Khởi động[\:\-]?)([\s\S]*?)(?=(?:2[\.\:\-]|Hoạt động\s*2|Khám phá|Hình thành kiến thức|III|IV|$))/i,
    },
    {
      step: "2. Hoạt động hình thành kiến thức mới (nếu có)",
      regex: /(?:2[\.\:\-]|Hoạt động\s*2[\:\-]?|Hình thành kiến thức|Khám phá[\:\-]?)([\s\S]*?)(?=(?:3[\.\:\-]|Hoạt động\s*3|Luyện tập|Thực hành|$))/i,
    },
    {
      step: "3. Hoạt động luyện tập thực hành",
      regex: /(?:3[\.\:\-]|Hoạt động\s*3[\:\-]?|Luyện tập[\:\-]?|Thực hành[\:\-]?)([\s\S]*?)(?=(?:4[\.\:\-]|Hoạt động\s*4|Vận dụng|Trải nghiệm|$))/i,
    },
    {
      step: "4. Hoạt động vận dụng, trải nghiệm",
      regex: /(?:4[\.\:\-]|Hoạt động\s*4[\:\-]?|Vận dụng[\:\-]?|Trải nghiệm[\:\-]?)([\s\S]*?)(?=(?:IV|ĐIỀU CHỈNH|KẾ HOẠCH|$))/i,
    },
  ];

  for (let i = 0; i < actPatterns.length; i++) {
    const item = actPatterns[i];
    const match = sectionText.match(item.regex);
    if (match && match[1].trim().length > 10) {
      const body = match[1].trim();
      const teacherActs: string[] = [];
      const studentActs: string[] = [];

      const lines = body.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
      let currentRole: "gv" | "hs" = "gv";

      for (const line of lines) {
        if (/giáo viên|gv\s*[\:\-]/i.test(line)) {
          currentRole = "gv";
          continue;
        }
        if (/học sinh|hs\s*[\:\-]/i.test(line)) {
          currentRole = "hs";
          continue;
        }

        if (currentRole === "gv") {
          teacherActs.push(line);
        } else {
          studentActs.push(line);
        }
      }

      activities.push({
        id: `act_${i + 1}`,
        step: item.step,
        target: "Đạt chuẩn yêu cầu của hoạt động theo chương trình GDPT 2018.",
        teacherActivities: teacherActs.length > 0 ? teacherActs : ["- Giáo viên tổ chức và hướng dẫn học sinh thực hiện."],
        studentActivities: studentActs.length > 0 ? studentActs : ["- Học sinh chủ động tiếp nhận nhiệm vụ và thực hiện."],
      });
    }
  }

  return activities;
}
