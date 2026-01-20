// Re-export from shared step components for backward compatibility
import { StepItem } from "@/src/data/lessonsData";
import { QuizTextToVideoStep as SharedQuizTextToVideoStep } from "@/src/components/common/step";

interface QuizTextToVideoStepProps {
  step: StepItem;
  onComplete: () => void;
}

export function QuizTextToVideoStep({
  step,
  onComplete,
}: QuizTextToVideoStepProps) {
  return <SharedQuizTextToVideoStep step={step} onComplete={onComplete} />;
}
