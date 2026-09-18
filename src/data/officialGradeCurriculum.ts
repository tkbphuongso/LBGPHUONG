// officialGradeCurriculum.ts
// KẾ HOẠCH GIÁO DỤC VÀ PHÂN PHỐI CHƯƠNG TRÌNH CHÍNH THỨC NĂM HỌC 2026 - 2027
// Trích xuất trực tiếp từ các văn bản Kế hoạch Giáo dục Khối 1, Khối 2, Khối 3, Khối 4, Khối 5

import {
  GRADE_2_TIENG_VIET,
  GRADE_2_TOAN,
  GRADE_2_DAO_DUC,
  GRADE_2_TNXH,
  GRADE_2_HDTN,
  GRADE_2_GDTC,
  GRADE_2_AM_NHAC,
  GRADE_2_MI_THUAT,
  GRADE_2_TIENG_ANH
} from "./curriculumGrade2";

import {
  GRADE_3_TIENG_VIET,
  GRADE_3_TOAN,
  GRADE_3_DAO_DUC,
  GRADE_3_TNXH,
  GRADE_3_HDTN,
  GRADE_3_TIN_HOC,
  GRADE_3_CONG_NGHE,
  GRADE_3_GDTC,
  GRADE_3_AM_NHAC,
  GRADE_3_MI_THUAT,
  GRADE_3_TIENG_ANH
} from "./curriculumGrade3";

import {
  GRADE_4_TIENG_VIET,
  GRADE_4_TOAN,
  GRADE_4_KHOA_HOC,
  GRADE_4_DAO_DUC,
  GRADE_4_LS_DL,
  GRADE_4_CONG_NGHE,
  GRADE_4_HDTN,
  GRADE_4_TIN_HOC,
  GRADE_4_GDTC,
  GRADE_4_AM_NHAC,
  GRADE_4_MI_THUAT,
  GRADE_4_TIENG_ANH
} from "./curriculumGrade4";

import {
  GRADE_5_TIENG_VIET,
  GRADE_5_TOAN,
  GRADE_5_KHOA_HOC,
  GRADE_5_DAO_DUC,
  GRADE_5_LS_DL,
  GRADE_5_CONG_NGHE,
  GRADE_5_HDTN,
  GRADE_5_GDTC,
  GRADE_5_TIN_HOC,
  GRADE_5_AM_NHAC,
  GRADE_5_MI_THUAT,
  GRADE_5_TIENG_ANH
} from "./curriculumGrade5";

import { get35WeekCurriculumEntry } from "./curriculum35Weeks";

export interface CurriculumLessonEntry {
  week: number;
  periodInWeek: number; // 1, 2, 3...
  ppct: number; // Global PPCT lesson number
  title: string;
  subSubject?: string;
  integrationNote?: string;
  detailedGoals?: {
    specificCompetencies: string[];
    generalCompetencies: string[];
    qualities: string[];
    integration: string;
  };
}

// =========================================================================
// 1. KHỐI 1 - PHÂN PHỐI CHƯƠNG TRÌNH & TÍCH HỢP CHUẨN THEO VĂN BẢN KHỐI 1
// =========================================================================

