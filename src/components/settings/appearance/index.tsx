"use client";

import React from "react";
import { Palette, Moon, Sun, Type, Layout, Sparkles, Monitor, AppWindow } from "lucide-react";

export const AppearanceSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl">
            <Palette size={40} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-purple-100 text-sm mb-1 uppercase tracking-wider font-semibold">Cài đặt giao diện</p>
            <h1 className="text-3xl font-bold mb-2">Giao diện & Trải nghiệm</h1>
            <p className="text-purple-100 opacity-90">Tùy chỉnh màu sắc, chủ đề và cách hiển thị nội dung theo ý muốn của bạn.</p>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Moon size={24} className="text-purple-600" />
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Chế độ tối</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Chủ đề (Theme)</h3>
          <p className="text-gray-600 text-sm mb-4">Chuyển đổi giữa chế độ Sáng, Tối hoặc tự động theo hệ thống.</p>
          <button className="w-full bg-purple-50 text-purple-600 font-semibold py-2.5 rounded-xl hover:bg-purple-100 transition-colors">Thiết lập</button>
        </div>

        <div className="bg-blue-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-blue-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Type size={24} className="text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-white px-3 py-1 rounded-full">Cỡ chữ</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Khả năng tiếp cận</h3>
          <p className="text-gray-700 text-sm mb-4">Điều chỉnh kích thước văn bản, độ tương phản và hiệu ứng chuyển động.</p>
          <button className="w-full bg-white text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">Thiết lập</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Layout size={24} className="text-indigo-600" />
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Layout</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Bố cục trang</h3>
          <p className="text-gray-600 text-sm mb-4">Tùy chỉnh thanh điều hướng, mật độ nội dung và vị trí các widget.</p>
          <button className="w-full bg-indigo-50 text-indigo-600 font-semibold py-2.5 rounded-xl hover:bg-indigo-100 transition-colors">Thiết lập</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Sun size={24} className="text-orange-500 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">Sáng</p>
          <p className="text-sm text-gray-500">Chủ đề hiện tại</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Sparkles size={24} className="text-purple-500 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">Mặc định</p>
          <p className="text-sm text-gray-500">Màu nhấn</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Type size={24} className="text-blue-500 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">100%</p>
          <p className="text-sm text-gray-500">Kích thước chữ</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <AppWindow size={24} className="text-indigo-500 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">Chuẩn</p>
          <p className="text-sm text-gray-500">Mật độ hiển thị</p>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Bản xem trước giao diện</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 border-2 border-primary-500 rounded-xl p-4 flex items-center justify-center h-24">
            <Monitor size={32} className="text-primary-500" />
            <span className="ml-2 font-medium">Sáng (Active)</span>
          </div>
          <div className="bg-gray-900 border-2 border-transparent rounded-xl p-4 flex items-center justify-center h-24 text-white hover:border-gray-700 transition-colors">
            <Monitor size={32} className="text-gray-400" />
            <span className="ml-2 font-medium text-gray-400">Tối</span>
          </div>
        </div>
      </div>
    </div>
  );
};
