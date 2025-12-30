export interface DailySign {
  id: number;
  date: string;
  word: string;
  category: string;
  videoUrl: string;
  definition: string;
  examples: string[];
  tips: string;
  difficulty: string;
  relatedWords?: string[];
}

export const dailySigns: DailySign[] = [
  {
    id: 1,
    date: "2025-01-01",
    word: "Năm mới",
    category: "Ngày lễ",
    videoUrl: "/videos/nammoi.mp4",
    definition: "Ngày đầu tiên của năm mới theo lịch dương, thường được chào đón bằng các lễ hội và sự kiện.",
    examples: ["Chúc mừng năm mới!", "Năm mới đã đến rồi.", "Bạn có kế hoạch gì cho năm mới?"],
    tips: "Ký hiệu này kết hợp giữa ký hiệu 'năm' và 'mới'. Thực hiện bằng cách xoay tay theo chiều kim đồng hồ.",
    difficulty: "Dễ",
    relatedWords: ["Tết", "Lễ hội", "Chúc mừng"]
  },
  {
    id: 2,
    date: "2025-01-02",
    word: "Gia đình",
    category: "Gia đình",
    videoUrl: "/videos/giadinh.mp4",
    definition: "Nhóm người có quan hệ huyết thống hoặc hôn nhân sống chung với nhau.",
    examples: ["Gia đình tôi có 4 người.", "Gia đình rất quan trọng.", "Tôi yêu gia đình tôi."],
    tips: "Dùng hai bàn tay tạo thành hình vòng tròn, tượng trưng cho sự gắn kết của gia đình.",
    difficulty: "Dễ",
    relatedWords: ["Bố", "Mẹ", "Anh chị em"]
  },
  {
    id: 3,
    date: "2025-01-03",
    word: "Học",
    category: "Giáo dục",
    videoUrl: "/videos/hoc.mp4",
    definition: "Quá trình tiếp thu kiến thức, kỹ năng thông qua nghiên cứu, thực hành.",
    examples: ["Tôi đang học tiếng ký hiệu.", "Học là điều quan trọng.", "Bạn học ở đâu?"],
    tips: "Ký hiệu mô phỏng động tác lấy kiến thức từ sách vào đầu.",
    difficulty: "Dễ",
    relatedWords: ["Trường học", "Giáo viên", "Học sinh"]
  },
  {
    id: 4,
    date: "2025-01-04",
    word: "Yêu",
    category: "Cảm xúc",
    videoUrl: "/videos/yeu.mp4",
    definition: "Cảm xúc mạnh mẽ của sự quan tâm và gắn bó sâu sắc với ai đó.",
    examples: ["Tôi yêu bạn.", "Yêu thương là điều tuyệt vời.", "Họ rất yêu nhau."],
    tips: "Đặt hai tay chéo lên ngực, biểu thị tình cảm đến từ trái tim.",
    difficulty: "Dễ",
    relatedWords: ["Thương", "Thích", "Quan tâm"]
  },
  {
    id: 5,
    date: "2025-01-05",
    word: "Cảm ơn",
    category: "Chào hỏi",
    videoUrl: "/videos/camon.mp4",
    definition: "Lời nói thể hiện sự biết ơn, trân trọng khi nhận được sự giúp đỡ hoặc quà tặng.",
    examples: ["Cảm ơn bạn rất nhiều!", "Tôi muốn cảm ơn mọi người.", "Cảm ơn vì đã giúp đỡ."],
    tips: "Đưa bàn tay từ môi ra phía trước, như đang gửi lời cảm ơn đến người khác.",
    difficulty: "Dễ",
    relatedWords: ["Xin lỗi", "Không có gì", "Làm ơn"]
  },
  {
    id: 6,
    date: "2025-01-06",
    word: "Bạn",
    category: "Quan hệ",
    videoUrl: "/videos/ban.mp4",
    definition: "Người có mối quan hệ thân thiết, gắn bó qua tình bạn.",
    examples: ["Đây là bạn tôi.", "Bạn có khỏe không?", "Chúng tôi là bạn thân."],
    tips: "Móc hai ngón trỏ vào nhau, tượng trưng cho sự kết nối giữa hai người bạn.",
    difficulty: "Dễ",
    relatedWords: ["Bạn thân", "Đồng nghiệp", "Người quen"]
  },
  {
    id: 7,
    date: "2025-01-07",
    word: "Thời tiết",
    category: "Thời tiết",
    videoUrl: "/videos/thoitiet.mp4",
    definition: "Trạng thái của khí quyển tại một nơi và thời điểm cụ thể.",
    examples: ["Thời tiết hôm nay thế nào?", "Thời tiết đẹp quá!", "Thời tiết xấu, không đi được."],
    tips: "Hai bàn tay đặt song song, di chuyển lên xuống tượng trưng cho sự thay đổi thời tiết.",
    difficulty: "Trung bình",
    relatedWords: ["Nắng", "Mưa", "Gió"]
  },
  {
    id: 8,
    date: "2025-01-08",
    word: "Ăn",
    category: "Đời sống",
    videoUrl: "/videos/an.mp4",
    definition: "Đưa thức ăn vào miệng, nhai và nuốt để cung cấp dinh dưỡng cho cơ thể.",
    examples: ["Bạn đã ăn chưa?", "Tôi muốn ăn phở.", "Chúng ta đi ăn nhé!"],
    tips: "Mô phỏng động tác đưa thức ăn vào miệng bằng tay phải.",
    difficulty: "Dễ",
    relatedWords: ["Uống", "Đói", "Thức ăn"]
  },
  {
    id: 9,
    date: "2025-01-09",
    word: "Đi",
    category: "Đời sống",
    videoUrl: "/videos/di.mp4",
    definition: "Di chuyển từ nơi này sang nơi khác bằng chân hoặc phương tiện.",
    examples: ["Tôi đi làm.", "Bạn đi đâu vậy?", "Chúng ta đi thôi!"],
    tips: "Hai ngón tay trỏ và giữa di chuyển xen kẽ, mô phỏng bước đi.",
    difficulty: "Dễ",
    relatedWords: ["Chạy", "Về", "Đến"]
  },
  {
    id: 10,
    date: "2025-01-10",
    word: "Ngủ",
    category: "Đời sống",
    videoUrl: "/videos/ngu.mp4",
    definition: "Trạng thái nghỉ ngơi của cơ thể và tâm trí, thường xảy ra vào ban đêm.",
    examples: ["Tôi buồn ngủ quá.", "Ngủ ngon nhé!", "Bạn ngủ mấy tiếng?"],
    tips: "Đặt bàn tay lên má, nghiêng đầu như đang ngủ.",
    difficulty: "Dễ",
    relatedWords: ["Thức dậy", "Mơ", "Nghỉ ngơi"]
  },
  {
    id: 11,
    date: "2025-01-11",
    word: "Làm việc",
    category: "Đời sống",
    videoUrl: "/videos/lamviec.mp4",
    definition: "Thực hiện các hoạt động, nhiệm vụ để đạt được mục tiêu hoặc kiếm sống.",
    examples: ["Tôi đang làm việc.", "Làm việc chăm chỉ.", "Bạn làm việc ở đâu?"],
    tips: "Hai nắm tay đập vào nhau lần lượt, mô phỏng động tác làm việc.",
    difficulty: "Trung bình",
    relatedWords: ["Công việc", "Nghề nghiệp", "Văn phòng"]
  },
  {
    id: 12,
    date: "2025-01-12",
    word: "Vui",
    category: "Cảm xúc",
    videoUrl: "/videos/vui.mp4",
    definition: "Trạng thái cảm xúc tích cực, hạnh phúc, phấn khởi.",
    examples: ["Tôi rất vui!", "Chúc bạn vui vẻ!", "Hôm nay là ngày vui."],
    tips: "Đặt hai tay lên ngực và vuốt lên trên, thể hiện niềm vui dâng trào.",
    difficulty: "Dễ",
    relatedWords: ["Hạnh phúc", "Phấn khởi", "Cười"]
  },
  {
    id: 13,
    date: "2025-01-13",
    word: "Buồn",
    category: "Cảm xúc",
    videoUrl: "/videos/buon.mp4",
    definition: "Trạng thái cảm xúc tiêu cực, không vui, đau khổ.",
    examples: ["Tôi cảm thấy buồn.", "Đừng buồn nữa.", "Tại sao bạn buồn?"],
    tips: "Hai tay đặt trên mặt, vuốt xuống dưới biểu thị sự buồn bã.",
    difficulty: "Dễ",
    relatedWords: ["Khóc", "Đau khổ", "Thất vọng"]
  },
  {
    id: 14,
    date: "2025-01-14",
    word: "Nước",
    category: "Đời sống",
    videoUrl: "/videos/nuoc.mp4",
    definition: "Chất lỏng không màu, không mùi, cần thiết cho sự sống.",
    examples: ["Tôi muốn uống nước.", "Nước rất quan trọng.", "Cho tôi cốc nước."],
    tips: "Ngón tay tạo hình chữ W, đưa lên miệng như đang uống.",
    difficulty: "Dễ",
    relatedWords: ["Uống", "Khát", "Đồ uống"]
  },
  {
    id: 15,
    date: "2025-01-15",
    word: "Thời gian",
    category: "Thời gian",
    videoUrl: "/videos/thoigian.mp4",
    definition: "Đơn vị đo lường sự liên tục của các sự kiện từ quá khứ đến tương lai.",
    examples: ["Bây giờ là mấy giờ?", "Thời gian trôi nhanh quá!", "Tôi không có thời gian."],
    tips: "Chỉ vào cổ tay nơi đeo đồng hồ.",
    difficulty: "Trung bình",
    relatedWords: ["Giờ", "Phút", "Ngày"]
  },
  {
    id: 16,
    date: "2025-01-16",
    word: "Tiền",
    category: "Đời sống",
    videoUrl: "/videos/tien.mp4",
    definition: "Phương tiện trao đổi, thanh toán được sử dụng rộng rãi.",
    examples: ["Bao nhiêu tiền?", "Tôi không có tiền.", "Tiền rất quan trọng."],
    tips: "Chà ngón cái với các ngón còn lại, mô phỏng động tác đếm tiền.",
    difficulty: "Dễ",
    relatedWords: ["Mua", "Bán", "Giá"]
  },
  {
    id: 17,
    date: "2025-01-17",
    word: "Nhà",
    category: "Địa điểm",
    videoUrl: "/videos/nha.mp4",
    definition: "Nơi ở, sinh sống của một người hoặc gia đình.",
    examples: ["Tôi về nhà.", "Nhà bạn ở đâu?", "Đây là nhà tôi."],
    tips: "Hai bàn tay tạo hình mái nhà tam giác.",
    difficulty: "Dễ",
    relatedWords: ["Gia đình", "Phòng", "Cửa"]
  },
  {
    id: 18,
    date: "2025-01-18",
    word: "Xe",
    category: "Giao thông",
    videoUrl: "/videos/xe.mp4",
    definition: "Phương tiện di chuyển trên đường, có bánh xe.",
    examples: ["Tôi đi xe máy.", "Xe này đẹp quá!", "Bạn có xe không?"],
    tips: "Hai tay nắm như đang cầm vô lăng và xoay.",
    difficulty: "Dễ",
    relatedWords: ["Xe máy", "Ô tô", "Xe đạp"]
  },
  {
    id: 19,
    date: "2025-01-19",
    word: "Điện thoại",
    category: "Công nghệ",
    videoUrl: "/videos/dienthoai.mp4",
    definition: "Thiết bị điện tử dùng để liên lạc, giao tiếp từ xa.",
    examples: ["Cho tôi số điện thoại.", "Điện thoại tôi hết pin.", "Gọi điện thoại cho tôi nhé!"],
    tips: "Mô phỏng động tác cầm điện thoại lên tai.",
    difficulty: "Dễ",
    relatedWords: ["Gọi điện", "Nhắn tin", "Liên lạc"]
  },
  {
    id: 20,
    date: "2025-01-20",
    word: "Máy tính",
    category: "Công nghệ",
    videoUrl: "/videos/maytinh.mp4",
    definition: "Thiết bị điện tử xử lý thông tin, dữ liệu.",
    examples: ["Tôi làm việc trên máy tính.", "Máy tính này nhanh.", "Bạn có máy tính không?"],
    tips: "Giả vờ gõ bàn phím với hai tay.",
    difficulty: "Trung bình",
    relatedWords: ["Laptop", "Internet", "Phần mềm"]
  },
  {
    id: 21,
    date: "2025-01-21",
    word: "Đẹp",
    category: "Tính từ",
    videoUrl: "/videos/dep.mp4",
    definition: "Có hình thức, vẻ ngoài ưa nhìn, hấp dẫn.",
    examples: ["Bạn rất đẹp!", "Cảnh đẹp quá!", "Đây là nơi đẹp nhất."],
    tips: "Xoay bàn tay trước mặt theo hình tròn.",
    difficulty: "Dễ",
    relatedWords: ["Xinh", "Tuyệt vời", "Ấn tượng"]
  },
  {
    id: 22,
    date: "2025-01-22",
    word: "Lớn",
    category: "Tính từ",
    videoUrl: "/videos/lon.mp4",
    definition: "Có kích thước, số lượng vượt mức trung bình.",
    examples: ["Cái này lớn quá!", "Anh ấy lớn hơn tôi.", "Đây là thành phố lớn."],
    tips: "Hai tay mở rộng ra hai bên, thể hiện kích thước lớn.",
    difficulty: "Dễ",
    relatedWords: ["To", "Khổng lồ", "Rộng"]
  },
  {
    id: 23,
    date: "2025-01-23",
    word: "Nhỏ",
    category: "Tính từ",
    videoUrl: "/videos/nho.mp4",
    definition: "Có kích thước, số lượng dưới mức trung bình.",
    examples: ["Cái này nhỏ quá!", "Em ấy còn nhỏ.", "Nhà tôi nhỏ thôi."],
    tips: "Hai tay đưa lại gần nhau, thể hiện kích thước nhỏ.",
    difficulty: "Dễ",
    relatedWords: ["Bé", "Tí", "Chật"]
  },
  {
    id: 24,
    date: "2025-01-24",
    word: "Nhanh",
    category: "Tính từ",
    videoUrl: "/videos/nhanh.mp4",
    definition: "Di chuyển hoặc thực hiện với tốc độ cao.",
    examples: ["Chạy nhanh lên!", "Anh ấy làm việc rất nhanh.", "Thời gian trôi nhanh quá!"],
    tips: "Hai tay nắm lại, ngón cái bật ra ngoài nhanh chóng.",
    difficulty: "Trung bình",
    relatedWords: ["Tốc độ", "Vội", "Gấp"]
  },
  {
    id: 25,
    date: "2025-01-25",
    word: "Chậm",
    category: "Tính từ",
    videoUrl: "/videos/cham.mp4",
    definition: "Di chuyển hoặc thực hiện với tốc độ thấp.",
    examples: ["Đi chậm thôi!", "Anh ấy nói chậm.", "Đồng hồ chạy chậm."],
    tips: "Một tay vuốt nhẹ lên cánh tay kia với tốc độ chậm rãi.",
    difficulty: "Trung bình",
    relatedWords: ["Từ từ", "Thong thả", "Chậm rãi"]
  },
  {
    id: 26,
    date: "2025-01-26",
    word: "Mới",
    category: "Tính từ",
    videoUrl: "/videos/moi.mp4",
    definition: "Vừa được tạo ra, mua hoặc bắt đầu gần đây.",
    examples: ["Đây là xe mới.", "Năm mới đến rồi!", "Bạn mới đến à?"],
    tips: "Bàn tay phải vuốt lên lòng bàn tay trái, tượng trưng cho sự mới mẻ.",
    difficulty: "Dễ",
    relatedWords: ["Tươi mới", "Hiện đại", "Gần đây"]
  },
  {
    id: 27,
    date: "2025-01-27",
    word: "Cũ",
    category: "Tính từ",
    videoUrl: "/videos/cu.mp4",
    definition: "Đã tồn tại hoặc được sử dụng từ lâu.",
    examples: ["Đây là nhà cũ.", "Quần áo cũ rồi.", "Bạn cũ của tôi."],
    tips: "Nắm tay đưa xuống dưới cằm như vuốt râu già.",
    difficulty: "Trung bình",
    relatedWords: ["Xưa", "Lâu năm", "Cổ"]
  },
  {
    id: 28,
    date: "2025-01-28",
    word: "Đúng",
    category: "Tính từ",
    videoUrl: "/videos/dung.mp4",
    definition: "Phù hợp với sự thật, chính xác.",
    examples: ["Bạn nói đúng!", "Đáp án này đúng.", "Đúng rồi!"],
    tips: "Ngón trỏ đặt lên môi rồi hướng ra ngoài.",
    difficulty: "Dễ",
    relatedWords: ["Chính xác", "Đồng ý", "Phải"]
  },
  {
    id: 29,
    date: "2025-01-29",
    word: "Sai",
    category: "Tính từ",
    videoUrl: "/videos/sai.mp4",
    definition: "Không đúng, không phù hợp với sự thật.",
    examples: ["Câu trả lời sai.", "Bạn làm sai rồi!", "Đừng hiểu sai ý tôi."],
    tips: "Ngón trỏ lắc qua lắc lại trước mặt.",
    difficulty: "Dễ",
    relatedWords: ["Lỗi", "Nhầm", "Không đúng"]
  },
  {
    id: 30,
    date: "2025-01-30",
    word: "Hiểu",
    category: "Giao tiếp",
    videoUrl: "/videos/hieu.mp4",
    definition: "Nắm bắt được ý nghĩa, nội dung của điều gì đó.",
    examples: ["Tôi hiểu rồi!", "Bạn hiểu không?", "Khó hiểu quá!"],
    tips: "Đưa ngón trỏ từ thái dương ra ngoài, như ý tưởng vỡ lẽ.",
    difficulty: "Trung bình",
    relatedWords: ["Biết", "Nhận ra", "Nắm được"]
  },
];

export const previousSigns = dailySigns.slice(0, 10).map((sign, index) => ({
  ...sign,
  date: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString("vi-VN"),
}));

export const difficultyColors: Record<string, string> = {
  "Dễ": "bg-green-100 text-green-700",
  "Trung bình": "bg-yellow-100 text-yellow-700",
  "Khó": "bg-orange-100 text-orange-700",
  "Rất khó": "bg-red-100 text-red-700",
};
