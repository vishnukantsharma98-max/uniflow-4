import React from 'react';

interface WorkspacePlaceholderProps {
  pageTitle?: string;
}

export const WorkspacePlaceholder: React.FC<WorkspacePlaceholderProps> = ({ pageTitle }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-6 py-12 select-none">
      <div className="nb-card-lg rounded-2xl p-8 sm:p-10 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col items-center text-center max-w-lg mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#171717] dark:text-[#F4F1E8]">
          UNIFLOW
        </h1>
        <p className="mt-3 text-base font-semibold text-[#404040] dark:text-[#9AA6BE]">
          Your workspace is ready.
        </p>

        {pageTitle && pageTitle.toLowerCase() !== 'home' && (
          <div className="mt-5 px-4 py-1.5 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold uppercase tracking-wider">
            {pageTitle}
          </div>
        )}
      </div>
    </div>
  );
};