export const GRADE_1_TIENG_VIET: CurriculumLessonEntry[] = [
  // Tuần 1: LÀM QUEN (12 tiết)
  {
    week: 1,
    periodInWeek: 1,
    ppct: 1,
    title: "Làm quen với trường lớp, bạn bè, đồ dùng học tập - Tiết 1",
    subSubject: "Làm quen",
    integrationNote: "Quyền con người: Nhận biết quyền học tập, vui chơi, kết bạn an toàn; KNS: Chào hỏi, giới thiệu bản thân, nền nếp lớp học.",
    detailedGoals: {
      specificCompetencies: [
        "Làm quen với môi trường trường lớp, thầy cô giáo và các bạn học sinh trong lớp 1.",
        "Nhận biết và gọi đúng tên các đồ dùng học tập cơ bản: Sách giáo khoa, Vở Tập viết, bảng con, hộp phấn, khăn lau, bút chì, thước kẻ.",
        "Bước đầu làm quen với các hiệu lệnh cơ bản trong lớp học: Giơ bảng, hạ bảng, cất đồ dùng."
      ],
      generalCompetencies: [
        "Tự chủ và tự học: Tự giác chuẩn bị đồ dùng học tập ngay ngắn trên mặt bàn.",
        "Giao tiếp và hợp tác: Tự tin nói tên mình, chào hỏi cô giáo và các bạn xung quanh."
      ],
      qualities: [
        "Yêu nước: Hào hứng, yêu mến ngôi trường Tiểu học mới.",
        "Trách nhiệm: Có ý thức giữ gìn, bảo quản đồ dùng học tập cá nhân sạch sẽ, bền đẹp."
      ],
      integration: "Tích hợp Quyền con người (Quyền học tập, vui chơi, kết bạn an toàn) & Kĩ năng sống (Chào hỏi, giới thiệu bản thân, thực hiện nền nếp lớp học)."
    }
  },
  {
    week: 1,
    periodInWeek: 2,
    ppct: 2,
    title: "Làm quen với trường lớp, bạn bè, đồ dùng học tập - Tiết 2",
    subSubject: "Làm quen",
    integrationNote: "Quyền con người: Quyền được tôn trọng trong giao tiếp; KNS: Kĩ năng lắng nghe và hợp tác cùng bạn.",
    detailedGoals: {
      specificCompetencies: [
        "Thực hành sử dụng đồ dùng học tập: Mở sách đúng trang, cầm phấn đúng cách, sử dụng khăn lau bảng ẩm.",
        "Thực hành giao tiếp giới thiệu bản thân và làm quen bạn cùng bàn.",
        "Nắm vững các khu vực chức năng trong trường lớp: Bàn ghế, góc thư viện lớp, nơi để cặp sách, nhà vệ sinh."
      ],
      generalCompetencies: [
        "Giao tiếp và hợp tác: Biết lắng nghe bạn nói, chia sẻ đồ dùng học tập thân thiện.",
        "Tự chủ: Tự sắp xếp góc học tập cá nhân ngăn nắp."
      ],
      qualities: [
        "Nhân ái: Hòa đồng, thân ái, giúp đỡ các bạn cùng lớp.",
        "Chăm chỉ: Chăm chú theo dõi và làm theo hướng dẫn của giáo viên."
      ],
      integration: "Tích hợp Kĩ năng sống (Giao tiếp lễ phép, ứng xử thân thiện, giữ gìn vệ sinh chung)."
    }
  },
  {
    week: 1,
    periodInWeek: 3,
    ppct: 3,
    title: "Làm quen với tư thế đọc viết nói nghe - Tiết 1",
    subSubject: "Làm quen tư thế",
    integrationNote: "KNS: Tự điều chỉnh tư thế đọc, viết, nói, nghe; giữ khoảng cách mắt - vở; QCN: Quyền được chăm sóc sức khỏe, an toàn.",
    detailedGoals: {
      specificCompetencies: [
        "Biết tư thế ngồi viết đúng: Lưng thẳng, không tì ngực vào bàn, đầu hơi cúi, mắt cách vở/bảng khoảng 25-30cm.",
        "Biết cách cầm bút/cầm phấn bằng 3 ngón tay (ngón cái, ngón trỏ, ngón giữa), bàn tay và cánh tay thả lỏng tự nhiên.",
        "Biết tư thế đứng đọc bài: Đứng thẳng, hai tay cầm sách mở rộng vừa tầm mắt, giọng đọc to, rõ ràng."
      ],
      generalCompetencies: [
        "Tự chủ: Tự giác rèn luyện và duy trì tư thế ngồi học khoa học.",
        "Giải quyết vấn đề: Tự phát hiện và sửa tư thế cúi gằm mặt hoặc tì ngực vào bàn."
      ],
      qualities: [
        "Chăm chỉ: Kiên trì luyện tập tư thế ngồi học chuẩn để bảo vệ cột sống và thị lực.",
        "Trách nhiệm: Có ý thức bảo vệ sức khỏe học đường của bản thân và nhắc nhở bạn cùng bàn."
      ],
      integration: "Tích hợp Kĩ năng sống (Rèn kĩ năng tự điều chỉnh tư thế đọc, viết, nói, nghe) & Giáo dục Quyền con người (Quyền được chăm sóc sức khỏe và học tập an toàn)."
    }
  },
  {
    week: 1,
    periodInWeek: 4,
    ppct: 4,
    title: "Làm quen với tư thế đọc viết nói nghe - Tiết 2",
    subSubject: "Làm quen tư thế",
    integrationNote: "KNS: Phòng tránh cong vẹo cột sống và tật khúc xạ mắt.",
    detailedGoals: {
      specificCompetencies: [
        "Thực hành thuần thục tư thế nghe: Hướng mắt về phía người nói, chú ý lắng nghe, không làm việc riêng.",
        "Thực hành tư thế nói: Mạnh dạn đứng lên phát biểu, nói rõ ràng, không e ngại.",
        "Luyện tập ngồi viết trên bảng con với khoảng cách mắt - bảng đúng chuẩn."
      ],
      generalCompetencies: [
        "Giao tiếp: Biết lắng nghe và biểu đạt ý kiến mạch lạc.",
        "Tự chủ: Tự chỉnh lại tư thế khi cô giáo gõ thước báo hiệu."
      ],
      qualities: [
        "Chăm chỉ: Nghiêm túc rèn luyện nề nếp ngồi học ngay ngắn.",
        "Kỉ luật: Tuân thủ nội quy lớp học."
      ],
      integration: "Tích hợp Kỹ năng sống & Chăm sóc sức khỏe học đường."
    }
  },
  {
    week: 1,
    periodInWeek: 5,
    ppct: 5,
    title: "Làm quen với các nét cơ bản, các chữ số, bảng chữ cái, dấu thanh - Tiết 1",
    subSubject: "Nét cơ bản & Dấu thanh",
    integrationNote: "Nhận diện nét sổ thẳng, nét ngang; thực hành trên bảng con.",
    detailedGoals: {
      specificCompetencies: [
        "Nhận biết và gọi đúng tên nét thẳng đứng (nét sổ) và nét ngang.",
        "Biết cách xác định dòng kẻ ô li trên bảng con (đường kẻ ngang 1, 2, 3, 4).",
        "Viết đúng nét thẳng đứng (cao 2 li) và nét ngang (rộng 2 li) trên bảng con."
      ],
      generalCompetencies: [
        "Tự chủ: Tự chuẩn bị bảng con, phấn trắng và khăn lau ẩm.",
        "Khéo léo: Điều khiển ngón tay đưa nét thẳng, đều đặn."
      ],
      qualities: [
        "Cẩn thận: Nắn nót viết đúng dòng kẻ, giữ bảng sạch sẽ.",
        "Kiên nhẫn: Luyện tập nhiều lần để nét chữ ngay ngắn."
      ],
      integration: "Tích hợp Học thông qua chơi (Trò chơi 'Cột cờ - Cầu treo tìm nét thẳng, nét ngang')."
    }
  },
  {
    week: 1,
    periodInWeek: 6,
    ppct: 6,
    title: "Làm quen với các nét cơ bản, các chữ số, bảng chữ cái, dấu thanh - Tiết 2",
    subSubject: "Nét cơ bản & Dấu thanh",
    integrationNote: "Nhận diện nét xiên trái, nét xiên phải, nét móc xuôi.",
    detailedGoals: {
      specificCompetencies: [
        "Nhận biết và gọi đúng tên nét xiên trái, nét xiên phải.",
        "Phân biệt hướng nghiêng của nét xiên trái và nét xiên phải.",
        "Viết đúng nét xiên trái và nét xiên phải cao 2 li vào bảng con."
      ],
      generalCompetencies: [
        "Tự chủ: Chủ động quan sát mẫu và đếm dòng kẻ.",
        "Khéo léo: Nối nét và điều chỉnh độ nghiêng chính xác."
      ],
      qualities: [
        "Chăm chỉ: Rèn viết đúng quy trình.",
        "Trách nhiệm: Lau bảng sạch sau khi thực hành."
      ],
      integration: "Tích hợp Học thông qua chơi (Trò chơi 'Mái nhà nghiêng')."
    }
  },
  {
    week: 1,
    periodInWeek: 7,
    ppct: 7,
    title: "Làm quen với các nét cơ bản, các chữ số, bảng chữ cái, dấu thanh - Tiết 3",
    subSubject: "Nét cơ bản & Dấu thanh",
    integrationNote: "Nhận diện nét móc ngược, nét móc hai đầu.",
    detailedGoals: {
      specificCompetencies: [
        "Nhận biết và gọi đúng tên nét móc ngược (móc dưới) và nét móc hai đầu.",
        "Viết đúng nét móc ngược cao 2 li, rộng 1 li vào bảng con.",
        "Biết điểm đặt bút và dừng bút của nét móc."
      ],
      generalCompetencies: [
        "Tự học: Quan sát cô viết mẫu và nhắc lại quy trình viết.",
        "Giao tiếp: Trao đổi nhận xét bài viết cùng bạn."
      ],
      qualities: [
        "Kiên trì: Rèn nét lượn cong ở chân nét móc.",
        "Cẩn thận: Viết chữ số và nét ngay ngắn."
      ],
      integration: "Tích hợp Kĩ năng sống (Tính cẩn thận, ngăn nắp)."
    }
  },
  {
    week: 1,
    periodInWeek: 8,
    ppct: 8,
    title: "Làm quen với các nét cơ bản, các chữ số, bảng chữ cái, dấu thanh - Tiết 4",
    subSubject: "Nét cơ bản & Dấu thanh",
    integrationNote: "Nhận diện nét cong hở phải, nét cong hở trái, nét cong kín.",
    detailedGoals: {
      specificCompetencies: [
        "Nhận biết và gọi đúng tên nét cong hở phải, nét cong hở trái và nét cong kín (chữ o).",
        "Viết đúng nét cong kín cao 2 li, rộng 1,5 li trên bảng con.",
        "Phát hiện nét cong kín xuất hiện trong các đồ vật thực tế: Bánh xe, mặt trời, quả cam."
      ],
      generalCompetencies: [
        "Tư duy trực quan: Liên hệ nét cong với hình tròn trong đời sống.",
        "Khéo léo: Đưa nét bút liền mạch tạo nét cong tròn đều."
      ],
      qualities: [
        "Chăm chỉ: Luyện tập vẽ các nét cong tròn trịa.",
        "Thẩm mĩ: Cảm nhận vẻ đẹp cân đối của nét chữ."
      ],
      integration: "Tích hợp Thẩm mĩ & Năng lực số (Quan sát hình ảnh đồ vật dạng tròn)."
    }
  },
  {
    week: 1,
    periodInWeek: 9,
    ppct: 9,
    title: "Làm quen với các nét cơ bản, các chữ số, bảng chữ cái, dấu thanh - Tiết 5",
    subSubject: "Nét khuyết & Dấu thanh",
    integrationNote: "Nhận diện nét khuyết xuôi, nét khuyết ngược, nét thắt.",
    detailedGoals: {
      specificCompetencies: [
        "Nhận biết và gọi đúng tên nét khuyết xuôi (cao 5 li), nét khuyết ngược (dài 5 li) và nét thắt.",
        "Tập viết nét khuyết xuôi trên bảng con theo đúng độ cao 5 ô li.",
        "Nhận biết 5 dấu thanh tiếng Việt: Dấu sắc (/), dấu huyền (\\), dấu hỏi (?), dấu ngã (~), dấu nặng (.)."
      ],
      generalCompetencies: [
        "Tự chủ: Nhận diện và gọi tên chính xác 5 dấu thanh.",
        "Vận động tinh: Rèn luyện cơ tay khi lia bút tạo nét khuyết."
      ],
      qualities: [
        "Kiên nhẫn: Vượt khó khi viết nét khuyết cao 5 li.",
        "Yêu quý tiếng Việt: Hào hứng tìm dấu thanh trong các tiếng quen thuộc."
      ],
      integration: "Tích hợp Học thông qua chơi (Trò chơi 'Chiếc nón dấu thanh kì diệu')."
    }
  },
  {
    week: 1,
    periodInWeek: 10,
    ppct: 10,
    title: "Làm quen với các nét cơ bản, các chữ số, bảng chữ cái, dấu thanh - Tiết 6",
    subSubject: "Bảng chữ cái & Chữ số",
    integrationNote: "Làm quen chữ số 0 đến 9 và các chữ cái trong bảng chữ cái tiếng Việt.",
    detailedGoals: {
      specificCompetencies: [
        "Nhận diện các chữ số từ 0 đến 9 trên bảng cài và bảng con.",
        "Nhận diện bảng chữ cái tiếng Việt (29 chữ cái) in thường và in hoa.",
        "Biết phân biệt chữ cái và chữ số trong các bài tập nhận diện trực quan."
      ],
      generalCompetencies: [
        "Tự học: Tự giác tìm chữ số và chữ cái trên thẻ học tập.",
        "Giao tiếp: Đọc to các chữ số 0, 1, 2, 3, 4, 5, 6, 7, 8, 9."
      ],
      qualities: [
        "Chăm chỉ: Ôn tập bảng chữ cái và chữ số hào hứng.",
        "Trách nhiệm: Thu dọn bộ thẻ học tập gọn gàng sau tiết học."
      ],
      integration: "Tích hợp Năng lực số (Quan sát bảng chữ cái điện tử tương tác)."
    }
  },
  {
    week: 1,
    periodInWeek: 11,
    ppct: 11,
    title: "Ôn luyện viết các nét cơ bản, đọc âm - Tiết 1",
    subSubject: "Ôn luyện viết nét",
    integrationNote: "Ôn tập tổng hợp các nét thẳng, xiên, móc, cong, khuyết trên bảng con.",
    detailedGoals: {
      specificCompetencies: [
        "Củng cố và viết thuần thục các nét cơ bản: Nét thẳng, nét xiên, nét móc, nét cong kín, nét khuyết xuôi.",
        "Viết các nét thẳng hàng, đúng độ cao, độ rộng và giữ khoảng cách đều nhau.",
        "Sửa dứt điểm các lỗi viết lệch dòng kẻ, nét cong bị méo."
      ],
      generalCompetencies: [
        "Tự chủ: Tự soát lỗi bài viết của mình trên bảng con.",
        "Hợp tác: Đổi bảng con nhận xét bài viết cùng bạn bên cạnh."
      ],
      qualities: [
        "Cẩn thận: Rèn tính cẩn thận, kiên trì, tỉ mỉ trong từng nét bút.",
        "Tự tin: Tự tin giơ bảng con khoe bài viết đẹp trước lớp."
      ],
      integration: "Tích hợp Kĩ năng sống (Rèn tính cẩn thận, kiên trì và tự đánh giá)."
    }
  },
  {
    week: 1,
    periodInWeek: 12,
    ppct: 12,
    title: "Ôn luyện viết các nét cơ bản, đọc âm - Tiết 2",
    subSubject: "Ôn luyện đọc âm",
    integrationNote: "Ôn luyện nhận diện âm chữ cái đầu năm, chuẩn bị cho Bài 1 Tuần 2.",
    detailedGoals: {
      specificCompetencies: [
        "Đọc đúng và nhận diện nhanh các âm chữ cái và chữ số đã làm quen trong tuần.",
        "Thực hành ghép các nét cơ bản tạo thành chữ cái đơn giản (nét cong kín + nét móc ngược = chữ a).",
        "Sẵn sàng tâm thế học tập và đồ dùng cho tuần học âm vần chính thức (Tuần 2: Bài 1: A a, B b)."
      ],
      generalCompetencies: [
        "Tự học: Ôn luyện kiến thức tuần 1 thuần thục.",
        "Giao tiếp: Báo cáo với cô giáo những điều em đã học được trong tuần làm quen đầu tiên."
      ],
      qualities: [
        "Tự hào: Tự hào khi đã làm quen và sẵn sàng là một học sinh lớp 1 chăm ngoan.",
        "Yêu trường lớp: Gắn bó với cô giáo và bạn bè."
      ],
      integration: "Tích hợp Giáo dục quyền trẻ em & Khuyến khích niềm yêu thích học tập."
    }
  },

  // Tuần 2: BÀI 1 ĐẾN BÀI 5 (12 tiết)
  {
    week: 2,
    periodInWeek: 1,
    ppct: 13,
    title: "Bài 1: A a - Tiết 1",
    subSubject: "Âm / Chữ",
    integrationNote: "Nhận biết âm a, chữ A, a; đọc tiếng và từ khóa chứa âm a.",
  },
  {
    week: 2,
    periodInWeek: 2,
    ppct: 14,
    title: "Bài 1: A a - Tiết 2",
    subSubject: "Tập viết & Luyện đọc",
    integrationNote: "Viết chữ a cỡ vừa trên bảng con và Vở Tập viết 1.",
  },
  {
    week: 2,
    periodInWeek: 3,
    ppct: 15,
    title: "Bài 2: B b - Tiết 1",
    subSubject: "Âm / Chữ",
    integrationNote: "Nhận biết âm b, chữ B, b; ghép tiếng ba.",
  },
  {
    week: 2,
    periodInWeek: 4,
    ppct: 16,
    title: "Bài 2: B b - Tiết 2",
    subSubject: "Tập viết & Luyện đọc",
    integrationNote: "Viết chữ b, tiếng ba; đọc câu ứng dụng.",
  },
  {
    week: 2,
    periodInWeek: 5,
    ppct: 17,
    title: "Bài 3: C c / - Tiết 1",
    subSubject: "Âm / Chữ / Thanh sắc",
    integrationNote: "Làm quen âm c, chữ C c và dấu thanh sắc (/); đọc ca, cá.",
  },
  {
    week: 2,
    periodInWeek: 6,
    ppct: 18,
    title: "Bài 3: C c / - Tiết 2",
    subSubject: "Tập viết",
    integrationNote: "Viết chữ c, dấu sắc, tiếng cá vào vở tập viết.",
  },
  {
    week: 2,
    periodInWeek: 7,
    ppct: 19,
    title: "Bài 4: E e Ê ê - Tiết 1",
    subSubject: "Âm / Chữ",
    integrationNote: "Nhận biết âm e, ê; chữ E e, Ê ê; đọc me, bê.",
  },
  {
    week: 2,
    periodInWeek: 8,
    ppct: 20,
    title: "Bài 4: E e Ê ê - Tiết 2",
    subSubject: "Tập viết",
    integrationNote: "Viết chữ e, ê; đọc câu ứng dụng bé có me.",
  },
  {
    week: 2,
    periodInWeek: 9,
    ppct: 21,
    title: "Bài 5: Ôn tập và kể chuyện - Tiết 1",
    subSubject: "Ôn tập âm chữ",
    integrationNote: "Hệ thống hóa âm a, b, c, e, ê và dấu sắc.",
  },
  {
    week: 2,
    periodInWeek: 10,
    ppct: 22,
    title: "Bài 5: Ôn tập và kể chuyện - Tiết 2",
    subSubject: "Kể chuyện",
    integrationNote: "Lý tưởng cách mạng, đạo đức, lối sống: Qua truyện 'Búp bê và dế mèn', giáo dục HS biết tự giác giúp việc nhà phù hợp với khả năng; yêu thương và chia sẻ.",
  },
  {
    week: 2,
    periodInWeek: 11,
    ppct: 23,
    title: "Ôn luyện tuần 1 - Tiết 1",
    subSubject: "Tăng cường",
    integrationNote: "Luyện đọc trơn các tiếng, từ ngữ đã học trong tuần 2.",
  },
  {
    week: 2,
    periodInWeek: 12,
    ppct: 24,
    title: "Ôn luyện tuần 1 - Tiết 2",
    subSubject: "Tăng cường",
    integrationNote: "Rèn viết chữ a, b, c, e, ê, ba, cá, bê nắn nót vào vở ô li.",
  }
];

