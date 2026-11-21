import React from 'react';

interface UniFlowLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  className?: string;
  textColor?: string;
}

export const UniFlowLogo: React.FC<UniFlowLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  textColor,
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-9 h-9 rounded-lg',
    lg: 'w-11 h-11 rounded-xl',
    xl: 'w-14 h-14 rounded-xl',
    hero: 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl',
  }[size];

  const textSize = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    hero: 'text-4xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Bold Geometric Neubrutalist Mark */}
      <div
        className={`relative shrink-0 flex items-center justify-center bg-[#FFD84D] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] dark:border-[#171717] dark:shadow-[3px_3px_0px_#38435E] ${iconDimensions}`}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-[72%] h-[72%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Thick Geometric U */}
          <path
            d="M16 14V34C16 42.8366 23.1634 50 32 50C40.8366 50 48 42.8366 48 34V14"
            stroke="#171717"
            strokeWidth="9"
            strokeLinecap="square"
          />
          {/* Accent Coral Geometric Dot */}
          <rect
            x="27"
            y="11"
            width="10"
            height="10"
            rx="2"
            fill="#FF8A65"
            stroke="#171717"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Bold High-Contrast Wordmark */}
      {showText && (
        <div className="flex items-center tracking-tight">
          <span
            style={textColor ? { color: textColor } : undefined}
            className={`font-extrabold font-display ${textSize} tracking-tight text-[#171717] dark:text-[#F4F1E8]`}
          >
            Uni
            <span className="inline-block ml-0.5 px-1.5 py-0.5 bg-[#FFD84D] text-[#171717] border-2 border-[#171717] rounded-md leading-none">
              Flow
            </span>
          </span>
        </div>
      )}
    </div>
  );
};
