"use client";

import React from "react";
import { ChevronLeft, Info, Calendar } from "lucide-react";
import { dailySigns, previousSigns, difficultyColors } from "@/src/data";

export const DailySigns: React.FC = () => {
  // Get today's sign based on current date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const todaySign = dailySigns.find(sign => sign.date === todayStr) || dailySigns[0];

  return (
    <div className="animate-in fade-in duration-500">

      {/* Daily Sign Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-12 border border-gray-200">
          {/* Date */}
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm uppercase tracking-wide">
              Hôm nay
            </p>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {today.toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Word Display */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-primary-600 mb-2">{todaySign.word}</h2>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[todaySign.difficulty] || 'bg-gray-100 text-gray-600'}`}>
              {todaySign.difficulty}
            </span>
            <p className="text-gray-500 mt-2">{todaySign.category}</p>
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
              {todaySign.word}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Định nghĩa</h3>
                <p className="text-gray-600 mt-2">
                  {todaySign.definition}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Ví dụ</h3>
                <ul className="text-gray-600 mt-2 list-disc list-inside">
                  {todaySign.examples.map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Mẹo</h3>
                <p className="text-gray-600 mt-2">
                  {todaySign.tips}
                </p>
              </div>
              {todaySign.relatedWords && todaySign.relatedWords.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700">Từ liên quan</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {todaySign.relatedWords.map((word, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
            {previousSigns.slice(0, 4).map((sign) => (
              <div
                key={sign.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="text-gray-500 text-sm">{sign.date}</p>
                <p className="text-gray-900 font-medium mt-1">
                  {sign.word}
                </p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs ${difficultyColors[sign.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                  {sign.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
