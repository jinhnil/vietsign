"use client";

import React from "react";
import { Shield, Eye, Database, Lock, UserCheck, ShieldAlert, Fingerprint, FileText } from "lucide-react";

export const PrivacySettings: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl">
            <Shield size={40} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-red-100 text-sm mb-1 uppercase tracking-wider font-semibold">Cài đặt quyền riêng tư</p>
            <h1 className="text-3xl font-bold mb-2">Quyền riêng tư & Dữ liệu</h1>
            <p className="text-red-100 opacity-90">Quản lý cách thông tin của bạn được hiển thị và cách chúng tôi xử lý dữ liệu.</p>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Eye size={24} className="text-red-600" />
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">Visibility</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Hiển thị hồ sơ</h3>
          <p className="text-gray-600 text-sm mb-4">Kiểm soát ai có thể xem thành tích học tập và thông tin cá nhân của bạn.</p>
          <button className="w-full bg-red-50 text-red-600 font-semibold py-2.5 rounded-xl hover:bg-red-100 transition-colors">Thiết lập</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Database size={24} className="text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Data</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Dữ liệu cá nhân</h3>
          <p className="text-gray-600 text-sm mb-4">Tải về bản sao dữ liệu của bạn hoặc yêu cầu xóa tài khoản vĩnh viễn.</p>
          <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-100 transition-colors">Quản lý dữ liệu</button>
        </div>

        <div className="bg-rose-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-rose-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Lock size={24} className="text-rose-600" />
            </div>
            <span className="text-xs font-semibold text-rose-600 bg-white px-3 py-1 rounded-full">Ads</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quảng cáo & Cookie</h3>
          <p className="text-gray-700 text-sm mb-4">Tùy chỉnh các loại cookie mà chúng tôi sử dụng để cá nhân hóa trải nghiệm.</p>
          <button className="w-full bg-white text-rose-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">Cấu hình</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <UserCheck size={24} className="text-green-500 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">Công khai</p>
          <p className="text-sm text-gray-500">Trạng thái hồ sơ</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <ShieldAlert size={24} className="text-red-500 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500">Người dùng đã chặn</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Fingerprint size={24} className="text-indigo-500 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">Mạnh</p>
          <p className="text-sm text-gray-500">Bảo vệ định danh</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <FileText size={24} className="text-blue-500 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">Chấp nhận</p>
          <p className="text-sm text-gray-500">Chính sách/Điều khoản</p>
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Nhật ký sử dụng dữ liệu</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Truy cập vị trí</p>
              <p className="text-xs text-gray-500">Lần cuối: 2 giờ trước</p>
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">Yêu cầu quyền</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Truy cập Camera</p>
              <p className="text-xs text-gray-500">Sử dụng cho: Nhận diện ký hiệu</p>
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">Đã cấp quyền</span>
          </div>
        </div>
      </div>
    </div>
  );
};
