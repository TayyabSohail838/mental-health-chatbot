import React from "react";

export const TextArea = ({
  input,
  placeholder,
  setInput,
  onKeyDown,
}: {
  input: string;
  placeholder?: string;
  setInput: (value: string) => void;
  onKeyDown: () => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Empêche le retour à la ligne
      onKeyDown();
      // Force blur pour afficher le placeholder
      setTimeout(() => {
        (e.target as HTMLTextAreaElement).blur();
      }, 0);
    }
  };
  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className="w-full h-20 textarea rounded-md bg-white px-4 py-2 text-base text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-foreground"
    />
  );
};
