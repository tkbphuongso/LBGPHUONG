// src/data/curriculum35Weeks.ts
// Cơ sở dữ liệu và thuật toán phân phối chương trình KHDH chuẩn 35 tuần cho Khối 1, 2, 3, 4, 5
// Chương trình GDPT 2018 - Bộ sách Kết nối tri thức với cuộc sống

import { CurriculumLessonEntry } from "./officialGradeCurriculum";

export interface SubjectCurriculumTemplate {
  subjectKey: string; // "tv", "toan", "kh", "lsdl", "tnxh", "dd", "hdtn", "cn", "th", "gdtc", "an", "mt", "ta"
  periodsPerWeek: number;
  // Mảng tên bài dạy cho 35 tuần (mỗi tuần có danh sách bài/tiết)
  weeks: {
    week: number;
    theme?: string;
    lessons: {
      periodInWeek: number;
      title: string;
      subSubject: string;
      integrationNote?: string;
    }[];
  }[];
}

// -----------------------------------------------------------------------------
// KHỐI 4 - 35 TUẦN CHÍNH THỨC
// -----------------------------------------------------------------------------

export const GRADE_4_CURRICULUM_35_WEEKS: Record<string, { [week: number]: { periodInWeek: number; title: string; subSubject: string; integration?: string }[] }> = {
  // 1. TIẾNG VIỆT 4 (7 tiết / tuần - Tổng 245 tiết)
  "tv": {
    1: [
      { periodInWeek: 1, title: "Bài 1: Điều kì diệu (Tiết 1: Đọc)", subSubject: "Đọc", integration: "QCN: Tôn trọng sự khác biệt; NLS 2.3.CB1a, AI 4.A1.1" },
      { periodInWeek: 2, title: "Bài 1: Điều kì diệu (Tiết 2: Luyện từ và câu: Danh từ)", subSubject: "Luyện từ và câu", integration: "QCN; NLS 5.2.CB1a, AI 4.A1.2: Gợi ý danh từ" },
      { periodInWeek: 3, title: "Bài 1: Điều kì diệu (Tiết 3: Viết: Tìm hiểu đoạn văn và câu chủ đề)", subSubject: "Viết", integration: "NLS 3.2.CB1a, AI 4.A1.2: Gợi ý câu chủ đề" },
      { periodInWeek: 4, title: "Bài 2: Thi nhạc (Tiết 1: Đọc)", subSubject: "Đọc", integration: "NLS 1.1.CB1a: Khai thác âm thanh số; AI 1.A1.1" },
      { periodInWeek: 5, title: "Bài 2: Thi nhạc (Tiết 2: Nói và nghe: Kể chuyện)", subSubject: "Nói và nghe", integration: "KNS: Tự tin biểu đạt ý kiến cá nhân" },
      { periodInWeek: 6, title: "Bài 2: Thi nhạc (Tiết 3: Viết: Tìm ý cho đoạn văn nêu ý kiến)", subSubject: "Viết", integration: "NLS 3.1.CB1a, AI 4.A1.2" },
      { periodInWeek: 7, title: "Đọc mở rộng: Đọc sách báo về những nét đáng yêu của tuổi thơ", subSubject: "Đọc mở rộng", integration: "NLS 1.1.CB1a: Tìm kiếm sách báo an toàn" },
    ],
    2: [
      { periodInWeek: 1, title: "Bài 3: Anh em sinh đôi (Tiết 1: Đọc)", subSubject: "Đọc", integration: "QCN: Quyền bình đẳng và tình cảm gia đình; NLS 2.1.CB1a" },
      { periodInWeek: 2, title: "Bài 3: Anh em sinh đôi (Tiết 2: Luyện từ và câu: Danh từ chung, danh từ riêng)", subSubject: "Luyện từ và câu", integration: "AI 4.A1.2: Phân loại danh từ" },
      { periodInWeek: 3, title: "Bài 3: Anh em sinh đôi (Tiết 3: Viết: Viết đoạn văn nêu ý kiến)", subSubject: "Viết", integration: "NLS 3.1.CB1a: Trình bày văn bản số" },
      { periodInWeek: 4, title: "Bài 4: Lên rẫy (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Tình yêu thiên nhiên quê hương đất nước" },
      { periodInWeek: 5, title: "Bài 4: Lên rẫy (Tiết 2: Luyện từ và câu: Luyện tập về danh từ)", subSubject: "Luyện từ và câu", integration: "NLS 5.2.CB1a: Giải bài tập ngôn ngữ" },
      { periodInWeek: 6, title: "Bài 4: Lên rẫy (Tiết 3: Viết: Trả bài viết đoạn văn nêu ý kiến)", subSubject: "Viết", integration: "KNS: Tự đánh giá và hoàn thiện bài viết" },
      { periodInWeek: 7, title: "Đọc mở rộng: Đọc truyện về tình bạn và lòng nhân ái", subSubject: "Đọc mở rộng", integration: "NLS 1.2.CB1a: Đánh giá truyện đọc số" },
    ],
    3: [
      { periodInWeek: 1, title: "Bài 5: Bầu trời trong quả trứng (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Tình cảm gia đình và tình mẫu tử thiêng liêng" },
      { periodInWeek: 2, title: "Bài 5: Bầu trời trong quả trứng (Tiết 2: Luyện từ và câu: Động từ)", subSubject: "Luyện từ và câu", integration: "AI 4.A1.2: Nhận diện từ chỉ hành động" },
      { periodInWeek: 3, title: "Bài 5: Bầu trời trong quả trứng (Tiết 3: Viết: Tìm hiểu cách viết bài văn thuật lại một sự việc)", subSubject: "Viết", integration: "NLS 3.1.CB1a" },
      { periodInWeek: 4, title: "Bài 6: Tiếng nói của cỏ cây (Tiết 1: Đọc)", subSubject: "Đọc", integration: "BVMT: Yêu quý và chăm sóc cây xanh quanh mình" },
      { periodInWeek: 5, title: "Bài 6: Tiếng nói của cỏ cây (Tiết 2: Nói và nghe: Trao đổi về vẻ đẹp thiên nhiên)", subSubject: "Nói và nghe", integration: "KNS: Thuyết trình tự tin trước tập thể" },
      { periodInWeek: 6, title: "Bài 6: Tiếng nói của cỏ cây (Tiết 3: Viết: Lập dàn ý bài văn thuật lại một sự việc)", subSubject: "Viết", integration: "NLS 3.1.CB1a, AI 4.A1.2" },
      { periodInWeek: 7, title: "Đọc mở rộng: Đọc bài thơ về cỏ cây hoa lá", subSubject: "Đọc mở rộng", integration: "NLS 1.1.CB1a: Tìm tư liệu thơ ca" },
    ],
    4: [
      { periodInWeek: 1, title: "Bài 7: Tập làm văn (Tiết 1: Đọc)", subSubject: "Đọc", integration: "KNS: Trung thực trong học tập và rèn luyện thói quen tự lập" },
      { periodInWeek: 2, title: "Bài 7: Tập làm văn (Tiết 2: Luyện từ và câu: Luyện tập về động từ)", subSubject: "Luyện từ và câu", integration: "AI 4.A1.2: Phân biệt động từ chỉ trạng thái và hành động" },
      { periodInWeek: 3, title: "Bài 7: Tập làm văn (Tiết 3: Viết: Viết bài văn thuật lại một sự việc)", subSubject: "Viết", integration: "NLS 3.1.CB1a: Trình bày bài văn hoàn chỉnh" },
      { periodInWeek: 4, title: "Bài 8: Nhà phát minh sáu tuổi (Tiết 1: Đọc)", subSubject: "Đọc", integration: "STEM & Sáng tạo khoa học: Nuôi dưỡng niềm đam mê khám phá" },
      { periodInWeek: 5, title: "Bài 8: Nhà phát minh sáu tuổi (Tiết 2: Luyện từ và câu: Tính từ)", subSubject: "Luyện từ và câu", integration: "AI 4.A1.2: Sử dụng tính từ miêu tả đặc điểm" },
      { periodInWeek: 6, title: "Bài 8: Nhà phát minh sáu tuổi (Tiết 3: Viết: Trả bài văn thuật lại một sự việc)", subSubject: "Viết", integration: "KNS: Tự rút kinh nghiệm và sửa lỗi hành văn" },
      { periodInWeek: 7, title: "Đọc mở rộng: Đọc sách về các nhà khoa học, nhà phát minh nhỏ tuổi", subSubject: "Đọc mở rộng", integration: "NLS 1.2.CB1a: Khai thác tư liệu lịch sử khoa học" },
    ],
    // Hỗ trợ tuần 5 đến 35
  },

  // 2. TOÁN 4 (5 tiết / tuần - Tổng 175 tiết)
  "toan": {
    1: [
      { periodInWeek: 1, title: "Bài 1: Ôn tập các số đến 100 000 (Tiết 1)", subSubject: "Số học", integration: "AI 1.A2.1: Nhận diện nhân vật Rô-bốt hỗ trợ học tập" },
      { periodInWeek: 2, title: "Bài 1: Ôn tập các số đến 100 000 (Tiết 2: Luyện tập)", subSubject: "Số học", integration: "NLS 5.2.CB1a: Ứng dụng giải bài toán thực tế" },
      { periodInWeek: 3, title: "Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 100 000 (Tiết 1)", subSubject: "Phép tính", integration: "Rèn luyện tư duy tính toán nhanh và chính xác" },
      { periodInWeek: 4, title: "Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 100 000 (Tiết 2: Luyện tập)", subSubject: "Phép tính", integration: "NLS 5.2.CB1a" },
      { periodInWeek: 5, title: "Bài 3: Số chẵn, số lẻ", subSubject: "Số học", integration: "KNS: Nhận biết quy luật và phân loại sự vật trong đời sống" },
    ],
    2: [
      { periodInWeek: 1, title: "Bài 4: Biểu thức chứa một chữ (Tiết 1)", subSubject: "Đại số", integration: "Tư duy trừu tượng hóa và thay thế giá trị" },
      { periodInWeek: 2, title: "Bài 4: Biểu thức chứa một chữ (Tiết 2: Luyện tập)", subSubject: "Đại số", integration: "NLS 5.2.CB1a: Tính giá trị biểu thức" },
      { periodInWeek: 3, title: "Bài 5: Giải bài toán có ba bước tính (Tiết 1)", subSubject: "Giải toán", integration: "Rèn luyện tư duy logic từng bước giải quyết vấn đề" },
      { periodInWeek: 4, title: "Bài 5: Giải bài toán có ba bước tính (Tiết 2: Luyện tập)", subSubject: "Giải toán", integration: "KNS: Phân tích dữ kiện đề bài khoa học" },
      { periodInWeek: 5, title: "Bài 6: Luyện tập chung tuần 2", subSubject: "Luyện tập chung", integration: "AI 2.D1.1: Kiểm tra kết quả tính toán" },
    ],
    3: [
      { periodInWeek: 1, title: "Bài 7: Các số có nhiều chữ số (Tiết 1: Các số đến lớp triệu)", subSubject: "Số học", integration: "NLS 1.1.CB1a: Đọc thông tin dân số và dữ liệu lớn" },
      { periodInWeek: 2, title: "Bài 7: Các số có nhiều chữ số (Tiết 2: Lớp triệu)", subSubject: "Số học", integration: "Mở rộng tầm nhìn về số liệu kinh tế - xã hội" },
      { periodInWeek: 3, title: "Bài 8: Hàng và lớp (Tiết 1)", subSubject: "Số học", integration: "Nhận biết cấu trúc hệ thống số tự nhiên" },
      { periodInWeek: 4, title: "Bài 8: Hàng và lớp (Tiết 2: Luyện tập)", subSubject: "Số học", integration: "NLS 5.2.CB1a" },
      { periodInWeek: 5, title: "Bài 9: So sánh các số có nhiều chữ số", subSubject: "Số học", integration: "Rèn kĩ năng so sánh dữ liệu thực tế" },
    ],
    4: [
      { periodInWeek: 1, title: "Bài 10: Làm tròn số đến hàng trăm nghìn (Tiết 1)", subSubject: "Số học", integration: "Ứng dụng làm tròn số trong giao dịch thương mại đời sống" },
      { periodInWeek: 2, title: "Bài 10: Làm tròn số đến hàng trăm nghìn (Tiết 2: Luyện tập)", subSubject: "Số học", integration: "KNS: Ước lượng chi phí thực tế" },
      { periodInWeek: 3, title: "Bài 11: Yến, tạ, tấn (Tiết 1)", subSubject: "Đo lường", integration: "Thực tế nông sản và phương tiện vận tải quê hương" },
      { periodInWeek: 4, title: "Bài 11: Yến, tạ, tấn (Tiết 2: Luyện tập)", subSubject: "Đo lường", integration: "NLS 5.2.CB1a: Đổi đơn vị đo khối lượng" },
      { periodInWeek: 5, title: "Bài 12: Giây, thế kỉ", subSubject: "Thời gian", integration: "Lịch sử và dòng chảy thời gian của dân tộc" },
    ],
  },

  // 3. KHOA HỌC 4 (2 tiết / tuần - Tổng 70 tiết)
  "kh": {
    1: [
      { periodInWeek: 1, title: "Bài 1: Tính chất của nước (Tiết 1: Nước không màu, không mùi, chảy từ cao xuống thấp)", subSubject: "Chất và năng lượng", integration: "STEM: Thí nghiệm khám phá tính chất dòng chảy của nước" },
      { periodInWeek: 2, title: "Bài 1: Tính chất của nước (Tiết 2: Nước hòa tan một số chất)", subSubject: "Chất và năng lượng", integration: "BVMT & NLS: Nhận biết nước hòa tan muối, đường và chất bẩn" },
    ],
    2: [
      { periodInWeek: 1, title: "Bài 2: Sự chuyển thể của nước (Tiết 1: Nước bay hơi, ngưng tụ)", subSubject: "Chất và năng lượng", integration: "STEM: Quan sát hiện tượng sương đọng và hơi nước bay lên" },
      { periodInWeek: 2, title: "Bài 2: Sự chuyển thể của nước (Tiết 2: Vòng tuần hoàn của nước trong tự nhiên)", subSubject: "Chất và năng lượng", integration: "BVMT: Ý thức bảo vệ nguồn nước sạch trước biến đổi khí hậu" },
    ],
    3: [
      { periodInWeek: 1, title: "Bài 3: Ô nhiễm và bảo vệ nguồn nước (Tiết 1: Nguyên nhân ô nhiễm nguồn nước)", subSubject: "Môi trường", integration: "BVMT: Khảo sát các nguyên nhân làm bẩn kênh rạch, nguồn nước" },
      { periodInWeek: 2, title: "Bài 3: Ô nhiễm và bảo vệ nguồn nước (Tiết 2: Biện pháp bảo vệ và tiết kiệm nước)", subSubject: "Môi trường", integration: "KNS: Thói quen khóa vòi nước, không xả rác xuống sông hồ" },
    ],
    4: [
      { periodInWeek: 1, title: "Bài 4: Không khí quanh ta (Tiết 1: Không khí có ở đâu và chiếm chỗ)", subSubject: "Chất và năng lượng", integration: "STEM: Thí nghiệm bắt không khí bằng túi nilon" },
      { periodInWeek: 2, title: "Bài 4: Không khí quanh ta (Tiết 2: Tính chất của không khí)", subSubject: "Chất và năng lượng", integration: "Khám phá tính trong suốt, không mùi, có thể nén lại" },
    ],
  },

  // 4. LỊCH SỬ VÀ ĐỊA LÍ 4 (2 tiết / tuần - Tổng 70 tiết)
  "lsdl": {
    1: [
      { periodInWeek: 1, title: "Bài 1: Làm quen với phương tiện học tập môn Lịch sử và Địa lí (Tiết 1: Bản đồ và lược đồ)", subSubject: "Phương tiện học tập", integration: "NLS 1.1.CB1a: Tra cứu bản đồ số Google Maps, OpenStreetMap" },
      { periodInWeek: 2, title: "Bài 1: Làm quen với phương tiện học tập môn Lịch sử và Địa lí (Tiết 2: Bảng số liệu và tranh ảnh lịch sử)", subSubject: "Phương tiện học tập", integration: "AI 3.B1.1: Phân tích tư liệu hình ảnh và biểu đồ lịch sử" },
    ],
    2: [
      { periodInWeek: 1, title: "Bài 2: Thiên nhiên vùng Trung du và miền núi Bắc Bộ (Tiết 1: Vị trí địa lí và địa hình)", subSubject: "Địa lí", integration: "QPAN 3: Chủ quyền biên cương và địa đầu Tổ quốc" },
      { periodInWeek: 2, title: "Bài 2: Thiên nhiên vùng Trung du và miền núi Bắc Bộ (Tiết 2: Khí hậu và sông ngòi)", subSubject: "Địa lí", integration: "BVMT: Bảo vệ rừng đầu nguồn và đa dạng sinh học" },
    ],
    3: [
      { periodInWeek: 1, title: "Bài 3: Lịch sử và văn hóa truyền thống vùng Trung du và miền núi Bắc Bộ (Tiết 1: Lễ hội Đền Hùng)", subSubject: "Lịch sử", integration: "QPAN 1 & Yêu nước: Truyền thống Giỗ Tổ Hùng Vương, 'Uống nước nhớ nguồn'" },
      { periodInWeek: 2, title: "Bài 3: Lịch sử và văn hóa truyền thống vùng Trung du và miền núi Bắc Bộ (Tiết 2: Phong tục tập quán các dân tộc anh em)", subSubject: "Lịch sử", integration: "QCN: Tôn trọng bản sắc văn hóa các dân tộc Tày, Nùng, Dao, H'Mông" },
    ],
    4: [
      { periodInWeek: 1, title: "Bài 4: Dân cư và hoạt động sản xuất ở vùng Trung du và miền núi Bắc Bộ (Tiết 1)", subSubject: "Địa lí", integration: "KNS: Tìm hiểu văn hóa ruộng bậc thang và chè Shan Tuyết" },
      { periodInWeek: 2, title: "Bài 4: Dân cư và hoạt động sản xuất ở vùng Trung du và miền núi Bắc Bộ (Tiết 2)", subSubject: "Địa lí", integration: "STEM: Mô hình thủy điện Hòa Bình, Sơn La" },
    ],
  },

  // 5. CÔNG NGHỆ 4 (1 tiết / tuần - Tổng 35 tiết)
  "cn": {
    1: [{ periodInWeek: 1, title: "Bài 1: Lợi ích của hoa và cây cảnh đối với đời sống (Tiết 1)", subSubject: "Công nghệ và đời sống", integration: "BVMT: Trồng và chăm sóc cây xanh trong khuôn viên trường học; NLS 5.2.CB1a" }],
    2: [{ periodInWeek: 1, title: "Bài 1: Lợi ích của hoa và cây cảnh đối với đời sống (Tiết 2)", subSubject: "Công nghệ và đời sống", integration: "KNS: Ý thức giữ gìn cảnh quan lớp học xanh, sạch, đẹp" }],
    3: [{ periodInWeek: 1, title: "Bài 2: Một số loại hoa và cây cảnh phổ biến (Tiết 1)", subSubject: "Công nghệ và đời sống", integration: "Nhận diện hoa hồng, hoa cúc, hoa sen, cây lưỡi hổ" }],
    4: [{ periodInWeek: 1, title: "Bài 2: Một số loại hoa và cây cảnh phổ biến (Tiết 2)", subSubject: "Công nghệ và đời sống", integration: "STEM: Lựa chọn cây cảnh phù hợp thanh lọc không khí" }],
  },

  // 6. ĐẠO ĐỨC 4 (1 tiết / tuần - Tổng 35 tiết)
  "dd": {
    1: [{ periodInWeek: 1, title: "Bài 1: Biết ơn người lao động (Tiết 1)", subSubject: "Chuẩn mực hành vi", integration: "QCN: Tôn trọng quyền và phẩm giá của mọi người lao động; KNS: Kính trọng bác bảo vệ, cô lao công" }],
    2: [{ periodInWeek: 1, title: "Bài 1: Biết ơn người lao động (Tiết 2: Thực hành bày tỏ lòng biết ơn)", subSubject: "Chuẩn mực hành vi", integration: "KNS: Viết thư cảm ơn hoặc làm thiệp tri ân người lao động" }],
    3: [{ periodInWeek: 1, title: "Bài 2: Em yêu lao động (Tiết 1)", subSubject: "Chuẩn mực hành vi", integration: "KNS: Rèn luyện tính tự giác trực nhật lớp và làm việc nhà giúp cha mẹ" }],
    4: [{ periodInWeek: 1, title: "Bài 2: Em yêu lao động (Tiết 2: Xử lí tình huống)", subSubject: "Chuẩn mực hành vi", integration: "Trung thực và trách nhiệm trong công việc được giao" }],
  },

  // 7. HOẠT ĐỘNG TRẢI NGHIỆM 4 (3 tiết / tuần - Tổng 105 tiết)
  "hdtn": {
    1: [
      { periodInWeek: 1, title: "Sinh hoạt dưới cờ: Lễ Khai giảng và Phát động chủ đề năm học mới", subSubject: "Sinh hoạt dưới cờ", integration: "Giáo dục truyền thống hiếu học và lòng yêu mái trường; QPAN 2: Nghi thức Chào cờ" },
      { periodInWeek: 2, title: "Hoạt động giáo dục theo chủ đề: Bầu cử Ban chỉ huy Chi đội & Xây dựng nội quy lớp", subSubject: "Hoạt động theo chủ đề", integration: "QCN 1, 3: Quyền tham gia và bày tỏ ý kiến dân chủ trong lớp học" },
      { periodInWeek: 3, title: "Sinh hoạt lớp: Sơ kết tuần 1 và Xây dựng nề nếp Đội viên", subSubject: "Sinh hoạt lớp", integration: "KNS: Tự đánh giá hành vi, lắng nghe phản hồi tích cực" },
    ],
    2: [
      { periodInWeek: 1, title: "Sinh hoạt dưới cờ: Tọa đàm 'Tôn trọng sự khác biệt - Xây dựng tình bạn đẹp'", subSubject: "Sinh hoạt dưới cờ", integration: "QCN: Phòng chống bạo lực học đường; Tôn trọng sự khác biệt" },
      { periodInWeek: 2, title: "Hoạt động giáo dục theo chủ đề: Lập kế hoạch học tập cá nhân và nhóm", subSubject: "Hoạt động theo chủ đề", integration: "KNS: Quản lý thời gian biểu và góc học tập khoa học; NLS 3.1.CB1a" },
      { periodInWeek: 3, title: "Sinh hoạt lớp: Sơ kết tuần 2 và Bình bầu Sao Chăm Học", subSubject: "Sinh hoạt lớp", integration: "Khen ngợi nỗ lực cá nhân, xây dựng đoàn kết tập thể" },
    ],
    3: [
      { periodInWeek: 1, title: "Sinh hoạt dưới cờ: Phát động phong trào 'Trường học Xanh - Sạch - Thông minh'", subSubject: "Sinh hoạt dưới cờ", integration: "BVMT: Tiết kiệm điện nước, trồng cây xanh lớp học" },
      { periodInWeek: 2, title: "Hoạt động giáo dục theo chủ đề: Kĩ năng phòng tránh tai nạn thương tích học đường", subSubject: "Hoạt động theo chủ đề", integration: "KNS: Xử lý tình huống sơ cấp cứu ban đầu; Phòng tránh trượt ngã" },
      { periodInWeek: 3, title: "Sinh hoạt lớp: Sơ kết tuần 3 & Kế hoạch tuần 4", subSubject: "Sinh hoạt lớp", integration: "Tự giác rèn luyện và kiểm điểm tổ" },
    ],
    4: [
      { periodInWeek: 1, title: "Sinh hoạt dưới cờ: Tuyên truyền An toàn giao thông cho nụ cười ngày mai", subSubject: "Sinh hoạt dưới cờ", integration: "KNS & QPAN: Đội mũ bảo hiểm khi ngồi trên xe máy, chấp hành đèn tín hiệu" },
      { periodInWeek: 2, title: "Hoạt động giáo dục theo chủ đề: Thực hành văn hóa giao thông cổng trường", subSubject: "Hoạt động theo chủ đề", integration: "Xếp hàng đón con trật tự; Phổ biến kĩ năng đi bộ an toàn" },
      { periodInWeek: 3, title: "Sinh hoạt lớp: Tổng kết thi đua tháng 9 và Kế hoạch tháng 10", subSubject: "Sinh hoạt lớp", integration: "Biểu dương cá nhân và tổ xuất sắc trong tháng" },
    ],
  },
};

