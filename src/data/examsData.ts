// Exams management data
// Sử dụng ID để liên kết với các bảng khác

import { getClassById } from "./classesData";

export type ExamType = "practice" | "multiple_choice";

export interface ExamItem {
  id: number;
  title: string;
  classId: number; // ID lớp học (thay vì tên)
  date: string;
  time: string;
  duration: string;
  questions: number;
  students: number;
  status: "upcoming" | "ongoing" | "completed";
  type: string;
  examType: ExamType; // Loại bài kiểm tra: Thực hành hoặc Trắc nghiệm
  passingScore?: number;
  description?: string;
  createdById?: number; // ID người tạo bài kiểm tra
  questionIds?: number[]; // Danh sách ID câu hỏi (nếu chọn theo câu hỏi lẻ)
  questionSetIds?: number[]; // Danh sách ID bộ câu hỏi (nếu chọn theo bộ)
}

export const mockExams: ExamItem[] = [
  {
    id: 1,
    title: "Kiểm tra giữa kỳ - Lớp A1",
    classId: 1,
    date: "15/01/2025",
    time: "09:00",
    duration: "60 phút",
    questions: 30,
    students: 25,
    status: "upcoming",
    type: "Giữa kỳ",
    examType: "multiple_choice",
    passingScore: 60,
    description: "Bài kiểm tra đánh giá kết quả học tập giữa kỳ",
    questionSetIds: [1],
  },
  {
    id: 2,
    title: "Kiểm tra cuối kỳ - Lớp B2",
    classId: 2,
    date: "20/01/2025",
    time: "14:00",
    duration: "90 phút",
    questions: 50,
    students: 18,
    status: "upcoming",
    type: "Cuối kỳ",
    examType: "multiple_choice",
    passingScore: 65,
    description: "Bài kiểm tra cuối kỳ toàn diện",
    questionSetIds: [2, 3],
  },
  {
    id: 3,
    title: "Kiểm tra định kỳ - Lớp A1",
    classId: 1,
    date: "10/01/2025",
    time: "09:00",
    duration: "45 phút",
    questions: 20,
    students: 25,
    status: "completed",
    type: "Định kỳ",
    examType: "multiple_choice",
    passingScore: 50,
    description: "Bài kiểm tra định kỳ hàng tháng",
    questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: 4,
    title: "Kiểm tra nhanh - Lớp K1",
    classId: 5,
    date: "12/01/2025",
    time: "10:00",
    duration: "30 phút",
    questions: 15,
    students: 15,
    status: "completed",
    type: "Nhanh",
    examType: "multiple_choice",
    passingScore: 50,
    description: "Bài kiểm tra nhanh cho trẻ em",
    questionIds: [11, 12, 13, 14, 15],
  },
  {
    id: 5,
    title: "Kiểm tra giữa kỳ - Lớp B2",
    classId: 2,
    date: "05/01/2025",
    time: "14:00",
    duration: "60 phút",
    questions: 35,
    students: 18,
    status: "completed",
    type: "Giữa kỳ",
    examType: "multiple_choice",
    passingScore: 60,
    description: "Bài kiểm tra giữa kỳ nâng cao",
    questionSetIds: [4],
  },
  {
    id: 6,
    title: "Kiểm tra cuối kỳ - Lớp A1",
    classId: 1,
    date: "25/01/2025",
    time: "09:00",
    duration: "90 phút",
    questions: 45,
    students: 25,
    status: "upcoming",
    type: "Cuối kỳ",
    examType: "multiple_choice",
    passingScore: 65,
    description: "Bài kiểm tra cuối kỳ cơ bản",
    questionSetIds: [5],
  },
  {
    id: 7,
    title: "Kiểm tra đầu vào - Lớp C1",
    classId: 3,
    date: "28/02/2025",
    time: "08:00",
    duration: "45 phút",
    questions: 25,
    students: 0,
    status: "upcoming",
    type: "Đầu vào",
    examType: "multiple_choice",
    passingScore: 70,
    description: "Bài kiểm tra phân loại đầu vào",
    questionIds: [20, 21, 22, 23, 24, 25],
  },
  {
    id: 8,
    title: "Kiểm tra thực hành - Lớp M1",
    classId: 6,
    date: "20/02/2025",
    time: "14:00",
    duration: "120 phút",
    questions: 20,
    students: 12,
    status: "upcoming",
    type: "Thực hành",
    examType: "practice",
    passingScore: 75,
    description: "Bài kiểm tra kỹ năng thực hành y tế",
    questionSetIds: [6],
  },
  {
    id: 9,
    title: "Kiểm tra online - Lớp O1",
    classId: 11,
    date: "18/01/2025",
    time: "20:00",
    duration: "45 phút",
    questions: 25,
    students: 35,
    status: "upcoming",
    type: "Online",
    examType: "multiple_choice",
    passingScore: 55,
    description: "Bài kiểm tra trực tuyến",
    questionSetIds: [7],
  },
  {
    id: 10,
    title: "Kiểm tra cuối kỳ - Lớp A2",
    classId: 4,
    date: "28/12/2024",
    time: "09:00",
    duration: "90 phút",
    questions: 50,
    students: 28,
    status: "completed",
    type: "Cuối kỳ",
    examType: "multiple_choice",
    passingScore: 65,
    description: "Bài kiểm tra cuối kỳ đã hoàn thành",
    questionSetIds: [8, 9],
  },
  {
    id: 11,
    title: "Kiểm tra giữa kỳ - Lớp K1",
    classId: 5,
    date: "22/01/2025",
    time: "10:00",
    duration: "40 phút",
    questions: 20,
    students: 15,
    status: "upcoming",
    type: "Giữa kỳ",
    examType: "multiple_choice",
    passingScore: 50,
    description: "Bài kiểm tra giữa kỳ trẻ em",
    questionSetIds: [10],
  },
  {
    id: 12,
    title: "Kiểm tra nâng cao - Lớp E1",
    classId: 7,
    date: "15/02/2025",
    time: "19:00",
    duration: "75 phút",
    questions: 40,
    students: 10,
    status: "upcoming",
    type: "Nâng cao",
    examType: "multiple_choice",
    passingScore: 70,
    description: "Bài kiểm tra ký hiệu doanh nghiệp",
    questionSetIds: [11],
  },
  {
    id: 13,
    title: "Kiểm tra định kỳ - Lớp A3",
    classId: 8,
    date: "17/01/2025",
    time: "09:00",
    duration: "45 phút",
    questions: 20,
    students: 22,
    status: "upcoming",
    type: "Định kỳ",
    examType: "multiple_choice",
    passingScore: 50,
    description: "Bài kiểm tra định kỳ tháng 1",
    questionIds: [30, 31, 32, 33, 34, 35],
  },
  {
    id: 14,
    title: "Kiểm tra thực hành - Lớp F1",
    classId: 14,
    date: "26/01/2025",
    time: "10:00",
    duration: "60 phút",
    questions: 15,
    students: 8,
    status: "upcoming",
    type: "Thực hành",
    examType: "practice",
    passingScore: 60,
    description: "Bài kiểm tra gia đình thực hành",
    questionSetIds: [12],
  },
  {
    id: 15,
    title: "Kiểm tra cuối khóa - Lớp I1",
    classId: 15,
    date: "15/02/2025",
    time: "09:00",
    duration: "60 phút",
    questions: 35,
    students: 10,
    status: "upcoming",
    type: "Cuối khóa",
    examType: "multiple_choice",
    passingScore: 70,
    description: "Bài kiểm tra cuối khóa cấp tốc",
    questionSetIds: [13],
  },
  {
    id: 16,
    title: "Kiểm tra giữa kỳ - Lớp O2",
    classId: 12,
    date: "10/02/2025",
    time: "20:00",
    duration: "50 phút",
    questions: 30,
    students: 28,
    status: "upcoming",
    type: "Giữa kỳ",
    examType: "multiple_choice",
    passingScore: 55,
    description: "Bài kiểm tra giữa kỳ online nâng cao",
    questionSetIds: [14],
  },
  {
    id: 17,
    title: "Kiểm tra thực hành - Lớp T1",
    classId: 17,
    date: "15/03/2025",
    time: "18:00",
    duration: "90 phút",
    questions: 25,
    students: 20,
    status: "upcoming",
    type: "Thực hành",
    examType: "practice",
    passingScore: 65,
    description: "Bài kiểm tra thực hành du lịch",
    questionSetIds: [15],
  },
  {
    id: 18,
    title: "Kiểm tra chuyên ngành - Lớp L1",
    classId: 18,
    date: "20/04/2025",
    time: "18:00",
    duration: "120 phút",
    questions: 40,
    students: 8,
    status: "upcoming",
    type: "Chuyên ngành",
    examType: "multiple_choice",
    passingScore: 75,
    description: "Bài kiểm tra ký hiệu pháp luật",
    questionSetIds: [16],
  },
  {
    id: 19,
    title: "Kiểm tra cuối kỳ - Lớp B1",
    classId: 16,
    date: "30/01/2025",
    time: "16:00",
    duration: "90 phút",
    questions: 50,
    students: 14,
    status: "completed",
    type: "Cuối kỳ",
    examType: "multiple_choice",
    passingScore: 65,
    description: "Bài kiểm tra cuối kỳ nâng cao",
    questionSetIds: [17],
  },
  {
    id: 20,
    title: "Kiểm tra định kỳ - Lớp A1",
    classId: 1,
    date: "05/02/2025",
    time: "09:00",
    duration: "45 phút",
    questions: 20,
    students: 25,
    status: "upcoming",
    type: "Định kỳ",
    examType: "multiple_choice",
    passingScore: 50,
    description: "Bài kiểm tra định kỳ tháng 2",
    questionIds: [40, 41, 42, 43, 44, 45],
  },
  ...Array.from({ length: 50 }, (_, i) => {
    const id = i + 21;
    const classId = (i % 20) + 1;
    const examTypes = [
      "Giữa kỳ",
      "Cuối kỳ",
      "Định kỳ",
      "Thực hành",
      "Kiểm tra nhanh",
    ];
    const type = examTypes[i % examTypes.length];
    const statuses = ["upcoming", "completed", "upcoming", "ongoing"];
    const status = statuses[i % statuses.length] as
      | "upcoming"
      | "completed"
      | "ongoing";
    const examType: ExamType =
      type === "Thực hành" ? "practice" : "multiple_choice";

    return {
      id,
      title: `Bài kiểm tra ${type} #${id} - Lớp ${classId}`,
      classId,
      date: `${((i % 28) + 1).toString().padStart(2, "0")}/03/2025`,
      time: `${8 + (i % 10)}:00`,
      duration: `${30 + (i % 3) * 30} phút`,
      questions: 10 + (i % 5) * 10,
      students: 10 + (i % 20),
      status,
      type,
      examType,
      passingScore: 50 + (i % 5) * 5,
      description: `Mô tả cho bài kiểm tra ${type} số ${id}. Đây là bài kiểm tra định kỳ nhằm đánh giá năng lực của học sinh.`,
      questionSetIds: [Math.floor(Math.random() * 20) + 1],
    };
  }),
];

