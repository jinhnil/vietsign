"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, Save, X, Gamepad2, Users, Star, CheckCircle2, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { gameSections, GameItem, levelConfig, gameCategories } from "@/src/data";
import { ConfirmModal } from "@/src/components/common/ConfirmModal";

export function GameManagementDetail() {
  const params = useParams();
  const router = useRouter();
  
  const id = Number(params.id);
  const [game, setGame] = useState<GameItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<GameItem>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const allGames = gameSections.flatMap(s => s.games);
    const found = allGames.find(g => g.id === id);
    if (found) {
      setGame(found);
      setEditForm({ ...found });
    }
  }, [id]);

  const handleSave = () => {
    if (game && editForm) {
      setGame({ ...game, ...editForm } as GameItem);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    router.push("/games-management");
  };

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy trò chơi</h2>
        <button 
          onClick={() => router.push("/games-management")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button 
          onClick={() => router.push("/games-management")}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Game Header with Color */}
        <div className={`${game.colorClass} p-8 relative`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <Gamepad2 size={40} className="text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold uppercase">{game.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-3 py-1 text-xs font-bold uppercase rounded-lg bg-white/90 ${levelConfig[game.level]?.color.replace('bg-', 'text-') || 'text-gray-600'}`}>
                    {game.level}
                  </span>
                  {!game.isActive && (
                    <span className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-red-500 text-white">
                      Vô hiệu hóa
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-6 text-white text-center">
              <div>
                <p className="text-3xl font-bold">{(game.players || 0).toLocaleString()}</p>
                <p className="text-xs text-white/80">Người chơi</p>
              </div>
              <div className="flex items-center gap-1">
                <Star size={24} className="fill-current text-amber-300" />
                <p className="text-3xl font-bold">{game.rating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Tên trò chơi</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.name || ""} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg font-medium" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 text-lg font-bold uppercase">{game.name}</p>
              )}
            </div>
            
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
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{game.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Thể loại</label>
              {isEditing ? (
                <select 
                  value={editForm.category || ""} 
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  {gameCategories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {game.category}
                  </span>
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Độ khó</label>
              {isEditing ? (
                <select 
                  value={editForm.level || ""} 
                  onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  {Object.keys(levelConfig).map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className={`px-3 py-1 text-sm font-bold rounded-full ${levelConfig[game.level]?.color || 'bg-gray-100 text-gray-600'}`}>
                    {game.level}
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Số người chơi</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Users size={18} className="text-gray-400" />
                <span className="font-medium">{(game.players || 0).toLocaleString()}</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Đánh giá</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <span className="font-medium">{game.rating}/5</span>
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Trạng thái</label>
              {isEditing ? (
                <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-xl">
                  <span className={`text-sm font-medium ${editForm.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                    {editForm.isActive ? 'Đang bật' : 'Đang tắt'}
                  </span>
                  <button 
                    type="button"
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${editForm.isActive ? 'bg-primary-600' : 'bg-gray-200'}`}
                    onClick={() => setEditForm({ ...editForm, isActive: !editForm.isActive })}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${editForm.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  {game.isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle2 size={16} />
                      Đang hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      <XCircle size={16} />
                      Vô hiệu hóa
                    </span>
                  )}
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
                  setEditForm({ ...game });
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
        message={`Bạn có chắc chắn muốn xóa trò chơi "${game.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
