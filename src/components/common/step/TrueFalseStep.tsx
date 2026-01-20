"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { BaseStepItem } from "./types";
import { VideoPlayer } from "@/src/components/common/VideoPlayer";

interface TrueFalseStepProps {
  step: BaseStepItem;
  onComplete: () => void;
}

export function TrueFalseStep({ step, onComplete }: TrueFalseStepProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === step.isTrue;

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[400px]">
      {/* Left: Video/Image Section - 2/3 width */}
      <div className="lg:w-2/3 p-4 flex flex-col">
        <div className="text-center mb-3">
          <p className="text-sm text-gray-500">
            Video ký hiệu này có nghĩa là:
          </p>
          <h2 className="text-2xl font-bold text-primary-600 mt-2">
            &ldquo;{step.statement}&rdquo;
          </h2>
        </div>
        <VideoPlayer
          videoUrl={step.statementVideoUrl || step.questionVideoUrl || ""}
          autoPlay={true}
          loop={true}
          className="flex-1 min-h-[280px]"
        />
      </div>

      {/* Right: True/False Options - 1/3 width */}
      <div className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100 flex flex-col justify-center">
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-800">Đúng hay Sai?</h3>
          </div>

          {/* True/False Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleAnswer(true)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                showResult && selectedAnswer === true
                  ? isCorrect
                    ? "border-green-500 bg-green-100 text-green-700"
                    : "border-red-500 bg-red-100 text-red-700"
                  : showResult && step.isTrue === true
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white hover:border-green-400 hover:bg-green-50 text-gray-700"
              }`}
            >
              <CheckCircle size={24} />
              ĐÚNG
            </button>

            <button
              onClick={() => handleAnswer(false)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                showResult && selectedAnswer === false
                  ? isCorrect
                    ? "border-green-500 bg-green-100 text-green-700"
                    : "border-red-500 bg-red-100 text-red-700"
                  : showResult && step.isTrue === false
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white hover:border-red-400 hover:bg-red-50 text-gray-700"
              }`}
            >
              <XCircle size={24} />
              SAI
            </button>
          </div>

          {/* Result Feedback */}
          {showResult && (
            <div
              className={`p-4 rounded-xl text-center mt-4 ${
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
                    Đáp án đúng: <strong>{step.isTrue ? "ĐÚNG" : "SAI"}</strong>
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
    </div>
  );
}
