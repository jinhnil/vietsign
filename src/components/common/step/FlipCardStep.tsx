"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, RotateCcw, Shuffle } from "lucide-react";
import { BaseStepItem } from "./types";

interface FlipCardStepProps {
  step: BaseStepItem;
  onComplete: () => void;
}

interface CardItem {
  id: number;
  type: "video" | "text";
  content: string;
  matchId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export function FlipCardStep({ step, onComplete }: FlipCardStepProps) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [isChecking, setIsChecking] = useState(false);

  const totalPairs = step.flipCards?.length || 0;

  useEffect(() => {
    if (!step.flipCards) return;

    // Create cards from flipCards data
    const videoCards: CardItem[] = step.flipCards.map((item, index) => ({
      id: index * 2,
      type: "video" as const,
      content: item.videoUrl,
      matchId: item.id,
      isFlipped: false,
      isMatched: false,
    }));

    const textCards: CardItem[] = step.flipCards.map((item, index) => ({
      id: index * 2 + 1,
      type: "text" as const,
      content: item.matchText,
      matchId: item.id,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle all cards
    const allCards = [...videoCards, ...textCards].sort(
      () => Math.random() - 0.5,
    );
    setCards(allCards);
  }, [step.flipCards]);

  const handleCardClick = (cardId: number) => {
    if (isChecking) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Flip the card
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)),
    );

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    // Check for match when 2 cards are selected
    if (newSelected.length === 2) {
      setIsChecking(true);
      setAttempts((prev) => prev + 1);

      const [firstId, secondId] = newSelected;
      const firstCard = cards.find((c) => c.id === firstId)!;
      const secondCard = cards.find((c) => c.id === secondId)!;

      setTimeout(() => {
        if (
          firstCard.matchId === secondCard.matchId &&
          firstCard.type !== secondCard.type
        ) {
          // Match found!
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c,
            ),
          );
          setMatchedPairs((prev) => prev + 1);
        } else {
          // No match - flip back
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c,
            ),
          );
        }
        setSelectedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  const handleReset = () => {
    const shuffled = cards
      .map((c) => ({ ...c, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMatchedPairs(0);
    setAttempts(0);
  };

  const isComplete = matchedPairs === totalPairs;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          🎴 Lật mở ô cửa
        </h2>
        <p className="text-sm text-gray-500">
          Tìm và ghép các cặp video ký hiệu với từ tương ứng
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
            Đã ghép: {matchedPairs}/{totalPairs}
          </span>
          <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            Lượt thử: {attempts}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isFlipped || card.isMatched || isChecking}
            className={`aspect-square rounded-xl border-2 transition-all transform perspective-1000 ${
              card.isMatched
                ? "border-green-500 bg-green-50"
                : card.isFlipped
                  ? "border-primary-500 bg-white"
                  : "border-gray-200 bg-gradient-to-br from-primary-100 to-primary-200 hover:shadow-lg hover:scale-105"
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <div className="w-full h-full flex items-center justify-center p-2">
                {card.type === "video" ? (
                  <iframe
                    src={`${card.content}?title=0&byline=0&portrait=0&autoplay=1&loop=1`}
                    className="w-full h-full rounded-lg pointer-events-none"
                    allow="autoplay"
                  />
                ) : (
                  <span className="text-sm md:text-base font-semibold text-gray-800 text-center">
                    {card.content}
                  </span>
                )}
                {card.isMatched && (
                  <div className="absolute top-1 right-1">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-3xl">❓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3 pt-4">
        {!isComplete ? (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <Shuffle size={16} />
            Xáo lại
          </button>
        ) : (
          <div className="text-center space-y-3">
            <div className="p-4 rounded-xl bg-green-100">
              <span className="text-green-800 font-semibold text-lg">
                🎉 Tuyệt vời! Hoàn thành với {attempts} lượt thử!
              </span>
            </div>
            <button
              onClick={onComplete}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Tiếp tục
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
