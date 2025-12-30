"use client";

import React from "react";
import { Gamepad2, Trophy, Flame, Target, Zap, Brain, Puzzle, Ribbon, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export const Games: React.FC = () => {
  const gameSections = [
    {
      title: "Trò chơi phổ biến",
      icon: <Flame className="text-orange-500" size={24} />,
      games: [
        {
          id: 1,
          name: "Đoán Ký Hiệu",
          description: "Xem video và chọn từ vựng tương ứng.",
          icon: <Target size={24} className="text-white" />,
          colorClass: "bg-orange-500",
          level: "Dễ"
        },
        {
          id: 2,
          name: "Vua Tốc Độ",
          description: "Thử thách phản xạ với chuỗi ký hiệu.",
          icon: <Zap size={24} className="text-white" />,
          colorClass: "bg-blue-500",
          level: "Khó"
        }
      ]
    },
    {
      title: "Rèn luyện trí não",
      icon: <Brain className="text-purple-500" size={24} />,
      games: [
        {
          id: 3,
          name: "Xếp Hình",
          description: "Ghép các mảnh ghép tạo thành ký hiệu.",
          icon: <Puzzle size={24} className="text-white" />,
          colorClass: "bg-purple-500",
          level: "Trung bình"
        },
        {
          id: 4,
          name: "Nhớ Cặp Đôi",
          description: "Tìm các cặp hình ảnh và ký hiệu tương ứng.",
          icon: <Gamepad2 size={24} className="text-white" />,
          colorClass: "bg-green-500",
          level: "Dễ"
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Simple Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trung tâm trò chơi</h1>
          <p className="text-gray-500">Vừa học vừa chơi với các thử thách thú vị.</p>
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

      {/* Game Sections */}
      {gameSections.map((section, idx) => (
        <div key={idx}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white border border-gray-100 rounded-lg shadow-sm">
              {section.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {section.games.map((game) => (
              <div key={game.id} className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${game.colorClass} flex items-center justify-center shadow-sm`}>
                    {game.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${game.level === 'Dễ' ? 'bg-green-100 text-green-700' : game.level === 'Trung bình' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {game.level}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{game.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {game.description}
                </p>

                <button className="w-full py-2 bg-gray-50 text-gray-600 font-medium rounded-lg group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Play size={16} />
                  Chơi ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
