"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  Video,
  FileText,
  Play,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Download,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { mockClasses, ClassItem, statusConfig } from "@/src/data/classesData";
import { fetchClassById } from "@/src/services/classService";
import { fetchUserById } from "@/src/services/userService";
import { mockOrganizations } from "@/src/data/organizationsData";
import Link from "next/link";

export function StudyDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [classItem, setClassItem] = useState<ClassItem | null>(null);
  const [teacherName, setTeacherName] = useState<string>("Đang tải...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Try fetch from API first
        const fetchedClass = await fetchClassById(id);
        if (fetchedClass) {
          setClassItem(fetchedClass);
          if (fetchedClass.teacherId) {
            const teacher = await fetchUserById(fetchedClass.teacherId);
            setTeacherName(teacher?.name || "Không xác định");
          }
        } else {
          // Fallback to mock
          const found = mockClasses.find((c) => c.id === id);
          setClassItem(found || null);
          if (found) {
            // Mock teacher name fetch
            // In real app we would fetch user by id
            setTeacherName("Cô Nguyễn Thị Lan");
          }
        }
      } catch (error) {
        console.error("Failed to load class", error);
        const found = mockClasses.find((c) => c.id === id);
        setClassItem(found || null);
        setTeacherName("Cô Nguyễn Thị Lan");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const getFacilityName = (facilityId: number | null): string => {
    if (facilityId === null) return "Online";
    const facility = mockOrganizations.find((f) => f.id === facilityId);
    return facility?.name || "Không xác định";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">Đang tải...</div>
    );
  }

  if (!classItem) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Không tìm thấy lớp học
        </h2>
        <button
          onClick={() => router.push("/study")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const statusInfo = statusConfig[classItem.status];
  const progress = Math.round(
    (classItem.students / classItem.maxStudents) * 100
  );

  // Mock sessions
  const sessions = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Buổi ${i + 1}: ${
      i === 0
        ? "Giới thiệu & Làm quen"
        : i === 5
        ? "Kiểm tra giữa kỳ"
        : i === 11
        ? "Tổng kết & Thi cuối kỳ"
        : `Chủ đề bài học ${i}`
    }`,
    date: `Thứ ${2 + (i % 6)}, ${10 + i}/02/2025`,
    time: classItem.schedule.split("-")[1]?.trim() || "19:00",
    type: i % 4 === 0 ? "video" : i % 4 === 1 ? "quiz" : "lesson",
    completed: i < 4,
    documents: i % 3 === 0 ? 2 : 0,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Navigation */}
      <div className="flex items-center">
        <button
          onClick={() => router.push("/study")}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Quay lại lớp học của tôi</span>
        </button>
      </div>

      {/* Class Header Information */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/10">
                  {classItem.level || "Cơ bản"}
                </span>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/10`}
                >
                  {statusInfo.label}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-3 leading-tight">
                {classItem.name}
              </h1>
              <p className="text-primary-100 text-lg mb-6 max-w-2xl">
                {classItem.description ||
                  "Khóa học ngôn ngữ ký hiệu chuyên sâu"}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-primary-200" />
                  <span>GV: {teacherName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary-200" />
                  <span>{getFacilityName(classItem.facilityId)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary-200" />
                  <span>
                    {classItem.startDate} - {classItem.endDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="flex flex-col items-center justify-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10 min-w-[160px]">
              <div className="relative w-24 h-24 mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.51} 251`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{progress}%</span>
                </div>
              </div>
              <span className="text-sm font-medium text-primary-100">
                Tiến độ lớp học
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats/Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
          <div className="p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center justify-center w-10 h-10 mx-auto bg-blue-50 text-blue-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <BookOpen size={20} />
            </div>
            <p className="font-semibold text-gray-900">Giáo trình</p>
            <p className="text-xs text-gray-500">Tài liệu học tập</p>
          </div>
          <div className="p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center justify-center w-10 h-10 mx-auto bg-green-50 text-green-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <Clock size={20} />
            </div>
            <p className="font-semibold text-gray-900">{classItem.schedule}</p>
            <p className="text-xs text-gray-500">Lịch học hàng tuần</p>
          </div>
          <div className="p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center justify-center w-10 h-10 mx-auto bg-purple-50 text-purple-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <User size={20} />
            </div>
            <p className="font-semibold text-gray-900">
              {classItem.students} Học viên
            </p>
            <p className="text-xs text-gray-500">Danh sách lớp</p>
          </div>
          <div className="p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center justify-center w-10 h-10 mx-auto bg-amber-50 text-amber-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <GraduationCap size={20} />
            </div>
            <p className="font-semibold text-gray-900">Điểm số</p>
            <p className="text-xs text-gray-500">Xem bảng điểm</p>
          </div>
        </div>
      </div>

      {/* Curriculum / Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Document & Lessons */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="text-primary-600" size={24} />
            Nội dung khóa học
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className={`p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  index !== sessions.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div
                  className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    session.completed
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {session.completed ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`font-medium ${
                        session.completed ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {session.title}
                    </h3>
                    <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">
                      {session.type === "video"
                        ? "Video"
                        : session.type === "quiz"
                        ? "Bài tập"
                        : "Lý thuyết"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {session.time}
                    </span>
                  </div>

                  {session.documents > 0 && (
                    <div className="mt-3 flex gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg font-medium">
                        <Download size={12} /> {session.documents} Tài liệu
                      </span>
                    </div>
                  )}
                </div>
                <div className="self-center">
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Announcements & Upcoming */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Thông báo lớp học</h3>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-sm text-amber-800 font-medium mb-1">
                  📢 Lịch nghỉ tết
                </p>
                <p className="text-xs text-amber-700">
                  Lớp sẽ nghỉ tết từ ngày 20/01 đến hết 05/02.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-medium mb-1">
                  📝 Bài tập về nhà
                </p>
                <p className="text-xs text-blue-700">
                  Các bạn nhớ hoàn thành bài tập buổi 4 trước thứ 6 nhé.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg p-6 text-white text-center">
            <h3 className="font-bold text-lg mb-2">Buổi học tiếp theo</h3>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Video size={32} className="text-white" />
            </div>
            <p className="text-primary-100 text-sm mb-1">
              Chủ đề: Gia đình & Người thân
            </p>
            <p className="text-2xl font-bold mb-6">19:00 - Thứ 6</p>
            <button className="w-full py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-sm">
              Vào phòng học
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
