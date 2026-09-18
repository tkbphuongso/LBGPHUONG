import { GradeNumber, DayOfWeek, LBGItem, KHBDLessonPlan, IntegrationReference } from "../types";
import { getConcreteLessonContent } from "./concreteLessonPlans";
import { getDateForDay } from "../utils/dateHelper";

export interface IntegrationCategoryGroup {
  id: string;
  name: string;
  icon: string;
  description: string;
  items: string[];
}

export const INTEGRATION_CATEGORIES: IntegrationCategoryGroup[] = [
  {
    id: "nls",
    name: "Năng Lực Số (Thông tư 02/2024 & CV 3456/BGDĐT)",
    icon: "💻",
    description: "Khung năng lực số dành cho học sinh tiểu học theo chuẩn Bộ GD&ĐT: Khai thác thông tin, an toàn số, tạo nội dung số, giao tiếp số.",
    items: [
      "NLS 1.1.CB1a: Tìm kiếm và trích xuất thông tin, dữ liệu số từ các nguồn giáo dục an toàn do giáo viên chỉ định.",
      "NLS 1.2.CB1a: Đánh giá độ tin cậy cơ bản của dữ liệu và thông tin số, không tin theo tin giả trên mạng.",
      "NLS 2.1.CB1a: Tương tác và trao đổi lịch sự thông qua các công nghệ số cơ bản.",
      "NLS 2.3.CB1a: Tham gia công dân qua công nghệ số: Chia sẻ thông tin hữu ích về học tập và bảo vệ môi trường.",
      "NLS 3.1.CB1a: Phát triển và biên tập nội dung số (gõ văn bản, vẽ tranh trên máy tính, chụp ảnh tư liệu bài học).",
      "NLS 4.1.CB1a: Bảo vệ thiết bị và dữ liệu cá nhân: Giữ bí mật mật khẩu, không bấm vào đường link lạ.",
      "NLS 4.2.CB1a: Bảo vệ sức khỏe thể chất khi dùng thiết bị số: Ngồi đúng tư thế, giữ khoảng cách mắt với màn hình 40-50cm.",
      "NLS 5.2.CB1a: Nhận biết nhu cầu và giải pháp công nghệ: Ứng dụng công nghệ số giải bài toán và thực hiện dự án học tập."
    ]
  },
  {
    id: "ai",
    name: "Trí Tuệ Nhân Tạo (AI - Khung Thí Điểm Bộ GD&ĐT)",
    icon: "🤖",
    description: "Khung nội dung giáo dục Trí tuệ nhân tạo (AI) cấp Tiểu học: Hiểu biết về AI, đạo đức công dân số khi sử dụng AI.",
    items: [
      "AI 1.A1.1: Nhận biết con người có cảm xúc thật; AI hoặc robot chỉ mô phỏng lời nói, biểu cảm theo dữ liệu thiết kế.",
      "AI 2.A2.1: Nhận biết một số thiết bị thông minh (robot hút bụi, loa thông minh) hỗ trợ tiện nghi; không ỷ lại máy móc.",
      "AI 2.D1.1: Nêu được một số vấn đề đơn giản trong đời sống có thể áp dụng AI để giải quyết (camera đếm xe, gợi ý phép tính).",
      "AI 3.B1.1: Hiểu AI hoạt động dựa trên việc học từ dữ liệu số lượng lớn do con người cung cấp.",
      "AI 4.A1.2: Sử dụng AI tạo sinh (ChatGPT/Gemini) để gợi ý ý tưởng, dàn bài; luôn kiểm chứng thông tin và tự viết bằng lời của mình.",
      "AI 5.A1.1: Trách nhiệm công dân số khi dùng AI: Tôn trọng bản quyền tác giả, tính minh bạch và bảo mật thông tin cá nhân."
    ]
  },
  {
    id: "qcn",
    name: "Giáo Dục Quyền Con Người (QCN trong GDTH)",
    icon: "🕊️",
    description: "Tích hợp giáo dục quyền và bổn phận của trẻ em, tôn trọng sự khác biệt, chống bạo lực học đường và phân biệt đối xử.",
    items: [
      "QCN 1: Quyền được học tập, phát triển toàn diện và vui chơi trong môi trường an toàn, bình đẳng.",
      "QCN 2: Tôn trọng sự khác biệt về ngoại hình, hoàn cảnh gia đình, vùng miền của bạn bè trong lớp.",
      "QCN 3: Quyền được bày tỏ ý kiến cá nhân và lắng nghe ý kiến của người khác với thái độ tôn trọng.",
      "QCN 4: Quyền được bảo vệ thân thể, phòng chống xâm hại và bạo lực học đường.",
      "QCN 5: Trách nhiệm và bổn phận của học sinh: Kính trọng thầy cô, yêu thương và giúp đỡ bạn bè."
    ]
  },
  {
    id: "qpan",
    name: "Giáo Dục Quốc Phòng & An Ninh (Thông tư 08/2024/TT-BGDĐT)",
    icon: "⭐",
    description: "Tích hợp lồng ghép GD QPAN vào môn Tiếng Việt, Lịch sử & Địa lí, Đạo đức, HĐTN cấp tiểu học.",
    items: [
      "QPAN 1: Tình yêu quê hương, đất nước, niềm tự hào về truyền thống vẻ vang của Quân đội Nhân dân Việt Nam.",
      "QPAN 2: Tôn trọng và bảo vệ các biểu tượng quốc gia: Quốc kì, Quốc huy, Quốc ca, cờ Đảng.",
      "QPAN 3: Nhận thức về chủ quyền biên giới, biển đảo thiêng liêng của Tổ quốc (Hoàng Sa, Trường Sa).",
      "QPAN 4: Gương dũng cảm của các anh hùng dân tộc, thương binh, liệt sĩ và những người có công với nước.",
      "QPAN 5: Ý thức giữ gìn an ninh trật tự trường học, nơi công cộng và bảo vệ an toàn trên không gian mạng."
    ]
  },
  {
    id: "stem",
    name: "Giáo Dục STEM / STEAM & Trải Nghiệm",
    icon: "🔬",
    description: "Tích hợp Khoa học, Công nghệ, Kĩ thuật và Toán học giải quyết các tình huống thực tiễn.",
    items: [
      "STEM 1: Ứng dụng kiến thức Toán và Khoa học để thiết kế mô hình dụng cụ học tập đơn giản.",
      "STEM 2: Rèn luyện tư duy logic, kỹ năng thiết kế, thử nghiệm và cải tiến sản phẩm.",
      "STEM 3: Hợp tác nhóm thực hiện dự án chế tạo từ vật liệu tái chế, thân thiện môi trường."
    ]
  },
  {
    id: "htqc",
    name: "Học Thông Qua Chơi (Learning Through Play)",
    icon: "🎯",
    description: "Phương pháp dạy học tạo hứng thú, khuyến khích sự tò mò và gắn kết thông qua trò chơi giáo dục.",
    items: [
      "HTQC 1: Trò chơi 'Khởi động vui vẻ' tạo không khí học tập tích cực, hào hứng đầu tiết học.",
      "HTQC 2: Hoạt động chơi 'Ai gài số nhanh / Đố bạn' củng cố và vận dụng kiến thức linh hoạt.",
      "HTQC 3: Trò chơi đóng vai, xử lý tình huống thực tế để phát triển kỹ năng mềm."
    ]
  },
  {
    id: "bvmt",
    name: "Bảo Vệ Môi Trường & Biến Đổi Khí Hậu",
    icon: "🌱",
    description: "Hình thành ý thức bảo vệ cây xanh, giữ gìn vệ sinh trường lớp, tiết kiệm điện nước.",
    items: [
      "BVMT 1: Giữ gìn vệ sinh lớp học, không vứt rác bừa bãi, phân loại rác thải tại nguồn.",
      "BVMT 2: Tiết kiệm điện, nước trong sinh hoạt gia đình và ở trường học.",
      "BVMT 3: Chăm sóc cây xanh, hoa cảnh xung quanh trường và nơi ở."
    ]
  },
  {
    id: "kns",
    name: "Kỹ Năng Sống & Giá Trị Sống",
    icon: "🤝",
    description: "Kỹ năng tự phục vụ, kỹ năng giao tiếp ứng xử, quản lý cảm xúc và phòng chống tai nạn thương tích.",
    items: [
      "KNS 1: Kỹ năng tự chuẩn bị sách vở, đồ dùng học tập trước khi đến lớp.",
      "KNS 2: Kỹ năng lắng nghe tích cực và hợp tác hiệu quả trong làm việc nhóm.",
      "KNS 3: Kỹ năng phòng tránh tai nạn đuối nước, an toàn giao thông và tự bảo vệ bản thân."
    ]
  }
];

