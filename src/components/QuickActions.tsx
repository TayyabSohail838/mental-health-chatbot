import React from "react";

const actions = [
  { emoji: "🧘", label: "Breathing Exercise", message: "Can you guide me through a breathing exercise?" },
  { emoji: "📝", label: "Journal Prompt", message: "Give me a journaling prompt to reflect on." },
  { emoji: "🌿", label: "Grounding Exercise", message: "I need a grounding exercise to feel more present." },
  { emoji: "💛", label: "Affirmation", message: "Share an affirmation that I need to hear right now." },
];

export const QuickActions = ({
  onAction,
}: {
  onAction: (message: string) => void;
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-center text-sm text-teal-600 dark:text-teal-400 mb-3">
        Or try one of these:
      </p>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => onAction(action.message)}
            className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50/50 px-4 py-3 text-sm font-medium text-teal-800 transition-all hover:bg-teal-100 hover:border-teal-300 hover:shadow-md hover:shadow-teal-200/50 dark:border-teal-800 dark:bg-teal-950/30 dark:text-teal-300 dark:hover:bg-teal-900/50 dark:hover:border-teal-600 dark:hover:shadow-teal-900/50"
          >
            <span className="text-lg">{action.emoji}</span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};
