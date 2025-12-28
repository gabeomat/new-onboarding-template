import { cn } from "@/lib/utils";

interface QuizOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const QuizOption = ({ label, selected, onClick }: QuizOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 text-left rounded-xl border-2 transition-all duration-300",
        "hover:shadow-card hover:border-primary/50",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        selected
          ? "border-primary bg-primary/10 shadow-button"
          : "border-border bg-card hover:bg-muted/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            selected ? "border-primary bg-primary" : "border-muted-foreground"
          )}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
          )}
        </div>
        <span className={cn("font-medium", selected && "text-primary")}>
          {label}
        </span>
      </div>
    </button>
  );
};

export default QuizOption;
