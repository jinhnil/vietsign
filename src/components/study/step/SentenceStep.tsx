// Re-export from shared step components for backward compatibility
import { StepItem } from "@/src/data/lessonsData";
import { SentenceStep as SharedSentenceStep } from "@/src/components/common/step";

interface SentenceStepProps {
  step: StepItem;
}

export function SentenceStep({ step }: SentenceStepProps) {
  return <SharedSentenceStep step={step} />;
}
