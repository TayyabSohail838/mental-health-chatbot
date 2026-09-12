import affirmations from "./affirmations.json";
import breathingExercises from "./breathingExercises.json";
import cognitiveDistortions from "./cognitiveDistortions.json";
import crisisResponseProtocol from "./crisisResponseProtocol.json";
import groundingExercises from "./groundingExercises.json";
import journalingPrompts from "./journalingPrompts.json";
import moodCheckinQuestions from "./moodCheckinQuestions.json";

export {
  affirmations,
  breathingExercises,
  cognitiveDistortions,
  crisisResponseProtocol,
  groundingExercises,
  journalingPrompts,
  moodCheckinQuestions,
};

// Keywords mapped to data categories for retrieval
const keywordMap: Record<string, string[]> = {
  breathing: ["breathing", "breathe", "breath", "inhale", "exhale", "panic", "hyperventilating", "can't breathe"],
  grounding: ["grounding", "ground", "dissociate", "dissociation", "detached", "unreal", "spacey", "floating", "numb"],
  affirmation: ["affirmation", "affirm", "motivate", "inspire", "encourage", "worth", "worthy", "enough", "value"],
  journaling: ["journal", "journaling", "write", "writing", "reflect", "reflection", "prompt", "diary"],
  cognitive: ["thinking", "thought", "thoughts", "distortion", "cognitive", "cbt", "reframe", "irrational", "pattern", "belief"],
  mood: ["mood", "feel", "feeling", "emotion", "check-in", "checkin", "how are you"],
  crisis: [
    "kill myself", "suicide", "suicidal", "end my life", "want to die", "don't want to live",
    "hurt myself", "self-harm", "self harm", "cutting", "harm myself",
    "can't do this anymore", "what's the point", "no reason to live", "better off dead",
    "hurt someone", "harm someone", "kill someone",
  ],
  anxiety: ["anxious", "anxiety", "worried", "worry", "nervous", "scared", "fear", "overwhelmed", "stressed", "stress", "tense", "tension"],
  sadness: ["sad", "depressed", "depression", "hopeless", "lonely", "alone", "empty", "crying", "tears", "grief", "loss", "lost"],
};

export type RetrievedContext = {
  category: string;
  data: string;
  isCrisis: boolean;
};

export function retrieveContext(userMessage: string): RetrievedContext[] {
  const msg = userMessage.toLowerCase();
  const results: RetrievedContext[] = [];

  // Crisis detection — highest priority
  if (keywordMap.crisis.some((kw) => msg.includes(kw))) {
    results.push({
      category: "Crisis Response Protocol",
      data: JSON.stringify(crisisResponseProtocol, null, 2),
      isCrisis: true,
    });
    return results; // Return immediately — crisis takes priority
  }

  // Breathing exercises
  if (keywordMap.breathing.some((kw) => msg.includes(kw)) || keywordMap.anxiety.some((kw) => msg.includes(kw))) {
    const exercise = breathingExercises[Math.floor(Math.random() * breathingExercises.length)];
    results.push({
      category: "Breathing Exercise",
      data: `Exercise: ${exercise.name}\nPattern: ${exercise.pattern}\nInstructions: ${exercise.instructions}`,
      isCrisis: false,
    });
  }

  // Grounding exercises
  if (keywordMap.grounding.some((kw) => msg.includes(kw)) || keywordMap.anxiety.some((kw) => msg.includes(kw))) {
    const exercise = groundingExercises[Math.floor(Math.random() * groundingExercises.length)];
    results.push({
      category: "Grounding Exercise",
      data: `Exercise: ${exercise.name}\nSteps: ${exercise.steps}\nDuration: ${exercise.duration}\nBest for: ${exercise.bestFor}`,
      isCrisis: false,
    });
  }

  // Affirmations
  if (keywordMap.affirmation.some((kw) => msg.includes(kw)) || keywordMap.sadness.some((kw) => msg.includes(kw))) {
    const picks = affirmations.sort(() => Math.random() - 0.5).slice(0, 3);
    results.push({
      category: "Affirmations",
      data: picks.map((a) => `[${a.category}] ${a.text}`).join("\n"),
      isCrisis: false,
    });
  }

  // Journaling prompts
  if (keywordMap.journaling.some((kw) => msg.includes(kw))) {
    const picks = journalingPrompts.sort(() => Math.random() - 0.5).slice(0, 3);
    results.push({
      category: "Journaling Prompts",
      data: picks.map((p) => `[${p.category}] ${p.prompt}`).join("\n"),
      isCrisis: false,
    });
  }

  // Cognitive distortions
  if (keywordMap.cognitive.some((kw) => msg.includes(kw))) {
    const picks = cognitiveDistortions.sort(() => Math.random() - 0.5).slice(0, 2);
    results.push({
      category: "Cognitive Distortions",
      data: picks.map((d) => `${d.name}: ${d.description}\nExample: "${d.example}"\nReframe: ${d.reframeQuestion}`).join("\n\n"),
      isCrisis: false,
    });
  }

  // Mood check-in
  if (keywordMap.mood.some((kw) => msg.includes(kw))) {
    const question = moodCheckinQuestions[Math.floor(Math.random() * moodCheckinQuestions.length)];
    results.push({
      category: "Mood Check-in",
      data: `Question: ${question.question}\nFollow-up: ${question.followUp}`,
      isCrisis: false,
    });
  }

  return results;
}
