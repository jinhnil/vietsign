// Re-export from shared step components for backward compatibility
import { StepItem } from "@/data/lessonsData";
import { QuizVideoToTextStep as SharedQuizVideoToTextStep } from "@/shared/components/common/step";

interface QuizVideoToTextStepProps {
  step: StepItem;
  onComplete: () => void;
}

export function QuizVideoToTextStep({
  step,
  onComplete,
}: QuizVideoToTextStepProps) {
  return <SharedQuizVideoToTextStep step={step} onComplete={onComplete} />;
}