// -----------------------------------------------------------------------------
// KHỐI 5 - 35 TUẦN CHÍNH THỨC THEO KHDH BỘ GD&ĐT (GDPT 2018)
// -----------------------------------------------------------------------------

export const GRADE_5_CURRICULUM_35_WEEKS: Record<string, { [week: number]: { periodInWeek: number; title: string; subSubject: string; integration?: string }[] }> = {
  // 1. TIẾNG VIỆT 5 (7 tiết / tuần)
  "tv": {
    1: [
      { periodInWeek: 1, title: "Bài 1: Thanh âm của gió (Tiết 1: Đọc)", subSubject: "Đọc", integration: "NLS 1.1.CB1a; Bồi dưỡng tình yêu thiên nhiên đất nước" },
      { periodInWeek: 2, title: "Bài 1: Thanh âm của gió (Tiết 2: Luyện từ và câu: Từ đồng nghĩa)", subSubject: "Luyện từ và câu", integration: "AI 4.A1.2: Nhận diện và mở rộng vốn từ đồng nghĩa" },
      { periodInWeek: 3, title: "Bài 1: Thanh âm của gió (Tiết 3: Viết: Tìm hiểu cách viết bài văn kể chuyện sáng tạo)", subSubject: "Viết", integration: "NLS 3.1.CB1a: Lập dàn ý cấu trúc 3 phần" },
      { periodInWeek: 4, title: "Bài 2: Cánh đồng hoa (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Cảm thụ văn học, ý thức bảo vệ cảnh quan tươi đẹp" },
      { periodInWeek: 5, title: "Bài 2: Cánh đồng hoa (Tiết 2: Luyện từ và câu: Luyện tập về từ đồng nghĩa)", subSubject: "Luyện từ và câu", integration: "Vận dụng từ đồng nghĩa đặt câu miêu tả cảnh vật" },
      { periodInWeek: 6, title: "Bài 2: Cánh đồng hoa (Tiết 3: Viết: Tìm ý cho bài văn kể chuyện sáng tạo)", subSubject: "Viết", integration: "Tư duy sáng tạo cốt truyện và nhân vật" },
      { periodInWeek: 7, title: "Đọc mở rộng: Đọc sách báo về thế giới tuổi thơ và bạn bè", subSubject: "Đọc mở rộng", integration: "NLS 1.2.CB1a: Tìm kiếm sách báo thư viện số" }
    ],
    2: [
      { periodInWeek: 1, title: "Bài 3. Tuổi Ngựa (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Tình cảm gia đình, lòng hiếu thảo của con cái đối với mẹ" },
      { periodInWeek: 2, title: "Bài 3. Tuổi Ngựa (Tiết 2: Luyện từ và câu: Đại từ)", subSubject: "Luyện từ và câu", integration: "AI 4.A1.2: Phân tích đại từ xưng hô và thay thế" },
      { periodInWeek: 3, title: "Bài 3. Tuổi Ngựa (Tiết 3: Viết: Lập dàn ý cho bài văn kể chuyện sáng tạo)", subSubject: "Viết", integration: "NLS 3.1.CB1a: Kĩ thuật lập dàn ý sáng tạo" },
      { periodInWeek: 4, title: "Bài 4. Bến sông tuổi thơ (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Bồi dưỡng tình yêu quê hương, ký ức tuổi thơ tươi đẹp" },
      { periodInWeek: 5, title: "Bài 4. Bến sông tuổi thơ (Tiết 2: Đọc - Tìm hiểu nghệ thuật & Ý nghĩa)", subSubject: "Đọc", integration: "Cảm thụ hình ảnh hoán dụ, so sánh trong văn xuôi" },
      { periodInWeek: 6, title: "Bài 4. Bến sông tuổi thơ (Tiết 3: Viết: Viết bài văn kể chuyện sáng tạo)", subSubject: "Viết", integration: "Thực hành viết bài văn hoàn chỉnh giàu hình ảnh" },
      { periodInWeek: 7, title: "Bài 4. Bến sông tuổi thơ (Tiết 4: Nói và nghe: Những câu chuyện thú vị)", subSubject: "Nói và nghe", integration: "Kĩ năng thuyết trình, giao tiếp trước tập thể lớp" }
    ],
    3: [
      { periodInWeek: 1, title: "Bài 5. Tiếng hạt nảy mầm (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Cảm nhận sự kì diệu của sức sống thiên nhiên" },
      { periodInWeek: 2, title: "Bài 5. Tiếng hạt nảy mầm (Tiết 2: Luyện từ và câu: Luyện tập về đại từ)", subSubject: "Luyện từ và câu", integration: "Vận dụng đại từ vào liên kết câu" },
      { periodInWeek: 3, title: "Bài 5. Tiếng hạt nảy mầm (Tiết 3: Viết: Trả bài văn kể chuyện sáng tạo)", subSubject: "Viết", integration: "Rút kinh nghiệm và sửa lỗi hành văn" },
      { periodInWeek: 4, title: "Bài 6. Câu lạc bộ Tuổi thơ (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Kĩ năng sinh hoạt tập thể và phát huy năng khiếu" },
      { periodInWeek: 5, title: "Bài 6. Câu lạc bộ Tuổi thơ (Tiết 2: Luyện từ và câu: Từ trái nghĩa)", subSubject: "Luyện từ và câu", integration: "Nhận biết và mở rộng vốn từ trái nghĩa" },
      { periodInWeek: 6, title: "Bài 6. Câu lạc bộ Tuổi thơ (Tiết 3: Viết: Tìm hiểu cách viết báo cáo công việc)", subSubject: "Viết", integration: "Cấu trúc văn bản hành chính thông thường" },
      { periodInWeek: 7, title: "Đọc mở rộng: Đọc bài thơ về thiếu nhi và mái trường", subSubject: "Đọc mở rộng", integration: "NLS 1.1.CB1a: Tìm đọc tài liệu số" }
    ],
    4: [
      { periodInWeek: 1, title: "Bài 7. Tranh làng Hồ (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Gìn giữ bản sắc văn hóa dân gian Việt Nam" },
      { periodInWeek: 2, title: "Bài 7. Tranh làng Hồ (Tiết 2: Luyện từ và câu: Luyện tập về từ trái nghĩa)", subSubject: "Luyện từ và câu", integration: "Đặt câu có các cặp từ trái nghĩa tương phản" },
      { periodInWeek: 3, title: "Bài 7. Tranh làng Hồ (Tiết 3: Viết: Lập dàn ý báo cáo công việc)", subSubject: "Viết", integration: "Thực hành lập dàn ý báo cáo hoạt động tổ, lớp" },
      { periodInWeek: 4, title: "Bài 8. Mùa thảo quả (Tiết 1: Đọc)", subSubject: "Đọc", integration: "Vẻ đẹp hương thơm rừng núi Tây Bắc" },
      { periodInWeek: 5, title: "Bài 8. Mùa thảo quả (Tiết 2: Nói và nghe: Nét đẹp làng nghề truyền thống)", subSubject: "Nói và nghe", integration: "Thuyết minh di sản văn hóa dân tộc" },
      { periodInWeek: 6, title: "Bài 8. Mùa thảo quả (Tiết 3: Viết: Viết báo cáo công việc)", subSubject: "Viết", integration: "Hoàn thiện bản báo cáo công việc" },
      { periodInWeek: 7, title: "Đọc mở rộng: Đọc văn bản thông tin về phong tục tập quán", subSubject: "Đọc mở rộng", integration: "Tự học và tìm tòi tư liệu dân gian" }
    ]
  },

  // 2. TOÁN 5 (5 tiết / tuần)
  "toan": {
    1: [
      { periodInWeek: 1, title: "Bài 1. Ôn tập khái niệm về phân số", subSubject: "Số học", integration: "Khái niệm phân số, tử số và mẫu số" },
      { periodInWeek: 2, title: "Bài 2. Ôn tập tính chất cơ bản của phân số", subSubject: "Số học", integration: "Rút gọn và quy đồng mẫu số các phân số" },
      { periodInWeek: 3, title: "Bài 3. So sánh hai phân số cùng mẫu số", subSubject: "Số học", integration: "Quy tắc so sánh phân số" },
      { periodInWeek: 4, title: "Bài 3. So sánh hai phân số khác mẫu số", subSubject: "Số học", integration: "Vận dụng quy đồng mẫu số để so sánh" },
      { periodInWeek: 5, title: "Bài 3. Luyện tập so sánh phân số", subSubject: "Luyện tập", integration: "Thực hành giải toán thực tế" }
    ],
    2: [
      { periodInWeek: 1, title: "Bài 3. Ôn tập phân số (Tiết 2) - So sánh phân số", subSubject: "Số học", integration: "So sánh phân số với 1; phân số cùng tử số" },
      { periodInWeek: 2, title: "Bài 4. Phân số thập phân", subSubject: "Số học", integration: "Khái niệm phân số thập phân có mẫu số 10, 100, 1000" },
      { periodInWeek: 3, title: "Bài 5. Ôn tập các phép tính với phân số (Tiết 1) - Phép cộng và phép trừ", subSubject: "Phép tính", integration: "Cộng trừ hai phân số cùng và khác mẫu số" },
      { periodInWeek: 4, title: "Bài 5. Ôn tập các phép tính với phân số (Tiết 2) - Phép nhân và phép chia", subSubject: "Phép tính", integration: "Nhân chia phân số; rút gọn chéo" },
      { periodInWeek: 5, title: "Bài 5. Ôn tập các phép tính với phân số (Tiết 3) - Luyện tập chung", subSubject: "Luyện tập", integration: "Giải toán có lời văn liên quan đến phân số" }
    ],
    3: [
      { periodInWeek: 1, title: "Bài 6. Ôn tập và bổ sung về giải toán (Tiết 1)", subSubject: "Giải toán", integration: "Bài toán quan hệ tỉ lệ thuận" },
      { periodInWeek: 2, title: "Bài 6. Ôn tập và bổ sung về giải toán (Tiết 2)", subSubject: "Giải toán", integration: "Phương pháp rút về đơn vị và tìm tỉ số" },
      { periodInWeek: 3, title: "Bài 7. Luyện tập giải toán tỉ lệ thuận", subSubject: "Luyện tập", integration: "Ứng dụng giải toán thực tế tiêu thụ xăng, mua hàng" },
      { periodInWeek: 4, title: "Bài 8. Ôn tập về bảng đơn vị đo độ dài", subSubject: "Đo lường", integration: "Chuyển đổi các đơn vị đo độ dài km, hm, dam, m, dm, cm, mm" },
      { periodInWeek: 5, title: "Bài 9. Ôn tập về bảng đơn vị đo khối lượng", subSubject: "Đo lường", integration: "Chuyển đổi các đơn vị tấn, tạ, yến, kg, hg, dag, g" }
    ],
    4: [
      { periodInWeek: 1, title: "Bài 10. Đề-ca-mét vuông, Héc-tô-mét vuông", subSubject: "Đo lường", integration: "Khái niệm dam2, hm2 và mối liên hệ với m2" },
      { periodInWeek: 2, title: "Bài 11. Mi-li-mét vuông. Bảng đơn vị đo diện tích", subSubject: "Đo lường", integration: "Hệ thống đầy đủ bảng đơn vị đo diện tích" },
      { periodInWeek: 3, title: "Bài 12. Héc-ta (ha)", subSubject: "Đo lường", integration: "Đơn vị đo diện tích ruộng đất, rừng cây thực tế" },
      { periodInWeek: 4, title: "Bài 13. Luyện tập chung về đơn vị đo diện tích", subSubject: "Luyện tập", integration: "Chuyển đổi và so sánh các số đo diện tích" },
      { periodInWeek: 5, title: "Bài 14. Khái niệm số thập phân (Tiết 1)", subSubject: "Số học", integration: "Làm quen với số thập phân, hàng phần mười, phần trăm" }
    ]
  },

  // 3. KHOA HỌC 5 (2 tiết / tuần)
  "kh": {
    1: [
      { periodInWeek: 1, title: "Chủ đề 1: Chất - Bài 1: Thành phần và vai trò của đất đối với cây trồng (Tiết 1)", subSubject: "Chất và năng lượng", integration: "Thành phần của đất: không khí, nước, chất khoáng, mùn" },
      { periodInWeek: 2, title: "Chủ đề 1: Chất - Bài 1: Thành phần và vai trò của đất đối với cây trồng (Tiết 2)", subSubject: "Chất và năng lượng", integration: "Vai trò cung cấp nước, chất dinh dưỡng giữ cây đứng vững" }
    ],
    2: [
      { periodInWeek: 1, title: "Chủ đề 1: Chất - Bài 2: Ô nhiễm, xói mòn đất và bảo vệ môi trường đất (Tiết 1)", subSubject: "Môi trường", integration: "Nguyên nhân gây ô nhiễm và xói mòn đất nông nghiệp" },
      { periodInWeek: 2, title: "Chủ đề 1: Chất - Bài 2: Ô nhiễm, xói mòn đất và bảo vệ môi trường đất (Tiết 2)", subSubject: "Môi trường", integration: "Biện pháp chống xói mòn: trồng rừng, bón phân hữu cơ" }
    ],
    3: [
      { periodInWeek: 1, title: "Chủ đề 1: Chất - Bài 3: Hỗn hợp và dung dịch (Tiết 1)", subSubject: "Chất và năng lượng", integration: "Thí nghiệm phân biệt hỗn hợp và chất đồng nhất" },
      { periodInWeek: 2, title: "Chủ đề 1: Chất - Bài 3: Hỗn hợp và dung dịch (Tiết 2)", subSubject: "Chất và năng lượng", integration: "Cách tách các chất ra khỏi hỗn hợp và dung dịch" }
    ],
    4: [
      { periodInWeek: 1, title: "Chủ đề 1: Chất - Bài 4: Sự biến đổi của chất (Tiết 1)", subSubject: "Chất và năng lượng", integration: "Sự biến đổi lí học (chuyển thể, hòa tan)" },
      { periodInWeek: 2, title: "Chủ đề 1: Chất - Bài 4: Sự biến đổi của chất (Tiết 2)", subSubject: "Chất và năng lượng", integration: "Sự biến đổi hóa học (sinh ra chất mới, đổi màu)" }
    ]
  },

  // 4. LỊCH SỬ VÀ ĐỊA LÍ 5 (2 tiết / tuần)
  "lsdl": {
    1: [
      { periodInWeek: 1, title: "Chủ đề 1: Đất nước và con người Việt Nam - Bài 1: Vị trí địa lí, lãnh thổ và đơn vị hành chính Việt Nam (Tiết 1)", subSubject: "Địa lí", integration: "Xác định vị trí địa lí hình chữ S trên bản đồ thế giới" },
      { periodInWeek: 2, title: "Chủ đề 1: Đất nước và con người Việt Nam - Bài 1: Vị trí địa lí, lãnh thổ và đơn vị hành chính Việt Nam (Tiết 2)", subSubject: "Địa lí", integration: "Các tỉnh thành phố và biển đảo Tổ quốc" }
    ],
    2: [
      { periodInWeek: 1, title: "Chủ đề 1: Đất nước và con người Việt Nam - Bài 2: Thiên nhiên Việt Nam (Tiết 1: Địa hình và khoáng sản)", subSubject: "Địa lí", integration: "Đồi núi chiếm 3/4 diện tích; các mỏ khoáng sản than đá, dầu khí" },
      { periodInWeek: 2, title: "Chủ đề 1: Đất nước và con người Việt Nam - Bài 2: Thiên nhiên Việt Nam (Tiết 2: Khí hậu và sông ngòi)", subSubject: "Địa lí", integration: "Khí hậu nhiệt đới gió mùa và mạng lưới sông ngòi dày đặc" }
    ],
    3: [
      { periodInWeek: 1, title: "Chủ đề 1: Đất nước và con người Việt Nam - Bài 2: Thiên nhiên Việt Nam (Tiết 3: Đất và rừng)", subSubject: "Địa lí", integration: "Đất phù sa màu mỡ và rừng nhiệt đới phong phú" },
      { periodInWeek: 2, title: "Chủ đề 1: Đất nước và con người Việt Nam - Bài 2: Thiên nhiên Việt Nam (Tiết 4: Vận dụng bảo vệ thiên nhiên)", subSubject: "Địa lí", integration: "Bảo vệ tài nguyên rừng và sử dụng khoáng sản hợp lý" }
    ],
    4: [
      { periodInWeek: 1, title: "Chủ đề 1: Đất nước và con người Việt Nam - Bài 3: Biển đảo Việt Nam (Tiết 1)", subSubject: "Địa lí", integration: "Biển Đông rộng lớn và hai quần đảo Hoàng Sa, Trường Sa" },
      { periodInWeek: 2, title: "Chủ đề 1: Đất nước và con người Việt Nam - Bài 3: Biển đảo Việt Nam (Tiết 2)", subSubject: "Địa lí", integration: "Chủ quyền biển đảo và tài nguyên kinh tế biển" }
    ]
  },

  // 5. ĐẠO ĐỨC 5 (1 tiết / tuần)
  "dd": {
    1: [{ periodInWeek: 1, title: "Chủ đề 1: Biết ơn những người có công với quê hương, đất nước - Bài 1. Biết ơn những người có công với quê hương, đất nước (Tiết 1)", subSubject: "Đạo đức", integration: "Kính trọng thương binh, liệt sĩ, người có công" }],
    2: [{ periodInWeek: 1, title: "Chủ đề 1: Biết ơn những người có công với quê hương, đất nước - Bài 1. Biết ơn những người có công với quê hương, đất nước (Tiết 2)", subSubject: "Đạo đức", integration: "Thực hành hành vi đền ơn đáp nghĩa, chăm sóc nghĩa trang liệt sĩ" }],
    3: [{ periodInWeek: 1, title: "Chủ đề 1: Biết ơn những người có công với quê hương, đất nước - Bài 1. Biết ơn những người có công với quê hương, đất nước (Tiết 3)", subSubject: "Đạo đức", integration: "Xử lí tình huống và lan tỏa tinh thần yêu nước" }],
    4: [{ periodInWeek: 1, title: "Chủ đề 2: Tôn trọng sự khác biệt của người khác - Bài 2. Tôn trọng sự khác biệt của người khác (Tiết 1)", subSubject: "Đạo đức", integration: "Tôn trọng sở thích, văn hóa, hoàn cảnh của bạn bè" }]
  },

  // 6. CÔNG NGHỆ 5 (1 tiết / tuần)
  "cn": {
    1: [{ periodInWeek: 1, title: "Phần một: Công nghệ và đời sống - Bài 1. Vai trò của công nghệ (Tiết 1)", subSubject: "Công nghệ", integration: "Vai trò của sản phẩm công nghệ trong gia đình và xã hội" }],
    2: [{ periodInWeek: 1, title: "Phần một: Công nghệ và đời sống - Bài 1. Vai trò của công nghệ (Tiết 2)", subSubject: "Công nghệ", integration: "Đánh giá mặt tích cực và hạn chế của công nghệ" }],
    3: [{ periodInWeek: 1, title: "Phần một: Công nghệ và đời sống - Bài 2. Nhà sáng chế (Tiết 1)", subSubject: "Công nghệ", integration: "Tìm hiểu một số nhà sáng chế tiêu biểu và phát minh lớn" }],
    4: [{ periodInWeek: 1, title: "Phần một: Công nghệ và đời sống - Bài 2. Nhà sáng chế (Tiết 2)", subSubject: "Công nghệ", integration: "Đức tính kiên trì, đam mê tìm tòi của nhà sáng chế" }]
  },

  // 7. HOẠT ĐỘNG TRẢI NGHIỆM 5 (3 tiết / tuần)
  "hdtn": {
    1: [
      { periodInWeek: 1, title: "Chủ đề 1: Mái trường mến yêu - Tiết 1: SHDC: Khai giảng năm học mới & Tự hào truyền thống trường em", subSubject: "Sinh hoạt dưới cờ", integration: "Không khí lễ khai giảng trang nghiêm" },
      { periodInWeek: 2, title: "Chủ đề 1: Mái trường mến yêu - Tiết 2: HĐGDCĐ: Xây dựng kế hoạch rèn luyện cá nhân của học sinh lớp 5", subSubject: "Hoạt động theo chủ đề", integration: "Đặt mục tiêu học tập năm cuối cấp tiểu học" },
      { periodInWeek: 3, title: "Chủ đề 1: Mái trường mến yêu - Tiết 3: SHL: Bầu ban cán sự lớp và xây dựng nội quy lớp học", subSubject: "Sinh hoạt lớp", integration: "Tinh thần dân chủ và trách nhiệm tập thể" }
    ],
    2: [
      { periodInWeek: 1, title: "Chủ đề 1: Mái trường mến yêu - Tiết 4: SHDC: Tự hào truyền thống trường em", subSubject: "Sinh hoạt dưới cờ", integration: "Truyền thống tôn sư trọng đạo, hiếu học" },
      { periodInWeek: 2, title: "Chủ đề 1: Mái trường mến yêu - Tiết 5: HĐGDCĐ: Lập kế hoạch rèn luyện của người đội viên lớn", subSubject: "Hoạt động theo chủ đề", integration: "Gương mẫu đi đầu giúp đỡ các em lớp dưới" },
      { periodInWeek: 3, title: "Chủ đề 1: Mái trường mến yêu - Tiết 6: SHL: Đôi bạn cùng tiến - Xây dựng tình bạn đẹp", subSubject: "Sinh hoạt lớp", integration: "Tương trợ giúp đỡ bạn có hoàn cảnh khó khăn" }
    ],
    3: [
      { periodInWeek: 1, title: "Chủ đề 1: Mái trường mến yêu - Tiết 7: SHDC: Ngày hội văn hóa đọc", subSubject: "Sinh hoạt dưới cờ", integration: "Lan tỏa phong trào đọc sách trong trường học" },
      { periodInWeek: 2, title: "Chủ đề 1: Mái trường mến yêu - Tiết 8: HĐGDCĐ: Giới thiệu cuốn sách em yêu thích", subSubject: "Hoạt động theo chủ đề", integration: "Kĩ năng diễn thuyết và truyền cảm hứng đọc sách" },
      { periodInWeek: 3, title: "Chủ đề 1: Mái trường mến yêu - Tiết 9: SHL: Xây dựng tủ sách lớp học dùng chung", subSubject: "Sinh hoạt lớp", integration: "Ý thức giữ gìn sách và chia sẻ tri thức" }
    ],
    4: [
      { periodInWeek: 1, title: "Chủ đề 1: Mái trường mến yêu - Tiết 10: SHDC: Tuyên truyền an toàn học đường và phòng chống bạo lực", subSubject: "Sinh hoạt dưới cờ", integration: "Xây dựng tình bạn lành mạnh, trường học hạnh phúc" },
      { periodInWeek: 2, title: "Chủ đề 1: Mái trường mến yêu - Tiết 11: HĐGDCĐ: Kĩ năng xử lý xung đột trong giao tiếp bạn bè", subSubject: "Hoạt động theo chủ đề", integration: "Biết lắng nghe, thấu cảm và hòa giải thân thiện" },
      { periodInWeek: 3, title: "Chủ đề 1: Mái trường mến yêu - Tiết 12: SHL: Tổng kết tháng 9 - Khen thưởng tổ, cá nhân tích cực", subSubject: "Sinh hoạt lớp", integration: "Tuyên dương và tạo động lực thi đua học tốt" }
    ]
  }
};

