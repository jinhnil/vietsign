"use client";

import { GraduationCap, Search, Plus, BookOpen, Play, Clock, Users, Star, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";

const mockCourses = [
  { id: 1, title: "Ngôn ngữ ký hiệu cơ bản", description: "Học các ký hiệu cơ bản trong giao tiếp hàng ngày", lessons: 24, duration: "12 giờ", students: 1250, rating: 4.8, level: "Cơ bản", status: "published" },
  { id: 2, title: "Ngôn ngữ ký hiệu nâng cao", description: "Nâng cao kỹ năng giao tiếp với các chủ đề phức tạp", lessons: 36, duration: "18 giờ", students: 680, rating: 4.9, level: "Nâng cao", status: "published" },
  { id: 3, title: "Ký hiệu trong môi trường học đường", description: "Các ký hiệu thường dùng trong trường học", lessons: 18, duration: "8 giờ", students: 420, rating: 4.7, level: "Trung bình", status: "published" },
  { id: 4, title: "Ký hiệu trong y tế", description: "Giao tiếp trong môi trường y tế và bệnh viện", lessons: 20, duration: "10 giờ", students: 0, rating: 0, level: "Nâng cao", status: "draft" },
];

const levelColors: Record<string, string> = {
  "Cơ bản": "bg-green-100 text-green-800",
  "Trung bình": "bg-amber-100 text-amber-800",
  "Nâng cao": "bg-purple-100 text-purple-800",
};

import { removeVietnameseTones } from "@/src/utils/text";

import { Modal } from "@/src/components/common/Modal";

export function LearningManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCourses = mockCourses.filter(course => {
    const normalizedQuery = removeVietnameseTones(searchQuery);
    const matchesSearch = removeVietnameseTones(course.title).includes(normalizedQuery);
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary-600" />
            Quản lý học tập
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các khóa học và nội dung học tập</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} /> Tạo khóa học mới
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tạo khóa học mới">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Tên khóa học <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Nhập tên khóa học" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Cấp độ <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white" required>
                <option value="Cơ bản">Cơ bản</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Nâng cao">Nâng cao</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Số bài học <span className="text-red-500">*</span></label>
              <input type="number" placeholder="10" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Thời gian ước tính <span className="text-red-500">*</span></label>
              <input type="text" placeholder="20 giờ" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Trạng thái <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white" required>
                <option value="draft">Bản nháp</option>
                <option value="published">Xuất bản</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Mô tả khóa học <span className="text-red-500">*</span></label>
            <textarea rows={3} placeholder="Mô tả nội dung chính của khóa học..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none" required></textarea>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Hủy</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm">Lưu khóa học</button>
          </div>
        </form>
      </Modal>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center"><BookOpen className="w-6 h-6 text-primary-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{mockCourses.length}</p><p className="text-sm text-gray-500">Khóa học</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"><Play className="w-6 h-6 text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{mockCourses.reduce((acc, c) => acc + c.lessons, 0)}</p><p className="text-sm text-gray-500">Bài học</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center"><Users className="w-6 h-6 text-amber-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{mockCourses.reduce((acc, c) => acc + c.students, 0).toLocaleString()}</p><p className="text-sm text-gray-500">Học viên</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center"><Star className="w-6 h-6 text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">4.8</p><p className="text-sm text-gray-500">Đánh giá TB</p></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Tìm kiếm khóa học..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white">
              <option value="all">Tất cả cấp độ</option>
              <option value="Cơ bản">Cơ bản</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Nâng cao">Nâng cao</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 relative">
              <div className="absolute inset-0 flex items-center justify-center"><BookOpen className="w-16 h-16 text-white/50" /></div>
              <div className="absolute top-3 left-3"><span className={`px-2.5 py-1 text-xs font-medium rounded-full ${levelColors[course.level]}`}>{course.level}</span></div>
              {course.status === "draft" && <div className="absolute top-3 right-3"><span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-800 text-white">Bản nháp</span></div>}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1"><BookOpen size={16} /><span>{course.lessons} bài</span></div>
                <div className="flex items-center gap-1"><Clock size={16} /><span>{course.duration}</span></div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1"><Users size={16} className="text-gray-400" /><span className="text-sm text-gray-600">{course.students.toLocaleString()} học viên</span></div>
                {course.rating > 0 && <div className="flex items-center gap-1"><Star size={16} className="text-amber-400 fill-amber-400" /><span className="text-sm font-medium">{course.rating}</span></div>}
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">Xem chi tiết <ChevronRight size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
