import React from "react";

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

export const VocabularyStep: React.FC<StepProps> = ({ step }) => (
  <div>Vocabulary Step: {step.title}</div>
);
export const SentenceStep: React.FC<StepProps> = ({ step }) => (
  <div>Sentence Step: {step.title}</div>
);
export const QuizTextToVideoStep: React.FC<StepProps> = ({
  step,
  onComplete,
}) => (
  <div>
    Quiz Text To Video: {step.title}
    <button onClick={onComplete}>Complete</button>
  </div>
);
export const QuizVideoToTextStep: React.FC<StepProps> = ({
  step,
  onComplete,
}) => (
  <div>
    Quiz Video To Text: {step.title}
    <button onClick={onComplete}>Complete</button>
  </div>
);
export const QuizInputStep: React.FC<StepProps> = ({ step, onComplete }) => (
  <div>
    Quiz Input: {step.title}
    <button onClick={onComplete}>Complete</button>
  </div>
);
export const QuizVideoToImageStep: React.FC<StepProps> = ({
  step,
  onComplete,
}) => (
  <div>
    Quiz Video To Image: {step.title}
    <button onClick={onComplete}>Complete</button>
  </div>
);
export const MatchVideoToTextStep: React.FC<StepProps> = ({
  step,
  onComplete,
}) => (
  <div>
    Match Video To Text: {step.title}
    <button onClick={onComplete}>Complete</button>
  </div>
);
export const FlipCardStep: React.FC<StepProps> = ({ step, onComplete }) => (
  <div>
    Flip Card: {step.title}
    <button onClick={onComplete}>Complete</button>
  </div>
);
export const TrueFalseStep: React.FC<StepProps> = ({ step, onComplete }) => (
  <div>
    True False: {step.title}
    <button onClick={onComplete}>Complete</button>
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
