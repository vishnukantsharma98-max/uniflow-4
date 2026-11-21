import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { UniFlowLogo } from './UniFlowLogo';

interface FinalCtaProps {
  onOpenAuth: () => void;
  isSigningIn?: boolean;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenAuth, isSigningIn = false }) => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="rounded-3xl p-8 sm:p-12 lg:p-14 bg-[#FFD84D] text-[#171717] border-[3px] border-[#171717] dark:border-[#171717] shadow-[8px_8px_0px_#171717] dark:shadow-[8px_8px_0px_#38435E] text-center">
          {/* Logo Badge */}
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717]">
              <UniFlowLogo size="lg" showText={false} />
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-[1.12] mb-4 text-[#171717]">
            Ready to simplify the way you study, create, and explore?
          </h2>

          <p className="text-base sm:text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-8 text-[#262626]">
            Everything you need for student life, in one flow.
          </p>

          {/* Primary Google CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAuth}
              className="w-full sm:w-auto nb-btn nb-btn-white px-8 py-4 rounded-xl text-base sm:text-lg font-extrabold"
            >
              <div className="w-6 h-6 rounded-sm bg-[#FFFFFF] border-2 border-[#171717] flex items-center justify-center p-0.5 shrink-0 pointer-events-none">
                <svg className="w-full h-full pointer-events-none" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <span className="pointer-events-none">
                {isSigningIn ? 'Signing in...' : 'Continue with Google'}
              </span>
              <ArrowRight className="w-5 h-5 stroke-[2.5] pointer-events-none" />
            </button>
          </div>

          {/* Assurance Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-extrabold">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B8F2E6] border-2 border-[#171717]">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>100% Free for Students</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFDF5] border-2 border-[#171717]">
              <Zap className="w-4 h-4 stroke-[2.5]" />
              <span>Instant Single-Click Access</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9B6FF] border-2 border-[#171717]">
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Zero Third-Party Ads</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
