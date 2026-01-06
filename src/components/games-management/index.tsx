"use client";

import { Gamepad2, Search, Edit, Trash2, Users, Star, Filter, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { gameSections, levelConfig, gameCategories, GameItem } from "@/src/data";
import { Pagination, usePagination } from "@/src/components/common/Pagination";
import { ConfirmModal } from "@/src/components/common/ConfirmModal";

const ITEMS_PER_PAGE = 8;

import { removeVietnameseTones } from "@/src/utils/text";

export function GamesManagementComponent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { user } = useSelector((state: RootState) => state.admin);

  // State để quản lý dữ liệu (mock)
  const [allGames, setAllGames] = useState<GameItem[]>(gameSections.flatMap(section => section.games));

  // State cho modal xác nhận xóa
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<GameItem | null>(null);

  // Filter games
  const filteredGames = allGames.filter(game => {
    const normalizedQuery = removeVietnameseTones(searchQuery);
    const matchesSearch = removeVietnameseTones(game.name).includes(normalizedQuery) ||
                          removeVietnameseTones(game.description).includes(normalizedQuery);
    const matchesCategory = filterCategory === "all" || 
                            game.category?.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Use pagination
  const { currentPage, totalPages, paginatedItems, paddedItems, setCurrentPage } = usePagination(filteredGames, ITEMS_PER_PAGE);

  // Stats
  const totalPlayers = allGames.reduce((sum, g) => sum + (g.players || 0), 0);
  const avgRating = allGames.reduce((sum, g) => sum + (g.rating || 0), 0) / (allGames.length || 1);

  // Check Admin permission
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";

  // Mở trang chi tiết
  const openDetailPage = (game: GameItem) => {
    router.push(`/games-management/${game.id}`);
  };

  // Mở trang chi tiết ở chế độ sửa
  const openEditPage = (game: GameItem, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/games-management/${game.id}`);
  };

  // Mở modal xác nhận xóa
  const openDeleteModal = (game: GameItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setGameToDelete(game);
    setIsDeleteModalOpen(true);
  };

  // Xử lý xóa
  const handleDelete = () => {
    if (gameToDelete) {
      setAllGames(prev => prev.filter(g => g.id !== gameToDelete.id));
      setIsDeleteModalOpen(false);
      setGameToDelete(null);
    }
  };

  // Toggle isActive
  const toggleGameActive = (game: GameItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setAllGames(prev => prev.map(g => 
      g.id === game.id ? { ...g, isActive: !g.isActive } : g
    ));
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Truy cập bị từ chối</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Chỉ Quản trị viên hệ thống mới có quyền truy cập vào trang quản lý trò chơi này. 
          Vui lòng liên hệ với admin nếu bạn cho rằng đây là một lỗi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary-600" />
            Quản lý trò chơi ({allGames.length})
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các trò chơi học tập và giải trí</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Tổng trò chơi</p>
          <p className="text-2xl font-bold text-gray-900">{allGames.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Đang hoạt động</p>
          <p className="text-2xl font-bold text-green-600">{allGames.filter(g => g.isActive).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Tổng người chơi</p>
          <p className="text-2xl font-bold text-primary-600">{totalPlayers.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Đánh giá TB</p>
          <p className="text-2xl font-bold text-amber-600 flex items-center gap-1">
            <Star size={20} className="fill-amber-400 text-amber-400" />
            {avgRating.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm trò chơi..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)} 
              className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white min-w-[160px] transition-all focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tất cả thể loại</option>
              {gameCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Games List with Pagination */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paddedItems.map((game, index) => (
          game ? (
            <div 
              key={game.id} 
              className={`bg-white rounded-2xl shadow-sm border ${!game.isActive ? 'opacity-75 grayscale-[0.5] border-dashed' : 'border-gray-100'} overflow-hidden hover:shadow-md transition-all group cursor-pointer`}
              onClick={() => openDetailPage(game)}
            >
              <div className={`aspect-video ${game.isActive ? game.colorClass : 'bg-gray-400'} flex items-center justify-center relative`}>
                <Gamepad2 className="w-12 h-12 text-white/50 group-hover:scale-110 transition-transform" />
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-white/90 shadow-sm ${levelConfig[game.level]?.color.replace('bg-', 'text-') || 'text-gray-600'}`}>
                    {game.level}
                  </span>
                  {!game.isActive && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-500 text-white shadow-sm">
                      Vô hiệu hóa
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold text-sm transition-colors uppercase ${game.isActive ? 'text-gray-900 group-hover:text-primary-600' : 'text-gray-500'}`}>{game.name}</h3>
                </div>
                <p className="text-[11px] text-gray-500 mb-3 line-clamp-2 min-h-[32px]">{game.description}</p>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users size={12} className="text-gray-400" />
                      {(game.players || 0).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      {game.rating}
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                    {game.category}
                  </span>
                </div>
              </div>
              <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-medium ${game.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                    {game.isActive ? 'Đang bật' : 'Đang tắt'}
                  </span>
                  <button 
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${game.isActive ? 'bg-primary-600' : 'bg-gray-200'}`}
                    onClick={(e) => toggleGameActive(game, e)}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${game.isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
                <div className="flex gap-1">
                  <button 
                    className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={(e) => openEditPage(game, e)}
                    title="Chỉnh sửa"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={(e) => openDeleteModal(game, e)}
                    title="Xóa"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div key={`empty-${index}`} className="opacity-0 pointer-events-none" aria-hidden="true">
              <div className="aspect-video" />
              <div className="p-4 h-[120px]" />
            </div>
          )
        ))}
      </div>

      {filteredGames.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={allGames.length}
            filteredItems={filteredGames.length}
            itemName="trò chơi"
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Gamepad2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy trò chơi</h3>
          <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa trò chơi "${gameToDelete?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
