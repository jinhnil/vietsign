"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { BaseStepItem } from "./types";
import { VideoPlayer } from "@/src/components/common/VideoPlayer";

interface SentenceStepProps {
  step: BaseStepItem;
}

export function SentenceStep({ step }: SentenceStepProps) {
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    videoUrl: string;
  } | null>(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-[400px]">
      {/* Left: Video Section - 2/3 width */}
      <div className="lg:w-2/3 p-4 flex flex-col">
        <VideoPlayer
          videoUrl={step.videoUrl || ""}
          title={step.sentence}
          autoPlay={true}
          loop={true}
          className="flex-1 min-h-[280px]"
        />
      </div>

      {/* Right: Words Section - 1/3 width */}
      <div className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100 flex flex-col justify-center">
        <div className="space-y-4">
          {/* Title */}
          <div className="text-center lg:text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Cấu trúc câu
            </h2>
            <p className="text-sm text-gray-500">
              Nhấn vào từ để xem video riêng
            </p>
          </div>

          {/* Sentence Display with / separator */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-center text-xl font-semibold text-gray-800">
              {step.words?.map((wordItem, index) => (
                <span key={index}>
                  <button
                    onClick={() => setSelectedWord(wordItem)}
                    className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                  >
                    {wordItem.word}
                  </button>
                  {index < (step.words?.length || 0) - 1 && (
                    <span className="text-gray-400 mx-2">/</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Word Cards - compact grid */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {step.words?.map((wordItem, index) => (
              <button
                key={index}
                onClick={() => setSelectedWord(wordItem)}
                className="group relative px-4 py-2 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-lg hover:border-primary-400 hover:shadow-md transition-all text-sm"
              >
                <span className="font-medium text-primary-700 group-hover:text-primary-800">
                  {wordItem.word}
                </span>
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={10} fill="white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Word Video Modal */}
      {selectedWord && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg">
                Từ vựng: {selectedWord.word}
              </h3>
              <button
                onClick={() => setSelectedWord(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <VideoPlayer
                videoUrl={selectedWord.videoUrl}
                title={selectedWord.word}
                autoPlay={true}
                loop={true}
                className="w-full"
                aspectRatio="16/9"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
