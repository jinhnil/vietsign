"use client";

import React from "react";
import { Globe, Languages, MapPin, Type, Mic2, MessageCircle, Info, CheckCircle2 } from "lucide-react";

export const LanguageSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl">
            <Globe size={40} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-green-100 text-sm mb-1 uppercase tracking-wider font-semibold">Cài đặt ngôn ngữ</p>
            <h1 className="text-3xl font-bold mb-2">Ngôn ngữ & Vùng miền</h1>
            <p className="text-green-100 opacity-90">Chọn ngôn ngữ hiển thị và định dạng khu vực phù hợp nhất với bạn.</p>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Languages size={24} className="text-green-600" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Display</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ngôn ngữ giao diện</h3>
          <p className="text-gray-600 text-sm mb-4">Chọn ngôn ngữ bạn muốn sử dụng trên toàn bộ ứng dụng và bảng điều khiển.</p>
          <button className="w-full bg-green-50 text-green-600 font-semibold py-2.5 rounded-xl hover:bg-green-100 transition-colors">Chọn ngôn ngữ</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Type size={24} className="text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Subtitles</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Phụ đề & Chú thích</h3>
          <p className="text-gray-600 text-sm mb-4">Tùy chỉnh ngôn ngữ phụ đề khi xem video hướng dẫn ký hiệu.</p>
          <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-100 transition-colors">Thiết lập</button>
        </div>

        <div className="bg-teal-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-teal-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white p-3 rounded-xl group-hover:scale-110 transition-transform">
              <MapPin size={24} className="text-teal-600" />
            </div>
            <span className="text-xs font-semibold text-teal-600 bg-white px-3 py-1 rounded-full">Regional</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Định dạng khu vực</h3>
          <p className="text-gray-700 text-sm mb-4">Ảnh hưởng đến cách hiển thị ngày tháng, thời gian và đơn vị tiền tệ.</p>
          <button className="w-full bg-white text-teal-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">Thay đổi vùng</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mb-3 text-green-600">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-xl font-bold text-gray-900">Tiếng Việt</p>
          <p className="text-sm text-gray-500">Giao diện chính</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3 text-blue-600">
            <Mic2 size={24} />
          </div>
          <p className="text-xl font-bold text-gray-900">Bật</p>
          <p className="text-sm text-gray-500">Nhận diện giọng nói</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-xl mb-3 text-indigo-600">
            <MessageCircle size={24} />
          </div>
          <p className="text-xl font-bold text-gray-900">VN</p>
          <p className="text-sm text-gray-500">Mã quốc gia</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl mb-3 text-purple-600">
            <Info size={24} />
          </div>
          <p className="text-xl font-bold text-gray-900">UTC+7</p>
          <p className="text-sm text-gray-500">Múi giờ</p>
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Danh sách ngôn ngữ được hỗ trợ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 border border-primary-500 bg-primary-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇻🇳</span>
              <span className="font-semibold text-gray-900">Tiếng Việt (Vietnamese)</span>
            </div>
            <CheckCircle2 className="text-primary-600" size={20} />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-100 bg-gray-50 rounded-xl hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇺🇸</span>
              <span className="font-semibold text-gray-900">Tiếng Anh (English)</span>
            </div>
            <button className="text-primary-600 text-sm font-medium">Sử dụng</button>
          </div>
        </div>
      </div>
    </div>
  );
};
