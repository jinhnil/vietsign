"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { BaseStepItem } from "./types";
import { VideoPlayer } from "@/src/components/common/VideoPlayer";

interface QuizVideoToImageStepProps {
  step: BaseStepItem;
  onComplete: () => void;
}

export function QuizVideoToImageStep({
  step,
  onComplete,
}: QuizVideoToImageStepProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optionId: number) => {
    if (showResult) return;
    setSelectedOption(optionId);
    setShowResult(true);
  };

  const isCorrect = step.options?.find(
    (o) => o.id === selectedOption,
  )?.isCorrect;

  const handleRetry = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[400px]">
      {/* Left: Video Section - 1/2 width */}
      <div className="lg:w-1/2 p-4 flex flex-col">
        <div className="text-center mb-3">
          <p className="text-sm text-gray-500">
            Xem video và chọn hình ảnh tương ứng
          </p>
        </div>
        <VideoPlayer
          videoUrl={step.questionVideoUrl || ""}
          autoPlay={true}
          loop={true}
          className="flex-1 min-h-[280px]"
        />
      </div>

      {/* Right: Image Options Section - 1/2 width */}
      <div className="lg:w-1/2 p-6 bg-gray-50 border-l border-gray-100 flex flex-col justify-center">
        <div className="space-y-4">
          {/* Image Options Grid */}
          <div className="grid grid-cols-2 gap-3">
            {step.options?.map((option) => {
              const isSelected = selectedOption === option.id;
              const optionCorrect = option.isCorrect;

              let borderClass = "border-gray-200 hover:border-primary-300";
              if (showResult && isSelected) {
                borderClass = optionCorrect
                  ? "border-green-500 ring-2 ring-green-200"
                  : "border-red-500 ring-2 ring-red-200";
              } else if (showResult && optionCorrect) {
                borderClass = "border-green-500";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showResult}
                  className={`relative aspect-square rounded-xl border-2 overflow-hidden transition-all ${borderClass}`}
                >
                  <img
                    src={option.imageUrl || "/placeholder-image.jpg"}
                    alt={option.text || "Option"}
                    className="w-full h-full object-cover"
                  />
                  {showResult && isSelected && (
                    <div
                      className={`absolute inset-0 flex items-center justify-center ${optionCorrect ? "bg-green-500/30" : "bg-red-500/30"}`}
                    >
                      {optionCorrect ? (
                        <CheckCircle className="text-green-600" size={40} />
                      ) : (
                        <XCircle className="text-red-600" size={40} />
                      )}
                    </div>
                  )}
                  {showResult && !isSelected && optionCorrect && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/30">
                      <CheckCircle className="text-green-600" size={40} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <div
              className={`p-4 rounded-xl text-center ${
                isCorrect ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-green-800 font-semibold">
                    Chính xác! 🎉
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <XCircle className="text-red-600" size={20} />
                  <span className="text-red-800 font-semibold">Chưa đúng!</span>
                </div>
              )}

              <div className="flex flex-col gap-2 mt-3">
                {!isCorrect && (
                  <button
                    onClick={handleRetry}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm w-full"
                  >
                    <RotateCcw size={14} />
                    Thử lại
                  </button>
                )}
                {isCorrect && (
                  <button
                    onClick={onComplete}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm w-full"
                  >
                    Tiếp tục
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