export const SAMPLE_INTEGRATION_REFERENCES: IntegrationReference[] = [
  {
    category: "AI",
    name: "Tích hợp AI - YCCĐ 1.A1.1 / 2.A1.1",
    grade: 1,
    code: "1.A1.1",
    subject: "Tiếng Việt / HĐTN",
    content: "HS nhận biết con người có cảm xúc thật; AI hoặc robot chỉ mô phỏng lời nói, biểu cảm theo dữ liệu do con người thiết kế.",
    suggestedActivity: "GV đưa một câu gợi ý đơn giản do AI tạo; HS nhận xét và sửa thành câu nói bằng cảm xúc chân thật của chính mình."
  },
  {
    category: "NLS",
    name: "Tích hợp NLS 1.1.CB1a",
    grade: 5,
    code: "1.1.CB1a",
    subject: "Tiếng Việt / Đọc",
    content: "Xác định thông tin cần tìm, lựa chọn và tìm kiếm thông tin an toàn trên website giáo dục do GV hướng dẫn.",
    suggestedActivity: "HS tìm đọc tư liệu về tiếng gió và thiên nhiên trên thư viện số, ghi chép nhanh thông tin vào Phiếu đọc sách."
  }
];

export const DETAILED_LESSON_PLANS: KHBDLessonPlan[] = [
  // ========================== KHỐI 1 - TUẦN 1 (Lớp 1A - Cô Phan Nguyễn Thị Kiều Phương) ==========================
  {
    id: "khbd-1-w1-tv-t1",
    grade: 1,
    className: "1A",
    teacherName: "Cô Phan Nguyễn Thị Kiều Phương",
    schoolName: "Trường Tiểu Học Tân Thạnh",
    branchName: "Xã Tân Thạnh",
    week: 1,
    day: 2,
    dayName: "Thứ Hai",
    period: 2,
    overallPeriodOfDay: 2,
    session: "Sáng",
    subject: "Tiếng Việt",
    subSubject: "Âm / Chữ",
    ppct: 1,
    title: "Bài 1: A a, B b (Tiết 1)",
    dateStr: "08/09/2025",
    goals: {
      specificCompetencies: [
        "Nhận biết và phát âm đúng âm a, âm b; nhận diện chữ a, b in hoa và in thường.",
        "Đọc đúng tiếng, từ ngữ ứng dụng: ba, bà, bá, bả, bã, bạ.",
        "Viết đúng chữ a, chữ b cỡ vừa trên bảng con và vở Tập viết 1 (độ cao con chữ a: 2 li; chữ b: 5 li; tiếng ba)."
      ],
      generalCompetencies: [
        "Tự chủ và tự học: Tự giác ngồi đúng tư thế, chuẩn bị bảng con, phấn, khăn lau sạch sẽ.",
        "Giao tiếp và hợp tác: Biết lắng nghe cô giáo phát âm mẫu, đọc to rõ ràng cùng bạn trong nhóm đôi."
      ],
      qualities: [
        "Chăm chỉ: Yêu thích học tiếng Việt, hào hứng luyện đọc, luyện viết nắn nót.",
        "Trách nhiệm: Giữ gìn vở sạch chữ đẹp, bảo quản đồ dùng học tập cẩn thận."
      ],
      integration: "Tích hợp Học thông qua chơi (Trò chơi 'Truy tìm chữ cái bí mật') & Năng lực số (Quan sát hình chiếu chữ a, b trên bảng tương tác)."
    },
    materials: {
      teacher: [
        "Bộ đồ dùng dạy học Tiếng Việt 1 (Bộ chữ gài, bảng cài biểu diễn)",
        "Thẻ chữ cái in hoa A, B và chữ in thường a, b; thẻ từ: ba, bà, bá",
        "Tranh minh họa bài học SGK trang 10 (cảnh gia đình sum họp, đĩa quả na, con ba ba)",
        "Bài giảng điện tử PowerPoint sinh động"
      ],
      students: [
        "Sách giáo khoa Tiếng Việt 1 (Tập 1 - Bộ Kết nối tri thức với cuộc sống)",
        "Bảng con, phấn trắng, khăn lau bảng",
        "Bộ đồ dùng học thực hành Tiếng Việt 1 của học sinh",
        "Vở Tập viết 1 (Tập 1)"
      ]
    },
    activities: [
      {
        step: "1. Khởi động",
        time: "5 phút",
        target: "Tạo tâm thế vui vẻ, hứng khởi làm quen với chữ cái Tiếng Việt đầu tiên.",
        teacherActivities: [
          "- Cho cả lớp hát và vận động theo bài hát 'A con cá sấu, B con bò tót'.",
          "- Chiếu bức tranh khởi động (SGK tr. 10): Cảnh gia đình bạn Nam đang sum họp, trên bàn có đĩa quả na, dưới ao có con ba ba.",
          "- Hỏi gợi mở: 'Trong tranh có những ai? Bạn Nam đang làm gì? Trên đĩa có quả gì?'",
          "- Nhận xét câu trả lời của HS và dẫn dắt: 'Trong tiếng ba, na, ba ba đều có âm a và âm b. Hôm nay cô cùng các em học Bài 1: A a, B b'."
        ],
        studentActivities: [
          "- Cả lớp hát và vỗ tay theo nhịp bài hát cùng cô Kiều Phương.",
          "- Quan sát tranh trên màn hình và trả lời: 'Trong tranh có ba, mẹ và bạn Nam. Bạn Nam đang chào ba mẹ. Trên đĩa có quả na. Dưới ao có con ba ba.'",
          "- Lắng nghe cô giới thiệu bài, nhắc lại tên bài: 'Bài 1: A a, B b'."
        ]
      },
      {
        step: "2. Khám phá kiến thức mới",
        time: "12-15 phút",
        target: "Nhận biết âm a, b; nhận diện mặt chữ a, b và phát âm chuẩn xác; nhận biết mô hình tiếng ba.",
        teacherActivities: [
          "a) Khám phá âm và chữ A a:",
          "- Gắn thẻ chữ A (in hoa) và chữ a (in thường) lên bảng lớp.",
          "- Phát âm mẫu âm a: Miệng mở rộng tự nhiên, luồng hơi thoát ra tự do, ngân dài: 'a - a - a'.",
          "- Yêu cầu HS phát âm: Cá nhân (từng em bàn 1, 2), nhóm đôi, cả lớp.",
          "- Chiếu hình ảnh quả na, con gà, bông hoa. Hỏi: 'Trong các tiếng na, gà, hoa có âm gì chung?' -> Âm a.",
          "b) Khám phá âm và chữ B b:",
          "- Gắn thẻ chữ B (in hoa) và chữ b (in thường) lên bảng lớp.",
          "- Phát âm mẫu âm b: Hai môi khép nhẹ rồi mở ra đẩy luồng hơi nhẹ: 'bờ - bờ - bờ'.",
          "- Yêu cầu HS phát âm: Cá nhân, tổ, cả lớp.",
          "c) Đọc tiếng và mô hình tiếng 'ba':",
          "- Hướng dẫn ghép tiếng: Chữ b đứng trước, chữ a đứng sau -> tạo thành tiếng ba.",
          "- Đánh vần mẫu: 'bờ - a - ba' -> đọc trơn: 'ba'."
        ],
        studentActivities: [
          "- Quan sát khẩu hình miệng của cô giáo; phát âm âm a: 'a - a - a' (Cá nhân, nhóm, cả lớp).",
          "- Trả lời: 'Các tiếng na, gà, hoa đều có âm a.'",
          "- Lắng nghe cô phát âm mẫu âm b; phát âm: 'bờ - bờ - bờ' (Đồng thanh theo tổ và cá nhân).",
          "- Thao tác bảng gài: Lấy thẻ chữ b gài bên trái, thẻ chữ a gài bên phải để tạo thành tiếng 'ba'.",
          "- Đánh vần to: 'bờ - a - ba', đọc trơn: 'ba' (Dãy bàn 1, dãy bàn 2, cả lớp)."
        ]
      },
      {
        step: "3. Luyện tập / Thực hành",
        time: "15 phút",
        target: "Luyện đọc tiếng mở rộng kèm thanh điệu và luyện viết bảng con đúng quy trình nét chữ.",
        teacherActivities: [
          "a) Luyện đọc tiếng, từ ngữ ứng dụng:",
          "- Gắn các thẻ tiếng có thanh điệu lên bảng: ba, bà, bá, bả, bã, bạ.",
          "- Hướng dẫn đọc phân tích dấu thanh: b - a - ba - huyền - bà; b - a - ba - sắc - bá.",
          "- Cho HS đọc nối tiếp tiếng trong nhóm đôi.",
          "b) Hướng dẫn viết bảng con:",
          "- Hướng dẫn quy trình viết chữ a: Điểm đặt bút dưới đường kẻ ngang 3, viết nét cong kín (rộng 1,5 ô li, cao 2 ô li), lia bút lên đường kẻ 3 viết nét móc ngược sát nét cong kín, dừng bút ở đường kẻ 2.",
          "- Viết mẫu chữ a trên bảng lớp và đếm nhịp.",
          "- Hướng dẫn viết chữ b: Đặt bút ở đường kẻ 2, viết nét khuyết xuôi cao 5 ô li, lượn cong sang phải viết nét thắt nhỏ ở đường kẻ 3.",
          "- Hướng dẫn viết tiếng ba: Viết con chữ b, nối nét sang con chữ a.",
          "- Quan sát, sửa thế ngồi và cách cầm bút cho từng học sinh."
        ],
        studentActivities: [
          "- Đọc to các tiếng trên bảng: ba, bà, bá, bả, bã, bạ (Đọc cá nhân, đọc truyền điện theo bàn).",
          "- Đọc cặp đôi: Bạn A chỉ chữ, bạn B đọc và ngược lại.",
          "- Dùng ngón tay trỏ viết chữ a, chữ b trên không trung và trên mặt bàn theo nhịp cô đếm.",
          "- Cầm phấn viết vào bảng con: 2 chữ a, 2 chữ b, 1 tiếng ba.",
          "- Giơ bảng con ngay ngắn theo hiệu lệnh: '1 - 2 - 3 Giơ bảng!'",
          "- Nhận xét bài viết của bạn bên cạnh và sửa nét chưa tròn theo hướng dẫn của cô."
        ]
      },
      {
        step: "4. Vận dụng / Trải nghiệm",
        time: "3-5 phút",
        target: "Củng cố nhận diện chữ a, b trong đồ vật xung quanh lớp và dặn dò về nhà.",
        teacherActivities: [
          "- Tổ chức trò chơi 'Ai tinh mắt': Tìm xung quanh lớp học đồ vật nào có tên chứa âm a, âm b.",
          "- Nhận xét tiết học, biểu dương các em học sinh lớp 1A chăm ngoan, phát âm to rõ ràng, viết bảng con sạch đẹp.",
          "- Dặn dò: Về nhà mở SGK trang 10 đọc lại bài cho bố mẹ nghe, chuẩn bị Tiết 2."
        ],
        studentActivities: [
          "- Hào hứng xung phong: 'Bàn học có âm b và a; Ba lô có âm b và a; Bảng có âm b; Cặp sách có âm a...'",
          "- Lắng nghe cô Kiều Phương nhận xét và dặn dò.",
          "- Cất đồ dùng học tập gọn gàng vào ngăn bàn."
        ]
      }
    ],
    adjustment: "Học sinh lớp 1A hào hứng, một số em còn lúng túng khi viết nét thắt chữ b cần rèn thêm ở tiết tăng cường."
  },

  {
    id: "khbd-1-w1-tv-t2",
    grade: 1,
    className: "1A",
    teacherName: "Cô Phan Nguyễn Thị Kiều Phương",
    schoolName: "Trường Tiểu Học Tân Thạnh",
    branchName: "Xã Tân Thạnh",
    week: 1,
    day: 2,
    dayName: "Thứ Hai",
    period: 3,
    overallPeriodOfDay: 3,
    session: "Sáng",
    subject: "Tiếng Việt",
    subSubject: "Đọc & Viết",
    ppct: 2,
    title: "Bài 1: A a, B b (Tiết 2)",
    dateStr: "08/09/2025",
    goals: {
      specificCompetencies: [
        "Đọc trơn câu ứng dụng: 'Bà có ba ba.', 'Ba bế bé.'",
        "Nhận biết và phát triển vốn từ qua tranh; nói được 2-3 câu theo chủ đề 'Chào hỏi'.",
        "Viết đúng vào Vở Tập viết 1: Chữ a, b, tiếng ba, bà cỡ vừa, đều nét, đúng khoảng cách."
      ],
      generalCompetencies: [
        "Tự chủ và tự học: Tự giác mở Vở Tập viết trang 4, ngồi thẳng lưng, không tì ngực vào bàn.",
        "Giao tiếp và hợp tác: Tự tin chào hỏi lễ phép với cô giáo và bạn bè."
      ],
      qualities: [
        "Yêu nước & Nhân ái: Lễ phép với ông bà, cha mẹ, thầy cô giáo.",
        "Chăm chỉ: Hoàn thành các dòng viết trong vở tập viết nắn nót."
      ],
      integration: "Tích hợp Kỹ năng sống (Chào hỏi lễ phép) & Giáo dục Quyền con người (Quyền được yêu thương, chăm sóc trong gia đình)."
    },
    materials: {
      teacher: ["Tranh minh họa câu ứng dụng 'Bà có ba ba'", "Vở Tập viết mẫu", "Slide bài giảng điện tử"],
      students: ["SGK Tiếng Việt 1 (Tập 1)", "Vở Tập viết 1", "Bút chì, tẩy"]
    },
    activities: [
      {
        step: "1. Khởi động",
        time: "5 phút",
        target: "Ôn lại âm a, b và tiếng ba đã học ở Tiết 1.",
        teacherActivities: [
          "- Giơ thẻ chữ A, a, B, b và tiếng ba, bà, bá.",
          "- Mời 3-4 HS đọc to trước lớp.",
          "- Nhận xét, tuyên dương và chuyển sang Tiết 2."
        ],
        studentActivities: [
          "- Đứng tại chỗ đọc to, rõ ràng: 'a, bờ, ba, bà, bá'.",
          "- Cả lớp đồng thanh đọc lại 1 lần."
        ]
      },
      {
        step: "2. Khám phá & Luyện đọc câu ứng dụng",
        time: "12 phút",
        target: "Đọc đúng, trôi chảy câu ứng dụng 'Bà có ba ba.' và hiểu nội dung câu.",
        teacherActivities: [
          "- Chiếu tranh minh họa cảnh bà và cháu đang xem con ba ba bơi trong chậu.",
          "- Viết câu ứng dụng lên bảng: 'Bà có ba ba.'",
          "- Hỏi: 'Trong câu trên, tiếng nào chứa âm b và âm a vừa học?'",
          "- Hướng dẫn đọc: Đọc mẫu câu, ngắt hơi sau dấu chấm.",
          "- Mời HS đọc nối tiếp: Cá nhân, nhóm, cả lớp."
        ],
        studentActivities: [
          "- Quan sát tranh và đọc thầm câu ứng dụng.",
          "- Trả lời: 'Tiếng Bà và tiếng ba chứa âm b và âm a ạ.'",
          "- Luyện đọc cá nhân từng em: 'Bà có ba ba.'",
          "- Đọc theo bàn và cả lớp đọc đồng thanh."
        ]
      },
      {
        step: "3. Luyện tập / Viết Vở Tập viết 1",
        time: "15 phút",
        target: "Viết đúng mẫu, đúng cỡ chữ các dòng chữ a, b, ba, bà vào Vở Tập viết trang 4.",
        teacherActivities: [
          "- Nhắc nhở tư thế ngồi viết: Lưng thẳng, đầu hơi cúi, mắt cách vở 25-30cm, tay phải cầm bút, tay trái giữ mép vở.",
          "- Hướng dẫn viết từng dòng trong Vở Tập viết 1 (trang 4):",
          "  + Dòng 1: Viết 1 dòng chữ a cỡ vừa (cao 2 li).",
          "  + Dòng 2: Viết 1 dòng chữ b cỡ vừa (cao 5 li).",
          "  + Dòng 3: Viết 1 dòng tiếng ba (chú ý điểm nối từ con chữ b sang a).",
          "  + Dòng 4: Viết 1 dòng tiếng bà (đặt dấu huyền trên đầu con chữ a).",
          "- Đi từng bàn quan sát, cầm tay hướng dẫn cho những em viết chưa đúng độ cao con chữ b."
        ],
        studentActivities: [
          "- Ngồi đúng tư thế theo hiệu lệnh của cô giáo.",
          "- Cầm bút chì đúng cách (bằng 3 ngón tay: ngón cái, ngón trỏ, ngón giữa).",
          "- Nắn nót viết từng dòng vào Vở Tập viết trang 4 theo hướng dẫn.",
          "- Hoàn thành bài viết, tự ngắm lại các nét chữ của mình."
        ]
      },
      {
        step: "4. Vận dụng / Luyện nói chủ đề Chào hỏi",
        time: "3-5 phút",
        target: "Thực hành kỹ năng chào hỏi lễ phép khi ở nhà và khi đến trường.",
        teacherActivities: [
          "- Chiếu 2 bức tranh: Tranh 1 (Bạn nhỏ chào bố mẹ trước khi đi học), Tranh 2 (Bạn nhỏ khoanh tay chào cô giáo khi đến cổng trường).",
          "- Tổ chức cho HS đóng vai thực hành chào hỏi theo cặp.",
          "- Nhận xét, dặn dò về nhà luôn lễ phép chào hỏi người lớn."
        ],
        studentActivities: [
          "- Quan sát tranh và thảo luận nhóm đôi.",
          "- 2 cặp HS lên bảng đóng vai: 'Con chào bố mẹ con đi học ạ!', 'Em chào cô giáo ạ!'",
          "- Cả lớp vỗ tay khen ngợi bạn đóng vai tự tin, lễ phép."
        ]
      }
    ],
    adjustment: ""
  },

  {
    id: "khbd-1-w1-toan-t1",
    grade: 1,
    className: "1A",
    teacherName: "Cô Phan Nguyễn Thị Kiều Phương",
    schoolName: "Trường Tiểu Học Tân Thạnh",
    branchName: "Xã Tân Thạnh",
    week: 1,
    day: 2,
    dayName: "Thứ Hai",
    period: 4,
    overallPeriodOfDay: 4,
    session: "Sáng",
    subject: "Toán",
    subSubject: "Hình học và Đo lường",
    ppct: 1,
    title: "Bài 1: Vị trí - Trên, dưới, phải, trái, trước, sau (Tiết 1)",
    dateStr: "08/09/2025",
    goals: {
      specificCompetencies: [
        "Nhận biết và diễn đạt đúng vị trí trong không gian: trên - dưới, phải - trái, trước - sau qua hình ảnh thực tế và đồ vật xung quanh.",
        "Sử dụng đúng các thuật ngữ vị trí khi mô tả vị trí đồ dùng trong lớp học và trong tranh vẽ SGK trang 6, 7."
      ],
      generalCompetencies: [
        "Giao tiếp toán học: Diễn đạt rõ ràng vị trí của đồ vật bằng lời nói mạch lạc, tự tin.",
        "Hợp tác: Phối hợp cùng bạn cùng bàn thực hiện trò chơi định hướng vị trí đồ dùng."
      ],
      qualities: [
        "Chăm chỉ: Tích cực tham gia các hoạt động học tập, sắp xếp bàn học ngăn nắp.",
        "Trách nhiệm: Giữ gìn đồ dùng học tập ngay ngắn, đúng vị trí."
      ],
      integration: "Tích hợp Học thông qua chơi (Trò chơi 'Gió thổi đồ vật') & Kỹ năng sống (Định hướng không gian an toàn khi di chuyển trên đường)."
    },
    materials: {
      teacher: [
        "Tranh minh họa bài học SGK Toán 1 trang 6, 7 (Bộ Kết nối tri thức)",
        "Các đồ vật thực tế: Bình hoa, quả bóng, hộp bút, quyển sách Toán, gấu bông",
        "Bài giảng điện tử PowerPoint kèm trò chơi tương tác"
      ],
      students: [
        "Sách giáo khoa Toán 1 (Kết nối tri thức với cuộc sống)",
        "Vở bài tập Toán 1",
        "Bộ đồ dùng học Toán 1 (các thẻ hình, que tính, khối lập phương)"
      ]
    },
    activities: [
      {
        step: "1. Khởi động",
        time: "5 phút",
        target: "Tạo không khí vui nhộn và định hướng phân biệt tay phải, tay trái của cơ thể.",
        teacherActivities: [
          "- Tổ chức trò chơi 'Làm theo lệnh của cô Kiều Phương':",
          "  + Cô hô: 'Tay phải giơ lên cao!' -> HS giơ tay phải.",
          "  + Cô hô: 'Tay trái đặt lên bàn!' -> HS đặt tay trái lên bàn.",
          "  + Cô hô: 'Mắt nhìn về phía trước! Nghiêng đầu sang bên phải!'",
          "- Khen ngợi cả lớp và dẫn dắt: 'Hôm nay chúng ta cùng học Bài 1: Vị trí (Trên - dưới, phải - trái, trước - sau) để xác định đúng phương hướng và sắp xếp đồ dùng gọn gàng.'"
        ],
        studentActivities: [
          "- Đứng tại chỗ thực hiện động tác giơ tay theo hiệu lệnh chuẩn xác của cô giáo.",
          "- Cười vui và hào hứng bước vào bài học mới."
        ]
      },
      {
        step: "2. Khám phá kiến thức mới",
        time: "12 phút",
        target: "Nhận biết vị trí trên - dưới, phải - trái, trước - sau qua hình ảnh lớp học và đồ vật cụ thể.",
        teacherActivities: [
          "- Chiếu bức tranh khám phá (SGK tr. 6, 7): Cảnh lớp học có cô giáo và các bạn học sinh, trên bàn có bình hoa, dưới gầm bàn có quả bóng, trên tường có đồng hồ.",
          "- Đặt câu hỏi cụ thể từng vị trí:",
          "  + Câu 1: 'Chiếc đồng hồ ở đâu so với tấm bảng lớp?' -> (Ở trên).",
          "  + Câu 2: 'Bình hoa ở đâu so với mặt bàn?' -> (Ở trên mặt bàn).",
          "  + Câu 3: 'Quả bóng ở đâu so với cái bàn?' -> (Ở dưới gầm bàn).",
          "  + Câu 4: 'Bạn Nam đứng ở phía nào của bạn Mai?' -> (Phía trước / Phía sau).",
          "- Chốt lại các cặp từ chỉ vị trí: Trên - Dưới, Phải - Trái, Trước - Sau."
        ],
        studentActivities: [
          "- Quan sát tranh trên màn hình và trả lời rõ ràng từng câu hỏi của cô giáo:",
          "  + 'Thưa cô, đồng hồ ở phía trên tấm bảng ạ.'",
          "  + 'Bình hoa ở trên bàn, quả bóng ở dưới gầm bàn ạ.'",
          "  + 'Bạn Nam đứng ở phía trước bạn Mai ạ.'",
          "- Đồng thanh nhắc lại các cặp từ vị trí: 'Trên - Dưới', 'Phải - Trái', 'Trước - Sau'."
        ]
      },
      {
        step: "3. Luyện tập / Thực hành",
        time: "15 phút",
        target: "Thực hành xác định vị trí đồ vật qua bài tập 1, 2, 3 trong SGK trang 7, 8.",
        teacherActivities: [
          "- Bài 1 (SGK tr. 7): Quan sát tranh con vật trong rừng:",
          "  + Hỏi: 'Con chim đậu ở đâu? Con sóc ở đâu? Chú thỏ và rùa, ai chạy trước, ai đi sau?'",
          "- Bài 2 (SGK tr. 8): Thực hành thao tác với đồ dùng học tập trên mặt bàn:",
          "  + Yêu cầu: 'Các em hãy đặt quyển sách Toán ở giữa bàn. Đặt hộp bút ở bên phải quyển sách. Đặt bảng con ở bên trái quyển sách.'",
          "- Bài 3 (SGK tr. 9): Trò chơi 'Ai nhanh mắt hơn':",
          "  + Chiếu hình ngã tư đường phố: Xe máy, ô tô, người đi bộ.",
          "  + Yêu cầu HS xác định phương tiện nào đi trước, phương tiện nào đi sau; người đi bộ đi bên nào.",
          "- Đi từng bàn quan sát và hỗ trợ các em còn nhầm lẫn tay phải, tay trái."
        ],
        studentActivities: [
          "- Làm Bài 1: Chỉ vào tranh SGK và trả lời: 'Con chim ở trên cành cây, con sóc ở dưới gốc cây; chú thỏ chạy trước, chú rùa bò sau.'",
          "- Làm Bài 2: Tự tay thao tác sắp xếp đồ dùng trên mặt bàn theo hiệu lệnh của cô:",
          "  + Đặt sách Toán ở giữa, hộp bút bên phải, bảng con bên trái.",
          "  + Đổi bạn cùng bàn kiểm tra chéo vị trí cho nhau.",
          "- Làm Bài 3: Trả lời: 'Xe ô tô đi trước xe buýt; người đi bộ đi trên vỉa hè phía bên phải đường.'"
        ]
      },
      {
        step: "4. Vận dụng / Trải nghiệm",
        time: "3-5 phút",
        target: "Vận dụng kiến thức vị trí vào sinh hoạt hằng ngày và giáo dục an toàn giao thông.",
        teacherActivities: [
          "- Hỏi liên hệ: 'Khi ngồi học, tay nào em dùng để cầm bút viết? Tay nào em dùng để giữ vở?'",
          "- Giáo dục an toàn giao thông: 'Khi đi bộ trên đường hoặc đi cầu thang ở trường, chúng ta cần đi về phía bên nào?' -> (Bên phải).",
          "- Nhận xét tiết học, tuyên dương tinh thần học tập tích cực của lớp 1A.",
          "- Dặn dò: Về nhà chỉ vị trí tivi, quạt trần, tủ lạnh cho bố mẹ nghe."
        ],
        studentActivities: [
          "- Trả lời: 'Em cầm bút bằng tay phải, dùng tay trái giữ mép vở ạ!'",
          "- Trả lời: 'Khi đi trên đường chúng ta phải đi bên phải đường ạ!'",
          "- Lắng nghe cô dặn và chuẩn bị cho tiết học sau."
        ]
      }
    ],
    adjustment: ""
  },

  {
    id: "khbd-1-w1-tnxh-t1",
    grade: 1,
    className: "1A",
    teacherName: "Cô Phan Nguyễn Thị Kiều Phương",
    schoolName: "Trường Tiểu Học Tân Thạnh",
    branchName: "Xã Tân Thạnh",
    week: 1,
    day: 3,
    dayName: "Thứ Ba",
    period: 3,
    overallPeriodOfDay: 3,
    session: "Sáng",
    subject: "Tự nhiên và Xã hội",
    subSubject: "Con người và Sức khỏe",
    ppct: 1,
    title: "Bài 1: Gia đình của em (Tiết 1)",
    dateStr: "09/09/2025",
    goals: {
      specificCompetencies: [
        "Nêu được các thành viên trong gia đình và công việc, hoạt động thường ngày của mỗi thành viên.",
        "Biết cách bày tỏ tình cảm yêu thương, sự kính trọng và giúp đỡ các thành viên trong gia đình bằng những việc làm vừa sức."
      ],
      generalCompetencies: [
        "Tự chủ và tự học: Tự tin giới thiệu về các thành viên trong gia đình mình trước thầy cô và bạn bè.",
        "Giao tiếp và hợp tác: Biết lắng nghe bạn chia sẻ, trao đổi cởi mở trong nhóm đôi."
      ],
      qualities: [
        "Yêu nước & Nhân ái: Yêu thương gia đình, lễ phép với ông bà, cha mẹ, nhường nhịn em nhỏ.",
        "Trách nhiệm: Tự giác làm việc nhà vừa sức (quét nhà, dọn đồ chơi, cất bát đũa)."
      ],
      integration: "Tích hợp Giáo dục Quyền con người (Quyền được sống trong gia đình hạnh phúc) & Kỹ năng sống (Thể hiện sự quan tâm, chăm sóc người thân)."
    },
    materials: {
      teacher: [
        "Tranh minh họa gia đình bạn Hoa trong SGK TNXH 1 trang 8, 9 (Bộ Kết nối tri thức)",
        "Bài giảng điện tử PowerPoint kèm video bài hát 'Cả nhà thương nhau'",
        "Các sticker khen thưởng hình bông hoa điểm tốt"
      ],
      students: [
        "SGK Tự nhiên và Xã hội 1 (Kết nối tri thức với cuộc sống)",
        "Vở bài tập TNXH 1",
        "Ảnh chụp gia đình của học sinh (nếu có chuẩn bị trước)"
      ]
    },
    activities: [
      {
        step: "1. Khởi động",
        time: "5 phút",
        target: "Tạo không khí ấm áp, vui tươi và kết nối vào chủ đề Gia đình.",
        teacherActivities: [
          "- Bắt nhịp cho cả lớp hát và vận động theo bài hát 'Cả nhà thương nhau' (Nhạc: Phan Văn Minh).",
          "- Hỏi: 'Bài hát nhắc đến những ai trong gia đình? Mọi người đối xử với nhau như thế nào?'",
          "- Nhận xét, dẫn dắt: 'Mỗi chúng ta ai cũng có một mái ấm gia đình yêu thương. Hôm nay cô trò mình cùng tìm hiểu Bài 1: Gia đình của em.'"
        ],
        studentActivities: [
          "- Cả lớp hát vang bài hát và làm động tác trái tim biểu tượng yêu thương.",
          "- Trả lời: 'Bài hát nhắc đến ba, mẹ và con ạ. Ba mẹ rất yêu thương nhau và yêu thương con ạ.'",
          "- Mở SGK trang 8 và chuẩn bị học bài."
        ]
      },
      {
        step: "2. Khám phá kiến thức mới",
        time: "12 phút",
        target: "Quan sát tranh và tìm hiểu các thành viên cùng công việc trong gia đình bạn Hoa.",
        teacherActivities: [
          "- Chiếu tranh SGK trang 8, 9: Gia đình bạn Hoa sum họp vào ngày nghỉ cuối tuần.",
          "- Đặt câu hỏi thảo luận nhóm đôi:",
          "  + Câu 1: 'Gia đình bạn Hoa gồm có những ai?'",
          "  + Câu 2: 'Mỗi người trong gia đình bạn Hoa đang làm công việc gì?'",
          "  + Câu 3: 'Em thấy không khí gia đình bạn Hoa như thế nào?'",
          "- Mời đại diện 2-3 nhóm trả lời trước lớp.",
          "- Kết luận: Gia đình Hoa gồm 6 người: Ông, bà, bố, mẹ, Hoa và em trai. Mọi người cùng chia sẻ công việc nhà và luôn vui vẻ, đầm ấm."
        ],
        studentActivities: [
          "- Thảo luận nhóm đôi trong 2 phút, cùng nhau chỉ vào tranh và trả lời từng câu hỏi.",
          "- Đại diện phát biểu: 'Gia đình bạn Hoa gồm ông, bà, bố, mẹ, Hoa và em trai ạ. Ông đang đọc báo, bà đan len, bố tưới cây, mẹ nấu cơm, bạn Hoa quét nhà giúp mẹ, em trai chơi xếp hình ạ.'",
          "- Cả lớp lắng nghe và bổ sung ý kiến."
        ]
      },
      {
        step: "3. Luyện tập / Thực hành",
        time: "15 phút",
        target: "Học sinh tự tin chia sẻ về các thành viên và công việc trong gia đình mình.",
        teacherActivities: [
          "- Tổ chức hoạt động 'Góc sẻ chia yêu thương':",
          "  + Yêu cầu HS mang ảnh gia đình (hoặc tự nhớ), quay sang bạn cùng bàn giới thiệu:",
          "    * Nhà em gồm có mấy người? Đó là những ai?",
          "    * Bố mẹ em làm nghề gì?",
          "    * Ở nhà em thường giúp đỡ bố mẹ việc gì?",
          "- Mời 3-4 em học sinh tự tin lên trước lớp chia sẻ.",
          "- Tuyên dương các bạn biết phụ giúp bố mẹ làm việc nhà."
        ],
        studentActivities: [
          "- Làm việc theo cặp: Lần lượt từng bạn chỉ vào ảnh và kể về gia đình mình cho bạn nghe.",
          "- 3 HS lên trước lớp cầm ảnh gia đình tự tin giới thiệu: 'Thưa cô và các bạn, nhà em có 4 người: Bố em là công nhân, mẹ em là giáo viên, em và em gái. Ở nhà em hay giúp mẹ trông em và cất đồ chơi gọn gàng ạ.'",
          "- Cả lớp vỗ tay khen ngợi bạn."
        ]
      },
      {
        step: "4. Vận dụng / Trải nghiệm",
        time: "3-5 phút",
        target: "Thực hành đóng vai thể hiện tình cảm yêu thương, lễ phép với người thân khi đi học về.",
        teacherActivities: [
          "- Nêu tình huống: 'Khi đi học về đến nhà, em sẽ làm gì để thể hiện sự lễ phép và quan tâm đến ông bà, bố mẹ?'",
          "- Mời 2 HS lên đóng vai:",
          "  + Bạn A đóng vai bạn nhỏ đi học về.",
          "  + Bạn B đóng vai ông bà đang ngồi uống nước.",
          "- Nhận xét, dặn dò: Mỗi ngày về nhà hãy luôn mỉm cười, chào hỏi lễ phép và làm việc tốt giúp đỡ gia đình."
        ],
        studentActivities: [
          "- HS tham gia đóng vai: Bạn nhỏ khoanh tay: 'Con chào ông bà, con mới đi học lớp 1A về ạ!', sau đó rót cốc nước ấm mời ông bà.",
          "- Cả lớp theo dõi, hào hứng học tập theo hành động đẹp.",
          "- Lắng nghe cô dặn và chuẩn bị bài cho tiết sau."
        ]
      }
    ],
    adjustment: ""
  },

  // ========================== KHỐI 5 - TUẦN 1 (Lớp 5A - Thầy Nguyễn Hoàng Tuấn) ==========================
  {
    id: "khbd-5-w1-tv-t1",
    grade: 5,
    className: "5A",
    teacherName: "Nguyễn Hoàng Tuấn",
    schoolName: "Trường Tiểu Học Tân Thạnh",
    branchName: "Xã Tân Thạnh",
    week: 1,
    day: 2,
    dayName: "Thứ Hai",
    dateStr: "08/09/2025",
    session: "Sáng",
    period: 2,
    overallPeriodOfDay: 2,
    subject: "Tiếng Việt",
    subSubject: "Đọc",
    ppct: 1,
    title: "Bài 1: THANH ÂM CỦA GIÓ (Tiết 1)",
    goals: {
      specificCompetencies: [
        "Đọc đúng, trôi chảy toàn bài 'Thanh âm của gió' (SGK Tiếng Việt 5 - Bộ Kết nối tri thức trang 10, 11); ngắt nghỉ hơi đúng nhịp ở các câu văn dài.",
        "Đọc diễn cảm bài văn với giọng nhẹ nhàng, trong trẻo, giàu cảm xúc.",
        "Hiểu nội dung và ý nghĩa bài đọc: Ca ngợi vẻ đẹp phong phú, kì diệu của tiếng gió quê hương và tình yêu thiên nhiên sâu sắc của tuổi thơ."
      ],
      generalCompetencies: [
        "Tự chủ và tự học: Tự giác luyện đọc từ khó, đọc thầm và trả lời các câu hỏi đọc hiểu 1, 2, 3, 4 trong SGK.",
        "Giao tiếp và hợp tác: Tích cực thảo luận nhóm 4, chia sẻ cảm nhận về các hình ảnh so sánh trong bài văn."
      ],
      qualities: [
        "Yêu nước: Yêu quý cảnh sắc làng quê Việt Nam, trân trọng những thanh âm bình dị của quê hương.",
        "Chăm chỉ: Tích cực phát biểu xây dựng bài, luyện đọc diễn cảm lưu loát.",
        "Trách nhiệm: Có ý thức bảo vệ cây xanh và môi trường thiên nhiên trong lành."
      ],
      integration: "Tích hợp Năng lực số (NLS 1.1.CB1a - Tìm kiếm tài nguyên âm thanh thiên nhiên) & Giáo dục Bảo vệ môi trường (BVMT 1)."
    },
    materials: {
      teacher: [
        "Kế hoạch bài dạy chuẩn CV 2345 (Bộ sách Kết nối tri thức)",
        "Ti vi, máy tính kết nối internet, bài giảng điện tử PowerPoint kèm video âm thanh tiếng gió rì rào qua rặng tre",
        "Tranh minh họa bài đọc trong SGK phóng to"
      ],
      students: [
        "Sách giáo khoa Tiếng Việt 5 (Tập 1 - Kết nối tri thức với cuộc sống)",
        "Vở bài tập Tiếng Việt 5, bút viết, thước kẻ, bút dạ quang"
      ]
    },
    activities: [
      {
        step: "1. Khởi động",
        time: "5 phút",
        target: "Tạo tâm thế hào hứng và kết nối vào bài đọc mới.",
        teacherActivities: [
          "- Tổ chức trò chơi 'Lắng nghe âm thanh đoán tên sự vật':",
          "- Bật đoạn file âm thanh ngắn: Tiếng gió thổi rì rào qua rặng tre, tiếng gió lay cành lá xào xạc, tiếng sáo diều vi vu trên cánh đồng.",
          "- Hỏi: 'Em nghe thấy những âm thanh gì? Âm thanh đó gợi cho em cảm xúc gì?'",
          "- Nhận xét, dẫn dắt vào bài mới: 'Bài 1: Thanh âm của gió (SGK Tiếng Việt 5 trang 10)'."
        ],
        studentActivities: [
          "- Lắng nghe đoạn âm thanh với thái độ thích thú.",
          "- Xung phong trả lời: 'Đó là tiếng gió thổi rì rào, tiếng lá cây xào xạc và tiếng sáo diều vi vu trên bầu trời ạ.'",
          "- Nêu cảm xúc: Thấy tâm hồn thư thái, bình yên, gợi nhớ quê hương.",
          "- Mở SGK trang 10 và ghi tên bài vào vở."
        ]
      },
      {
        step: "2. Khám phá kiến thức mới",
        time: "15 phút",
        target: "Luyện đọc đúng từ khó, ngắt nghỉ câu dài và luyện đọc trôi chảy từng đoạn của bài văn.",
        teacherActivities: [
          "- GV đọc mẫu toàn bài: Giọng đọc nhẹ nhàng, trong trẻo, giàu nhạc điệu, nhấn giọng ở các từ ngữ gợi cảm (xào xạc, vi vu, ngân nga, biếc xanh).",
          "- Hướng dẫn chia đoạn bài đọc (gồm 3 đoạn):",
          "  + Đoạn 1: Từ đầu đến '...khung cửa sổ phòng tôi.'",
          "  + Đoạn 2: Tiếp theo đến '...bay vào bầu trời biếc xanh.'",
          "  + Đoạn 3: Phần còn lại.",
          "- Cho HS đọc nối tiếp đoạn lần 1, phát hiện và luyện phát âm từ khó: 'kẽo kẹt, xào xạc, ngút ngát, rộn rã, biếc xanh'.",
          "- Hướng dẫn ngắt nhịp câu dài:",
          "  'Gió mang theo hương lúa chín thơm nồng / từ cánh đồng xa / ùa vào căn phòng nhỏ, // đánh thức vạn vật sau một giấc ngủ dài. //'",
          "- Cho HS đọc nối tiếp đoạn lần 2 kết hợp giải nghĩa từ ngữ ở mục Chú giải (SGK tr. 11)."
        ],
        studentActivities: [
          "- Dò tay theo bài đọc trong SGK, lắng nghe thầy đọc mẫu.",
          "- Đánh dấu 3 đoạn văn vào sách giáo khoa.",
          "- Luyện đọc từ khó cá nhân và đồng thanh: 'kẽo kẹt, xào xạc, ngút ngát, rộn rã, biếc xanh'.",
          "- Luyện ngắt nhịp câu dài theo hướng dẫn của thầy.",
          "- 3 HS đọc nối tiếp 3 đoạn lần 2 trước lớp; 1 HS đọc to phần Chú giải từ ngữ."
        ]
      },
      {
        step: "3. Luyện tập / Thực hành",
        time: "15 phút",
        target: "Đọc hiểu chi tiết nội dung bài đọc qua hệ thống 4 câu hỏi SGK và luyện đọc diễn cảm.",
        teacherActivities: [
          "- Tổ chức cho HS thảo luận nhóm 4 trả lời các câu hỏi tìm hiểu bài trong SGK trang 11:",
          "  + Câu 1: 'Em hãy tìm những từ ngữ tả âm thanh của gió trong bài đọc?'",
          "  + Câu 2: 'Tiếng gió được tác giả so sánh với những âm thanh nào?'",
          "  + Câu 3: 'Tác giả cảm nhận được điều gì khi lắng nghe tiếng gió qua khung cửa sổ?'",
          "  + Câu 4: 'Nêu nội dung và ý nghĩa chính của bài văn?'",
          "- Mời đại diện các nhóm phát biểu, hướng dẫn chốt câu trả lời chuẩn xác.",
          "- Hướng dẫn luyện đọc diễn cảm Đoạn 2 với giọng đọc tha thiết, lắng đọng.",
          "- Tổ chức thi đọc diễn cảm giữa các tổ."
        ],
        studentActivities: [
          "- Làm việc trong nhóm 4: Đọc thầm từng đoạn, cùng trao đổi và ghi câu trả lời ra phiếu:",
          "  + Câu 1: Những từ ngữ tả âm thanh của gió: 'rì rào, kẽo kẹt, xào xạc, vi vu, ngân nga'.",
          "  + Câu 2: Tiếng gió được so sánh với tiếng đàn, lời ru ngọt ngào của mẹ, tiếng cười khúc khích của trẻ thơ.",
          "  + Câu 3: Tác giả cảm thấy tâm hồn thư thái, yêu quý cảnh đẹp thiên nhiên quê nhà tha thiết.",
          "  + Câu 4: Bài văn ca ngợi vẻ đẹp phong phú của tiếng gió và tình yêu thiên nhiên của tuổi thơ.",
          "- Đại diện 3 nhóm thi đọc diễn cảm Đoạn 2 trước lớp.",
          "- Bình chọn bạn đọc diễn cảm hay nhất tiết học."
        ]
      },
      {
        step: "4. Vận dụng / Trải nghiệm",
        time: "3-5 phút",
        target: "Khắc sâu lòng yêu thiên nhiên và tự giác luyện đọc hằng ngày.",
        teacherActivities: [
          "- Nêu câu hỏi liên hệ thực tế: 'Để quê hương luôn có những làn gió mát lành, mỗi học sinh chúng ta cần làm gì?' -> (Bảo vệ cây xanh, không xả rác bừa bãi).",
          "- Nhận xét tiết học, biểu dương các bạn đọc to rõ ràng và diễn cảm.",
          "- Dặn dò: Về nhà đọc bài diễn cảm cho bố mẹ nghe, chuẩn bị bài Luyện từ và câu tiếp theo."
        ],
        studentActivities: [
          "- Trả lời: 'Chúng em cần trồng và chăm sóc cây xanh quanh trường lớp, không bẻ cành bứt lá, giữ gìn môi trường sạch đẹp ạ.'",
          "- Lắng nghe thầy dặn dò và ghi chép nhiệm vụ về nhà."
        ]
      }
    ],
    adjustment: "Học sinh lớp 5A tiếp thu bài nhanh, đọc diễn cảm tốt, cần tiếp tục rèn thêm ngữ điệu cho một vài em còn đọc đều giọng."
  },

  {
    id: "khbd-5-w1-math-t1",
    grade: 5,
    className: "5A",
    teacherName: "Nguyễn Hoàng Tuấn",
    schoolName: "Trường Tiểu Học Tân Thạnh",
    branchName: "Xã Tân Thạnh",
    week: 1,
    day: 2,
    dayName: "Thứ Hai",
    dateStr: "08/09/2025",
    session: "Sáng",
    period: 4,
    overallPeriodOfDay: 4,
    subject: "Toán",
    subSubject: "Số học & Phép tính",
    ppct: 1,
    title: "Bài 1: ÔN TẬP VỀ SỐ TỰ NHIÊN (Tiết 1)",
    goals: {
      specificCompetencies: [
        "Đọc, viết, phân tích cấu tạo số tự nhiên trong phạm vi lớp triệu (các hàng: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu, chục triệu, trăm triệu).",
        "Nêu được giá trị của từng chữ số trong một số tự nhiên theo vị trí hàng của nó.",
        "So sánh và sắp xếp đúng thứ tự các số tự nhiên từ bé đến lớn và ngược lại; giải thành thạo các bài tập 1, 2, 3, 4 trong SGK Toán 5 trang 6, 7."
      ],
      generalCompetencies: [
        "Tư duy và lập luận toán học: Biết phân tích cấu tạo hàng, lớp của số tự nhiên.",
        "Giải quyết vấn đề toán học: Vận dụng số tự nhiên vào giải toán có lời văn thực tế."
      ],
      qualities: [
        "Chăm chỉ: Tính toán cẩn thận, ghi chép chữ số rõ ràng, thẳng cột.",
        "Trung thực: Tự giác làm bài tập độc lập."
      ],
      integration: "Tích hợp Học thông qua chơi (Trò chơi 'Bắn tên tìm hàng') & Năng lực số (Sử dụng phần mềm mô phỏng bảng đếm số)."
    },
    materials: {
      teacher: [
        "Bảng phụ kẻ sẵn Bảng cấu tạo các hàng và lớp của số tự nhiên",
        "Bộ thẻ số từ 0 đến 9",
        "Máy chiếu bài giảng điện tử PowerPoint"
      ],
      students: [
        "Sách giáo khoa Toán 5 (Bộ Kết nối tri thức với cuộc sống)",
        "Vở bài tập Toán 5, bảng con, phấn trắng, thước kẻ"
      ]
    },
    activities: [
      {
        step: "1. Khởi động",
        time: "5 phút",
        target: "Tạo không khí sôi nổi và ôn lại các hàng, các lớp đã học ở lớp 4.",
        teacherActivities: [
          "- Tổ chức trò chơi 'Bắn tên đọc số': Thầy giáo chiếu các số: 35 240; 5 890 120; 452 000; 100 000 000.",
          "- Gọi bất kỳ HS đứng dậy đọc to số và nêu số đó gồm mấy chữ số.",
          "- Nhận xét, dẫn dắt vào bài: 'Bài 1: Ôn tập về số tự nhiên (Tiết 1)'."
        ],
        studentActivities: [
          "- Tham gia hào hứng, đứng dậy đọc to: 'Ba mươi lăm nghìn hai trăm bốn mươi; Năm triệu tám trăm chín mươi nghìn một trăm hai mươi...'",
          "- Mở SGK trang 6 và ghi bài vào vở."
        ]
      },
      {
        step: "2. Khám phá & Ôn tập lý thuyết",
        time: "10 phút",
        target: "Hệ thống hóa cấu tạo các hàng, các lớp trong hệ thập phân.",
        teacherActivities: [
          "- Chiếu Bảng các lớp và hàng lên màn hình (Lớp đơn vị, Lớp nghìn, Lớp triệu).",
          "- Hỏi: 'Mỗi lớp gồm có mấy hàng? Kể tên các hàng trong lớp nghìn và lớp triệu?'",
          "- Hỏi: 'Nêu quy tắc đọc và viết số tự nhiên?' -> (Đọc, viết từ trái sang phải, từ hàng cao đến hàng thấp, tách từng lớp 3 chữ số để đọc cho chuẩn).",
          "- Chốt lại kiến thức trọng tâm."
        ],
        studentActivities: [
          "- Quan sát bảng và nhắc lại: 'Mỗi lớp gồm 3 hàng. Lớp nghìn gồm hàng nghìn, hàng chục nghìn, hàng trăm nghìn. Lớp triệu gồm hàng triệu, hàng chục triệu, hàng trăm triệu ạ.'",
          "- 1 HS nêu lại quy tắc tách lớp để đọc số tự nhiên."
        ]
      },
      {
        step: "3. Luyện tập / Thực hành",
        time: "17 phút",
        target: "Thực hành giải chi tiết Bài 1, Bài 2, Bài 3, Bài 4 SGK Toán 5 trang 6, 7.",
        teacherActivities: [
          "- Bài 1 (SGK tr. 6): Đọc số và nêu giá trị của chữ số 5 trong các số:",
          "  + Số 35 240 (Chữ số 5 thuộc hàng nghìn, giá trị 5 000).",
          "  + Số 5 890 120 (Chữ số 5 thuộc hàng triệu, giá trị 5 000 000).",
          "  + Yêu cầu HS viết kết quả vào bảng con.",
          "- Bài 2 (SGK tr. 7): Viết các số sau thành tổng theo mẫu: $45 820 = 40 000 + 5 000 + 800 + 20$.",
          "  + Yêu cầu HS làm vở cá nhân 2 câu: $73 054$ và $208 400$.",
          "- Bài 3 (SGK tr. 7): Sắp xếp các số sau theo thứ tự từ bé đến lớn: $345 600; 354 000; 345 060; 354 600$.",
          "- Bài 4 (SGK tr. 7): Giải toán có lời văn: 'Một xã vùng cao năm đầu trồng được 12 500 cây keo, năm thứ hai trồng gấp đôi năm đầu. Hỏi cả hai năm xã đó trồng được bao nhiêu cây keo?'",
          "- Đi bao quát lớp, chấm chữa bài cho 5-7 học sinh làm nhanh."
        ],
        studentActivities: [
          "- Làm Bài 1: Viết giá trị chữ số 5 vào bảng con và giơ bảng theo hiệu lệnh.",
          "- Làm Bài 2 vào vở: Viết tổng các hàng: $73 054 = 70 000 + 3 000 + 50 + 4$; $208 400 = 200 000 + 8 000 + 400$.",
          "- Làm Bài 3: Sắp xếp đúng thứ tự: $345 060 < 345 600 < 354 000 < 354 600$.",
          "- Làm Bài 4 vào vở bài tập:",
          "  + Lời giải 1: 'Số cây keo năm thứ hai xã đó trồng được là: $12 500 \\times 2 = 25 000$ (cây).'",
          "  + Lời giải 2: 'Cả hai năm xã đó trồng được tất cả số cây là: $12 500 + 25 000 = 37 500$ (cây). Đáp số: 37 500 cây keo.'",
          "- Đổi vở kiểm tra chéo kết quả với bạn cùng bàn."
        ]
      },
      {
        step: "4. Vận dụng / Trải nghiệm",
        time: "3 phút",
        target: "Ứng dụng số tự nhiên vào đọc số liệu dân số, diện tích địa lý thực tế.",
        teacherActivities: [
          "- Nêu câu hỏi thực tế: 'Dân số tỉnh ta khoảng 1 500 000 người. Chữ số 1 thuộc hàng nào, lớp nào?'",
          "- Nhận xét tiết học, khen ngợi tinh thần tính toán tích cực, chính xác của lớp 5A.",
          "- Dặn dò: Về nhà ôn tập các tính chất phép cộng, trừ số tự nhiên."
        ],
        studentActivities: [
          "- Trả lời: 'Chữ số 1 thuộc hàng triệu, lớp triệu ạ.'",
          "- Lắng nghe thầy dặn dò và hoàn thành bài tập còn lại."
        ]
      }
    ],
    adjustment: ""
  }
];

