"use client";

import { Users, Search, Plus, Filter, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { mockUsers, roleLabels, roleColors, getFacilityById } from "@/src/data";
import { Pagination, usePagination } from "@/src/components/common/Pagination";
import { Modal } from "@/src/components/common/Modal";

const ITEMS_PER_PAGE = 8;

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const { currentPage, totalPages, paginatedItems, paddedItems, setCurrentPage } = usePagination(filteredUsers, ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary-600" />
            Quản lý người dùng
          </h1>
          <p className="text-gray-600 mt-1">Quản lý tất cả người dùng trong hệ thống</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="ADMIN">Quản trị viên</option>
              <option value="FACILITY_MANAGER">Quản trị viên cơ sở</option>
              <option value="TEACHER">Giáo viên</option>
              <option value="STUDENT">Học sinh</option>
              <option value="USER">Người dùng</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Người dùng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vai trò</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cơ sở</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paddedItems.map((user, index) => (
                user ? (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.facilityId ? getFacilityById(user.facilityId)?.name || `Cơ sở #${user.facilityId}` : 'Tất cả'}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <UserCheck size={14} />
                          Hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <UserX size={14} />
                          Không hoạt động
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={`empty-${index}`} className="h-[73px]">
                    <td colSpan={5}>&nbsp;</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={mockUsers.length}
          filteredItems={filteredUsers.length}
          itemName="người dùng"
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Thêm người dùng mới"
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
              <input type="text" placeholder="Nhập họ và tên" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input type="email" placeholder="email@vietsign.edu.vn" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Vai trò</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white" required>
                <option value="STUDENT">Học sinh</option>
                <option value="TEACHER">Giáo viên</option>
                <option value="FACILITY_MANAGER">Quản lý cơ sở</option>
                <option value="USER">Người dùng tự do</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
              <input type="tel" placeholder="Nhập số điện thoại" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Cơ sở (nếu có)</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white">
                <option value="">Tất cả / Không có</option>
                <option value="1">Cơ sở Hà Nội</option>
                <option value="2">Cơ sở Hồ Chí Minh</option>
                <option value="3">Cơ sở Đà Nẵng</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Hủy</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm">Lưu</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

