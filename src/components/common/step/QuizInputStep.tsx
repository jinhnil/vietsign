"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Lightbulb, Send } from "lucide-react";
import { BaseStepItem } from "./types";
import { VideoPlayer } from "@/src/components/common/VideoPlayer";

interface QuizInputStepProps {
  step: BaseStepItem;
  onComplete: () => void;
}

export function QuizInputStep({ step, onComplete }: QuizInputStepProps) {
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    setShowResult(true);
  };

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const isCorrect =
    normalizeText(answer) === normalizeText(step.correctAnswer || "");

  const handleRetry = () => {
    setAnswer("");
    setShowResult(false);
    setShowHint(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[400px]">
      {/* Left: Video Section - 2/3 width */}
      <div className="lg:w-2/3 p-4 flex flex-col">
        <div className="text-center mb-3">
          <p className="text-sm text-gray-500">Xem video và gõ đáp án</p>
        </div>
        <VideoPlayer
          videoUrl={step.questionVideoUrl || ""}
          autoPlay={true}
          loop={true}
          className="flex-1 min-h-[280px]"
        />
      </div>

      {/* Right: Input Section - 1/3 width */}
      <div className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100 flex flex-col justify-center">
        <div className="space-y-4">
          {/* Input Area */}
          {!showResult && (
            <>
              <div>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Nhập từ/câu vào đây..."
                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-center"
                />
              </div>

              <div className="flex flex-col gap-2">
                {step.hint && !showHint && (
                  <button
                    onClick={() => setShowHint(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors font-medium text-sm w-full"
                  >
                    <Lightbulb size={14} />
                    Gợi ý
                  </button>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium transition-all w-full ${
                    answer.trim()
                      ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={14} />
                  Kiểm tra
                </button>
              </div>

              {/* Hint Display */}
              {showHint && step.hint && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
                  <span className="text-amber-700 text-sm">
                    <Lightbulb size={14} className="inline mr-1" />
                    Gợi ý: <strong>{step.hint}</strong>
                  </span>
                </div>
              )}
            </>
          )}

          {/* Result Feedback */}
          {showResult && (
            <div
              className={`p-4 rounded-xl text-center ${
                isCorrect ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isCorrect ? (
                <div className="space-y-2">
                  <CheckCircle className="text-green-600 mx-auto" size={28} />
                  <span className="text-green-800 font-semibold text-lg block">
                    Chính xác! 🎉
                  </span>
                  <span className="text-green-700 text-sm">
                    Đáp án: <strong>{step.correctAnswer}</strong>
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <XCircle className="text-red-600 mx-auto" size={28} />
                  <span className="text-red-800 font-semibold text-lg block">
                    Chưa đúng!
                  </span>
                  <div className="text-red-700 text-sm space-y-1">
                    <p>
                      Bạn: <span className="line-through">{answer}</span>
                    </p>
                    <p>
                      Đáp án: <strong>{step.correctAnswer}</strong>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 mt-4">
                {!isCorrect && (
                  <button
                    onClick={handleRetry}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm w-full"
                  >
                    <RotateCcw size={14} />
                    Thử lại
                  </button>
                )}
                <button
                  onClick={onComplete}
                  className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors text-sm w-full ${
                    isCorrect
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
