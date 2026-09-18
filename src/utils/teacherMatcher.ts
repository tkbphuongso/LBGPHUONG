import { TeacherInfo, TimetableSlot } from "../types";

/**
 * Normalizes a string for comparison (lowercase, trimmed, removed diacritics/prefixes where needed)
 */
function cleanStr(str?: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/^(cô|thầy|gv|thay|co|đ\/c|đc)\s+/gi, "")
    .trim();
}

/**
 * Robustly checks if a timetable cell entry belongs to the specified teacher.
 */
export function isTeacherMatchingSlot(
  entry: { subject: string; teacherName?: string; className?: string },
  teacher: TeacherInfo | string,
  optionalClassName?: string
): boolean {
  if (!entry) return false;

  const currentClass = entry.className || optionalClassName || "";

  const teacherObj: TeacherInfo | undefined =
    typeof teacher === "string"
      ? undefined
      : teacher;

  const teacherNameStr = typeof teacher === "string" ? teacher : teacher.name;
  const teacherShortName = teacherObj?.shortName || "";
  const isSpecialist = teacherObj?.isSpecialist ?? false;

  const cleanEntryTeacher = cleanStr(entry.teacherName);
  const cleanTName = cleanStr(teacherNameStr);
  const cleanTShort = cleanStr(teacherShortName);
  const cleanSubject = (entry.subject || "").toLowerCase();

  // SPECIAL CASE: "D. Hằng" (GVCN 4A3) vs "Hằng" (GV Tiếng Anh)
  const isDHangTeacher =
    teacherObj?.id === "t-d-hang-4a3" ||
    cleanTName === "d. hằng" ||
    cleanTName === "d.hằng" ||
    cleanTName === "d hằng" ||
    cleanTName.includes("cô d. hằng") ||
    cleanTName.includes("d. hằng") ||
    cleanTName.includes("d.hằng") ||
    cleanTName.includes("d hằng") ||
    cleanTName.includes("đặng thị hằng") ||
    cleanTName.includes("đỗ thị hằng") ||
    cleanTName.includes("gvcn lớp 4a3") ||
    cleanTName.includes("gvcn 4a3") ||
    cleanTShort === "d. hằng" ||
    cleanTShort === "d.hằng" ||
    cleanTShort === "d hằng";

  const isHangEnglishTeacher =
    !isDHangTeacher &&
    (teacherObj?.id === "t-hang-ta" ||
      cleanTName.includes("anh văn") ||
      cleanTName.includes("tiếng anh") ||
      cleanTName === "hằng" ||
      cleanTName === "cô hằng" ||
      cleanTShort === "hằng" ||
      (teacherObj?.isSpecialist && cleanTName.includes("hằng")));

  const isEntryDHang =
    cleanEntryTeacher === "d. hằng" ||
    cleanEntryTeacher === "d.hằng" ||
    cleanEntryTeacher === "d hằng" ||
    cleanEntryTeacher === "cô d. hằng" ||
    cleanEntryTeacher === "cô d.hằng" ||
    cleanEntryTeacher === "cô d hằng" ||
    cleanEntryTeacher.includes("d. hằng") ||
    cleanEntryTeacher.includes("d.hằng") ||
    cleanEntryTeacher.includes("d hằng") ||
    cleanSubject.includes("d. hằng") ||
    cleanSubject.includes("d.hằng") ||
    cleanSubject.includes("d hằng");

  const isEntryHangTA =
    (cleanEntryTeacher === "hằng" && !isEntryDHang) ||
    cleanSubject.includes("(hằng)") ||
    cleanSubject.includes("ta (hằng)");

  if (isDHangTeacher) {
    // Cô D. Hằng (GVCN 4A3) must NEVER match English specialist slots
    if (cleanSubject.includes("tiếng anh") || cleanSubject.includes("english") || cleanSubject.startsWith("ta")) {
      return false;
    }
    if (isEntryDHang) return true;
    if (currentClass === "4A3" && !cleanEntryTeacher) {
      const isHomeroomSubj = [
        "toán", "tiếng việt", "khoa học", "công nghệ", "hđtn", "hoạt động trải nghiệm", "tc toán", "tc tiếng việt"
      ].some((s) => cleanSubject.startsWith(s));
      if (isHomeroomSubj) return true;
    }
    return false;
  }

  if (isHangEnglishTeacher) {
    // Cô Hằng (Anh văn) must NEVER match D. Hằng homeroom slots
    if (isEntryDHang) return false;
    // Cô Hằng is English specialist only
    const isHomeroomSubj = [
      "toán",
      "tiếng việt",
      "khoa học",
      "công nghệ",
      "lịch sử và địa lí",
      "đạo đức",
      "hđtn",
      "hoạt động trải nghiệm",
      "tc toán",
      "tc tiếng việt",
    ].some((s) => cleanSubject.startsWith(s));

    if (isHomeroomSubj && !cleanSubject.includes("tiếng anh")) {
      return false;
    }

    if (isEntryHangTA) return true;
    if (cleanEntryTeacher === "hằng" || cleanEntryTeacher === "cô hằng") return true;
    if (cleanSubject.includes("tiếng anh") || cleanSubject.startsWith("ta")) {
      if (cleanEntryTeacher.includes("hằng") && !isEntryDHang) return true;
      if (currentClass === "4A3" && !cleanEntryTeacher) return true;
    }
    return false;
  }

  // SPECIAL CASE: "V. Trinh" (GVCN 5A4) vs "Tú Trinh" (GV chuyên)
  const isVTrinhTeacher =
    teacherObj?.id === "t-v-trinh-5a4" ||
    cleanTName.includes("v. trinh") ||
    cleanTName.includes("v.trinh") ||
    cleanTShort === "v. trinh" ||
    cleanTShort === "v.trinh";

  const isTuTrinhTeacher =
    teacherObj?.id === "t-tu-trinh" ||
    cleanTName.includes("tú trinh") ||
    cleanTShort === "tú trinh";

  if (isVTrinhTeacher) {
    if (cleanEntryTeacher === "v. trinh" || cleanEntryTeacher === "v.trinh" || cleanEntryTeacher.includes("v. trinh")) return true;
    if (cleanEntryTeacher === "tú trinh") return false;
  }

  if (isTuTrinhTeacher) {
    if (cleanEntryTeacher === "v. trinh" || cleanEntryTeacher === "v.trinh") return false;
    if (cleanEntryTeacher === "tú trinh" || cleanEntryTeacher.includes("tú trinh")) return true;
  }

  // SPECIAL CASE: "K. Phương" / "Kiều Phương" (GVCN 1A1) vs "Phương" (GV Tin học nếu có)
  const isKieuPhuongTeacher =
    teacherObj?.id === "t-kieu-phuong" ||
    cleanTName.includes("kiều phương") ||
    cleanTName.includes("kieu phuong") ||
    cleanTName === "k. phương" ||
    cleanTName === "k.phương" ||
    cleanTShort === "kiều phương" ||
    cleanTShort === "k. phương" ||
    cleanTShort === "k.phương";

  const isPhuongTinHocTeacher =
    !isKieuPhuongTeacher &&
    (cleanTName.includes("nguyễn văn phương") ||
      cleanTName.includes("tin học") ||
      teacherObj?.id === "t-phuong-th" ||
      cleanTShort === "phương");

  // Check if cell is specifically Tin học by Thầy Phương
  const isTinHocCell =
    cleanSubject.includes("th (phương)") ||
    cleanSubject.includes("tcth (phương)") ||
    cleanSubject.includes("hđtt (phương)") ||
    (cleanEntryTeacher === "phương" && (cleanSubject.includes("th") || cleanSubject.includes("tin học") || cleanSubject.includes("tcth")));

  if (isKieuPhuongTeacher) {
    // Kiều Phương must not match Tin học cells
    if (isTinHocCell) return false;
    if (
      cleanEntryTeacher === "kiều phương" ||
      cleanEntryTeacher === "kieu phuong" ||
      cleanEntryTeacher === "k. phương" ||
      cleanEntryTeacher === "k.phương" ||
      cleanEntryTeacher === "phương"
    ) return true;
    if (
      cleanSubject.includes("k. phương") ||
      cleanSubject.includes("kiều phương") ||
      cleanSubject.includes("kieu phuong")
    ) return true;
    if (entry.teacherName && (
      entry.teacherName.toLowerCase().includes("kiều phương") ||
      entry.teacherName.toLowerCase().includes("k. phương") ||
      entry.teacherName.toLowerCase().includes("k.phương")
    )) return true;
    return false;
  }

  if (isPhuongTinHocTeacher) {
    if (isTinHocCell) return true;
    if (cleanEntryTeacher === "phương" && !cleanEntryTeacher.includes("kiều")) return true;
    if (cleanSubject.includes("(phương)") && !cleanSubject.includes("kiều")) return true;
    return false;
  }

  const hasInitial = (s: string) => /^[a-z]\.\s*/i.test(s.trim());

  // 1. Direct shortName match in teacherName
  if (cleanTShort && cleanEntryTeacher) {
    if (cleanEntryTeacher === cleanTShort) return true;
    // If one has an initial like "d. hằng" or "v. trinh" and the other doesn't, they do NOT match!
    if (hasInitial(cleanEntryTeacher) !== hasInitial(cleanTShort)) {
      // Skip matching when initials conflict
    } else {
      // e.g. "Nương", "Tuấn", "Linh", "Nhàn", "Thy", "Tuệ", "Tâm", "Thủy", "Chi", "Năm", "Chinh", "Phước", "Dương", "Đạt", "Huế"
      if (cleanEntryTeacher.split(/\s+/).includes(cleanTShort)) return true;
    }
  }

  // 2. Full name inclusion check
  if (cleanEntryTeacher && cleanTName) {
    if (cleanEntryTeacher === cleanTName) return true;
    if (hasInitial(cleanEntryTeacher) !== hasInitial(cleanTName)) {
      // Skip matching when initials conflict
    } else {
      if (cleanTName.includes(cleanEntryTeacher) && cleanEntryTeacher.length >= 2) return true;
      if (cleanEntryTeacher.includes(cleanTName)) return true;
    }
  }

  // 3. Subject bracket tag check: e.g. "TA (Nương)", "GDTC (Nhàn)", "MT (Thy)", "AN (Tuệ)", "HĐTN (Tâm)", "TNXH (Thủy)"
  if (cleanTShort && (cleanSubject.includes(`(${cleanTShort})`) || cleanSubject.includes(`(${cleanTShort.toLowerCase()})`))) {
    return true;
  }

  // 4. Specialist subject matching if explicitly tagged
  if (teacherObj?.subjects && teacherObj.subjects.length > 0) {
    // Only if teacherName also matches or is empty and subject clearly indicates this specialist
    for (const subj of teacherObj.subjects) {
      const cleanSubj = subj.toLowerCase();
      if (cleanSubj.includes("(") && cleanSubject.includes(cleanSubj)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Returns all active teaching periods for a specific teacher.
 */
export function getTeacherAssignedSlots(
  slots: TimetableSlot[],
  teacher: TeacherInfo | string
): {
  slot: TimetableSlot;
  className: string;
  subject: string;
  rawSubject: string;
}[] {
  const result: {
    slot: TimetableSlot;
    className: string;
    subject: string;
    rawSubject: string;
  }[] = [];

  // Sort slots chronologically (Day 2..6, Sáng -> Chiều, Period 1..5)
  const sorted = [...slots].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    if (a.session !== b.session) return a.session === "Sáng" ? -1 : 1;
    return a.period - b.period;
  });

  sorted.forEach((slot) => {
    Object.entries(slot.classSubjectMap).forEach(([cls, entry]) => {
      if (isTeacherMatchingSlot(entry, teacher, cls)) {
        result.push({
          slot,
          className: cls,
          subject: entry.subject,
          rawSubject: entry.subject,
        });
      }
    });
  });

  return result;
}
