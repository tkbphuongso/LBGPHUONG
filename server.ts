import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI endpoint to generate/complete KHBD
  app.post("/api/gemini/generate-khbd", async (req, res) => {
    try {
      const {
        grade,
        subject,
        lessonTitle,
        period,
        integrationType,
        customRequirements,
        teacherName,
        className,
      } = req.body;

      const ai = getGenAI();
      const prompt = `Bạn là chuyên gia giáo dục tiểu học Việt Nam, nắm vững chương trình GDPT 2018, Công văn 2345/BGDĐT-GDTH, Bộ sách "Kết Nối Tri Thức Với Cuộc Sống" (theo mẫu giáo án chi tiết trên tailieugiaoduc.edu.vn), Thông tư 02/2025/TT-BGDĐT & CV 3456/BGDĐT về Năng lực số và AI, Quyền con người (QCN), QPAN (TT 08/2024), Dinh dưỡng, BVMT, KNS, STEM.

Hãy soạn thảo KẾ HOẠCH BÀI DẠY (KHBD) CỰC KỲ CHI TIẾT theo chuẩn mẫu giáo án chuẩn cho giáo viên chủ nhiệm và giáo viên bộ môn:
- Khối lớp: Khối ${grade || 1} (Lớp: ${className || "1A"})
- Giáo viên giảng dạy: ${teacherName || "Giáo viên"}
- Môn học: ${subject || "Tiếng Việt"}
- Tên bài dạy: ${lessonTitle || "Bài học mới"}
- Tiết PPCT / Tiết theo TKB: ${period || "Tiết 1"}
- Tích hợp yêu cầu: ${integrationType || "Năng lực số (NLS), AI, Quyền con người, QPAN, Dinh dưỡng, BVMT, KNS, Học thông qua chơi phù hợp"}
- YÊU CẦU ĐẶC BIỆT BẮT BUỘC:
  1. Cột Hoạt động của giáo viên: Ghi chi tiết từng lời giảng, câu hỏi gợi mở cụ thể, hiệu lệnh, thao tác làm mẫu trên bảng, hướng dẫn từng bước viết nét chữ / giải toán / đọc hiểu.
  2. Cột Hoạt động của học sinh: PHẢI CỰC KỲ CỤ THỂ "HỌC SINH ĐỌC GÌ, LÀM GÌ, VIẾT GÌ, TÍNH GÌ, TRẢ LỜI CÂU HỎI RA SAO":
     - Đọc gì: Ghi rõ cụ thể âm, vần, tiếng, từ ngữ, câu văn, khổ thơ, đoạn đọc trong SGK (ví dụ: đọc âm a, b; tiếng ba, bà, bá; câu "Ba bế bé"; đoạn trích SGK; từ ngữ khó "xào xạc, biếc xanh"...; đọc cá nhân, đọc cặp đôi, đọc đồng thanh).
     - Làm gì / Viết gì / Tính gì: Ghi rõ thao tác đồ dùng (gài chữ, đặt thước kẻ), viết bảng con nét gì chữ gì, làm bài tập 1, 2, 3 SGK trang mấy vào vở, phép tính cụ thể và kết quả ra sao.
     - Trả lời gì: Ghi rõ câu trả lời đầy đủ của học sinh cho từng câu hỏi đọc hiểu / tìm tòi.
  3. Cấu trúc chuẩn 4 bước CV 2345:
     - 1. Khởi động (5-7 phút)
     - 2. Khám phá kiến thức mới (12-15 phút)
     - 3. Luyện tập / Thực hành (12-15 phút)
     - 4. Vận dụng / Trải nghiệm (3-5 phút)

Hãy trả về định dạng JSON thuần túy (không bọc trong markdown codeblock nếu có thể, hoặc bọc trong \`\`\`json) với cấu trúc như sau:
{
  "title": "TÊN BÀI HỌC",
  "subject": "${subject}",
  "grade": ${grade},
  "period": "${period}",
  "goals": {
    "specificCompetencies": ["Năng lực đặc thù 1...", "Năng lực đặc thù 2..."],
    "generalCompetencies": ["Năng lực tự chủ, tự học...", "Năng lực giao tiếp và hợp tác...", "Năng lực giải quyết vấn đề..."],
    "qualities": ["Phẩm chất nhân ái...", "Phẩm chất chăm chỉ...", "Phẩm chất trách nhiệm..."],
    "integration": "Nội dung tích hợp cụ thể (NLS mã hóa, AI YCCĐ, QCN, QPAN, Dinh dưỡng, BVMT, KNS, STEM...)"
  },
  "materials": {
    "teacher": ["Kế hoạch bài dạy, bài giảng điện tử...", "Thiết bị, đồ dùng..."],
    "students": ["Sách giáo khoa...", "Vở bài tập, bảng con..."]
  },
  "activities": [
    {
      "step": "1. Khởi động",
      "time": "5-7 phút",
      "target": "Tạo không khí vui tươi, kết nối kiến thức...",
      "teacherActivities": ["- GV tổ chức trò chơi...", "- GV dẫn dắt giới thiệu bài..."],
      "studentActivities": ["- HS tham gia trò chơi...", "- HS đọc thầm / trả lời câu hỏi..."]
    },
    {
      "step": "2. Khám phá kiến thức mới",
      "time": "12-15 phút",
      "target": "Hình thành kiến thức và kỹ năng trọng tâm...",
      "teacherActivities": ["- GV hướng dẫn...", "- GV đọc mẫu / viết mẫu..."],
      "studentActivities": ["- HS quan sát...", "- HS đọc to từ ngữ / câu văn: ...", "- HS thực hành thao tác bảng gài / tính toán: ..."]
    },
    {
      "step": "3. Luyện tập / Thực hành",
      "time": "12-15 phút",
      "target": "Củng cố kiến thức và rèn luyện kỹ năng qua bài tập SGK...",
      "teacherActivities": ["- Bài 1 (SGK tr...): GV hướng dẫn...", "- Bài 2: GV yêu cầu..."],
      "studentActivities": ["- HS làm Bài 1: Đọc và trả lời...", "- HS làm Bài 2 vào vở: Viết câu / thực hiện phép tính...", "- Đổi chéo vở kiểm tra bài cho bạn cùng bàn."]
    },
    {
      "step": "4. Vận dụng / Trải nghiệm",
      "time": "3-5 phút",
      "target": "Khắc sâu kiến thức, liên hệ thực tiễn...",
      "teacherActivities": ["- GV nêu tình huống thực tế...", "- GV nhận xét tiết học, dặn dò về nhà..."],
      "studentActivities": ["- HS liên hệ bản thân...", "- HS ghi nhớ dặn dò về nhà tự luyện đọc / luyện viết."]
    }
  ],
  "adjustment": ""
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);
      res.json({ success: true, data: parsed });
    } catch (error: any) {
      console.error("Gemini KHBD error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate lesson plan with Gemini AI",
      });
    }
  });

  // AI endpoint to parse timetable
  app.post("/api/gemini/parse-tkb", async (req, res) => {
    try {
      const { rawText } = req.body;
      const ai = getGenAI();

      const prompt = `Phân tích dữ liệu Thời Khóa Biểu (TKB) trường tiểu học sau đây thành cấu trúc dữ liệu JSON chuẩn.
TKB dữ liệu thô:
"""
${rawText}
"""

Hãy trích xuất:
1. Danh sách tất cả các lớp có trong TKB (ví dụ: ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"])
2. Danh sách tất cả giáo viên (ví dụ: Chi, Năm, Chinh, Phước, Dương, Đạt, Hằng, Yến, Tuấn, Huế, Tuệ, Tâm, Thy, Nương, Phương, Nhàn, Thủy...)
3. Lưới TKB chi tiết theo Thứ (2, 3, 4, 5, 6), Buổi (Sáng - Tiết 1..5, Chiều - Tiết 1..3), từng lớp và từng môn, giáo viên phụ trách (nếu có ghi trong ngoặc như "MT (Thy)", "TA (Nương)", "TCTH (Phương)").

Trả về định dạng JSON:
{
  "classes": ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"],
  "teachers": [
    { "name": "Nguyễn Hoàng Tuấn", "shortName": "Tuấn", "role": "GVCN 5A", "isSpecialist": false },
    { "name": "Cao Thị Khánh Linh", "shortName": "Linh", "role": "GVCN 2A", "isSpecialist": false },
    { "name": "Nguyễn Thị Phương", "shortName": "Phương", "role": "GVCN 1A / GV Tin học", "isSpecialist": true },
    { "name": "Cô Nhàn", "shortName": "Nhàn", "role": "GV GDTC", "isSpecialist": true },
    { "name": "Cô Thy", "shortName": "Thy", "role": "GV Mĩ thuật", "isSpecialist": true },
    { "name": "Cô Nương", "shortName": "Nương", "role": "GV Tiếng Anh", "isSpecialist": true },
    { "name": "Cô Tuệ", "shortName": "Tuệ", "role": "GV Âm nhạc", "isSpecialist": true },
    { "name": "Cô Tâm", "shortName": "Tâm", "role": "GV HĐTN/Âm nhạc", "isSpecialist": true }
  ],
  "schedule": [
    {
      "day": 2,
      "dayName": "Thứ Hai",
      "session": "Sáng",
      "period": 1,
      "classAssignments": {
        "1A": { "subject": "HĐTN (CC)", "teacher": "Tâm" },
        "1B": { "subject": "HĐTN (CC)", "teacher": "" },
        "2A": { "subject": "HĐTN (CC)", "teacher": "Linh" },
        "5A": { "subject": "HĐTN (CC)", "teacher": "Tuấn" }
      }
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);
      res.json({ success: true, data: parsed });
    } catch (error: any) {
      console.error("Gemini TKB parse error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to parse TKB with Gemini AI",
      });
    }
  });

  // Vite middleware in dev / Static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
