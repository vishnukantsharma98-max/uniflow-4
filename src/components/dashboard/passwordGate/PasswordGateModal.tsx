import React, { useState, useEffect, useRef } from 'react';
import { Lock, ArrowRight, X, AlertCircle, KeyRound, ExternalLink } from 'lucide-react';

export interface PasswordGateTarget {
  url: string;
  title?: string;
  target?: string;
}

export interface PasswordGateModalProps {
  isOpen: boolean;
  target: PasswordGateTarget | null;
  onClose: () => void;
}

export const GLOBAL_PASSWORD = 'vishnu';

export const PasswordGateModal: React.FC<PasswordGateModalProps> = ({
  isOpen,
  target,
  onClose,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasswordInput('');
      setError(null);
      const focusTimer = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(focusTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !target) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const cleanPass = passwordInput.trim().toLowerCase();

    if (!cleanPass) {
      setError('Please enter the password');
      inputRef.current?.focus();
      return;
    }

    if (cleanPass === GLOBAL_PASSWORD) {
      window.open(target.url, target.target || '_blank', 'noopener,noreferrer');
      onClose();
    } else {
      setError('Incorrect password');
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  };

  return (
    <div
      id="password-gate-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/75"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-gate-title"
    >
      <div
        id="password-gate-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md nb-modal rounded-2xl overflow-hidden"
      >
        {/* Top Yellow Header Bar */}
        <div className="px-5 py-3.5 bg-[#FFD84D] border-b-[3px] border-[#171717] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#171717]">
            <Lock className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Resource Access Gate
            </span>
          </div>
          <button
            id="password-gate-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A65] cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6">
          <h3
            id="password-gate-title"
            className="text-xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight"
          >
            Enter Access Password
          </h3>
          <p className="text-xs sm:text-sm font-medium text-[#404040] dark:text-[#9AA6BE] mt-1">
            Enter the password shown on the resource banner to launch this link.
          </p>

          {/* Target Resource Preview */}
          {target.title && (
            <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-[#FFF7DC] dark:bg-[#1E2534] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-bold text-[#171717] dark:text-[#F4F1E8] truncate flex items-center gap-2">
              <ExternalLink className="w-4 h-4 shrink-0 stroke-[2.5]" />
              <span className="truncate">{target.title}</span>
            </div>
          )}

          {/* Password Hint Strip */}
          <div className="mt-4 p-3 rounded-xl bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span>Protected Link</span>
            </div>
            <code className="px-2 py-0.5 rounded bg-[#FFFDF5] border border-[#171717] font-mono text-xs font-extrabold uppercase">
              {GLOBAL_PASSWORD}
            </code>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="global-password-input"
                className="block text-xs font-extrabold uppercase tracking-wider text-[#171717] dark:text-[#F4F1E8] mb-1.5"
              >
                Password
              </label>
              <input
                ref={inputRef}
                id="global-password-input"
                type="text"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Type password..."
                autoComplete="off"
                autoFocus
                className={`nb-input w-full px-4 py-3 rounded-xl text-sm font-bold ${
                  error ? 'border-[#FF6B6B] bg-[#FFE5E5] text-[#171717]' : ''
                }`}
              />

              {error && (
                <div
                  id="password-gate-error"
                  className="mt-2.5 p-2.5 rounded-lg bg-[#FF8A65] text-[#171717] border-2 border-[#171717] flex items-center gap-2 text-xs font-extrabold"
                >
                  <AlertCircle className="w-4 h-4 stroke-[2.5] shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                id="password-gate-cancel-btn"
                type="button"
                onClick={onClose}
                className="flex-1 nb-btn nb-btn-white py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold"
              >
                Cancel
              </button>
              <button
                id="password-gate-submit-btn"
                type="submit"
                className="flex-1 nb-btn nb-btn-primary py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold"
              >
                <span>Open</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
