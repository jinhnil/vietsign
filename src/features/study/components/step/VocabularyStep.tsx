// Re-export from shared step components for backward compatibility
import { StepItem } from "@/data/lessonsData";
import { VocabularyStep as SharedVocabularyStep } from "@/shared/components/common/step";

interface VocabularyStepProps {
  step: StepItem;
}

export function VocabularyStep({ step }: VocabularyStepProps) {
  return <SharedVocabularyStep step={step} />;
}
