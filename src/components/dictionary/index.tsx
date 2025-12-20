"use client";

import React from "react";
import { ChevronLeft, Info } from "lucide-react";

export const Dictionary: React.FC = () => {
  const categories = [
    {
      title: "A - F",
      colorClass: "bg-blue-500",
      textClass: "text-blue-500",
      items: [
        {
          title: "Ký hiệu A",
          subtitle: "Học cách ký hiệu chữ A",
        },
        {
          title: "Ký hiệu B",
          subtitle: "Học cách ký hiệu chữ B",
        },
        {
          title: "Ký hiệu C",
          subtitle: "Học cách ký hiệu chữ C",
        },
      ],
    },
    {
      title: "G - M",
      colorClass: "bg-green-500",
      textClass: "text-green-500",
      items: [
        {
          title: "Ký hiệu G",
          subtitle: "Học cách ký hiệu chữ G",
        },
        {
          title: "Ký hiệu H",
          subtitle: "Học cách ký hiệu chữ H",
        },
        {
          title: "Ký hiệu I",
          subtitle: "Học cách ký hiệu chữ I",
        },
      ],
    },
    {
      title: "N - S",
      colorClass: "bg-purple-600",
      textClass: "text-purple-600",
      items: [
        {
          title: "Ký hiệu N",
          subtitle: "Học cách ký hiệu chữ N",
        },
        {
          title: "Ký hiệu O",
          subtitle: "Học cách ký hiệu chữ O",
        },
        {
          title: "Ký hiệu P",
          subtitle: "Học cách ký hiệu chữ P",
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
          Tìm kiếm
        </button>
      </div>

      {/* Main Title */}
      <div className="text-center mb-16 relative flex items-center justify-center">
        <div className="absolute left-0 w-full h-[1px] bg-gray-800"></div>
        <h1 className="relative z-10 text-4xl font-light text-gray-200 inline-flex items-center gap-2 bg-white px-6">
          Từ Điển
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
