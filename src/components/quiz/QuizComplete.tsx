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

      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">
        You're In! 🚀
      </h2>

      <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
        {/* TODO: Customize this message */}
        Thank you for completing the quiz! We'll review your answers and get back to you with personalized recommendations.
      </p>

      <div className="bg-card rounded-2xl p-6 shadow-card max-w-lg mx-auto border border-border">
        <h3 className="font-display font-semibold text-lg mb-4">What happens next?</h3>
        <ul className="text-left text-muted-foreground space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            {/* TODO: Customize these steps */}
            <span>Check your email for a confirmation message.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Join our community and introduce yourself!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Explore our resources to get started.</span>
          </li>
        </ul>
      </div>

      {/* TODO: Update this link to your community URL */}
      <a
        href="https://your-community-url.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6"
      >
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3">
          Join the Community
        </Button>
      </a>

      <p className="text-muted-foreground mt-8 max-w-lg mx-auto italic">
        {/* TODO: Add your personal message */}
        We're excited to have you and can't wait to help you achieve your goals!
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
