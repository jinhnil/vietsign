// Re-export from shared step components for backward compatibility
import { StepItem } from "@/data/lessonsData";
import { QuizTextToVideoStep as SharedQuizTextToVideoStep } from "@/shared/components/common/step";

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
