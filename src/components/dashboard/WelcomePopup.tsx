import React, { useState, useEffect } from 'react';
import { X, Instagram, Linkedin, Sparkles } from 'lucide-react';
import { FOUNDER_INFO } from '../../data';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let timerId: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setIsRendered(true);
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = requestAnimationFrame(() => {
          setIsAnimatedIn(true);
        });
      });
    } else {
      setIsAnimatedIn(false);
      timerId = setTimeout(() => {
        setIsRendered(false);
      }, 200);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timerId);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatedIn(false);
    setTimeout(() => {
      setIsRendered(false);
      onClose();
    }, 180);
  };

  if (!isRendered) return null;

  return (
    <div
      id="uniflix-welcome-popup-overlay"
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/75 transition-opacity duration-200 ${
        isAnimatedIn ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="welcome-modal-title"
    >
      <div
        id="uniflix-welcome-popup-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isAnimatedIn ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(12px)',
          transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="relative w-full max-w-md md:max-w-xl nb-modal rounded-2xl overflow-hidden"
      >
        {/* Top Yellow Header Bar */}
        <div className="px-5 py-3.5 bg-[#FFD84D] border-b-[3px] border-[#171717] flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#171717]">
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
            <span>Creator Spotlight</span>
          </span>
          <button
            id="welcome-popup-close-btn"
            type="button"
            onClick={handleClose}
            aria-label="Close welcome message"
            className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A65] cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            {/* Founder Portrait */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] bg-[#FFF7DC] shrink-0">
              <img
                src={FOUNDER_INFO.photoUrl}
                alt={FOUNDER_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Copy */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 min-w-0">
              <h2
                id="welcome-modal-title"
                className="text-2xl font-extrabold font-display tracking-tight text-[#171717] dark:text-[#F4F1E8]"
              >
                WELCOME TO UNIFLOW
              </h2>

              <div className="mt-2 flex flex-col items-center sm:items-start">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#404040] dark:text-[#9AA6BE]">
                  Made by
                </span>
                <span className="mt-1 px-2.5 py-0.5 rounded-lg bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] text-sm sm:text-base font-extrabold font-display">
                  {FOUNDER_INFO.name}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-[#404040] dark:text-[#9AA6BE] mt-2.5 leading-relaxed">
                Student ecosystem designed for high-impact learning, resources, and focus.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 pt-5 border-t-2 border-[#171717] dark:border-[#3D475E] flex flex-wrap items-center gap-3">
            <a
              id="welcome-popup-instagram-link"
              href={FOUNDER_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] nb-btn nb-btn-accent py-2.5 px-4 rounded-xl text-xs font-extrabold"
            >
              <Instagram className="w-4 h-4 stroke-[2.5]" />
              <span>Instagram</span>
            </a>

            <a
              id="welcome-popup-linkedin-link"
              href={FOUNDER_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] nb-btn nb-btn-blue py-2.5 px-4 rounded-xl text-xs font-extrabold"
            >
              <Linkedin className="w-4 h-4 stroke-[2.5]" />
              <span>LinkedIn</span>
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto nb-btn nb-btn-primary py-2.5 px-5 rounded-xl text-xs font-extrabold"
            >
              Let&apos;s Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
