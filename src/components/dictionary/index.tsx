"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, BookOpen, Mic, Video, Star, ArrowRight, Book } from "lucide-react";

export const Dictionary: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "alphabet", label: "Chữ cái" },
    { id: "numbers", label: "Số đếm" },
    { id: "greetings", label: "Chào hỏi" },
    { id: "daily", label: "Đời sống" },
  ];

  const dictionaryItems = [
    {
      id: 1,
      word: "Xin chào",
      category: "Chào hỏi",
      type: "Phrase",
      image: "https://ui-avatars.com/api/?name=XC&background=3b82f6&color=fff&size=128",
      views: 1250,
      difficulty: "Dễ"
    },
    {
      id: 2,
      word: "Cảm ơn",
      category: "Chào hỏi",
      type: "Phrase",
      image: "https://ui-avatars.com/api/?name=CO&background=10b981&color=fff&size=128",
      views: 980,
      difficulty: "Dễ"
    },
    {
      id: 3,
      word: "Tạm biệt",
      category: "Chào hỏi",
      type: "Phrase",
      image: "https://ui-avatars.com/api/?name=TB&background=ef4444&color=fff&size=128",
      views: 850,
      difficulty: "Dễ"
    },
    {
      id: 4,
      word: "Hẹn gặp lại",
      category: "Chào hỏi",
      type: "Phrase",
      image: "https://ui-avatars.com/api/?name=HG&background=f97316&color=fff&size=128",
      views: 720,
      difficulty: "Trung bình"
    },
    {
      id: 5,
      word: "Chữ A",
      category: "Chữ cái",
      type: "Letter",
      image: "https://ui-avatars.com/api/?name=A&background=8b5cf6&color=fff&size=128",
      views: 500,
      difficulty: "Dễ"
    },
    {
      id: 6,
      word: "Chữ B",
      category: "Chữ cái",
      type: "Letter",
      image: "https://ui-avatars.com/api/?name=B&background=f59e0b&color=fff&size=128",
      views: 480,
      difficulty: "Dễ"
    },
    {
      id: 7,
      word: "Chữ C",
      category: "Chữ cái",
      type: "Letter",
      image: "https://ui-avatars.com/api/?name=C&background=14b8a6&color=fff&size=128",
      views: 450,
      difficulty: "Dễ"
    },
    {
      id: 8,
      word: "Gia đình",
      category: "Đời sống",
      type: "Noun",
      image: "https://ui-avatars.com/api/?name=GD&background=ec4899&color=fff&size=128",
      views: 1500,
      difficulty: "Trung bình"
    },
    {
      id: 9,
      word: "Cha mẹ",
      category: "Đời sống",
      type: "Noun",
      image: "https://ui-avatars.com/api/?name=CM&background=6366f1&color=fff&size=128",
      views: 1300,
      difficulty: "Trung bình"
    },
    {
      id: 10,
      word: "Yêu",
      category: "Cảm xúc",
      type: "Verb",
      image: "https://ui-avatars.com/api/?name=Y&background=ef4444&color=fff&size=128",
      views: 2100,
      difficulty: "Dễ"
    },
    {
      id: 11,
      word: "Vui vẻ",
      category: "Cảm xúc",
      type: "Adjective",
      image: "https://ui-avatars.com/api/?name=VV&background=eab308&color=fff&size=128",
      views: 1100,
      difficulty: "Trung bình"
    },
    {
      id: 12,
      word: "Số 1",
      category: "Số đếm",
      type: "Number",
      image: "https://ui-avatars.com/api/?name=1&background=06b6d4&color=fff&size=128",
      views: 600,
      difficulty: "Dễ"
    },
  ];

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
    const matchesCategory = activeTab === "all" ||
      (activeTab === "alphabet" && item.category === "Chữ cái") ||
      (activeTab === "numbers" && item.category === "Số đếm") ||
      (activeTab === "greetings" && item.category === "Chào hỏi") ||
      (activeTab === "daily" && item.category === "Đời sống");

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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl relative overflow-visible z-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-blue-100 font-medium mb-1 flex items-center gap-2">
              <BookOpen size={18} />
              Tra cứu ký hiệu
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
              Từ Điển ASL
            </h1>
            <p className="text-blue-100 max-w-lg text-lg">
              Kho tàng ngôn ngữ ký hiệu với hàng ngàn video và hình ảnh minh họa sống động.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-auto min-w-[320px] relative" ref={wrapperRef}>
            <div className="relative group">
              <input
                type="text"
                placeholder="Nhập từ cần tra..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:bg-white focus:text-gray-900 focus:border-white transition-all shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200 group-focus-within:text-gray-500 transition-colors" size={24} />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="p-2 hover:bg-white/20 rounded-xl transition-colors text-blue-100 group-focus-within:text-gray-500 group-focus-within:hover:text-blue-600 group-focus-within:hover:bg-blue-50" title="Tìm bằng giọng nói">
                  <Mic size={20} />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-xl transition-colors text-blue-100 group-focus-within:text-gray-500 group-focus-within:hover:text-blue-600 group-focus-within:hover:bg-blue-50" title="Tìm bằng hình ảnh">
                  <Video size={20} />
                </button>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between">
                    <span>Gợi ý tìm kiếm</span>
                    <span className="text-gray-400 font-normal">{suggestions.length} kết quả</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSuggestionClick(item.word)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                      >
                        <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                          <Search size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            <HighlightedText text={item.word} highlight={searchQuery} />
                          </p>
                          <p className="text-xs text-gray-500">{item.category} • {item.type}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.word}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white/80 backdrop-blur rounded-full text-yellow-500 shadow-sm hover:bg-white transition-colors">
                    <Star size={18} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur rounded-lg text-white text-xs font-medium">
                    {item.difficulty}
                  </span>
                </div>
              </div>

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
