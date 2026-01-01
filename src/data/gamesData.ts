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
  isActive: boolean; // Trạng thái bật/tắt game
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
      { id: 1, name: "Đoán Ký Hiệu", description: "Xem video và chọn từ vựng tương ứng.", colorClass: "bg-orange-500", level: "Dễ", players: 15420, rating: 4.8, category: "Từ vựng", isActive: true },
      { id: 2, name: "Vua Tốc Độ", description: "Thử thách phản xạ với chuỗi ký hiệu.", colorClass: "bg-blue-500", level: "Khó", players: 8930, rating: 4.6, category: "Phản xạ", isActive: true },
      { id: 3, name: "Ký Hiệu Hàng Ngày", description: "Thử thách mới mỗi ngày.", colorClass: "bg-yellow-500", level: "Dễ", players: 25680, rating: 4.9, category: "Hàng ngày", isActive: true },
    ]
  },
  {
    title: "Rèn luyện trí não",
    iconName: "Brain",
    games: [
      { id: 4, name: "Xếp Hình Ký Hiệu", description: "Ghép các mảnh ghép tạo thành ký hiệu.", colorClass: "bg-purple-500", level: "Trung bình", players: 7820, rating: 4.5, category: "Puzzle", isActive: true },
      { id: 5, name: "Nhớ Cặp Đôi", description: "Tìm các cặp hình ảnh và ký hiệu.", colorClass: "bg-green-500", level: "Dễ", players: 11250, rating: 4.7, category: "Trí nhớ", isActive: true },
    ]
  },
  {
    title: "Học qua chơi",
    iconName: "BookOpen",
    games: [
      { id: 6, name: "Câu Chuyện Ký Hiệu", description: "Học ký hiệu qua các câu chuyện thú vị.", colorClass: "bg-teal-500", level: "Dễ", players: 18950, rating: 4.8, category: "Câu chuyện", isActive: true },
      { id: 7, name: "Đố Vui Ký Hiệu", description: "Trả lời các câu đố về ký hiệu.", colorClass: "bg-amber-500", level: "Dễ", players: 14320, rating: 4.7, category: "Đố vui", isActive: false },
    ]
  },
  {
    title: "Trò chơi cho trẻ em",
    iconName: "Sparkles",
    games: [
      { id: 8, name: "Bé Học Ký Hiệu", description: "Trò chơi đơn giản cho bé 4-6 tuổi.", colorClass: "bg-lime-500", level: "Rất dễ", players: 21450, rating: 4.9, category: "Trẻ em", isActive: true },
      { id: 9, name: "Động Vật Ký Hiệu", description: "Học ký hiệu các con vật qua trò chơi.", colorClass: "bg-orange-400", level: "Rất dễ", players: 19320, rating: 4.9, category: "Động vật", isActive: true },
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
  { id: "kids", label: "Trẻ em" },
  { id: "daily", label: "Hàng ngày" },
];

// Helper functions
export function getGameById(id: number): GameItem | undefined {
  return gameSections.flatMap(s => s.games).find(g => g.id === id);
}

export function getAllGames(): GameItem[] {
  return gameSections.flatMap(s => s.games);
}

import { removeVietnameseTones } from "@/src/utils/text";

export function getGamesByCategory(category: string): GameItem[] {
  return gameSections.flatMap(s => s.games).filter(
    g => removeVietnameseTones(g.category || "").includes(removeVietnameseTones(category))
  );
}

export function getGamesStats() {
  const allGames = getAllGames();
  return {
    totalGames: allGames.length,
    totalPlayers: allGames.reduce((sum, g) => sum + (g.players || 0), 0),
    avgRating: allGames.reduce((sum, g) => sum + (g.rating || 0), 0) / allGames.length,
    sectionsCount: gameSections.length,
  };
}
