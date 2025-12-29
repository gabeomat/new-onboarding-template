import { Link } from "react-router-dom";
import Quiz from "@/components/quiz/Quiz";
import celestialSun from "@/assets/untitled_design_(7).png";
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
              Name of Your Community Here
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            You're In.{" "}
            <span className="text-primary">Let's Get You Dangerous.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Take this 2-minute quiz so I know where you're starting from and what you're trying to build. 
            I'll send you a personalized Loom video in the next 24 hours, showing you exactly what to focus on 
            in the community to hit the ground running!
          </p>

          <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <img
              src={celestialSun}
              alt="Celestial sun symbol"
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
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
