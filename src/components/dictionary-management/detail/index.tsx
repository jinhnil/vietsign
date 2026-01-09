"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Edit, Trash2, Save, X, Video, Eye, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { dictionaryItems, DictionaryItem } from "@/src/data";
import { ConfirmModal } from "@/src/components/common/ConfirmModal";

export function DictionaryManagementDetail() {
  const params = useParams();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const id = Number(params.id);
  const [item, setItem] = useState<DictionaryItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<DictionaryItem>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Video controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Load data
  useEffect(() => {
    const found = dictionaryItems.find(i => i.id === id);
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

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy từ này</h2>
        <button 
          onClick={() => router.push("/dictionary-management")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const allCategories = Array.from(new Set(dictionaryItems.map(w => w.category)));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header - chỉ có nút quay lại */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push("/dictionary-management")}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Video Section */}
        <div className="bg-gray-900 relative group">
          <div className="aspect-video max-h-[500px] w-full relative overflow-hidden bg-black">
            <video 
              ref={videoRef}
              className="w-full h-full object-contain cursor-pointer"
              controls={false}
              muted
              loop
              playsInline
              onClick={togglePlay}
            >
              <source src={isEditing ? editForm.videoUrl : item.videoUrl} type="video/mp4" />
            </video>

            {/* Play overlay */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                    <Play size={28} className="text-primary-600 fill-current ml-1" />
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <button 
                  onClick={togglePlay}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              <button 
                onClick={() => videoRef.current?.requestFullscreen()}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Từ */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Từ ký hiệu</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.word || ""} 
                  onChange={(e) => setEditForm({ ...editForm, word: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg font-medium" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 text-lg font-bold">{item.word}</p>
              )}
            </div>
            
            {/* Danh mục */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Danh mục</label>
              {isEditing ? (
                <select 
                  value={editForm.category || ""} 
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
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
              <label className="text-sm font-semibold text-gray-700">Lượt xem</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Eye size={18} className="text-gray-400" />
                <span className="font-medium">{item.views.toLocaleString()}</span>
              </p>
            </div>
            
            {/* Trạng thái */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Trạng thái</label>
              {isEditing ? (
                <select 
                  value={editForm.status || ""} 
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Bản nháp</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${item.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {item.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </p>
              )}
            </div>

            {/* Video URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Video URL</label>
              {isEditing ? (
                <input 
                  type="url" 
                  value={editForm.videoUrl || ""} 
                  onChange={(e) => setEditForm({ ...editForm, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600 text-sm truncate flex items-center gap-2">
                  <Video size={18} className="text-gray-400 flex-shrink-0" />
                  {item.videoUrl}
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
