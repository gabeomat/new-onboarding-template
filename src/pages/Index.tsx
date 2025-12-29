import { Link } from "react-router-dom";
import Quiz from "@/components/quiz/Quiz";
import shellImage from "@/assets/untitled_design_(9).png";
import { Settings, X } from "lucide-react";
import { useState } from "react";

const Index = () => {
  // TODO: Remove this state and the banner once you've completed customization
  const [showCustomizeBanner, setShowCustomizeBanner] = useState(true);

  return (
    <div className="min-h-screen gradient-hero">
      {/* ========== CUSTOMIZATION BANNER - Remove this section once done ========== */}
      {showCustomizeBanner && (
        <div className="bg-primary text-primary-foreground py-3 px-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 animate-spin-slow" />
              <span className="text-sm md:text-base font-medium">
                👋 New here? Start with the{" "}
                <Link to="/checklist" className="underline font-bold hover:opacity-80">
                  Customization Checklist
                </Link>
              </span>
            </div>
            <button
              onClick={() => setShowCustomizeBanner(false)}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {/* ========== END CUSTOMIZATION BANNER ========== */}

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-card border border-border mb-6 animate-fade-in">
            <span className="text-sm font-medium text-muted-foreground">
              Sandy Shore Nutrition
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Get Your{" "}
            <span className="text-primary">Custom Nutrition Blueprint</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Take this quick 5-question quiz to help us understand your goals, lifestyle, and preferences.
            We'll create a personalized nutrition plan designed specifically for you and your unique needs.
          </p>

          <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <img
              src={shellImage}
              alt="Seashell symbol"
              className="w-32 h-32 md:w-40 md:h-40 animate-float"
            />
          </div>
        </div>

        {/* Quiz Section */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Quiz />
        </div>

        {/* Footer - TODO: Update company name below */}
        <footer className="text-center mt-16 py-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Coachbox. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
