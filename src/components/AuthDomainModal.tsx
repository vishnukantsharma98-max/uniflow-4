import React, { useState } from 'react';
import {
  ShieldAlert,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Sparkles,
  X,
  Globe,
} from 'lucide-react';

interface AuthDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onContinueDemo: () => void;
  domain?: string;
}

export const AuthDomainModal: React.FC<AuthDomainModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  onContinueDemo,
  domain,
}) => {
  const [copied, setCopied] = useState(false);
  const currentDomain = domain || (typeof window !== 'undefined' ? window.location.hostname : '');
  const firebaseConsoleUrl =
    'https://console.firebase.google.com/project/uniflow-280b5/authentication/settings';

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!currentDomain) return;
    try {
      await navigator.clipboard.writeText(currentDomain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentDomain;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/75"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl nb-modal rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Coral Alert Header */}
        <div className="px-6 py-4 bg-[#FF8A65] border-b-[3px] border-[#171717] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#171717]">
            <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Firebase Domain Setup
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FFD84D] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          <h2 className="text-2xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight">
            Authorize This Domain
          </h2>
          <p className="text-xs sm:text-sm font-medium text-[#404040] dark:text-[#9AA6BE] mt-1.5 leading-relaxed">
            Firebase Authentication requires your current preview domain to be registered in your Firebase project (
            <code className="px-1.5 py-0.5 rounded bg-[#FFD84D] text-[#171717] border border-[#171717] font-mono text-xs font-bold">
              uniflow-280b5
            </code>
            ) to allow Google Sign-In.
          </p>

          {/* Domain Copy Box */}
          <div className="mt-5 p-4 rounded-xl bg-[#FFF7DC] dark:bg-[#1E2534] border-2 border-[#171717] dark:border-[#3D475E] shadow-[4px_4px_0px_#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#8EC5FF] border-2 border-[#171717] flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-[#171717] stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#404040] dark:text-[#9AA6BE] block">
                  Domain to Authorize
                </span>
                <code className="text-xs sm:text-sm font-mono font-bold text-[#171717] dark:text-[#F4F1E8] truncate block">
                  {currentDomain}
                </code>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`nb-btn-sm flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold shrink-0 cursor-pointer ${
                copied ? 'bg-[#B8F2E6] text-[#171717]' : 'bg-[#FFD84D] text-[#171717]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copy Domain</span>
                </>
              )}
            </button>
          </div>

          {/* 3 Quick Steps */}
          <div className="mt-5 space-y-2.5">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-semibold text-[#171717] dark:text-[#F4F1E8]">
              <span className="w-6 h-6 rounded-md bg-[#FFD84D] text-[#171717] border-2 border-[#171717] font-extrabold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div className="flex-1 pt-0.5">
                <span>Open </span>
                <a
                  href={firebaseConsoleUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-2 font-extrabold inline-flex items-center gap-1 hover:bg-[#FFD84D] hover:text-[#171717] px-1 rounded"
                >
                  Firebase Console &gt; Auth Settings
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-semibold text-[#171717] dark:text-[#F4F1E8]">
              <span className="w-6 h-6 rounded-md bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] font-extrabold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div className="flex-1 pt-0.5">
                Under <strong>Authorized domains</strong>, click <strong>Add domain</strong> and paste the copied domain above.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-semibold text-[#171717] dark:text-[#F4F1E8]">
              <span className="w-6 h-6 rounded-md bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] font-extrabold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <div className="flex-1 pt-0.5">
                Click <strong>Save</strong>, then click <strong>Retry Sign-In</strong> below!
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t-2 border-[#171717] dark:border-[#3D475E] flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onContinueDemo}
              className="w-full sm:w-auto nb-btn nb-btn-secondary px-4 py-2.5 rounded-xl text-xs font-extrabold"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Continue in Demo Mode (Preview)</span>
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2.5">
              <a
                href={firebaseConsoleUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 sm:flex-initial nb-btn nb-btn-white px-4 py-2.5 rounded-xl text-xs font-extrabold"
              >
                <span>Console</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>

              <button
                type="button"
                onClick={onRetry}
                className="flex-1 sm:flex-initial nb-btn nb-btn-primary px-5 py-2.5 rounded-xl text-xs font-extrabold"
              >
                <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Retry Sign-In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
