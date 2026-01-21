"use client";

import { FileEdit, Clock, FileText, CheckCircle, ChevronRight, Timer, HelpCircle } from "lucide-react";

const mockExams = [
  { id: 1, title: "Kiểm tra giữa kỳ - Ngôn ngữ cơ bản", class: "Lớp A1", date: "20/01/2025", time: "09:00", duration: "60 phút", questions: 30, status: "upcoming" },
  { id: 2, title: "Kiểm tra cuối tuần", class: "Lớp A1", date: "18/01/2025", time: "14:00", duration: "30 phút", questions: 15, status: "available" },
  { id: 3, title: "Kiểm tra định kỳ", class: "Lớp A1", date: "10/01/2025", time: "09:00", duration: "45 phút", questions: 20, status: "completed", score: 8.5 },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  upcoming: { label: "Sắp diễn ra", color: "bg-blue-100 text-blue-800", icon: <Clock size={16} /> },
  available: { label: "Có thể làm", color: "bg-green-100 text-green-800", icon: <CheckCircle size={16} /> },
  completed: { label: "Đã hoàn thành", color: "bg-gray-100 text-gray-600", icon: <CheckCircle size={16} /> },
};

export function TakeExamManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <FileEdit className="w-8 h-8 text-primary-600" />
          Làm bài kiểm tra
        </h1>
        <p className="text-gray-600 mt-1">Các bài kiểm tra của bạn</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"><CheckCircle className="w-6 h-6 text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{mockExams.filter(e => e.status === "available").length}</p><p className="text-sm text-gray-500">Có thể làm</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center"><Clock className="w-6 h-6 text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{mockExams.filter(e => e.status === "upcoming").length}</p><p className="text-sm text-gray-500">Sắp diễn ra</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center"><FileText className="w-6 h-6 text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{mockExams.filter(e => e.status === "completed").length}</p><p className="text-sm text-gray-500">Đã hoàn thành</p></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {mockExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig[exam.status].color}`}>
                      {statusConfig[exam.status].icon} {statusConfig[exam.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{exam.class}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" />{exam.date} - {exam.time}</div>
                    <div className="flex items-center gap-1.5"><Timer size={16} className="text-gray-400" />{exam.duration}</div>
                    <div className="flex items-center gap-1.5"><HelpCircle size={16} className="text-gray-400" />{exam.questions} câu hỏi</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {exam.status === "completed" && exam.score && (
                  <div className="text-center"><p className="text-2xl font-bold text-primary-600">{exam.score}</p><p className="text-xs text-gray-500">Điểm</p></div>
                )}
                <button className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl ${
                  exam.status === "available" 
                    ? "bg-primary-600 text-white hover:bg-primary-700" 
                    : "text-primary-600 bg-primary-50 hover:bg-primary-100"
                }`}>
                  {exam.status === "available" ? "Bắt đầu làm" : exam.status === "upcoming" ? "Xem chi tiết" : "Xem kết quả"}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
