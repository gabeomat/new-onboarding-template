import { Button } from "@/components/ui/button";
import hostPhoto from "@/assets/host-photo.png";

interface QuizCompleteProps {
  onRestart?: () => void;
}

const QuizComplete = ({ onRestart }: QuizCompleteProps) => {
  return (
    <div className="animate-fade-in text-center py-8">
      <div className="mb-6">
        {/* TODO: Replace with your own photo */}
        <img
          src={hostPhoto}
          alt="Your host"
          className="w-40 h-40 mx-auto rounded-full object-cover object-top shadow-lg border-2 border-border"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-primary">
        You're In!
      </h2>

      <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
        Thank you for completing the nutrition assessment! We're reviewing your goals and preferences
        to create your personalized nutrition blueprint.
      </p>

      <div className="bg-card rounded-2xl p-6 shadow-card max-w-lg mx-auto border border-border">
        <h3 className="font-display font-semibold text-lg mb-4">What happens next?</h3>
        <ul className="text-left text-muted-foreground space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Check your email for your personalized nutrition blueprint.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Review your custom macro calculations and meal recommendations.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Join our community for ongoing support and guidance.</span>
          </li>
        </ul>
      </div>

      {/* TODO: Update this link to your community URL */}
      <div className="inline-block mt-6">
        <Button
          onClick={() => alert("Update the community URL in QuizComplete.tsx")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3"
        >
          Join the Community
        </Button>
      </div>

      <p className="text-muted-foreground mt-8 max-w-lg mx-auto italic">
        We're excited to support you on your nutrition journey and help you achieve your health and fitness goals!
      </p>

      {onRestart && (
        <Button
          variant="ghost"
          onClick={onRestart}
          className="mt-6 text-muted-foreground hover:text-foreground"
        >
          Take the quiz again
        </Button>
      )}
    </div>
  );
};

export default QuizComplete;
