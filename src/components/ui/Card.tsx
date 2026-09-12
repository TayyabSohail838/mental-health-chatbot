import React from "react";

export const Card = ({
  children,
  key,
  className,
}: {
  children: React.ReactNode;
  key: string;
  className?: string;
}) => {
  return (
    <div
      key={key}
      className={`${className} mt-6 w-full rounded-md border border-zinc-300 bg-zinc-100 p-4 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100`}
    >
      {children}
    </div>
  );
};
