import { Textarea } from "@/components/ui/textarea";

interface QuizTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const QuizTextInput = ({ value, onChange, placeholder }: QuizTextInputProps) => {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Type your answer here..."}
      className="min-h-[120px] text-lg border-2 border-border focus:border-primary rounded-xl p-4 resize-none transition-colors"
    />
  );
};

export default QuizTextInput;
