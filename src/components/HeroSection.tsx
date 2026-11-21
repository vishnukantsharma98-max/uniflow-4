import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Instagram, Linkedin, Zap } from 'lucide-react';
import { VishnuCosmicCenterpiece } from './VishnuCosmicCenterpiece';
import { SOCIAL_PROOF_STUDENTS, FOUNDER_INFO } from '../data';

interface HeroSectionProps {
  onOpenAuth: () => void;
  onOpenSearch?: () => void;
  isSigningIn?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuth,
  onOpenSearch,
  isSigningIn = false,
}) => {
  const [revealed, setRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setRevealed(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN */}
          <div
            className={`lg:col-span-6 flex flex-col z-20 transition-all duration-300 ${
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* 1. HERO LABELS */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 order-1">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 stroke-[2.5] fill-[#171717]" />
                <span>All-in-One Student Super App</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold">
                <span>Built by Vishnu Kant Sharma</span>
              </span>
            </div>

            {/* 2. MOBILE CENTERPIECE */}
            <div className="lg:hidden w-full my-4 order-2 relative z-10 flex justify-center">
              <VishnuCosmicCenterpiece
                onSelectItem={() => {
                  if (onOpenSearch) onOpenSearch();
                }}
                mousePos={mousePos}
                revealed={revealed}
              />
            </div>

            {/* 3. OVERSIZED GEOMETRIC HEADLINE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[66px] font-extrabold font-display tracking-tight leading-[1.06] mb-6 order-3 text-[#171717] dark:text-[#F4F1E8]">
              <span>Your student life,</span>
              <span className="inline-block mt-2 px-3 py-1 bg-[#FFD84D] text-[#171717] border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] dark:border-[#171717] dark:shadow-[6px_6px_0px_#38435E] rounded-xl -rotate-1">
                all in one flow.
              </span>
            </h1>

            {/* 4. SUPPORTING COPY */}
            <p className="text-base sm:text-lg text-[#262626] dark:text-[#D5DBE8] font-medium max-w-xl leading-relaxed mb-6 order-4">
              Assignments, exams, AI tools, games, books, apps, entertainment and everything you need — structured inside one bold, clutter-free workspace built for university students.
            </p>

            {/* 5. DIRECT CONNECT */}
            <div className="flex items-center gap-2.5 mb-7 flex-wrap order-5">
              <span className="text-xs font-extrabold text-[#171717] dark:text-[#F4F1E8] uppercase tracking-wider mr-1">
                Connect directly:
              </span>
              <a
                href={FOUNDER_INFO.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF8A65] text-[#171717] text-xs font-extrabold"
              >
                <Instagram className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Instagram</span>
              </a>
              <a
                href={FOUNDER_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8EC5FF] text-[#171717] text-xs font-extrabold"
              >
                <Linkedin className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* 6. PRIMARY & SECONDARY CTAS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 order-6">
              <button
                type="button"
                onClick={onOpenAuth}
                className="nb-btn nb-btn-primary px-7 py-3.5 rounded-xl text-sm sm:text-base font-extrabold shrink-0"
              >
                <div className="w-5 h-5 rounded-sm bg-[#FFFFFF] border border-[#171717] flex items-center justify-center p-0.5 shrink-0 pointer-events-none">
                  <svg className="w-full h-full pointer-events-none" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <span className="whitespace-nowrap pointer-events-none">
                  {isSigningIn ? 'Signing in...' : 'Continue with Google'}
                </span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] pointer-events-none" />
              </button>

              <a
                href="#explore"
                className="nb-btn nb-btn-white px-6 py-3.5 rounded-xl text-sm sm:text-base font-extrabold"
              >
                <span>Explore UniFlow</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>

            {/* 7. SOCIAL PROOF CARD */}
            <div className="order-7 inline-flex flex-wrap items-center gap-4 p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#283044] w-fit">
              <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                {SOCIAL_PROOF_STUDENTS.map((student, i) => (
                  <div
                    key={i}
                    className="relative inline-block h-10 w-10 rounded-lg overflow-hidden border-2 border-[#171717] bg-[#FFD84D]"
                  >
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD84D] text-[#171717] stroke-[2]" />
                  ))}
                </div>
                <p className="text-xs font-bold text-[#171717] dark:text-[#F4F1E8] mt-1">
                  Loved by{' '}
                  <span className="px-1.5 py-0.5 rounded bg-[#C9B6FF] text-[#171717] border border-[#171717] font-extrabold">
                    50,000+ students
                  </span>{' '}
                  across universities
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: NEUBRUTALIST INTERACTIVE CENTERPIECE */}
          <div className="hidden lg:flex lg:col-span-6 relative items-center justify-center w-full z-10">
            <VishnuCosmicCenterpiece
              onSelectItem={() => {
                if (onOpenSearch) onOpenSearch();
              }}
              mousePos={mousePos}
              revealed={revealed}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