// =========================================================================
// 2. KHỐI 1 - MÔN TOÁN CHUẨN THEO VĂN BẢN KHỐI 1
// =========================================================================

export const GRADE_1_TOAN: CurriculumLessonEntry[] = [
  // Tuần 1:
  {
    week: 1,
    periodInWeek: 1,
    ppct: 1,
    title: "Tiết học đầu tiên",
    subSubject: "Làm quen môn Toán",
    integrationNote: "Tích hợp AI: 1.A2.1: Nhận biết nhân vật Rô-bốt là đại diện AI hỗ trợ con người học tập; thảo luận vì sao bạn Rô-bốt có thể học Toán cùng chúng ta.",
    detailedGoals: {
      specificCompetencies: [
        "Làm quen với sách giáo khoa Toán 1 (bộ sách Kết nối tri thức với cuộc sống), các ký hiệu và cấu trúc bài học.",
        "Nhận biết và làm quen với bộ đồ dùng học Toán 1: Que tính, các khối lập phương, các thẻ chữ số và dấu phép tính.",
        "Làm quen với nhân vật bạn Rô-bốt thông minh sẽ đồng hành cùng các em xuyên suốt chương trình môn Toán cấp Tiểu học."
      ],
      generalCompetencies: [
        "Tự chủ và tự học: Tự mở sách Toán đúng trang, biết cất giữ que tính và khối hình cẩn thận.",
        "Giao tiếp toán học: Mạnh dạn trả lời câu hỏi và tham gia thảo luận cùng bạn."
      ],
      qualities: [
        "Chăm chỉ: Yêu thích khám phá các con số và thế giới toán học diệu kì.",
        "Trách nhiệm: Giữ gìn sách vở và đồ dùng học Toán sạch sẽ, không làm mất que tính."
      ],
      integration: "Tích hợp AI (1.A2.1: Nhận biết nhân vật Rô-bốt là hình ảnh của trí tuệ nhân tạo hỗ trợ học tập) & Kĩ năng sống (Sắp xếp đồ dùng học Toán ngăn nắp)."
    }
  },
  {
    week: 1,
    periodInWeek: 2,
    ppct: 2,
    title: "Bài 1: Các số 0, 1, 2, 3, 4, 5 (Tiết 1)",
    subSubject: "Số học",
    integrationNote: "Đếm, đọc, viết các số 1, 2, 3; liên hệ số lượng đồ vật trong lớp học.",
    detailedGoals: {
      specificCompetencies: [
        "Biết đếm từ 1 đến 3 qua các đồ vật cụ thể (1 con mèo, 2 chú chim, 3 bông hoa).",
        "Đọc và viết đúng chữ số 1, 2, 3 cỡ vừa trên bảng con.",
        "Lấy đúng số lượng que tính tương ứng với chữ số 1, 2, 3."
      ],
      generalCompetencies: [
        "Tư duy toán học: So sánh và tương ứng 1-1 giữa đồ vật và số lượng.",
        "Khéo léo: Viết đúng quy trình nét chữ số 1, 2, 3."
      ],
      qualities: [
        "Chăm chỉ: Tích cực giơ thẻ số và đếm to rõ ràng.",
        "Cẩn thận: Nắn nót viết từng chữ số đúng ô li."
      ],
      integration: "Tích hợp Học thông qua chơi (Trò chơi 'Gió thổi 1, 2, 3 đồ vật')."
    }
  },
  {
    week: 1,
    periodInWeek: 3,
    ppct: 3,
    title: "Bài 1: Các số 0, 1, 2, 3, 4, 5 (Tiết 2)",
    subSubject: "Số học",
    integrationNote: "Đếm, đọc, viết các số 4, 5 và số 0; nhận biết ý nghĩa số 0 (không có gì).",
    detailedGoals: {
      specificCompetencies: [
        "Biết đếm từ 1 đến 5; nhận biết và viết đúng chữ số 4, chữ số 5 và chữ số 0.",
        "Hiểu ý nghĩa số 0: Chỉ số lượng rỗng (không có con cá nào trong đĩa).",
        "Đọc và viết thành thạo dãy số từ 0 đến 5 theo thứ tự xuôi và ngược."
      ],
      generalCompetencies: [
        "Giao tiếp toán học: Nói to câu trả lời: 'Có 4 bạn nhỏ, có 5 quả bóng'.",
        "Tự học: Tự gài các thẻ số từ 0 đến 5 lên bảng cài theo thứ tự."
      ],
      qualities: [
        "Chăm chỉ: Luyện viết số 0, 4, 5 vào bảng con đều và đẹp.",
        "Kỉ luật: Ngồi đúng tư thế khi viết bảng."
      ],
      integration: "Tích hợp Học thông qua chơi (Trò chơi 'Đố bạn tìm đủ 5 ngón tay xinh')."
    }
  },
  {
    week: 1,
    periodInWeek: 4,
    ppct: 4,
    title: "Luyện tập: Các số 0, 1, 2, 3, 4, 5 (Tiết tăng cường 1)",
    subSubject: "Luyện tập Toán",
    integrationNote: "Củng cố đếm và nhận diện số lượng trong phạm vi 5.",
  },
  {
    week: 1,
    periodInWeek: 5,
    ppct: 5,
    title: "Luyện tập: Các số 0, 1, 2, 3, 4, 5 (Tiết tăng cường 2)",
    subSubject: "Luyện tập Toán",
    integrationNote: "Rèn viết chữ số 0, 1, 2, 3, 4, 5 vào vở ô li thực hành.",
  },
  {
    week: 1,
    periodInWeek: 6,
    ppct: 6,
    title: "Luyện tập: Các số 0, 1, 2, 3, 4, 5 (Tiết tăng cường 3)",
    subSubject: "Luyện tập Toán",
    integrationNote: "Thực hành nối số lượng đồ vật tương ứng với chữ số thích hợp.",
  },

  // Tuần 2:
  {
    week: 2,
    periodInWeek: 1,
    ppct: 4,
    title: "Bài 1: Các số 0, 1, 2, 3, 4, 5 (Tiết 3)",
    subSubject: "Luyện tập",
    integrationNote: "Luyện tập đếm, so sánh thứ tự từ bé đến lớn và từ lớn đến bé từ 0 đến 5.",
  },
  {
    week: 2,
    periodInWeek: 2,
    ppct: 5,
    title: "Bài 2: Các số 6, 7, 8, 9, 10 - Tiết 1",
    subSubject: "Số học",
    integrationNote: "Đếm, đọc, viết các số 6, 7, 8; liên hệ số lượng thực tế.",
  },
  {
    week: 2,
    periodInWeek: 3,
    ppct: 6,
    title: "Bài 2: Các số 6, 7, 8, 9, 10 - Tiết 2 (Bài học STEM)",
    subSubject: "Bài học STEM",
    integrationNote: "Thay bằng Bài học STEM: Trải nghiệm cùng khay 10 học Toán (2 tiết).",
  }
];

