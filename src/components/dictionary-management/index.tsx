"use client";

import { Library, Search, Plus, Edit, Trash2, Video, Eye, Filter } from "lucide-react";
import { useState } from "react";
import { dictionaryItems } from "@/src/data";
import { Pagination, usePagination } from "@/src/components/common/Pagination";
import { Modal } from "@/src/components/common/Modal";

const ITEMS_PER_PAGE = 10;

export function DictionaryManagementComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredWords = dictionaryItems.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || word.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const { currentPage, totalPages, paginatedItems, paddedItems, setCurrentPage } = usePagination(filteredWords, ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Library className="w-8 h-8 text-primary-600" />
            Quản lý từ điển
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các từ và video ký hiệu ({dictionaryItems.length} từ)</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium shadow-sm"
        >
          <Plus size={20} /> Thêm từ mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        {/* ... (bộ lọc giữ nguyên) */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm từ..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)} 
              className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white min-w-[160px] transition-all focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tất cả danh mục</option>
              {Array.from(new Set(dictionaryItems.map(w => w.category))).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Từ</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Danh mục</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Lượt xem</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paddedItems.map((word, index) => (
                word ? (
                  <tr key={word.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                          <Video className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="font-medium text-gray-900">{word.word}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{word.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye size={16} />
                        {word.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${word.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                        {word.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </span>
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

        {filteredWords.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={dictionaryItems.length}
            filteredItems={filteredWords.length}
            itemName="từ"
            onPageChange={setCurrentPage}
          />
        ) : (
          <div className="p-12 text-center">
            <Library className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy từ nào</h3>
            <p className="text-gray-500">Thử tìm kiếm với từ khóa khác hoặc danh mục khác</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thêm từ mới vào từ điển">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Từ ký hiệu</label>
              <input type="text" placeholder="Nhập từ (ví dụ: Xin chào)" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Danh mục</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white" required>
                <option value="Chào hỏi">Chào hỏi</option>
                <option value="Gia đình">Gia đình</option>
                <option value="Hành động">Hành động</option>
                <option value="Đồ vật">Đồ vật</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Mức độ</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white">
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Video URL (YouTube/Drive)</label>
              <input type="url" placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" required />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Mô tả ký hiệu</label>
              <textarea placeholder="Giải thích cách thực hiện ký hiệu..." rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"></textarea>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Hủy</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm">Thêm từ điển</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

