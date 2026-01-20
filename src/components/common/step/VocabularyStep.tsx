"use client";

import React from "react";
import { BaseStepItem } from "./types";
import { VideoPlayer } from "@/src/components/common/VideoPlayer";

interface VocabularyStepProps {
  step: BaseStepItem;
}

export function VocabularyStep({ step }: VocabularyStepProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-[400px]">
      {/* Left: Video Section - 2/3 width */}
      <div className="lg:w-2/3 p-4 flex flex-col">
        <VideoPlayer
          videoUrl={step.videoUrl || ""}
          title={step.word}
          autoPlay={true}
          loop={true}
          className="flex-1 min-h-[280px]"
        />
      </div>

      {/* Right: Word Info Section - 1/3 width */}
      <div className="lg:w-1/3 p-6 bg-gray-50 border-l border-gray-100 flex flex-col justify-center">
        <div className="space-y-4">
          {/* Word Display */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {step.word}
            </h2>
            <p className="text-sm text-gray-500">
              Lặp lại nhiều lần để ghi nhớ ký hiệu
            </p>
          </div>

          {/* Description if available */}
          {step.description && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💡</span>
              </div>
              <div>
                <h4 className="font-semibold text-primary-800 text-sm mb-1">
                  Mẹo học
                </h4>
                <p className="text-primary-700 text-xs leading-relaxed">
                  Xem video chậm để quan sát từng chi tiết của ký hiệu, sau đó
                  thực hành theo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
