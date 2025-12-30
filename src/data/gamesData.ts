import { ReactNode } from "react";

export interface GameItem {
  id: number;
  name: string;
  description: string;
  level: string;
  colorClass: string;
  players?: number;
  rating?: number;
  category?: string;
}

export interface GameSection {
  title: string;
  iconName: string;
  games: GameItem[];
}

export const gameSections: GameSection[] = [
  {
    title: "Trò chơi phổ biến",
    iconName: "Flame",
    games: [
      { id: 1, name: "Đoán Ký Hiệu", description: "Xem video và chọn từ vựng tương ứng.", colorClass: "bg-orange-500", level: "Dễ", players: 15420, rating: 4.8, category: "Từ vựng" },
      { id: 2, name: "Vua Tốc Độ", description: "Thử thách phản xạ với chuỗi ký hiệu.", colorClass: "bg-blue-500", level: "Khó", players: 8930, rating: 4.6, category: "Phản xạ" },
      { id: 3, name: "Đua Ký Hiệu", description: "Thi đấu trực tuyến với người chơi khác.", colorClass: "bg-red-500", level: "Trung bình", players: 12350, rating: 4.7, category: "Đối kháng" },
      { id: 4, name: "Ký Hiệu Hàng Ngày", description: "Thử thách mới mỗi ngày.", colorClass: "bg-yellow-500", level: "Dễ", players: 25680, rating: 4.9, category: "Hàng ngày" },
    ]
  },
  {
    title: "Rèn luyện trí não",
    iconName: "Brain",
    games: [
      { id: 5, name: "Xếp Hình Ký Hiệu", description: "Ghép các mảnh ghép tạo thành ký hiệu.", colorClass: "bg-purple-500", level: "Trung bình", players: 7820, rating: 4.5, category: "Puzzle" },
      { id: 6, name: "Nhớ Cặp Đôi", description: "Tìm các cặp hình ảnh và ký hiệu tương ứng.", colorClass: "bg-green-500", level: "Dễ", players: 11250, rating: 4.7, category: "Trí nhớ" },
      { id: 7, name: "Sudoku Ký Hiệu", description: "Giải sudoku với các ký hiệu thay vì số.", colorClass: "bg-indigo-500", level: "Khó", players: 4560, rating: 4.4, category: "Logic" },
      { id: 8, name: "Tìm Điểm Khác", description: "Tìm ký hiệu khác biệt trong nhóm.", colorClass: "bg-pink-500", level: "Dễ", players: 9870, rating: 4.6, category: "Quan sát" },
    ]
  },
  {
    title: "Học qua chơi",
    iconName: "BookOpen",
    games: [
      { id: 9, name: "Câu Chuyện Ký Hiệu", description: "Học ký hiệu qua các câu chuyện thú vị.", colorClass: "bg-teal-500", level: "Dễ", players: 18950, rating: 4.8, category: "Câu chuyện" },
      { id: 10, name: "Karaoke Ký Hiệu", description: "Hát theo lời bài hát bằng ký hiệu.", colorClass: "bg-rose-500", level: "Trung bình", players: 6780, rating: 4.5, category: "Âm nhạc" },
      { id: 11, name: "Đố Vui Ký Hiệu", description: "Trả lời các câu đố về ký hiệu.", colorClass: "bg-amber-500", level: "Dễ", players: 14320, rating: 4.7, category: "Đố vui" },
      { id: 12, name: "Phiêu Lưu Ký Hiệu", description: "Khám phá thế giới ký hiệu qua game nhập vai.", colorClass: "bg-cyan-500", level: "Trung bình", players: 8450, rating: 4.6, category: "Nhập vai" },
    ]
  },
  {
    title: "Thử thách cao cấp",
    iconName: "Trophy",
    games: [
      { id: 13, name: "Marathon Ký Hiệu", description: "100 câu hỏi liên tiếp, không nghỉ.", colorClass: "bg-slate-700", level: "Rất khó", players: 2340, rating: 4.3, category: "Marathon" },
      { id: 14, name: "Dịch Thuật Tốc Độ", description: "Dịch câu hoàn chỉnh trong thời gian giới hạn.", colorClass: "bg-emerald-600", level: "Khó", players: 5670, rating: 4.5, category: "Dịch thuật" },
      { id: 15, name: "Giải Mã Bí Ẩn", description: "Giải mã các tin nhắn ký hiệu phức tạp.", colorClass: "bg-violet-600", level: "Rất khó", players: 3120, rating: 4.4, category: "Giải đố" },
      { id: 16, name: "Đấu Trường Ký Hiệu", description: "PvP thời gian thực với người chơi toàn cầu.", colorClass: "bg-red-600", level: "Khó", players: 7890, rating: 4.7, category: "PvP" },
    ]
  },
  {
    title: "Trò chơi cho trẻ em",
    iconName: "Sparkles",
    games: [
      { id: 17, name: "Bé Học Ký Hiệu", description: "Trò chơi đơn giản cho bé 4-6 tuổi.", colorClass: "bg-lime-500", level: "Rất dễ", players: 21450, rating: 4.9, category: "Trẻ em" },
      { id: 18, name: "Tô Màu Ký Hiệu", description: "Tô màu các hình ảnh ký hiệu.", colorClass: "bg-fuchsia-500", level: "Rất dễ", players: 16780, rating: 4.8, category: "Sáng tạo" },
      { id: 19, name: "Động Vật Ký Hiệu", description: "Học ký hiệu các con vật qua trò chơi.", colorClass: "bg-orange-400", level: "Rất dễ", players: 19320, rating: 4.9, category: "Động vật" },
      { id: 20, name: "Số Đếm Vui", description: "Học đếm số bằng ký hiệu.", colorClass: "bg-sky-500", level: "Rất dễ", players: 17650, rating: 4.8, category: "Số đếm" },
    ]
  },
];

export const levelConfig: Record<string, { color: string }> = {
  "Rất dễ": { color: "bg-lime-100 text-lime-700" },
  "Dễ": { color: "bg-green-100 text-green-700" },
  "Trung bình": { color: "bg-yellow-100 text-yellow-700" },
  "Khó": { color: "bg-orange-100 text-orange-700" },
  "Rất khó": { color: "bg-red-100 text-red-700" },
};

export const gameCategories = [
  { id: "all", label: "Tất cả" },
  { id: "vocabulary", label: "Từ vựng" },
  { id: "memory", label: "Trí nhớ" },
  { id: "puzzle", label: "Puzzle" },
  { id: "pvp", label: "Đối kháng" },
  { id: "kids", label: "Trẻ em" },
  { id: "daily", label: "Hàng ngày" },
];
