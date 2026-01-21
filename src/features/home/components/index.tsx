"use client";

import React from "react";
import { useSelector } from "react-redux";
import { BookOpen, Gamepad2, Calendar, TrendingUp, Clock, Award } from "lucide-react";
import Link from "next/link";

export const Home: React.FC = () => {
  const user = useSelector((state: any) => state.admin.user);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <p className="text-primary-200 text-sm mb-2">👋 Xin chào!</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Chào mừng trở lại, {user?.name || "Bạn"}!
          </h1>
          <p className="text-primary-100 max-w-lg">
            Tiếp tục hành trình học ngôn ngữ ký hiệu với các công cụ tương tác của chúng tôi.
          </p>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dictionary Card */}
        <Link href="/dictionary" className="block group">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Mới
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Từ điển</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tìm kiếm và học ký hiệu theo chủ đề, hình dạng tay hoặc tìm kiếm bằng AI.
            </p>
            <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-100 transition-colors">
              Mở từ điển
            </button>
          </div>
        </Link>

        {/* Sign of the Day Card */}
        <Link href="/daily-signs" className="block group">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Calendar size={24} className="text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Hàng ngày
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ký hiệu mỗi ngày
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Nhận một ký hiệu mới mỗi ngày để mở rộng vốn từ vựng của bạn.
            </p>
            <button className="w-full bg-purple-50 text-purple-600 font-semibold py-2.5 rounded-xl hover:bg-purple-100 transition-colors">
              Xem ký hiệu hôm nay
            </button>
          </div>
        </Link>

        {/* Learning Games Card */}
        <Link href="/games" className="block group">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Gamepad2 size={24} className="text-green-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Vui nhộn
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Trò chơi
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Học tập vui vẻ với các trò chơi tương tác và câu đố thú vị.
            </p>
            <button className="w-full bg-green-50 text-green-600 font-semibold py-2.5 rounded-xl hover:bg-green-100 transition-colors">
              Chơi ngay
            </button>
          </div>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-3">
            <BookOpen size={24} className="text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-500">Từ đã học</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-3">
            <TrendingUp size={24} className="text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500">Ngày liên tiếp</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
            <Clock size={24} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">2.5h</p>
          <p className="text-sm text-gray-500">Thời gian học</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mb-3">
            <Award size={24} className="text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500">Huy hiệu</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Hoạt động gần đây
          </h2>
          <Link href="/history" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Xem tất cả →
          </Link>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Hoàn thành: Số 1-10
                </p>
                <p className="text-xs text-gray-500">2 giờ trước</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              Hoàn thành
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">📚</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Đang học: Chào hỏi</p>
                <p className="text-xs text-gray-500">1 ngày trước</p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
              Đang tiến hành
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">🎮</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Chơi game: Ghép ký hiệu</p>
                <p className="text-xs text-gray-500">2 ngày trước</p>
              </div>
            </div>
            <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
              Đạt 85 điểm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
