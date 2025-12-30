// Grading/Submissions data

export interface SubmissionItem {
  id: number;
  student: string;
  exam: string;
  submittedAt: string;
  status: 'pending' | 'graded';
  score: number | null;
  class?: string;
  duration?: string;
}

export const mockSubmissions: SubmissionItem[] = [
  { id: 1, student: "Nguyễn Văn A", exam: "Kiểm tra giữa kỳ", submittedAt: "15/01/2025 10:30", status: "pending", score: null, class: "Lớp A1", duration: "45 phút" },
  { id: 2, student: "Trần Thị B", exam: "Kiểm tra giữa kỳ", submittedAt: "15/01/2025 10:45", status: "pending", score: null, class: "Lớp A1", duration: "48 phút" },
  { id: 3, student: "Lê Văn C", exam: "Kiểm tra định kỳ", submittedAt: "10/01/2025 09:30", status: "graded", score: 8.5, class: "Lớp B2", duration: "42 phút" },
  { id: 4, student: "Phạm Thị D", exam: "Kiểm tra định kỳ", submittedAt: "10/01/2025 09:20", status: "graded", score: 9.0, class: "Lớp B2", duration: "40 phút" },
  { id: 5, student: "Hoàng Văn E", exam: "Kiểm tra cuối kỳ", submittedAt: "20/01/2025 14:00", status: "pending", score: null, class: "Lớp A2", duration: "55 phút" },
  { id: 6, student: "Vũ Thị F", exam: "Kiểm tra cuối kỳ", submittedAt: "20/01/2025 14:15", status: "pending", score: null, class: "Lớp A2", duration: "52 phút" },
  { id: 7, student: "Đặng Văn G", exam: "Kiểm tra nhanh", submittedAt: "12/01/2025 11:00", status: "graded", score: 7.5, class: "Lớp K1", duration: "25 phút" },
  { id: 8, student: "Bùi Thị H", exam: "Kiểm tra nhanh", submittedAt: "12/01/2025 11:10", status: "graded", score: 8.0, class: "Lớp K1", duration: "22 phút" },
];

export const submissionStatusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ chấm", color: "bg-amber-100 text-amber-800" },
  graded: { label: "Đã chấm", color: "bg-green-100 text-green-800" },
};
