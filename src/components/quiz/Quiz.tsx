import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { quizQuestions, QuizQuestion as QuizQuestionType } from "./QuizData";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import EmailCapture from "./EmailCapture";
import QuizComplete from "./QuizComplete";

type QuizState = "intro" | "quiz" | "complete";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [otherTexts, setOtherTexts] = useState<Record<number, string>>({});
  const [state, setState] = useState<QuizState>("intro");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const currentQuestion = quizQuestions[currentStep];
  const isLastQuestion = currentStep === quizQuestions.length - 1;
  
  const currentAnswer = answers[currentQuestion?.id] || "";
  const currentOtherText = otherTexts[currentQuestion?.id] || "";
  const canProceed = currentQuestion?.type === 'multiple'
    ? currentAnswer.trim().length > 0
    : currentAnswer === "other"
      ? currentOtherText.trim().length > 0
      : currentAnswer.trim().length > 0;

  const handleAnswer = (answer: string, otherText?: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
    if (otherText !== undefined) {
      setOtherTexts((prev) => ({
        ...prev,
        [currentQuestion.id]: otherText,
      }));
    }
  };

  const handleIntroSubmit = (name: string, email: string, honeypotValue: string) => {
    setUserName(name);
    setUserEmail(email);
    setHoneypot(honeypotValue);
    setState("quiz");
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      await submitQuiz();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const formatAnswers = () => {
    return quizQuestions.map((q) => {
      const answer = answers[q.id];
      const otherText = otherTexts[q.id];

      if (q.type === "text") {
        return { question: q.question, answer };
      }
      if (q.type === "multiple") {
        const selectedIds = answer ? answer.split(',') : [];
        const selectedLabels = selectedIds
          .map(id => q.options?.find(o => o.id === id)?.label)
          .filter(Boolean);
        return { question: q.question, answer: selectedLabels.join(', ') };
      }
      if (answer === "other" && otherText) {
        return { question: q.question, answer: `Other: ${otherText}` };
      }
      const option = q.options?.find((o) => o.id === answer);
      return { question: q.question, answer: option?.label || answer };
    });
  };

  const submitQuiz = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Connect to your backend to save submissions and send emails
      // Example: await fetch('/api/submit-quiz', { method: 'POST', body: JSON.stringify({...}) })
      
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Quiz submitted:", {
        name: userName,
        email: userEmail,
        answers: formatAnswers(),
        honeypot: honeypot,
      });

      setState("complete");
      toast.success("Your blueprint is on its way!");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setOtherTexts({});
    setUserName("");
    setUserEmail("");
    setState("intro");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-card border border-border">
        {state === "intro" && (
          <EmailCapture onSubmit={handleIntroSubmit} />
        )}

        {state === "quiz" && (
          <>
            <QuizProgress
              currentStep={currentStep + 1}
              totalSteps={quizQuestions.length}
            />

            <QuizQuestion
              key={currentQuestion.id}
              question={currentQuestion}
              answer={answers[currentQuestion.id] || ""}
              otherText={otherTexts[currentQuestion.id] || ""}
              onAnswer={handleAnswer}
            />

            <div className="flex justify-between mt-8 gap-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed || isSubmitting}
                className="flex items-center gap-2 gradient-primary hover:opacity-90 shadow-button"
              >
{isSubmitting ? "Submitting..." : isLastQuestion ? "Get My Nutrition Blueprint" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}

        {state === "complete" && <QuizComplete onRestart={handleRestart} />}
      </div>
    </div>
  );
};

export default Quiz;