export const examStatusConfig: Record<
  string,
  { label: string; color: string }
> = {
  upcoming: { label: "Sắp diễn ra", color: "bg-blue-100 text-blue-800" },
  ongoing: { label: "Đang diễn ra", color: "bg-green-100 text-green-800" },
  completed: { label: "Đã hoàn thành", color: "bg-gray-100 text-gray-600" },
};

export const examTypes = [
  { id: "all", label: "Tất cả loại" },
  { id: "midterm", label: "Giữa kỳ" },
  { id: "final", label: "Cuối kỳ" },
  { id: "regular", label: "Định kỳ" },
  { id: "quick", label: "Nhanh" },
  { id: "practical", label: "Thực hành" },
  { id: "online", label: "Online" },
  { id: "entrance", label: "Đầu vào" },
];

// Helper functions
export function getExamById(id: number): ExamItem | undefined {
  return mockExams.find((e) => e.id === id);
}

export function getExamClassName(examId: number): string {
  const exam = getExamById(examId);
  if (!exam) return "Không xác định";
  const classItem = getClassById(exam.classId);
  return classItem?.name || "Không xác định";
}

export function getExamsByClass(classId: number): ExamItem[] {
  return mockExams.filter((e) => e.classId === classId);
}

export function getExamsByStatus(status: ExamItem["status"]): ExamItem[] {
  return mockExams.filter((e) => e.status === status);
}

export function getUpcomingExams(): ExamItem[] {
  return mockExams.filter((e) => e.status === "upcoming");
}

export function getCompletedExams(): ExamItem[] {
  return mockExams.filter((e) => e.status === "completed");
}
