// src/data/textbookContentEngine.ts
// Công cụ trích xuất và bổ sung nội dung chính trong Sách giáo khoa (SGK)
// vào Hoạt động Giáo viên (HĐGV) và Hoạt động Học sinh (HĐHS)
// Chuẩn Công văn 2345/BGDĐT cho tất cả các khối lớp (Lớp 1 đến Lớp 5)

import { CurriculumLessonEntry } from "./officialGradeCurriculum";
import { KHBDActivity } from "../types";

export interface SGKLessonDetails {
  bookName: string;
  contextOrPassage: string;
  questions: { q: string; a: string }[];
  memoryBox: string;
  exercises: {
    name: string;
    task: string;
    teacherGuide: string;
    studentWork: string;
  }[];
  application: {
    task: string;
    studentWork: string;
  };
}

/**
 * Phân tích và sinh nội dung chính trong SGK tương ứng với từng bài học, môn học và khối lớp
 */
export function extractSGKDetailsForLesson(
  entry: CurriculumLessonEntry,
  subject: string,
  grade: number,
  ppct: number,
  week: number
): SGKLessonDetails {
  const title = entry.title;
  const titleLower = title.toLowerCase();
  const subjLower = subject.toLowerCase();
  const subSubject = entry.subSubject || "";
  const subLower = subSubject.toLowerCase();

  const bookName = "Sách giáo khoa Kết nối tri thức với cuộc sống";

  // ---------------------------------------------------------------------------
  // 1. TIẾNG VIỆT (Khối 1 - 5)
  // ---------------------------------------------------------------------------
  if (subjLower.includes("tiếng việt") || subjLower.includes("tv")) {
    // 1.1. Đọc văn bản (Tập đọc)
    if (subLower.includes("đọc") || titleLower.includes("đọc") || titleLower.includes("bài đọc")) {
      const cleanTitle = title.replace(/Bài\s*\d+:\s*/i, "").replace(/\(Tiết.*?\)/i, "").trim();
      return {
        bookName,
        contextOrPassage: `Văn bản bài đọc '${cleanTitle}' (SGK Tiếng Việt lớp ${grade}, tập 1/2). Bài đọc chia làm 3-4 đoạn với ngôn từ trong sáng, giàu hình ảnh gợi cảm và ý nghĩa nhân văn.`,
        questions: [
          {
            q: `Câu 1 (SGK): Những hình ảnh hoặc chi tiết nào trong đoạn 1 của bài đọc '${cleanTitle}' gây ấn tượng sâu sắc nhất?`,
            a: `Học sinh nêu đúng các từ ngữ, hình ảnh mở đầu trong SGK mô tả vẻ đẹp thiên nhiên, hoàn cảnh hoặc nhân vật chính.`
          },
          {
            q: `Câu 2 (SGK): Nhân vật trong bài đã có những hành động, suy nghĩ hoặc lời nói gì đáng chú ý?`,
            a: `Học sinh chỉ ra chi tiết trung tâm trong bài đọc, phân tích cảm xúc và thái độ tích cực của nhân vật.`
          },
          {
            q: `Câu 3 (SGK): Chi tiết / hình ảnh nào ở đoạn kết bài đọc để lại cho em nhiều cảm xúc nhất? Vì sao?`,
            a: `Học sinh giải thích lý do yêu thích, cảm nhận được thông điệp giàu tình yêu thương, sự sẻ chia hoặc vẻ đẹp cuộc sống.`
          },
          {
            q: `Câu 4 (SGK): Nêu nội dung chính và ý nghĩa giáo dục của bài đọc '${cleanTitle}'.`,
            a: `Bài đọc ca ngợi vẻ đẹp quê hương, tình cảm gia đình, tình bạn bè trong sáng và khuyên chúng ta biết trân trọng những điều giản dị quanh mình.`
          }
        ],
        memoryBox: `Khung Ghi nhớ SGK: Đọc đúng từ ngữ, ngắt nghỉ đúng dấu câu và nhịp thơ/văn; hiểu nội dung bài học ca ngợi phẩm chất tốt đẹp và tình yêu cuộc sống.`,
        exercises: [
          {
            name: "Bài 1 (SGK): Luyện đọc diễn cảm",
            task: `Chọn 1 đoạn văn / khổ thơ tiêu biểu trong bài đọc '${cleanTitle}' để luyện đọc diễn cảm với ngữ điệu phù hợp.`,
            teacherGuide: `Hướng dẫn học sinh xác định các từ ngữ gợi tả, gợi cảm cần nhấn giọng và vị trí ngắt nghỉ hơi tự nhiên.`,
            studentWork: `Luyện đọc trong nhóm đôi; dùng bút chì đánh dấu vị trí ngắt nhịp (/) và gạch dưới từ ngữ cần nhấn giọng; 2 bạn thi đọc trước lớp.`
          },
          {
            name: "Bài 2 (SGK): Tìm hiểu từ ngữ trong bài",
            task: `Tìm trong bài đọc các từ ngữ chỉ đặc điểm, cảm xúc hoặc hành động nổi bật của nhân vật.`,
            teacherGuide: `Tổ chức trò chơi 'Tiếp sức tìm từ' theo dãy bàn; viết nhanh các từ ngữ tìm được lên bảng lớp.`,
            studentWork: `Ghi lại vào vở các từ ngữ nổi bật tìm được trong SGK; đọc to giải nghĩa các từ theo mục Chú giải SGK.`
          },
          {
            name: "Bài 3 (SGK): Luyện tập câu",
            task: `Viết 1-2 câu nêu cảm nghĩ của em về một nhân vật hoặc cảnh đẹp trong bài đọc '${cleanTitle}'.`,
            teacherGuide: `Gợi ý học sinh sử dụng từ ngữ gợi cảm, viết câu đúng ngữ pháp có dấu chấm cuối câu.`,
            studentWork: `Viết vào vở bài tập câu văn hoàn chỉnh, đọc to trước lớp và nhận xét cùng bạn.`
          }
        ],
        application: {
          task: `Mục Vận dụng SGK: Đọc lại bài đọc cho người thân nghe và chia sẻ điều em thích nhất trong bài.`,
          studentWork: `Về nhà đọc diễn cảm bài văn cho bố mẹ nghe, cùng trao đổi về ý nghĩa bài học.`
        }
      };
    }

    // 1.2. Luyện từ và câu
    if (subLower.includes("luyện từ") || subLower.includes("từ và câu") || titleLower.includes("danh từ") || titleLower.includes("động từ") || titleLower.includes("tính từ") || titleLower.includes("từ đồng nghĩa")) {
      const grammarTopic = titleLower.includes("danh từ") ? "Danh từ"
        : titleLower.includes("động từ") ? "Động từ"
        : titleLower.includes("tính từ") ? "Tính từ"
        : titleLower.includes("đồng nghĩa") ? "Từ đồng nghĩa"
        : titleLower.includes("trái nghĩa") ? "Từ trái nghĩa"
        : "Kiến thức Luyện từ và câu";

      return {
        bookName,
        contextOrPassage: `Ngữ liệu phần Nhận xét (SGK Tiếng Việt lớp ${grade}): Đoạn trích văn bản mẫu gồm 3-4 câu chứa các từ ngữ trọng tâm thuộc chủ điểm bài học '${title}'.`,
        questions: [
          {
            q: `Câu 1 (SGK): Đọc đoạn văn mẫu và tìm các từ in đậm chỉ người, vật, hành động hoặc tính chất?`,
            a: `Học sinh chỉ ra chính xác các từ in đậm trong SGK và xếp vào các nhóm nghĩa tương ứng.`
          },
          {
            q: `Câu 2 (SGK): Các từ ngữ đó có đặc điểm gì chung về mặt ngữ nghĩa và ngữ pháp?`,
            a: `Học sinh phát hiện điểm chung về bản chất ngữ pháp của ${grammarTopic} theo dẫn dắt của giáo viên.`
          },
          {
            q: `Câu 3 (SGK): Rút ra định nghĩa và dấu hiệu nhận biết ${grammarTopic}.`,
            a: `Học sinh nêu định nghĩa: '${grammarTopic} là những từ ngữ chỉ sự vật/hoạt động/đặc điểm...' theo khung Ghi nhớ SGK.`
          }
        ],
        memoryBox: `Khung Ghi nhớ SGK: Nắm vững khái niệm '${grammarTopic}'; phân biệt các loại tiểu nhóm và biết cách đặt câu phù hợp ngữ cảnh giao tiếp.`,
        exercises: [
          {
            name: "Bài 1 (SGK): Nhận diện và tìm từ",
            task: `Tìm các từ thuộc phạm trù '${grammarTopic}' trong đoạn văn / đoạn thơ cho sẵn ở SGK.`,
            teacherGuide: `Hướng dẫn học sinh đọc thầm từng câu văn, gạch chân dưới từ ngữ thỏa mãn yêu cầu; làm mẫu câu đầu tiên.`,
            studentWork: `Làm bài vào bảng con hoặc vở thực hành: ghi rõ danh sách các từ tìm được; giải thích lý do lựa chọn.`
          },
          {
            name: "Bài 2 (SGK): Phân loại từ ngữ",
            task: `Xếp các từ tìm được ở Bài tập 1 vào bảng phân loại theo các nhóm gợi ý trong SGK.`,
            teacherGuide: `Kẻ sẵn bảng phân loại lên bảng lớp; cho học sinh thảo luận nhóm đôi và dán thẻ từ.`,
            studentWork: `Thảo luận nhóm đôi, điền các từ chính xác vào 2-3 cột phân loại trong vở bài tập.`
          },
          {
            name: "Bài 3 (SGK): Đặt câu và vận dụng",
            task: `Đặt 2 câu có sử dụng từ ngữ thuộc '${grammarTopic}' vừa tìm được ở bài tập trên.`,
            teacherGuide: `Nhắc nhở học sinh đầu câu viết hoa, cuối câu có dấu chấm; câu văn diễn đạt rõ ý, có hình ảnh sinh động.`,
            studentWork: `Tự giác viết 2 câu vào vở; 2 bạn lên bảng viết câu; cả lớp nhận xét câu văn chuẩn mực.`
          }
        ],
        application: {
          task: `Mục Vận dụng SGK: Tìm thêm 3 từ thuộc phạm trù '${grammarTopic}' dùng trong sinh hoạt hàng ngày tại gia đình.`,
          studentWork: `Ghi lại vào sổ tay các từ ngữ thực tế, chia sẻ với bạn vào đầu tiết học sau.`
        }
      };
    }

    // 1.3. Viết (Tập làm văn / Tập viết)
    if (subLower.includes("viết") || titleLower.includes("viết") || titleLower.includes("đoạn văn") || titleLower.includes("bài văn")) {
      return {
        bookName,
        contextOrPassage: `Ngữ liệu phần Khám phá (SGK Tiếng Việt lớp ${grade}): Đoạn văn / bài văn mẫu minh họa chuẩn mực về cấu tạo 3 phần (Mở đoạn/bài, Thân đoạn/bài, Kết đoạn/bài) theo chủ đề '${title}'.`,
        questions: [
          {
            q: `Câu 1 (SGK): Đoạn văn / bài văn mẫu gồm mấy phần? Nêu nhiệm vụ của từng phần?`,
            a: `Học sinh chỉ rõ: Mở đầu giới thiệu đối tượng; Phần phát triển nêu các chi tiết nổi bật; Phần kết thúc nêu cảm xúc hoặc bài học.`
          },
          {
            q: `Câu 2 (SGK): Tác giả đã lựa chọn những chi tiết, từ ngữ và hình ảnh đặc sắc nào để bài viết thêm sinh động?`,
            a: `Học sinh phát hiện các biện pháp so sánh, nhân hóa và các từ ngữ gợi tả âm thanh, màu sắc trong SGK.`
          },
          {
            q: `Câu 3 (SGK): Cần lưu ý điều gì khi trình bày đoạn văn / bài văn theo thể loại này?`,
            a: `Lùi đầu dòng khi bắt đầu đoạn, dùng dấu câu chính xác, liên kết câu chặt chẽ bằng từ nối.`
          }
        ],
        memoryBox: `Khung Ghi nhớ SGK: Viết đoạn văn/bài văn cần đủ cấu trúc 3 phần, câu văn giàu hình ảnh cảm xúc, bám sát đề tài và không mắc lỗi chính tả.`,
        exercises: [
          {
            name: "Bài 1 (SGK): Tìm ý và lập dàn ý",
            task: `Dựa vào gợi ý trong SGK, hãy tìm ý và lập dàn ý chi tiết cho bài viết theo đề bài được giao.`,
            teacherGuide: `Hướng dẫn học sinh trả lời các câu hỏi gợi mở của SGK để hình thành các nhánh ý chính cho bài viết.`,
            studentWork: `Ghi nhanh các ý chính vào phiếu học tập / sơ đồ tư duy: Mở bài - Thân bài (các ý 1, 2, 3) - Kết bài.`
          },
          {
            name: "Bài 2 (SGK): Thực hành viết đoạn văn",
            task: `Dựa vào dàn ý đã lập, viết thành đoạn văn hoàn chỉnh (khoảng 4-6 câu hoặc 1 đoạn thân bài).`,
            teacherGuide: `Bao quát lớp, hướng dẫn học sinh cách nối câu linh hoạt, tránh lặp từ; trợ giúp học sinh còn lúng túng.`,
            studentWork: `Tự giác viết bài vào vở cẩn thận, nắn nót; sử dụng từ ngữ chọn lọc và dấu câu hợp lý.`
          },
          {
            name: "Bài 3 (SGK): Rà soát và chỉnh sửa",
            task: `Đọc lại bài viết của mình, kiểm tra theo bảng tiêu chí đánh giá trong SGK và chỉnh sửa lỗi (nếu có).`,
            teacherGuide: `Chiếu bảng kiểm tiêu chí: Đúng chủ đề, đủ cấu trúc, không sai chính tả, có từ ngữ hay.`,
            studentWork: `Đổi vở cùng bạn cùng bàn đọc soát chéo; dùng bút chì đánh dấu góp ý và chỉnh sửa hoàn thiện bài.`
          }
        ],
        application: {
          task: `Mục Vận dụng SGK: Đọc bài viết cho người thân nghe và ghi nhận lời góp ý chân thành.`,
          studentWork: `Về nhà đọc bài văn cho bố mẹ nghe, cùng trao đổi để bài viết lần sau hay hơn.`
        }
      };
    }

    // 1.4. Lớp 1 - Học vần / Âm chữ
    if (grade === 1) {
      return {
        bookName,
        contextOrPassage: `Trang bài học SGK Tiếng Việt 1: Tranh khám phá tình huống đời sống có chứa các âm vần mới '${title}', kèm chữ in hoa, in thường, chữ viết mẫu và từ ứng dụng.`,
        questions: [
          {
            q: `Câu 1 (SGK): Quan sát tranh khám phá: Trong tranh có những ai và đồ vật/con vật gì?`,
            a: `Học sinh quan sát tranh SGK và gọi tên các sự vật chứa âm/vần đang học (ví dụ: cá sấu, quả na, con bò, cái bàn...).`
          },
          {
            q: `Câu 2 (SGK): Phân tích cấu tạo tiếng mới và cách đánh vần?`,
            a: `Học sinh nêu rõ: Âm đầu đứng trước, âm chính đứng sau, dấu thanh đặt trên âm chính; đánh vần to rõ ràng.`
          }
        ],
        memoryBox: `Khung Ghi nhớ SGK: Nhận diện mặt chữ in và viết; phát âm đúng âm/vần; đọc trơn các tiếng, từ và câu ứng dụng ngắn.`,
        exercises: [
          {
            name: "Bài 1 (SGK): Nhận biết và phát âm",
            task: `Đọc đúng âm/vần và các tiếng mẫu trong khung bài học SGK.`,
            teacherGuide: `Làm mẫu khẩu hình miệng; cho học sinh luyện đọc cá nhân, nhóm và đồng thanh; chỉnh phát âm chuẩn.`,
            studentWork: `Đọc to theo tay chỉ của cô giáo; cài âm chữ cái vào bảng gài chữ Tiếng Việt 1.`
          },
          {
            name: "Bài 2 (SGK): Đọc từ và câu ứng dụng",
            task: `Đọc các từ ngữ và câu ứng dụng trong SGK (kèm hình ảnh minh họa).`,
            teacherGuide: `Hướng dẫn học sinh tìm tiếng chứa âm vần mới trong câu ứng dụng; đọc mẫu câu ngắn ngắt nhịp.`,
            studentWork: `Dùng ngón tay chỉ từng chữ đọc thầm rồi đọc to trước lớp; phát hiện tiếng mới vừa học.`
          },
          {
            name: "Bài 3 (SGK): Tập viết bảng con",
            task: `Viết chữ ghi âm/vần và tiếng khóa vào bảng con theo mẫu chữ ô li chuẩn.`,
            teacherGuide: `Viết mẫu trên bảng lớp có lưới ô li; phân tích điểm đặt bút, đường dê bút, điểm dừng bút.`,
            studentWork: `Ngồi thẳng lưng, cầm phấn bằng 3 ngón tay, nắn nót viết 2 dòng chữ mẫu vào bảng con; giơ bảng đúng hiệu lệnh.`
          }
        ],
        application: {
          task: `Mục Vận dụng SGK: Tìm trong nhà các đồ vật có tên chứa âm/vần vừa học và chỉ cho bố mẹ xem.`,
          studentWork: `Hào hứng về nhà tìm đồ vật thực tế xung quanh nhà chia sẻ với gia đình.`
        }
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 2. TOÁN (Khối 1 - 5)
  // ---------------------------------------------------------------------------
  if (subjLower.includes("toán") || subjLower.includes("math")) {
    const isFraction = titleLower.includes("phân số");
    const isDecimal = titleLower.includes("số thập phân");
    const isGeometry = titleLower.includes("hình") || titleLower.includes("chu vi") || titleLower.includes("diện tích") || titleLower.includes("góc");
    const isMeasurement = titleLower.includes("đơn vị") || titleLower.includes("yến, tạ, tấn") || titleLower.includes("giây, thế kỉ") || titleLower.includes("mét") || titleLower.includes("ki-lô-gam");

    return {
      bookName,
      contextOrPassage: `Tình huống Khám phá (SGK Toán lớp ${grade}): Bài toán thực tế mở đầu với tranh vẽ các nhân vật Rô-bốt, Mai, Nam và Việt đưa ra tình huống tính toán cụ thể cho bài '${title}'.`,
      questions: [
        {
          q: `Câu hỏi khám phá (SGK): Từ tình huống thực tế của các bạn trong tranh, ta cần thực hiện phép tính hoặc thao tác toán học nào?`,
          a: `Học sinh quan sát số liệu bài toán SGK, nhận biết dạng toán và đề xuất phép tính hoặc quy tắc cần áp dụng.`
        },
        {
          q: `Câu hỏi phân tích (SGK): Nêu các bước tiến hành thực hiện quy tắc toán học mới này?`,
          a: `Học sinh cùng giáo viên phân tích từng bước tính toán cụ thể theo sơ đồ chỉ dẫn trong SGK.`
        }
      ],
      memoryBox: isFraction
        ? `Khung Quy tắc SGK: Muốn cộng/trừ/nhân/chia phân số, ta quy đồng mẫu số (nếu khác mẫu) rồi thực hiện theo quy tắc tử số và mẫu số; rút gọn phân số về tối giản.`
        : isDecimal
        ? `Khung Quy tắc SGK: Khi thực hiện phép tính với số thập phân, đặt tính thẳng hàng theo dấu phẩy (hàng đơn vị thẳng hàng đơn vị, phần mười thẳng phần mười); tính như số tự nhiên và đặt dấu phẩy ở kết quả thẳng cột.`
        : isGeometry
        ? `Khung Công thức SGK: Ghi nhớ công thức tính chu vi và diện tích hình theo đúng đại lượng cùng đơn vị đo.`
        : isMeasurement
        ? `Khung Bảng đơn vị SGK: Hai đơn vị đo liền kề nhau gấp hoặc kém nhau 10 lần (hoặc 100 lần đối với diện tích, 1000 lần đối với thể tích).`
        : `Khung Ghi nhớ SGK: Nắm vững thứ tự thực hiện phép tính, quy tắc tính nhẩm và quy trình đặt tính rồi tính chuẩn xác.`,
      exercises: [
        {
          name: "Bài 1 (SGK): Luyện tập tính toán cơ bản",
          task: `Thực hiện các phép tính / điền số thích hợp vào ô trống theo yêu cầu Bài 1 SGK (gồm các câu a, b, c, d).`,
          teacherGuide: `Hướng dẫn học sinh làm mẫu câu a trên bảng lớp; nhắc nhở học sinh tính toán cẩn thận từng hàng số.`,
          studentWork: `Thực hành làm câu a vào bảng con, câu b, c, d vào vở; đổi chéo vở kiểm tra kết quả cùng bạn.`
        },
        {
          name: "Bài 2 (SGK): Đặt tính rồi tính / Tính giá trị biểu thức",
          task: `Bài tập 2 SGK: Đặt tính thẳng cột và tính kết quả hoặc tính giá trị biểu thức theo đúng thứ tự ưu tiên.`,
          teacherGuide: `Mời 2-3 học sinh lên bảng làm; bao quát lớp và kịp thời chỉ ra các lỗi sai thường gặp về nhớ số hoặc dấu phẩy.`,
          studentWork: `2 học sinh lên bảng trình bày; cả lớp làm vào vở thực hành; theo dõi đối chiếu và tự nhận xét sửa bài.`
        },
        {
          name: "Bài 3 (SGK): Giải toán có lời văn thực tế",
          task: `Bài toán có lời văn trong SGK: Đọc kĩ đề bài, tóm tắt bài toán (cho biết gì, hỏi gì) và trình bày bài giải đầy đủ.`,
          teacherGuide: `Hướng dẫn học sinh phân tích bài toán: 'Muốn tìm đại lượng cần hỏi, ta phải tìm đại lượng nào trước?'; hướng dẫn ghi lời giải, phép tính và đáp số.`,
          studentWork: `Ghi tóm tắt vào vở; trình bày bài giải hoàn chỉnh gồm lời giải rõ ràng, phép tính chính xác kèm đơn vị đo và đáp số.`
        },
        {
          name: "Bài 4 (SGK): Trò chơi / Bài toán phát triển tư duy",
          task: `Bài tập 4 SGK: Vận dụng tính chất nhanh hoặc giải câu đố toán học vui của bạn Rô-bốt trong SGK.`,
          teacherGuide: `Tổ chức thi đua giữa các tổ; bạn nào tính nhẩm nhanh và giải thích thông minh sẽ được tuyên dương.`,
          studentWork: `Hào hứng tham gia tính nhẩm nhanh; giơ thẻ đáp án và giải thích cách tư duy ngắn gọn, sáng tạo.`
        }
      ],
      application: {
        task: `Mục Vận dụng SGK: Đố người thân hoặc bạn bè một bài toán thực tế tương tự bài học hôm nay (tính tiền mua hàng, đo đạc đồ dùng trong nhà).`,
        studentWork: `Về nhà vận dụng kiến thức tính toán thực tế, ghi lại kết quả vào nhật ký toán học.`
      }
    };
  }

  // ---------------------------------------------------------------------------
  // 3. KHOA HỌC (Khối 4 - 5)
  // ---------------------------------------------------------------------------
  if (subjLower.includes("khoa học") || subjLower.includes("kh")) {
    return {
      bookName,
      contextOrPassage: `Thí nghiệm / Kênh hình khám phá (SGK Khoa học lớp ${grade}): Chuỗi hình ảnh thí nghiệm và thông tin khoa học thực nghiệm mô tả hiện tượng tự nhiên của bài '${title}'.`,
      questions: [
        {
          q: `Câu hỏi thí nghiệm (SGK): Quan sát hiện tượng xảy ra trong hình thí nghiệm 1 và 2, em nhận thấy điều gì?`,
          a: `Học sinh nêu hiện tượng quan sát được trung thực: sự biến đổi trạng thái, màu sắc, nhiệt độ hoặc phản ứng của vật thể.`
        },
        {
          q: `Câu hỏi giải thích (SGK): Vì sao lại có hiện tượng đó? Hiện tượng này chứng minh tính chất gì của sự vật?`,
          a: `Học sinh thảo luận nhóm, liên kết kiến thức thực nghiệm để rút ra bản chất khoa học cốt lõi.`
        },
        {
          q: `Câu hỏi liên hệ (SGK): Hiện tượng tự nhiên này có vai trò hoặc tác động như thế nào đến đời sống con người?`,
          a: `Học sinh nêu ứng dụng thực tiễn trong sinh hoạt, sản xuất nông nghiệp và bảo vệ môi trường.`
        }
      ],
      memoryBox: `Khung 'Em đã học' SGK: Nắm vững các khái niệm khoa học, quy luật tự nhiên và ý thức bảo vệ môi trường, tiết kiệm năng lượng.`,
      exercises: [
        {
          name: "Bài 1 (SGK): Trả lời câu hỏi và giải thích hiện tượng",
          task: `Dựa vào kết quả thí nghiệm vừa học, hãy hoàn thành bảng nhận xét hoặc chọn ý trả lời đúng nhất trong SGK.`,
          teacherGuide: `Phát phiếu học tập nhóm; hướng dẫn học sinh so sánh và đối chiếu các trường hợp thí nghiệm.`,
          studentWork: `Thảo luận nhóm 4, điền kết quả quan sát vào phiếu học tập và cử đại diện trình bày trước lớp.`
        },
        {
          name: "Bài 2 (SGK): Xử lý tình huống khoa học trong đời sống",
          task: `Bài tập 2 SGK: Nêu cách xử lý tình huống thực tế an toàn liên quan đến bài học (bảo quản thực phẩm, sử dụng nước sạch, phòng tránh rủi ro...).`,
          teacherGuide: `Đưa ra tình huống tranh vẽ SGK; khuyến khích học sinh đưa ra các giải pháp khoa học, khả thi.`,
          studentWork: `Đại diện các nhóm tranh luận, nêu giải pháp đúng khoa học và giải thích căn cứ thực tiễn.`
        }
      ],
      application: {
        task: `Mục Vận dụng SGK: Thực hiện một hành động cụ thể tại gia đình: Khóa chặt vòi nước sau khi dùng, phân loại rác thải hoặc tiết kiệm điện.`,
        studentWork: `Cam kết thực hiện tại nhà và chụp ảnh hoặc ghi chép vào sổ nhật ký học tập khoa học.`
      }
    };
  }

  // ---------------------------------------------------------------------------
  // 4. LỊCH SỬ VÀ ĐỊA LÍ (Khối 4 - 5)
  // ---------------------------------------------------------------------------
  if (subjLower.includes("lịch sử") || subjLower.includes("địa lí") || subjLower.includes("ls&đl") || subjLower.includes("ls")) {
    return {
      bookName,
      contextOrPassage: `Kênh hình và tư liệu lịch sử / Lược đồ địa lí (SGK Lịch sử và Địa lí lớp ${grade}): Bản đồ tự nhiên, lược đồ trận đánh, tranh ảnh di tích lịch sử và đoạn trích tư liệu về '${title}'.`,
      questions: [
        {
          q: `Câu hỏi khai thác lược đồ / tư liệu (SGK): Đọc thông tin và quan sát hình ảnh trong SGK, em hãy cho biết vị trí địa lí / diễn biến sự kiện lịch sử chính?`,
          a: `Học sinh đọc chú giải lược đồ, chỉ đúng ranh giới, địa danh hoặc các mốc thời gian lịch sử quan trọng.`
        },
        {
          q: `Câu hỏi phân tích (SGK): Đặc điểm thiên nhiên / sự kiện lịch sử này có ý nghĩa gì đối với sự phát triển của đất nước?`,
          a: `Học sinh nêu bật vai trò chiến lược, chiến công oanh liệt hoặc thế mạnh kinh tế - văn hóa của vùng miền.`
        }
      ],
      memoryBox: `Khung 'Em có biết?' SGK: Ghi nhớ các mốc lịch sử hào hùng, niềm tự hào dân tộc và đặc trưng địa lí tự nhiên - con người Việt Nam.`,
      exercises: [
        {
          name: "Bài 1 (SGK): Khai thác lược đồ và hoàn thành bảng biểu",
          task: `Dựa vào lược đồ và kênh chữ trong SGK, hãy điền các thông tin phù hợp vào bảng thống kê hoặc sơ đồ tiến trình.`,
          teacherGuide: `Tổ chức cho học sinh làm việc với bản đồ lớn treo tường hoặc màn hình tương tác; hướng dẫn cách đọc chú giải.`,
          studentWork: `2 học sinh lên chỉ bản đồ; cả lớp hoàn thành bảng bài tập trong vở; kiểm tra chéo kết quả.`
        },
        {
          name: "Bài 2 (SGK): Trả lời câu hỏi củng cố",
          task: `Nêu nguyên nhân thắng lợi của sự kiện lịch sử hoặc nêu những biện pháp bảo vệ tài nguyên thiên nhiên của vùng.`,
          teacherGuide: `Gợi ý học sinh tóm lược các ý chính thành sơ đồ tư duy ngắn gọn, dễ nhớ.`,
          studentWork: `Viết câu trả lời vào vở bài tập, tự tin giơ tay phát biểu chia sẻ trước lớp.`
        }
      ],
      application: {
        task: `Mục Vận dụng SGK: Sưu tầm tranh ảnh, câu chuyện về nhân vật lịch sử hoặc cảnh đẹp quê hương liên quan đến bài học.`,
        studentWork: `Tìm hiểu qua sách báo, internet hoặc hỏi ông bà cha mẹ để mang đến chia sẻ trong tiết học sau.`
      }
    };
  }

  // ---------------------------------------------------------------------------
  // 5. TỰ NHIÊN VÀ XÃ HỘI (Khối 1 - 3)
  // ---------------------------------------------------------------------------
  if (subjLower.includes("tự nhiên") || subjLower.includes("tnxh")) {
    return {
      bookName,
      contextOrPassage: `Trang khám phá SGK Tự nhiên và Xã hội lớp ${grade}: Hệ thống tranh ảnh chân thực về các hoạt động sinh hoạt gia đình, trường học, thế giới động - thực vật xoay quanh chủ đề '${title}'.`,
      questions: [
        {
          q: `Câu hỏi quan sát (SGK): Quan sát các bức tranh trong SGK, em thấy mọi người đang làm gì và ở đâu?`,
          a: `Học sinh gọi tên chính xác các hành động, đồ vật hoặc các bộ phận của cây cối, con vật trong tranh.`
        },
        {
          q: `Câu hỏi nhận xét (SGK): Việc làm nào trong tranh là đúng, an toàn? Việc làm nào chưa đúng hoặc có thể gây nguy hiểm? Vì sao?`,
          a: `Học sinh phân biệt rõ hành vi an toàn và không an toàn, giải thích hậu quả và bài học phòng tránh.`
        }
      ],
      memoryBox: `Khung Ghi nhớ SGK: Biết yêu quý, chăm sóc các thành viên trong gia đình; giữ gìn vệ sinh trường lớp và biết tự bảo vệ an toàn cho bản thân.`,
      exercises: [
        {
          name: "Bài 1 (SGK): Nhận diện hành vi đúng - sai",
          task: `Đánh dấu tích vào việc làm em đồng tình và dấu nhân vào việc làm em không đồng tình trong các bức tranh SGK.`,
          teacherGuide: `Chiếu tranh to trên màn hình; cho học sinh giơ thẻ xanh (đồng tình) / thẻ đỏ (không đồng tình).`,
          studentWork: `Học sinh giơ thẻ phản hồi nhanh nhẹn và giải thích lí do vì sao lựa chọn như vậy.`
        },
        {
          name: "Bài 2 (SGK): Đóng vai xử lý tình huống",
          task: `Cùng bạn thảo luận và đóng vai xử lý tình huống thực tế theo phân vai gợi ý trong SGK.`,
          teacherGuide: `Phân công các nhóm đôi đóng vai tình huống; hướng dẫn lời thoại tự nhiên, lễ phép và chuẩn mực.`,
          studentWork: `2 cặp học sinh lên sân khấu lớp đóng vai; cả lớp nhận xét, rút ra cách ứng xử văn minh.`
        }
      ],
      application: {
        task: `Mục Vận dụng SGK: Thực hiện lời nói và việc làm cụ thể thể hiện sự quan tâm, giúp đỡ người thân trong gia đình.`,
        studentWork: `Chia sẻ với cả lớp vào tiết sinh hoạt cuối tuần về việc tốt mình đã làm ở nhà.`
      }
    };
  }

  // ---------------------------------------------------------------------------
  // 6. ĐẠO ĐỨC (Khối 1 - 5)
  // ---------------------------------------------------------------------------
  if (subjLower.includes("đạo đức")) {
    return {
      bookName,
      contextOrPassage: `Câu chuyện đạo đức / Tranh tình huống Khám phá (SGK Đạo đức lớp ${grade}): Câu chuyện hoặc chuỗi tranh tình huống thể hiện chuẩn mực đạo đức và hành vi ứng xử của bài '${title}'.`,
      questions: [
        {
          q: `Câu 1 (SGK): Các nhân vật trong câu chuyện / tranh vẽ đã có lời nói và hành động như thế nào?`,
          a: `Học sinh tóm tắt lại diễn biến hành vi của nhân vật trong tranh SGK.`
        },
        {
          q: `Câu 2 (SGK): Em có suy nghĩ và nhận xét gì về hành vi của các nhân vật đó? Hành vi đó mang lại kết quả gì?`,
          a: `Học sinh phân tích giá trị của hành vi đạo đức đúng đắn: đem lại niềm vui, sự tin tưởng và tôn trọng từ mọi người.`
        }
      ],
      memoryBox: `Khung Lời khuyên / Ghi nhớ SGK: Luôn trung thực, biết ơn, có trách nhiệm với bản thân, gia đình và cộng đồng; thể hiện qua từng hành động cụ thể mỗi ngày.`,
      exercises: [
        {
          name: "Bài 1 (SGK): Bày tỏ ý kiến (Tán thành / Không tán thành)",
          task: `Em tán thành hay không tán thành với các ý kiến / hành vi nêu trong bài tập 1 SGK? Vì sao?`,
          teacherGuide: `Tổ chức trò chơi 'Bày tỏ quan điểm'; khuyến khích học sinh giải thích lập luận của mình.`,
          studentWork: `Giơ biểu tượng mặt cười (tán thành) hoặc mặt mếu (không tán thành); tự tin nêu lý do trước lớp.`
        },
        {
          name: "Bài 2 (SGK): Xử lý tình huống đạo đức",
          task: `Nếu em là bạn trong tình huống tranh 1 và 2 ở SGK, em sẽ hành động như thế nào?`,
          teacherGuide: `Cho học sinh thảo luận nhóm bàn trong 3 phút; hướng dẫn cách giải quyết nhân ái, có trách nhiệm.`,
          studentWork: `Đại diện nhóm phát biểu cách giải quyết: giải thích tại sao đó là hành động đúng đắn và phù hợp nhất.`
        },
        {
          name: "Bài 3 (SGK): Liên hệ bản thân",
          task: `Hãy kể lại một việc làm cụ thể của em hoặc bạn bè thể hiện đúng chuẩn mực bài học hôm nay.`,
          teacherGuide: `Khen ngợi, biểu dương những học sinh trung thực, có hành động đẹp trong học tập và đời sống.`,
          studentWork: `Tự tin đứng lên chia sẻ câu chuyện thực tế của mình; lắng nghe và học hỏi việc làm tốt của bạn.`
        }
      ],
      application: {
        task: `Mục Vận dụng SGK: Xây dựng 'Cây việc tốt' của lớp hoặc viết cam kết thực hiện hành vi đẹp trong sổ tay rèn luyện.`,
        studentWork: `Viết việc tốt mình sẽ làm lên mảnh giấy hình chiếc lá và dán lên Cây rèn luyện của lớp học.`
      }
    };
  }

  // ---------------------------------------------------------------------------
  // 7. TIN HỌC & CÔNG NGHỆ (Khối 3 - 5)
  // ---------------------------------------------------------------------------
  if (subjLower.includes("tin học") || subjLower.includes("th") || subjLower.includes("công nghệ") || subjLower.includes("cn")) {
    const isTech = subjLower.includes("công nghệ") || subjLower.includes("cn");
    return {
      bookName,
      contextOrPassage: isTech
        ? `Quy trình kĩ thuật / Kênh hình minh họa sản phẩm thủ công / đồ dùng công nghệ trong gia đình (SGK Công nghệ lớp ${grade}) cho bài '${title}'.`
        : `Giao diện phần mềm / Thiết bị phần cứng máy tính và sơ đồ thao tác mẫu (SGK Tin học lớp ${grade}) cho bài '${title}'.`,
      questions: [
        {
          q: `Câu hỏi nhận biết (SGK): Quan sát hình ảnh thiết bị / giao diện trong SGK, hãy nêu tên và công dụng của từng bộ phận / biểu tượng?`,
          a: `Học sinh chỉ ra chính xác các nút lệnh, phím chức năng hoặc các chi tiết cấu tạo kĩ thuật theo chú dẫn SGK.`
        },
        {
          q: `Câu hỏi quy trình (SGK): Nêu thứ tự các bước thực hiện thao tác trên máy tính / các bước lắp ghép sản phẩm công nghệ theo hướng dẫn?`,
          a: `Học sinh đọc đúng trình tự: Bước 1 (Chuẩn bị) -> Bước 2 (Thực hiện thao tác chính) -> Bước 3 (Hoàn thiện, kiểm tra và lưu lại).`
        }
      ],
      memoryBox: isTech
        ? `Khung Ghi nhớ SGK: Nắm vững quy trình thao tác an toàn, tiết kiệm vật liệu và sử dụng đồ dùng công nghệ đúng cách, bền đẹp.`
        : `Khung Ghi nhớ SGK: Thực hiện thao tác máy tính đúng quy trình, tuân thủ quy tắc an toàn thông tin và bản quyền số.`,
      exercises: [
        {
          name: "Bài 1 (SGK): Thực hành thao tác cơ bản",
          task: `Thực hiện thao tác trên máy tính (hoặc lắp ghép mô hình kĩ thuật) theo đúng các bước minh họa ở Bài 1 SGK.`,
          teacherGuide: `Thao tác mẫu trên máy chiếu / trực quan; đi từng bàn quan sát, uốn nắn tay cầm chuột / kĩ năng lắp ghép.`,
          studentWork: `Tự giác thực hành trên máy tính hoặc bộ lắp ghép; giúp đỡ bạn bên cạnh khi gặp vướng mắc.`
        },
        {
          name: "Bài 2 (SGK): Hoàn thành sản phẩm và đánh giá",
          task: `Hoàn thiện bài tập thực hành theo yêu cầu của SGK và kiểm tra kết quả hiển thị trên màn hình / sản phẩm thực tế.`,
          teacherGuide: `Tổ chức cho các nhóm trưng bày sản phẩm hoặc chiếu bài làm mẫu lên màn hình; nhận xét tuyên dương.`,
          studentWork: `Báo cáo sản phẩm đã hoàn thành; tự đánh giá sản phẩm theo các tiêu chí gợi ý trong SGK.`
        }
      ],
      application: {
        task: `Mục Vận dụng SGK: Vận dụng kĩ năng công nghệ / tin học vào việc học tập ở trường và sinh hoạt an toàn tại gia đình.`,
        studentWork: `Chia sẻ cách sử dụng thiết bị an toàn, tiết kiệm điện với các thành viên trong gia đình.`
      }
    };
  }

  // ---------------------------------------------------------------------------
  // 8. HOẠT ĐỘNG TRẢI NGHIỆM (Khối 1 - 5)
  // ---------------------------------------------------------------------------
  if (subjLower.includes("trải nghiệm") || subjLower.includes("hđtn") || subjLower.includes("hdtn")) {
    return {
      bookName,
      contextOrPassage: `Trang chủ đề trải nghiệm (SGK Hoạt động trải nghiệm lớp ${grade}): Các nhiệm vụ trải nghiệm cá nhân, nhóm và tập thể xoay quanh chủ đề tuần '${title}'.`,
      questions: [
        {
          q: `Câu hỏi chia sẻ (SGK): Hãy chia sẻ cảm xúc và những việc em đã làm được trong tuần qua theo chủ đề bài học?`,
          a: `Học sinh tự tin đứng trước lớp chia sẻ những trải nghiệm thực tế, niềm vui và sự tiến bộ của bản thân.`
        },
        {
          q: `Câu hỏi hợp tác (SGK): Để cùng các bạn thực hiện tốt nhiệm vụ tuần này, chúng ta cần phối hợp như thế nào?`,
          a: `Học sinh thảo luận nhóm, phân công nhiệm vụ cụ thể cho từng thành viên theo tinh thần đoàn kết, trách nhiệm.`
        }
      ],
      memoryBox: `Khung Thông điệp SGK: Tự tin thể hiện bản thân, biết lắng nghe, tôn trọng bạn bè và tích cực tham gia các hoạt động tập thể.`,
      exercises: [
        {
          name: "Hoạt động 1 (SGK): Khám phá chủ đề và trao đổi nhóm",
          task: `Thảo luận nhóm về các gợi ý trong SGK và xây dựng ý tưởng thực hiện hoạt động trải nghiệm.`,
          teacherGuide: `Gợi mở các hướng hoạt động phong phú (vẽ tranh, viết thiệp, đóng kịch ngắn, hùng biện...).`,
          studentWork: `Thảo luận sôi nổi trong nhóm, ghi lại các ý tưởng sáng tạo vào giấy A3 của nhóm.`
        },
        {
          name: "Hoạt động 2 (SGK): Thực hành trải nghiệm và chia sẻ sản phẩm",
          task: `Các nhóm cùng bắt tay thực hiện sản phẩm trải nghiệm theo chủ đề và cử đại diện giới thiệu trước lớp.`,
          teacherGuide: `Tạo không gian lớp học cởi mở, ấm áp; khích lệ tất cả học sinh đều được tham gia và tỏa sáng.`,
          studentWork: `Trưng bày sản phẩm xung quanh lớp; lắng nghe và cổ vũ nhiệt tình cho các nhóm bạn.`
        }
      ],
      application: {
        task: `Mục Vận dụng SGK: Thực hiện kế hoạch rèn luyện thói quen tốt tại gia đình và ghi vào phiếu theo dõi tuần.`,
        studentWork: `Tự giác thực hiện lời hứa rèn luyện tại nhà và xin chữ kí nhận xét của cha mẹ vào cuối tuần.`
      }
    };
  }

  // ---------------------------------------------------------------------------
  // 9. CÁC MÔN NGHỆ THUẬT, GDTC, TIẾNG ANH (Fallback giàu nội dung)
  // ---------------------------------------------------------------------------
  return {
    bookName,
    contextOrPassage: `Kênh hình và ngữ liệu chuẩn mực trong SGK môn ${subject.toUpperCase()} lớp ${grade} dành cho bài học '${title}'.`,
    questions: [
      {
        q: `Câu hỏi khám phá 1 (SGK): Quan sát hình ảnh / ngữ liệu bài học trong SGK, em nhận biết được những yếu tố nào?`,
        a: `Học sinh nêu đúng các thông tin trực quan, giai điệu, động tác mẫu hoặc từ vựng ngữ pháp trọng tâm theo SGK.`
      },
      {
        q: `Câu hỏi khám phá 2 (SGK): Em hãy mô tả lại quy trình thực hiện hoặc ý nghĩa của bài học này?`,
        a: `Học sinh trình bày rõ các bước thực hành, tư thế chuẩn xác và thông điệp thẩm mĩ / rèn luyện sức khỏe.`
      }
    ],
    memoryBox: `Khung Ghi nhớ SGK: Nắm vững kỹ năng thực hành chuẩn xác, phát huy tính sáng tạo và bồi dưỡng phẩm chất thẩm mĩ, thể lực dẻo dai.`,
    exercises: [
      {
        name: "Bài 1 (SGK): Luyện tập thực hành cơ bản",
        task: `Thực hiện động tác / hát đúng giai điệu / hoàn thành sản phẩm mĩ thuật / giao tiếp theo mẫu Bài 1 SGK.`,
        teacherGuide: `Làm mẫu thị phạm tỉ mỉ; quan sát uốn nắn từng học sinh hoặc từng nhóm luyện tập.`,
        studentWork: `Tập trung thực hành theo hiệu lệnh và hướng dẫn của giáo viên; chỉnh sửa tư thế/kĩ năng cho chuẩn xác.`
      },
      {
        name: "Bài 2 (SGK): Vận dụng sáng tạo và biểu diễn",
        task: `Thể hiện bài hát / biểu diễn động tác / giới thiệu bức tranh / hội thoại nhóm đôi trước tập thể lớp theo SGK.`,
        teacherGuide: `Tổ chức không gian biểu diễn vui tươi; đánh giá theo tinh thần động viên, khuyến khích sáng tạo.`,
        studentWork: `Tự tin trình bày trước lớp; lắng nghe nhận xét chân thành từ thầy cô và các bạn.`
      }
    ],
    application: {
      task: `Mục Vận dụng SGK: Rèn luyện hàng ngày tại nhà và chia sẻ niềm vui sáng tạo với gia đình, bạn bè.`,
      studentWork: `Tiếp tục luyện tập ở nhà để nâng cao thể lực và năng khiếu bản thân.`
    }
  };
}

/**
 * Xây dựng danh sách 4 bước hoạt động dạy học chuẩn CV 2345/BGDĐT
 * với việc BỔ SUNG ĐẦY ĐỦ NỘI DUNG CHÍNH TRONG SGK VÀO CẢ HĐGV VÀ HĐHS
 */
export function buildActivitiesWithExplicitSGKContent(
  entry: CurriculumLessonEntry,
  subject: string,
  grade: number,
  ppct: number,
  week: number
): KHBDActivity[] {
  const sgk = extractSGKDetailsForLesson(entry, subject, grade, ppct, week);
  const integrationStr = entry.integrationNote || (entry.detailedGoals?.integration) || "Bồi dưỡng phẩm chất và kĩ năng sống.";

  // 1. BƯỚC 1: HOẠT ĐỘNG KHỞI ĐỘNG
  const warmUpActivity: KHBDActivity = {
    step: "1. Hoạt động khởi động",
    time: "5 phút",
    target: `Tạo tâm thế vui tươi, hứng khởi và kết nối kiến thức thực tế vào bài học SGK: ${entry.title}.`,
    teacherActivities: [
      `- Tổ chức trò chơi khởi động vui nhộn hoặc bắt nhịp cho cả lớp hát bài hát liên quan đến chủ điểm bài học.`,
      `- Đặt câu hỏi gợi mở kết nối kiến thức thực tế với bài học mới trong SGK: '${sgk.questions[0]?.q || "Em đã từng gặp tình huống này chưa?"}'.`,
      `- Nhận xét câu trả lời của học sinh, tuyên dương tinh thần tích cực.`,
      `- Giới thiệu bài học: '${entry.title}' (${sgk.bookName}); ghi tựa bài lên bảng lớp.`
    ],
    studentActivities: [
      `- Cả lớp hào hứng tham gia trò chơi hoặc hát vang bài hát khởi động cùng cô giáo.`,
      `- 1-2 học sinh xung phong trả lời câu hỏi gợi mở theo trải nghiệm thực tế của bản thân.`,
      `- Mở sách giáo khoa trang bài học tương ứng, đặt sách vở ngay ngắn và ghi tựa bài vào vở.`
    ]
  };

  // 2. BƯỚC 2: KHÁM PHÁ (NỘI DUNG CHÍNH TRONG SGK)
  const explorationTeacher: string[] = [
    `- Giới thiệu ngữ liệu và kênh hình trong SGK:`,
    `  + Hướng dẫn học sinh mở SGK, quan sát kĩ: ${sgk.contextOrPassage}`,
    `- Hướng dẫn học sinh khai thác hệ thống câu hỏi tìm hiểu bài trong SGK:`
  ];

  sgk.questions.forEach((item, idx) => {
    explorationTeacher.push(`  + ${item.q}`);
    explorationTeacher.push(`    -> Định hướng / Gợi ý đáp án: ${item.a}`);
  });

  explorationTeacher.push(`- Chuẩn xác hóa kiến thức trọng tâm (Khung Ghi nhớ SGK):`);
  explorationTeacher.push(`  + ${sgk.memoryBox}`);
  explorationTeacher.push(`- Lồng ghép nội dung tích hợp: ${integrationStr}`);

  const explorationStudent: string[] = [
    `- Đọc thầm và chú ý quan sát ngữ liệu, tranh ảnh minh họa trong SGK:`,
    `  + Dùng bút chì đánh dấu từ khó / số liệu quan trọng theo hướng dẫn của giáo viên.`,
    `- Thảo luận nhóm đôi hoặc nhóm 4, tích cực trả lời hệ thống câu hỏi tìm hiểu bài trong SGK:`
  ];

  sgk.questions.forEach((item, idx) => {
    explorationStudent.push(`  + ${item.q.replace(/Câu \d+ \(SGK\):\s*/i, "Trả lời: ")}`);
    explorationStudent.push(`    -> HS phát biểu: ${item.a}`);
  });

  explorationStudent.push(`- Đọc to và ghi nhớ khung kiến thức cốt lõi trong SGK:`);
  explorationStudent.push(`  + 2-3 học sinh đọc to khung Ghi nhớ; cả lớp đọc đồng thanh.`);
  explorationStudent.push(`  + Ghi chép các ý trọng tâm / quy tắc / công thức SGK vào vở bài học.`);

  const explorationActivity: KHBDActivity = {
    step: "2. Hoạt động hình thành kiến thức mới (nếu có)",
    time: "15 phút",
    target: `Học sinh nắm vững nội dung chính trong SGK, hình thành kiến thức mới và trả lời được hệ thống câu hỏi bài học: ${entry.title}.`,
    teacherActivities: explorationTeacher,
    studentActivities: explorationStudent
  };

  // 3. BƯỚC 3: HOẠT ĐỘNG LUYỆN TẬP THỰC HÀNH
  const practiceTeacher: string[] = [
    `- Hướng dẫn học sinh lần lượt giải quyết hệ thống bài tập trong SGK:`
  ];

  sgk.exercises.forEach((ex) => {
    practiceTeacher.push(`  * ${ex.name}:`);
    practiceTeacher.push(`    - Đề bài SGK: ${ex.task}`);
    practiceTeacher.push(`    - Hướng dẫn của GV: ${ex.teacherGuide}`);
  });

  practiceTeacher.push(`- Đi lại bao quát lớp học, quan sát uốn nắn kịp thời cho các em học sinh còn lúng túng.`);
  practiceTeacher.push(`- Tổ chức chữa bài công khai trên bảng; chuẩn xác hóa kết quả và nhận xét tuyên dương.`);

  const practiceStudent: string[] = [
    `- Tự giác thực hành hoàn thành từng bài tập trong SGK:`
  ];

  sgk.exercises.forEach((ex) => {
    practiceStudent.push(`  * Thực hiện ${ex.name}:`);
    practiceStudent.push(`    - Thao tác của HS: ${ex.studentWork}`);
  });

  practiceStudent.push(`- Đổi chéo vở kiểm tra kết quả cùng bạn ngồi bên cạnh.`);
  practiceStudent.push(`- Chú ý theo dõi cô giáo chữa bài trên bảng lớp, tự đối chiếu và sửa sai (nếu có) vào vở.`);

  const practiceActivity: KHBDActivity = {
    step: "3. Hoạt động luyện tập thực hành",
    time: "12 phút",
    target: `Vận dụng kiến thức vừa học để giải đúng, thành thạo các bài tập thực hành trong SGK.`,
    teacherActivities: practiceTeacher,
    studentActivities: practiceStudent
  };

  // 4. BƯỚC 4: HOẠT ĐỘNG VẬN DỤNG, TRẢI NGHIỆM
  const applicationActivity: KHBDActivity = {
    step: "4. Hoạt động vận dụng, trải nghiệm",
    time: "3 phút",
    target: `Khắc sâu kiến thức bài học và vận dụng vào các tình huống thực tiễn đời sống, trải nghiệm theo hướng dẫn của SGK.`,
    teacherActivities: [
      `- Nêu nhiệm vụ trong mục Vận dụng của SGK:`,
      `  + ${sgk.application.task}`,
      `- Củng cố lại thông điệp / quy tắc bài học trọng tâm.`,
      `- Nhận xét, đánh giá tiết học; tuyên dương những học sinh học tập tích cực, hăng hái phát biểu.`,
      `- Dặn dò học sinh về nhà ôn lại bài và chuẩn bị chu đáo cho bài học tiếp theo trong SGK.`
    ],
    studentActivities: [
      `- Lắng nghe nhiệm vụ vận dụng và thực hiện yêu cầu SGK:`,
      `  + ${sgk.application.studentWork}`,
      `- Nhắc lại 1-2 nội dung cốt lõi của bài học theo câu hỏi chốt của cô giáo.`,
      `- Thu dọn đồ dùng học tập, sách vở gọn gàng vào ngăn bàn / cặp sách.`
    ]
  };

  return [warmUpActivity, explorationActivity, practiceActivity, applicationActivity];
}
