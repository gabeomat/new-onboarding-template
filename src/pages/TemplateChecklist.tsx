import { CheckCircle2, Palette, MessageSquare, Mail, FileText, Image, Link, Database, Shield } from "lucide-react";

const TemplateChecklist = () => {
  const checklistItems = [
    {
      icon: Palette,
      title: "1. Update Branding & Colors",
      description: "Customize the visual identity to match your brand.",
      prompt: `"I want to update the branding for my quiz. Here's my brand: [describe your colors, style, or share an image/website for reference]. Please update the color scheme, fonts, and overall visual style to match."`,
    },
    {
      icon: MessageSquare,
      title: "2. Replace Quiz Questions",
      description: "Add your own quiz content with custom questions and answers.",
      prompt: `"Replace the existing quiz questions with these 5 new questions:\n\n1. [Your question here]\n   - Option A\n   - Option B\n   - Option C\n   - Option D\n\n2. [Your question here]\n   ...and so on for all 5 questions"`,
    },
    {
      icon: FileText,
      title: "3. Update Main Page Copy",
      description: "Personalize the headline, description, and call-to-action text.",
      prompt: `"Update the main page copy:\n- Headline: [Your headline]\n- Subheadline/Description: [Your description]\n- Any other text you want to change"`,
    },
    {
      icon: FileText,
      title: "4. Update Completion Screen",
      description: "Customize what users see after completing the quiz.",
      prompt: `"Update the quiz completion screen with:\n- Success message: [Your message]\n- Next steps text: [What should users do next?]\n- Button text and destination: [Where should the button link to?]"`,
    },
    {
      icon: Image,
      title: "5. Replace Images",
      description: "Add your own photos and graphics.",
      prompt: `"Replace the placeholder images with my own. I'm uploading [describe your images] - please use these for [specify where: hero section, completion screen, etc.]"`,
    },
    {
      icon: FileText,
      title: "6. Update Footer Copyright",
      description: "Change the copyright text to your business name.",
      prompt: `"Update the footer copyright text to use my business name: [Your Business Name]"`,
    },
    {
      icon: Link,
      title: "7. Update Community Link",
      description: "Point users to your community or next destination.",
      prompt: `"Change the community/destination link to point to [your URL]."`,
    },
    {
      icon: Mail,
      title: "8. Connect Email Service",
      description: "Set up Resend to capture and send emails to quiz takers.",
      prompt: `"I want to set up email capture for the quiz using Resend. Please help me configure this so quiz submissions are emailed to [your email address]. I have my Resend API key ready."`,
    },
    {
      icon: Database,
      title: "9. Set Up Database",
      description: "Store quiz submissions for later access.",
      prompt: `"Set up the database to store quiz submissions so I can view all responses. Include the user's name, email, and their quiz answers."`,
    },
    {
      icon: Shield,
      title: "10. Set Up Admin Access",
      description: "Configure your admin email for dashboard access.",
      prompt: `"Update the admin email configuration so that [your-email@example.com] gets admin access when they sign up."`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Template Customization Checklist
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Copy and paste these prompts into Lovable to customize your quiz template. 
            Work through them in order for the best experience.
          </p>
        </div>

        <div className="space-y-6">
          {checklistItems.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Copy this prompt:
                    </p>
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-background p-3 rounded-md border border-border overflow-x-auto">
                      {item.prompt}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Complete all steps to launch your custom quiz!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateChecklist;
