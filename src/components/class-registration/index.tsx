"use client";

import { UserPlus, Search, Calendar, Clock, Users, MapPin, ChevronRight, CheckCircle } from "lucide-react";
import { useState } from "react";

const mockClasses = [
  { id: 1, name: "Lớp Ký hiệu cơ bản A3", teacher: "Trần Thị Lan", schedule: "Thứ 2, 4, 6 - 9:00", startDate: "01/02/2025", spots: 5, maxSpots: 30, facility: "Cơ sở Hà Nội", registered: false },
  { id: 2, name: "Lớp Ký hiệu nâng cao B3", teacher: "Nguyễn Văn Minh", schedule: "Thứ 3, 5 - 14:00", startDate: "15/02/2025", spots: 8, maxSpots: 20, facility: "Cơ sở HCM", registered: false },
  { id: 3, name: "Lớp Giao tiếp thực hành", teacher: "Lê Thị Hương", schedule: "Thứ 7 - 9:00", startDate: "01/03/2025", spots: 12, maxSpots: 25, facility: "Cơ sở Đà Nẵng", registered: true },
];

export function ClassRegistrationManagement() {
  const [classes, setClasses] = useState(mockClasses);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegister = (id: number) => {
    setClasses(classes.map(cls => 
      cls.id === id ? { ...cls, registered: true, spots: cls.spots - 1 } : cls
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <UserPlus className="w-8 h-8 text-primary-600" />
          Đăng ký lớp học
        </h1>
        <p className="text-gray-600 mt-1">Đăng ký tham gia các lớp học mới</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Tìm kiếm lớp học..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl">
                  {cls.name.split(' ').pop()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                    {cls.registered && <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800"><CheckCircle size={14} />Đã đăng ký</span>}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Giáo viên: {cls.teacher}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" />{cls.schedule}</div>
                    <div className="flex items-center gap-1.5"><Calendar size={16} className="text-gray-400" />Bắt đầu: {cls.startDate}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={16} className="text-gray-400" />{cls.facility}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{cls.spots}/{cls.maxSpots}</p>
                  <p className="text-xs text-gray-500">Chỗ trống</p>
                </div>
                {cls.registered ? (
                  <button disabled className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-xl cursor-not-allowed">
                    Đã đăng ký
                  </button>
                ) : (
                  <button 
                    onClick={() => handleRegister(cls.id)}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-xl hover:bg-primary-700"
                  >
                    Đăng ký <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy lớp học</h3>
          <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}
    </div>
  );
}
