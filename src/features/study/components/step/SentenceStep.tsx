// Re-export from shared step components for backward compatibility
import { StepItem } from "@/data/lessonsData";
import { SentenceStep as SharedSentenceStep } from "@/shared/components/common/step";

interface SentenceStepProps {
  step: StepItem;
}

export function SentenceStep({ step }: SentenceStepProps) {
  return <SharedSentenceStep step={step} />;
}
