"use client";

import { BookOpenCheck, Search, Plus, Users, Calendar, Clock, User, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";

const mockClasses = [
  { id: 1, name: "Lớp Ký hiệu cơ bản A1", teacher: "Trần Thị Lan", students: 25, maxStudents: 30, schedule: "Thứ 2, 4, 6 - 9:00", startDate: "15/01/2025", endDate: "15/04/2025", status: "ongoing", facility: "Cơ sở Hà Nội" },
  { id: 2, name: "Lớp Ký hiệu nâng cao B2", teacher: "Nguyễn Văn Minh", students: 18, maxStudents: 20, schedule: "Thứ 3, 5 - 14:00", startDate: "01/02/2025", endDate: "01/05/2025", status: "ongoing", facility: "Cơ sở HCM" },
  { id: 3, name: "Lớp Ký hiệu giao tiếp C1", teacher: "Lê Thị Hương", students: 0, maxStudents: 25, schedule: "Thứ 2, 4 - 18:00", startDate: "01/03/2025", endDate: "01/06/2025", status: "upcoming", facility: "Cơ sở Đà Nẵng" },
  { id: 4, name: "Lớp Ký hiệu cơ bản A2", teacher: "Phạm Văn Đức", students: 28, maxStudents: 30, schedule: "Thứ 3, 5, 7 - 10:00", startDate: "01/10/2024", endDate: "01/01/2025", status: "completed", facility: "Cơ sở Hà Nội" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  ongoing: { label: "Đang diễn ra", color: "bg-green-100 text-green-800" },
  upcoming: { label: "Sắp diễn ra", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Đã hoàn thành", color: "bg-gray-100 text-gray-600" },
};

export function ClassesManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredClasses = mockClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || cls.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || cls.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpenCheck className="w-8 h-8 text-primary-600" />
            Quản lý lớp học
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các lớp học trong hệ thống</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm">
          <Plus size={20} /> Tạo lớp học mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Tìm kiếm lớp học hoặc giáo viên..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white">
              <option value="all">Tất cả trạng thái</option>
              <option value="ongoing">Đang diễn ra</option>
              <option value="upcoming">Sắp diễn ra</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl">{cls.name.split(' ').pop()}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig[cls.status].color}`}>{statusConfig[cls.status].label}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{cls.facility}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5"><User size={16} className="text-gray-400" /><span>GV: {cls.teacher}</span></div>
                      <div className="flex items-center gap-1.5"><Users size={16} className="text-gray-400" /><span>{cls.students}/{cls.maxStudents} học sinh</span></div>
                      <div className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" /><span>{cls.schedule}</span></div>
                      <div className="flex items-center gap-1.5"><Calendar size={16} className="text-gray-400" /><span>{cls.startDate} - {cls.endDate}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                      <circle cx="32" cy="32" r="28" stroke="#10B981" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={`${(cls.students / cls.maxStudents) * 175.9} 175.9`} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{Math.round((cls.students / cls.maxStudents) * 100)}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Sĩ số</p>
                </div>
                <button className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100">Chi tiết <ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <BookOpenCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy lớp học</h3>
          <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}
    </div>
  );
}
