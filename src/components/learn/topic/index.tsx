"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  getSelfLearnCourseById,
  getTopicById,
  getLessonsByTopicId,
  SelfLearnCourse,
  SelfLearnTopic,
  SelfLearnLesson,
} from "@/src/data/selfLearnData";
import Link from "next/link";

export function TopicDetail() {
  const params = useParams();
  const router = useRouter();
  const courseId = Number(params.id);
  const topicId = Number(params.topicId);

  const [course, setCourse] = useState<SelfLearnCourse | null>(null);
  const [topic, setTopic] = useState<SelfLearnTopic | null>(null);
  const [lessons, setLessons] = useState<SelfLearnLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const foundCourse = getSelfLearnCourseById(courseId);
        setCourse(foundCourse || null);

        const foundTopic = getTopicById(topicId);
        setTopic(foundTopic || null);

        if (foundTopic) {
          const topicLessons = getLessonsByTopicId(topicId);
          setLessons(topicLessons);
        }
      } catch (error) {
        console.error("Failed to load topic", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [courseId, topicId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">Đang tải...</div>
    );
  }

  if (!topic || !course) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Không tìm thấy chủ đề
        </h2>
        <button
          onClick={() => router.push(`/learn/${courseId}`)}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại khóa học
        </button>
      </div>
    );
  }

  const completedLessons = lessons.filter((l) => l.completed).length;
  const progress = Math.round((completedLessons / lessons.length) * 100) || 0;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push(`/learn/${courseId}`)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors font-medium group"
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

      {/* Topic Header */}
      <div
        className={`${course.colorClass} rounded-2xl p-6 mb-6 text-white relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 opacity-10 blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
              <p className="text-white/80">{topic.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
              <BookOpen size={14} />
              <span>{lessons.length} bài học</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/80">Tiến độ</span>
              <span className="font-semibold">
                {completedLessons}/{lessons.length} bài
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Danh sách bài học</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/learn/${courseId}/${topicId}/${lesson.id}`}
              className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group"
            >
              {/* Lesson Number */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                  lesson.completed
                    ? "bg-green-100 text-green-600"
                    : "bg-primary-50 text-primary-600"
                }`}
              >
                {lesson.completed ? <CheckCircle size={20} /> : index + 1}
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {lesson.description}
                </p>
              </div>

              {/* Duration & Arrow */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Clock size={14} />
                  <span>{lesson.duration}</span>
                </div>
                <ChevronRight
                  size={20}
                  className="text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Start Learning Button */}
      {lessons.length > 0 && (
        <div className="mt-6 text-center">
          <Link
            href={`/learn/${courseId}/${topicId}/${
              lessons.find((l) => !l.completed)?.id || lessons[0].id
            }`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold shadow-lg shadow-primary-600/25"
          >
            <Play size={20} fill="white" />
            {completedLessons > 0 ? "Tiếp tục học" : "Bắt đầu học"}
          </Link>
        </div>
      )}
    </div>
  );
}
