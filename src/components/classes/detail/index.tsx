"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, Save, X, Users, Calendar, Clock, User, Building, BookOpen } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { mockClasses, ClassItem, statusConfig } from "@/src/data";
import { getUserById, mockUsers } from "@/src/data/usersData";
import { getOrganizationById as getFacilityById, mockOrganizations as mockFacilities } from "@/src/data/organizationsData";
import { ConfirmModal } from "@/src/components/common/ConfirmModal";

export function ClassManagementDetail() {
  const params = useParams();
  const router = useRouter();
  
  const id = Number(params.id);
  const [classItem, setClassItem] = useState<ClassItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ClassItem>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const teachers = mockUsers.filter(user => user.role === 'TEACHER');

  useEffect(() => {
    const found = mockClasses.find(c => c.id === id);
    if (found) {
      setClassItem(found);
      setEditForm({ ...found });
    }
  }, [id]);

  const getTeacherName = (teacherId: number): string => {
    const teacher = getUserById(teacherId);
    return teacher?.name || 'Không xác định';
  };

  const getFacilityName = (facilityId: number | null): string => {
    if (facilityId === null) return 'Online';
    const facility = getFacilityById(facilityId);
    return facility?.name || 'Không xác định';
  };

  const handleSave = () => {
    if (classItem && editForm) {
      setClassItem({ ...classItem, ...editForm } as ClassItem);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    router.push("/classes");
  };

  if (!classItem) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy lớp học</h2>
        <button 
          onClick={() => router.push("/classes")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const statusInfo = statusConfig[classItem.status];
  const progress = (classItem.students / classItem.maxStudents) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button 
          onClick={() => router.push("/classes")}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                {classItem.name.split(' ').pop()}
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{classItem.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                    {statusInfo.label}
                  </span>
                  {classItem.level && (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                      {classItem.level}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center text-white">
              <div className="w-20 h-20 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none" />
                  <circle cx="40" cy="40" r="36" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={`${progress * 2.26} 226`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">{Math.round(progress)}%</span>
              </div>
              <p className="text-xs text-white/80 mt-1">Sĩ số</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Tên lớp học</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.name || ""} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg font-medium" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 text-lg font-bold">{classItem.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Giáo viên phụ trách</label>
              {isEditing ? (
                <select 
                  value={editForm.teacherId || ""} 
                  onChange={(e) => setEditForm({ ...editForm, teacherId: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                  ))}
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <User size={18} className="text-gray-400" />
                  {getTeacherName(classItem.teacherId)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Cơ sở đào tạo</label>
              {isEditing ? (
                <select 
                  value={editForm.facilityId || ""} 
                  onChange={(e) => setEditForm({ ...editForm, facilityId: e.target.value ? Number(e.target.value) : null })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  <option value="">Học Online</option>
                  {mockFacilities.map(facility => (
                    <option key={facility.id} value={facility.id}>{facility.name}</option>
                  ))}
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <Building size={18} className="text-gray-400" />
                  {getFacilityName(classItem.facilityId)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Sĩ số hiện tại</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Users size={18} className="text-gray-400" />
                <span className="font-medium">{classItem.students}/{classItem.maxStudents}</span>
                <span className="text-gray-500">học sinh</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Sĩ số tối đa</label>
              {isEditing ? (
                <input 
                  type="number" 
                  value={editForm.maxStudents || ""} 
                  onChange={(e) => setEditForm({ ...editForm, maxStudents: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{classItem.maxStudents} học sinh</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Lịch học</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.schedule || ""} 
                  onChange={(e) => setEditForm({ ...editForm, schedule: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <Clock size={18} className="text-gray-400" />
                  {classItem.schedule}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Trạng thái</label>
              {isEditing ? (
                <select 
                  value={editForm.status || ""} 
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as ClassItem['status'] })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  <option value="ongoing">Đang diễn ra</option>
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Ngày bắt đầu</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                {classItem.startDate}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Ngày kết thúc</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                {classItem.endDate}
              </p>
            </div>

            {(classItem.description || isEditing) && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Mô tả</label>
                {isEditing ? (
                  <textarea 
                    value={editForm.description || ""} 
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none" 
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{classItem.description}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({ ...classItem });
                }}
                className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-colors font-medium flex items-center gap-2"
              >
                <X size={18} />
                Hủy
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
              >
                <Save size={18} />
                Lưu thay đổi
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-colors font-medium flex items-center gap-2"
              >
                <Edit size={18} />
                Chỉnh sửa
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
              >
                <Trash2 size={18} />
                Xóa
              </button>
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa lớp học "${classItem.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
