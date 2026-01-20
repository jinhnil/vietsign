// Re-export from shared step components for backward compatibility
import { StepItem } from "@/src/data/lessonsData";
import { VocabularyStep as SharedVocabularyStep } from "@/src/components/common/step";

interface VocabularyStepProps {
  step: StepItem;
}

export function VocabularyStep({ step }: VocabularyStepProps) {
  return <SharedVocabularyStep step={step} />;
}