// =========================================================================
// 3. KHỐI 1 - MÔN ĐẠO ĐỨC CHUẨN THEO VĂN BẢN KHỐI 1
// =========================================================================

export const GRADE_1_DAO_DUC: CurriculumLessonEntry[] = [
  {
    week: 1,
    periodInWeek: 1,
    ppct: 1,
    title: "Bài 1: Em giữ sạch đôi tay",
    subSubject: "Tự chăm sóc bản thân",
    integrationNote: "Quyền chăm sóc sức khỏe: Sống trong môi trường sạch sẽ; Bổn phận trẻ em: Tự giác rửa tay sạch sẽ bảo vệ sức khỏe.",
    detailedGoals: {
      specificCompetencies: [
        "Nêu được lí do vì sao phải giữ sạch đôi tay (đôi tay sạch giúp phòng tránh vi khuẩn và bệnh giun sán, bệnh tay chân miệng).",
        "Nhận biết các thời điểm quan trọng cần rửa tay: Trước khi ăn, sau khi đi vệ sinh, khi tay bị bẩn và sau khi chơi đùa.",
        "Thực hành đúng quy trình 6 bước rửa tay bằng xà phòng và nước sạch theo khuyến cáo của Bộ Y tế."
      ],
      generalCompetencies: [
        "Tự chủ và tự chăm sóc: Tự giác thực hiện thói quen rửa tay sạch hằng ngày ở nhà và ở trường.",
        "Giao tiếp: Biết nhắc nhở bạn cùng bàn cùng rửa tay sạch sẽ trước giờ ăn trưa bán trú."
      ],
      qualities: [
        "Chăm chỉ: Thường xuyên giữ gìn vệ sinh cá nhân sạch sẽ, gọn gàng.",
        "Trách nhiệm: Có ý thức bảo vệ sức khỏe bản thân và cộng đồng lớp học."
      ],
      integration: "Tích hợp Giáo dục Quyền con người (Quyền được chăm sóc sức khỏe) & Bổn phận trẻ em đối với bản thân (Tự giác bảo vệ sức khỏe)."
    }
  },
  {
    week: 2,
    periodInWeek: 1,
    ppct: 2,
    title: "Bài 2: Em giữ sạch răng miệng",
    subSubject: "Tự chăm sóc bản thân",
    integrationNote: "QCN: Quyền được chăm sóc sức khỏe; ĐĐLS: Hình thành ý thức giữ vệ sinh, sống lành mạnh, tự tin khi giao tiếp.",
  },
  {
    week: 3,
    periodInWeek: 1,
    ppct: 3,
    title: "Bài 3: Em tắm, gội sạch sẽ",
    subSubject: "Tự chăm sóc bản thân",
    integrationNote: "QCN: Quyền được sống trong môi trường sạch sẽ; KNS: Kĩ năng tự phục vụ, tắm gội sạch sẽ.",
  },
  {
    week: 4,
    periodInWeek: 1,
    ppct: 4,
    title: "Bài 4: Em giữ trang phục gọn gàng, sạch sẽ",
    subSubject: "Tự chăm sóc bản thân",
    integrationNote: "Quyền mặc trang phục sạch sẽ, an toàn; Bổn phận giữ trang phục gọn gàng, nếp sống văn minh.",
  }
];

