"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Save,
  X,
  Users,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { learnCategories, LearnItem, Lesson } from "@/src/data/learnData";
import { ConfirmModal } from "@/src/components/common/ConfirmModal";

function getAllLearningItems(): LearnItem[] {
  return learnCategories.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      categoryTitle: category.title,
      colorClass: category.colorClass,
      textClass: category.textClass,
    }))
  );
}

export function LearningManagementDetail() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const [learning, setLearning] = useState<LearnItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<LearnItem>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(false);
      try {
        const allItems = getAllLearningItems();
        const found = allItems.find((l) => l.id === id);
        if (found) {
          setLearning(found);
          setEditForm({ ...found });
        }
      } catch (error) {
        console.error("Failed to load learning", error);
        const allItems = getAllLearningItems();
        const found = allItems.find((l) => l.id === id);
        if (found) {
          setLearning(found);
          setEditForm({ ...found });
        }
      }
    };
    initData();
  }, [id]);

  const handleSave = async () => {
    if (learning && editForm) {
      try {
        // Optimistic update
        const updatedItem = { ...learning, ...editForm } as LearnItem;
        setLearning(updatedItem);
        setIsEditing(false);
        // In real scenario, send update to API
      } catch (error) {
        console.error("Failed to update learning", error);
      }
    }
  };

  const handleDelete = async () => {
    if (learning) {
      try {
        // Delete logic here
        router.push("/learning-management");
      } catch (error) {
        console.error("Failed to delete learning", error);
      }
    }
  };

  if (!learning) {
    if (isLoading)
      return (
        <div className="flex justify-center py-20 text-gray-500">
          Đang tải...
        </div>
      );
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Không tìm thấy khóa học
        </h2>
        <button
          onClick={() => router.push("/learning-management")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const progress = learning.progress || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button
          onClick={() => router.push("/learning-management")}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Quay lại danh sách</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div
          className={`${learning.colorClass} p-8`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                {learning.title.split(" ").pop()?.substring(0, 1)}
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{learning.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                    {learning.categoryTitle}
                  </span>
                  {learning.level && (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                      {learning.level}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center text-white">
              <div className="w-20 h-20 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="white"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.26} 226`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
              <p className="text-xs text-white/80 mt-1">Tiến độ</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Tên khóa học
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.title || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg font-medium"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 text-lg font-bold">
                  {learning.title}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Mô tả
              </label>
              {isEditing ? (
                <textarea
                  value={editForm.description || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                  {learning.description || learning.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Chủ đề
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.categoryTitle || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, categoryTitle: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                  {learning.categoryTitle}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Cấp độ
              </label>
              {isEditing ? (
                <select
                  value={editForm.level || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, level: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  <option value="Cơ bản">Cơ bản</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Nâng cao">Nâng cao</option>
                  <option value="Chuyên sâu">Chuyên sâu</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                  {learning.level}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Số bài học
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={editForm.lessons || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      lessons: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <BookOpen size={18} className="text-gray-400" />
                  <span className="font-medium">{learning.lessons} bài</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Thời lượng
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.duration || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, duration: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <Clock size={18} className="text-gray-400" />
                  {learning.duration}
                </p>
              )}
            </div>

            {learning.students && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Số học viên
                </label>
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <Users size={18} className="text-gray-400" />
                  <span className="font-medium">{learning.students}</span>
                </p>
              </div>
            )}

            {learning.rating && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Đánh giá
                </label>
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                  {learning.rating.toFixed(1)}/5 ⭐
                </p>
              </div>
            )}

            {learning.lessonsList && learning.lessonsList.length > 0 && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Danh sách bài học
                </label>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {learning.lessonsList.map((lesson: Lesson) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 rounded-lg p-3 bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {lesson.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {lesson.description}
                          </p>
                          {lesson.duration && (
                            <p className="text-xs text-gray-500 mt-1">
                              Thời lượng: {lesson.duration}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {learning.vocabularyList && learning.vocabularyList.length > 0 && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Từ vựng
                </label>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap gap-2">
                  {learning.vocabularyList.map((vocab, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                    >
                      {vocab}
                    </span>
                  ))}
                </div>
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
                  setEditForm({ ...learning });
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
        message={`Bạn có chắc chắn muốn xóa khóa học "${learning.title}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
