"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Info,
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
} from "lucide-react";
import { mockClasses } from "@/src/data/classesData";
import { mockFacilities } from "@/src/data/facilitiesData";
import { getUserById } from "@/src/data/usersData";
import Link from "next/link";

// Helper to get facility name
const getFacilityName = (facilityId: number | null) => {
  if (facilityId === null) return "Online";
  const facility = mockFacilities.find((f) => f.id === facilityId);
  return facility ? facility.name : "Không xác định";
};

// Helper to get teacher name
const getTeacherName = (teacherId: number) => {
  const teacher = getUserById(teacherId);
  return teacher ? teacher.name : `GV ID: ${teacherId}`;
};

export const Study: React.FC = () => {
  // Simulate registered classes (hardcoded IDs for demo)
  // In a real app, this would come from an API endpoint: GET /user/registrations
  const [registeredClasses, setRegisteredClasses] = useState<any[]>([]);

  useEffect(() => {
    // Picking a few random classes to simulate registration
    // IDs: 1 (A1 - Ongoing), 5 (K1 - Ongoing), 11 (O1 - Ongoing), 3 (C1 - Upcoming)
    const myClassIds = [1, 5, 11, 3];
    const myClasses = mockClasses.filter((c) => myClassIds.includes(c.id));
    setRegisteredClasses(myClasses);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary-600" />
            Lớp học của tôi
          </h1>
          <p className="text-gray-600 mt-1">
            Danh sách các lớp học bạn đã đăng ký ({registeredClasses.length}{" "}
            lớp)
          </p>
        </div>
        <Link
          href="/class-registration"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          Đăng ký lớp mới
          <ChevronRight size={18} />
        </Link>
      </div>

      {/* Class List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registeredClasses.length > 0 ? (
          registeredClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600 p-6 relative">
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/10`}
                  >
                    {cls.level || "Cơ bản"}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-bold text-xl line-clamp-2">
                    {cls.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-primary-500" />
                    <span>GV: {getTeacherName(cls.teacherId)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary-500" />
                    <span>
                      {cls.startDate} - {cls.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-500" />
                    <span>{cls.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary-500" />
                    <span>{getFacilityName(cls.facilityId)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full py-2.5 bg-gray-50 text-primary-600 font-medium rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-2 group-hover:bg-primary-600 group-hover:text-white">
                    Vào lớp học
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có lớp học nào
            </h3>
            <p className="text-gray-500 mb-6">
              Bạn chưa đăng ký lớp học nào. Hãy đăng ký ngay!
            </p>
            <Link
              href="/class-registration"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
            >
              Đăng ký lớp học
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
