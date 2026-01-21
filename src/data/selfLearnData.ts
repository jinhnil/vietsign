// Self-learning courses data for /learn page (học viên tự do không thuộc trường/cơ sở)
// Based on: B2026. Khung Nội dung hỗ trợ dạy và học ký hiệu.xlsx

import { BaseStepItem, StepType } from "@/components/common/step/types";

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
  topics: SelfLearnTopic[];
}

export interface SelfLearnTopic {
  id: number;
  courseId: number;
  title: string;
  subtitle: string;
  lessonsCount: number;
  completed?: boolean;
}

export interface SelfLearnLesson {
  id: number;
  topicId: number;
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

// All courses data based on Excel file
export const selfLearnCourses: SelfLearnCourse[] = [
  {
    id: 1,
    title: "Làm quen với chữ cái và số",
    subtitle: "Chữ cái, thanh điệu, số tự nhiên",
    description:
      "Học làm chữ cái ngón tay, dấu thanh và số theo mẫu. Bao gồm các hoạt động nối/ghép và lật thẻ tranh.",
    colorClass: "bg-gradient-to-r from-rose-500 to-pink-600",
    textClass: "text-rose-600",
    totalLessons: 30,
    duration: "5 giờ",
    level: "Cơ bản",
    progress: 0,
    topics: [
      {
        id: 101,
        courseId: 1,
        title: "Chữ cái ngón tay A-M",
        subtitle: "Học 13 chữ cái đầu",
        lessonsCount: 10,
      },
      {
        id: 102,
        courseId: 1,
        title: "Chữ cái ngón tay N-Z",
        subtitle: "Học 13 chữ cái cuối",
        lessonsCount: 10,
      },
      {
        id: 103,
        courseId: 1,
        title: "Số tự nhiên 0-20",
        subtitle: "Học đếm từ 0 đến 20",
        lessonsCount: 10,
      },
    ],
  },
  {
    id: 2,
    title: "Bản thân em",
    subtitle: "Cơ thể, hoạt động và cảm xúc",
    description:
      "Học về các bộ phận cơ thể, hoạt động hàng ngày, thế giới cảm xúc và sở thích.",
    colorClass: "bg-gradient-to-r from-amber-500 to-orange-600",
    textClass: "text-amber-600",
    totalLessons: 18,
    duration: "3 giờ",
    level: "Cơ bản",
    progress: 0,
    topics: [
      {
        id: 201,
        courseId: 2,
        title: "Cơ thể của em",
        subtitle: "Các bộ phận cơ thể",
        lessonsCount: 5,
      },
      {
        id: 202,
        courseId: 2,
        title: "Hoạt động hàng ngày",
        subtitle: "Các hoạt động thường ngày",
        lessonsCount: 5,
      },
      {
        id: 203,
        courseId: 2,
        title: "Thế giới cảm xúc",
        subtitle: "Diễn đạt cảm xúc",
        lessonsCount: 4,
      },
      {
        id: 204,
        courseId: 2,
        title: "Sở thích và ước mơ",
        subtitle: "Nói về sở thích",
        lessonsCount: 4,
      },
    ],
  },
  {
    id: 3,
    title: "Gia đình",
    subtitle: "Người thân, ngôi nhà và tình yêu thương",
    description:
      "Học về các thành viên gia đình, ngôi nhà và cách thể hiện yêu thương.",
    colorClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
    textClass: "text-emerald-600",
    totalLessons: 18,
    duration: "3 giờ",
    level: "Cơ bản",
    progress: 0,
    topics: [
      {
        id: 301,
        courseId: 3,
        title: "Người thân của em",
        subtitle: "Các thành viên gia đình",
        lessonsCount: 6,
      },
      {
        id: 302,
        courseId: 3,
        title: "Ngôi nhà của em",
        subtitle: "Đồ vật trong nhà",
        lessonsCount: 6,
      },
      {
        id: 303,
        courseId: 3,
        title: "Yêu thương và Chia sẻ",
        subtitle: "Thể hiện tình cảm",
        lessonsCount: 6,
      },
    ],
  },
  {
    id: 4,
    title: "Nhà trường",
    subtitle: "Trường học, giao tiếp và mọi người",
    description:
      "Học về môi trường học đường, giao tiếp lịch sự và an toàn giao thông.",
    colorClass: "bg-gradient-to-r from-blue-500 to-indigo-600",
    textClass: "text-blue-600",
    totalLessons: 17,
    duration: "3 giờ",
    level: "Cơ bản",
    progress: 0,
    topics: [
      {
        id: 401,
        courseId: 4,
        title: "Trường học vui vẻ",
        subtitle: "Từ vựng về trường học",
        lessonsCount: 5,
      },
      {
        id: 402,
        courseId: 4,
        title: "Giao tiếp lịch sự",
        subtitle: "Cách giao tiếp tốt",
        lessonsCount: 4,
      },
      {
        id: 403,
        courseId: 4,
        title: "Mọi người ở quanh em",
        subtitle: "Người xung quanh",
        lessonsCount: 4,
      },
      {
        id: 404,
        courseId: 4,
        title: "Giao thông và an toàn",
        subtitle: "An toàn giao thông",
        lessonsCount: 4,
      },
    ],
  },
  {
    id: 5,
    title: "Thiên nhiên và Đất nước",
    subtitle: "Thiên nhiên, đất nước và môi trường",
    description:
      "Khám phá thiên nhiên kỳ thú, đất nước tươi đẹp và bảo vệ môi trường.",
    colorClass: "bg-gradient-to-r from-green-500 to-lime-600",
    textClass: "text-green-600",
    totalLessons: 17,
    duration: "3 giờ",
    level: "Cơ bản",
    progress: 0,
    topics: [
      {
        id: 501,
        courseId: 5,
        title: "Thiên nhiên kỳ thú",
        subtitle: "Động vật, thực vật",
        lessonsCount: 5,
      },
      {
        id: 502,
        courseId: 5,
        title: "Đất nước tươi đẹp",
        subtitle: "Địa danh Việt Nam",
        lessonsCount: 4,
      },
      {
        id: 503,
        courseId: 5,
        title: "Uống nước nhớ nguồn",
        subtitle: "Truyền thống văn hóa",
        lessonsCount: 4,
      },
      {
        id: 504,
        courseId: 5,
        title: "Trái đất xanh",
        subtitle: "Bảo vệ môi trường",
        lessonsCount: 4,
      },
    ],
  },
];

// Generate steps for a self-learn lesson with all step types from Excel
const generateStepsForSelfLearnLesson = (
  lessonId: number,
  lessonOrder: number,
): BaseStepItem[] => {
  const steps: BaseStepItem[] = [];
  let stepOrder = 1;

  // Get vocabulary words for this lesson
  const startIdx = (lessonOrder * 2) % vocabularyWords.length;
  const vocabCount = 3;

  // === STEP 1: Vocabulary - Quan sát video và làm ký hiệu theo mẫu ===
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

  // === STEP 2: Sentence - Cấu trúc câu ===
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

  // === STEP 3: Match Video to Text - Nối kí hiệu với từ (2.5) ===
  const matchPairs = vocabularyWords
    .slice(startIdx, startIdx + 4)
    .map((v, idx) => ({
      id: idx + 1,
      videoUrl: v.videoUrl,
      matchText: v.word,
    }));
  steps.push({
    id: lessonId * 100 + stepOrder,
    title: "Nối kí hiệu với từ tương ứng",
    type: "match-video-to-text" as StepType,
    order: stepOrder,
    completed: false,
    matchPairs: matchPairs,
  });
  stepOrder++;

  // === STEP 4: Quiz Video to Text - Xem kí hiệu chọn từ (2.4) ===
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

  // === STEP 5: Flip Card - Lật mở ô cửa (3.4) ===
  const flipCards = vocabularyWords
    .slice(startIdx, startIdx + 4)
    .map((v, idx) => ({
      id: idx + 1,
      videoUrl: v.videoUrl,
      matchText: v.word,
    }));
  steps.push({
    id: lessonId * 100 + stepOrder,
    title: "Lật mở ô cửa",
    type: "flip-card" as StepType,
    order: stepOrder,
    completed: false,
    flipCards: flipCards,
  });
  stepOrder++;

  // === STEP 6: True/False - Đúng sai (3.5) ===
  const trueFalseVocab =
    vocabularyWords[(startIdx + 2) % vocabularyWords.length];
  const isTrue = lessonOrder % 2 === 0; // Alternate between true/false
  steps.push({
    id: lessonId * 100 + stepOrder,
    title: "Kiểm tra: Đúng hay Sai?",
    type: "true-false" as StepType,
    order: stepOrder,
    completed: false,
    statement: isTrue ? trueFalseVocab.word : wrongOptions[0]?.word || "Khác",
    statementVideoUrl: trueFalseVocab.videoUrl,
    isTrue: isTrue,
  });
  stepOrder++;

  // === STEP 7: Quiz Input - Tự gõ đáp án ===
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

// Generate lessons for a topic
const generateLessonsForTopic = (topic: SelfLearnTopic): SelfLearnLesson[] => {
  const lessons: SelfLearnLesson[] = [];

  for (let i = 0; i < topic.lessonsCount; i++) {
    const lessonId = topic.id * 10 + i + 1;
    lessons.push({
      id: lessonId,
      topicId: topic.id,
      courseId: topic.courseId,
      title: `Bài ${i + 1}: ${topic.title}`,
      description: `Học ${topic.subtitle.toLowerCase()} - phần ${i + 1}`,
      duration: "10 phút",
      order: i + 1,
      completed: i === 0,
      stepsCount: 6,
    });
  }

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

// Get topics by course ID
export const getTopicsByCourseId = (courseId: number): SelfLearnTopic[] => {
  const course = selfLearnCourses.find((c) => c.id === courseId);
  return course?.topics || [];
};

// Get topic by ID
export const getTopicById = (topicId: number): SelfLearnTopic | undefined => {
  for (const course of selfLearnCourses) {
    const topic = course.topics.find((t) => t.id === topicId);
    if (topic) return topic;
  }
  return undefined;
};

// Get lessons by topic ID
export const getLessonsByTopicId = (topicId: number): SelfLearnLesson[] => {
  if (!lessonsCache[topicId]) {
    const topic = getTopicById(topicId);
    if (topic) {
      lessonsCache[topicId] = generateLessonsForTopic(topic);
    } else {
      lessonsCache[topicId] = [];
    }
  }
  return lessonsCache[topicId];
};

// Get lesson by ID
export const getSelfLearnLessonById = (
  lessonId: number,
): SelfLearnLesson | undefined => {
  const topicId = Math.floor(lessonId / 10);
  const lessons = getLessonsByTopicId(topicId);
  return lessons.find((l) => l.id === lessonId);
};

// Get steps by lesson ID
export const getSelfLearnStepsByLessonId = (
  lessonId: number,
): BaseStepItem[] => {
  if (!stepsCache[lessonId]) {
    const lessonOrder = (lessonId % 10) - 1;
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
