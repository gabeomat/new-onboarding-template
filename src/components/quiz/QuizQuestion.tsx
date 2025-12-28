import { useState, useEffect } from "react";
import { QuizQuestion as QuizQuestionType } from "./QuizData";
import QuizOption from "./QuizOption";
import QuizTextInput from "./QuizTextInput";

interface QuizQuestionProps {
  question: QuizQuestionType;
  answer: string;
  otherText?: string;
  onAnswer: (answer: string, otherText?: string) => void;
}

const QuizQuestion = ({ question, answer, otherText = "", onAnswer }: QuizQuestionProps) => {
  const [localOtherText, setLocalOtherText] = useState(otherText);
  const isOtherSelected = answer === "other";

  useEffect(() => {
    setLocalOtherText(otherText);
  }, [otherText, question.id]);

  const handleOptionClick = (optionId: string) => {
    if (optionId === "other") {
      onAnswer("other", localOtherText);
    } else {
      onAnswer(optionId);
    }
  };

  const handleOtherTextChange = (text: string) => {
    setLocalOtherText(text);
    onAnswer("other", text);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-foreground">
        {question.question}
      </h2>

      {question.type === "text" ? (
        <QuizTextInput
          value={answer}
          onChange={(val) => onAnswer(val)}
          placeholder={question.placeholder}
        />
      ) : (
        <div className="space-y-3">
          {question.options?.map((option) => (
            <QuizOption
              key={option.id}
              label={option.label}
              selected={answer === option.id}
              onClick={() => handleOptionClick(option.id)}
            />
          ))}
          {question.hasOther && (
            <>
              <QuizOption
                label="Other (please explain)"
                selected={isOtherSelected}
                onClick={() => handleOptionClick("other")}
              />
              {isOtherSelected && (
                <div className="ml-8 animate-fade-in">
                  <QuizTextInput
                    value={localOtherText}
                    onChange={handleOtherTextChange}
                    placeholder="Please explain..."
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
