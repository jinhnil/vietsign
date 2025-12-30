"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, BookOpen, Mic, Video, Star, ArrowRight, Book } from "lucide-react";
import { dictionaryItems, categories } from "@/src/data";

export const Dictionary: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [filterCategory, setFilterCategory] = useState("all");



  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filteredSuggestions = dictionaryItems.filter(item =>
        item.word.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (word: string) => {
    setSearchQuery(word);
    setShowSuggestions(false);
  };

  const filteredItems = dictionaryItems.filter(item => {
    const categoryMap: { [key: string]: string } = {
      alphabet: "Chữ cái",
      numbers: "Số đếm",
      greetings: "Chào hỏi",
      family: "Gia đình",
      education: "Giáo dục",
      daily: "Đời sống",
      time: "Thời gian",
      emotion: "Cảm xúc",
      location: "Địa điểm",
    };
    
    const matchesCategory = activeTab === "all" || item.category === categoryMap[activeTab];
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const HighlightedText = ({ text, highlight }: { text: string, highlight: string }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 text-gray-900 font-bold px-0.5 rounded-sm">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-[100px]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Tìm kiếm từ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`
                    px-5 py-2.5 rounded-xl font-medium transition-all duration-200 border
                    ${activeTab === cat.id
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }
                `}
          >
            {cat.label}
          </button>
        ))}
        <button className="ml-auto px-5 py-2.5 rounded-xl font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
          <Filter size={18} />
          Bộ lọc nâng cao
        </button>
      </div>

      {/* Dictionary Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.word}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <Book size={20} className="text-gray-300 mb-1" />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
                  <span>{item.views} lượt xem</span>
                  <span className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                    Xem chi tiết <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">Không tìm thấy kết quả nào cho "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Xóa tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
};
