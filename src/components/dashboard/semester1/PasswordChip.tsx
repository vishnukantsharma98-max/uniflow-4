import React, { useState } from 'react';
import { KeyRound, Check, Copy } from 'lucide-react';

interface PasswordChipProps {
  password?: string;
  className?: string;
}

export const PasswordChip: React.FC<PasswordChipProps> = ({
  password = 'vishnu',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Click to copy password"
      className={`nb-btn-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFD84D] text-[#171717] text-xs font-mono font-extrabold cursor-pointer select-none ${className}`}
    >
      <KeyRound className="w-3.5 h-3.5 text-[#171717] stroke-[2.5] shrink-0" />
      <span className="uppercase tracking-wide">Pass:</span>
      <span className="px-1.5 py-0.5 rounded bg-[#FFFDF5] border border-[#171717] text-[#171717]">
        {password}
      </span>
      <span className="ml-0.5">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-[#171717] stroke-[3] inline" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-[#171717] stroke-[2.5] inline" />
        )}
      </span>
    </button>
  );
};
