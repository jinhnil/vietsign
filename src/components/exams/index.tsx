"use client";

import { ClipboardCheck, Plus, Calendar, Clock, Users, FileText, ChevronRight, Filter, BookOpen } from "lucide-react";
import { useState } from "react";
import { mockExams, examStatusConfig } from "@/src/data";
import { getClassById } from "@/src/data/classesData";
import { Pagination, usePagination } from "@/src/components/common/Pagination";

const ITEMS_PER_PAGE = 8;

export function ExamsManagement() {
  const [filterStatus, setFilterStatus] = useState("all");

  // Helper function để lấy tên lớp từ classId
  const getClassName = (classId: number): string => {
    const classItem = getClassById(classId);
    return classItem?.name || 'Không xác định';
  };

  const filteredExams = mockExams.filter(exam => filterStatus === "all" || exam.status === filterStatus);
  const { currentPage, totalPages, paginatedItems, setCurrentPage } = usePagination(filteredExams, ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-primary-600" />
            Quản lý kiểm tra
          </h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý các bài kiểm tra</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium shadow-sm">
          <Plus size={20} /> Tạo bài kiểm tra
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-400" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white">
            <option value="all">Tất cả</option>
            <option value="upcoming">Sắp diễn ra</option>
            <option value="completed">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedItems.map((exam) => {
          const className = getClassName(exam.classId);
          
          return (
            <div key={exam.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${examStatusConfig[exam.status].color}`}>{examStatusConfig[exam.status].label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <BookOpen size={14} className="text-gray-400" />
                      <span>{className}</span>
                      {exam.type && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">{exam.type}</span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1.5"><Calendar size={16} className="text-gray-400" />{exam.date}</div>
                      <div className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" />{exam.time} - {exam.duration}</div>
                      <div className="flex items-center gap-1.5"><Users size={16} className="text-gray-400" />{exam.students} học sinh</div>
                      <div className="flex items-center gap-1.5"><FileText size={16} className="text-gray-400" />{exam.questions} câu hỏi</div>
                    </div>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100">
                  Chi tiết <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExams.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={mockExams.length}
            filteredItems={filteredExams.length}
            itemName="bài kiểm tra"
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