// =========================================================================
// 4. KHỐI 1 - MÔN TỰ NHIÊN VÀ XÃ HỘI (TNXH) CHUẨN THEO VĂN BẢN KHỐI 1
// =========================================================================

export const GRADE_1_TNXH: CurriculumLessonEntry[] = [
  {
    week: 1,
    periodInWeek: 1,
    ppct: 1,
    title: "Bài 1: Kể về gia đình – Tiết 1",
    subSubject: "Chủ đề 1: Gia đình",
    integrationNote: "Quyền con người: Quyền được sum họp với gia đình; Quyền được lắng nghe ý kiến.",
    detailedGoals: {
      specificCompetencies: [
        "Kể được các thành viên trong gia đình mình (ông, bà, bố, mẹ, anh, chị, em).",
        "Nói được công việc, sở thích và những hoạt động sum họp thường ngày của gia đình.",
        "Cảm nhận được tình yêu thương, sự chăm sóc chu đáo của người thân dành cho em."
      ],
      generalCompetencies: [
        "Giao tiếp: Tự tin giới thiệu về bức ảnh gia đình mình trước lớp.",
        "Hợp tác: Lắng nghe bạn giới thiệu và bày tỏ sự tôn trọng đối với hoàn cảnh gia đình của bạn."
      ],
      qualities: [
        "Yêu gia đình: Kính trọng, yêu quý ông bà, cha mẹ và người thân.",
        "Nhân ái: Biết chia sẻ niềm vui gia đình với bạn bè."
      ],
      integration: "Tích hợp Giáo dục Quyền con người (Quyền được sum họp với gia đình; Quyền được lắng nghe ý kiến)."
    }
  },
  {
    week: 1,
    periodInWeek: 2,
    ppct: 2,
    title: "Bài 1: Kể về gia đình – Tiết 2",
    subSubject: "Chủ đề 1: Gia đình",
    integrationNote: "Quyền sum họp gia đình, bổn phận trẻ em: Biết chia sẻ, phụ giúp việc nhà, tôn trọng và yêu thương các thành viên.",
    detailedGoals: {
      specificCompetencies: [
        "Nêu được những việc làm vừa sức để phụ giúp gia đình: Nhặt rau, dọn đồ chơi, cất giày dép, rót nước mời ông bà.",
        "Bày tỏ thái độ kính trọng, lễ phép và yêu thương đối với các thành viên trong gia đình.",
        "Vẽ một bức tranh hoặc giới thiệu một món quà nhỏ em muốn dành tặng cho người thân."
      ],
      generalCompetencies: [
        "Tự chủ: Chủ động làm những việc nhà nhỏ phù hợp với lứa tuổi mà không cần bố mẹ nhắc nhở.",
        "Giao tiếp: Nói lời yêu thương, cảm ơn bố mẹ chân thành."
      ],
      qualities: [
        "Hiếu thảo: Biết chăm sóc, quan tâm ông bà, cha mẹ.",
        "Trách nhiệm: Có ý thức gìn giữ tổ ấm gia đình luôn vui vẻ, hạnh phúc."
      ],
      integration: "Tích hợp Quyền con người & Bổn phận của trẻ em với gia đình (Biết chia sẻ, phụ giúp việc nhà, yêu thương người thân)."
    }
  },
  {
    week: 2,
    periodInWeek: 1,
    ppct: 3,
    title: "Bài 2: Ngôi nhà của em – Tiết 1",
    subSubject: "Chủ đề 1: Gia đình",
    integrationNote: "Giáo dục quyền con người: Học sinh được thực hiện quyền có nơi ở an toàn, được sống cùng gia đình; giữ gìn ngôi nhà.",
  },
  {
    week: 2,
    periodInWeek: 2,
    ppct: 4,
    title: "Bài 2: Ngôi nhà của em – Tiết 2",
    subSubject: "Chủ đề 1: Gia đình",
    integrationNote: "Quyền có nơi ở; QPAN; Giáo dục lý tưởng cách mạng, đạo đức lối sống: Yêu quý, giữ gìn ngôi nhà, trân trọng tổ ấm.",
  }
];

