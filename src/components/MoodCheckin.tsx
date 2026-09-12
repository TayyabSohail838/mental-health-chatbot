import React, { useState, useEffect } from "react";
import moodCheckinQuestions from "../data/moodCheckinQuestions.json";

export const MoodCheckin = () => {
  const [question, setQuestion] = useState<{ question: string } | null>(null);

  useEffect(() => {
    const openingQuestions = moodCheckinQuestions.filter(
      (q) => q.type === "Opening Check-in"
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestion(openingQuestions[Math.floor(Math.random() * openingQuestions.length)]);
  }, []);

  if (!question) return null;

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 dark:border-teal-800 dark:from-teal-950/40 dark:to-cyan-950/40">
        <p className="text-lg font-medium text-teal-900 dark:text-teal-100">
          {question.question}
        </p>
        <p className="mt-2 text-sm text-teal-600 dark:text-teal-400">
          Take a moment to check in with yourself 💙
        </p>
      </div>
    </div>
  );
};
