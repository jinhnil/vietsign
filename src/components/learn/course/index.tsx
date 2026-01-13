"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { learnCategories, LearnItem } from "@/src/data/learnData";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Play,
  CheckCircle2,
  List,
  BarChart,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";

export const CourseDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [course, setCourse] = useState<LearnItem | null>(null);

  useEffect(() => {
    let foundCourse: LearnItem | undefined;
    for (const cat of learnCategories) {
      foundCourse = cat.items.find((item) => item.id === id);
      if (foundCourse) {
        foundCourse = {
          ...foundCourse,
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
        <p className="text-gray-500 text-lg">Đang tải khóa học...</p>
        <button
          onClick={() => router.push("/learn")}
          className="text-primary-600 font-medium flex gap-2"
        >
          <ArrowLeft /> Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Banner */}
      <div
        className={`relative rounded-3xl overflow-hidden p-8 md:p-12 text-white ${
          course.colorClass?.replace("text-", "bg-") || "bg-primary-600"
        }`}
      >
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3 opacity-90">
            <span className="bg-white/20 px-3 py-1 rounded-lg text-sm font-bold uppercase backdrop-blur-sm">
              {course.categoryTitle}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium">
              <Clock size={16} /> {course.duration}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium">
              <BarChart size={16} /> {course.level}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            {course.title}
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed font-medium">
            {course.description || course.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg">
              <Play size={20} className="fill-current" /> Bắt đầu học ngay
            </button>
            <div className="flex items-center gap-4 px-6 py-3 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-transparent"
                  ></div>
                ))}
              </div>
              <span className="font-bold text-sm">
                +{(course.students || 1200).toLocaleString()} học viên
              </span>
            </div>
          </div>
        </div>
        {/* Decorative Background Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Lesson List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <List className="text-primary-600" /> Chương trình học (
              {course.lessonsList?.length || 0} bài)
            </h2>
          </div>

          <div className="space-y-4">
            {course.lessonsList && course.lessonsList.length > 0 ? (
              course.lessonsList.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  onClick={() =>
                    router.push(`/learn/${course.id}/${lesson.id}`)
                  }
                  className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all cursor-pointer flex items-center gap-5"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center font-bold text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-700 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="text-xs font-medium bg-gray-50 px-2 py-1 rounded-md group-hover:bg-white">
                      {lesson.duration || "05:00"}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <Play size={16} className="ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500">
                  Nội dung khóa học đang được cập nhật.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900">Thông tin khóa học</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <Clock size={16} /> Thời lượng
                </span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <BarChart size={16} /> Cấp độ
                </span>
                <span className="font-medium">{course.level}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <Star size={16} /> Đánh giá
                </span>
                <span className="font-medium flex items-center gap-1 text-amber-500">
                  <Star size={14} className="fill-current" />{" "}
                  {course.rating || 4.8}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-50 mt-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-bold text-gray-700">Tiến độ</span>
                  <span className="font-bold text-primary-600">
                    {course.progress || 0}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${course.progress || 0}%` }}
                    className="h-full bg-primary-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
