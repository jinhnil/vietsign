// Re-export from shared step components for backward compatibility
import { StepItem } from "@/src/data/lessonsData";
import { QuizVideoToTextStep as SharedQuizVideoToTextStep } from "@/src/components/common/step";

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