export const SAMPLE_LESSON_PLANS_WEEK_1 = DETAILED_LESSON_PLANS;

/**
 * Smart generator to build fully synchronized KHBD Lesson Plans (CV 2345)
 * for all slots in the timetable when TKB changes or is re-derived.
 */
export function buildSyncedWeekKHBD(
  slots: any[],
  config: any,
  existingPlans: KHBDLessonPlan[] = []
): KHBDLessonPlan[] {
  const currentClassName = config.currentClass || "1A";
  const currentTeacherName = config.currentTeacher || "Cô Phan Nguyễn Thị Kiều Phương";
  const grade = (parseInt(currentClassName[0]) || 1) as GradeNumber;
  const schoolName = config.schoolName || "Trường Tiểu Học Tân Thạnh";

  // Filter slots for this class and sort chronologically strictly according to day, session, and period of TKB/LBG
  const classSlots = slots
    .filter((s: any) => s.classSubjectMap && s.classSubjectMap[currentClassName])
    .sort((a: any, b: any) => {
      if (a.day !== b.day) return a.day - b.day;
      if (a.session !== b.session) return a.session === "Sáng" ? -1 : 1;
      return a.period - b.period;
    });

  // Pre-calculate weekly periods per clean subject
  const weeklyTotals: Record<string, number> = {};
  for (const slot of classSlots) {
    const classInfo = slot.classSubjectMap[currentClassName];
    const rawSubject = classInfo?.subject || "";
    if (!rawSubject || rawSubject === "—" || rawSubject === "SHCM") continue;
    let clean = rawSubject;
    if (rawSubject.includes("Tiếng Việt") || rawSubject.includes("T.cường TV")) clean = "Tiếng Việt";
    else if (rawSubject.includes("Toán") || rawSubject.includes("T.cường T")) clean = "Toán";
    else if (rawSubject.includes("TNXH")) clean = "Tự nhiên và Xã hội";
    else if (rawSubject.includes("Khoa học")) clean = "Khoa học";
    else if (rawSubject.includes("LS&ĐL")) clean = "Lịch sử và Địa lí";
    else if (rawSubject.includes("Đạo đức")) clean = "Đạo đức";
    else if (rawSubject.includes("HĐTN") || rawSubject.includes("HĐTT")) clean = "Hoạt động trải nghiệm";
    else if (rawSubject.includes("GDTC")) clean = "Giáo dục Thể chất";
    else if (rawSubject.includes("MT") || rawSubject.includes("Mĩ thuật") || rawSubject.includes("BDMT")) clean = "Mĩ thuật";
    else if (rawSubject.includes("AN") || rawSubject.includes("Âm nhạc") || rawSubject.includes("BDAN")) clean = "Âm nhạc";
    else if (rawSubject.includes("TA") || rawSubject.includes("Tiếng Anh")) clean = "Tiếng Anh";
    else if (rawSubject.includes("TH") || rawSubject.includes("Tin học") || rawSubject.includes("TCTH")) clean = "Tin học";
    else if (rawSubject.includes("CN") || rawSubject.includes("Công nghệ")) clean = "Công nghệ";
    weeklyTotals[clean] = (weeklyTotals[clean] || 0) + 1;
  }

  // Keep a counter of PPCT per subject
  const subjectCounters: Record<string, number> = {};
  const currentWeek = config.currentWeek || 1;

  const syncedPlans: KHBDLessonPlan[] = [];

  for (const slot of classSlots) {
    const classInfo = slot.classSubjectMap[currentClassName];
    const rawSubject = classInfo.subject || "";
    if (!rawSubject || rawSubject === "—" || rawSubject === "SHCM") continue;

    // Clean subject name
    let cleanSubject = rawSubject;
    let subSubject = "";
    if (rawSubject.includes("Tiếng Việt") || rawSubject.includes("T.cường TV")) {
      cleanSubject = "Tiếng Việt";
      subSubject = "Đọc & Viết";
    } else if (rawSubject.includes("Toán") || rawSubject.includes("T.cường T")) {
      cleanSubject = "Toán";
      subSubject = "Số học & Phép tính";
    } else if (rawSubject.includes("TNXH")) {
      cleanSubject = "Tự nhiên và Xã hội";
      subSubject = "Con người và Sức khỏe";
    } else if (rawSubject.includes("Khoa học")) {
      cleanSubject = "Khoa học";
      subSubject = "Vật chất và Năng lượng";
    } else if (rawSubject.includes("LS&ĐL")) {
      cleanSubject = "Lịch sử và Địa lí";
      subSubject = "Địa phương và Đất nước";
    } else if (rawSubject.includes("Đạo đức")) {
      cleanSubject = "Đạo đức";
      subSubject = "Chuẩn mực hành vi";
    } else if (rawSubject.includes("HĐTN") || rawSubject.includes("HĐTT")) {
      cleanSubject = "Hoạt động trải nghiệm";
      subSubject = slot.period === 1 && slot.day === 2 ? "Sinh hoạt dưới cờ" : (slot.period >= 4 && slot.day === 6 ? "Sinh hoạt lớp" : "Hoạt động giáo dục theo chủ đề");
    } else if (rawSubject.includes("GDTC")) {
      cleanSubject = "Giáo dục Thể chất";
      subSubject = "Đội hình đội ngũ & Vận động cơ bản";
    } else if (rawSubject.includes("MT") || rawSubject.includes("Mĩ thuật") || rawSubject.includes("BDMT")) {
      cleanSubject = "Mĩ thuật";
      subSubject = "Hội họa & Tạo hình";
    } else if (rawSubject.includes("AN") || rawSubject.includes("Âm nhạc") || rawSubject.includes("BDAN")) {
      cleanSubject = "Âm nhạc";
      subSubject = "Hát & Nhạc cụ";
    } else if (rawSubject.includes("TA") || rawSubject.includes("Tiếng Anh")) {
      cleanSubject = "Tiếng Anh";
      subSubject = "Phonics & Vocabulary";
    } else if (rawSubject.includes("TH") || rawSubject.includes("Tin học") || rawSubject.includes("TCTH")) {
      cleanSubject = "Tin học";
      subSubject = "Thông tin và Công nghệ số";
    } else if (rawSubject.includes("CN") || rawSubject.includes("Công nghệ")) {
      cleanSubject = "Công nghệ";
      subSubject = "Công nghệ và Đời sống";
    }

    // Increment PPCT
    subjectCounters[cleanSubject] = (subjectCounters[cleanSubject] || 0) + 1;
    const lessonInWeek = subjectCounters[cleanSubject];
    const totalInWeek = weeklyTotals[cleanSubject] || 1;
    const cumulativePpct = (currentWeek - 1) * totalInWeek + lessonInWeek;

    // Check if user has a custom edited plan specifically for this slot
    const userSlotCustomPlan = existingPlans.find(
      p => p.day === slot.day && p.period === slot.period && p.session === slot.session && p.subject === cleanSubject
    );

    const slotTeacherName = classInfo.teacherName ? (
      classInfo.teacherName.startsWith("Cô ") || classInfo.teacherName.startsWith("Thầy ")
        ? classInfo.teacherName
        : `GV. ${classInfo.teacherName}`
    ) : currentTeacherName;

    const dateStr = getDateForDay(currentWeek, slot.day, config.startDate);

    // Generate concrete lesson plan data with authentic curriculum content from official curriculum repository
    const concreteData = getConcreteLessonContent(cleanSubject, grade, cumulativePpct, currentWeek);

    syncedPlans.push({
      id: userSlotCustomPlan?.id || `khbd-${grade}-w${currentWeek}-${slot.day}-${slot.period}`,
      grade,
      className: currentClassName,
      teacherName: slotTeacherName,
      schoolName: schoolName,
      branchName: "Xã Tân Thạnh",
      week: currentWeek,
      day: slot.day,
      dayName: slot.dayName,
      dateStr: dateStr,
      period: slot.period,
      overallPeriodOfDay: slot.session === "Chiều" ? slot.period + 4 : slot.period,
      session: slot.session,
      subject: cleanSubject,
      subSubject: userSlotCustomPlan?.subSubject || concreteData.subSubject || subSubject,
      ppct: cumulativePpct,
      title: userSlotCustomPlan?.title || concreteData.title,
      goals: userSlotCustomPlan?.goals || concreteData.goals,
      materials: userSlotCustomPlan?.materials || concreteData.materials,
      activities: (userSlotCustomPlan?.activities && userSlotCustomPlan.activities.length > 0)
        ? userSlotCustomPlan.activities
        : concreteData.activities,
      adjustment: userSlotCustomPlan?.adjustment || concreteData.adjustment || ""
    });
  }

  return syncedPlans;
}
