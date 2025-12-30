"use client";

import React from "react";
import { Gamepad2, Trophy, Flame, Zap, Brain, BookOpen, Sparkles, Play, Users, Star } from "lucide-react";
import { gameSections, levelConfig, getGamesStats } from "@/src/data";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Flame,
  Brain,
  BookOpen,
  Sparkles,
};

export const Games: React.FC = () => {
  const stats = getGamesStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trung tâm trò chơi</h1>
          <p className="text-gray-500">Vừa học vừa chơi với {stats.totalGames} thử thách thú vị.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg flex items-center gap-2 font-medium">
            <Trophy size={18} />
            <span>Hạng: Đồng</span>
          </div>
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2 font-medium">
            <Zap size={18} />
            <span>Điểm: 1250</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <Gamepad2 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.totalGames}</p>
          <p className="text-sm text-gray-500">Trò chơi</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{(stats.totalPlayers / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-500">Người chơi</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
          <p className="text-sm text-gray-500">Đánh giá</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.sectionsCount}</p>
          <p className="text-sm text-gray-500">Danh mục</p>
        </div>
      </div>

      {/* Game Sections */}
      {gameSections.map((section, idx) => {
        const IconComponent = iconMap[section.iconName];
        
        return (
          <div key={idx}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                {IconComponent && <IconComponent className="text-primary-600" size={24} />}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <span className="text-sm text-gray-500">({section.games.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.games.map((game) => (
                <div key={game.id} className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${game.colorClass} flex items-center justify-center shadow-sm`}>
                      <Gamepad2 size={24} className="text-white" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelConfig[game.level]?.color || 'bg-gray-100 text-gray-700'}`}>
                      {game.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{game.name}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {game.description}
                  </p>

                  {game.category && (
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700 mb-3">
                      {game.category}
                    </span>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {(game.players || 0).toLocaleString()} người chơi
                    </div>
                    {(game.rating || 0) > 0 && (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        {game.rating}
                      </div>
                    )}
                  </div>

                  <button className="w-full py-2 bg-gray-50 text-gray-600 font-medium rounded-lg group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Play size={16} />
                    Chơi ngay
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
