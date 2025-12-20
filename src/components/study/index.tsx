"use client";

import React from "react";
import { ChevronLeft, Info } from "lucide-react";

export const Study: React.FC = () => {
  const categories = [
    {
      title: "Cơ bản",
      colorClass: "bg-green-500",
      textClass: "text-green-500",
      items: [
        {
          title: "Giới thiệu ASL",
          subtitle: "Tìm hiểu lịch sử và cơ bản của ngôn ngữ ký hiệu",
        },
        {
          title: "Vị trí tay",
          subtitle: "Học các vị trí tay cơ bản",
        },
        {
          title: "Hình dạng tay",
          subtitle: "Học các hình dạng tay khác nhau",
        },
      ],
    },
    {
      title: "Ngữ pháp",
      colorClass: "bg-orange-500",
      textClass: "text-orange-500",
      items: [
        {
          title: "Thứ tự từ",
          subtitle: "Hiểu thứ tự từ trong ký hiệu",
        },
        {
          title: "Động từ",
          subtitle: "Học cách sử dụng động từ",
        },
        {
          title: "Thì và khía cạnh",
          subtitle: "Hiểu thì và khía cạnh trong ký hiệu",
        },
      ],
    },
    {
      title: "Nâng cao",
      colorClass: "bg-pink-500",
      textClass: "text-pink-500",
      items: [
        {
          title: "Biểu cảm khuôn mặt",
          subtitle: "Học sử dụng biểu cảm khuôn mặt",
        },
        {
          title: "Phát âm",
          subtitle: "Luyện tập phát âm và truyền tải",
        },
        {
          title: "Hội thoại",
          subtitle: "Luyện tập các cuộc trò chuyện thực tế",
        },
      ],
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Top Controls */}
      <div className="flex items-center mb-12">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-gray-400 text-sm hover:text-white hover:border-gray-500 transition-all">
          <ChevronLeft size={16} />
          Chọn cấp độ
        </button>
      </div>

      {/* Main Title */}
      <div className="text-center mb-16 relative flex items-center justify-center">
        <div className="absolute left-0 w-full h-[1px] bg-gray-800"></div>
        <h1 className="relative z-10 text-4xl font-light text-gray-200 inline-flex items-center gap-2 bg-white px-6">
          Học Bài
          <Info
            size={18}
            className="text-gray-600 cursor-pointer hover:text-gray-400 transition-colors"
          />
        </h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, idx) => (
          <div key={idx} className="flex flex-col gap-6">
            {/* Column Header */}
            <div
              className={`${category.colorClass} text-white text-center py-3 rounded-t-lg font-medium text-lg shadow-sm`}
            >
              {category.title}
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-6">
              {category.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
                >
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-500">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
