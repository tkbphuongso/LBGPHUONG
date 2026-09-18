import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  PageBreak,
  HeightRule,
  VerticalAlign,
} from "docx";
import saveAs from "file-saver";
import { KHBDLessonPlan, LBGItem, SchoolConfig, TimetableSlot } from "../types";
import { isTeacherMatchingSlot, getTeacherAssignedSlots } from "./teacherMatcher";

// Convert standard pt size (12, 13, 14) to half-points for docx (24, 26, 28)
function getDocxFontSize(ptSize: number = 13): number {
  return ptSize * 2;
}

const FONT_FAMILY = "Times New Roman";

// Helper for thin gray border table styling
const tableBorders = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
};

/**
 * Shared helper to create formatted LBG Table with Session grouping (Morning/Afternoon)
 * and specialist teacher formatting: Subject + Teacher name, omitting lesson title.
 */
export function createLBGTable(items: LBGItem[], fontSize: number): Table {
  const daysMap: Record<number, LBGItem[]> = {};
  items.forEach((item) => {
    if (!daysMap[item.day]) daysMap[item.day] = [];
    daysMap[item.day].push(item);
  });

  const tableRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        createHeaderCell("Thứ, ngày", 1400, fontSize),
        createHeaderCell("Buổi", 1000, fontSize),
        createHeaderCell("Tiết", 700, fontSize),
        createHeaderCell("Môn học", 1800, fontSize),
        createHeaderCell("Tiết PPCT", 900, fontSize),
        createHeaderCell("Tên bài dạy / Hoạt động GD", 4200, fontSize),
        createHeaderCell("Ghi chú", 1500, fontSize),
      ],
    }),
  ];

  const sortedDays = Object.keys(daysMap)
    .map(Number)
    .sort((a, b) => a - b);

  sortedDays.forEach((dayKey) => {
    const dayItems = daysMap[dayKey];
    const morningItems = dayItems.filter((i) => i.session === "Sáng");
    const afternoonItems = dayItems.filter((i) => i.session === "Chiều");

    // BUỔI SÁNG Section
    if (morningItems.length > 0) {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 7,
              shading: { fill: "F0F9FF" },
              borders: tableBorders,
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 40, after: 40 },
                  indent: { left: 140 },
                  children: [
                    new TextRun({
                      text: `★ ${dayItems[0].dayName.toUpperCase()} (${dayItems[0].dateStr}) — BUỔI SÁNG`,
                      bold: true,
                      size: fontSize - 2,
                      font: FONT_FAMILY,
                      color: "1E40AF",
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      );

      morningItems.forEach((item, index) => {
        const isSpecialist = item.isOtherTeacher;
        tableRows.push(
          new TableRow({
            children: [
              createBodyCell(
                index === 0 ? `${item.dayName}\n${item.dateStr}` : "",
                1400,
                fontSize,
                index === 0,
                AlignmentType.CENTER
              ),
              createBodyCell("Sáng", 1000, fontSize, false, AlignmentType.CENTER),
              createBodyCell(
                item.period.toString(),
                700,
                fontSize,
                false,
                AlignmentType.CENTER
              ),
              createBodyCell(
                item.subSubject ? `${item.subject} (${item.subSubject})` : item.subject,
                1800,
                fontSize,
                true,
                AlignmentType.LEFT
              ),
              createBodyCell(
                isSpecialist ? "—" : (item.ppctLessonNumber?.toString() || ""),
                900,
                fontSize,
                false,
                AlignmentType.CENTER
              ),
              createBodyCell(
                isSpecialist ? `${item.teacherName} dạy` : item.lessonTitle,
                4200,
                fontSize,
                isSpecialist,
                AlignmentType.LEFT
              ),
              createBodyCell(
                isSpecialist ? `${item.teacherName} dạy` : (item.integrationNote || ""),
                1500,
                fontSize,
                false,
                AlignmentType.LEFT
              ),
            ],
          })
        );
      });
    }

    // BUỔI CHIỀU Section
    if (afternoonItems.length > 0) {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 7,
              shading: { fill: "FFFBEB" },
              borders: tableBorders,
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 40, after: 40 },
                  indent: { left: 140 },
                  children: [
                    new TextRun({
                      text: `★ ${dayItems[0].dayName.toUpperCase()} (${dayItems[0].dateStr}) — BUỔI CHIỀU`,
                      bold: true,
                      size: fontSize - 2,
                      font: FONT_FAMILY,
                      color: "B45309",
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      );

      afternoonItems.forEach((item, index) => {
        const isSpecialist = item.isOtherTeacher;
        tableRows.push(
          new TableRow({
            children: [
              createBodyCell(
                morningItems.length === 0 && index === 0 ? `${item.dayName}\n${item.dateStr}` : "",
                1400,
                fontSize,
                false,
                AlignmentType.CENTER
              ),
              createBodyCell("Chiều", 1000, fontSize, false, AlignmentType.CENTER),
              createBodyCell(
                item.period.toString(),
                700,
                fontSize,
                false,
                AlignmentType.CENTER
              ),
              createBodyCell(
                item.subSubject ? `${item.subject} (${item.subSubject})` : item.subject,
                1800,
                fontSize,
                true,
                AlignmentType.LEFT
              ),
              createBodyCell(
                isSpecialist ? "—" : (item.ppctLessonNumber?.toString() || ""),
                900,
                fontSize,
                false,
                AlignmentType.CENTER
              ),
              createBodyCell(
                isSpecialist ? `${item.teacherName} dạy` : item.lessonTitle,
                4200,
                fontSize,
                isSpecialist,
                AlignmentType.LEFT
              ),
              createBodyCell(
                isSpecialist ? `${item.teacherName} dạy` : (item.integrationNote || ""),
                1500,
                fontSize,
                false,
                AlignmentType.LEFT
              ),
            ],
          })
        );
      });
    }
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: tableRows,
  });
}

/**
 * 1. Export Lịch Báo Giảng (LBG) to Word
 */
export async function exportLBGToWord(
  lbgItems: LBGItem[],
  config: SchoolConfig,
  customTitle?: string,
  customFileName?: string
) {
  const fontSize = getDocxFontSize(config.fontSize || 13);
  const headerFontSize = getDocxFontSize((config.fontSize || 13) + 1);

  const lbgTable = createLBGTable(lbgItems, fontSize);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, right: 1000, bottom: 1000, left: 1200 },
          },
        },
        children: [
          // National Header
          createNationalHeader(config, fontSize),

          // Document Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: customTitle || `LỊCH BÁO GIẢNG TUẦN ${config.currentWeek}`,
                bold: true,
                size: headerFontSize + 4,
                font: FONT_FAMILY,
                color: "1E3A8A",
              }),
            ],
          }),

          // Subtitle Metadata (Tên GV – Trường Phân Hiệu – Lớp)
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Giáo viên: `,
                font: FONT_FAMILY,
                size: fontSize,
                bold: true,
              }),
              new TextRun({
                text: `${config.currentTeacher} | `,
                font: FONT_FAMILY,
                size: fontSize,
              }),
              new TextRun({
                text: `Lớp: `,
                font: FONT_FAMILY,
                size: fontSize,
                bold: true,
              }),
              new TextRun({
                text: `${config.currentClass} | `,
                font: FONT_FAMILY,
                size: fontSize,
              }),
              new TextRun({
                text: `Trường: `,
                font: FONT_FAMILY,
                size: fontSize,
                bold: true,
              }),
              new TextRun({
                text: `${config.schoolName}${config.branchName ? ` - ${config.branchName}` : ""}`,
                font: FONT_FAMILY,
                size: fontSize,
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: `Thời gian thực hiện: Từ ngày ${config.startDate} đến ngày ${config.endDate} (Năm học: ${config.academicYear})`,
                italics: true,
                font: FONT_FAMILY,
                size: fontSize,
              }),
            ],
          }),

          // Main LBG Table (Morning & Afternoon sections)
          lbgTable,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = customFileName || `Lich_Bao_Giang_Tuan_${config.currentWeek}_Lop_${config.currentClass}_Font${config.fontSize}.docx`;
  saveAs(blob, fileName);
}

/**
 * Normalizes activity step titles to strictly match CV 2345/BGDĐT requirements:
 * 1. Hoạt động khởi động
 * 2. Hoạt động hình thành kiến thức mới (nếu có)
 * 3. Hoạt động luyện tập thực hành
 * 4. Hoạt động vận dụng, trải nghiệm
 */
export function normalizeActivityStepTitle(step: string, index: number): string {
  const s = (step || "").trim();
  const lower = s.toLowerCase();

  // Activity 1: Khởi động
  if (index === 0 || lower.includes("khởi động") || lower.includes("mở đầu") || /^1[\.\:\-]/.test(s)) {
    const extra = s
      .replace(/^1[\.\:\-]?\s*/, "")
      .replace(/^(hoạt động\s+)?(khởi động|mở đầu)\s*[\:\-]?\s*/i, "")
      .trim();
    return extra && !extra.toLowerCase().includes("khởi động")
      ? `1. Hoạt động khởi động: ${extra}`
      : "1. Hoạt động khởi động";
  }

  // Activity 2: Hình thành kiến thức mới (nếu có)
  if (
    index === 1 ||
    lower.includes("khám phá") ||
    lower.includes("hình thành kiến thức") ||
    lower.includes("kiến thức mới") ||
    /^2[\.\:\-]/.test(s)
  ) {
    const extra = s
      .replace(/^2[\.\:\-]?\s*/, "")
      .replace(
        /^(hoạt động\s+)?(khám phá(\s*\/\s*hình thành kiến thức mới)?|hình thành kiến thức mới(\s*\(nếu có\))?)\s*[\:\-]?\s*/i,
        ""
      )
      .replace(/^\(Nội dung chính trong SGK\)\s*/i, "")
      .trim();
    return extra && !extra.toLowerCase().includes("kiến thức mới") && !extra.toLowerCase().includes("khám phá")
      ? `2. Hoạt động hình thành kiến thức mới (nếu có): ${extra}`
      : "2. Hoạt động hình thành kiến thức mới (nếu có)";
  }

  // Activity 3: Luyện tập thực hành
  if (
    index === 2 ||
    lower.includes("luyện tập") ||
    lower.includes("thực hành") ||
    /^3[\.\:\-]/.test(s)
  ) {
    const extra = s
      .replace(/^3[\.\:\-]?\s*/, "")
      .replace(
        /^(hoạt động\s+)?(luyện tập(\s*[\/\&]\s*thực hành)?|thực hành)\s*[\:\-]?\s*/i,
        ""
      )
      .replace(/^\(Hệ thống Bài tập SGK\)\s*/i, "")
      .trim();
    return extra && !extra.toLowerCase().includes("luyện tập") && !extra.toLowerCase().includes("thực hành")
      ? `3. Hoạt động luyện tập thực hành: ${extra}`
      : "3. Hoạt động luyện tập thực hành";
  }

  // Activity 4: Vận dụng, trải nghiệm
  if (
    index === 3 ||
    lower.includes("vận dụng") ||
    lower.includes("trải nghiệm") ||
    /^4[\.\:\-]/.test(s)
  ) {
    const extra = s
      .replace(/^4[\.\:\-]?\s*/, "")
      .replace(
        /^(hoạt động\s+)?(vận dụng(\s*[\,\/]\s*trải nghiệm)?|trải nghiệm)\s*[\:\-]?\s*/i,
        ""
      )
      .replace(/^\(Theo yêu cầu SGK\)\s*/i, "")
      .trim();
    return extra && !extra.toLowerCase().includes("vận dụng") && !extra.toLowerCase().includes("trải nghiệm")
      ? `4. Hoạt động vận dụng, trải nghiệm: ${extra}`
      : "4. Hoạt động vận dụng, trải nghiệm";
  }

  return s;
}

/**
 * Ensures lesson title displays the lesson name and the period of the lesson if multi-period:
 * "Tên bài học: nêu tên bài học và số tiết bài học nếu bài học đó có nhiều tiết"
 */
export function formatKHBDLessonTitle(plan: KHBDLessonPlan): string {
  return (plan.title || "").trim();
}

/**
 * 2. Export Kế Hoạch Bài Dạy (KHBD) for the whole week or single lesson (2 columns format)
 */
export async function exportKHBDToWord(
  lessonPlans: KHBDLessonPlan[],
  config: SchoolConfig,
  options?: { includeLBGPage1?: boolean; lbgItems?: LBGItem[]; customFileName?: string }
) {
  const fontSize = getDocxFontSize(config.fontSize || 13);
  const headerFontSize = getDocxFontSize((config.fontSize || 13) + 1);

  // Strictly order lesson plans chronologically by day, session, and period matching LBG & TKB
  const sortedLessonPlans = [...lessonPlans].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    if (a.session !== b.session) return a.session === "Sáng" ? -1 : 1;
    return a.period - b.period;
  });

  const sortedLBGItems = options?.lbgItems
    ? [...options.lbgItems].sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        if (a.session !== b.session) return a.session === "Sáng" ? -1 : 1;
        return a.period - b.period;
      })
    : [];

  const docChildren: (Paragraph | Table)[] = [];

  // If user requested: "Lịch báo giảng kèm trang 1 của KHBD"
  if (options?.includeLBGPage1 && sortedLBGItems.length > 0) {
    // 1. National header
    docChildren.push(createNationalHeader(config, fontSize));

    // 2. Title
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: `KẾ HOẠCH BÀI DẠY & LỊCH BÁO GIẢNG TUẦN ${config.currentWeek}`,
            bold: true,
            size: headerFontSize + 4,
            font: FONT_FAMILY,
            color: "1E3A8A",
          }),
        ],
      })
    );

    // 3. Info line
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `Giáo viên: ${config.currentTeacher}  |  Lớp: ${config.currentClass}  |  ${config.schoolName}`,
            font: FONT_FAMILY,
            size: fontSize,
            bold: true,
          }),
        ],
      })
    );

    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: `Thời gian thực hiện: Từ ngày ${config.startDate} đến ngày ${config.endDate}`,
            italics: true,
            font: FONT_FAMILY,
            size: fontSize,
          }),
        ],
      })
    );

    // 4. Section 1 Heading: I. LỊCH BÁO GIẢNG TUẦN
    docChildren.push(
      new Paragraph({
        spacing: { before: 100, after: 120 },
        children: [
          new TextRun({
            text: `I. LỊCH BÁO GIẢNG TUẦN ${config.currentWeek}`,
            bold: true,
            size: headerFontSize,
            font: FONT_FAMILY,
            color: "1E3A8A",
          }),
        ],
      })
    );

    // 5. LBG Table
    const lbgTable = createLBGTable(sortedLBGItems, fontSize);
    docChildren.push(lbgTable);

    // 6. Page Break before detailed lesson plans
    docChildren.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );

    // Section 2 Heading: II. KẾ HOẠCH BÀI DẠY CHI TIẾT CẢ TUẦN (Thứ 2 đến Thứ 6)
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({
            text: `II. KẾ HOẠCH BÀI DẠY CHI TIẾT (CHUẨN CÔNG VĂN 2345)`,
            bold: true,
            size: headerFontSize + 2,
            font: FONT_FAMILY,
            color: "1E3A8A",
          }),
        ],
      })
    );
  }

  // Generate document header for standalone KHBD (when not including LBG on page 1)
  if (!options?.includeLBGPage1) {
    docChildren.push(createNationalHeader(config, fontSize));

    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: `KẾ HOẠCH BÀI DẠY TUẦN ${config.currentWeek}`,
            bold: true,
            size: headerFontSize + 4,
            font: FONT_FAMILY,
            color: "1E3A8A",
          }),
        ],
      })
    );

    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: `Lớp: ${config.currentClass}  |  Giáo viên: ${config.currentTeacher}  |  ${config.schoolName}`,
            font: FONT_FAMILY,
            size: fontSize,
            bold: true,
          }),
        ],
      })
    );

    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: `Thời gian thực hiện: Từ ngày ${config.startDate} đến ngày ${config.endDate}`,
            italics: true,
            font: FONT_FAMILY,
            size: fontSize,
          }),
        ],
      })
    );
  }

  // Generate each lesson plan in standard 2-column format
  let lastDay = -1;
  let lastSession = "";

  sortedLessonPlans.forEach((plan) => {
    const isNewDay = plan.day !== lastDay;

    // Separate different days with a Page Break so each day starts on a fresh page
    if (isNewDay) {
      if (lastDay !== -1) {
        docChildren.push(new Paragraph({ children: [new PageBreak()] }));
      }
      lastDay = plan.day;
      lastSession = "";

      // Day Heading Banner
      docChildren.push(
        new Paragraph({
          spacing: { before: 140, after: 100 },
          children: [
            new TextRun({
              text: `★ ★ ★ ${plan.dayName.toUpperCase()} (NGÀY ${plan.dateStr}) ★ ★ ★`,
              bold: true,
              size: headerFontSize + 1,
              font: FONT_FAMILY,
              color: "B91C1C",
            }),
          ],
        })
      );
    }

    // Session Heading Banner (phân ra buổi sáng, buổi chiều)
    const isNewSession = plan.session !== lastSession;
    if (isNewSession) {
      lastSession = plan.session;
      docChildren.push(
        new Paragraph({
          spacing: { before: 120, after: 80 },
          children: [
            new TextRun({
              text: `◆ BUỔI ${plan.session.toUpperCase()}`,
              bold: true,
              size: headerFontSize,
              font: FONT_FAMILY,
              color: plan.session === "Sáng" ? "1E40AF" : "B45309",
            }),
          ],
        })
      );
    } else if (!isNewDay) {
      // Divider line between lessons of the same session
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 100 },
          children: [
            new TextRun({
              text: "— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —",
              color: "94A3B8",
              size: fontSize - 2,
              font: FONT_FAMILY,
            }),
          ],
        })
      );
    }

    // Special handling for specialist teachers (GV khác / GV chuyên dạy):
    // "phần GV khác dạy (GV chuyên) vẫn để thông tin GV tên gì, dạy môn gì, không cần ghi tên bài học."
    if (plan.isOtherTeacher) {
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: `MÔN: ${plan.subject.toUpperCase()}${plan.subSubject ? ` (${plan.subSubject.toUpperCase()})` : ""} | Tiết ${plan.period} (${plan.session}) [Lớp ${plan.className}]`,
              bold: true,
              size: headerFontSize,
              font: FONT_FAMILY,
              color: "1E3A8A",
            }),
          ],
        })
      );

      docChildren.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `Giáo viên giảng dạy: `,
              bold: true,
              size: fontSize,
              font: FONT_FAMILY,
            }),
            new TextRun({
              text: `${plan.teacherName} (Giáo viên chuyên trách)`,
              bold: true,
              size: fontSize,
              font: FONT_FAMILY,
              color: "B45309",
            }),
          ],
        })
      );

      docChildren.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: `(Tiết học do GV chuyên trách giảng dạy theo Kế hoạch bài dạy chuyên môn riêng — Không ghi tên bài học)`,
              italics: true,
              size: fontSize - 1,
              font: FONT_FAMILY,
              color: "64748B",
            }),
          ],
        })
      );

      return; // Skip detailed CV 2345 activities for specialist teacher slots!
    }

    // Header per homeroom lesson
    // 1. Môn học & Số tiết theo phân phối chương trình
    docChildren.push(
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({
            text: `Môn học: `,
            bold: true,
            size: fontSize + 1,
            font: FONT_FAMILY,
          }),
          new TextRun({
            text: `${plan.subject}${plan.subSubject ? ` (${plan.subSubject})` : ""}`,
            bold: true,
            size: fontSize + 1,
            font: FONT_FAMILY,
            color: "1E3A8A",
          }),
          new TextRun({
            text: `   -   Số tiết theo phân phối chương trình: `,
            bold: true,
            size: fontSize + 1,
            font: FONT_FAMILY,
          }),
          new TextRun({
            text: `Tiết ${plan.ppct}`,
            bold: true,
            size: fontSize + 1,
            font: FONT_FAMILY,
            color: "B45309",
          }),
          new TextRun({
            text: `   (${plan.dayName}, Buổi ${plan.session} - Tiết ${plan.period} [Lớp ${plan.className}])`,
            italics: true,
            size: fontSize - 1,
            font: FONT_FAMILY,
            color: "64748B",
          }),
        ],
      })
    );

    // 2. Tên bài học: nêu tên bài học và số tiết bài học nếu bài học đó có nhiều tiết
    docChildren.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: `Tên bài học: `,
            bold: true,
            size: fontSize + 2,
            font: FONT_FAMILY,
          }),
          new TextRun({
            text: `${formatKHBDLessonTitle(plan)}`,
            bold: true,
            size: fontSize + 2,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    // I. YÊU CẦU CẦN ĐẠT
    docChildren.push(
      new Paragraph({
        spacing: { before: 100, after: 60 },
        children: [
          new TextRun({
            text: `I. YÊU CẦU CẦN ĐẠT:`,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    // 1. Năng lực đặc thù
    docChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: `1. Năng lực đặc thù: `,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
          new TextRun({
            text: plan.goals.specificCompetencies.join("; "),
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    // 2. Năng lực chung
    docChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: `2. Năng lực chung: `,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
          new TextRun({
            text: plan.goals.generalCompetencies.join("; "),
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    // 3. Phẩm chất
    docChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: `3. Phẩm chất: `,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
          new TextRun({
            text: plan.goals.qualities.join("; "),
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    // Tích hợp nếu có
    if (plan.goals.integration) {
      docChildren.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: `* Nội dung tích hợp: `,
              bold: true,
              italics: true,
              size: fontSize,
              font: FONT_FAMILY,
              color: "047857",
            }),
            new TextRun({
              text: plan.goals.integration,
              italics: true,
              size: fontSize,
              font: FONT_FAMILY,
            }),
          ],
        })
      );
    }

    // II. ĐỒ DÙNG DẠY HỌC
    docChildren.push(
      new Paragraph({
        spacing: { before: 100, after: 60 },
        children: [
          new TextRun({
            text: `II. ĐỒ DÙNG DẠY HỌC VÀ HỌC LIỆU:`,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    docChildren.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: `- Giáo viên: `,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
          new TextRun({
            text: plan.materials.teacher.join("; "),
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    docChildren.push(
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `- Học sinh: `,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
          new TextRun({
            text: plan.materials.students.join("; "),
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    // III. HOẠT ĐỘNG DẠY HỌC (2 CỘT CHUẨN 2345)
    docChildren.push(
      new Paragraph({
        spacing: { before: 120, after: 40 },
        children: [
          new TextRun({
            text: `III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU:`,
            bold: true,
            size: fontSize + 1,
            font: FONT_FAMILY,
            color: "1E3A8A",
          }),
        ],
      })
    );

    docChildren.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: `(Nêu rõ 4 hoạt động: 1. Hoạt động khởi động; 2. Hoạt động hình thành kiến thức mới (nếu có); 3. Hoạt động luyện tập thực hành; 4. Hoạt động vận dụng, trải nghiệm)`,
            italics: true,
            size: fontSize - 2,
            font: FONT_FAMILY,
            color: "475569",
          }),
        ],
      })
    );

    // Build 2-column activities table
    const activityRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("HOẠT ĐỘNG CỦA GIÁO VIÊN", 5500, fontSize),
          createHeaderCell("HOẠT ĐỘNG CỦA HỌC SINH", 5500, fontSize),
        ],
      }),
    ];

    plan.activities.forEach((act, actIdx) => {
      const stepTitle = normalizeActivityStepTitle(act.step, actIdx);
      // Step Title Row spanning across or formatted
      const gvParagraphs: Paragraph[] = [
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `★ ${stepTitle}`,
              bold: true,
              size: fontSize,
              font: FONT_FAMILY,
              color: "1E3A8A",
            }),
            new TextRun({
              text: act.time ? ` (${act.time})` : "",
              italics: true,
              size: fontSize - 2,
              font: FONT_FAMILY,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: `Mục tiêu: `,
              bold: true,
              italics: true,
              size: fontSize - 2,
              font: FONT_FAMILY,
            }),
            new TextRun({
              text: act.target,
              italics: true,
              size: fontSize - 2,
              font: FONT_FAMILY,
            }),
          ],
        }),
        ...act.teacherActivities.map(
          (tAct) =>
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: tAct.startsWith("-") || tAct.startsWith("+") ? tAct : `- ${tAct}`,
                  size: fontSize,
                  font: FONT_FAMILY,
                }),
              ],
            })
        ),
      ];

      const hsParagraphs: Paragraph[] = [
        new Paragraph({
          spacing: { after: 140 },
          children: [new TextRun({ text: "", size: fontSize })],
        }),
        ...act.studentActivities.map(
          (sAct) =>
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: sAct.startsWith("-") || sAct.startsWith("+") ? sAct : `- ${sAct}`,
                  size: fontSize,
                  font: FONT_FAMILY,
                }),
              ],
            })
        ),
      ];

      activityRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: gvParagraphs,
              margins: { top: 120, bottom: 120, left: 140, right: 140 },
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: hsParagraphs,
              margins: { top: 120, bottom: 120, left: 140, right: 140 },
            }),
          ],
        })
      );
    });

    docChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: tableBorders,
        rows: activityRows,
      })
    );

    // IV. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ)
    docChildren.push(
      new Paragraph({
        spacing: { before: 140, after: 60 },
        children: [
          new TextRun({
            text: `IV. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ):`,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );

    docChildren.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text:
              plan.adjustment ||
              "............................................................................................................................................................................................................................................",
            italics: true,
            size: fontSize,
            font: FONT_FAMILY,
          }),
        ],
      })
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, right: 1000, bottom: 1000, left: 1200 },
          },
        },
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const teacherSlug = config.currentTeacher ? `_GV_${config.currentTeacher.replace(/^(Cô|Thầy|GV)\s+/i, "").replace(/\s+/g, "_")}` : "";
  const defaultCombinedName = `Giao_An_Kem_LBG_Tuan_${config.currentWeek}${teacherSlug}_Lop_${config.currentClass}_Font${config.fontSize}.docx`;
  const defaultStandaloneName = `KHBD_Tuan_${config.currentWeek}${teacherSlug}_Lop_${config.currentClass}_Font${config.fontSize}.docx`;
  const fileName = options?.customFileName || (options?.includeLBGPage1 ? defaultCombinedName : defaultStandaloneName);
  saveAs(blob, fileName);
}

/**
 * 3. Export Timetable (TKB) to Word
 */
export async function exportTKBToWord(
  slots: TimetableSlot[],
  targetClasses: string[],
  config: SchoolConfig,
  targetTeacherName?: string
) {
  const fontSize = getDocxFontSize(config.fontSize || 13);
  const headerFontSize = getDocxFontSize((config.fontSize || 13) + 1);

  // CASE 1: Individual Teacher Timetable
  if (targetTeacherName && targetTeacherName.trim()) {
    const teacherAssignments = getTeacherAssignedSlots(slots, targetTeacherName);
    const totalPeriods = teacherAssignments.length;

    // Build Weekly Timetable Grid for Teacher: Buổi | Tiết | Thứ Hai | Thứ Ba | Thứ Tư | Thứ Năm | Thứ Sáu
    const days = [
      { day: 2, name: "Thứ Hai" },
      { day: 3, name: "Thứ Ba" },
      { day: 4, name: "Thứ Tư" },
      { day: 5, name: "Thứ Năm" },
      { day: 6, name: "Thứ Sáu" },
    ];

    const teacherGridRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Buổi", 1100, fontSize),
          createHeaderCell("Tiết", 700, fontSize),
          ...days.map((d) => createHeaderCell(d.name, 1700, fontSize)),
        ],
      }),
    ];

    // Morning: Periods 1..4 (or 1..5)
    [1, 2, 3, 4, 5].forEach((periodNum, pIdx) => {
      const rowCells: TableCell[] = [];
      if (pIdx === 0) {
        rowCells.push(
          new TableCell({
            width: { size: 1100, type: WidthType.DXA },
            rowSpan: 5,
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "SÁNG",
                    bold: true,
                    size: fontSize,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
            ],
          })
        );
      }

      rowCells.push(createBodyCell(periodNum.toString(), 700, fontSize, true, AlignmentType.CENTER));

      days.forEach((d) => {
        const slot = slots.find((s) => s.day === d.day && s.period === periodNum && s.session === "Sáng");
        const matchedClasses: { cls: string; subject: string }[] = [];
        if (slot) {
          Object.entries(slot.classSubjectMap).forEach(([cls, entry]) => {
            if (isTeacherMatchingSlot(entry, targetTeacherName)) {
              matchedClasses.push({ cls, subject: entry.subject });
            }
          });
        }

        const cellText =
          matchedClasses.length > 0
            ? matchedClasses.map((m) => `${m.subject}\n(Lớp ${m.cls})`).join("\n")
            : "—";

        rowCells.push(
          createBodyCell(cellText, 1700, fontSize, matchedClasses.length > 0, AlignmentType.CENTER)
        );
      });

      teacherGridRows.push(new TableRow({ children: rowCells }));
    });

    // Afternoon: Periods 1..3
    [1, 2, 3].forEach((periodNum, pIdx) => {
      const rowCells: TableCell[] = [];
      if (pIdx === 0) {
        rowCells.push(
          new TableCell({
            width: { size: 1100, type: WidthType.DXA },
            rowSpan: 3,
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "CHIỀU",
                    bold: true,
                    size: fontSize,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
            ],
          })
        );
      }

      rowCells.push(createBodyCell(periodNum.toString(), 700, fontSize, true, AlignmentType.CENTER));

      days.forEach((d) => {
        const slot = slots.find((s) => s.day === d.day && s.period === periodNum && s.session === "Chiều");
        const matchedClasses: { cls: string; subject: string }[] = [];
        if (slot) {
          Object.entries(slot.classSubjectMap).forEach(([cls, entry]) => {
            if (isTeacherMatchingSlot(entry, targetTeacherName)) {
              matchedClasses.push({ cls, subject: entry.subject });
            }
          });
        }

        const cellText =
          matchedClasses.length > 0
            ? matchedClasses.map((m) => `${m.subject}\n(Lớp ${m.cls})`).join("\n")
            : "—";

        rowCells.push(
          createBodyCell(cellText, 1700, fontSize, matchedClasses.length > 0, AlignmentType.CENTER)
        );
      });

      teacherGridRows.push(new TableRow({ children: rowCells }));
    });

    // Build Detail List of Teaching Periods: STT | Thứ | Buổi | Tiết | Lớp | Môn học
    const detailListRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("STT", 600, fontSize),
          createHeaderCell("Thứ, ngày", 1600, fontSize),
          createHeaderCell("Buổi", 1000, fontSize),
          createHeaderCell("Tiết", 700, fontSize),
          createHeaderCell("Lớp", 1000, fontSize),
          createHeaderCell("Môn học / Tiết dạy", 3500, fontSize),
          createHeaderCell("Ghi chú", 1800, fontSize),
        ],
      }),
    ];

    teacherAssignments.forEach((item, idx) => {
      detailListRows.push(
        new TableRow({
          children: [
            createBodyCell((idx + 1).toString(), 600, fontSize, false, AlignmentType.CENTER),
            createBodyCell(`${item.slot.dayName}`, 1600, fontSize, false, AlignmentType.CENTER),
            createBodyCell(item.slot.session, 1000, fontSize, false, AlignmentType.CENTER),
            createBodyCell(item.slot.period.toString(), 700, fontSize, true, AlignmentType.CENTER),
            createBodyCell(`Lớp ${item.className}`, 1000, fontSize, true, AlignmentType.CENTER),
            createBodyCell(item.subject, 3500, fontSize, true, AlignmentType.LEFT),
            createBodyCell("", 1800, fontSize, false, AlignmentType.LEFT),
          ],
        })
      );
    });

    // Build Class Matrix with ONLY this teacher's classes shown
    const matrixHeaderCells: TableCell[] = [
      createHeaderCell("Thứ", 1000, fontSize),
      createHeaderCell("Buổi", 900, fontSize),
      createHeaderCell("Tiết", 700, fontSize),
      ...targetClasses.map((cls) => createHeaderCell(`Lớp ${cls}`, 1100, fontSize)),
    ];

    const matrixRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: matrixHeaderCells,
      }),
    ];

    slots.forEach((slot) => {
      const rowCells: TableCell[] = [
        createBodyCell(slot.dayName, 1000, fontSize, false, AlignmentType.CENTER),
        createBodyCell(slot.session, 900, fontSize, false, AlignmentType.CENTER),
        createBodyCell(slot.period.toString(), 700, fontSize, false, AlignmentType.CENTER),
      ];

      targetClasses.forEach((cls) => {
        const classEntry = slot.classSubjectMap[cls];
        const isAssigned = classEntry && isTeacherMatchingSlot(classEntry, targetTeacherName);
        const text = isAssigned ? `${classEntry.subject}` : "—";
        rowCells.push(createBodyCell(text, 1100, fontSize, !!isAssigned, AlignmentType.CENTER));
      });

      matrixRows.push(new TableRow({ children: rowCells }));
    });

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 800, right: 800, bottom: 800, left: 1000 },
            },
          },
          children: [
            createNationalHeader(
              {
                ...config,
                currentTeacher: targetTeacherName,
                currentClass: "Chuyên trách",
              },
              fontSize
            ),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 180, after: 80 },
              children: [
                new TextRun({
                  text: `THỜI KHÓA BIỂU GIẢNG DẠY CÁ NHÂN`,
                  bold: true,
                  size: headerFontSize + 4,
                  font: FONT_FAMILY,
                  color: "1E3A8A",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: `Giáo viên: `,
                  bold: true,
                  size: fontSize + 1,
                  font: FONT_FAMILY,
                }),
                new TextRun({
                  text: `${targetTeacherName.toUpperCase()} | `,
                  bold: true,
                  size: fontSize + 1,
                  font: FONT_FAMILY,
                  color: "047857",
                }),
                new TextRun({
                  text: `Tổng số: `,
                  bold: true,
                  size: fontSize,
                  font: FONT_FAMILY,
                }),
                new TextRun({
                  text: `${totalPeriods} tiết / tuần`,
                  bold: true,
                  size: fontSize,
                  font: FONT_FAMILY,
                  color: "1E3A8A",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [
                new TextRun({
                  text: `Áp dụng từ ngày ${config.startDate} | Năm học: ${config.academicYear} | ${config.schoolName}`,
                  italics: true,
                  font: FONT_FAMILY,
                  size: fontSize - 1,
                }),
              ],
            }),

            // Section 1: Weekly Schedule Grid
            new Paragraph({
              spacing: { before: 100, after: 100 },
              children: [
                new TextRun({
                  text: `I. BẢNG THỜI KHÓA BIỂU GIẢNG DẠY THEO TUẦN (Thứ 2 - Thứ 6)`,
                  bold: true,
                  font: FONT_FAMILY,
                  size: fontSize,
                  color: "1E3A8A",
                }),
              ],
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: tableBorders,
              rows: teacherGridRows,
            }),

            // Section 2: Detailed chronological list
            new Paragraph({
              spacing: { before: 240, after: 100 },
              children: [
                new TextRun({
                  text: `II. DANH SÁCH CHI TIẾT CÁC TIẾT DẠY (${totalPeriods} TIẾT)`,
                  bold: true,
                  font: FONT_FAMILY,
                  size: fontSize,
                  color: "1E3A8A",
                }),
              ],
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: tableBorders,
              rows: detailListRows,
            }),

            // Page Break for Section 3
            new Paragraph({
              children: [new PageBreak()],
            }),

            // Section 3: Class matrix showing only this teacher's teaching distribution
            new Paragraph({
              spacing: { before: 100, after: 100 },
              children: [
                new TextRun({
                  text: `III. MA TRẬN PHÂN BỔ TIẾT DẠY THEO CÁC LỚP HỌC`,
                  bold: true,
                  font: FONT_FAMILY,
                  size: fontSize,
                  color: "1E3A8A",
                }),
              ],
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: tableBorders,
              rows: matrixRows,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `TKB_Ca_Nhan_GV_${targetTeacherName.replace(/\s+/g, "_")}_Font${config.fontSize}.docx`;
    saveAs(blob, fileName);
    return;
  }

  // CASE 2: Single Class Timetable
  if (targetClasses.length === 1) {
    const singleClass = targetClasses[0];
    const days = [
      { day: 2, name: "Thứ Hai" },
      { day: 3, name: "Thứ Ba" },
      { day: 4, name: "Thứ Tư" },
      { day: 5, name: "Thứ Năm" },
      { day: 6, name: "Thứ Sáu" },
    ];

    const classGridRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Buổi", 1100, fontSize),
          createHeaderCell("Tiết", 700, fontSize),
          ...days.map((d) => createHeaderCell(d.name, 1700, fontSize)),
        ],
      }),
    ];

    // Morning: Periods 1..5
    [1, 2, 3, 4, 5].forEach((periodNum, pIdx) => {
      const rowCells: TableCell[] = [];
      if (pIdx === 0) {
        rowCells.push(
          new TableCell({
            width: { size: 1100, type: WidthType.DXA },
            rowSpan: 5,
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "SÁNG",
                    bold: true,
                    size: fontSize,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
            ],
          })
        );
      }

      rowCells.push(createBodyCell(periodNum.toString(), 700, fontSize, true, AlignmentType.CENTER));

      days.forEach((d) => {
        const slot = slots.find((s) => s.day === d.day && s.period === periodNum && s.session === "Sáng");
        const entry = slot?.classSubjectMap[singleClass];
        const cellText = entry && entry.subject && entry.subject !== "—"
          ? `${entry.subject}${entry.teacherName ? `\n(${entry.teacherName})` : ""}`
          : "—";

        rowCells.push(
          createBodyCell(cellText, 1700, fontSize, cellText !== "—", AlignmentType.CENTER)
        );
      });

      classGridRows.push(new TableRow({ children: rowCells }));
    });

    // Afternoon: Periods 1..3
    [1, 2, 3].forEach((periodNum, pIdx) => {
      const rowCells: TableCell[] = [];
      if (pIdx === 0) {
        rowCells.push(
          new TableCell({
            width: { size: 1100, type: WidthType.DXA },
            rowSpan: 3,
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "CHIỀU",
                    bold: true,
                    size: fontSize,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
            ],
          })
        );
      }

      rowCells.push(createBodyCell(periodNum.toString(), 700, fontSize, true, AlignmentType.CENTER));

      days.forEach((d) => {
        const slot = slots.find((s) => s.day === d.day && s.period === periodNum && s.session === "Chiều");
        const entry = slot?.classSubjectMap[singleClass];
        const cellText = entry && entry.subject && entry.subject !== "—"
          ? `${entry.subject}${entry.teacherName ? `\n(${entry.teacherName})` : ""}`
          : "—";

        rowCells.push(
          createBodyCell(cellText, 1700, fontSize, cellText !== "—", AlignmentType.CENTER)
        );
      });

      classGridRows.push(new TableRow({ children: rowCells }));
    });

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 800, right: 800, bottom: 800, left: 1000 },
            },
          },
          children: [
            createNationalHeader(
              {
                ...config,
                currentClass: singleClass,
              },
              fontSize
            ),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 80 },
              children: [
                new TextRun({
                  text: `THỜI KHÓA BIỂU HỌC TẬP - LỚP ${singleClass}`,
                  bold: true,
                  size: headerFontSize + 4,
                  font: FONT_FAMILY,
                  color: "1E3A8A",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [
                new TextRun({
                  text: `GV Chủ nhiệm: ${config.currentTeacher} | Áp dụng từ: ${config.startDate} | Trường: ${config.schoolName}`,
                  italics: true,
                  font: FONT_FAMILY,
                  size: fontSize,
                }),
              ],
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: tableBorders,
              rows: classGridRows,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `TKB_Lop_${singleClass}_Font${config.fontSize}.docx`;
    saveAs(blob, fileName);
    return;
  }

  // CASE 3: Whole School Matrix Timetable
  const headerCells: TableCell[] = [
    createHeaderCell("Thứ", 1000, fontSize),
    createHeaderCell("Buổi", 900, fontSize),
    createHeaderCell("Tiết", 700, fontSize),
    ...targetClasses.map((cls) => createHeaderCell(`Lớp ${cls}`, 1200, fontSize)),
  ];

  const rows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: headerCells,
    }),
  ];

  slots.forEach((slot) => {
    const rowCells: TableCell[] = [
      createBodyCell(slot.dayName, 1000, fontSize, false, AlignmentType.CENTER),
      createBodyCell(slot.session, 900, fontSize, false, AlignmentType.CENTER),
      createBodyCell(slot.period.toString(), 700, fontSize, false, AlignmentType.CENTER),
    ];

    targetClasses.forEach((cls) => {
      const classEntry = slot.classSubjectMap[cls];
      const text = classEntry ? `${classEntry.subject}` : "—";
      rowCells.push(createBodyCell(text, 1200, fontSize, false, AlignmentType.CENTER));
    });

    rows.push(new TableRow({ children: rowCells }));
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 800, right: 800, bottom: 800, left: 1000 },
          },
        },
        children: [
          createNationalHeader(config, fontSize),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: `THỜI KHÓA BIỂU TOÀN TRƯỜNG - NĂM HỌC: ${config.academicYear}`,
                bold: true,
                size: headerFontSize + 2,
                font: FONT_FAMILY,
                color: "1E3A8A",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Áp dụng từ ngày ${config.startDate} | Trường: ${config.schoolName}`,
                italics: true,
                font: FONT_FAMILY,
                size: fontSize,
              }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: rows,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `TKB_Toan_Truong_Tuan_${config.currentWeek}_Font${config.fontSize}.docx`;
  saveAs(blob, fileName);
}

