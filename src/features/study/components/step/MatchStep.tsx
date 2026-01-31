"use client";

import React, { useState, useEffect } from "react";
import { StepItem } from "@/data/lessonsData";
import { Check, X } from "lucide-react";

interface MatchStepProps {
  step: StepItem;
}

export function MatchStep({ step }: MatchStepProps) {
  // Xác định chế độ chơi: Nối Video-Hình ảnh hay Video-Từ vựng
  const isImageMode = step.type === "match-video-image";

  // State lưu trữ danh sách các item bên trái (video) và bên phải (hình/chữ)
  const [leftItems, setLeftItems] = useState<any[]>([]);
  const [rightItems, setRightItems] = useState<any[]>([]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null); // ID của video bên trái đang được chọn
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]); // Danh sách ID các cặp đã ghép đúng
  const [wrongPair, setWrongPair] = useState<{
    left: number;
    right: number;
  } | null>(null); // Lưu cặp vừa ghép sai để hiển thị hiệu ứng

  // Khởi tạo và xáo trộn danh sách khi component mount
  useEffect(() => {
    if (step.matchPairs) {
      // Clone và xáo trộn mảng để hiển thị ngẫu nhiên
      const left = [...step.matchPairs].sort(() => Math.random() - 0.5);
      const right = [...step.matchPairs].sort(() => Math.random() - 0.5);
      setLeftItems(left);
      setRightItems(right);
    }
  }, [step]);

  // Xử lý khi click vào ô bên trái (Video)
  const handleLeftClick = (id: number) => {
    // Nếu ô này đã được ghép đúng thì bỏ qua
    if (matchedPairs.includes(id)) return;

    // Chọn ô này và xóa trạng thái sai (nếu có)
    setSelectedLeft(id);
    setWrongPair(null);
  };

  // Xử lý khi click vào ô bên phải (Hình/Chữ)
  const handleRightClick = (id: number) => {
    // Nếu ô này đã được ghép đúng thì bỏ qua
    if (matchedPairs.includes(id)) return;

    if (selectedLeft) {
      if (selectedLeft === id) {
        // Ghép đúng: Thêm ID vào danh sách đã ghép và bỏ chọn
        setMatchedPairs([...matchedPairs, id]);
        setSelectedLeft(null);
      } else {
        // Ghép sai: Hiển thị hiệu ứng sai tạm thời
        setWrongPair({ left: selectedLeft, right: id });
        setTimeout(() => setWrongPair(null), 1000); // Xóa hiệu ứng sai sau 1s
        setSelectedLeft(null);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2 text-primary-900">
          {step.title}
        </h3>
        <p className="text-gray-500">
          Chọn một video ở cột trái và chọn{" "}
          {isImageMode ? "hình ảnh" : "từ vựng"} tương ứng ở cột phải.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-5xl mx-auto">
        {/* Left Column: Videos */}
        <div className="flex-1 space-y-4">
          {leftItems.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            const isSelected = selectedLeft === item.id;
            const isWrong = wrongPair?.left === item.id;

            return (
              <div
                key={`left-${item.id}`}
                onClick={() => handleLeftClick(item.id)}
                className={`
                    message-bubble relative p-2 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${isMatched ? "border-green-500 bg-green-50 opacity-50 grayscale" : ""}
                    ${isSelected ? "border-primary-500 ring-4 ring-primary-100 bg-primary-50 scale-[1.02]" : "border-gray-200 bg-white hover:border-primary-300"}
                    ${isWrong ? "border-red-500 bg-red-50 animate-shake" : ""}
                 `}
              >
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative pointer-events-none">
                  <video
                    src={item.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                </div>
                {isMatched && (
                  <div className="absolute inset-0 flex items-center justify-center text-green-600 font-bold bg-white/50 rounded-xl">
                    <Check size={32} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Images or Words */}
        <div className="flex-1 space-y-4">
          {rightItems.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            const isWrong = wrongPair?.right === item.id;

            return (
              <div
                key={`right-${item.id}`}
                onClick={() => handleRightClick(item.id)}
                className={`
                    relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-center min-h-[100px]
                    ${isMatched ? "border-green-500 bg-green-50 opacity-50 grayscale" : ""}
                    ${!isMatched && !isWrong ? "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md" : ""}
                    ${isWrong ? "border-red-500 bg-red-50 animate-shake" : ""}
                 `}
              >
                {isImageMode ? (
                  <img
                    src={item.targetUrl}
                    alt="Target"
                    className="w-full h-32 object-contain rounded-lg pointer-events-none"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-800 pointer-events-none">
                    {item.targetText}
                  </span>
                )}
                {isMatched && (
                  <div className="absolute inset-0 flex items-center justify-center text-green-600 font-bold bg-white/50 rounded-xl">
                    <Check size={32} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
