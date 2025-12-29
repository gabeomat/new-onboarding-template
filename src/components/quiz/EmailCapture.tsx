import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
});

interface EmailCaptureProps {
  onSubmit: (name: string, email: string, honeypot: string) => void;
  isLoading?: boolean;
}

const EmailCapture = ({ onSubmit, isLoading }: EmailCaptureProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Hidden field for bots
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse({ name: name.trim(), email: email.trim() });
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    onSubmit(name.trim(), email.trim(), honeypot);
  };

  return (
    <div className="animate-fade-in text-center">
      <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-foreground">
        Let's get started!
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        Just 5 quick questions to create your personalized nutrition blueprint.
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
        <div>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-14 text-lg text-center border-2 border-border focus:border-primary rounded-xl"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-2">{errors.name}</p>
          )}
        </div>

        <div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-14 text-lg text-center border-2 border-border focus:border-primary rounded-xl"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground mt-2">
            We'll use this email to send your personalized results
          </p>
          {errors.email && (
            <p className="text-destructive text-sm mt-2">{errors.email}</p>
          )}
        </div>

        {/* Honeypot field - hidden from users, visible to bots */}
        <div 
          aria-hidden="true" 
          style={{ 
            position: 'absolute', 
            left: '-9999px', 
            width: '1px', 
            height: '1px', 
            overflow: 'hidden' 
          }}
        >
          <label htmlFor="website">Website</label>
          <Input
            type="text"
            id="website"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-lg font-semibold gradient-primary hover:opacity-90 shadow-button transition-all"
        >
          {isLoading ? "Loading..." : "Start My Assessment"}
        </Button>
      </form>
    </div>
  );
};

export default EmailCapture;
