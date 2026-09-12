import React from "react";

const Button = ({
  onClick,
  isLoading,
  text,
  loadingText,
  className,
}: {
  onClick: () => void;
  isLoading?: boolean;
  text: string;
  loadingText?: string;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${className} rounded-md bg-foreground px-4 py-2 text-base font-medium text-background hover:bg-foreground/80 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 disabled:opacity-50`}
    >
      {isLoading ? loadingText : text}
    </button>
  );
};

export default Button;
