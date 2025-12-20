"use client";

import React from "react";
import { ChevronLeft, Info, Calendar } from "lucide-react";

export const DailySigns: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Top Controls */}
      <div className="flex items-center gap-4 mb-12">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-gray-400 text-sm hover:text-white hover:border-gray-500 transition-all">
          <ChevronLeft size={16} />
          Quay lại
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded text-sm hover:bg-primary-600 transition-all">
          <Calendar size={16} />
          Hôm nay
        </button>
      </div>

      {/* Main Title */}
      <div className="text-center mb-16 relative flex items-center justify-center">
        <div className="absolute left-0 w-full h-[1px] bg-gray-800"></div>
        <h1 className="relative z-10 text-4xl font-light text-gray-200 inline-flex items-center gap-2 bg-white px-6">
          Ký Hiệu Của Ngày
          <Info
            size={18}
            className="text-gray-600 cursor-pointer hover:text-gray-400 transition-colors"
          />
        </h1>
      </div>

      {/* Daily Sign Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-12 border border-gray-200">
          {/* Date */}
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm uppercase tracking-wide">
              Hôm nay
            </p>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {new Date().toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-8 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Video ký hiệu của ngày</p>
            </div>
          </div>

          {/* Sign Details */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ký hiệu hôm nay
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Định nghĩa</h3>
                <p className="text-gray-600 mt-2">
                  Nội dung định nghĩa sẽ được hiển thị ở đây
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Ví dụ</h3>
                <p className="text-gray-600 mt-2">
                  Các ví dụ sử dụng sẽ được hiển thị ở đây
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Mẹo</h3>
                <p className="text-gray-600 mt-2">
                  Các mẹo để ghi nhớ ký hiệu này
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Đã học
            </button>
            <button className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Lưu lại
            </button>
          </div>
        </div>

        {/* Previous Signs */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Ký hiệu trước đó
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="text-gray-500 text-sm">Ngày trước</p>
                <p className="text-gray-900 font-medium mt-1">
                  Ký hiệu #{item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
