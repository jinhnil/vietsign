"use client";

import { Building, Search, Plus, MapPin, Users, Phone, Mail, Edit, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";
import { mockFacilities, facilityStatusConfig } from "@/src/data";

export function FacilitiesManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredFacilities = mockFacilities.filter(facility => 
    facility.name.toLowerCase().includes(searchQuery.toLowerCase()) || facility.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Building className="w-8 h-8 text-primary-600" />
            Quản lý cơ sở
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các cơ sở đào tạo trong hệ thống</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm">
          <Plus size={20} /> Thêm cơ sở mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Tìm kiếm theo tên hoặc địa chỉ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFacilities.map((facility) => {
          const statusInfo = facilityStatusConfig[facility.status] || facilityStatusConfig.inactive;
          return (
            <div key={facility.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                    <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full mt-1 ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><MoreVertical size={20} /></button>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-gray-600"><MapPin size={18} className="text-gray-400 flex-shrink-0 mt-0.5" /><span>{facility.address}</span></div>
                  <div className="flex items-center gap-3 text-gray-600"><Phone size={18} className="text-gray-400" /><span>{facility.phone}</span></div>
                  <div className="flex items-center gap-3 text-gray-600"><Mail size={18} className="text-gray-400" /><span>{facility.email}</span></div>
                </div>
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2"><Users size={18} className="text-primary-500" /><span className="text-sm"><span className="font-semibold text-gray-900">{facility.studentCount}</span><span className="text-gray-500"> học sinh</span></span></div>
                  <div className="flex items-center gap-2"><Users size={18} className="text-green-500" /><span className="text-sm"><span className="font-semibold text-gray-900">{facility.teacherCount}</span><span className="text-gray-500"> giáo viên</span></span></div>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Quản lý:</span>
                  <span className="text-sm font-medium text-gray-900">{facility.manager}</span>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Edit size={16} />Chỉnh sửa</button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} />Xóa</button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFacilities.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy cơ sở</h3>
          <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}
    </div>
  );
}
