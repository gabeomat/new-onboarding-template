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
    question: "What's your main goal right now?",
    type: 'single',
    options: [
      { id: 'lose_fat', label: "Lose body fat while maintaining muscle" },
      { id: 'build_muscle', label: "Build muscle and strength" },
      { id: 'improve_health', label: "Improve overall health and energy" },
      { id: 'maintain_weight', label: "Maintain current weight with better nutrition" },
      { id: 'athletic_performance', label: "Athletic performance/endurance" },
    ],
  },
  {
    id: 2,
    question: "How would you describe your typical weekly activity?",
    type: 'single',
    options: [
      { id: 'sedentary', label: "Sedentary (desk job, minimal exercise)" },
      { id: 'lightly_active', label: "Lightly active (1-3 days exercise/week)" },
      { id: 'moderately_active', label: "Moderately active (3-5 days exercise/week)" },
      { id: 'very_active', label: "Very active (6-7 days intense training)" },
      { id: 'athlete', label: "Athlete (multiple training sessions daily)" },
    ],
  },
  {
    id: 3,
    question: "Which eating approach appeals most to you?",
    type: 'single',
    options: [
      { id: 'high_protein_moderate_carb', label: "High protein, moderate carb, low fat (classic bodybuilding)" },
      { id: 'high_protein_low_carb', label: "High protein, low carb, high fat (keto/low-carb)" },
      { id: 'balanced_macros', label: "Balanced macros (zone/40-30-30 style)" },
      { id: 'plant_based', label: "Plant-based/vegetarian" },
      { id: 'flexible', label: "Flexible - just tell me what works" },
    ],
  },
  {
    id: 4,
    question: "What are your biggest challenges? (Select all that apply)",
    type: 'multiple',
    options: [
      { id: 'limited_time', label: "Limited time for meal prep" },
      { id: 'dont_enjoy_cooking', label: "Don't enjoy cooking" },
      { id: 'eating_out', label: "Eating out frequently" },
      { id: 'irregular_schedule', label: "Irregular schedule/shift work" },
      { id: 'family_cooking', label: "Family cooking for others with different needs" },
      { id: 'budget_constraints', label: "Budget constraints" },
    ],
  },
  {
    id: 5,
    question: "Tell us about you",
    type: 'text',
    placeholder: "Age, approximate weight, and any foods you avoid (allergies, preferences)...",
  },
];
