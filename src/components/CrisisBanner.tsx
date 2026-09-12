import React from "react";

const crisisResources = [
  { name: "Emergency Services", action: "Call your local emergency number" },
  { name: "Crisis Text Line", action: "Text HOME to 741741" },
  { name: "Befrienders Worldwide", action: "befrienders.org" },
  { name: "IASP Crisis Centres", action: "iasp.info/resources/Crisis_Centres/" },
];

export const CrisisBanner = () => {
  return (
    <div className="w-full rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/50">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🆘</span>
        <div>
          <h3 className="text-base font-semibold text-red-800 dark:text-red-300">
            If you&apos;re in crisis, please reach out for help
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-red-700 dark:text-red-400">
            {crisisResources.map((resource) => (
              <li key={resource.name}>
                <strong>{resource.name}:</strong> {resource.action}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-red-600 dark:text-red-500">
            You are not alone. Help is available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
};
