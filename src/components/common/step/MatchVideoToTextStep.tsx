"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, X, RotateCcw, Link2 } from "lucide-react";
import { BaseStepItem } from "./types";

interface MatchVideoToTextStepProps {
  step: BaseStepItem;
  onComplete: () => void;
}

interface MatchItem {
  id: number;
  videoUrl: string;
  matchText?: string;
}

export function MatchVideoToTextStep({
  step,
  onComplete,
}: MatchVideoToTextStepProps) {
  const [matches, setMatches] = useState<Record<number, number | null>>({});
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledTexts, setShuffledTexts] = useState<MatchItem[]>([]);

  const items: MatchItem[] = (step.matchPairs || []).map((item) => ({
    id: item.id,
    videoUrl: item.videoUrl,
    matchText: item.matchText || "",
  }));

  useEffect(() => {
    // Shuffle text options
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledTexts(shuffled);
  }, [step.matchPairs]);

  const handleVideoClick = (videoId: number) => {
    if (showResult) return;
    setSelectedVideo(videoId);
  };

  const handleTextClick = (textId: number) => {
    if (showResult || selectedVideo === null) return;

    // Check if this text is already matched
    const existingMatch = Object.entries(matches).find(([, v]) => v === textId);
    if (existingMatch) {
      // Remove existing match
      const newMatches = { ...matches };
      delete newMatches[Number(existingMatch[0])];
      setMatches(newMatches);
    }

    // Create new match
    setMatches((prev) => ({ ...prev, [selectedVideo]: textId }));
    setSelectedVideo(null);
  };

  const handleCheck = () => {
    setShowResult(true);
  };

  const handleRetry = () => {
    setMatches({});
    setSelectedVideo(null);
    setShowResult(false);
  };

  const allMatched = Object.keys(matches).length === items.length;
  const correctCount = items.filter(
    (item) => matches[item.id] === item.id,
  ).length;
  const isAllCorrect = correctCount === items.length;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          Nối kí hiệu với từ tương ứng
        </h2>
        <p className="text-sm text-gray-500">
          Nhấn vào video, sau đó nhấn vào từ tương ứng để ghép cặp
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Videos Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 text-center mb-3">
            Video ký hiệu
          </h3>
          {items.map((item) => {
            const isMatched = matches[item.id] !== undefined;
            const isSelected = selectedVideo === item.id;
            const isCorrect = showResult && matches[item.id] === item.id;
            const isWrong =
              showResult &&
              matches[item.id] !== undefined &&
              matches[item.id] !== item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleVideoClick(item.id)}
                disabled={showResult}
                className={`w-full aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                  isSelected
                    ? "border-primary-500 ring-2 ring-primary-200"
                    : isCorrect
                      ? "border-green-500"
                      : isWrong
                        ? "border-red-500"
                        : isMatched
                          ? "border-blue-400"
                          : "border-gray-200 hover:border-primary-300"
                }`}
              >
                <iframe
                  src={`${item.videoUrl}?title=0&byline=0&portrait=0`}
                  className="w-full h-full pointer-events-none"
                />
              </button>
            );
          })}
        </div>

        {/* Texts Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 text-center mb-3">
            Từ tương ứng
          </h3>
          {shuffledTexts.map((item) => {
            const isMatched = Object.values(matches).includes(item.id);
            const matchedVideoId = Object.entries(matches).find(
              ([, v]) => v === item.id,
            )?.[0];
            const isCorrect =
              showResult &&
              matchedVideoId &&
              Number(matchedVideoId) === item.id;
            const isWrong =
              showResult &&
              matchedVideoId &&
              Number(matchedVideoId) !== item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTextClick(item.id)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 font-medium transition-all text-center ${
                  isCorrect
                    ? "border-green-500 bg-green-50 text-green-700"
                    : isWrong
                      ? "border-red-500 bg-red-50 text-red-700"
                      : isMatched
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                }`}
              >
                {item.matchText}
                {isMatched && !showResult && (
                  <Link2 size={14} className="inline ml-2 text-blue-500" />
                )}
                {isCorrect && <CheckCircle size={14} className="inline ml-2" />}
                {isWrong && <X size={14} className="inline ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3 pt-4">
        {!showResult ? (
          <button
            onClick={handleCheck}
            disabled={!allMatched}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all ${
              allMatched
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Kiểm tra
          </button>
        ) : (
          <div className="text-center space-y-3">
            <div
              className={`p-4 rounded-xl ${isAllCorrect ? "bg-green-100" : "bg-amber-100"}`}
            >
              {isAllCorrect ? (
                <span className="text-green-800 font-semibold">
                  🎉 Chính xác! {correctCount}/{items.length}
                </span>
              ) : (
                <span className="text-amber-800 font-semibold">
                  Đúng {correctCount}/{items.length} cặp
                </span>
              )}
            </div>
            <div className="flex gap-2 justify-center">
              {!isAllCorrect && (
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <RotateCcw size={16} />
                  Thử lại
                </button>
              )}
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
