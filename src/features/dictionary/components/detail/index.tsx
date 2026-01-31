"use client";

import React from "react";
import { ArrowLeft, Star, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { dictionaryItems } from "@/data";
import { useParams, useRouter } from "next/navigation";
import { VideoPlayer } from "@/shared/components/common";

export const DictionaryDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const item = dictionaryItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Không tìm thấy từ này
        </h2>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại từ điển
        </button>
      </div>
    );
  }

  // Lấy các từ liên quan (cùng category)
  const relatedItems = dictionaryItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  // Lấy từ trước và sau dựa trên ID
  const prevItem = dictionaryItems.find((i) => i.id === id - 1);
  const nextItem = dictionaryItems.find((i) => i.id === id + 1);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push(`/vocabularies`)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Quay lại</span>
        </button>

        <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/home" className="hover:text-primary-600">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/vocabularies" className="hover:text-primary-600">
            Từ điển
          </Link>
          <span>/</span>
          <span className="text-gray-900">{item.word}</span>
        </nav>
      </div>

      {/* Unified Content Box: Word & Video */}
      <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Media Section: 3/4 Width */}
          <div className="lg:w-3/4">
            {item.videoUrl ? (
              <VideoPlayer
                key={item.id}
                videoUrl={item.videoUrl}
                title={item.word}
                autoPlay={true}
                loop={true}
                showControls={true}
                height="600px"
                className="rounded-none lg:rounded-l-[40px]"
              />
            ) : item.imageUrl ? (
              <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.word}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-[600px] flex items-center justify-center text-gray-400 font-medium bg-gray-900">
                <div className="text-center">
                  <p>Không có video hoặc hình ảnh minh họa</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Section: 1/4 Width */}
          <div className="lg:w-1/4 p-10 bg-white flex flex-col justify-between relative overflow-hidden border-l border-gray-100">
            <div className="space-y-10 relative z-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">
                  {item.category}
                </div>

                <div>
                  <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-2 italic">
                    {item.word}
                  </h1>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    Từ vựng phổ biến trong bộ ngôn ngữ ký hiệu chủ đề{" "}
                    {item.category}.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-10 relative z-10">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-primary-600 text-white rounded-[24px] hover:bg-primary-700 transition-all font-black shadow-2xl shadow-primary-600/30 active:scale-95 text-sm uppercase tracking-widest">
                <Star size={20} className="fill-current" />
                <span>Yêu thích</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-4 text-gray-400 hover:text-gray-900 transition-all font-bold text-sm">
                <Share2 size={20} />
                <span>Chia sẻ từ này</span>
              </button>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Navigation: Previous / Next Word */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {prevItem ? (
          <Link
            href={`/vocabularies/${prevItem.id}`}
            className="group relative overflow-hidden bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300"
          >
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                <ArrowLeft
                  size={28}
                  className="text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1 group-hover:text-primary-600 transition-colors">
                  Trước đó
                </span>
                <span className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  {prevItem.word}
                </span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        ) : (
          <div />
        )}

        {nextItem ? (
          <Link
            href={`/vocabularies/${nextItem.id}`}
            className="group relative overflow-hidden bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 text-right"
          >
            <div className="relative z-10 flex items-center justify-end gap-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1 group-hover:text-primary-600 transition-colors">
                  Tiếp theo
                </span>
                <span className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  {nextItem.word}
                </span>
              </div>
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                <ArrowRight
                  size={28}
                  className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