// =========================================================================
// 5. KHỐI 1 - MÔN HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN) CHUẨN THEO VĂN BẢN KHỐI 1
// =========================================================================

export const GRADE_1_HDTN: CurriculumLessonEntry[] = [
  {
    week: 1,
    periodInWeek: 1,
    ppct: 1,
    title: "Sinh hoạt dưới cờ: Lễ Khai giảng năm học mới",
    subSubject: "Sinh hoạt dưới cờ",
    integrationNote: "Tham gia lễ khai giảng trang nghiêm; bồi dưỡng tình yêu trường lớp, tự hào là học sinh lớp 1.",
    detailedGoals: {
      specificCompetencies: [
        "Tham gia Lễ Khai giảng năm học mới 2026 - 2027 với trang phục chỉnh tề, thái độ nghiêm túc, trang nghiêm.",
        "Lắng nghe thư của Chủ tịch nước và tiếng trống khai trường rộn rã đầu năm học.",
        "Cảm nhận niềm hân hoan, tự hào và tự tin khi chính thức bước vào cổng trường Tiểu học."
      ],
      generalCompetencies: [
        "Thích ứng với môi trường: Nhanh chóng làm quen với không khí sinh hoạt tập thể toàn trường.",
        "Kỉ luật: Xếp hàng ngay ngắn, giữ trật tự theo hướng dẫn của giáo viên chủ nhiệm và tổng phụ trách đội."
      ],
      qualities: [
        "Yêu nước: Tự hào về đất nước, trang nghiêm khi chào cờ và hát Quốc ca.",
        "Trách nhiệm: Nêu cao ý thức giữ gìn vệ sinh chung trong ngày hội khai trường."
      ],
      integration: "Giáo dục truyền thống yêu nước, tự hào dân tộc và lòng yêu mái trường."
    }
  },
  {
    week: 1,
    periodInWeek: 2,
    ppct: 2,
    title: "Bài 1: Làm quen với bạn mới",
    subSubject: "Hoạt động giáo dục theo chủ đề",
    integrationNote: "Quyền con người: Tự do biểu đạt; NLS 2.3.CB1a: Giao tiếp lịch sự khi tham gia nhóm lớp hoặc hoạt động trực tuyến.",
    detailedGoals: {
      specificCompetencies: [
        "Tự tin giới thiệu họ tên, sở thích, ước mơ của bản thân trước các bạn trong lớp.",
        "Biết cách làm quen, chào hỏi và bắt tay thân thiện với bạn mới ngồi cùng bàn, cùng tổ.",
        "Nhớ được tên của ít nhất 3-5 bạn mới trong lớp 1 của mình."
      ],
      generalCompetencies: [
        "Giao tiếp và hợp tác: Biết lắng nghe lời giới thiệu của bạn, giao tiếp cởi mở, không e thẹn.",
        "Tự chủ: Tự giác tham gia trò chơi kết bạn."
      ],
      qualities: [
        "Nhân ái: Hòa đồng, thân thiện, không phân biệt đối xử với bạn bè.",
        "Tôn trọng: Tôn trọng sở thích và sự khác biệt của mỗi bạn trong lớp."
      ],
      integration: "Tích hợp Giáo dục Quyền con người (Quyền được tự do biểu đạt) & Năng lực số 2.3.CB1a (Giao tiếp, hợp tác trong môi trường số lịch sự)."
    }
  },
  {
    week: 1,
    periodInWeek: 3,
    ppct: 3,
    title: "Sinh hoạt lớp: Sơ kết tuần 1, lập kế hoạch tuần tới",
    subSubject: "Sinh hoạt lớp",
    integrationNote: "Đánh giá nền nếp tuần làm quen đầu tiên; khen ngợi học sinh tích cực, phổ biến nội quy tuần 2.",
    detailedGoals: {
      specificCompetencies: [
        "Tổng kết, nhìn lại những việc đã làm tốt trong tuần học làm quen đầu tiên (nề nếp xếp hàng, chào hỏi, giữ gìn sách vở).",
        "Nêu được phương hướng, nhiệm vụ của tuần học tới (chuẩn bị bước vào học các bài âm chữ chính thức).",
        "Tập bình bầu và biểu dương các bạn có ý thức học tập tốt, đi học đúng giờ trong tuần 1."
      ],
      generalCompetencies: [
        "Tự nhận thức và tự đánh giá: Tự đánh giá hành vi và sự tiến bộ của bản thân.",
        "Hợp tác: Lắng nghe ý kiến nhận xét của cô giáo và ban cán sự lớp."
      ],
      qualities: [
        "Trung thực: Nhận xét bản thân và bạn bè khách quan, thân ái.",
        "Trách nhiệm: Quyết tâm thực hiện tốt kế hoạch rèn luyện trong tuần tiếp theo."
      ],
      integration: "Kĩ năng sống: Rèn kĩ năng tự đánh giá, phản hồi tích cực và xây dựng văn hóa lớp học đoàn kết."
    }
  }
];

let currentQuerySubject = "";
let currentQueryGrade = 1;

/**
 * Helper to match a lesson entry from a curriculum list by PPCT or week+period
 */
function findInCurriculumList(
  list: CurriculumLessonEntry[],
  ppct: number,
  week: number,
  subject?: string,
  grade?: number
): CurriculumLessonEntry {
  if (list && list.length > 0) {
    // 1. Exact week & periodInWeek match
    const byWeekAndPeriod = list.find((item) => item.week === week && (item.periodInWeek === ppct || item.ppct === ppct));
    if (byWeekAndPeriod) return byWeekAndPeriod;

    // 2. Exact PPCT match if within the specified week
    const byPpct = list.find((item) => item.ppct === ppct && (item.week === week || week === 1));
    if (byPpct) return byPpct;

    // 3. Match within the specified week
    const weekItems = list.filter((item) => item.week === week);
    if (weekItems.length > 0) {
      const idx = (ppct - 1) % weekItems.length;
      return weekItems[idx];
    }

    // 4. Index in whole array ONLY if week === 1
    if (week === 1 && ppct >= 1 && ppct <= list.length) {
      return list[ppct - 1];
    }
  }

  // 5. If week > 1 and list has no entries for this week, seamlessly query 35-week curriculum engine
  const targetSubj = subject || currentQuerySubject || "Môn học";
  const targetGrade = grade || currentQueryGrade || 1;
  return get35WeekCurriculumEntry(targetSubj, targetGrade, ppct, week);
}

/**
 * Tra cứu dữ liệu bài dạy chuẩn theo đúng Phân phối chương trình trường
 */
