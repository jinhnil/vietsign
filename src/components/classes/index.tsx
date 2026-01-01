"use client";

import { BookOpenCheck, Search, Plus, Users, Calendar, Clock, User, ChevronRight, Filter, Building } from "lucide-react";
import { useState } from "react";
import { mockClasses, statusConfig } from "@/src/data";
import { getUserById } from "@/src/data/usersData";
import { getFacilityById } from "@/src/data/facilitiesData";
import { Pagination, usePagination } from "@/src/components/common/Pagination";
import { Modal } from "@/src/components/common/Modal";

const ITEMS_PER_PAGE = 6;

import { removeVietnameseTones } from "@/src/utils/text";

import { mockUsers } from "@/src/data/usersData";
import { mockFacilities } from "@/src/data/facilitiesData";

export function ClassesManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lấy danh sách giáo viên
  const teachers = mockUsers.filter(user => user.role === 'TEACHER');

  // Helper functions để lấy tên từ ID
  const getTeacherName = (teacherId: number): string => {
    const teacher = getUserById(teacherId);
    return teacher?.name || 'Không xác định';
  };

  const getFacilityName = (facilityId: number | null): string => {
    if (facilityId === null) return 'Online';
    const facility = getFacilityById(facilityId);
    return facility?.name || 'Không xác định';
  };

  const filteredClasses = mockClasses.filter(cls => {
    const teacherName = getTeacherName(cls.teacherId);
    const facilityName = getFacilityName(cls.facilityId);
    const normalizedQuery = removeVietnameseTones(searchQuery);
    const matchesSearch = removeVietnameseTones(cls.name).includes(normalizedQuery) || 
                          removeVietnameseTones(teacherName).includes(normalizedQuery) ||
                          removeVietnameseTones(facilityName).includes(normalizedQuery);
    const matchesStatus = filterStatus === "all" || cls.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const { currentPage, totalPages, paginatedItems, paddedItems, setCurrentPage } = usePagination(filteredClasses, ITEMS_PER_PAGE);

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
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} /> Tạo lớp học mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Tìm kiếm lớp học, giáo viên hoặc cơ sở..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
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
        {/* ... (phần render list giữ nguyên) */}
        {paddedItems.map((cls, index) => {
          if (!cls) return (
            <div key={`empty-${index}`} className="h-[162px]" aria-hidden="true" />
          );

          const teacherName = getTeacherName(cls.teacherId);
          const facilityName = getFacilityName(cls.facilityId);
          
          return (
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
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Building size={14} className="text-gray-400" />
                        <span>{facilityName}</span>
                        {cls.level && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">{cls.level}</span>
                          </>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5"><User size={16} className="text-gray-400" /><span>GV: {teacherName}</span></div>
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
          );
        })}
      </div>

      {filteredClasses.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <BookOpenCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy lớp học</h3>
          <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={mockClasses.length}
            filteredItems={filteredClasses.length}
            itemName="lớp học"
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tạo lớp học mới">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Tên lớp học <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Nhập tên lớp học" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Giáo viên phụ trách <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white" required>
                <option value="">Chọn giáo viên</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Cấp độ <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white" required>
                <option value="Cơ bản">Cơ bản</option>
                <option value="Nâng cao">Nâng cao</option>
                <option value="Chuyên sâu">Chuyên sâu</option>
                <option value="Chuyên ngành">Chuyên ngành</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Sĩ số tối đa <span className="text-red-500">*</span></label>
              <input type="number" placeholder="30" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Cơ sở đào tạo <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white" required>
                <option value="">Học Online</option>
                {mockFacilities.map(facility => (
                  <option key={facility.id} value={facility.id}>{facility.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Lịch học <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Ví dụ: Thứ 2, 4, 6 - 18:00" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Hủy</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm">Tạo lớp học</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