// Helpers for docx building
function createHeaderCell(text: string, width: number, fontSize: number): TableCell {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "1E3A8A" },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 120, bottom: 120, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: text,
            bold: true,
            size: fontSize,
            font: FONT_FAMILY,
            color: "FFFFFF",
          }),
        ],
      }),
    ],
  });
}

function createBodyCell(
  text: string,
  width: number,
  fontSize: number,
  bold: boolean = false,
  alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT
): TableCell {
  const lines = text.split("\n");
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: lines.map(
      (line) =>
        new Paragraph({
          alignment: alignment,
          children: [
            new TextRun({
              text: line,
              bold: bold,
              size: fontSize,
              font: FONT_FAMILY,
            }),
          ],
        })
    ),
  });
}

function createNationalHeader(config: SchoolConfig, fontSize: number): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 45, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: config.department.toUpperCase(),
                    size: fontSize - 2,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: config.schoolName.toUpperCase(),
                    bold: true,
                    size: fontSize - 1,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Lớp: ${config.currentClass} - GV: ${config.currentTeacher}`,
                    size: fontSize - 2,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 55, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                    bold: true,
                    size: fontSize - 1,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Độc lập - Tự do - Hạnh phúc",
                    bold: true,
                    size: fontSize - 1,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "---------------------------",
                    size: fontSize - 4,
                    font: FONT_FAMILY,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

