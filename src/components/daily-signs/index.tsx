"use client";

import React from "react";
import { Calendar, Clock, BookOpen, ChevronRight, Play, Star, TrendingUp } from "lucide-react";
import { 
  getTodaySignOrDefault, 
  getRecentSigns, 
  getRelatedWords,
  dailySignSchedule,
  getDictionaryItemById
} from "@/src/data/dailySignsData";

export function DailySigns() {
  const todaySign = getTodaySignOrDefault();
  const recentSigns = getRecentSigns(5);
  const relatedWords = getRelatedWords(todaySign.id, 4);
  const today = new Date().toLocaleDateString("vi-VN", { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary-600" />
            Ký Hiệu Của Ngày
          </h1>
          <p className="text-gray-600 mt-1">{today}</p>
        </div>
      </div>

      {/* Main Sign of the Day */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Preview */}
          <div className="lg:w-1/2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <button className="relative z-10 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-sm text-white/80">Xem video hướng dẫn</span>
                <span className="text-sm text-white/60">{todaySign.views} lượt xem</span>
              </div>
            </div>
          </div>

          {/* Sign Details */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4 w-fit">
              <Star size={14} />
              <span>Từ vựng hôm nay</span>
            </div>
            
            <h2 className="text-5xl font-bold mb-4">{todaySign.word}</h2>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {todaySign.category}
              </span>
              <span className="text-white/80 text-sm">
                #{todaySign.id} trong từ điển
              </span>
            </div>

            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Học ký hiệu "{todaySign.word}" - một từ thuộc danh mục "{todaySign.category}" 
              với {todaySign.views} lượt xem.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-medium hover:bg-white/90 transition-colors">
                <Play size={18} />
                Bắt đầu học
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-colors">
                <BookOpen size={18} />
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Words */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Từ vựng liên quan</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
            Xem tất cả <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedWords.map((word) => (
            <div key={word.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-primary-600 font-medium">{word.category}</span>
                <Play size={14} className="text-gray-300 group-hover:text-primary-500" />
              </div>
              <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {word.word}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{word.views} lượt xem</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Signs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Các từ gần đây</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
            Xem lịch sử <ChevronRight size={16} />
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
          {recentSigns.length > 0 ? (
            recentSigns.map((sign, index) => (
              <div key={sign.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                  {sign.word.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{sign.word}</h4>
                  <p className="text-sm text-gray-500">{sign.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{index + 1} ngày trước</span>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              Chưa có từ vựng nào trong lịch sử
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DailySigns;
