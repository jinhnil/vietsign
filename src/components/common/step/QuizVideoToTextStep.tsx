"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { BaseStepItem } from "./types";
import { VideoPlayer } from "@/src/components/common/VideoPlayer";

interface QuizVideoToTextStepProps {
  step: BaseStepItem;
  onComplete: () => void;
}

export function QuizVideoToTextStep({
  step,
  onComplete,
}: QuizVideoToTextStepProps) {
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
      {/* Left: Video Section - 2/3 width */}
      <div className="lg:w-2/3 p-4 flex flex-col">
        <div className="text-center mb-3">
          <p className="text-sm text-gray-500">Xem video và chọn đáp án đúng</p>
        </div>
        <VideoPlayer
          videoUrl={step.questionVideoUrl || ""}
          autoPlay={true}
          loop={true}
          className="flex-1 min-h-[280px]"
        />
      </div>

      {/* Right: Options Section - 1/3 width */}
      <div className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100 flex flex-col justify-center">
        <div className="space-y-4">
          {/* Options */}
          <div className="space-y-2">
            {step.options?.map((option, index) => {
              const isSelected = selectedOption === option.id;
              const optionCorrect = option.isCorrect;

              let bgClass =
                "bg-white hover:bg-primary-50 border-gray-200 hover:border-primary-300";
              let textClass = "text-gray-700";

              if (showResult && isSelected) {
                bgClass = optionCorrect
                  ? "bg-green-100 border-green-500 ring-2 ring-green-200"
                  : "bg-red-100 border-red-500 ring-2 ring-red-200";
                textClass = optionCorrect ? "text-green-800" : "text-red-800";
              } else if (showResult && optionCorrect) {
                bgClass = "bg-green-100 border-green-500";
                textClass = "text-green-800";
              }

              const labels = ["A", "B", "C", "D"];

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showResult}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all w-full ${bgClass}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      showResult && (isSelected || optionCorrect)
                        ? optionCorrect
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {labels[index]}
                  </div>
                  <span className={`font-medium text-sm ${textClass}`}>
                    {option.text}
                  </span>

                  {showResult && isSelected && (
                    <div className="ml-auto">
                      {optionCorrect ? (
                        <CheckCircle className="text-green-500" size={18} />
                      ) : (
                        <XCircle className="text-red-500" size={18} />
                      )}
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
                <div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <XCircle className="text-red-600" size={20} />
                    <span className="text-red-800 font-semibold">
                      Chưa đúng!
                    </span>
                  </div>
                  <p className="text-red-700 text-xs">
                    Đáp án:{" "}
                    <strong>
                      {step.options?.find((o) => o.isCorrect)?.text}
                    </strong>
                  </p>
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
