// Shared step types used by both /study and /learn pages
// Based on: B2026. Khung Nội dung hỗ trợ dạy và học ký hiệu.xlsx

// Step types
export type StepType =
  | "vocabulary" // 1.1, 2.1, 3.1: Quan sát video và làm ký hiệu theo mẫu
  | "sentence" // Cấu trúc câu - video + thẻ từ
  | "match-video-to-image" // 2.2: Nối kí hiệu tương ứng với hình ảnh của từ
  | "match-video-to-text" // 2.5: Nối kí hiệu tương ứng với từ
  | "quiz-video-to-image" // 2.3: Xem kí hiệu chọn hình ảnh tương ứng (1 trong 3-5)
  | "quiz-video-to-text" // 2.4: Xem kí hiệu chọn từ tương ứng (1 trong 3-5)
  | "quiz-text-to-video" // Nhìn chữ chọn video
  | "quiz-input" // Tự gõ đáp án
  | "flip-card" // 3.4: Lật mở ô cửa (6 ô, mở video rồi ghép với từ)
  | "true-false"; // 3.5: Đúng - sai (A,B,C options)

// Common Step item interface
export interface BaseStepItem {
  id: number;
  title: string;
  type: StepType;
  order: number;
  completed?: boolean;

  // For vocabulary type
  word?: string;
  videoUrl?: string;
  description?: string;

  // For sentence type
  sentence?: string;
  words?: { word: string; videoUrl: string }[];

  // For quiz types
  question?: string;
  questionVideoUrl?: string;
  questionImageUrl?: string;
  options?: {
    id: number;
    text?: string;
    videoUrl?: string;
    imageUrl?: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string; // For quiz-input type
  hint?: string;

  // For match types (2.2, 2.5)
  matchPairs?: {
    id: number;
    videoUrl: string;
    matchText?: string;
    matchImageUrl?: string;
  }[];

  // For flip-card type (3.4)
  flipCards?: {
    id: number;
    videoUrl: string;
    matchText: string;
  }[];

  // For true-false type (3.5)
  statement?: string;
  statementVideoUrl?: string;
  isTrue?: boolean;
}

// Step type config for UI display
export const stepTypeConfig: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  vocabulary: {
    label: "Từ vựng",
    color: "bg-blue-100 text-blue-700",
    icon: "📹",
  },
  sentence: {
    label: "Cấu trúc câu",
    color: "bg-purple-100 text-purple-700",
    icon: "📝",
  },
  "match-video-to-image": {
    label: "Nối hình ảnh",
    color: "bg-green-100 text-green-700",
    icon: "🔗",
  },
  "match-video-to-text": {
    label: "Nối từ",
    color: "bg-teal-100 text-teal-700",
    icon: "🔗",
  },
  "quiz-video-to-image": {
    label: "Chọn hình",
    color: "bg-orange-100 text-orange-700",
    icon: "🖼️",
  },
  "quiz-video-to-text": {
    label: "Kiểm tra",
    color: "bg-amber-100 text-amber-700",
    icon: "❓",
  },
  "quiz-text-to-video": {
    label: "Kiểm tra",
    color: "bg-amber-100 text-amber-700",
    icon: "❓",
  },
  "quiz-input": {
    label: "Nhập đáp án",
    color: "bg-rose-100 text-rose-700",
    icon: "⌨️",
  },
  "flip-card": {
    label: "Lật thẻ",
    color: "bg-indigo-100 text-indigo-700",
    icon: "🎴",
  },
  "true-false": {
    label: "Đúng/Sai",
    color: "bg-cyan-100 text-cyan-700",
    icon: "✅",
  },
};
