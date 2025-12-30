"use client";

import { Gamepad2, Search, Plus, Edit, Trash2, Users, Star, Play, Filter, Flame, Brain, BookOpen, Trophy, Sparkles } from "lucide-react";
import { useState } from "react";
import { gameSections, levelConfig, gameCategories } from "@/src/data";
import { Pagination, usePagination } from "@/src/components/common/Pagination";

const ITEMS_PER_PAGE = 8;

export function GamesManagementComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Flatten all games for searching and pagination
  const allGames = gameSections.flatMap(section => section.games);

  // Filter games
  const filteredGames = allGames.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || 
                            game.category?.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Use pagination
  const { currentPage, totalPages, paginatedItems, setCurrentPage } = usePagination(filteredGames, ITEMS_PER_PAGE);

  // Stats
  const totalPlayers = allGames.reduce((sum, g) => sum + (g.players || 0), 0);
  const avgRating = allGames.reduce((sum, g) => sum + (g.rating || 0), 0) / allGames.length;

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
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium shadow-sm transition-colors">
          <Plus size={20} /> Thêm trò chơi
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Tổng trò chơi</p>
          <p className="text-2xl font-bold text-gray-900">{allGames.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Danh mục</p>
          <p className="text-2xl font-bold text-purple-600">{gameSections.length}</p>
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
              className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white min-w-[160px]"
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
        {paginatedItems.map((game) => (
          <div key={game.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className={`aspect-video ${game.colorClass} flex items-center justify-center relative`}>
              <Gamepad2 className="w-12 h-12 text-white/50 group-hover:scale-110 transition-transform" />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-white/90 shadow-sm ${levelConfig[game.level]?.color.replace('bg-', 'text-') || 'text-gray-600'}`}>
                  {game.level}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-primary-600 transition-colors uppercase">{game.name}</h3>
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
            <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                <Play size={14} fill="currentColor" /> Chơi
              </button>
              <div className="flex gap-1">
                <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  <Edit size={14} />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
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
    </div>
  );
}