export function getOfficialLessonEntry(
  subject: string,
  grade: number,
  ppct: number,
  week: number = 1
): CurriculumLessonEntry {
  currentQuerySubject = subject;
  currentQueryGrade = grade;
  const normSubj = subject.toLowerCase().trim();

  // ---------------------------------------------------------
  // KHỐI 1
  // ---------------------------------------------------------
  if (grade === 1) {
    if (normSubj.includes("tiếng việt") || normSubj.includes("tv") || normSubj.includes("lt t.việt") || normSubj.includes("l.t việt")) {
      const exact = GRADE_1_TIENG_VIET.find((item) => item.ppct === ppct);
      if (exact) return exact;
      if (week === 1 && ppct >= 1 && ppct <= GRADE_1_TIENG_VIET.length) {
        return GRADE_1_TIENG_VIET[ppct - 1];
      }
      if (week === 1) {
        return {
          week: 1,
          periodInWeek: ppct,
          ppct: ppct,
          title: `Làm quen và ôn luyện các nét cơ bản, đọc âm (Tiết ${ppct})`,
          subSubject: "Làm quen",
          integrationNote: "Rèn luyện tư thế ngồi viết và nề nếp lớp học."
        };
      }
    }

    if (normSubj.includes("toán") || normSubj.includes("math") || normSubj.includes("lt.toán") || normSubj.includes("t.cường t")) {
      const exact = GRADE_1_TOAN.find((item) => item.ppct === ppct);
      if (exact) return exact;
      if (week === 1 && ppct >= 1 && ppct <= GRADE_1_TOAN.length) {
        return GRADE_1_TOAN[ppct - 1];
      }
      if (week === 1) {
        return {
          week: 1,
          periodInWeek: ppct,
          ppct: ppct,
          title: `Bài 1: Các số 0, 1, 2, 3, 4, 5 (Luyện tập Tiết ${ppct})`,
          subSubject: "Số học",
          integrationNote: "Tích hợp AI: 1.A2.1 - Nhận biết nhân vật Rô-bốt hỗ trợ học tập."
        };
      }
    }

    if (normSubj.includes("đạo đức")) {
      const exact = GRADE_1_DAO_DUC.find((item) => item.week === week || item.ppct === ppct);
      if (exact) return exact;
      return GRADE_1_DAO_DUC[0];
    }

    if (normSubj.includes("tự nhiên") || normSubj.includes("tnxh") || normSubj.includes("xã hội")) {
      const exact = GRADE_1_TNXH.find((item) => item.ppct === ppct);
      if (exact) return exact;
      if (week === 1 && ppct <= 2) return GRADE_1_TNXH[ppct - 1] || GRADE_1_TNXH[0];
      return GRADE_1_TNXH[0];
    }

    if (normSubj.includes("trải nghiệm") || normSubj.includes("hđtn") || normSubj.includes("t. nghiệm")) {
      const exact = GRADE_1_HDTN.find((item) => item.ppct === ppct || item.periodInWeek === ppct);
      if (exact) return exact;
      if (ppct >= 1 && ppct <= GRADE_1_HDTN.length) return GRADE_1_HDTN[ppct - 1];
      return GRADE_1_HDTN[0];
    }
  }

  // ---------------------------------------------------------
  // KHỐI 2
  // ---------------------------------------------------------
  if (grade === 2) {
    if (normSubj.includes("tiếng việt") || normSubj.includes("tv")) {
      if (normSubj.includes("tc") || normSubj.includes("tăng cường") || normSubj.includes("tctv") || normSubj.includes("lt")) {
        return {
          week,
          periodInWeek: ppct,
          ppct,
          title: `Luyện tập Tiếng Việt: Củng cố rèn chữ, đọc hiểu tuần ${week}`,
          subSubject: "Luyện tập",
          integrationNote: "Rèn chữ viết và củng cố kĩ năng đọc hiểu."
        };
      }
      return findInCurriculumList(GRADE_2_TIENG_VIET, ppct, week);
    }
    if (normSubj.includes("toán") || normSubj.includes("math")) {
      if (normSubj.includes("tc") || normSubj.includes("tăng cường") || normSubj.includes("tct") || normSubj.includes("lt")) {
        return {
          week,
          periodInWeek: ppct,
          ppct,
          title: `Luyện tập Toán: Củng cố phép cộng, trừ có nhớ tuần ${week}`,
          subSubject: "Luyện tập",
          integrationNote: "Rèn kĩ năng tính toán và giải toán có lời văn."
        };
      }
      return findInCurriculumList(GRADE_2_TOAN, ppct, week);
    }
    if (normSubj.includes("tự nhiên") || normSubj.includes("tnxh") || normSubj.includes("xã hội")) {
      return findInCurriculumList(GRADE_2_TNXH, ppct, week);
    }
    if (normSubj.includes("đạo đức")) {
      return findInCurriculumList(GRADE_2_DAO_DUC, ppct, week);
    }
    if (normSubj.includes("trải nghiệm") || normSubj.includes("hđtn") || normSubj.includes("t. nghiệm")) {
      return findInCurriculumList(GRADE_2_HDTN, ppct, week);
    }
    if (normSubj.includes("thể chất") || normSubj.includes("gdtc") || normSubj.includes("thể dục")) {
      return findInCurriculumList(GRADE_2_GDTC, ppct, week);
    }
    if (normSubj.includes("âm nhạc")) {
      return findInCurriculumList(GRADE_2_AM_NHAC, ppct, week);
    }
    if (normSubj.includes("mĩ thuật") || normSubj.includes("mỹ thuật")) {
      return findInCurriculumList(GRADE_2_MI_THUAT, ppct, week);
    }
    if (normSubj.includes("tiếng anh") || normSubj.includes("anh văn") || normSubj.includes("english")) {
      return findInCurriculumList(GRADE_2_TIENG_ANH, ppct, week);
    }
  }

  // ---------------------------------------------------------
  // KHỐI 3
  // ---------------------------------------------------------
  if (grade === 3) {
    if (normSubj.includes("tiếng việt") || normSubj.includes("tv")) {
      if (normSubj.includes("tc") || normSubj.includes("tăng cường") || normSubj.includes("tctv") || normSubj.includes("lt")) {
        return {
          week,
          periodInWeek: ppct,
          ppct,
          title: `Luyện tập Tiếng Việt: Củng cố từ chỉ đặc điểm, so sánh tuần ${week}`,
          subSubject: "Luyện tập",
          integrationNote: "Rèn kĩ năng dùng từ và đặt câu."
        };
      }
      return findInCurriculumList(GRADE_3_TIENG_VIET, ppct, week);
    }
    if (normSubj.includes("toán") || normSubj.includes("math")) {
      if (normSubj.includes("tc") || normSubj.includes("tăng cường") || normSubj.includes("tct") || normSubj.includes("lt")) {
        return {
          week,
          periodInWeek: ppct,
          ppct,
          title: `Luyện tập Toán: Củng cố bảng nhân, chia tuần ${week}`,
          subSubject: "Luyện tập",
          integrationNote: "Rèn kĩ năng tính toán và giải toán có lời văn."
        };
      }
      return findInCurriculumList(GRADE_3_TOAN, ppct, week);
    }
    if (normSubj.includes("tự nhiên") || normSubj.includes("tnxh") || normSubj.includes("xã hội")) {
      return findInCurriculumList(GRADE_3_TNXH, ppct, week);
    }
    if (normSubj.includes("đạo đức")) {
      return findInCurriculumList(GRADE_3_DAO_DUC, ppct, week);
    }
    if (normSubj.includes("trải nghiệm") || normSubj.includes("hđtn") || normSubj.includes("t. nghiệm")) {
      return findInCurriculumList(GRADE_3_HDTN, ppct, week);
    }
    if (normSubj.includes("tin học") || normSubj.includes("tin") || normSubj.includes("th")) {
      return findInCurriculumList(GRADE_3_TIN_HOC, ppct, week);
    }
    if (normSubj.includes("công nghệ") || normSubj.includes("cn")) {
      return findInCurriculumList(GRADE_3_CONG_NGHE, ppct, week);
    }
    if (normSubj.includes("thể chất") || normSubj.includes("gdtc") || normSubj.includes("thể dục")) {
      return findInCurriculumList(GRADE_3_GDTC, ppct, week);
    }
    if (normSubj.includes("âm nhạc")) {
      return findInCurriculumList(GRADE_3_AM_NHAC, ppct, week);
    }
    if (normSubj.includes("mĩ thuật") || normSubj.includes("mỹ thuật")) {
      return findInCurriculumList(GRADE_3_MI_THUAT, ppct, week);
    }
    if (normSubj.includes("tiếng anh") || normSubj.includes("anh văn") || normSubj.includes("english")) {
      return findInCurriculumList(GRADE_3_TIENG_ANH, ppct, week);
    }
  }

  // ---------------------------------------------------------
  // KHỐI 4
  // ---------------------------------------------------------
  if (grade === 4) {
    if (normSubj.includes("tiếng việt") || normSubj.includes("tv")) {
      if (normSubj.includes("tc") || normSubj.includes("tăng cường") || normSubj.includes("tctv") || normSubj.includes("lt t.việt") || normSubj.includes("l.t việt")) {
        return {
          week,
          periodInWeek: ppct,
          ppct,
          title: `Luyện tập Tiếng Việt: Củng cố rèn chữ, từ và câu tuần ${week}`,
          subSubject: "Luyện tập",
          integrationNote: "Rèn chữ viết và củng cố kiến thức từ và câu."
        };
      }
      return findInCurriculumList(GRADE_4_TIENG_VIET, ppct, week);
    }
    if (normSubj.includes("toán") || normSubj.includes("math")) {
      if (normSubj.includes("tc") || normSubj.includes("tăng cường") || normSubj.includes("tct") || normSubj.includes("lt.toán") || normSubj.includes("t.cường t")) {
        return {
          week,
          periodInWeek: ppct,
          ppct,
          title: `Luyện tập Toán: Củng cố phép tính và số đến 100 000 tuần ${week}`,
          subSubject: "Luyện tập",
          integrationNote: "Rèn kĩ năng tính toán và giải toán có lời văn."
        };
      }
      return findInCurriculumList(GRADE_4_TOAN, ppct, week);
    }
    if (normSubj.includes("khoa học") || normSubj.includes("kh")) {
      return findInCurriculumList(GRADE_4_KHOA_HOC, ppct, week);
    }
    if (normSubj.includes("lịch sử") || normSubj.includes("địa lí") || normSubj.includes("địa lý") || normSubj.includes("ls&đl") || normSubj.includes("ls-đl") || normSubj.includes("ls") || normSubj.includes("đl")) {
      return findInCurriculumList(GRADE_4_LS_DL, ppct, week);
    }
    if (normSubj.includes("đạo đức")) {
      return findInCurriculumList(GRADE_4_DAO_DUC, ppct, week);
    }
    if (normSubj.includes("công nghệ") || normSubj.includes("cn")) {
      return findInCurriculumList(GRADE_4_CONG_NGHE, ppct, week);
    }
    if (normSubj.includes("trải nghiệm") || normSubj.includes("hđtn") || normSubj.includes("t. nghiệm")) {
      return findInCurriculumList(GRADE_4_HDTN, ppct, week);
    }
    if (normSubj.includes("tin học") || normSubj.includes("tin") || normSubj.includes("th")) {
      return findInCurriculumList(GRADE_4_TIN_HOC, ppct, week);
    }
    if (normSubj.includes("thể chất") || normSubj.includes("gdtc") || normSubj.includes("thể dục")) {
      return findInCurriculumList(GRADE_4_GDTC, ppct, week);
    }
    if (normSubj.includes("âm nhạc")) {
      return findInCurriculumList(GRADE_4_AM_NHAC, ppct, week);
    }
    if (normSubj.includes("mĩ thuật") || normSubj.includes("mỹ thuật")) {
      return findInCurriculumList(GRADE_4_MI_THUAT, ppct, week);
    }
    if (normSubj.includes("tiếng anh") || normSubj.includes("anh văn") || normSubj.includes("english")) {
      return findInCurriculumList(GRADE_4_TIENG_ANH, ppct, week);
    }
  }

  // ---------------------------------------------------------
  // KHỐI 5
  // ---------------------------------------------------------
  if (grade === 5) {
    if (normSubj.includes("tiếng việt") || normSubj.includes("tv")) {
      if (normSubj.includes("tc") || normSubj.includes("tăng cường") || normSubj.includes("tctv") || normSubj.includes("lt")) {
        return {
          week,
          periodInWeek: ppct,
          ppct,
          title: `Luyện tập Tiếng Việt: Củng cố từ đồng nghĩa, từ trái nghĩa tuần ${week}`,
          subSubject: "Luyện tập",
          integrationNote: "Rèn kĩ năng dùng từ và viết đoạn văn."
        };
      }
      return findInCurriculumList(GRADE_5_TIENG_VIET, ppct, week);
    }
    if (normSubj.includes("toán") || normSubj.includes("math")) {
      if (normSubj.includes("tc") || normSubj.includes("tăng cường") || normSubj.includes("tct") || normSubj.includes("lt")) {
        return {
          week,
          periodInWeek: ppct,
          ppct,
          title: `Luyện tập Toán: Củng cố phân số và hỗn số tuần ${week}`,
          subSubject: "Luyện tập",
          integrationNote: "Rèn kĩ năng tính toán và giải toán có lời văn."
        };
      }
      return findInCurriculumList(GRADE_5_TOAN, ppct, week);
    }
    if (normSubj.includes("khoa học") || normSubj.includes("kh")) {
      return findInCurriculumList(GRADE_5_KHOA_HOC, ppct, week);
    }
    if (normSubj.includes("lịch sử") || normSubj.includes("địa lí") || normSubj.includes("địa lý") || normSubj.includes("ls&đl") || normSubj.includes("ls-đl") || normSubj.includes("ls") || normSubj.includes("đl")) {
      return findInCurriculumList(GRADE_5_LS_DL, ppct, week);
    }
    if (normSubj.includes("đạo đức")) {
      return findInCurriculumList(GRADE_5_DAO_DUC, ppct, week);
    }
    if (normSubj.includes("công nghệ") || normSubj.includes("cn")) {
      return findInCurriculumList(GRADE_5_CONG_NGHE, ppct, week);
    }
    if (normSubj.includes("trải nghiệm") || normSubj.includes("hđtn") || normSubj.includes("t. nghiệm")) {
      return findInCurriculumList(GRADE_5_HDTN, ppct, week);
    }
    if (normSubj.includes("tin học") || normSubj.includes("tin") || normSubj.includes("th")) {
      return findInCurriculumList(GRADE_5_TIN_HOC, ppct, week);
    }
    if (normSubj.includes("thể chất") || normSubj.includes("gdtc") || normSubj.includes("thể dục")) {
      return findInCurriculumList(GRADE_5_GDTC, ppct, week);
    }
    if (normSubj.includes("âm nhạc")) {
      return findInCurriculumList(GRADE_5_AM_NHAC, ppct, week);
    }
    if (normSubj.includes("mĩ thuật") || normSubj.includes("mỹ thuật")) {
      return findInCurriculumList(GRADE_5_MI_THUAT, ppct, week);
    }
    if (normSubj.includes("tiếng anh") || normSubj.includes("anh văn") || normSubj.includes("english")) {
      return findInCurriculumList(GRADE_5_TIENG_ANH, ppct, week, subject, grade);
    }
  }

  // Luôn trả về nội dung bài dạy chuẩn 35 tuần theo chuẩn Bộ GD&ĐT
  return get35WeekCurriculumEntry(subject, grade, ppct, week);
}
