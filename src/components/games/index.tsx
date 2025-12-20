"use client";

import React from "react";
import { ChevronLeft, Info } from "lucide-react";

export const Games: React.FC = () => {
  const categories = [
    {
      title: "Trò chơi cơ bản",
      colorClass: "bg-red-500",
      textClass: "text-red-500",
      items: [
        {
          title: "Đoán ký hiệu",
          subtitle: "Xem video và đoán ký hiệu đúng",
        },
        {
          title: "Ghép ký hiệu",
          subtitle: "Ghép ký hiệu với hình ảnh",
        },
        {
          title: "Nghe và chọn",
          subtitle: "Nghe mô tả và chọn ký hiệu đúng",
        },
      ],
    },
    {
      title: "Trò chơi nâng cao",
      colorClass: "bg-purple-600",
      textClass: "text-purple-600",
      items: [
        {
          title: "Xây dựng câu",
          subtitle: "Sắp xếp ký hiệu thành câu hoàn chỉnh",
        },
        {
          title: "Hội thoại nhanh",
          subtitle: "Luyện tập đàm thoại với thời gian giới hạn",
        },
      ],
    },
    {
      title: "Thử thách",
      colorClass: "bg-blue-500",
      textClass: "text-blue-500",
      items: [
        {
          title: "Thử thách hàng ngày",
          subtitle: "Hoàn thành thử thách mỗi ngày",
        },
        {
          title: "Bảng xếp hạng",
          subtitle: "Cạnh tranh với người chơi khác",
        },
        {
          title: "Huy hiệu thành tích",
          subtitle: "Thu thập huy hiệu từ các thử thách",
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
          Bộ lọc
        </button>
      </div>

      {/* Main Title */}
      <div className="text-center mb-16 relative flex items-center justify-center">
        <div className="absolute left-0 w-full h-[1px] bg-gray-800"></div>
        <h1 className="relative z-10 text-4xl font-light text-gray-200 inline-flex items-center gap-2 bg-white px-6">
          Trò Chơi
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
