import { useEffect, useState } from "react";

export const TypingMessage = ({ content }: { content: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    setIsTyping(true);
    const interval = setInterval(() => {
      setDisplayed(content.slice(0, i + 1));
      i++;
      if (i >= content.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30); // speed of typing
    return () => clearInterval(interval);
  }, [content]);

  return (
    <p className="whitespace-pre-wrap">
      {displayed}
      {isTyping && (
        <span
          className="border-r-2 border-white animate-blink inline-block ml-1"
          style={{ height: "1em" }}
        />
      )}
    </p>
  );
};