/**
 * Danh mục chủ đề chuẩn 35 tuần của Bộ Giáo dục & Đào tạo (GDPT 2018)
 * Giúp tự động tạo dữ liệu bài học KHDH chuẩn xác từ Tuần 1 đến Tuần 35 cho mọi môn học và khối lớp
 */
export const OFFICIAL_THEMES_35_WEEKS: {
  week: number;
  semester: 1 | 2;
  themeTitleVN: string;
  mathTopicGrade4: string;
  mathTopicGrade1: string;
  mathTopicGrade5?: string;
  tvTopicGrade4: string;
  tvTopicGrade5?: string;
  scienceTopicGrade4: string;
  scienceTopicGrade5?: string;
  histGeoTopicGrade4: string;
  histGeoTopicGrade5?: string;
}[] = [
  { week: 1, semester: 1, themeTitleVN: "Khởi đầu năm học mới - Mỗi người một vẻ", mathTopicGrade4: "Ôn tập số đến 100 000, phép cộng trừ", mathTopicGrade1: "Các số 0 đến 5", tvTopicGrade4: "Bài 1: Điều kì diệu (Danh từ, Câu chủ đề)", scienceTopicGrade4: "Tính chất của nước", histGeoTopicGrade4: "Phương tiện học tập môn Lịch sử và Địa lí" },
  { week: 2, semester: 1, themeTitleVN: "Gia đình và tình bạn thân ái", mathTopicGrade4: "Biểu thức có chứa một chữ, Bài toán ba bước tính", mathTopicGrade1: "Các số 6 đến 10", tvTopicGrade4: "Bài 2: Thi nhạc & Bài 3: Anh em sinh đôi", scienceTopicGrade4: "Sự chuyển thể của nước", histGeoTopicGrade4: "Thiên nhiên vùng Trung du và miền núi Bắc Bộ" },
  { week: 3, semester: 1, themeTitleVN: "Trải nghiệm và khám phá tự nhiên", mathTopicGrade4: "Các số có nhiều chữ số, Lớp triệu", mathTopicGrade1: "Nhiều hơn, ít hơn, bằng nhau", tvTopicGrade4: "Bài 4: Lên rẫy & Bài 5: Bầu trời trong quả trứng", scienceTopicGrade4: "Ô nhiễm và bảo vệ nguồn nước", histGeoTopicGrade4: "Lịch sử văn hóa Đền Hùng" },
  { week: 4, semester: 1, themeTitleVN: "Sáng tạo và ước mơ tuổi thơ", mathTopicGrade4: "Làm tròn số, Yến tạ tấn, Giây thế kỉ", mathTopicGrade1: "So sánh các số trong phạm vi 10", tvTopicGrade4: "Bài 6: Tiếng nói cỏ cây & Bài 7: Tập làm văn", scienceTopicGrade4: "Không khí quanh ta và tính chất không khí", histGeoTopicGrade4: "Dân cư và hoạt động sản xuất vùng Trung du Bắc Bộ" },
  { week: 5, semester: 1, themeTitleVN: "Vượt khó và niềm say mê khoa học", mathTopicGrade4: "Góc nhọn, góc tù, góc bẹt, Hai đường thẳng vuông góc", mathTopicGrade1: "Mấy và mấy (Tách và gộp số)", tvTopicGrade4: "Bài 8: Nhà phát minh sáu tuổi & Bài 9: Con muốn làm một cái cây", scienceTopicGrade4: "Vai trò của không khí và sự cháy", histGeoTopicGrade4: "Đền Hùng và Lễ giỗ Tổ Hùng Vương" },
  { week: 6, semester: 1, themeTitleVN: "Thế giới muôn màu của cây cối và loài vật", mathTopicGrade4: "Hai đường thẳng song song, Cộng trừ các số có nhiều chữ số", mathTopicGrade1: "Hình vuông, hình tròn, hình tam giác, chữ nhật", tvTopicGrade4: "Bài 10: Vua tàu thủy Bạch Thái Bưởi & Bài 11: Lấy hạt ngọc", scienceTopicGrade4: "Bảo vệ môi trường không khí trong lành", histGeoTopicGrade4: "Thiên nhiên vùng Đồng bằng Bắc Bộ" },
  { week: 7, semester: 1, themeTitleVN: "Chắp cánh ước mơ bay xa", mathTopicGrade4: "Tìm hai số khi biết tổng và hiệu của hai số đó", mathTopicGrade1: "Khối lập phương, khối hộp chữ nhật", tvTopicGrade4: "Bài 12: Chiếc đũa thần & Bài 13: Ở vương quốc Tương Lai", scienceTopicGrade4: "Ánh sáng và vai trò của ánh sáng", histGeoTopicGrade4: "Sông Hồng và đê điều ở vùng Đồng bằng Bắc Bộ" },
  { week: 8, semester: 1, themeTitleVN: "Tuổi thơ hồn nhiên và tình bạn bè", mathTopicGrade4: "Nhân với số có một chữ số, Tính chất phép nhân", mathTopicGrade1: "Phép cộng trong phạm vi 10 (khái niệm)", tvTopicGrade4: "Bài 14: Cánh buồm vút cao & Bài 15: Gió vườn", scienceTopicGrade4: "Bóng tối và sự truyền thẳng của ánh sáng", histGeoTopicGrade4: "Hoạt động sản xuất và làng nghề truyền thống Đồng bằng Bắc Bộ" },
  { week: 9, semester: 1, themeTitleVN: "Giữ gìn bản sắc và yêu quý quê hương", mathTopicGrade4: "Chia cho số có một chữ số, Chia có dư", mathTopicGrade1: "Bảng cộng trong phạm vi 10", tvTopicGrade4: "Bài 16: Cây tre Việt Nam & Ôn tập giữa học kì 1", scienceTopicGrade4: "Nhiệt độ và sự truyền nhiệt", histGeoTopicGrade4: "Văn Miếu - Quốc Tử Giám: Trường đại học đầu tiên" },
  { week: 10, semester: 1, themeTitleVN: "Khám phá thế giới đo lường diện tích", mathTopicGrade4: "Đề-xi-mét vuông (dm2), Mét vuông (m2), Mi-li-mét vuông (mm2)", mathTopicGrade1: "Phép trừ trong phạm vi 10 (khái niệm)", tvTopicGrade4: "Ôn tập và đánh giá giữa học kì 1", scienceTopicGrade4: "Vật dẫn nhiệt và vật cách nhiệt", histGeoTopicGrade4: "Thăng Long - Hà Nội ngàn năm văn hiến" },
  { week: 11, semester: 1, themeTitleVN: "Khéo léo và tự giác trong lao động", mathTopicGrade4: "Nhân với số có hai chữ số (Tiết 1 và 2)", mathTopicGrade1: "Bảng trừ trong phạm vi 10", tvTopicGrade4: "Bài 17: Người tìm đường lên các vì sao (Đại từ, Viết bài văn kể chuyện)", scienceTopicGrade4: "Âm thanh và sự lan truyền âm thanh", histGeoTopicGrade4: "Thiên nhiên vùng Duyên hải miền Trung" },
  { week: 12, semester: 1, themeTitleVN: "Vươn tới những đỉnh cao tri thức", mathTopicGrade4: "Luyện tập nhân với số có hai chữ số, Giải toán thực tế", mathTopicGrade1: "Phép cộng, trừ không nhớ trong phạm vi 10", tvTopicGrade4: "Bài 18: Bức tranh của em gái tôi (Chủ ngữ trong câu)", scienceTopicGrade4: "Vai trò của âm thanh trong đời sống và chống ô nhiễm tiếng ồn", histGeoTopicGrade4: "Khí hậu khô hạn và bão lũ ở vùng Duyên hải miền Trung" },
  { week: 13, semester: 1, themeTitleVN: "Gắn bó với cội nguồn và quê mẹ", mathTopicGrade4: "Chia cho số có hai chữ số (Tiết 1 và 2)", mathTopicGrade1: "Vị trí trong không gian (trên dưới, phải trái)", tvTopicGrade4: "Bài 19: Cuộc phiêu lưu của bồ công anh (Vị ngữ trong câu)", scienceTopicGrade4: "Thực vật cần gì để sống?", histGeoTopicGrade4: "Cố đô Huế - Di sản văn hóa thế giới" },
  { week: 14, semester: 1, themeTitleVN: "Khám phá các hình hình học đặc sắc", mathTopicGrade4: "Hình bình hành, Diện tích hình bình hành, Hình thoi", mathTopicGrade1: "Ôn tập các số và phép tính trong phạm vi 10", tvTopicGrade4: "Bài 20: Ngọn đuốc trong đêm (Quy tắc viết tên cơ quan, tổ chức)", scienceTopicGrade4: "Động vật cần gì để sống?", histGeoTopicGrade4: "Phố cổ Hội An - Nét đẹp thương cảng cổ xưa" },
  { week: 15, semester: 1, themeTitleVN: "Sống có trách nhiệm và tình yêu thương", mathTopicGrade4: "Diện tích hình thoi, Biểu thức có chứa hai, ba chữ", mathTopicGrade1: "Làm quen các số từ 11 đến 20", tvTopicGrade4: "Bài 21: Hải Thượng Lãn Ông (Trạng ngữ chỉ thời gian, nơi chốn)", scienceTopicGrade4: "Chăm sóc và bảo vệ cây trồng, vật nuôi", histGeoTopicGrade4: "Dân cư và hoạt động kinh tế biển Duyên hải miền Trung" },
  { week: 16, semester: 1, themeTitleVN: "Tổng kết nỗ lực - Hướng tới kì thi học kì 1", mathTopicGrade4: "Ôn tập về số tự nhiên, hình học và giải toán học kì 1", mathTopicGrade1: "Phép cộng dạng 10 + 3, 14 + 3", tvTopicGrade4: "Bài 22: Chiến thắng Điện Biên Phủ (Trạng ngữ chỉ mục đích, nguyên nhân)", scienceTopicGrade4: "Ôn tập chủ đề Chất và Năng lượng", histGeoTopicGrade4: "Thiên nhiên vùng Tây Nguyên đất đỏ bazan" },
  { week: 17, semester: 1, themeTitleVN: "Ôn tập toàn diện học kì 1", mathTopicGrade4: "Luyện đề ôn tập học kì 1: Số, phép tính, hình học, giải toán", mathTopicGrade1: "Phép trừ dạng 17 - 3, 17 - 7", tvTopicGrade4: "Ôn tập cuối học kì 1: Đọc hiểu, Từ và câu, Tập làm văn", scienceTopicGrade4: "Ôn tập và chuẩn bị kiểm tra học kì 1", histGeoTopicGrade4: "Lễ hội cồng chiêng Tây Nguyên" },
  { week: 18, semester: 1, themeTitleVN: "Kiểm tra và đánh giá chất lượng Học kì 1", mathTopicGrade4: "Kiểm tra định kì cuối học kì 1 & Sửa bài", mathTopicGrade1: "Kiểm tra cuối học kì 1 môn Toán", tvTopicGrade4: "Kiểm tra định kì cuối học kì 1 & Sơ kết học kì", scienceTopicGrade4: "Kiểm tra học kì 1 môn Khoa học", histGeoTopicGrade4: "Kiểm tra học kì 1 môn Lịch sử và Địa lí" },

  // HỌC KÌ 2 (TUẦN 19 - 35)
  { week: 19, semester: 2, themeTitleVN: "Khởi đầu Học kì 2 - Thế giới phân số kì diệu", mathTopicGrade4: "Khái niệm phân số, Phân số và phép chia số tự nhiên", mathTopicGrade1: "Các số đến 20, So sánh các số đến 20", tvTopicGrade4: "Bài 23: Về thăm bà (Luyện tập trạng ngữ, Miêu tả con vật)", scienceTopicGrade4: "Nấm và vai trò của nấm trong đời sống", histGeoTopicGrade4: "Hoạt động sản xuất cây công nghiệp vùng Tây Nguyên" },
  { week: 20, semester: 2, themeTitleVN: "Rút gọn và quy đồng mẫu số", mathTopicGrade4: "Phân số bằng nhau, Rút gọn phân số, Quy đồng mẫu số", mathTopicGrade1: "Đo độ dài: Xăng-ti-mét (cm)", tvTopicGrade4: "Bài 24: Bác sĩ Y-éc-xanh (Dấu hai chấm, Lập dàn ý miêu tả con vật)", scienceTopicGrade4: "Nấm gây hại và cách phòng ngừa", histGeoTopicGrade4: "Thiên nhiên vùng Nam Bộ trù phú" },
  { week: 21, semester: 2, themeTitleVN: "So sánh phân số và tình bạn đẹp", mathTopicGrade4: "So sánh hai phân số cùng và khác mẫu số, Luyện tập chung", mathTopicGrade1: "Thực hành đo và ước lượng độ dài", tvTopicGrade4: "Bài 25: Đất nước ngàn năm (Câu cảm, Quan sát và tìm ý miêu tả cây cối)", scienceTopicGrade4: "Vi khuẩn quanh ta và ích lợi của vi khuẩn", histGeoTopicGrade4: "Mạng lưới sông ngòi và kênh rạch vùng Nam Bộ" },
  { week: 22, semester: 2, themeTitleVN: "Phép cộng phân số và tình yêu thiên nhiên", mathTopicGrade4: "Phép cộng hai phân số cùng và khác mẫu số, Tính chất phép cộng", mathTopicGrade1: "Các số tròn chục đến 100", tvTopicGrade4: "Bài 26: Biển quê em (Câu khiến, Lập dàn ý miêu tả cây cối)", scienceTopicGrade4: "Vi khuẩn gây bệnh cho người và phòng tránh", histGeoTopicGrade4: "Hoạt động sản xuất nông nghiệp và thủy sản Nam Bộ" },
  { week: 23, semester: 2, themeTitleVN: "Phép trừ phân số và tinh thần tương thân tương ái", mathTopicGrade4: "Phép trừ hai phân số cùng và khác mẫu số, Luyện tập phép tính", mathTopicGrade1: "Cộng, trừ các số tròn chục", tvTopicGrade4: "Bài 27: Rừng cúc phương (Mở rộng vốn từ Du lịch, Viết đoạn văn)", scienceTopicGrade4: "Chuỗi thức ăn trong tự nhiên (Tiết 1)", histGeoTopicGrade4: "Địa đạo Củ Chi - Di tích lịch sử hào hùng" },
  { week: 24, semester: 2, themeTitleVN: "Phép nhân phân số và thế giới ước mơ", mathTopicGrade4: "Phép nhân phân số, Tìm phân số của một số", mathTopicGrade1: "Các số có hai chữ số (từ 21 đến 50)", tvTopicGrade4: "Bài 28: Dòng sông mặc áo (Nói và nghe: Bảo vệ cảnh quan thiên nhiên)", scienceTopicGrade4: "Chuỗi thức ăn trong tự nhiên (Tiết 2: Mối quan hệ sinh thái)", histGeoTopicGrade4: "Thành phố Hồ Chí Minh - Trung tâm kinh tế văn hóa lớn" },
  { week: 25, semester: 2, themeTitleVN: "Phép chia phân số và bài toán thực tế", mathTopicGrade4: "Phép chia phân số, Bốn phép tính với phân số", mathTopicGrade1: "Các số có hai chữ số (từ 51 đến 99)", tvTopicGrade4: "Bài 29: Bài ca về trái đất (Từ ngữ chỉ phẩm chất con người)", scienceTopicGrade4: "Vai trò của các chất dinh dưỡng đối với cơ thể", histGeoTopicGrade4: "Nghĩa trang Hàng Dương và Côn Đảo thiêng liêng" },
  { week: 26, semester: 2, themeTitleVN: "Thống kê và xác suất quanh em", mathTopicGrade4: "Dãy số liệu thống kê, Biểu đồ cột, Xác suất sự kiện", mathTopicGrade1: "So sánh các số có hai chữ số", tvTopicGrade4: "Bài 30: Nụ cười thiên thần (Điền vào mẫu đơn có sẵn)", scienceTopicGrade4: "Thực phẩm an toàn và chế độ ăn uống lành mạnh", histGeoTopicGrade4: "Biển đảo Việt Nam và chủ quyền Hoàng Sa, Trường Sa" },
  { week: 27, semester: 2, themeTitleVN: "Tìm hai số khi biết tổng và tỉ số", mathTopicGrade4: "Tỉ số, Bài toán tìm hai số khi biết tổng và tỉ số", mathTopicGrade1: "Bảng các số từ 1 đến 100", tvTopicGrade4: "Ôn tập và đánh giá giữa học kì 2 (Tiết 1 đến 3)", scienceTopicGrade4: "Phòng tránh các bệnh lây qua đường tiêu hóa", histGeoTopicGrade4: "Bảo vệ tài nguyên và môi trường biển đảo Tổ quốc" },
  { week: 28, semester: 2, themeTitleVN: "Tìm hai số khi biết hiệu và tỉ số", mathTopicGrade4: "Bài toán tìm hai số khi biết hiệu và tỉ số, Luyện tập chung", mathTopicGrade1: "Cộng các số không nhớ trong phạm vi 100", tvTopicGrade4: "Đánh giá giữa học kì 2 & Bài 31: Khúc ca hòa bình", scienceTopicGrade4: "An toàn khi tiếp xúc với thực phẩm", histGeoTopicGrade4: "Ôn tập Lịch sử và Địa lí giữa học kì 2" },
  { week: 29, semester: 2, themeTitleVN: "Tỉ lệ bản đồ và không gian địa lí", mathTopicGrade4: "Tỉ lệ bản đồ, Ứng dụng tỉ lệ bản đồ vào thực tế", mathTopicGrade1: "Trừ các số không nhớ trong phạm vi 100", tvTopicGrade4: "Bài 32: Ước mơ của em (Viết bài văn miêu tả hoàn chỉnh)", scienceTopicGrade4: "Sinh vật và môi trường sống của chúng", histGeoTopicGrade4: "Đô thị và lối sống văn minh hiện đại" },
  { week: 30, semester: 2, themeTitleVN: "Hệ thống hóa kiến thức Số học và Phân số", mathTopicGrade4: "Ôn tập về số tự nhiên và phân số, Luyện tính nhanh", mathTopicGrade1: "Thời gian: Xem giờ đúng trên đồng hồ", tvTopicGrade4: "Ôn tập chuyên đề: Danh từ, Động từ, Tính từ", scienceTopicGrade4: "Tác động của con người tới môi trường tự nhiên", histGeoTopicGrade4: "Giao lưu văn hóa và hội nhập quốc tế" },
  { week: 31, semester: 2, themeTitleVN: "Củng cố Hình học và Đo lường", mathTopicGrade4: "Ôn tập chu vi, diện tích các hình đã học (vuông, chữ nhật, bình hành, thoi)", mathTopicGrade1: "Các ngày trong tuần (Thứ Hai đến Chủ nhật)", tvTopicGrade4: "Ôn tập chuyên đề: Các kiểu câu (kể, hỏi, cảm, khiến)", scienceTopicGrade4: "Bảo vệ sự đa dạng sinh thái xung quanh em", histGeoTopicGrade4: "Các di sản thế giới tại Việt Nam" },
  { week: 32, semester: 2, themeTitleVN: "Rèn luyện kĩ năng Giải toán tổng hợp", mathTopicGrade4: "Ôn tập các dạng toán có lời văn (trung bình cộng, tổng-hiệu, tổng-tỉ, hiệu-tỉ)", mathTopicGrade1: "Luyện tập chung về số và thời gian", tvTopicGrade4: "Ôn tập chuyên đề: Tập làm văn miêu tả cây cối, con vật", scienceTopicGrade4: "Dự án Khoa học: Mầm xanh tương lai", histGeoTopicGrade4: "Tự hào quê hương đất nước Việt Nam đổi mới" },
  { week: 33, semester: 2, themeTitleVN: "Luyện đề thi thử và Tăng tốc cuối năm", mathTopicGrade4: "Luyện các bộ đề kiểm tra cuối năm (Đề số 1 và số 2)", mathTopicGrade1: "Luyện tập tổng hợp kiến thức Toán lớp 1", tvTopicGrade4: "Luyện đề ôn tập thi học kì 2 môn Tiếng Việt", scienceTopicGrade4: "Hệ thống hóa kiến thức Khoa học lớp 4", histGeoTopicGrade4: "Hệ thống hóa kiến thức Lịch sử và Địa lí lớp 4" },
  { week: 34, semester: 2, themeTitleVN: "Ôn tập toàn diện cuối năm học", mathTopicGrade4: "Ôn tập toàn diện chương trình Toán 4, Giải đáp thắc mắc", mathTopicGrade1: "Ôn tập cuối năm môn Toán 1", tvTopicGrade4: "Ôn tập toàn diện chương trình Tiếng Việt 4, Chuẩn bị kiểm tra", scienceTopicGrade4: "Ôn tập và hướng dẫn phương pháp làm bài thi Khoa học", histGeoTopicGrade4: "Ôn tập và hướng dẫn làm bài kiểm tra Lịch sử và Địa lí" },
  { week: 35, semester: 2, themeTitleVN: "Đánh giá định kì cuối năm & Tổng kết năm học", mathTopicGrade4: "Kiểm tra định kì cuối năm học môn Toán & Sửa bài tổng kết", mathTopicGrade1: "Kiểm tra định kì cuối năm học môn Toán lớp 1", tvTopicGrade4: "Kiểm tra định kì cuối năm môn Tiếng Việt & Tổng kết năm học", scienceTopicGrade4: "Kiểm tra định kì cuối năm học môn Khoa học", histGeoTopicGrade4: "Kiểm tra định kì cuối năm học môn Lịch sử và Địa lí" },
];

