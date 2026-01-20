"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, Play, RotateCcw } from "lucide-react";
import { BaseStepItem } from "./types";

interface QuizTextToVideoStepProps {
  step: BaseStepItem;
  onComplete: () => void;
}

export function QuizTextToVideoStep({
  step,
  onComplete,
}: QuizTextToVideoStepProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

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
    setPlayingVideo(null);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[400px]">
      {/* Left: Question & Video Options - 2/3 width */}
      <div className="lg:w-2/3 p-4 flex flex-col">
        {/* Question */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500 mb-1">Chọn video đúng cho từ:</p>
          <h2 className="text-3xl font-bold text-primary-600">
            {step.question}
          </h2>
        </div>

        {/* Video Options Grid - 2x2 compact */}
        <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto min-h-0">
          {step.options?.map((option, index) => {
            const isSelected = selectedOption === option.id;
            const optionCorrect = option.isCorrect;
            const labels = ["A", "B", "C", "D"];

            // State styles
            let containerClass = "border-gray-200";
            let btnClass =
              "bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200";

            if (showResult) {
              if (isSelected) {
                if (optionCorrect) {
                  containerClass = "border-green-500 ring-2 ring-green-200";
                  btnClass = "bg-green-600 text-white border-green-600";
                } else {
                  containerClass = "border-red-500 ring-2 ring-red-200";
                  btnClass = "bg-red-600 text-white border-red-600";
                }
              } else if (optionCorrect) {
                containerClass = "border-green-500";
                btnClass = "bg-green-100 text-green-800 border-green-200";
              } else {
                btnClass = "opacity-50 grayscale";
              }
            } else if (isSelected) {
              containerClass = "border-primary-500 ring-2 ring-primary-100";
              btnClass = "bg-primary-600 text-white border-primary-600";
            }

            return (
              <div
                key={option.id}
                className={`flex flex-col rounded-xl border-2 overflow-hidden transition-all bg-white ${containerClass}`}
              >
                {/* Video Area */}
                <div className="relative aspect-video bg-black group">
                  {playingVideo !== option.id && (
                    <div
                      className="absolute inset-0 bg-gray-900/40 flex items-center justify-center cursor-pointer z-10 group-hover:bg-gray-900/30 transition-all"
                      onClick={() => setPlayingVideo(option.id)}
                    >
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play
                          size={20}
                          className="text-primary-600 ml-1"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  )}

                  <iframe
                    src={
                      playingVideo === option.id
                        ? `${option.videoUrl}?autoplay=1&loop=1&title=0&byline=0&portrait=0`
                        : `${option.videoUrl}?title=0&byline=0&portrait=0`
                    }
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay"
                  />

                  <div className="absolute top-2 left-2 bg-black/60 text-white w-6 h-6 rounded flex items-center justify-center text-xs font-bold backdrop-blur-sm">
                    {labels[index]}
                  </div>
                </div>

                {/* Selection Button */}
                <button
                  onClick={() => handleSelect(option.id)}
                  disabled={showResult}
                  className={`p-3 font-semibold text-sm transition-all border-t-2 items-center justify-center flex gap-2 ${btnClass}`}
                >
                  {showResult && isSelected ? (
                    optionCorrect ? (
                      <>
                        <CheckCircle size={16} /> Chính xác
                      </>
                    ) : (
                      <>
                        <XCircle size={16} /> Sai rồi
                      </>
                    )
                  ) : (
                    "Chọn đáp án này"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Result Section - 1/3 width */}
      <div className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100 flex flex-col justify-center">
        {!showResult ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">🎯</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Chọn video đúng</h3>
              <p className="text-sm text-gray-500">
                Nhấn nút play để xem video, sau đó chọn video phù hợp với từ
                được yêu cầu
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`p-4 rounded-xl text-center ${
              isCorrect ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isCorrect ? (
              <div className="space-y-2">
                <CheckCircle className="text-green-600 mx-auto" size={32} />
                <span className="text-green-800 font-semibold text-lg block">
                  Chính xác! 🎉
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <XCircle className="text-red-600 mx-auto" size={32} />
                <span className="text-red-800 font-semibold text-lg block">
                  Chưa đúng!
                </span>
                <p className="text-red-700 text-sm">
                  Xem lại video đáp án đúng nhé!
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-4">
              {!isCorrect && (
                <button
                  onClick={handleRetry}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium w-full"
                >
                  <RotateCcw size={16} />
                  Thử lại
                </button>
              )}
              {isCorrect && (
                <button
                  onClick={onComplete}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium w-full"
                >
                  Tiếp tục
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
