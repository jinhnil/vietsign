// Re-export from shared step components for backward compatibility
import { StepItem } from "@/src/data/lessonsData";
import { QuizInputStep as SharedQuizInputStep } from "@/src/components/common/step";

interface QuizInputStepProps {
  step: StepItem;
  onComplete: () => void;
}

export function QuizInputStep({ step, onComplete }: QuizInputStepProps) {
  return <SharedQuizInputStep step={step} onComplete={onComplete} />;
}
