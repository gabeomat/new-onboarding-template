export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'text';
  options?: QuizOption[];
  placeholder?: string;
  hasOther?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your current relationship with AI tools?",
    type: 'single',
    hasOther: true,
    options: [
      { id: 'brand_new', label: "I'm brand new - haven't really used AI yet" },
      { id: 'no_system', label: "I use ChatGPT/Claude/Gemini for business but I don't have a real system" },
      { id: 'actively_using', label: "I'm actively using AI in my work but want to build custom tools" },
      { id: 'tried_stuck', label: "I've tried building AI tools but got stuck" },
    ],
  },
  {
    id: 2,
    question: "What does your business need most right now?",
    type: 'single',
    hasOther: true,
    options: [
      { id: 'client_facing', label: "A client-facing tool(s) that delivers value (assessment, analyzer, guide, coach)" },
      { id: 'internal_system', label: "An internal system to save me time (research, content creation, ops)" },
      { id: 'blueprint', label: "A blueprint to create AI systems for my business" },
      { id: 'signature_tool', label: "A new signature tool that differentiates my methodology" },
    ],
  },
  {
    id: 3,
    question: "What's your expertise/niche?",
    type: 'text',
    placeholder: "Tell us in 1-2 sentences...",
  },
  {
    id: 4,
    question: "Which build approach excites you most?",
    type: 'single',
    hasOther: true,
    options: [
      { id: 'custom_gpt', label: "Custom GPT (quickest - no coding, lives in ChatGPT)" },
      { id: 'claude_skills', label: "Claude Skills (powerful skills you can equip Claude with)" },
      { id: 'vibe_coded', label: "Vibe-coded tool (most impressive - your own branded app/site)" },
      { id: 'custom_chat', label: "Custom chat style AI tool build outside the GPT platform" },
      { id: 'not_sure', label: "I'm not sure yet - help me choose" },
    ],
  },
  {
    id: 5,
    question: "What's your biggest concern about building and shipping your first AI tool within 7 days?",
    type: 'single',
    hasOther: true,
    options: [
      { id: 'what_to_build', label: "I don't know what to build" },
      { id: 'tech_hard', label: "I'm worried about the tech being too hard" },
      { id: 'no_time', label: "I don't have enough time" },
      { id: 'not_good_enough', label: "I'm concerned it won't be good enough" },
    ],
  },
];
