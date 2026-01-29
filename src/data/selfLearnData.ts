// Self-learning courses data for /learn page (học viên tự do không thuộc trường/cơ sở)
// Based on: B2026. Khung Nội dung hỗ trợ dạy và học ký hiệu.xlsx

import { BaseStepItem, StepType } from "@/shared/components/common/step";

// Course structure for self-learning
export interface SelfLearnCourse {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  colorClass: string;
  textClass: string;
  totalLessons: number;
  duration: string;
  level: string;
  progress?: number;
}

export interface SelfLearnLesson {
  id: number;
  courseId: number;
  title: string;
  description: string;
  duration: string;
  order: number;
  completed?: boolean;
  stepsCount: number;
}

// Sample vocabulary words for lessons
const vocabularyWords = [
  { word: "Xin chào", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Cảm ơn", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Tạm biệt", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Xin lỗi", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "A", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "B", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "C", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Một", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Hai", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Ba", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Gia đình", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Bố", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Mẹ", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Anh", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Chị", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Em", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Nhà", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Trường", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Cây", videoUrl: "https://player.vimeo.com/video/824804225" },
  { word: "Hoa", videoUrl: "https://player.vimeo.com/video/824804225" },
];

// All courses data
export const selfLearnCourses: SelfLearnCourse[] = [
  {
    id: 1,
    title: "Làm quen với chữ cái và số",
    subtitle: "Chữ cái, thanh điệu, số tự nhiên",
    description:
      "Học làm chữ cái ngón tay, dấu thanh và số theo mẫu. Bao gồm các hoạt động nối/ghép và lật thẻ tranh.",
    colorClass: "bg-gradient-to-r from-rose-500 to-pink-600",
    textClass: "text-rose-600",
    totalLessons: 12,
    duration: "5 giờ",
    level: "Cơ bản",
    progress: 0,
  },
  {
    id: 2,
    title: "Bản thân em",
    subtitle: "Cơ thể, hoạt động và cảm xúc",
    description:
      "Học về các bộ phận cơ thể, hoạt động hàng ngày, thế giới cảm xúc và sở thích.",
    colorClass: "bg-gradient-to-r from-amber-500 to-orange-600",
    textClass: "text-amber-600",
    totalLessons: 10,
    duration: "3 giờ",
    level: "Cơ bản",
    progress: 0,
  },
  {
    id: 3,
    title: "Gia đình",
    subtitle: "Người thân, ngôi nhà và tình yêu thương",
    description:
      "Học về các thành viên gia đình, ngôi nhà và cách thể hiện yêu thương.",
    colorClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
    textClass: "text-emerald-600",
    totalLessons: 10,
    duration: "3 giờ",
    level: "Cơ bản",
    progress: 0,
  },
  {
    id: 4,
    title: "Nhà trường",
    subtitle: "Trường học, giao tiếp và mọi người",
    description:
      "Học về môi trường học đường, giao tiếp lịch sự và an toàn giao thông.",
    colorClass: "bg-gradient-to-r from-blue-500 to-indigo-600",
    textClass: "text-blue-600",
    totalLessons: 8,
    duration: "3 giờ",
    level: "Cơ bản",
    progress: 0,
  },
  {
    id: 5,
    title: "Thiên nhiên và Đất nước",
    subtitle: "Thiên nhiên, đất nước và môi trường",
    description:
      "Khám phá thiên nhiên kỳ thú, đất nước tươi đẹp và bảo vệ môi trường.",
    colorClass: "bg-gradient-to-r from-green-500 to-lime-600",
    textClass: "text-green-600",
    totalLessons: 8,
    duration: "3 giờ",
    level: "Cơ bản",
    progress: 0,
  },
];

// Lesson titles for each course
const lessonTitlesPerCourse: Record<number, string[]> = {
  1: [
    "Chữ cái A-E",
    "Chữ cái F-J",
    "Chữ cái K-O",
    "Chữ cái P-T",
    "Chữ cái U-Z",
    "Dấu thanh cơ bản",
    "Số 0-5",
    "Số 6-10",
    "Số 11-15",
    "Số 16-20",
    "Ôn tập chữ cái",
    "Ôn tập số",
  ],
  2: [
    "Khuôn mặt",
    "Bàn tay và chân",
    "Các bộ phận cơ thể khác",
    "Hoạt động buổi sáng",
    "Hoạt động buổi chiều",
    "Cảm xúc vui buồn",
    "Cảm xúc khác",
    "Sở thích cá nhân",
    "Ước mơ của em",
    "Ôn tập tổng hợp",
  ],
  3: [
    "Bố và Mẹ",
    "Anh chị em",
    "Ông bà",
    "Các phòng trong nhà",
    "Đồ dùng phòng khách",
    "Đồ dùng phòng ngủ",
    "Đồ dùng nhà bếp",
    "Yêu thương gia đình",
    "Chia sẻ và giúp đỡ",
    "Ôn tập gia đình",
  ],
  4: [
    "Lớp học",
    "Đồ dùng học tập",
    "Thầy cô giáo",
    "Bạn bè",
    "Chào hỏi lịch sự",
    "Xin phép và cảm ơn",
    "Phương tiện giao thông",
    "An toàn giao thông",
  ],
  5: [
    "Động vật nuôi",
    "Động vật hoang dã",
    "Cây cối và hoa",
    "Địa danh nổi tiếng",
    "Lễ hội Việt Nam",
    "Văn hóa dân tộc",
    "Bảo vệ môi trường",
    "Trái đất xanh",
  ],
};

// Generate steps for a self-learn lesson
const generateStepsForSelfLearnLesson = (
  lessonId: number,
  lessonOrder: number,
): BaseStepItem[] => {
  const steps: BaseStepItem[] = [];
  let stepOrder = 1;

  // Get vocabulary words for this lesson
  const startIdx = (lessonOrder * 2) % vocabularyWords.length;
  const vocabCount = 3;

  // Step 1-3: Vocabulary
  for (let i = 0; i < vocabCount; i++) {
    const vocab = vocabularyWords[(startIdx + i) % vocabularyWords.length];
    steps.push({
      id: lessonId * 100 + stepOrder,
      title: `Từ vựng: ${vocab.word}`,
      type: "vocabulary" as StepType,
      order: stepOrder,
      completed: stepOrder <= 1,
      word: vocab.word,
      videoUrl: vocab.videoUrl,
      description: `Quan sát video và làm ký hiệu theo mẫu cho từ "${vocab.word}"`,
    });
    stepOrder++;
  }

  // Step 4: Sentence
  const sentenceWords = vocabularyWords
    .slice(startIdx, startIdx + 3)
    .map((v) => ({
      word: v.word,
      videoUrl: v.videoUrl,
    }));
  steps.push({
    id: lessonId * 100 + stepOrder,
    title: "Luyện tập: Cấu trúc câu",
    type: "sentence" as StepType,
    order: stepOrder,
    completed: false,
    sentence: sentenceWords.map((w) => w.word).join(" "),
    words: sentenceWords,
    videoUrl: "https://player.vimeo.com/video/824804225",
  });
  stepOrder++;

  // Step 5: Quiz Video to Text
  const quizVocab = vocabularyWords[(startIdx + 1) % vocabularyWords.length];
  const wrongOptions = vocabularyWords
    .filter((_, i) => i !== (startIdx + 1) % vocabularyWords.length)
    .slice(0, 3);

  steps.push({
    id: lessonId * 100 + stepOrder,
    title: "Kiểm tra: Nhìn video chọn từ",
    type: "quiz-video-to-text" as StepType,
    order: stepOrder,
    completed: false,
    questionVideoUrl: quizVocab.videoUrl,
    options: [
      { id: 1, text: quizVocab.word, isCorrect: true },
      { id: 2, text: wrongOptions[0]?.word || "Khác", isCorrect: false },
      { id: 3, text: wrongOptions[1]?.word || "Khác", isCorrect: false },
      { id: 4, text: wrongOptions[2]?.word || "Khác", isCorrect: false },
    ].sort(() => Math.random() - 0.5),
  });
  stepOrder++;

  // Step 6: Quiz Input
  steps.push({
    id: lessonId * 100 + stepOrder,
    title: "Kiểm tra: Gõ đáp án",
    type: "quiz-input" as StepType,
    order: stepOrder,
    completed: false,
    questionVideoUrl: quizVocab.videoUrl,
    correctAnswer: quizVocab.word,
    hint: quizVocab.word.charAt(0) + "...",
  });

  return steps;
};

// Generate lessons for a course
const generateLessonsForCourse = (courseId: number): SelfLearnLesson[] => {
  const lessonTitles = lessonTitlesPerCourse[courseId] || [];
  const lessons: SelfLearnLesson[] = [];

  lessonTitles.forEach((title, index) => {
    const lessonId = courseId * 100 + index + 1;
    lessons.push({
      id: lessonId,
      courseId: courseId,
      title: `Bài ${index + 1}: ${title}`,
      description: `Học về ${title.toLowerCase()}`,
      duration: "15 phút",
      order: index + 1,
      completed: index < 2, // First 2 lessons marked as completed
      stepsCount: 6,
    });
  });

  return lessons;
};

// Cache for generated data
const lessonsCache: Record<number, SelfLearnLesson[]> = {};
const stepsCache: Record<number, BaseStepItem[]> = {};

// Get all courses
export const getAllSelfLearnCourses = (): SelfLearnCourse[] => {
  return selfLearnCourses;
};

// Get course by ID
export const getSelfLearnCourseById = (
  courseId: number,
): SelfLearnCourse | undefined => {
  return selfLearnCourses.find((c) => c.id === courseId);
};

// Get lessons by course ID
export const getLessonsByCourseId = (courseId: number): SelfLearnLesson[] => {
  if (!lessonsCache[courseId]) {
    lessonsCache[courseId] = generateLessonsForCourse(courseId);
  }
  return lessonsCache[courseId];
};

// Get lesson by ID
export const getSelfLearnLessonById = (
  lessonId: number,
): SelfLearnLesson | undefined => {
  const courseId = Math.floor(lessonId / 100);
  const lessons = getLessonsByCourseId(courseId);
  return lessons.find((l) => l.id === lessonId);
};

// Get steps by lesson ID
export const getSelfLearnStepsByLessonId = (
  lessonId: number,
): BaseStepItem[] => {
  if (!stepsCache[lessonId]) {
    const lessonOrder = (lessonId % 100) - 1;
    stepsCache[lessonId] = generateStepsForSelfLearnLesson(
      lessonId,
      lessonOrder,
    );
  }
  return stepsCache[lessonId];
};

// Get step by ID
export const getSelfLearnStepById = (
  stepId: number,
): BaseStepItem | undefined => {
  const lessonId = Math.floor(stepId / 100);
  const steps = getSelfLearnStepsByLessonId(lessonId);
  return steps.find((s) => s.id === stepId);
};
