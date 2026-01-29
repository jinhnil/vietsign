"use client";

import React, { useState } from "react";
import { VideoPlayer } from "../VideoPlayer";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export type StepType =
  | "vocabulary"
  | "sentence"
  | "match-video-to-text"
  | "quiz-video-to-text"
  | "quiz-text-to-video"
  | "quiz-video-to-image"
  | "quiz-input"
  | "flip-card"
  | "true-false";

export interface BaseStepItem {
  id: number;
  title: string;
  type: StepType;
  description?: string;
  completed?: boolean;
  [key: string]: any;
}

interface StepProps {
  step: BaseStepItem;
  onComplete?: () => void;
}

// Fixed size video container component
const VideoContainer: React.FC<{
  videoUrl: string;
  autoPlay?: boolean;
  loop?: boolean;
  showControls?: boolean;
  size?: "sm" | "md" | "lg";
}> = ({
  videoUrl,
  autoPlay = true,
  loop = true,
  showControls = true,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-32 h-24", // 128x96
    md: "w-80 h-60", // 320x240
    lg: "w-[480px] h-[360px]", // 480x360
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center shadow-lg flex-shrink-0`}
    >
      <VideoPlayer
        videoUrl={videoUrl}
        autoPlay={autoPlay}
        loop={loop}
        showControls={showControls}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

// --- VocabularyStep ---
export const VocabularyStep: React.FC<StepProps> = ({ step }) => (
  <div className="p-6 animate-in fade-in duration-300">
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
      {/* Video with fixed size */}
      <VideoContainer videoUrl={step.videoUrl} size="lg" />

      {/* Info panel */}
      <div className="w-72 flex flex-col gap-4">
        <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-600 font-medium mb-2">Từ vựng</p>
          <p className="text-3xl font-bold text-blue-700">{step.word}</p>
        </div>

        {step.description && (
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm text-sm text-gray-600">
            {step.description}
          </div>
        )}

        <div className="flex items-start gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-xs border border-yellow-100">
          <span>💡</span>
          <span>Quan sát cử chỉ tay và biểu cảm khuôn mặt.</span>
        </div>
      </div>
    </div>
  </div>
);

// --- SentenceStep ---
export const SentenceStep: React.FC<StepProps> = ({ step }) => (
  <div className="p-6 animate-in fade-in duration-300">
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
      {/* Video */}
      <VideoContainer videoUrl={step.videoUrl} size="lg" />

      {/* Info panel */}
      <div className="w-80 flex flex-col gap-4">
        <div className="p-5 bg-green-50 rounded-xl border border-green-100">
          <p className="text-xs text-green-600 font-medium mb-2">Câu mẫu</p>
          <p className="text-2xl font-bold text-green-700">{step.sentence}</p>
        </div>

        {step.words && step.words.length > 0 && (
          <div className="p-4 bg-white rounded-xl border border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-3">
              🧩 Phân tích
            </p>
            <div className="flex flex-wrap gap-2">
              {step.words.map((w: any, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
                >
                  {w.word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- QuizTextToVideoStep ---
export const QuizTextToVideoStep: React.FC<StepProps> = ({
  step,
  onComplete,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedId === null) return;
    const selectedOption = step.options.find((o: any) => o.id === selectedId);
    const correct = selectedOption?.isCorrect || false;
    setSubmitted(true);
    setIsCorrect(correct);
    if (correct && onComplete) setTimeout(onComplete, 1200);
  };

  return (
    <div className="p-6 animate-in fade-in duration-300">
      {/* Question */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500 mb-2">
          Chọn video tương ứng với từ:
        </p>
        <span className="inline-block px-8 py-3 bg-primary-50 text-primary-700 text-2xl font-bold rounded-xl border border-primary-100">
          {step.question}
        </span>
      </div>

      {/* Video options grid - fixed size */}
      <div className="grid grid-cols-2 gap-4 max-w-[680px] mx-auto">
        {step.options.map((option: any) => {
          const isSelected = selectedId === option.id;
          let borderClass = "border-gray-200 hover:border-primary-300";
          if (submitted) {
            if (option.isCorrect)
              borderClass = "ring-4 ring-green-500 border-green-500";
            else if (isSelected)
              borderClass = "ring-4 ring-red-500 border-red-500";
          } else if (isSelected) {
            borderClass = "ring-4 ring-primary-500 border-primary-500";
          }

          return (
            <div
              key={option.id}
              onClick={() => !submitted && setSelectedId(option.id)}
              className={`w-80 h-60 bg-gray-900 rounded-xl overflow-hidden cursor-pointer transition-all border-2 flex items-center justify-center ${borderClass}`}
            >
              <VideoPlayer
                videoUrl={option.videoUrl}
                autoPlay={false}
                loop={true}
                showControls={false}
                className="w-full h-full object-contain"
              />
              {submitted && option.isCorrect && (
                <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                  <CheckCircle size={20} />
                </div>
              )}
              {submitted && isSelected && !option.isCorrect && (
                <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                  <XCircle size={20} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      <div className="flex justify-center mt-6">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedId === null}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              selectedId !== null
                ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Kiểm tra
          </button>
        ) : (
          <div
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {isCorrect ? (
              <>
                <CheckCircle size={20} /> Chính xác!
              </>
            ) : (
              <>
                <AlertCircle size={20} /> Chưa đúng
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- QuizVideoToTextStep ---
export const QuizVideoToTextStep: React.FC<StepProps> = ({
  step,
  onComplete,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedId === null) return;
    const selectedOption = step.options.find((o: any) => o.id === selectedId);
    const correct = selectedOption?.isCorrect || false;
    setSubmitted(true);
    setIsCorrect(correct);
    if (correct && onComplete) setTimeout(onComplete, 1200);
  };

  return (
    <div className="p-6 animate-in fade-in duration-300">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        {/* Video - fixed size */}
        <div className="flex flex-col items-center gap-3">
          <VideoContainer videoUrl={step.questionVideoUrl} size="lg" />
        </div>

        {/* Options panel */}
        <div className="w-72 space-y-3">
          {step.options.map((option: any) => {
            const isSelected = selectedId === option.id;
            let btnClass =
              "bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-300";
            if (submitted) {
              if (option.isCorrect)
                btnClass =
                  "bg-green-50 border-2 border-green-500 text-green-700";
              else if (isSelected)
                btnClass = "bg-red-50 border-2 border-red-500 text-red-700";
              else
                btnClass =
                  "bg-gray-50 border-gray-100 text-gray-400 opacity-50";
            } else if (isSelected) {
              btnClass =
                "bg-primary-50 border-2 border-primary-500 text-primary-700";
            }
            return (
              <button
                key={option.id}
                onClick={() => !submitted && setSelectedId(option.id)}
                disabled={submitted}
                className={`w-full p-4 rounded-xl font-medium text-left transition-all ${btnClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option.text}</span>
                  {submitted && option.isCorrect && (
                    <CheckCircle size={20} className="text-green-600" />
                  )}
                  {submitted && isSelected && !option.isCorrect && (
                    <XCircle size={20} className="text-red-600" />
                  )}
                </div>
              </button>
            );
          })}

          <div className="pt-3">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedId === null}
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                  selectedId !== null
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Kiểm tra
              </button>
            ) : (
              <div
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle size={18} /> Đúng!
                  </>
                ) : (
                  <>
                    <XCircle size={18} /> Sai
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- QuizInputStep ---
export const QuizInputStep: React.FC<StepProps> = ({ step, onComplete }) => {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const correct =
      input.trim().toLowerCase() === step.correctAnswer?.toLowerCase();
    setSubmitted(true);
    setIsCorrect(correct);
    if (correct && onComplete) setTimeout(onComplete, 1200);
  };

  return (
    <div className="p-6 animate-in fade-in duration-300">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        {/* Video */}
        <div className="flex flex-col items-center gap-3">
          <VideoContainer videoUrl={step.questionVideoUrl} size="lg" />
        </div>

        {/* Input panel */}
        <div className="w-72">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (submitted) setSubmitted(false);
                }}
                placeholder="Nhập đáp án..."
                className={`w-full p-4 text-center text-xl font-medium rounded-xl border-2 focus:outline-none transition-all ${
                  submitted
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-primary-500"
                }`}
              />
              {submitted && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                </div>
              )}
            </div>

            {step.hint && !isCorrect && (
              <p className="text-center text-sm text-gray-500">
                Gợi ý: {step.hint}
              </p>
            )}

            <button
              type="submit"
              disabled={!input.trim()}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                input.trim()
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Kiểm tra
            </button>

            {submitted && !isCorrect && (
              <p className="text-center text-red-600 text-sm font-medium">
                Chưa đúng, thử lại!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MatchVideoToTextStep ---
export const MatchVideoToTextStep: React.FC<StepProps> = ({
  step,
  onComplete,
}) => {
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const pairs = step.matchPairs || [];

  const handleVideoClick = (videoId: number) => {
    if (submitted) return;
    setSelectedVideo(videoId);
  };

  const handleTextClick = (textIdx: number) => {
    if (submitted || selectedVideo === null) return;
    setMatches((prev) => ({ ...prev, [selectedVideo]: textIdx }));
    setSelectedVideo(null);
  };

  const checkAnswers = () => {
    setSubmitted(true);
    const allCorrect = pairs.every(
      (p: any, idx: number) => matches[p.id] === idx,
    );
    if (allCorrect && onComplete) setTimeout(onComplete, 1500);
  };

  const isCorrectMatch = (videoId: number, textIdx: number) => {
    const pair = pairs.find((p: any) => p.id === videoId);
    const pairIdx = pairs.indexOf(pair);
    return matches[videoId] === textIdx && pairIdx === textIdx;
  };

  return (
    <div className="p-6 animate-in fade-in duration-300">
      <p className="text-center text-sm text-gray-500 mb-4">
        Nhấn video rồi nhấn từ tương ứng để nối:
      </p>

      <div className="flex gap-8 justify-center items-start">
        {/* Videos column - fixed size */}
        <div className="space-y-3">
          {pairs.map((pair: any) => (
            <div
              key={pair.id}
              onClick={() => handleVideoClick(pair.id)}
              className={`w-40 h-30 bg-gray-900 rounded-xl overflow-hidden cursor-pointer border-2 transition-all flex items-center justify-center ${
                selectedVideo === pair.id
                  ? "ring-3 ring-primary-500 border-primary-500"
                  : matches[pair.id] !== undefined
                    ? "border-green-300 opacity-70"
                    : "border-gray-200 hover:border-primary-300"
              }`}
            >
              <VideoPlayer
                videoUrl={pair.videoUrl}
                autoPlay={false}
                loop={true}
                showControls={false}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Connection indicator */}
        <div className="flex items-center justify-center self-center">
          <div className="w-12 border-t-2 border-dashed border-gray-300"></div>
        </div>

        {/* Text column */}
        <div className="space-y-3">
          {pairs.map((pair: any, idx: number) => {
            const matchedBy = Object.entries(matches).find(
              ([_, v]) => v === idx,
            )?.[0];
            const isMatched = matchedBy !== undefined;
            const correct = submitted && isCorrectMatch(Number(matchedBy), idx);
            const wrong = submitted && isMatched && !correct;

            return (
              <div
                key={idx}
                onClick={() => handleTextClick(idx)}
                className={`w-40 h-30 p-4 rounded-xl text-center font-bold cursor-pointer border-2 transition-all flex items-center justify-center ${
                  wrong
                    ? "border-red-500 bg-red-50 text-red-700"
                    : correct
                      ? "border-green-500 bg-green-50 text-green-700"
                      : isMatched
                        ? "border-primary-300 bg-primary-50 text-primary-700"
                        : "border-gray-200 bg-white hover:border-primary-300"
                }`}
              >
                {pair.matchText}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => {
            setMatches({});
            setSubmitted(false);
          }}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-medium"
        >
          <RotateCcw size={18} /> Làm lại
        </button>
        <button
          onClick={checkAnswers}
          disabled={Object.keys(matches).length < pairs.length}
          className={`px-8 py-2.5 rounded-xl font-bold transition-all ${
            Object.keys(matches).length >= pairs.length
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Kiểm tra
        </button>
      </div>
    </div>
  );
};

// --- FlipCardStep ---
export const FlipCardStep: React.FC<StepProps> = ({ step, onComplete }) => {
  const cards = step.flipCards || [];
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  // Create pairs: video cards and text cards
  const allCards = React.useMemo(() => {
    return [
      ...cards.map((c: any, i: number) => ({
        id: i,
        type: "video",
        content: c.videoUrl,
        matchId: i,
      })),
      ...cards.map((c: any, i: number) => ({
        id: i + cards.length,
        type: "text",
        content: c.matchText,
        matchId: i,
      })),
    ].sort(() => Math.random() - 0.5);
  }, []);

  const handleFlip = (cardIdx: number) => {
    if (
      flipped.length === 2 ||
      matched.includes(cardIdx) ||
      flipped.includes(cardIdx)
    )
      return;

    const newFlipped = [...flipped, cardIdx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const card1 = allCards[first];
      const card2 = allCards[second];

      if (card1.matchId === card2.matchId && card1.type !== card2.type) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
        if (matched.length + 2 === allCards.length && onComplete) {
          setTimeout(onComplete, 1000);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="p-6 animate-in fade-in duration-300">
      <p className="text-center text-sm text-gray-500 mb-4">
        Lật thẻ để tìm cặp video - từ tương ứng:
      </p>

      <div className="grid grid-cols-4 gap-3 max-w-[560px] mx-auto">
        {allCards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => handleFlip(idx)}
              className="w-32 h-24 cursor-pointer"
            >
              {isFlipped ? (
                <div
                  className={`w-full h-full rounded-xl overflow-hidden border-2 ${
                    matched.includes(idx)
                      ? "border-green-500 bg-green-50"
                      : "border-primary-300"
                  }`}
                >
                  {card.type === "video" ? (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <VideoPlayer
                        videoUrl={card.content}
                        autoPlay={true}
                        loop={true}
                        showControls={false}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-2 text-center font-bold text-primary-700 bg-primary-50">
                      {card.content}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md hover:shadow-lg transition-shadow">
                  ?
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4 text-sm text-gray-500">
        Đã ghép: {matched.length / 2} / {cards.length} cặp
      </div>
    </div>
  );
};

// --- TrueFalseStep ---
export const TrueFalseStep: React.FC<StepProps> = ({ step, onComplete }) => {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = answer === step.isTrue;

  const handleSubmit = (choice: boolean) => {
    setAnswer(choice);
    setSubmitted(true);
    if (choice === step.isTrue && onComplete) {
      setTimeout(onComplete, 1200);
    }
  };

  return (
    <div className="p-6 animate-in fade-in duration-300">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        {/* Video */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">
            Video này biểu diễn từ dưới đây đúng hay sai?
          </p>
          <VideoContainer videoUrl={step.statementVideoUrl} size="lg" />
        </div>

        {/* Statement and buttons */}
        <div className="w-72 space-y-4">
          <div className="p-5 bg-gray-100 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-2">Từ được hỏi:</p>
            <p className="text-3xl font-bold text-gray-800">{step.statement}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleSubmit(true)}
              disabled={submitted}
              className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-lg ${
                submitted && answer === true
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              <ThumbsUp size={20} /> Đúng
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={submitted}
              className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-lg ${
                submitted && answer === false
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              <ThumbsDown size={20} /> Sai
            </button>
          </div>

          {submitted && (
            <div
              className={`p-4 rounded-xl text-center font-bold text-lg ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {isCorrect ? "🎉 Chính xác!" : "❌ Sai rồi!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- QuizVideoToImageStep: Placeholder ---
export const QuizVideoToImageStep: React.FC<StepProps> = ({
  step,
  onComplete,
}) => (
  <div className="p-8 text-center text-gray-500">
    <div className="max-w-md mx-auto">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle size={32} className="text-gray-400" />
      </div>
      <p>Tính năng "Video → Hình ảnh" đang được phát triển</p>
    </div>
  </div>
);

export const stepTypeConfig: Record<string, React.FC<StepProps>> = {
  vocabulary: VocabularyStep,
  sentence: SentenceStep,
  "match-video-to-text": MatchVideoToTextStep,
  "quiz-video-to-text": QuizVideoToTextStep,
  "quiz-text-to-video": QuizTextToVideoStep,
  "quiz-video-to-image": QuizVideoToImageStep,
  "quiz-input": QuizInputStep,
  "flip-card": FlipCardStep,
  "true-false": TrueFalseStep,
};

export const stepTypeMeta: Record<string, { label: string; color: string }> = {
  vocabulary: { label: "Từ vựng", color: "bg-blue-100 text-blue-800" },
  sentence: { label: "Câu", color: "bg-green-100 text-green-800" },
  "match-video-to-text": {
    label: "Nối từ",
    color: "bg-purple-100 text-purple-800",
  },
  "quiz-video-to-text": {
    label: "Trắc nghiệm",
    color: "bg-orange-100 text-orange-800",
  },
  "quiz-text-to-video": {
    label: "Chọn video",
    color: "bg-pink-100 text-pink-800",
  },
  "quiz-video-to-image": {
    label: "Chọn hình",
    color: "bg-indigo-100 text-indigo-800",
  },
  "quiz-input": { label: "Gõ từ", color: "bg-red-100 text-red-800" },
  "flip-card": { label: "Lật thẻ", color: "bg-teal-100 text-teal-800" },
  "true-false": { label: "Đúng/Sai", color: "bg-yellow-100 text-yellow-800" },
};
