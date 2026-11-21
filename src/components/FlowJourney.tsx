import React from 'react';
import {
  Compass,
  BookOpen,
  Sparkles,
  Gamepad2,
  Share2,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { FLOW_STAGES } from '../data';
import { getPastelByIndex } from './ui/NeubrutalUI';

export const FlowJourney: React.FC = () => {
  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 stroke-[2.5]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 stroke-[2.5]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 stroke-[2.5]" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 stroke-[2.5]" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 stroke-[2.5]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 stroke-[2.5]" />;
      default:
        return <Sparkles className="w-5 h-5 stroke-[2.5]" />;
    }
  };

  return (
    <section id="features" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold uppercase tracking-wider mb-4">
            <span>The One Flow Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight leading-tight">
            Connect Your Whole Campus Life.
            <br />
            <span className="inline-block mt-2 px-3 py-0.5 bg-[#FF8A65] text-[#171717] border-2 border-[#171717] rounded-lg">
              All in One Continuous Flow.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#404040] dark:text-[#9AA6BE] font-medium mt-4 leading-relaxed max-w-2xl mx-auto">
            Your student life already has dozens of tools. UniFlow connects them into one experience — moving effortlessly from discovery to study, creation, play, and growth.
          </p>
        </div>

        {/* 6-Stage Journey Grid */}
        <div className="relative">
          {/* Crisp Solid Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[3px] bg-[#171717] dark:bg-[#FFFDF5] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {FLOW_STAGES.map((stage, idx) => {
              const pastel = getPastelByIndex(idx);
              return (
                <div
                  key={stage.step}
                  className="group nb-card rounded-2xl p-5 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-150"
                >
                  <div>
                    {/* Step Number + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2 py-0.5 rounded-md bg-[#171717] dark:bg-[#FFD84D] text-[#FFFDF5] dark:text-[#171717] text-xs font-mono font-extrabold">
                        {stage.step}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl ${pastel} text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center`}
                      >
                        {getStageIcon(stage.icon)}
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold font-display text-[#171717] dark:text-[#F4F1E8]">
                      {stage.title}
                    </h3>
                    <p className="text-xs font-medium text-[#404040] dark:text-[#9AA6BE] mt-2 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Bottom Flow Indicator */}
                  <div className="pt-3.5 mt-4 border-t-2 border-[#171717] dark:border-[#2B3347] flex items-center justify-between text-xs font-extrabold text-[#171717] dark:text-[#FFD84D]">
                    <span>Step {stage.step}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
