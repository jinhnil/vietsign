"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { learnCategories, LearnItem, Lesson } from "@/src/data/learnData";
import {
  ArrowLeft,
  List,
  Info,
  Share2,
  Bookmark,
  Play,
  RotateCcw,
} from "lucide-react";

export const LessonDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = Number(params.id);
  const lessonId = Number(params.lessonId);

  const [course, setCourse] = useState<LearnItem | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "vocabulary">(
    "overview"
  );

  useEffect(() => {
    // Find course
    let foundCourse: LearnItem | undefined;
    for (const cat of learnCategories) {
      foundCourse = cat.items.find((item) => item.id === courseId);
      if (foundCourse) break;
    }
    setCourse(foundCourse || null);

    if (foundCourse && foundCourse.lessonsList) {
      const foundLesson = foundCourse.lessonsList.find(
        (l) => l.id === lessonId
      );
      setLesson(foundLesson || null);
    }
  }, [courseId, lessonId]);

  if (!course || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <p className="text-gray-500 text-lg">Đang tải bài học...</p>
        <button
          onClick={() => router.push(`/learn/${courseId}`)}
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Quay lại khóa học
        </button>
      </div>
    );
  }

  const renderVideo = (url?: string) => {
    if (!url) return <div className="w-full h-full bg-black" />;

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
          title={lesson.title}
        />
      );
    }

    // ... logic same for youtube/native ...
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
          onClick={() => router.push(`/learn/${courseId}`)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Quay lại khóa học</span>
        </button>
        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          {course.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative group">
            {renderVideo(lesson.videoUrl)}
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              {lesson.title}
            </h1>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                <Share2 size={24} />
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-lg leading-relaxed">
            {lesson.description}
          </p>

          {/* Tabs */}
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
                Từ vựng ({lesson.vocabularyList?.length || 0})
              </button>
            </div>
            <div className="pt-4 min-h-[200px]">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Info size={18} /> Nội dung bài học
                  </h3>
                  <p className="text-gray-600">
                    {lesson.description ||
                      "Hãy xem video và làm theo hướng dẫn."}
                  </p>
                </div>
              )}
              {activeTab === "vocabulary" && (
                <div className="space-y-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lesson.vocabularyList?.map((word, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-400 shadow-sm">
                          {idx + 1}
                        </div>
                        <span className="font-medium text-gray-700">
                          {word}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Lesson List in Course */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Danh sách bài học</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {course.lessonsList?.map((l) => (
                <button
                  key={l.id}
                  onClick={() => router.push(`/learn/${courseId}/${l.id}`)}
                  className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${
                    l.id === lessonId
                      ? "bg-primary-50 border-primary-200 border text-primary-700"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      l.id === lessonId
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {l.id}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm line-clamp-1">{l.title}</p>
                    <p className="text-xs opacity-70">{l.duration}</p>
                  </div>
                  {l.id === lessonId && (
                    <Play size={16} className="fill-current" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
