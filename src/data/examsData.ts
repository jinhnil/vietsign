export interface ExamItem {
  id: number;
  title: string;
  class: string;
  date: string;
  time: string;
  duration: string;
  questions: number;
  students: number;
  status: string;
  type?: string;
  passingScore?: number;
  description?: string;
}

export const mockExams: ExamItem[] = [
  { id: 1, title: "Kiểm tra giữa kỳ - Lớp A1", class: "Lớp A1", date: "15/01/2025", time: "09:00", duration: "60 phút", questions: 30, students: 25, status: "upcoming", type: "Giữa kỳ", passingScore: 60, description: "Bài kiểm tra đánh giá kết quả học tập giữa kỳ" },
  { id: 2, title: "Kiểm tra cuối kỳ - Lớp B2", class: "Lớp B2", date: "20/01/2025", time: "14:00", duration: "90 phút", questions: 50, students: 18, status: "upcoming", type: "Cuối kỳ", passingScore: 65, description: "Bài kiểm tra cuối kỳ toàn diện" },
  { id: 3, title: "Kiểm tra định kỳ - Lớp A1", class: "Lớp A1", date: "10/01/2025", time: "09:00", duration: "45 phút", questions: 20, students: 25, status: "completed", type: "Định kỳ", passingScore: 50, description: "Bài kiểm tra định kỳ hàng tháng" },
  { id: 4, title: "Kiểm tra nhanh - Lớp K1", class: "Lớp K1", date: "12/01/2025", time: "10:00", duration: "30 phút", questions: 15, students: 15, status: "completed", type: "Nhanh", passingScore: 50, description: "Bài kiểm tra nhanh cho trẻ em" },
  { id: 5, title: "Kiểm tra giữa kỳ - Lớp B2", class: "Lớp B2", date: "05/01/2025", time: "14:00", duration: "60 phút", questions: 35, students: 18, status: "completed", type: "Giữa kỳ", passingScore: 60, description: "Bài kiểm tra giữa kỳ nâng cao" },
  { id: 6, title: "Kiểm tra cuối kỳ - Lớp A1", class: "Lớp A1", date: "25/01/2025", time: "09:00", duration: "90 phút", questions: 45, students: 25, status: "upcoming", type: "Cuối kỳ", passingScore: 65, description: "Bài kiểm tra cuối kỳ cơ bản" },
  { id: 7, title: "Kiểm tra đầu vào - Lớp C1", class: "Lớp C1", date: "28/02/2025", time: "08:00", duration: "45 phút", questions: 25, students: 0, status: "upcoming", type: "Đầu vào", passingScore: 70, description: "Bài kiểm tra phân loại đầu vào" },
  { id: 8, title: "Kiểm tra thực hành - Lớp M1", class: "Lớp M1", date: "20/02/2025", time: "14:00", duration: "120 phút", questions: 20, students: 12, status: "upcoming", type: "Thực hành", passingScore: 75, description: "Bài kiểm tra kỹ năng thực hành y tế" },
  { id: 9, title: "Kiểm tra online - Lớp O1", class: "Lớp O1", date: "18/01/2025", time: "20:00", duration: "45 phút", questions: 25, students: 35, status: "upcoming", type: "Online", passingScore: 55, description: "Bài kiểm tra trực tuyến" },
  { id: 10, title: "Kiểm tra cuối kỳ - Lớp A2", class: "Lớp A2", date: "28/12/2024", time: "09:00", duration: "90 phút", questions: 50, students: 28, status: "completed", type: "Cuối kỳ", passingScore: 65, description: "Bài kiểm tra cuối kỳ đã hoàn thành" },
  { id: 11, title: "Kiểm tra giữa kỳ - Lớp K1", class: "Lớp K1", date: "22/01/2025", time: "10:00", duration: "40 phút", questions: 20, students: 15, status: "upcoming", type: "Giữa kỳ", passingScore: 50, description: "Bài kiểm tra giữa kỳ trẻ em" },
  { id: 12, title: "Kiểm tra nâng cao - Lớp E1", class: "Lớp E1", date: "15/02/2025", time: "19:00", duration: "75 phút", questions: 40, students: 10, status: "upcoming", type: "Nâng cao", passingScore: 70, description: "Bài kiểm tra ký hiệu doanh nghiệp" },
  { id: 13, title: "Kiểm tra định kỳ - Lớp A3", class: "Lớp A3", date: "17/01/2025", time: "09:00", duration: "45 phút", questions: 20, students: 22, status: "upcoming", type: "Định kỳ", passingScore: 50, description: "Bài kiểm tra định kỳ tháng 1" },
  { id: 14, title: "Kiểm tra thực hành - Lớp F1", class: "Lớp F1", date: "26/01/2025", time: "10:00", duration: "60 phút", questions: 15, students: 8, status: "upcoming", type: "Thực hành", passingScore: 60, description: "Bài kiểm tra gia đình thực hành" },
  { id: 15, title: "Kiểm tra cuối khóa - Lớp I1", class: "Lớp I1", date: "15/02/2025", time: "09:00", duration: "60 phút", questions: 35, students: 10, status: "upcoming", type: "Cuối khóa", passingScore: 70, description: "Bài kiểm tra cuối khóa cấp tốc" },
  { id: 16, title: "Kiểm tra giữa kỳ - Lớp O2", class: "Lớp O2", date: "10/02/2025", time: "20:00", duration: "50 phút", questions: 30, students: 28, status: "upcoming", type: "Giữa kỳ", passingScore: 55, description: "Bài kiểm tra giữa kỳ online nâng cao" },
  { id: 17, title: "Kiểm tra thực hành - Lớp T1", class: "Lớp T1", date: "15/03/2025", time: "18:00", duration: "90 phút", questions: 25, students: 20, status: "upcoming", type: "Thực hành", passingScore: 65, description: "Bài kiểm tra thực hành du lịch" },
  { id: 18, title: "Kiểm tra chuyên ngành - Lớp L1", class: "Lớp L1", date: "20/04/2025", time: "18:00", duration: "120 phút", questions: 40, students: 8, status: "upcoming", type: "Chuyên ngành", passingScore: 75, description: "Bài kiểm tra ký hiệu pháp luật" },
  { id: 19, title: "Kiểm tra cuối kỳ - Lớp B1", class: "Lớp B1", date: "30/01/2025", time: "16:00", duration: "90 phút", questions: 50, students: 14, status: "completed", type: "Cuối kỳ", passingScore: 65, description: "Bài kiểm tra cuối kỳ nâng cao" },
  { id: 20, title: "Kiểm tra định kỳ - Lớp A1", class: "Lớp A1", date: "05/02/2025", time: "09:00", duration: "45 phút", questions: 20, students: 25, status: "upcoming", type: "Định kỳ", passingScore: 50, description: "Bài kiểm tra định kỳ tháng 2" },
];

export const examStatusConfig: Record<string, { label: string; color: string }> = {
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
