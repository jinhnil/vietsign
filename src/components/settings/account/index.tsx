"use client";

import React from "react";
import { useSelector } from "react-redux";
import { User, Shield, Key, Smartphone, Mail, Globe, Clock, CreditCard } from "lucide-react";
import Link from "next/link";

export const AccountSettings: React.FC = () => {
  const user = useSelector((state: any) => state.admin.user) || { name: "Người dùng", email: "user@example.com", role: "STUDENT" };

  return (
    <div className="space-y-8">
      {/* Account Header Section (Stucture like Home Welcome) */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-bold border-2 border-white/30 shadow-inner">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="text-center md:text-left">
            <p className="text-blue-100 text-sm mb-1 uppercase tracking-wider font-semibold">Cài đặt tài khoản</p>
            <h1 className="text-3xl font-bold mb-2">
              {user?.name}
            </h1>
            <p className="text-blue-100 opacity-90">
              Quản lý thông tin cá nhân, quyền riêng tư và cài đặt bảo mật của bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Grid (Structure like Home Quick Access) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Info Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <User size={24} className="text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Hồ sơ
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thông tin cá nhân</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={14} /> {user?.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Globe size={14} /> Tiếng Việt (VN)
            </div>
          </div>
          <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-100 transition-colors">
            Chỉnh sửa
          </button>
        </div>

        {/* Security Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Shield size={24} className="text-red-600" />
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Bảo mật
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Bảo mật & Đăng nhập</h3>
          <p className="text-gray-600 text-sm mb-4">
            Thay đổi mật khẩu, xác thực 2 lớp và quản lý các phiên đăng nhập.
          </p>
          <button className="w-full bg-red-50 text-red-600 font-semibold py-2.5 rounded-xl hover:bg-red-100 transition-colors">
            Thiết lập bảo mật
          </button>
        </div>

        {/* Connections Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Smartphone size={24} className="text-amber-600" />
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Liên kết
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thiết bị & Liên kết</h3>
          <p className="text-gray-600 text-sm mb-4">
            Quản lý các thiết bị đã đăng nhập và liên kết với Google, Facebook.
          </p>
          <button className="w-full bg-amber-50 text-amber-600 font-semibold py-2.5 rounded-xl hover:bg-amber-100 transition-colors">
            Quản lý liên kết
          </button>
        </div>
      </div>

      {/* Account Info Stats (Structure like Home Stats) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
            <Clock size={24} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-500">Tháng tham gia</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mb-3">
            <Key size={24} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">Mạnh</p>
          <p className="text-sm text-gray-500">Độ an toàn</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl mb-3">
            <Shield size={24} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">Bật</p>
          <p className="text-sm text-gray-500">Xác thực 2 lớp</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-xl mb-3">
            <CreditCard size={24} className="text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">Free</p>
          <p className="text-sm text-gray-500">Gói dịch vụ</p>
        </div>
      </div>

      {/* Login Activity Section (Structure like Home Recent Activity) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Lịch sử đăng nhập
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Xem thêm →
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                <Smartphone size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">iPhone 15 Pro - Safari</p>
                <p className="text-xs text-gray-500">Hà Nội • Đang hoạt động</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              Phiên hiện tại
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                <Globe size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Windows PC - Chrome</p>
                <p className="text-xs text-gray-500">TP. Hồ Chí Minh • 2 ngày trước</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-red-600 transition-colors">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