/**
 * Hàm tra cứu chính sách bài dạy cho bất kì tuần nào từ Tuần 1 đến Tuần 35
 * cho tất cả các khối lớp (1, 2, 3, 4, 5) và các môn học
 */
export function get35WeekCurriculumEntry(
  subject: string,
  grade: number,
  ppct: number,
  week: number = 1,
  periodInWeek?: number
): CurriculumLessonEntry {
  const safeWeek = Math.max(1, Math.min(35, week || 1));
  const normSubj = subject.toLowerCase().trim();

  // Xác định số tiết trong tuần nếu chưa truyền
  const calcPeriodInWeek = periodInWeek || ((ppct - 1) % 5 + 1);

  // 1. Kiểm tra nếu có dữ liệu chi tiết trong GRADE_4_CURRICULUM_35_WEEKS hoặc GRADE_5_CURRICULUM_35_WEEKS
  if (grade === 4 || grade === 5) {
    let key = "";
    if (normSubj.includes("tiếng việt") || normSubj.includes("tv")) key = "tv";
    else if (normSubj.includes("toán") || normSubj.includes("math")) key = "toan";
    else if (normSubj.includes("khoa học") || normSubj.includes("kh")) key = "kh";
    else if (normSubj.includes("lịch sử") || normSubj.includes("địa lí") || normSubj.includes("ls&đl")) key = "lsdl";
    else if (normSubj.includes("công nghệ") || normSubj.includes("cn")) key = "cn";
    else if (normSubj.includes("đạo đức")) key = "dd";
    else if (normSubj.includes("trải nghiệm") || normSubj.includes("hđtn")) key = "hdtn";

    const targetGradeMap = grade === 5 ? GRADE_5_CURRICULUM_35_WEEKS : GRADE_4_CURRICULUM_35_WEEKS;

    if (key && targetGradeMap[key]?.[safeWeek]) {
      const weekList = targetGradeMap[key][safeWeek];
      const match = weekList.find(item => item.periodInWeek === calcPeriodInWeek) || weekList[0];
      if (match) {
        return {
          week: safeWeek,
          periodInWeek: calcPeriodInWeek,
          ppct,
          title: match.title,
          subSubject: match.subSubject,
          integrationNote: match.integration || "Tích hợp Khung năng lực số NLS và Công văn 2345/BGDĐT."
        };
      }
    }
  }

  // 2. Tra cứu qua theme tuần của Bộ Giáo dục (OFFICIAL_THEMES_35_WEEKS)
  const theme = OFFICIAL_THEMES_35_WEEKS.find(t => t.week === safeWeek) || OFFICIAL_THEMES_35_WEEKS[0];

  // 2.1. TOÁN (5 tiết / tuần)
  if (normSubj.includes("toán") || normSubj.includes("math") || normSubj.includes("t.cường t") || normSubj.includes("tct")) {
    const isEnhancement = normSubj.includes("tăng cường") || normSubj.includes("t.cường") || normSubj.includes("tc");
    const mainTopic = grade === 5 ? (theme.mathTopicGrade5 || `Chủ đề Toán lớp 5 tuần ${safeWeek}`) : (grade === 4 ? theme.mathTopicGrade4 : (grade === 1 ? theme.mathTopicGrade1 : `Chủ đề Toán Tuần ${safeWeek}: ${theme.themeTitleVN}`));
    
    let lessonTitle = "";
    if (isEnhancement) {
      lessonTitle = `Tăng cường Toán: Thực hành rèn kĩ năng ${mainTopic} (Tiết ${calcPeriodInWeek})`;
    } else {
      lessonTitle = `Bài học Toán Tuần ${safeWeek}: ${mainTopic} (Tiết ${calcPeriodInWeek})`;
    }

    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title: lessonTitle,
      subSubject: isEnhancement ? "Tăng cường Toán" : (calcPeriodInWeek <= 3 ? "Lý thuyết & Khám phá" : "Luyện tập & Thực hành"),
      integrationNote: `Tích hợp AI 2.D1.1 (Ứng dụng giải toán thực tế) & NLS 5.2.CB1a (Tư duy tính toán).`,
      detailedGoals: {
        specificCompetencies: [
          `Nắm vững kiến thức trọng tâm tuần ${safeWeek}: ${mainTopic}.`,
          `Thực hành thành thạo các bài tập tính toán và giải toán có lời văn theo chuẩn kiến thức kĩ năng môn Toán lớp ${grade}.`,
          `Vận dụng linh hoạt kiến thức đã học để giải quyết các bài toán liên hệ thực tiễn đời sống.`
        ],
        generalCompetencies: [
          "Năng lực tự chủ và tự học: Tự giác làm bài tập trong sách giáo khoa và vở bài tập toán.",
          "Năng lực giao tiếp và hợp tác: Trao đổi cách giải bài toán cùng bạn, tự tin trình bày trước lớp."
        ],
        qualities: [
          "Chăm chỉ: Rèn luyện tính cẩn thận, chính xác, nắn nót từng con số.",
          "Trách nhiệm: Có ý thức hoàn thành tốt nhiệm vụ học tập được giao."
        ],
        integration: "Tích hợp Giáo dục STEM & Khung Năng lực số Bộ GD&ĐT."
      }
    };
  }

  // 2.2. TIẾNG VIỆT
  if (normSubj.includes("tiếng việt") || normSubj.includes("tv") || normSubj.includes("t.cường tv") || normSubj.includes("tctv")) {
    const isEnhancement = normSubj.includes("tăng cường") || normSubj.includes("t.cường") || normSubj.includes("tc");
    const mainTopic = grade === 5 ? (theme.tvTopicGrade5 || `Chủ điểm Tiếng Việt Lớp 5 Tuần ${safeWeek}`) : (grade === 4 ? theme.tvTopicGrade4 : `Chủ điểm Tiếng Việt Tuần ${safeWeek}: ${theme.themeTitleVN}`);
    
    let subSubj = "Đọc";
    if (calcPeriodInWeek === 1 || calcPeriodInWeek === 4) subSubj = "Đọc";
    else if (calcPeriodInWeek === 2) subSubj = "Luyện từ và câu";
    else if (calcPeriodInWeek === 3 || calcPeriodInWeek === 6) subSubj = "Viết";
    else if (calcPeriodInWeek === 5) subSubj = "Nói và nghe";
    else subSubj = "Đọc mở rộng";

    let lessonTitle = "";
    if (isEnhancement) {
      lessonTitle = `Tăng cường Tiếng Việt: Rèn chữ và củng cố kĩ năng ${subSubj} tuần ${safeWeek}`;
    } else {
      lessonTitle = `Tuần ${safeWeek} - ${mainTopic} (${subSubj} - Tiết ${calcPeriodInWeek})`;
    }

    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title: lessonTitle,
      subSubject: isEnhancement ? "Tăng cường Tiếng Việt" : subSubj,
      integrationNote: `QCN: Tôn trọng quyền được biểu đạt ý kiến; NLS 2.3.CB1a: Giao tiếp số lịch sự; AI 4.A1.2.`,
      detailedGoals: {
        specificCompetencies: [
          `Đọc đúng, diễn cảm hoặc viết đúng chính tả, hoàn thiện bài học tuần ${safeWeek}: ${mainTopic}.`,
          `Hiểu nội dung bài học, trả lời đúng các câu hỏi tìm hiểu bài và làm tốt các bài tập ngữ pháp, tập làm văn.`,
          `Vận dụng từ ngữ phong phú vào giao tiếp hàng ngày.`
        ],
        generalCompetencies: [
          "Tự chủ: Tự giác đọc trước bài ở nhà, tích cực chuẩn bị bài học.",
          "Giao tiếp và hợp tác: Tự tin chia sẻ cảm xúc, đóng vai và kể chuyện lưu loát."
        ],
        qualities: [
          "Yêu nước: Tự hào về sự giàu đẹp, trong sáng của tiếng Việt.",
          "Nhân ái: Biết yêu thương, đồng cảm với những số phận và nhân vật trong bài đọc."
        ],
        integration: "Tích hợp Giáo dục Quyền con người (QCN) & Năng lực số (NLS)."
      }
    };
  }

  // 2.3. KHOA HỌC (Khối 4, 5)
  if (normSubj.includes("khoa học") || normSubj.includes("kh")) {
    const topic = theme.scienceTopicGrade4;
    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title: `Bài học Khoa học Tuần ${safeWeek}: ${topic} (Tiết ${calcPeriodInWeek})`,
      subSubject: "Khoa học và Đời sống",
      integrationNote: "BVMT: Bảo vệ môi trường sống tự nhiên; STEM: Thực hành quan sát và thí nghiệm khoa học.",
      detailedGoals: {
        specificCompetencies: [
          `Nêu được các hiện tượng và quy luật tự nhiên liên quan đến bài học: ${topic}.`,
          `Biết làm thí nghiệm đơn giản hoặc quan sát mẫu vật thực tế để rút ra kiến thức bài học.`,
          `Ý thức áp dụng kiến thức khoa học vào việc bảo vệ sức khỏe và môi trường xung quanh.`
        ],
        generalCompetencies: [
          "Năng lực tự chủ: Quan sát khoa học và ghi chép trung thực số liệu thí nghiệm.",
          "Năng lực giải quyết vấn đề và sáng tạo: Đề xuất giải pháp bảo vệ môi trường từ bài học."
        ],
        qualities: [
          "Chăm chỉ: Tích cực tham gia các hoạt động thực hành, thí nghiệm.",
          "Trách nhiệm: Có ý thức giữ gìn vệ sinh phòng học và an toàn thí nghiệm."
        ],
        integration: "Tích hợp Giáo dục STEM & Bảo vệ Môi trường (BVMT)."
      }
    };
  }

  // 2.4. LỊCH SỬ VÀ ĐỊA LÍ (Khối 4, 5)
  if (normSubj.includes("lịch sử") || normSubj.includes("địa lí") || normSubj.includes("ls&đl") || normSubj.includes("địa lý")) {
    const topic = theme.histGeoTopicGrade4;
    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title: `Bài học Lịch sử và Địa lí Tuần ${safeWeek}: ${topic} (Tiết ${calcPeriodInWeek})`,
      subSubject: "Lịch sử và Địa phương",
      integrationNote: "QPAN: Giáo dục truyền thống yêu nước và chủ quyền biển đảo, biên cương Tổ quốc.",
      detailedGoals: {
        specificCompetencies: [
          `Nêu được các nét đặc trưng về lịch sử, văn hóa hoặc địa hình, khí hậu bài học: ${topic}.`,
          `Sử dụng được bản đồ, lược đồ hoặc tranh ảnh lịch sử để trình bày thông tin bài học.`,
          `Tự hào về truyền thống dựng nước và giữ nước vẻ vang của dân tộc.`
        ],
        generalCompetencies: [
          "Giao tiếp và hợp tác: Làm việc nhóm tìm hiểu tư liệu lịch sử, địa lí.",
          "Tự học: Khai thác thông tin từ sách giáo khoa và bản đồ số."
        ],
        qualities: [
          "Yêu nước: Tự hào về non sông gấm vóc Việt Nam và các anh hùng dân tộc.",
          "Trách nhiệm: Có ý thức bảo tồn các di sản văn hóa và cảnh quan quê hương."
        ],
        integration: "Tích hợp Giáo dục Quốc phòng & An ninh (QPAN - Thông tư 08/2024)."
      }
    };
  }

  // 2.5. TỰ NHIÊN VÀ XÃ HỘI (Khối 1, 2, 3)
  if (normSubj.includes("tự nhiên") || normSubj.includes("tnxh") || normSubj.includes("xã hội")) {
    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title: `Tự nhiên và Xã hội Tuần ${safeWeek}: Chủ đề ${theme.themeTitleVN} (Tiết ${calcPeriodInWeek})`,
      subSubject: "Tự nhiên và Đời sống",
      integrationNote: "KNS: Giữ gìn an toàn thân thể và chăm sóc sức khỏe; BVMT: Bảo vệ cây xanh và vật nuôi.",
    };
  }

  // 2.6. HOẠT ĐỘNG TRẢI NGHIỆM (Khối 1-5, 3 tiết / tuần)
  if (normSubj.includes("trải nghiệm") || normSubj.includes("hđtn") || normSubj.includes("t. nghiệm")) {
    let sub = "Hoạt động giáo dục theo chủ đề";
    let title = `Hoạt động trải nghiệm Tuần ${safeWeek}: ${theme.themeTitleVN}`;
    if (calcPeriodInWeek === 1) {
      sub = "Sinh hoạt dưới cờ";
      title = `Sinh hoạt dưới cờ Tuần ${safeWeek}: Chủ đề '${theme.themeTitleVN}'`;
    } else if (calcPeriodInWeek === 3) {
      sub = "Sinh hoạt lớp";
      title = `Sinh hoạt lớp Tuần ${safeWeek}: Sơ kết tuần ${safeWeek} và Kế hoạch tuần tới`;
    }
    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title,
      subSubject: sub,
      integrationNote: "QCN: Quyền được tham gia và bày tỏ ý kiến; KNS: Kĩ năng tự quản và hợp tác nhóm.",
    };
  }

  // 2.7. ĐẠO ĐỨC (1 tiết / tuần)
  if (normSubj.includes("đạo đức")) {
    return {
      week: safeWeek,
      periodInWeek: 1,
      ppct,
      title: `Đạo đức Tuần ${safeWeek}: Rèn luyện thói quen '${theme.themeTitleVN}'`,
      subSubject: "Chuẩn mực hành vi",
      integrationNote: "QCN: Tôn trọng quyền con người; KNS: Ứng xử văn minh, lễ phép, trung thực.",
    };
  }

  // 2.8. CÔNG NGHỆ (1 tiết / tuần)
  if (normSubj.includes("công nghệ") || normSubj.includes("cn")) {
    return {
      week: safeWeek,
      periodInWeek: 1,
      ppct,
      title: `Công nghệ Tuần ${safeWeek}: Ứng dụng kĩ thuật và đời sống tuần ${safeWeek}`,
      subSubject: "Công nghệ và Đời sống",
      integrationNote: "STEM: Lắp ghép mô hình kĩ thuật; NLS: Khám phá công nghệ thông minh.",
    };
  }

  // 2.9. TIN HỌC
  if (normSubj.includes("tin học") || normSubj.includes("th") || normSubj.includes("tin")) {
    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title: `Tin học Tuần ${safeWeek}: Kĩ năng số và ứng dụng phần mềm tuần ${safeWeek} (Tiết ${calcPeriodInWeek})`,
      subSubject: "Công nghệ số",
      integrationNote: "NLS 4.1.CB1a: An toàn bảo mật thông tin; AI 2.A2.1: Hiểu biết về trí tuệ nhân tạo.",
    };
  }

  // 2.10. GIÁO DỤC THỂ CHẤT
  if (normSubj.includes("thể chất") || normSubj.includes("gdtc") || normSubj.includes("thể dục")) {
    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title: `Giáo dục Thể chất Tuần ${safeWeek}: Đội hình đội ngũ và Bài tập phát triển thể lực (Tiết ${calcPeriodInWeek})`,
      subSubject: "Vận động cơ bản",
      integrationNote: "KNS: Rèn luyện sức bền, tinh thần kỉ luật và nếp sống khỏe mạnh.",
    };
  }

  // 2.11. ÂM NHẠC
  if (normSubj.includes("âm nhạc") || normSubj.includes("an")) {
    return {
      week: safeWeek,
      periodInWeek: 1,
      ppct,
      title: `Âm nhạc Tuần ${safeWeek}: Học hát và gõ đệm theo bài hát chủ đề '${theme.themeTitleVN}'`,
      subSubject: "Hát & Nhạc cụ",
      integrationNote: "KNS: Tự tin biểu diễn và cảm thụ nghệ thuật âm nhạc.",
    };
  }

  // 2.12. MĨ THUẬT
  if (normSubj.includes("mĩ thuật") || normSubj.includes("mt") || normSubj.includes("mỹ thuật")) {
    return {
      week: safeWeek,
      periodInWeek: 1,
      ppct,
      title: `Mĩ thuật Tuần ${safeWeek}: Sáng tạo hội họa và tạo hình chủ đề '${theme.themeTitleVN}'`,
      subSubject: "Hội họa & Điêu khắc",
      integrationNote: "STEM: Tạo hình từ vật liệu tái chế thân thiện môi trường.",
    };
  }

  // 2.13. TIẾNG ANH
  if (normSubj.includes("tiếng anh") || normSubj.includes("ta") || normSubj.includes("english")) {
    return {
      week: safeWeek,
      periodInWeek: calcPeriodInWeek,
      ppct,
      title: `English Week ${safeWeek}: Unit Lesson & Practice (Period ${calcPeriodInWeek})`,
      subSubject: "Vocabulary & Communication",
      integrationNote: "Global Citizenship: Tự tin giao tiếp tiếng Anh cơ bản trong môi trường số.",
    };
  }

  // Fallback chung
  return {
    week: safeWeek,
    periodInWeek: calcPeriodInWeek,
    ppct,
    title: `Bài dạy môn ${subject} Tuần ${safeWeek} - Tiết PPCT ${ppct}`,
    subSubject: "Theo phân phối chương trình",
    integrationNote: "Tích hợp Năng lực số và Công văn 2345/BGDĐT."
  };
}
