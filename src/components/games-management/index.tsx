"use client";

import { Gamepad2, Search, Plus, Edit, Trash2, Users, Star, Play } from "lucide-react";
import { useState } from "react";

const mockGames = [
  { id: 1, name: "Ghép hình ký hiệu", description: "Ghép hình để học ký hiệu", players: 2450, rating: 4.8, status: "active" },
  { id: 2, name: "Đoán ký hiệu", description: "Xem video và đoán ký hiệu", players: 1980, rating: 4.6, status: "active" },
  { id: 3, name: "Ký hiệu nhanh", description: "Thực hiện ký hiệu nhanh nhất", players: 1520, rating: 4.5, status: "active" },
  { id: 4, name: "Quiz ký hiệu", description: "Trả lời câu hỏi về ký hiệu", players: 0, rating: 0, status: "draft" },
];

export function GamesManagementComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredGames = mockGames.filter(game => game.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary-600" />
            Quản lý trò chơi
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các trò chơi học tập</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium shadow-sm">
          <Plus size={20} /> Thêm trò chơi
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Tìm kiếm trò chơi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGames.map((game) => (
          <div key={game.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <Gamepad2 className="w-16 h-16 text-white/50" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{game.name}</h3>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${game.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                  {game.status === "active" ? "Hoạt động" : "Bản nháp"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{game.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1"><Users size={16} />{game.players.toLocaleString()} người chơi</div>
                {game.rating > 0 && <div className="flex items-center gap-1"><Star size={16} className="text-amber-400 fill-amber-400" />{game.rating}</div>}
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"><Play size={16} />Chơi thử</button>
              <div className="flex gap-1">
                <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Edit size={18} /></button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
