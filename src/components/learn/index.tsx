"use client";

import React from "react";
import { ChevronLeft, Info, Hand } from "lucide-react";
import { learnCategories } from "@/src/data";

export const Learn: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Main Title */}
      <div className="text-center mb-16 relative flex items-center justify-center">
        {/* Đường kẻ nằm dưới */}
        <div className="absolute left-0 w-full h-[1px] bg-gray-800"></div>

        {/* Tiêu đề nằm trên - Dùng bg để che đường kẻ */}
        <h1 className="relative z-10 text-4xl font-light text-gray-200 inline-flex items-center gap-2 bg-white px-6">
          Học tập
          <Info
            size={18}
            className="text-gray-600 cursor-pointer hover:text-gray-400 transition-colors"
          />
        </h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {learnCategories.map((category, idx) => (
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
                  className="group bg-white border border-gray-200 rounded-lg p-8 text-center cursor-pointer flex flex-col items-center justify-center min-h-[220px] transition-all duration-300 hover:border-primary-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`mb-4 ${category.textClass} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {/* Hand Icons simulated */}
                    <div className="flex justify-center gap-1">
                      <Hand size={24} className="-rotate-12" />
                      <Hand size={24} className="rotate-12" />
                    </div>
                  </div>

                  <h3 className="text-xl font-normal text-gray-900 mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm font-light leading-relaxed">
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
