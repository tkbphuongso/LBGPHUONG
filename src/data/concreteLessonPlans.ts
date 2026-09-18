import { KHBDLessonPlan, KHBDActivity } from "../types";
import { getOfficialLessonEntry, CurriculumLessonEntry } from "./officialGradeCurriculum";
import { buildActivitiesWithExplicitSGKContent } from "./textbookContentEngine";

export interface ConcreteLessonData {
  title: string;
  subSubject: string;
  goals: {
    specificCompetencies: string[];
    generalCompetencies: string[];
    qualities: string[];
    integration: string;
  };
  materials: {
    teacher: string[];
    students: string[];
  };
  activities: KHBDActivity[];
  adjustment?: string;
}

/**
 * Builds tailored, step-by-step activities for any official lesson entry (Grade 1-5)
 */
function buildActivitiesForOfficialEntry(
  entry: CurriculumLessonEntry,
  subject: string,
  grade: number,
  ppct: number,
  week: number
): KHBDActivity[] {
  // Bổ sung đầy đủ nội dung chính trong SGK (ngữ liệu, hệ thống câu hỏi SGK, khung Ghi nhớ SGK, bài tập SGK)
  // vào cả Hoạt động của Giáo viên (HĐGV) và Hoạt động của Học sinh (HĐHS) chuẩn Công văn 2345/BGDĐT cho tất cả các khối lớp
  return buildActivitiesWithExplicitSGKContent(entry, subject, grade, ppct, week);
}

/**
 * Builds standard materials for official entry
 */
function buildMaterialsForOfficialEntry(
  entry: CurriculumLessonEntry,
  subject: string,
  grade: number
): { teacher: string[]; students: string[] } {
  const subjLower = subject.toLowerCase();

  if (subjLower.includes("tiếng việt") || subjLower.includes("tv")) {
    return {
      teacher: [
        `Giáo án điện tử PowerPoint chuẩn CV 2345/BGDĐT môn Tiếng Việt lớp ${grade}, tivi/máy chiếu.`,
        `Tranh ảnh minh họa bài học SGK Tiếng Việt lớp ${grade} (Bộ sách Kết nối tri thức với cuộc sống).`,
        `Phiếu học tập thảo luận nhóm, bảng phụ ghi câu văn/từ ngữ rèn đọc và bài tập viết.`
      ],
      students: [
        `Sách giáo khoa Tiếng Việt lớp ${grade} (Tập 1 - Bộ Kết nối tri thức với cuộc sống).`,
        `Vở bài tập Tiếng Việt lớp ${grade}, vở ghi bài, bút mực, thước kẻ, bảng con.`
      ]
    };
  }

  if (subjLower.includes("toán") || subjLower.includes("math")) {
    return {
      teacher: [
        `Slide bài giảng điện tử tương tác môn Toán lớp ${grade} chuẩn CV 2345/BGDĐT.`,
        `Bộ đồ dùng dạy Toán lớp ${grade} của giáo viên, bảng phụ, phiếu bài tập thực hành.`,
        `Tranh ảnh minh họa bài học SGK Toán lớp ${grade} tương ứng.`
      ],
      students: [
        `Sách giáo khoa Toán lớp ${grade} (Bộ Kết nối tri thức với cuộc sống).`,
        `Vở bài tập Toán lớp ${grade}, vở nháp, bộ đồ dùng học Toán của học sinh, bảng con.`
      ]
    };
  }

  if (subjLower.includes("khoa học") || subjLower.includes("kh")) {
    return {
      teacher: [
        `Kế hoạch bài dạy môn Khoa học lớp ${grade}, bài giảng điện tử PowerPoint kèm video clip thí nghiệm.`,
        `Dụng cụ thí nghiệm trực quan: Cốc thủy tinh, nước sạch, khay nhựa, thìa khuấy, muối, đường, cát... theo yêu cầu bài học.`,
        `Phiếu học tập ghi lại kết quả quan sát thí nghiệm khoa học cho các nhóm.`
      ],
      students: [
        `Sách giáo khoa Khoa học lớp ${grade} (Bộ Kết nối tri thức với cuộc sống), vở ghi bài.`,
        `Đồ dùng học tập cá nhân, khăn lau tay sau khi thực hành.`
      ]
    };
  }

  if (subjLower.includes("lịch sử") || subjLower.includes("địa lí") || subjLower.includes("địa lý") || subjLower.includes("ls") || subjLower.includes("đl")) {
    return {
      teacher: [
        `Bản đồ, lược đồ địa lí tự nhiên và dân cư Việt Nam phù hợp bài dạy lớp ${grade}.`,
        `Bài giảng PowerPoint, tranh ảnh tư liệu lịch sử, hiện vật hoặc video clip tư liệu ngắn.`,
        `Phiếu học tập tìm hiểu sự kiện và địa danh.`
      ],
      students: [
        `Sách giáo khoa Lịch sử và Địa lí lớp ${grade} (Bộ Kết nối tri thức với cuộc sống).`,
        `Vở bài tập Lịch sử và Địa lí lớp ${grade}, bút dạ, thước kẻ.`
      ]
    };
  }

  if (subjLower.includes("đạo đức")) {
    return {
      teacher: [
        `Tranh truyện và tình huống đạo đức phóng to SGK Đạo đức lớp ${grade}, video tình huống thực tế.`,
        `Thẻ hoa bày tỏ ý kiến (Tán thành / Không tán thành), slide bài giảng điện tử.`
      ],
      students: [
        `Sách giáo khoa Đạo đức lớp ${grade} (Bộ Kết nối tri thức với cuộc sống).`,
        `Vở bài tập Đạo đức lớp ${grade}, đồ dùng học tập cá nhân.`
      ]
    };
  }

  if (subjLower.includes("công nghệ") || subjLower.includes("cn")) {
    return {
      teacher: [
        `Kế hoạch bài dạy môn Công nghệ lớp ${grade}, slide PowerPoint hình ảnh các loài hoa, cây cảnh hoặc quy trình gieo trồng.`,
        `Mẫu vật thật hoặc chậu cây mẫu minh họa bài học, phiếu hướng dẫn thực hành.`
      ],
      students: [
        `Sách giáo khoa Công nghệ lớp ${grade} (Bộ Kết nối tri thức với cuộc sống).`,
        `Vở bài tập Công nghệ lớp ${grade}, đồ dùng học tập.`
      ]
    };
  }

  if (subjLower.includes("trải nghiệm") || subjLower.includes("hđtn")) {
    return {
      teacher: [
        `Kế hoạch sinh hoạt và kịch bản tổ chức HĐTN tuần ${entry.week || 1} lớp ${grade}.`,
        `Hệ thống âm thanh mic, máy chiếu/tivi, cờ Đội, biển tên các ban chuyên trách của lớp.`,
        `Bảng phụ ghi các tiêu chuẩn thi đua, phiếu đóng góp ý kiến xây dựng nội quy lớp.`
      ],
      students: [
        `Trang phục đồng phục học sinh sạch đẹp, khăn quàng đỏ trang nghiêm.`,
        `Sổ tay đội viên, giấy ghi ý kiến thảo luận xây dựng nề nếp lớp.`
      ]
    };
  }

  if (subjLower.includes("tự nhiên") || subjLower.includes("tnxh")) {
    return {
      teacher: [
        `Tranh ảnh phóng to trong SGK Tự nhiên và Xã hội lớp ${grade}.`,
        `Bài giảng điện tử PowerPoint kèm video clip khoa học tự nhiên, phiếu quan sát.`
      ],
      students: [
        `Sách giáo khoa Tự nhiên và Xã hội lớp ${grade} (Bộ Kết nối tri thức).`,
        `Vở bài tập TNXH lớp ${grade}, bút màu, đồ dùng học tập.`
      ]
    };
  }

  return {
    teacher: [
      `Kế hoạch bài dạy chuẩn CV 2345/BGDĐT môn ${subject} lớp ${grade}.`,
      `Tranh ảnh minh họa SGK, bài giảng điện tử PowerPoint, thiết bị dạy học số.`
    ],
    students: [
      `Sách giáo khoa ${subject} lớp ${grade}, vở bài tập, đồ dùng học tập môn học.`
    ]
  };
}

/**
 * Knowledge base of real, authentic, rich lesson content according to Vietnam Primary Curriculum 2018
 * (Kết nối tri thức với cuộc sống & Cánh diều/Chân trời sáng tạo)
 */
