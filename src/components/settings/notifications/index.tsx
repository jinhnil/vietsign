"use client";

import React from "react";
import { Bell, Mail, Smartphone, BellOff, MessageSquare, ShieldCheck, Clock, Settings } from "lucide-react";

export const NotificationsSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl">
            <Bell size={40} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-orange-100 text-sm mb-1 uppercase tracking-wider font-semibold">Cài đặt thông báo</p>
            <h1 className="text-3xl font-bold mb-2">Thông báo & Tin nhắn</h1>
            <p className="text-orange-100 opacity-90">Kiểm soát cách và thời điểm bạn nhận được cập nhật từ hệ thống.</p>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Smartphone size={24} className="text-orange-600" />
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Push</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thông báo Đẩy</h3>
          <p className="text-gray-600 text-sm mb-4">Nhận thông báo tức thì trên trình duyệt hoặc điện thoại di động.</p>
          <button className="w-full bg-orange-50 text-orange-600 font-semibold py-2.5 rounded-xl hover:bg-orange-100 transition-colors">Tùy chỉnh</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Mail size={24} className="text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Email</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Email Thông báo</h3>
          <p className="text-gray-600 text-sm mb-4">Bản tin định kỳ, cập nhật khóa học và tin nhắn quan trọng qua email.</p>
          <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-100 transition-colors">Thiết lập email</button>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-indigo-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white p-3 rounded-xl group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} className="text-indigo-600" />
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-white px-3 py-1 rounded-full">Bảo mật</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Cảnh báo Bảo mật</h3>
          <p className="text-gray-700 text-sm mb-4">Luôn nhận thông báo về việc đăng nhập lạ hoặc thay đổi mật khẩu.</p>
          <button className="w-full bg-white text-indigo-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">Quản lý</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 rounded-xl mb-3 text-orange-600">
            <Bell size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">Bật</p>
          <p className="text-sm text-gray-500">Trạng thái hiện tại</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3 text-blue-600">
            <MessageSquare size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">15</p>
          <p className="text-sm text-gray-500">Thông báo tuần này</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-xl mb-3 text-indigo-600">
            <Clock size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">22:00</p>
          <p className="text-sm text-gray-500">Chế độ im lặng</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl mb-3 text-purple-600">
            <BellOff size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500">Kênh đã tắt</p>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Tùy chọn chi tiết</h2>
          <Settings size={20} className="text-gray-400" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Thắc mắc & thảo luận</p>
              <p className="text-xs text-gray-500">Khi có ai đó phản hồi bình luận của bạn</p>
            </div>
            <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Cập nhật khóa học</p>
              <p className="text-xs text-gray-500">Thông báo bài học mới hoặc thay đổi lịch học</p>
            </div>
            <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
