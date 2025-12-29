import { Link } from "react-router-dom";
import Quiz from "@/components/quiz/Quiz";
import shellImage from "@/assets/untitled_design_(9).png";

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
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
          <div className="mt-2">
            <Link
              to="/admin/login"
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              Admin
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
