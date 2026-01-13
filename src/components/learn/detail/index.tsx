"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { learnCategories, LearnItem } from "@/src/data/learnData";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  List,
  Info,
  Share2,
  Bookmark,
} from "lucide-react";

export const LessonDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [course, setCourse] = useState<LearnItem | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "vocabulary">(
    "overview"
  );

  useEffect(() => {
    // Find course in flattened categories
    let foundCourse: LearnItem | undefined;

    // Search in all categories
    for (const cat of learnCategories) {
      const found = cat.items.find((item) => item.id === id);
      if (found) {
        foundCourse = {
          ...found,
          categoryTitle: cat.title,
          colorClass: cat.colorClass,
        };
        break;
      }
    }

    setCourse(foundCourse || null);
  }, [id]);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <p className="text-gray-500 text-lg">Đang tải bài học...</p>
        <button
          onClick={() => router.push("/learn")}
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Quay lại danh sách
        </button>
      </div>
    );
  }

  const renderVideo = (url?: string) => {
    if (!url) {
      return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 flex-col gap-2">
          <Play size={48} />
          <span>Chưa có video bài học</span>
        </div>
      );
    }

    if (url.includes("vimeo")) {
      const match = url.match(/(?:vimeo.com\/|video\/)(\d+)/);
      const videoId = match ? match[1] : "";
      return (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          className="w-full h-full object-cover"
          title={course.title}
        />
      );
    }

    if (url.includes("youtube") || url.includes("youtu.be")) {
      const embedUrl = url.includes("embed")
        ? url
        : url.replace("watch?v=", "embed/");
      return (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <video
        src={url}
        className="w-full h-full object-cover bg-black"
        controls
      />
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/learn")}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Quay lại</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Video & Main Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Box */}
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative group">
            {renderVideo(course.videoUrl)}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              {course.title}
            </h1>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                <Share2 size={24} />
              </button>
              <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                <Bookmark size={24} />
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-lg leading-relaxed">
            {course.subtitle}
          </p>

          {/* Tabs Content */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-6 border-b border-gray-100 pb-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Tổng quan
              </button>
              <button
                onClick={() => setActiveTab("vocabulary")}
                className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${
                  activeTab === "vocabulary"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Từ vựng ({course.vocabularyList?.length || 0})
              </button>
            </div>

            <div className="pt-4 min-h-[200px]">
              {activeTab === "overview" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Info size={18} className="text-primary-600" /> Giới thiệu
                    bài học
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {course.description ||
                      "Chưa có mô tả chi tiết cho bài học này."}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold">
                        Thời lượng
                      </span>
                      <p className="font-semibold text-gray-800">
                        {course.duration || "N/A"}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold">
                        Cấp độ
                      </span>
                      <p className="font-semibold text-gray-800">
                        {course.level || "Cơ bản"}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold">
                        Số bài học
                      </span>
                      <p className="font-semibold text-gray-800">
                        {course.lessons || 1}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "vocabulary" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <List size={18} className="text-primary-600" /> Danh sách từ
                    vựng
                  </h3>
                  {course.vocabularyList && course.vocabularyList.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.vocabularyList.map((word, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-colors group cursor-pointer border border-transparent hover:border-primary-100"
                        >
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-xs font-bold text-gray-400 group-hover:text-primary-600">
                            {idx + 1}
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-primary-700">
                            {word}
                          </span>
                          <Play
                            size={14}
                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-500"
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">
                      Không có từ vựng nào được liệt kê.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar / Additional Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Tiến độ của bạn</h3>
            <div className="space-y-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                      Hoàn thành
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary-600">
                      {course.progress || 0}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-primary-100">
                  <div
                    style={{ width: `${course.progress || 0}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                  ></div>
                </div>
              </div>
              <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-200">
                Tiếp tục học
              </button>
              <button
                className="w-full py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                onClick={() => setActiveTab("vocabulary")}
              >
                <RotateCcw size={18} /> Ôn tập từ vựng
              </button>
            </div>
          </div>

          <div className="bg-primary-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Mẹo học tập</h3>
              <p className="text-primary-100 text-sm leading-relaxed mb-4">
                Hãy luyện tập trước gương để quan sát cử chỉ tay của mình tốt
                hơn. Đừng ngại sai, hãy thực hành mỗi ngày!
              </p>
              <div className="w-10 h-1 bg-white/20 rounded-full"></div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-700 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
