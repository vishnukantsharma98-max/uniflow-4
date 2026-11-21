import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, KeyRound, Search, X } from 'lucide-react';

export const NB_PASTELS = [
  'bg-[#FFD84D]', // Vibrant Yellow
  'bg-[#B8F2E6]', // Mint
  'bg-[#C9B6FF]', // Purple
  'bg-[#8EC5FF]', // Blue
  'bg-[#FF8A65]', // Coral
] as const;

export const getPastelByIndex = (index: number): string => {
  return NB_PASTELS[index % NB_PASTELS.length];
};

interface NbBackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export const NbBackButton: React.FC<NbBackButtonProps> = ({
  onClick,
  label = 'Back',
  className = '',
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`nb-btn nb-btn-white px-4 py-2 rounded-lg text-sm font-bold ${className}`}
  >
    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
    <span>{label}</span>
  </button>
);

interface NbPasswordBannerProps {
  password?: string;
  label?: string;
  className?: string;
}

export const NbPasswordBanner: React.FC<NbPasswordBannerProps> = ({
  password = 'vishnu',
  label = 'Universal Access Key',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FFD84D] text-[#171717] border-2 border-[#171717] shadow-[4px_4px_0px_#171717] ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center">
          <KeyRound className="w-4 h-4 text-[#171717] stroke-[2.5]" />
        </span>
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717]">
          {label}:
        </span>
        <code className="px-2.5 py-0.5 rounded-md bg-[#FFFDF5] border-2 border-[#171717] font-mono text-sm font-bold text-[#171717]">
          {password}
        </code>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="nb-btn-sm inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFFDF5] text-[#171717] border-2 border-[#171717] text-xs font-extrabold cursor-pointer"
        aria-label="Copy password"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

interface NbSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const NbSearchBar: React.FC<NbSearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => (
  <div className={`group relative w-full ${className}`}>
    <Search className="w-4 h-4 text-[#171717] dark:text-[#9AA6BE] dark:group-focus-within:text-[#FFD84D] transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="nb-input w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-semibold"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange('')}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-[#FFD84D] border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A65] transition-colors cursor-pointer"
        aria-label="Clear search"
      >
        <X className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    )}
  </div>
);

interface NbEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const NbEmptyState: React.FC<NbEmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <div className="nb-card-lg rounded-2xl p-8 sm:p-10 text-center bg-[#FFF7DC] dark:bg-[#161B26]">
    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#FFD84D] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#283044] flex items-center justify-center">
      <Search className="w-7 h-7 text-[#171717] stroke-[2.5]" />
    </div>
    <h3 className="text-xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8]">
      {title}
    </h3>
    <p className="mt-2 text-sm font-medium text-[#404040] dark:text-[#9AA6BE] max-w-md mx-auto">
      {description}
    </p>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="mt-5 nb-btn nb-btn-primary px-5 py-2.5 rounded-xl text-sm font-extrabold"
      >
        {actionLabel}
      </button>
    )}
  </div>
);