export function getConcreteLessonContent(
  subject: string,
  grade: number,
  ppct: number,
  week: number = 1
): ConcreteLessonData {
  // 0. FIRST PRIORITY: Look up official curriculum repository (especially for Grade 1 and all authorized subjects)
  const officialEntry = getOfficialLessonEntry(subject, grade, ppct, week);
  if (officialEntry) {
    const specificActivities = buildActivitiesForOfficialEntry(officialEntry, subject, grade, ppct, week);
    const specificMaterials = buildMaterialsForOfficialEntry(officialEntry, subject, grade);

    return {
      title: officialEntry.title,
      subSubject: officialEntry.subSubject || "Theo phân phối chương trình",
      goals: officialEntry.detailedGoals ? {
        specificCompetencies: officialEntry.detailedGoals.specificCompetencies,
        generalCompetencies: officialEntry.detailedGoals.generalCompetencies,
        qualities: officialEntry.detailedGoals.qualities,
        integration: officialEntry.detailedGoals.integration || (officialEntry.integrationNote
          ? `• AI: ${officialEntry.integrationNote} • Năng lực số: ${officialEntry.integrationNote} • Quyền con người: ${officialEntry.integrationNote}`
          : "• AI: Tôn trọng sự khác biệt. NLS 2.3.CB1a. AI 4.A1.1 • Năng lực số: Tôn trọng sự khác biệt. NLS 2.3.CB1a. AI 4.A1.1 • Quyền con người: Tôn trọng sự khác biệt. NLS 2.3.CB1a. AI 4.A1.1")
      } : {
        specificCompetencies: [
          `Nắm vững kiến thức trọng tâm bài học: ${officialEntry.title}.`,
          `Thực hành thành thạo các bài tập và yêu cầu cần đạt theo chuẩn chương trình môn ${subject.toUpperCase()} lớp ${grade}.`,
          "Vận dụng linh hoạt kiến thức vào các tình huống thực tiễn học tập và cuộc sống."
        ],
        generalCompetencies: [
          "Năng lực tự chủ và tự học: Tự giác chuẩn bị sách vở, đồ dùng học tập; chủ động hoàn thành nhiệm vụ cá nhân.",
          "Năng lực giao tiếp và hợp tác: Tự tin trao đổi, tích cực thảo luận nhóm và chia sẻ ý kiến cùng bạn bè.",
          "Năng lực giải quyết vấn đề và sáng tạo: Biết vận dụng kiến thức bài học để xử lý tình huống linh hoạt."
        ],
        qualities: [
          "Chăm chỉ: Tích cực tham gia các hoạt động học tập, kiên trì hoàn thành bài tập nắn nót.",
          "Trung thực: Trung thực trong làm bài và sinh hoạt lớp.",
          "Trách nhiệm: Có ý thức bảo quản đồ dùng học tập và giữ gìn nề nếp lớp học."
        ],
        integration: officialEntry.integrationNote
          ? `• AI: ${officialEntry.integrationNote} • Năng lực số: ${officialEntry.integrationNote} • Quyền con người: ${officialEntry.integrationNote}`
          : "• AI: Tôn trọng sự khác biệt. NLS 2.3.CB1a. AI 4.A1.1 • Năng lực số: Tôn trọng sự khác biệt. NLS 2.3.CB1a. AI 4.A1.1 • Quyền con người: Tôn trọng sự khác biệt. NLS 2.3.CB1a. AI 4.A1.1"
      },
      materials: specificMaterials,
      activities: specificActivities,
      adjustment: ""
    };
  }

  const normSubj = subject.toLowerCase();

  const hasSubjectToken = (tokens: string[]): boolean => {
    const parts = normSubj.split(/[\s\(\)\[\]\-,\.\/]+/);
    return tokens.some(tok => parts.includes(tok));
  };

  // 1. TIẾNG VIỆT
  if (normSubj.includes("tiếng việt") || hasSubjectToken(["tv", "tctv"])) {
    if (grade === 1) {
      if (ppct === 1) {
        return {
          title: "Bài 1: A a, B b (Tiết 1) - Làm quen âm chữ A a, B b",
          subSubject: "Âm và Chữ",
          goals: {
            specificCompetencies: [
              "Nhận biết và phát âm đúng âm a, âm b; nhận diện chữ cái A, a, B, b in hoa và in thường.",
              "Đọc đúng tiếng 'ba' (bờ - a - ba) và các tiếng có âm a, b trong tranh: ba, bà, bá, bóng, bàn.",
              "Viết đúng chữ cái a, b và tiếng ba vào bảng con đúng kích cỡ (chữ a cao 2 li, chữ b cao 5 li)."
            ],
            generalCompetencies: [
              "Tự chủ và tự học: Tự giác luyện phát âm chuẩn và thực hành cài chữ vào bảng gài.",
              "Giao tiếp và hợp tác: Lắng nghe cô giáo đọc mẫu, tự tin phát biểu trước lớp."
            ],
            qualities: [
              "Chăm chỉ: Rèn luyện thói quen ngồi viết đúng tư thế, nắn nót từng nét chữ.",
              "Yêu nước: Yêu quý tiếng mẹ đẻ, hào hứng học chữ tiếng Việt."
            ],
            integration: "Tích hợp Học thông qua chơi (Trò chơi 'Bắt cá tìm chữ A, B') & Năng lực số."
          },
          materials: {
            teacher: [
              "Bộ thẻ chữ cái A, a, B, b; thẻ từ 'ba', 'bà', 'bá'.",
              "Tranh phóng to bài 1 SGK Tiếng Việt 1 trang 10 (cảnh gia đình Nam đi dạo).",
              "Slide PowerPoint bài giảng điện tử tương tác."
            ],
            students: [
              "Sách giáo khoa Tiếng Việt 1 (Tập 1 - Kết nối tri thức).",
              "Bảng con, phấn trắng, khăn lau bảng, bộ đồ dùng Tiếng Việt 1."
            ]
          },
          activities: [
            {
              step: "1. Khởi động",
              time: "5 phút",
              target: "Tạo không khí vui tươi, hào hứng và nhận biết âm a, b qua bài hát.",
              teacherActivities: [
                "- Bắt nhịp cho lớp hát và vỗ tay theo bài 'A con cá sấu, B con bò tót'.",
                "- Hỏi: 'Trong bài hát, tên các con vật bắt đầu bằng chữ cái gì?'",
                "- Nhận xét, giới thiệu bài: 'Hôm nay chúng ta cùng học Bài 1: A a, B b (Tiết 1)'."
              ],
              studentActivities: [
                "- Cả lớp hát vang bài hát và vỗ tay theo nhịp.",
                "- HS trả lời: 'Bắt đầu bằng chữ A và chữ B ạ!'",
                "- Lắng nghe cô giáo giới thiệu bài và quan sát màn hình."
              ]
            },
            {
              step: "2. Khám phá & Nhận diện âm chữ",
              time: "15 phút",
              target: "Nhận biết âm a, b; phân tích và đánh vần tiếng ba.",
              teacherActivities: [
                "- Chiếu tranh khám phá (SGK tr. 10): Cảnh gia đình bạn Nam có ba, mẹ, bà, bé và quả bóng.",
                "- Đặt câu hỏi: 'Trong tranh có những ai và có đồ vật gì?'",
                "- Rút ra từ khóa: 'ba', 'bà', 'bóng', 'hoa', 'quả na'.",
                "- Giới thiệu âm a và chữ A, a: Đọc mẫu 'a' (mở rộng miệng, hơi ra tự do).",
                "- Giới thiệu âm b và chữ B, b: Đọc mẫu 'bờ' (hai môi khép lại rồi bật hơi ra).",
                "- Hướng dẫn ghép tiếng 'ba': Âm 'b' đứng trước, âm 'a' đứng sau -> Đánh vần 'bờ - a - ba'."
              ],
              studentActivities: [
                "- Quan sát tranh và trả lời: 'Có ba, có bà, bạn Nam và quả bóng ạ.'",
                "- Luyện đọc cá nhân, nhóm đôi và đồng thanh âm: 'a', 'b'.",
                "- Sử dụng bảng gài: Lấy thẻ chữ 'b' gài trước, thẻ chữ 'a' gài sau tạo thành tiếng 'ba'.",
                "- Đánh vần to rõ ràng: 'bờ - a - ba / ba'."
              ]
            },
            {
              step: "3. Luyện tập & Viết bảng con",
              time: "12 phút",
              target: "Viết đúng chữ a, b và tiếng ba vào bảng con theo quy trình nét chuẩn.",
              teacherActivities: [
                "- Hướng dẫn viết chữ a: Gồm nét cong kín (cao 2 li, rộng 1.5 li) và nét móc ngược phải.",
                "- Hướng dẫn viết chữ b: Nét khuyết xuôi (cao 5 li) kết hợp nét thắt ở đường kẻ 3.",
                "- Hướng dẫn viết tiếng 'ba': Viết con chữ b trước, lia bút nối nét sang con chữ a.",
                "- Yêu cầu HS viết vào bảng con; đi kiểm tra, uốn nắn từng em."
              ],
              studentActivities: [
                "- Quan sát cô viết mẫu trên bảng lớp và đếm dòng kẻ ô li.",
                "- Dùng ngón tay trỏ viết chữ a, b trên không trung theo hiệu lệnh.",
                "- Nắn nót viết 2 chữ a, 2 chữ b và 1 tiếng 'ba' vào bảng con.",
                "- Giơ bảng theo hiệu lệnh; tự nhận xét bài viết của bạn bên cạnh."
              ]
            },
            {
              step: "4. Vận dụng / Củng cố",
              time: "3 phút",
              target: "Tìm tiếng chứa âm a, b trong đời sống xung quanh lớp học.",
              teacherActivities: [
                "- Tổ chức trò chơi: 'Tìm đồ vật có tên chứa âm a hoặc âm b trong lớp học'.",
                "- Nhận xét, tuyên dương các bạn tìm nhanh và đúng.",
                "- Dặn dò chuẩn bị sang Tiết 2."
              ],
              studentActivities: [
                "- Xung phong chỉ vào đồ vật: 'cái bàn', 'bảng lớp', 'bút chì', 'hoa lan'.",
                "- Lắng nghe cô dặn và cất bảng con gọn gàng."
              ]
            }
          ]
        };
      } else if (ppct === 2) {
        return {
          title: "Bài 1: A a, B b (Tiết 2) - Luyện đọc câu 'Bà có ba ba.', Viết Vở Tập viết 1",
          subSubject: "Luyện đọc & Tập viết",
          goals: {
            specificCompetencies: [
              "Đọc trôi chảy câu ứng dụng 'Bà có ba ba.' và hiểu nội dung câu.",
              "Viết đúng mẫu chữ a, b, tiếng ba, bà vào Vở Tập viết 1 trang 4.",
              "Phát triển kỹ năng nói theo chủ đề 'Chào hỏi lễ phép'."
            ],
            generalCompetencies: [
              "Tự chủ: Ngồi viết đúng tư thế, giữ gìn vở sạch chữ đẹp.",
              "Giao tiếp: Nói câu chào hỏi lễ phép rõ ràng, tự tin."
            ],
            qualities: [
              "Chăm chỉ: Hoàn thành 4 dòng chữ trong vở tập viết nắn nót.",
              "Nhân ái: Biết kính trọng, lễ phép với ông bà, cha mẹ."
            ],
            integration: "Tích hợp Kỹ năng sống (Chào hỏi lễ phép) & Quyền con người."
          },
          materials: {
            teacher: ["Tranh câu ứng dụng 'Bà có ba ba.'", "Vở Tập viết mẫu", "Slide bài giảng điện tử."],
            students: ["SGK Tiếng Việt 1", "Vở Tập viết 1", "Bút chì, tẩy."]
          },
          activities: [
            {
              step: "1. Khởi động",
              time: "5 phút",
              target: "Ôn lại âm a, b và tiếng ba đã học ở Tiết 1.",
              teacherActivities: [
                "- Giơ thẻ chữ: a, b, ba, bà, bá cho HS đọc nhanh.",
                "- Nhận xét, tuyên dương lớp."
              ],
              studentActivities: [
                "- Đọc to rõ ràng theo hiệu lệnh giơ thẻ của cô.",
                "- Cả lớp đồng thanh đọc lại 1 lần."
              ]
            },
            {
              step: "2. Khám phá & Luyện đọc câu ứng dụng",
              time: "12 phút",
              target: "Đọc đúng câu 'Bà có ba ba.' và tìm hiểu nghĩa của câu.",
              teacherActivities: [
                "- Chiếu tranh minh họa bà và cháu đang xem con ba ba.",
                "- Viết câu lên bảng: 'Bà có ba ba.'",
                "- Hỏi: 'Trong câu trên, những tiếng nào có âm b và âm a vừa học?'",
                "- Hướng dẫn đọc: Đọc mẫu, ngắt nghỉ sau dấu chấm.",
                "- Cho HS đọc nối tiếp cá nhân, theo bàn, cả lớp."
              ],
              studentActivities: [
                "- Quan sát tranh và đọc thầm câu ứng dụng.",
                "- Trả lời: 'Tiếng Bà và tiếng ba ạ.'",
                "- Luyện đọc cá nhân: 'Bà có ba ba.'",
                "- Đọc đồng thanh cả lớp 2 lần."
              ]
            },
            {
              step: "3. Luyện tập / Viết Vở Tập viết 1",
              time: "15 phút",
              target: "Viết đúng mẫu các dòng chữ a, b, ba, bà vào Vở Tập viết trang 4.",
              teacherActivities: [
                "- Nhắc tư thế ngồi viết: Lưng thẳng, đầu hơi cúi, mắt cách vở 25-30cm.",
                "- Hướng dẫn viết từng dòng: Dòng 1 (chữ a), Dòng 2 (chữ b), Dòng 3 (tiếng ba), Dòng 4 (tiếng bà - đặt dấu huyền trên a).",
                "- Bao quát lớp, cầm tay sửa nét cho những em còn yếu."
              ],
              studentActivities: [
                "- Ngồi đúng tư thế chuẩn bị viết bài.",
                "- Nắn nót viết từng dòng vào Vở Tập viết 1 trang 4 theo hướng dẫn.",
                "- Tự kiểm tra lại bài viết sạch đẹp."
              ]
            },
            {
              step: "4. Vận dụng / Luyện nói chủ đề Chào hỏi",
              time: "3 phút",
              target: "Thực hành kỹ năng chào hỏi lễ phép khi ở nhà và ở trường.",
              teacherActivities: [
                "- Chiếu tranh tình huống bạn nhỏ chào bố mẹ trước khi đi học.",
                "- Mời 2 HS đóng vai thực hành chào hỏi.",
                "- Nhận xét, dặn dò luôn lễ phép chào hỏi người lớn."
              ],
              studentActivities: [
                "- 2 HS lên bảng đóng vai: 'Con chào bố mẹ con đi học ạ!', 'Em chào cô giáo ạ!'",
                "- Cả lớp vỗ tay khen bạn tự tin."
              ]
            }
          ]
        };
      }
    }

    // Default rich Tiếng Việt for other grades
    if (grade === 5) {
      if (ppct === 1) {
        return {
          title: "Bài 1: THANH ÂM CỦA GIÓ (Tiết 1) - Đọc văn bản",
          subSubject: "Đọc hiểu",
          goals: {
            specificCompetencies: [
              "Đọc đúng, trôi chảy toàn bài 'Thanh âm của gió' (SGK Tiếng Việt 5 trang 10, 11); ngắt nghỉ đúng nhịp ở các câu văn dài.",
              "Đọc diễn cảm bài văn với giọng nhẹ nhàng, trong trẻo, giàu nhạc điệu.",
              "Hiểu nội dung: Ca ngợi vẻ đẹp phong phú của tiếng gió quê hương và tình yêu thiên nhiên sâu sắc của tuổi thơ."
            ],
            generalCompetencies: [
              "Tự chủ và tự học: Tự giác luyện đọc từ khó 'kẽo kẹt, ngút ngát, xào xạc, biếc xanh'.",
              "Giao tiếp và hợp tác: Thảo luận nhóm 4 trả lời 4 câu hỏi đọc hiểu SGK trang 11."
            ],
            qualities: [
              "Yêu nước: Yêu quý vẻ đẹp thiên nhiên quê hương Việt Nam bình dị.",
              "Chăm chỉ: Tích cực luyện đọc diễn cảm, ghi chép câu trả lời đầy đủ."
            ],
            integration: "Tích hợp Năng lực số (Sử dụng thiết bị số phát âm thanh thiên nhiên) & BVMT."
          },
          materials: {
            teacher: ["Bài giảng PowerPoint kèm file âm thanh tiếng gió rì rào qua rặng tre.", "SGK Tiếng Việt 5."],
            students: ["Sách giáo khoa Tiếng Việt 5 (Tập 1), vở ghi bài, bút viết."]
          },
          activities: [
            {
              step: "1. Khởi động",
              time: "5 phút",
              target: "Tạo tâm thế hào hứng và kết nối vào bài đọc 'Thanh âm của gió'.",
              teacherActivities: [
                "- Bật đoạn file âm thanh: Tiếng gió thổi rì rào qua rặng tre, tiếng sáo diều vi vu trên cánh đồng.",
                "- Hỏi: 'Em nghe thấy âm thanh gì và cảm xúc của em thế nào?'",
                "- Giới thiệu bài: 'Bài 1: Thanh âm của gió (SGK Tiếng Việt 5 trang 10)'."
              ],
              studentActivities: [
                "- Chú ý lắng nghe đoạn âm thanh thiên nhiên.",
                "- HS trả lời: 'Đó là tiếng gió rì rào và tiếng sáo diều vi vu ạ. Nghe rất êm ả và thanh bình.'",
                "- Mở SGK trang 10 và ghi tựa bài vào vở."
              ]
            },
            {
              step: "2. Khám phá & Luyện đọc đúng",
              time: "15 phút",
              target: "Luyện đọc đúng từ khó, ngắt nghỉ câu dài và đọc trôi chảy từng đoạn bài văn.",
              teacherActivities: [
                "- Đọc mẫu toàn bài: Giọng đọc nhẹ nhàng, trong trẻo, lắng đọng.",
                "- Chia đoạn: Đoạn 1 (Từ đầu đến '...khung cửa sổ phòng tôi.'), Đoạn 2 (Tiếp theo đến '...bay vào bầu trời biếc xanh.'), Đoạn 3 (Phần còn lại).",
                "- Hướng dẫn đọc từ khó: 'kẽo kẹt, xào xạc, ngút ngát, biếc xanh'.",
                "- Hướng dẫn ngắt nhịp câu dài: 'Gió mang theo hương lúa chín thơm nồng / từ cánh đồng xa / ùa vào căn phòng nhỏ, // đánh thức vạn vật sau một giấc ngủ dài. //'"
              ],
              studentActivities: [
                "- Lắng nghe thầy đọc mẫu và dùng bút chì đánh dấu 3 đoạn vào SGK.",
                "- Luyện đọc từ khó cá nhân và đồng thanh.",
                "- 3 HS đọc nối tiếp 3 đoạn lần 1 và lần 2 trước lớp.",
                "- 1 HS đọc to phần Chú giải từ ngữ trong SGK trang 11."
              ]
            },
            {
              step: "3. Luyện tập / Tìm hiểu bài & Đọc diễn cảm",
              time: "15 phút",
              target: "Trả lời chi tiết 4 câu hỏi đọc hiểu SGK trang 11 và thi đọc diễn cảm Đoạn 2.",
              teacherActivities: [
                "- Hướng dẫn thảo luận nhóm 4 trả lời 4 câu hỏi SGK:",
                "  + Câu 1: Tìm từ ngữ tả âm thanh của gió? -> ('rì rào, kẽo kẹt, xào xạc, vi vu, ngân nga').",
                "  + Câu 2: Tiếng gió được so sánh với những âm thanh nào? -> (Tiếng đàn, lời ru của mẹ, tiếng cười trẻ thơ).",
                "  + Câu 3: Tác giả cảm nhận được điều gì khi nghe tiếng gió? -> (Tâm hồn thư thái, yêu thiên nhiên quê hương).",
                "  + Câu 4: Nêu nội dung chính của bài văn?",
                "- Tổ chức thi đọc diễn cảm Đoạn 2 giữa các tổ."
              ],
              studentActivities: [
                "- Thảo luận nhóm 4 sôi nổi và ghi câu trả lời ra bảng phụ nhóm.",
                "- Đại diện nhóm phát biểu trả lời đầy đủ từng câu hỏi 1, 2, 3, 4.",
                "- Thi đọc diễn cảm Đoạn 2 với giọng tha thiết, lắng đọng.",
                "- Bình chọn bạn đọc diễn cảm hay nhất."
              ]
            },
            {
              step: "4. Vận dụng / Trải nghiệm",
              time: "3 phút",
              target: "Liên hệ tình cảm gắn bó với thiên nhiên và dặn dò chuẩn bị bài.",
              teacherActivities: [
                "- Hỏi liên hệ: 'Để quê hương luôn có làn gió mát lành, em cần làm gì để bảo vệ môi trường?'",
                "- Nhận xét tiết học, tuyên dương học sinh tích cực.",
                "- Dặn dò về nhà đọc lại bài cho người thân nghe."
              ],
              studentActivities: [
                "- Trả lời: 'Cần trồng cây xanh, không xả rác bừa bãi và giữ gìn môi trường trong lành ạ.'",
                "- Ghi nhớ lời thầy dặn và chuẩn bị cho tiết học sau."
              ]
            }
          ]
        };
      } else if (ppct === 2) {
        return {
          title: "Bài 1: TỪ ĐỒNG NGHĨA (Tiết 2) - Luyện từ và câu",
          subSubject: "Luyện từ và câu",
          goals: {
            specificCompetencies: [
              "Hiểu thế nào là từ đồng nghĩa (những từ có nghĩa giống nhau hoặc gần giống nhau).",
              "Phân biệt được từ đồng nghĩa hoàn toàn (không thay đổi sắc thái) và từ đồng nghĩa không hoàn toàn.",
              "Tìm được từ đồng nghĩa và biết đặt câu đúng ngữ cảnh với các bài tập 1, 2, 3 SGK Tiếng Việt 5 trang 14, 15."
            ],
            generalCompetencies: [
              "Tự chủ và tự học: Tự tra từ điển tìm các từ đồng nghĩa chỉ màu sắc, tính nết.",
              "Giao tiếp: Biết lựa chọn từ ngữ phù hợp khi viết câu văn miêu tả."
            ],
            qualities: [
              "Chăm chỉ: Tích cực hoàn thành bài tập vào vở thực hành.",
              "Trách nhiệm: Giữ gìn sự trong sáng của tiếng Việt."
            ],
            integration: "Tích hợp Năng lực số (Tra cứu từ đồng nghĩa trên từ điển điện tử)."
          },
          materials: {
            teacher: ["Bảng phụ kẻ sẵn bài tập 1, 2 SGK trang 14.", "Thẻ từ ghép cặp đồng nghĩa."],
            students: ["SGK Tiếng Việt 5, vở bài tập Tiếng Việt, bút chì."]
          },
          activities: [
            {
              step: "1. Khởi động",
              time: "5 phút",
              target: "Tạo không khí hào hứng và phát hiện các cặp từ có nghĩa giống nhau.",
              teacherActivities: [
                "- Tổ chức trò chơi 'Kết bạn': Ghép các cặp từ: 'mẹ - má', 'bố - ba', 'nước nhà - non sông', 'chăm chỉ - cần cù'.",
                "- Dẫn dắt vào bài mới: 'Bài 1: Từ đồng nghĩa (SGK trang 14)'."
              ],
              studentActivities: [
                "- HS xung phong lên bảng ghép nối các cặp từ chính xác.",
                "- Nhận xét các cặp từ có nghĩa giống nhau.",
                "- Ghi tên bài vào vở."
              ]
            },
            {
              step: "2. Khám phá kiến thức mới",
              time: "12 phút",
              target: "Rút ra định nghĩa từ đồng nghĩa và phân loại từ đồng nghĩa hoàn toàn và không hoàn toàn.",
              teacherActivities: [
                "- Cho HS đọc đoạn văn mẫu trong SGK trang 14.",
                "- So sánh nghĩa của các từ in đậm: 'nước nhà - non sông', 'hoàn cầu - thế giới'.",
                "- So sánh sự khác nhau giữa 'chết - hi sinh - mất' (sắc thái tình cảm).",
                "- Rút ra phần Ghi nhớ (SGK tr. 14): 'Từ đồng nghĩa là những từ có nghĩa giống nhau hoặc gần giống nhau...'"
              ],
              studentActivities: [
                "- Đọc to đoạn văn và phân tích nghĩa của từng từ.",
                "- Trả lời: 'Nước nhà và non sông có nghĩa hoàn toàn giống nhau ạ; chết và hi sinh khác nhau ở thái độ kính trọng.'",
                "- 3 HS đọc to phần Ghi nhớ; cả lớp đọc thầm ghi nhớ quy tắc."
              ]
            },
            {
              step: "3. Luyện tập / Thực hành",
              time: "15 phút",
              target: "Giải quyết chi tiết Bài 1, Bài 2, Bài 3 SGK Tiếng Việt 5 trang 15.",
              teacherActivities: [
                "- Bài 1 (tr. 15): Tìm từ đồng nghĩa chỉ màu đỏ (đỏ tươi, đỏ thắm, đỏ rực, đỏ chót, đỏ au).",
                "- Bài 2 (tr. 15): Đặt câu phân biệt từ 'chăm chỉ' và 'cần cù':",
                "  + Hướng dẫn HS đặt câu: 'Bạn Lan rất chăm chỉ học tập. / Bác nông dân cần cù cày bừa trên ruộng lúa.'",
                "- Bài 3 (tr. 15): Thay thế từ in đậm bằng từ đồng nghĩa phù hợp.",
                "- Đi bao quát lớp, chấm chữa bài cho 5-7 học sinh."
              ],
              studentActivities: [
                "- Làm Bài 1 vào bảng con: Viết 4 từ đồng nghĩa chỉ màu đỏ.",
                "- Làm Bài 2 vào vở: Đặt 2 câu văn hoàn chỉnh có chủ ngữ - vị ngữ rõ ràng.",
                "- 2 HS lên bảng viết câu của mình; cả lớp nhận xét, bổ sung.",
                "- Đổi vở kiểm tra chéo với bạn cùng bàn."
              ]
            },
            {
              step: "4. Vận dụng / Trải nghiệm",
              time: "3 phút",
              target: "Vận dụng từ đồng nghĩa vào viết câu văn tả phong cảnh quê hương.",
              teacherActivities: [
                "- Yêu cầu HS nói 1 câu tả cánh đồng quê em có sử dụng từ đồng nghĩa chỉ màu xanh (xanh biếc, xanh mướt, xanh ngắt).",
                "- Nhận xét tiết học, dặn dò về nhà tìm thêm 5 cặp từ đồng nghĩa."
              ],
              studentActivities: [
                "- HS nói câu: 'Cánh đồng lúa quê em trải dài một màu xanh mướt mát.'",
                "- Lắng nghe cô dặn và chuẩn bị bài Tập làm văn sau."
              ]
            }
          ]
        };
      }
    }
  }

  // 2. TOÁN
  if (normSubj.includes("toán") || normSubj.includes("math")) {
    if (grade === 1) {
      return {
        title: `Bài ${ppct}: Vị trí & Các số trong phạm vi 10 (Tiết ${ppct})`,
        subSubject: "Số học & Hình học",
        goals: {
          specificCompetencies: [
            "Nhận biết và đọc, viết đúng các chữ số và so sánh số lượng đồ vật trong phạm vi 10.",
            "Xác định đúng phương hướng không gian: trên - dưới, phải - trái, trước - sau.",
            "Thực hiện thành thạo các bài tập đếm số lượng và điền dấu >, <, = trong SGK Toán 1."
          ],
          generalCompetencies: [
            "Tư duy toán học: Phân tích số lượng, sắp xếp dãy số từ bé đến lớn.",
            "Giao tiếp toán học: Diễn đạt rõ ràng số lượng đồ vật bằng câu nói ngắn gọn."
          ],
          qualities: [
            "Chăm chỉ: Rèn thói quen đếm cẩn thận, viết chữ số đẹp ngay ngắn.",
            "Trách nhiệm: Giữ gìn que tính và khối lập phương trong bộ đồ dùng."
          ],
          integration: "Tích hợp Học thông qua chơi (Trò chơi 'Đố bạn có mấy quả táo') & STEM."
        },
        materials: {
          teacher: ["Bộ đồ dùng dạy Toán 1, mô hình que tính, các thẻ số từ 1 đến 10.", "Bài giảng PowerPoint."],
          students: ["SGK Toán 1 (Kết nối tri thức), vở bài tập Toán 1, que tính, khối lập phương."]
        },
        activities: [
          {
            step: "1. Khởi động",
            time: "5 phút",
            target: "Tạo không khí sôi nổi qua trò chơi đếm ngón tay và bài hát đếm số.",
            teacherActivities: [
              "- Tổ chức trò chơi 'Bàn tay xinh': Xòe 1 ngón, 2 ngón, 3 ngón tay đếm to theo nhịp.",
              "- Dẫn dắt vào bài học mới."
            ],
            studentActivities: [
              "- Xòe bàn tay và đếm to: 'Một, hai, ba, bốn, năm!'",
              "- Mở SGK trang bài học và chuẩn bị đồ dùng."
            ]
          },
          {
            step: "2. Khám phá kiến thức mới",
            time: "12 phút",
            target: "Hình thành khái niệm số lượng và cách viết chữ số qua mô hình trực quan.",
            teacherActivities: [
              "- Gắn các vật mẫu lên bảng: 1 quả táo, 2 bông hoa, 3 chú chim.",
              "- Hướng dẫn HS đếm số lượng từng nhóm đồ vật.",
              "- Giới thiệu chữ số mẫu và quy trình viết nét chữ số vào dòng kẻ ô li."
            ],
            studentActivities: [
              "- Đếm to số lượng đồ vật: 'Có 1 quả táo, có 2 bông hoa, có 3 chú chim ạ.'",
              "- Lấy các khối lập phương trong bộ đồ dùng xếp tương ứng với số lượng.",
              "- Dùng ngón tay viết số trên không trung theo hướng dẫn của cô."
            ]
          },
          {
            step: "3. Luyện tập / Thực hành",
            time: "15 phút",
            target: "Làm bài tập 1, 2, 3 SGK Toán 1: Đếm số lượng, nối thẻ số và viết số vào bảng con.",
            teacherActivities: [
              "- Bài 1 (SGK): Đếm số con vật trong tranh và nối với ô số thích hợp.",
              "- Bài 2 (SGK): Viết các chữ số vừa học vào bảng con.",
              "- Bài 3 (SGK): So sánh số lượng đồ vật (điền dấu >, <, =).",
              "- Đi quan sát từng bàn, cầm tay hướng dẫn học sinh viết đúng chiều con số."
            ],
            studentActivities: [
              "- Làm Bài 1: Đếm và nối tranh trong SGK bằng bút chì.",
              "- Làm Bài 2: Viết nắn nót 2 dòng chữ số vào bảng con và giơ bảng theo hiệu lệnh.",
              "- Làm Bài 3: Trả lời: '3 bé hơn 5 nên điền dấu < ạ.'",
              "- Đổi bạn cùng bàn kiểm tra chéo kết quả."
            ]
          },
          {
            step: "4. Vận dụng / Trải nghiệm",
            time: "3 phút",
            target: "Đếm số lượng đồ dùng học tập thực tế trong cặp sách của mình.",
            teacherActivities: [
              "- Yêu cầu HS mở hộp bút, đếm số chiếc bút chì mình có.",
              "- Nhận xét, tuyên dương lớp học chăm chỉ."
            ],
            studentActivities: [
              "- Đếm: 'Trong hộp bút em có 3 chiếc bút chì và 1 chiếc thước kẻ ạ.'",
              "- Cất gọn đồ dùng học tập ngăn nắp."
            ]
          }
        ]
      };
    }

    if (grade === 5) {
      return {
        title: ppct === 1
          ? "Bài 1: ÔN TẬP VỀ SỐ TỰ NHIÊN (Tiết 1) - Đọc, viết và cấu tạo hàng lớp"
          : (ppct === 2
            ? "Bài 2: ÔN TẬP VỀ PHÂN SỐ (Tiết 2) - Rút gọn và quy đồng mẫu số"
            : `Bài ${ppct}: Phân số thập phân & Ôn tập phép tính (Tiết ${ppct})`),
        subSubject: "Số học & Phép tính",
        goals: {
          specificCompetencies: [
            "Đọc, viết, phân tích cấu tạo số tự nhiên và phân số; nắm vững tính chất cơ bản của phân số.",
            "Thực hiện thành thạo rút gọn, quy đồng mẫu số và so sánh hai phân số khác mẫu số.",
            "Giải chính xác các bài toán có lời văn thực tế trong SGK Toán 5."
          ],
          generalCompetencies: [
            "Tư duy và lập luận toán học: Biết giải thích vì sao hai phân số bằng nhau hoặc cách tách lớp số tự nhiên.",
            "Giải quyết vấn đề toán học: Thiết lập sơ đồ tóm tắt và thực hiện các bước giải toán."
          ],
          qualities: [
            "Chăm chỉ: Tính toán cẩn thận, ghi rõ ràng các bước thực hiện.",
            "Trung thực: Tự giác làm bài tập độc lập."
          ],
          integration: "Tích hợp Năng lực số (Mô phỏng trục số và phân số trên phần mềm Geogebra)."
        },
        materials: {
          teacher: ["Bảng phụ ghi sẵn bảng hàng và lớp, bảng phân số tương đương.", "SGK Toán 5."],
          students: ["SGK Toán 5, vở bài tập Toán 5, bảng con, nháp, thước kẻ."]
        },
        activities: [
          {
            step: "1. Khởi động",
            time: "5 phút",
            target: "Tạo không khí sôi nổi và ôn lại các bảng nhân chia và hàng lớp số tự nhiên.",
            teacherActivities: [
              "- Tổ chức trò chơi 'Truyền điện': Đọc nhanh giá trị hàng của số 35 240 và 5 890 120.",
              "- Dẫn dắt vào bài mới."
            ],
            studentActivities: [
              "- HS nhanh tay tiếp nối: 'Chữ số 5 trong 35 240 có giá trị 5 000; chữ số 5 trong 5 890 120 có giá trị 5 000 000 ạ!'",
              "- Mở SGK trang bài học và ghi bài vào vở."
            ]
          },
          {
            step: "2. Khám phá kiến thức mới",
            time: "10 phút",
            target: "Hệ thống hóa quy tắc đọc viết số, cấu tạo phân số và tính chất phân số bằng nhau.",
            teacherActivities: [
              "- Chiếu bảng các lớp: Lớp đơn vị, Lớp nghìn, Lớp triệu.",
              "- Ôn lại tính chất: 'Khi nhân hoặc chia cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được một phân số bằng phân số đã cho.'",
              "- Cho ví dụ: Rút gọn phân số 15/25 = 3/5; Quy đồng mẫu số 3/4 và 2/5."
            ],
            studentActivities: [
              "- Nhắc lại các hàng trong lớp nghìn và lớp triệu.",
              "- Nêu quy tắc rút gọn phân số: Chia cả tử số và mẫu số cho ước chung lớn nhất.",
              "- 2 HS lên bảng tính rút gọn: 15/25 = (15:5)/(25:5) = 3/5; Quy đồng: 3/4 = 15/20; 2/5 = 8/20."
            ]
          },
          {
            step: "3. Luyện tập / Thực hành",
            time: "17 phút",
            target: "Giải chi tiết Bài 1, 2, 3, 4 trong SGK Toán 5.",
            teacherActivities: [
              "- Bài 1 (SGK tr. 6/8): Viết các số/phân số theo yêu cầu vào bảng con.",
              "- Bài 2 (SGK tr. 7/9): Viết số thành tổng các hàng: $73 054 = 70 000 + 3 000 + 50 + 4$.",
              "- Bài 3 (SGK tr. 7/9): Sắp xếp các số theo thứ tự từ bé đến lớn.",
              "- Bài 4 (SGK tr. 7/9): Giải toán có lời văn: 'Năm đầu trồng 12 500 cây keo, năm hai trồng gấp đôi năm đầu. Tính tổng số cây cả 2 năm?'",
              "- Đi bao quát, chấm chữa bài cho học sinh."
            ],
            studentActivities: [
              "- Làm Bài 1 vào bảng con và giơ bảng theo hiệu lệnh.",
              "- Làm Bài 2 và Bài 3 vào vở bài tập cá nhân.",
              "- Trình bày Bài 4 vào vở:",
              "  + 'Số cây năm thứ hai là: 12 500 x 2 = 25 000 (cây).'",
              "  + 'Cả hai năm trồng được: 12 500 + 25 000 = 37 500 (cây). Đáp số: 37 500 cây keo.'",
              "- Đổi chéo vở kiểm tra kết quả."
            ]
          },
          {
            step: "4. Vận dụng / Trải nghiệm",
            time: "3 phút",
            target: "Vận dụng tính toán số liệu thực tế cuộc sống.",
            teacherActivities: [
              "- Nêu bài toán thực tế: 'Một mảnh vườn hình chữ nhật có chiều dài 20m, chiều rộng bằng 3/4 chiều dài. Tính diện tích mảnh vườn?'",
              "- Nhận xét tiết học, dặn dò bài tập về nhà."
            ],
            studentActivities: [
              "- Nhẩm nhanh: Chiều rộng là 20 x 3/4 = 15m; Diện tích là 20 x 15 = 300 m2.",
              "- Lắng nghe thầy dặn dò và chuẩn bị cho tiết học sau."
            ]
          }
        ]
      };
    }
  }

  // 3. TIẾNG ANH (Specialist Teacher: Cô Hoàng Thị Nương)
  if (normSubj.includes("tiếng anh") || normSubj.includes("english") || hasSubjectToken(["ta"])) {
    return {
      title: grade <= 2
        ? `Unit 1: In the schoolyard - Lesson ${ppct} (Phonics & Vocabulary)`
        : (grade === 3
          ? `Unit 1: Hello - Lesson ${ppct} (Vocabulary & Sentence Patterns)`
          : (grade === 4
            ? `Unit 1: My Friends - Lesson ${ppct} (Countries & Nationalities)`
            : `Unit 1: What's your address? - Lesson ${ppct} (Address & Hometown)`)),
      subSubject: "Phonics, Vocabulary & Communication",
      goals: {
        specificCompetencies: [
          `Master target vocabulary for Grade ${grade} (e.g. hello, address, street, lane, hometown, friend).`,
          `Use sentence patterns fluently: "What's your address?" - "It's 105 Hoa Binh Lane.", "Where are you from?" - "I'm from Vietnam."`,
          `Develop 4 skills: Listening, Speaking, Reading, Writing with standard pronunciation and intonation.`
        ],
        generalCompetencies: [
          "Autonomy: Self-practice pronunciation with audio recordings and flashcards.",
          "Communication: Confidently role-play dialogues in pairs and small groups."
        ],
        qualities: [
          "Diligence: Active participation in classroom language games and chants.",
          "Responsibility: Complete workbook exercises accurately."
        ],
        integration: "Digital Competency (Digital audio player & interactive English quiz) & Learning Through Play."
      },
      materials: {
        teacher: ["English Textbook & Teacher's Guide", "Audio Track 1-4, Flashcards, PowerPoint slides", "Stickers for rewards."],
        students: ["English Student's Book, Activity Book, notebook, pen."]
      },
      activities: [
        {
          step: "1. Warm-up",
          time: "5 mins",
          target: "Engage students with an English song and review greetings.",
          teacherActivities: [
            "- Play the 'Hello Song' / 'Good morning song' (Track 1) and encourage students to sing along with actions.",
            "- Greet the class: 'Good morning, class! How are you today?'",
            "- Introduce the lesson: 'Today we learn Unit 1 - Lesson " + ppct + "'."
          ],
          studentActivities: [
            "- Sing the song enthusiastically and make greeting gestures.",
            "- Respond: 'Good morning, teacher! We are happy/fine, thank you!'",
            "- Open student's book to Unit 1."
          ]
        },
        {
          step: "2. Presentation & Vocabulary",
          time: "12 mins",
          target: "Introduce new vocabulary and target sentence structure.",
          teacherActivities: [
            "- Show flashcards and model pronunciation 3 times: 'street /stri:t/', 'lane /leɪn/', 'flat /flæt/', 'tower /ˈtaʊ.ər/'.",
            "- Present dialogue on slide: A: 'What's your address?' - B: 'It's 105 Hoa Binh Lane.'",
            "- Check comprehension: Point to pictures and ask concept questions."
          ],
          studentActivities: [
            "- Listen carefully and repeat in chorus, in groups, and individually.",
            "- Practice pointing to the words in the book.",
            "- Repeat the sentence pattern with natural intonation."
          ]
        },
        {
          step: "3. Practice & Pair Work",
          time: "15 mins",
          target: "Practice dialogue with partners and complete listening/writing tasks in the book.",
          teacherActivities: [
            "- Model pair work with one student in front of the class.",
            "- Ask students to work in pairs: Ask and answer about their address/friends.",
            "- Monitor the class and assist students with pronunciation errors.",
            "- Organize game 'Slap the board' or 'Pass the ball'."
          ],
          studentActivities: [
            "- Work in pairs: One asks 'What's your address?', the partner answers 'It's...'.",
            "- 3 pairs perform their dialogue in front of the class.",
            "- Complete Section 3 (Point and say) and Section 4 (Listen and tick) in the workbook."
          ]
        },
        {
          step: "4. Production & Wrap-up",
          time: "3 mins",
          target: "Consolidate learning and give homework instructions.",
          teacherActivities: [
            "- Ask 2 students to summarize what they learned today.",
            "- Praise good performance and award stickers.",
            "- Assign homework: Practice saying address and write new words in notebook."
          ],
          studentActivities: [
            "- Answer teacher's questions about target words.",
            "- Note down homework and say 'Goodbye, teacher!'."
          ]
        }
      ]
    };
  }

  // 4. TIN HỌC (Specialist Teacher: Thầy Đinh Trường Phương)
  if (normSubj.includes("tin học") || normSubj.includes("informatics") || hasSubjectToken(["th", "tcth"])) {
    return {
      title: grade === 3
        ? `Bài ${ppct}: Khám phá máy tính & Thao tác sử dụng chuột (Tiết ${ppct})`
        : (grade === 4
          ? `Bài ${ppct}: Hàng phím cơ sở & Tập gõ tiếng Việt với Unikey kiểu Telex (Tiết ${ppct})`
          : `Bài ${ppct}: Tìm kiếm thông tin an toàn trên Internet & Năng lực số (Tiết ${ppct})`),
      subSubject: "Thông tin và Công nghệ số",
      goals: {
        specificCompetencies: [
          `Nhận biết thành phần máy tính và thực hành thành thạo thao tác máy tính lớp ${grade}.`,
          grade === 4
            ? "Thực hành gõ 10 ngón trên hàng phím cơ sở (A, S, D, F, G, H, J, K, L, ;) và gõ tiếng Việt kiểu Telex (s, f, r, x, j, aa, aw, ee, oo, ow, uw, dd)."
            : "Sử dụng trình duyệt web tìm kiếm tư liệu học tập an toàn, tuân thủ an toàn số theo TT 02/2024 & CV 3456.",
          "Rèn luyện kỹ năng sử dụng chuột: nháy đơn, nháy đúp, nháy nút phải và kéo thả chuột."
        ],
        generalCompetencies: [
          "Tự chủ và tự học: Tự giác thực hành trên máy tính cá nhân đúng quy trình.",
          "Giải quyết vấn đề: Khắc phục lỗi gõ chữ và sắp xếp tệp tin gọn gàng."
        ],
        qualities: [
          "Trách nhiệm: Có ý thức bảo vệ thiết bị phòng máy tính, không tự ý cắm rút dây điện.",
          "Chăm chỉ: Kiên trì luyện tập gõ bàn phím đúng ngón."
        ],
        integration: "Tích hợp Năng lực số toàn diện (TT 02/2025/TT-BGDĐT & CV 3456/BGDĐT)."
      },
      materials: {
        teacher: ["Phòng máy tính kết nối mạng LAN, máy chiếu giáo viên, phần mềm quản lý phòng máy NetSupport/Veyon, phần mềm Unikey và Mario Teaches Typing."],
        students: ["Mỗi học sinh 1 máy tính, sách giáo khoa Tin học, vở ghi bài."]
      },
      activities: [
        {
          step: "1. Khởi động",
          time: "5 phút",
          target: "Ổn định vị trí ngồi trong phòng máy và nhắc lại quy tắc an toàn phòng máy.",
          teacherActivities: [
            "- Cho HS ổn định máy tính, bật màn hình.",
            "- Đố vui: 'Bộ phận nào của máy tính được ví như bộ não điều khiển mọi hoạt động?' -> (Thân máy / CPU).",
            "- Giới thiệu nội dung bài học thực hành hôm nay."
          ],
          studentActivities: [
            "- Ngồi đúng vị trí máy tính được phân công, kiểm tra chuột và bàn phím.",
            "- Trả lời đố vui: 'Thưa thầy là Thân máy (CPU) ạ!'",
            "- Mở SGK Tin học trang bài học."
          ]
        },
        {
          step: "2. Khám phá kiến thức & Hướng dẫn thao tác",
          time: "10 phút",
          target: "Nắm vững nguyên lý thao tác và quy tắc gõ phím / tìm kiếm thông tin an toàn.",
          teacherActivities: [
            "- Trình chiếu màn hình giáo viên lên toàn bộ máy con:",
            "  + Hướng dẫn đặt 10 ngón tay lên hàng phím cơ sở (2 ngón trỏ đặt lên phím có gai F và J).",
            "  + Hướng dẫn bảng mã Unicode và kiểu gõ Telex: gõ s (sắc), f (huyền), r (hỏi), x (ngã), j (nặng).",
            "- Làm mẫu thao tác mở phần mềm gõ văn bản Word và gõ câu mẫu: 'Trường Tiểu học Tân Thạnh mến yêu.'."
          ],
          studentActivities: [
            "- Quan sát thao tác mẫu của thầy giáo trên màn hình máy tính.",
            "- Đặt thử 10 ngón tay lên bàn phím đúng vị trí gai F và J.",
            "- Lắng nghe và ghi nhớ quy tắc gõ dấu thanh tiếng Việt kiểu Telex."
          ]
        },
        {
          step: "3. Luyện tập / Thực hành trên máy tính",
          time: "17 phút",
          target: "Học sinh trực tiếp thực hành trên máy tính theo bài tập SGK.",
          teacherActivities: [
            "- Giao nhiệm vụ thực hành:",
            "  + Nhiệm vụ 1: Khởi động phần mềm Unikey và Word.",
            "  + Nhiệm vụ 2: Gõ đoạn thơ 'Hạt gạo làng ta / Có vị phù sa / Của sông Kinh Thầy' đúng chính tả có dấu.",
            "  + Nhiệm vụ 3: Lưu bài tập vào thư mục cá nhân với tên 'BaiTap_Tuan1.docx'.",
            "- Đi quan sát từng máy, hướng dẫn và sửa lỗi đặt ngón tay cho từng học sinh."
          ],
          studentActivities: [
            "- Tự khởi động máy tính và mở ứng dụng theo hướng dẫn.",
            "- Tập trung gõ văn bản tiếng Việt đúng 10 ngón theo mẫu đoạn thơ.",
            "- Thực hiện thao tác lưu tệp tin (File -> Save) vào thư mục của mình.",
            "- Giơ tay báo cáo khi hoàn thành bài tập."
          ]
        },
        {
          step: "4. Vận dụng & Đánh giá",
          time: "3 phút",
          target: "Đánh giá sản phẩm thực hành và tắt máy tính đúng quy trình.",
          teacherActivities: [
            "- Chiếu bài làm xuất sắc của 2 bạn lên màn hình chung để cả lớp nhận xét.",
            "- Hướng dẫn quy trình tắt máy tính an toàn (Start -> Shut down).",
            "- Nhận xét tinh thần thực hành, xếp ghế ngay ngắn trước khi rời phòng máy."
          ],
          studentActivities: [
            "- Quan sát bài làm của bạn và vỗ tay chúc mừng.",
            "- Thực hiện lệnh Shut down tắt máy tính, xếp bàn phím và chuột gọn gàng.",
            "- Xếp ghế ngăn nắp và ra về theo hàng."
          ]
        }
      ]
    };
  }

  // 5. GIÁO DỤC THỂ CHẤT (Specialist Teacher: Cô Trương Hồng Nhàn)
  if (normSubj.includes("thể chất") || normSubj.includes("thể dục") || hasSubjectToken(["gdtc", "pe"])) {
    return {
      title: `Bài ${ppct}: Đội hình đội ngũ & Bài thể dục phát triển chung (Tiết ${ppct})`,
      subSubject: "Đội hình đội ngũ & Vận động cơ bản",
      goals: {
        specificCompetencies: [
          "Thực hiện thành thạo khẩu lệnh tập hợp hàng dọc, dóng hàng, điểm số từ 1 đến hết.",
          "Thực hiện chuẩn xác tư thế đứng Nghiêm, Nghỉ, Quay phải, Quay trái, Đằng sau quay.",
          "Tập đúng 4 động tác đầu của Bài thể dục phát triển chung: Vươn thở, Tay, Chân, Lườn."
        ],
        generalCompetencies: [
          "Tự giác rèn luyện thân thể, hình thành thói quen tập thể dục buổi sáng.",
          "Giao tiếp và phối hợp nhịp nhàng trong đội hình tập thể."
        ],
        qualities: [
          "Kỷ luật: Chấp hành nghiêm túc hiệu lệnh của giáo viên và cán sự lớp.",
          "Đoàn kết: Tích cực tham gia trò chơi vận động 'Mèo đuổi chuột' / 'Chạy tiếp sức'."
        ],
        integration: "Tích hợp Giáo dục Thể chất và Giáo dục Quốc phòng - An ninh (TT 08/2024)."
      },
      materials: {
        teacher: ["Sân tập sạch sẽ, an toàn; còi chỉ huy, cờ tiêu, bóng ném, đồng hồ bấm giây."],
        students: ["Trang phục thể thao gọn gàng, đi giày thể thao có quai hậu chắc chắn."]
      },
      activities: [
        {
          step: "1. Khởi động",
          time: "6 phút",
          target: "Làm nóng cơ thể, bôi trơn các khớp và tạo tâm lý hào hứng cho giờ học thể chất.",
          teacherActivities: [
            "- Thổi còi tập hợp lớp thành 3 hàng ngang.",
            "- Phổ biến nội dung, mục tiêu bài học.",
            "- Hướng dẫn khởi động các khớp: Cổ, vai, cánh tay, hông, đầu gối, cổ tay kết hợp cổ chân.",
            "- Chạy nhẹ nhàng 1 vòng quanh sân trường (khoảng 100m)."
          ],
          studentActivities: [
            "- Nhanh chóng tập hợp thành 3 hàng ngang theo hiệu lệnh còi.",
            "- Cán sự lớp điều khiển cả lớp xoay kỹ các khớp theo nhịp 2 lần 8 nhịp.",
            "- Chạy bước nhỏ nhẹ nhàng theo hàng quanh sân trường."
          ]
        },
        {
          step: "2. Khám phá & Ôn luyện Đội hình đội ngũ",
          time: "12 phút",
          target: "Thực hành chuẩn xác khẩu lệnh và động tác Nghiêm, Nghỉ, Quay phải, Quay trái.",
          teacherActivities: [
            "- Làm mẫu và hô khẩu lệnh:",
            "  + 'Nghiêm!': Thân người thẳng, ngực ưỡn, 2 gót chân chạm nhau hình chữ V.",
            "  + 'Nghỉ!': Trùng 1 chân, thân người thả lỏng tự nhiên.",
            "  + 'Quay bên phải - Quay!': Lấy gót chân phải làm trụ, mũi chân trái làm điểm tỳ quay 90 độ sang phải.",
            "  + 'Quay bên trái - Quay!': Lấy gót chân trái làm trụ quay 90 độ sang trái.",
            "- Cho từng tổ tập luyện luân phiên; đi sửa sai cho từng học sinh."
          ],
          studentActivities: [
            "- Quan sát cô giáo làm mẫu động tác.",
            "- Thực hiện đồng loạt theo khẩu lệnh chỉ huy của cô.",
            "- Từng tổ 1, 2, 3 luân phiên lên trình diễn động tác quay; các tổ còn lại quan sát nhận xét."
          ]
        },
        {
          step: "3. Luyện tập & Trò chơi vận động",
          time: "12 phút",
          target: "Tập 4 động tác bài thể dục và tham gia trò chơi vận động sôi nổi.",
          teacherActivities: [
            "- Hướng dẫn ôn 4 động tác thể dục: Vươn thở, Tay, Chân, Lườn (2 lần 8 nhịp).",
            "- Tổ chức trò chơi vận động 'Chạy tiếp sức ném bóng vào rổ': Chia 2 đội nam nữ thi đua.",
            "- Nhắc nhở quy tắc an toàn khi chạy và ném bóng."
          ],
          studentActivities: [
            "- Đứng so le tập 4 động tác thể dục nhịp nhàng, đều đặn theo nhịp đếm 1-2-3-4-5-6-7-8.",
            "- Tham gia trò chơi tiếp sức hào hứng, nhiệt tình cổ vũ đồng đội.",
            "- Chấp hành luật chơi nghiêm túc."
          ]
        },
        {
          step: "4. Hồi tĩnh & Kết thúc",
          time: "5 phút",
          target: "Thả lỏng cơ bắp, đưa cơ thể về trạng thái bình thường và nhận xét tiết học.",
          teacherActivities: [
            "- Hướng dẫn học sinh thực hiện các động tác thả lỏng: Cúi người thả lỏng hai tay, rũ chân, hít thở sâu.",
            "- Nhận xét, đánh giá tinh thần tập luyện của lớp.",
            "- Dặn dò HS thường xuyên tập thể dục buổi sáng tại nhà."
          ],
          studentActivities: [
            "- Thả lỏng toàn thân, hít thở sâu theo nhịp đếm nhẹ nhàng.",
            "- Lắng nghe cô nhận xét, đồng thanh hô 'Khỏe!' khi kết thúc giờ học."
          ]
        }
      ]
    };
  }

  // 6. MĨ THUẬT (Specialist Teacher: Cô Ngô Phạm Nhã Thy)
  if (normSubj.includes("mĩ thuật") || normSubj.includes("mỹ thuật") || normSubj.includes("art") || hasSubjectToken(["mt"])) {
    return {
      title: `Bài ${ppct}: Sắc màu em yêu & Bức tranh trường lớp mến yêu (Tiết ${ppct})`,
      subSubject: "Hội họa & Sáng tạo tạo hình",
      goals: {
        specificCompetencies: [
          "Nhận biết các màu cơ bản (đỏ, vàng, lam) và cách pha trộn tạo màu mới (cam, lục, tím); phân biệt hòa sắc nóng và lạnh.",
          "Vẽ được bức tranh phong cảnh trường học hoặc chân dung bạn bè với bố cục cân đối, màu sắc sinh động.",
          "Biết trưng bày và nêu cảm nhận về tác phẩm của mình và của bạn."
        ],
        generalCompetencies: [
          "Sáng tạo thẩm mĩ: Tự do lựa chọn màu sắc và đường nét thể hiện cảm xúc.",
          "Giao tiếp: Tự tin giới thiệu ý tưởng bức tranh trước lớp."
        ],
        qualities: [
          "Yêu cái đẹp: Biết giữ gìn vệ sinh góc vẽ, trân trọng sản phẩm mĩ thuật.",
          "Chăm chỉ: Kiên trì hoàn thành bài vẽ nắn nót."
        ],
        integration: "Tích hợp Giáo dục STEM (Pha màu quang học) & Giáo dục Môi trường."
      },
      materials: {
        teacher: ["Tranh mẫu phong cảnh trường học, bảng pha màu, màu sáp, giấy vẽ A4, bài giảng PowerPoint."],
        students: ["Vở thực hành Mĩ thuật / Giấy A4, bút chì, tẩy, hộp màu sáp / màu dạ."]
      },
      activities: [
        {
          step: "1. Khởi động & Quan sát",
          time: "5 phút",
          target: "Kích thích cảm xúc thị giác qua tranh ảnh màu sắc rực rỡ.",
          teacherActivities: [
            "- Chiếu video ngắn các bức tranh đoạt giải vẽ về trường học và thiên nhiên.",
            "- Hỏi: 'Em thích bức tranh nào nhất? Bức tranh đó sử dụng những màu sắc gì?'",
            "- Giới thiệu chủ đề bài vẽ hôm nay."
          ],
          studentActivities: [
            "- Hào hứng quan sát các tác phẩm nghệ thuật trên màn hình.",
            "- Nêu cảm nhận: 'Em thích bức tranh ngôi trường có mái ngói đỏ tươi và hàng cây xanh biếc ạ.'",
            "- Chuẩn bị giấy vẽ và hộp màu sáp."
          ]
        },
        {
          step: "2. Khám phá & Hướng dẫn cách vẽ",
          time: "10 phút",
          target: "Nắm vững các bước vẽ tranh: Phác hình chính, vẽ chi tiết phụ và tô màu hòa sắc.",
          teacherActivities: [
            "- Hướng dẫn 3 bước thực hiện:",
            "  + Bước 1: Phác mảng hình chính ở giữa trang giấy (ngôi trường, bạn học sinh).",
            "  + Bước 2: Vẽ thêm các chi tiết phụ (ông mặt trời, mây, cây xanh, cột cờ, hoa).",
            "  + Bước 3: Tô màu theo ý thích, kết hợp màu đậm màu nhạt tạo chiều sâu cho tranh.",
            "- Nhắc nhở: Không tô màu lem ra ngoài nét vẽ."
          ],
          studentActivities: [
            "- Lắng nghe cô hướng dẫn và quan sát các bước vẽ mẫu trên bảng.",
            "- Lên ý tưởng cho bức tranh của riêng mình."
          ]
        },
        {
          step: "3. Luyện tập / Sáng tạo cá nhân",
          time: "17 phút",
          target: "Học sinh thực hành vẽ tranh trên giấy A4 theo cảm nhận riêng.",
          teacherActivities: [
            "- Cho HS mở giấy vẽ thực hành.",
            "- Bật nhạc không lời êm dịu tạo cảm hứng sáng tạo.",
            "- Đi quanh lớp quan sát, gợi ý cách chọn màu cho những em còn lúng túng."
          ],
          studentActivities: [
            "- Tự giác phác nét chì và vẽ tranh theo ý tưởng cá nhân.",
            "- Phối màu sắc hài hòa: Màu mái ngói đỏ, tường vàng, sân trường xám, cây xanh lá...",
            "- Nắn nót tô màu kín các mảng hình."
          ]
        },
        {
          step: "4. Trưng bày & Cảm nhận",
          time: "3 phút",
          target: "Trưng bày 'Góc triển lãm nghệ thuật nhí' và chia sẻ cảm nghĩ.",
          teacherActivities: [
            "- Chọn 4-5 bài vẽ đẹp dán lên bảng lớp.",
            "- Mời các tác giả lên giới thiệu về bức tranh của mình.",
            "- Nhận xét, tuyên dương khả năng sáng tạo màu sắc của cả lớp."
          ],
          studentActivities: [
            "- Ngắm nhìn các tác phẩm của bạn và vỗ tay khen ngợi.",
            "- 2 HS tự tin giới thiệu: 'Đây là bức tranh em vẽ cổng trường Tân Thạnh vào buổi sáng có chim hót líu lo ạ.'",
            "- Dọn dẹp bút màu và rác vào thùng ngăn nắp."
          ]
        }
      ]
    };
  }

  // 7. ÂM NHẠC (Specialist Teacher: Cô Phan Thị Kim Cương)
  if (normSubj.includes("âm nhạc") || normSubj.includes("music") || hasSubjectToken(["an"])) {
    return {
      title: `Bài ${ppct}: Học hát bài "Quốc ca Việt Nam" / "Reo vang bình minh" (Tiết ${ppct})`,
      subSubject: "Học hát & Gõ đệm nhạc cụ",
      goals: {
        specificCompetencies: [
          "Hát đúng giai điệu, lời ca, cao độ và trường độ bài hát thiếu nhi theo chương trình GDPT 2018.",
          "Biết gõ đệm thanh phách, song loan và bộ gõ cơ thể (vỗ tay, búng tay) theo nhịp và phách.",
          "Thể hiện sắc thái tình cảm bài hát tươi vui, trong sáng, hào hùng."
        ],
        generalCompetencies: [
          "Cảm thụ âm nhạc: Cảm nhận được vẻ đẹp giai điệu và tính chất bài hát.",
          "Giao tiếp và hợp tác: Hát hòa giọng nhịp nhàng cùng bạn bè trong nhóm."
        ],
        qualities: [
          "Yêu nước: Tự hào khi hát Quốc ca Việt Nam trong lễ chào cờ.",
          "Chăm chỉ: Luyện thanh đúng kỹ thuật lấy hơi và mở khẩu hình."
        ],
        integration: "Tích hợp Giáo dục Văn hóa truyền thống & Học thông qua chơi."
      },
      materials: {
        teacher: ["Đàn organ / Piano, thanh phách, song loan, file nhạc beat bài hát chuẩn."],
        students: ["SGK Âm nhạc, thanh phách gỗ mini (nếu có)."]
      },
      activities: [
        {
          step: "1. Khởi động giọng",
          time: "5 phút",
          target: "Luyện thanh mở khẩu hình và khởi động cơ quan phát âm.",
          teacherActivities: [
            "- Đàn mẫu âm luyện thanh theo thang âm Đồ - Rê - Mi - Pha - Son.",
            "- Hướng dẫn HS luyện thanh với âm 'Ma - Me - Mi - Mo - Mu' kết hợp đứng thẳng lưng, lấy hơi sâu bằng bụng.",
            "- Giới thiệu bài hát và tác giả."
          ],
          studentActivities: [
            "- Đứng ngay ngắn, lấy hơi và luyện thanh theo tiếng đàn của cô.",
            "- Hát ngân dài âm vang, tròn vành rõ chữ."
          ]
        },
        {
          step: "2. Khám phá & Học hát từng câu",
          time: "15 phút",
          target: "Học hát chính xác từng câu theo lối móc xích.",
          teacherActivities: [
            "- Đàn và hát mẫu toàn bài hát 1 lần với sắc thái truyền cảm.",
            "- Đọc lời ca theo tiết tấu bài hát.",
            "- Dạy hát từng câu (mỗi câu đàn mẫu 2 lần rồi bắt nhịp cho HS hát lại):",
            "  + Câu 1: Hát chuẩn xác cao độ.",
            "  + Câu 2: Ghép nối câu 1 và câu 2.",
            "  + Hướng dẫn chỗ lấy hơi ở cuối mỗi câu hát."
          ],
          studentActivities: [
            "- Lắng nghe cô hát mẫu và chú ý lời ca.",
            "- Đọc lời ca đồng thanh theo nhịp vỗ tay.",
            "- Luyện hát từng câu theo tiếng đàn của cô; ghép hoàn chỉnh toàn bộ bài hát."
          ]
        },
        {
          step: "3. Luyện tập & Gõ đệm",
          time: "12 phút",
          target: "Thực hành hát kết hợp gõ đệm theo phách và theo nhịp.",
          teacherActivities: [
            "- Hướng dẫn gõ đệm thanh phách theo phách (gõ vào tiếng có trọng âm).",
            "- Chia lớp thành 2 nhóm: Nhóm 1 hát, Nhóm 2 gõ đệm thanh phách, sau đó đổi ngược lại.",
            "- Mời từng dãy bàn hoặc nhóm 4 em lên biểu diễn trước lớp."
          ],
          studentActivities: [
            "- Cầm thanh phách gõ nhịp nhàng theo tiết tấu lời ca.",
            "- Nhóm hát hòa giọng trong trẻo, nhóm gõ đệm chính xác nhịp.",
            "- Nhóm đại diện tự tin lên biểu diễn và nhún nhảy theo giai điệu."
          ]
        },
        {
          step: "4. Vận dụng / Củng cố",
          time: "3 phút",
          target: "Khắc sâu cảm xúc bài hát và dặn dò luyện tập.",
          teacherActivities: [
            "- Bắt nhịp cho cả lớp đứng dậy biểu diễn bài hát lần cuối kết hợp động tác phụ họa.",
            "- Nhận xét tiết học, khen ngợi giọng hát ngọt ngào của lớp.",
            "- Dặn dò về nhà hát tặng ông bà, cha mẹ."
          ],
          studentActivities: [
            "- Cả lớp đứng dậy hát vang bài hát với nụ cười rạng rỡ.",
            "- Ghi nhớ lời cô dặn và chuẩn bị cho tiết học sau."
          ]
        }
      ]
    };
  }

  // 8. TỰ NHIÊN VÀ XÃ HỘI / KHOA HỌC / LỊCH SỬ & ĐỊA LÍ
  if (normSubj.includes("tự nhiên") || normSubj.includes("tnxh") || normSubj.includes("khoa học") || normSubj.includes("ls&đl") || normSubj.includes("lịch sử")) {
    return {
      title: grade <= 3
        ? `Bài ${ppct}: Gia đình & Cơ thể người - Chăm sóc sức khỏe (Tiết ${ppct})`
        : (normSubj.includes("khoa học")
          ? `Bài ${ppct}: Tính chất của nước và vai trò đối với sự sống (Tiết ${ppct})`
          : `Bài ${ppct}: Vị trí địa lí, lãnh thổ và chủ quyền biển đảo Việt Nam (Tiết ${ppct})`),
      subSubject: "Thực hành quan sát & Trải nghiệm khoa học",
      goals: {
        specificCompetencies: [
          `Nắm vững kiến thức khoa học, lịch sử hoặc xã hội trọng tâm lớp ${grade}.`,
          "Biết quan sát tranh ảnh, lược đồ, hiện vật hoặc làm thí nghiệm đơn giản để rút ra kết luận khoa học.",
          "Vận dụng kiến thức bài học vào bảo vệ sức khỏe bản thân và giữ gìn môi trường sống."
        ],
        generalCompetencies: [
          "Tự chủ và khám phá: Tự giác tìm hiểu hiện tượng tự nhiên qua quan sát thực tế.",
          "Hợp tác nhóm: Phân công nhiệm vụ thảo luận và ghi chép phiếu học tập."
        ],
        qualities: [
          "Yêu thiên nhiên, đất nước: Tự hào về non sông gấm vóc Việt Nam.",
          "Trách nhiệm: Tiết kiệm nguồn nước sạch và giữ gìn vệ sinh trường lớp."
        ],
        integration: "Tích hợp Giáo dục Bảo vệ môi trường & Giáo dục Quyền con người."
      },
      materials: {
        teacher: ["Tranh ảnh phóng to SGK, bản đồ địa lí Việt Nam, dụng cụ thí nghiệm (cốc nước, thìa, muối, đường).", "Slide PowerPoint."],
        students: ["SGK, vở bài tập, bút màu, phiếu học tập nhóm."]
      },
      activities: [
        {
          step: "1. Khởi động",
          time: "5 phút",
          target: "Tạo hứng thú và kết nối vào chủ đề khoa học thực tiễn.",
          teacherActivities: [
            "- Nêu câu đố khoa học hoặc bật đoạn video ngắn về hiện tượng tự nhiên.",
            "- Hỏi: 'Hiện tượng đó có vai trò gì trong cuộc sống hàng ngày?'",
            "- Giới thiệu bài học mới."
          ],
          studentActivities: [
            "- Suy nghĩ và hào hứng giải câu đố.",
            "- Lắng nghe cô giới thiệu bài và mở SGK."
          ]
        },
        {
          step: "2. Khám phá & Thảo luận nhóm",
          time: "15 phút",
          target: "Tìm hiểu kiến thức qua quan sát hình ảnh và thực hành làm thí nghiệm.",
          teacherActivities: [
            "- Giao phiếu học tập cho các nhóm 4 học sinh:",
            "  + Yêu cầu quan sát tranh 1, 2, 3 trong SGK.",
            "  + Trả lời các câu hỏi về đặc điểm, vai trò và quy tắc bảo vệ an toàn.",
            "- Hướng dẫn thí nghiệm trực quan: Rót nước vào cốc tròn, cốc vuông để nhận xét hình dạng của nước.",
            "- Mời đại diện nhóm lên báo cáo kết quả."
          ],
          studentActivities: [
            "- Thảo luận nhóm sôi nổi, ghi câu trả lời vào phiếu học tập.",
            "- Quan sát thí nghiệm: Thấy nước không có hình dạng cố định mà có hình dạng của vật chứa.",
            "- Đại diện nhóm tự tin trình bày kết quả khám phá trước lớp."
          ]
        },
        {
          step: "3. Luyện tập / Xử lý tình huống",
          time: "12 phút",
          target: "Vận dụng kiến thức giải quyết các bài tập và tình huống thực tế.",
          teacherActivities: [
            "- Đưa ra 2 tình huống thực tế trong SGK:",
            "  + Tình huống 1: Bạn Nam quên khóa vòi nước sau khi rửa tay, em sẽ làm gì?",
            "  + Tình huống 2: Em cần làm gì để bảo vệ nguồn nước sinh hoạt không bị ô nhiễm?",
            "- Cho HS đóng vai xử lý tình huống."
          ],
          studentActivities: [
            "- Đóng vai giải quyết tình huống nhanh trí:",
            "  + 'Em sẽ đến nhắc bạn Nam khóa vòi nước lại để tránh lãng phí nước sạch ạ.'",
            "  + 'Không vứt rác, xác động vật xuống sông hồ, ao ngòi.'",
            "- Cả lớp nhận xét và biểu dương bạn ứng xử đúng."
          ]
        },
        {
          step: "4. Vận dụng / Thông điệp bài học",
          time: "3 phút",
          target: "Khắc sâu thông điệp bảo vệ môi trường sống hàng ngày.",
          teacherActivities: [
            "- Nhắc lại ghi nhớ cốt lõi của bài học.",
            "- Nhận xét, đánh giá tiết học; dặn dò về nhà chia sẻ với bố mẹ."
          ],
          studentActivities: [
            "- Nhắc lại thông điệp: 'Hãy chung tay giữ gìn nguồn nước sạch và môi trường xanh - sạch - đẹp!'",
            "- Ghi nhớ lời cô dặn."
          ]
        }
      ]
    };
  }

  // 9. ĐẠO ĐỨC
  if (normSubj.includes("đạo đức")) {
    return {
      title: `Bài ${ppct}: Biết ơn thầy cô giáo & Yêu quý, tôn trọng bạn bè (Tiết ${ppct})`,
      subSubject: "Chuẩn mực hành vi đạo đức",
      goals: {
        specificCompetencies: [
          "Nhận biết được những hành vi lễ phép với thầy cô, hòa đồng giúp đỡ bạn bè trong học tập và sinh hoạt.",
          "Biết bày tỏ lòng biết ơn bằng lời nói và việc làm cụ thể.",
          "Đồng tình với những hành vi chuẩn mực, không đồng tình với thói xấu bắt nạt, nói xấu bạn bè."
        ],
        generalCompetencies: [
          "Tự điều chỉnh hành vi bản thân theo chuẩn mực đạo đức xã hội.",
          "Giao tiếp và giải quyết xung đột nhỏ một cách văn minh, hòa nhã."
        ],
        qualities: [
          "Nhân ái: Biết yêu thương, chia sẻ, giúp đỡ bạn có hoàn cảnh khó khăn.",
          "Trung thực: Thật thà nhận lỗi khi mình làm sai và cố gắng sửa đổi."
        ],
        integration: "Tích hợp Giáo dục Quyền con người (Quyền được tôn trọng và bảo vệ khỏi bạo lực học đường)."
      },
      materials: {
        teacher: ["Tranh truyện đạo đức SGK, thẻ hoa khen thưởng Đỏ - Xanh.", "Slide PowerPoint."],
        students: ["SGK Đạo đức, vở bài tập Đạo đức, thẻ bày tỏ ý kiến."]
      },
      activities: [
        {
          step: "1. Khởi động",
          time: "5 phút",
          target: "Tạo không khí vui vẻ và kết nối vào chủ đề Đạo đức.",
          teacherActivities: [
            "- Bắt nhịp cho lớp hát bài 'Bông hồng tặng cô' / 'Lớp chúng mình rất rất vui'.",
            "- Hỏi: 'Bài hát khuyên chúng ta điều gì?' -> Dẫn dắt vào bài mới."
          ],
          studentActivities: [
            "- Cả lớp hát vang bài hát với tinh thần đoàn kết.",
            "- Trả lời: 'Khuyên chúng ta phải biết ơn cô giáo và yêu quý bạn bè ạ.'"
          ]
        },
        {
          step: "2. Khám phá qua câu chuyện đạo đức",
          time: "15 phút",
          target: "Phân tích hành vi đạo đức qua câu chuyện tranh SGK.",
          teacherActivities: [
            "- Chiếu tranh và kể câu chuyện 'Chiếc bút chì của bạn Minh': Nam lỡ tay làm gãy bút của Minh, Nam đã xin lỗi và chia sẻ chiếc bút của mình cho Minh mượn.",
            "- Đặt câu hỏi đàm thoại:",
            "  + 'Khi làm gãy bút bạn, Nam đã làm gì?'",
            "  + 'Em học tập được điều gì từ bạn Nam?'",
            "- Kết luận bài học chuẩn mực."
          ],
          studentActivities: [
            "- Lắng nghe câu chuyện với thái độ chăm chú.",
            "- Trả lời: 'Nam đã dũng cảm nhận lỗi, xin lỗi Minh và cho Minh mượn bút ạ.'",
            "- Rút ra bài học: Khi có lỗi phải biết dũng cảm nhận lỗi và sửa lỗi."
          ]
        },
        {
          step: "3. Luyện tập / Bày tỏ thái độ",
          time: "12 phút",
          target: "Học sinh sử dụng thẻ xanh (tán thành) - thẻ đỏ (không tán thành) đối với các hành vi.",
          teacherActivities: [
            "- Đưa ra 4 hành vi trong SGK:",
            "  + Hành vi 1: Khoanh tay chào thầy cô khi gặp ở sân trường.",
            "  + Hành vi 2: Cười đùa khi bạn đọc bài chưa trôi chảy.",
            "  + Hành vi 3: Nhường nhịn em nhỏ và giúp bạn khuyết tật.",
            "  + Hành vi 4: Trả lại của rơi cho người đánh mất.",
            "- Cho HS giơ thẻ bày tỏ quan điểm và giải thích vì sao."
          ],
          studentActivities: [
            "- Giơ thẻ Xanh tán thành hành vi 1, 3, 4; Giơ thẻ Đỏ phản đối hành vi 2.",
            "- Giải thích: 'Không được cười chê bạn mà cần động viên bạn cùng tiến bộ ạ.'"
          ]
        },
        {
          step: "4. Vận dụng / Thực hành",
          time: "3 phút",
          target: "Lập kế hoạch làm việc tốt trong tuần.",
          teacherActivities: [
            "- Khuyến khích HS mỗi ngày làm ít nhất 1 việc tốt giúp đỡ bạn bè và gia đình.",
            "- Nhận xét tiết học, tuyên dương tinh thần học tập của cả lớp."
          ],
          studentActivities: [
            "- Tự hứa sẽ chăm ngoan, lễ phép với thầy cô và luôn giúp đỡ bạn bè.",
            "- Ghi nhớ dặn dò."
          ]
        }
      ]
    };
  }

  // 10. HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN)
  if (normSubj.includes("trải nghiệm") || normSubj.includes("hoạt động tập thể") || hasSubjectToken(["hđtn", "hdtn", "hđtt", "hdtt"])) {
    const isSHDC = ppct === 1;
    const isSHL = ppct >= 3;
    return {
      title: isSHDC
        ? `Sinh hoạt dưới cờ: Lễ chào cờ trang nghiêm & Phát động thi đua Tuần ${week}`
        : (isSHL
          ? `Sinh hoạt lớp: Sơ kết tuần ${week} & Bình bầu Sao chăm ngoan - Phương hướng tuần tới`
          : `Hoạt động giáo dục theo chủ đề: Mái trường thân yêu & Tình bạn diệu kì (Tiết ${ppct})`),
      subSubject: isSHDC ? "Sinh hoạt dưới cờ" : (isSHL ? "Sinh hoạt lớp" : "Hoạt động chủ đề"),
      goals: {
        specificCompetencies: [
          "Nghiêm túc thực hiện nghi lễ chào cờ, hát Quốc ca, Đội ca hào hùng, đúng nghi thức Đội.",
          "Tham gia tích cực các hoạt động giáo dục theo chủ đề và chia sẻ kinh nghiệm học tập cùng bạn.",
          "Biết tự đánh giá và đánh giá hoạt động nề nếp của tổ trong tuần qua."
        ],
        generalCompetencies: [
          "Tự quản và tự giác: Tự quản lý nề nếp xếp hàng, giữ gìn vệ sinh chung.",
          "Giao tiếp và hợp tác: Tự tin phát biểu, đóng góp ý kiến xây dựng phong trào lớp."
        ],
        qualities: [
          "Yêu nước: Tự hào dưới lá cờ Tổ quốc Việt Nam thiêng liêng.",
          "Trách nhiệm: Hoàn thành tốt nhiệm vụ trực nhật và bảo vệ tài sản chung."
        ],
        integration: "Tích hợp Giáo dục Quốc phòng An ninh (Nghi thức Đội) & Kỹ năng sống."
      },
      materials: {
        teacher: ["Kế hoạch sinh hoạt tuần, sổ theo dõi thi đua lớp, loa mic, hoa điểm tốt."],
        students: ["Trang phục đồng phục khăn quàng đỏ chỉnh tề, sổ ghi chép nề nếp của tổ trưởng."]
      },
      activities: [
        {
          step: "1. Nghi lễ chào cờ / Khởi động",
          time: "7 phút",
          target: "Thực hiện nghi lễ chào cờ hoặc khởi động văn nghệ đầu giờ.",
          teacherActivities: [
            isSHDC
              ? "- Điều hành lễ chào cờ: Khẩu lệnh 'Nghiêm! Chào cờ - Chào! Quốc ca! Đội ca!'."
              : "- Cho lớp hát vang bài hát truyền thống và ổn định trật tự."
          ],
          studentActivities: [
            "- Đứng nghiêm trang, mắt hướng nhìn cờ đỏ sao vàng, tay giơ chào theo nghi thức Đội.",
            "- Hát vang Quốc ca và Đội ca hào hùng, dõng dạc."
          ]
        },
        {
          step: "2. Hoạt động trọng tâm theo chủ đề",
          time: "15 phút",
          target: "Triển khai hoạt động chủ đề / Báo cáo sơ kết thi đua tuần của các tổ.",
          teacherActivities: [
            isSHL
              ? "- Mời 4 tổ trưởng lần lượt lên báo cáo tình hình học tập, chuyên cần, nề nếp của tổ trong tuần."
              : "- Tổ chức giao lưu, chia sẻ tiểu phẩm về chủ đề 'Xây dựng tình bạn đẹp'."
          ],
          studentActivities: [
            isSHL
              ? "- 4 tổ trưởng đứng dậy đọc sổ theo dõi thi đua, nêu gương các bạn có nhiều điểm tốt và nhắc nhở bạn còn vi phạm."
              : "- HS tham gia đóng kịch tiểu phẩm và thảo luận sôi nổi."
          ]
        },
        {
          step: "3. Nhận xét & Bình bầu khen thưởng",
          time: "10 phút",
          target: "Giáo viên nhận xét tổng hợp và trao hoa điểm tốt cho học sinh tiêu biểu.",
          teacherActivities: [
            "- GV chủ nhiệm nhận xét chung tình hình lớp trong tuần:",
            "  + Ưu điểm: Đi học đúng giờ, đồng phục sạch sẽ, tích cực phát biểu.",
            "  + Hạn chế cần khắc phục: Giữ trật tự giờ truy bài, không vứt giấy rác ra lớp.",
            "- Tuyên dương và trao sticker hoa điểm 10 cho 5 bạn xuất sắc nhất tuần."
          ],
          studentActivities: [
            "- Lắng nghe cô nhận xét, tự soi chiếu bản thân.",
            "- Bình chọn bạn tiêu biểu của tuần và vỗ tay chúc mừng các bạn được khen thưởng."
          ]
        },
        {
          step: "4. Phương hướng tuần mới & Dặn dò",
          time: "3 phút",
          target: "Đề ra mục tiêu phấn đấu cho tuần học tiếp theo.",
          teacherActivities: [
            "- Phổ biến phương hướng tuần mới: 'Tiếp tục duy trì nề nếp, thi đua giành nhiều hoa điểm 10'.",
            "- Dặn dò các tổ phân công trực nhật chu đáo."
          ],
          studentActivities: [
            "- Ghi nhớ phương hướng và đồng thanh hô vang khẩu hiệu quyết tâm thi đua."
          ]
        }
      ]
    };
  }

  // 11. CÔNG NGHỆ (CN)
  return {
    title: `Bài ${ppct}: Sử dụng an toàn đồ dùng điện & Công nghệ trong đời sống (Tiết ${ppct})`,
    subSubject: "Công nghệ và Đời sống",
    goals: {
      specificCompetencies: [
        "Nhận biết được cấu tạo và công dụng của đồ dùng điện trong gia đình (quạt điện, đèn học, nồi cơm điện).",
        "Thực hiện đúng các bước thao tác sử dụng và tuân thủ các quy tắc an toàn phòng chống điện giật.",
        "Biết cách tiết kiệm điện năng trong sinh hoạt hàng ngày."
      ],
      generalCompetencies: [
        "Thực hành công nghệ: Biết bật, tắt và điều chỉnh tốc độ quạt điện đúng cách.",
        "Giao tiếp: Biết chia sẻ các mẹo tiết kiệm điện với người thân trong gia đình."
      ],
      qualities: [
        "Cẩn thận: Luôn chú ý an toàn khi tiếp xúc với thiết bị điện.",
        "Tiết kiệm: Tắt đèn, tắt quạt khi rời khỏi phòng học."
      ],
      integration: "Tích hợp Giáo dục Tiết kiệm năng lượng & An toàn cuộc sống."
    },
    materials: {
      teacher: ["Mô hình quạt điện để bàn, đèn học LED, tranh ảnh hướng dẫn an toàn điện, bài giảng PowerPoint."],
      students: ["SGK Công nghệ, vở bài tập Công nghệ."]
    },
    activities: [
      {
        step: "1. Khởi động",
        time: "5 phút",
        target: "Khởi động với câu đố về đồ dùng điện trong gia đình.",
        teacherActivities: [
          "- Đố vui: 'Bốn mùa đứng ở góc nhà / Xòe tay đón gió, quạt xua cái nồng?' -> (Cái quạt điện).",
          "- Giới thiệu bài học mới."
        ],
        studentActivities: [
          "- Hào hứng giải câu đố: 'Là cái quạt điện ạ!'",
          "- Mở SGK Công nghệ trang bài học."
        ]
      },
      {
        step: "2. Khám phá cấu tạo & Quy tắc an toàn",
        time: "15 phút",
        target: "Nhận biết các bộ phận chính của quạt điện và quy tắc an toàn điện.",
        teacherActivities: [
          "- Chỉ vào mô hình quạt điện thực tế và giới thiệu:",
          "  + Các bộ phận: Lồng quạt, cánh quạt, thân quạt, đế quạt, các nút bấm số 1-2-3, nút túp-năng chuyển hướng.",
          "- Đặt câu hỏi: 'Để đảm bảo an toàn, khi sử dụng quạt điện chúng ta cần lưu ý điều gì?'",
          "- Rút ra quy tắc an toàn: Không chạm tay ướt vào phích điện, không thò tay vào lồng quạt khi đang quay."
        ],
        studentActivities: [
          "- Quan sát mô hình quạt và chỉ tên từng bộ phận.",
          "- Trả lời: 'Không được thò tay vào cánh quạt, không giật dây điện ạ!'",
          "- Đọc to các quy tắc an toàn trong SGK."
        ]
      },
      {
        step: "3. Luyện tập / Thực hành thao tác",
        time: "12 phút",
        target: "Thực hành quy trình bật, chỉnh tốc độ gió và tắt quạt điện.",
        teacherActivities: [
          "- Hướng dẫn quy trình 4 bước sử dụng quạt điện đúng chuẩn.",
          "- Mời 2-3 HS lên thực hành thao tác trên mô hình quạt mẫu.",
          "- Cho cả lớp làm bài tập trắc nghiệm trong vở bài tập."
        ],
        studentActivities: [
          "- Lên bảng thực hành cắm phích cắm (khi tay khô), bấm nút số 1, chỉnh túp-năng và bấm nút tắt.",
          "- Làm bài tập trong vở bài tập Công nghệ."
        ]
      },
      {
        step: "4. Vận dụng & Ghi nhớ",
        time: "3 phút",
        target: "Liên hệ thói quen tiết kiệm điện tại trường và ở nhà.",
        teacherActivities: [
          "- Nhắc nhở: 'Khi ra khỏi lớp học, chúng ta phải làm gì?' -> (Tắt quạt và đèn).",
          "- Nhận xét tiết học, tuyên dương tinh thần học tập của lớp."
        ],
        studentActivities: [
          "- Trả lời: 'Tắt hết đèn quạt trước khi ra về để tiết kiệm điện ạ!'",
          "- Ghi nhớ dặn dò."
        ]
      }
    ]
  };
}
