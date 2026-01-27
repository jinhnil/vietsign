"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, Save, X, Video, Eye } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { dictionaryItems, DictionaryItem } from "@/data";
import { ConfirmModal } from "@/shared/components/common/ConfirmModal";
import { VideoPlayer } from "@/shared/components/common";

export function DictionaryManagementDetail() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const [item, setItem] = useState<DictionaryItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<DictionaryItem>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Load data
  useEffect(() => {
    const found = dictionaryItems.find((i) => i.id === id);
    if (found) {
      setItem(found);
      setEditForm({ ...found });
    }
  }, [id]);

  // Handle save
  const handleSave = () => {
    if (item && editForm) {
      setItem({ ...item, ...editForm } as DictionaryItem);
      setIsEditing(false);
    }
  };

  // Handle delete
  const handleDelete = () => {
    router.push("/dictionary-management");
  };

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Không tìm thấy từ này
        </h2>
        <button
          onClick={() => router.push("/dictionary-management")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const allCategories = Array.from(
    new Set(dictionaryItems.map((w) => w.category)),
  );

  const currentVideoUrl = isEditing ? editForm.videoUrl : item.videoUrl;
  const currentImageUrl = isEditing ? editForm.imageUrl : item.imageUrl;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header - chỉ có nút quay lại */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dictionary-management")}
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
        {/* Video Section */}
        <div className="aspect-video max-h-[500px] w-full">
          {currentVideoUrl ? (
            <VideoPlayer
              key={currentVideoUrl}
              videoUrl={currentVideoUrl}
              title={item.word}
              autoPlay={false}
              loop={true}
              showControls={true}
              className="rounded-t-3xl"
            />
          ) : currentImageUrl ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImageUrl}
                alt={item.word}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-900">
              <Video size={48} className="mb-2 opacity-50" />
              <p>Chưa có video hoặc hình ảnh</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Từ */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Từ ký hiệu
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.word || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, word: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg font-medium"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 text-lg font-bold">
                  {item.word}
                </p>
              )}
            </div>

            {/* Danh mục */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Danh mục
              </label>
              {isEditing ? (
                <select
                  value={editForm.category || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800">
                    {item.category}
                  </span>
                </p>
              )}
            </div>

            {/* Lượt xem */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Lượt xem
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Eye size={18} className="text-gray-400" />
                <span className="font-medium">
                  {item.views.toLocaleString()}
                </span>
              </p>
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Trạng thái
              </label>
              {isEditing ? (
                <select
                  value={editForm.status || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Bản nháp</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                      item.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </p>
              )}
            </div>

            {/* Video URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Video URL
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={editForm.videoUrl || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, videoUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="Nhập đường dẫn video..."
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600 text-sm truncate flex items-center gap-2">
                  <Video size={18} className="text-gray-400 flex-shrink-0" />
                  {item.videoUrl || "Chưa có video"}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Image URL
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={editForm.imageUrl || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, imageUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="Nhập đường dẫn hình ảnh..."
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600 text-sm truncate flex items-center gap-2">
                  <Eye size={18} className="text-gray-400 flex-shrink-0" />
                  {item.imageUrl || "Chưa có hình ảnh"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({ ...item });
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

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa từ "${item.word}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
