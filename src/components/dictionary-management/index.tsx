"use client";

import { Library, Search, Plus, Edit, Trash2, Video, Eye, Filter } from "lucide-react";
import { useState } from "react";
import { dictionaryItems } from "@/src/data";


export function DictionaryManagementComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredWords = dictionaryItems.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || word.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Library className="w-8 h-8 text-primary-600" />
            Quản lý từ điển
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các từ và video ký hiệu</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium shadow-sm">
          <Plus size={20} /> Thêm từ mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Tìm kiếm từ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white">
              <option value="all">Tất cả danh mục</option>
              <option value="Chào hỏi">Chào hỏi</option>
              <option value="Giáo dục">Giáo dục</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
            {filteredWords.map((word) => (
              <tr key={word.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center"><Video className="w-5 h-5 text-primary-600" /></div>
                    <span className="font-medium text-gray-900">{word.word}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{word.category}</td>
                <td className="px-6 py-4"><div className="flex items-center gap-1 text-sm text-gray-600"><Eye size={16} />{word.views}</div></td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${word.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {word.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Edit size={18} /></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
