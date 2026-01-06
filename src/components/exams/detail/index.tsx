"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, Save, X, Calendar, Clock, Users, FileText, BookOpen, CheckCircle2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { mockExams, ExamItem, examStatusConfig } from "@/src/data";
import { getClassById, mockClasses } from "@/src/data/classesData";
import { ConfirmModal } from "@/src/components/common/ConfirmModal";

export function ExamManagementDetail() {
  const params = useParams();
  const router = useRouter();
  
  const id = Number(params.id);
  const [exam, setExam] = useState<ExamItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ExamItem>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const found = mockExams.find(e => e.id === id);
    if (found) {
      setExam(found);
      setEditForm({ ...found });
    }
  }, [id]);

  const getClassName = (classId: number): string => {
    const classItem = getClassById(classId);
    return classItem?.name || 'Không xác định';
  };

  const handleSave = () => {
    if (exam && editForm) {
      setExam({ ...exam, ...editForm } as ExamItem);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    router.push("/exams");
  };

  if (!exam) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài kiểm tra</h2>
        <button 
          onClick={() => router.push("/exams")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const statusInfo = examStatusConfig[exam.status];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button 
          onClick={() => router.push("/exams")}
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
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <FileText size={32} className="text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{exam.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                    {statusInfo.label}
                  </span>
                  {exam.type && (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                      {exam.type}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-6 text-white text-center">
              <div>
                <p className="text-3xl font-bold">{exam.questions}</p>
                <p className="text-xs text-white/80">Câu hỏi</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{exam.students}</p>
                <p className="text-xs text-white/80">Học sinh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Tên bài kiểm tra</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.title || ""} 
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg font-medium" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 text-lg font-bold">{exam.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Lớp học</label>
              {isEditing ? (
                <select 
                  value={editForm.classId || ""} 
                  onChange={(e) => setEditForm({ ...editForm, classId: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  {mockClasses.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <BookOpen size={18} className="text-gray-400" />
                  {getClassName(exam.classId)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Loại bài thi</label>
              {isEditing ? (
                <select 
                  value={editForm.type || ""} 
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  <option value="Định kỳ">Định kỳ</option>
                  <option value="Giữa kỳ">Giữa kỳ</option>
                  <option value="Cuối kỳ">Cuối kỳ</option>
                  <option value="Thực hành">Thực hành</option>
                  <option value="Đầu vào">Đầu vào</option>
                  <option value="Online">Online</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-700">
                    {exam.type}
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Ngày thi</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                {exam.date}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Giờ thi</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Clock size={18} className="text-gray-400" />
                {exam.time}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Thời lượng</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.duration || ""} 
                  onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{exam.duration}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Số câu hỏi</label>
              {isEditing ? (
                <input 
                  type="number" 
                  value={editForm.questions || ""} 
                  onChange={(e) => setEditForm({ ...editForm, questions: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <FileText size={18} className="text-gray-400" />
                  {exam.questions} câu
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Điểm đạt tối thiểu</label>
              {isEditing ? (
                <input 
                  type="number" 
                  value={editForm.passingScore || ""} 
                  onChange={(e) => setEditForm({ ...editForm, passingScore: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-gray-400" />
                  {exam.passingScore}%
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Số học sinh</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Users size={18} className="text-gray-400" />
                {exam.students} học sinh
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Trạng thái</label>
              {isEditing ? (
                <select 
                  value={editForm.status || ""} 
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as ExamItem['status'] })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="ongoing">Đang diễn ra</option>
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

            {(exam.description || isEditing) && (
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
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{exam.description}</p>
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
                  setEditForm({ ...exam });
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
        message={`Bạn có chắc chắn muốn xóa bài kiểm tra "${exam.title}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
