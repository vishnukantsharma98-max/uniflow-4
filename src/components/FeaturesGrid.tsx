import React from 'react';
import {
  Gauge,
  Cloud,
  UserCheck,
  Lock,
  Zap,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { PLATFORM_FEATURES } from '../data';
import { getPastelByIndex } from './ui/NeubrutalUI';

export const FeaturesGrid: React.FC = () => {
  const getFeatureIcon = (iconName: string) => {
    const cls = 'w-5 h-5 text-[#171717] stroke-[2.5]';
    switch (iconName) {
      case 'Gauge':
        return <Gauge className={cls} />;
      case 'Cloud':
        return <Cloud className={cls} />;
      case 'UserCheck':
        return <UserCheck className={cls} />;
      case 'Lock':
        return <Lock className={cls} />;
      case 'Zap':
        return <Zap className={cls} />;
      case 'KeyRound':
        return <KeyRound className={cls} />;
      default:
        return <Zap className={cls} />;
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FF8A65] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold uppercase tracking-wider mb-4">
            <span>Built for Modern Universities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight leading-tight">
            Engineered for{' '}
            <span className="inline-block px-2.5 py-0.5 bg-[#FFD84D] text-[#171717] border-2 border-[#171717] rounded-lg">
              Velocity & Focus.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#404040] dark:text-[#9AA6BE] font-medium mt-4 leading-relaxed">
            Every feature is calibrated around high-contrast readability, zero ad tracking, and instantaneous cloud synchronization.
          </p>
        </div>

        {/* 6-Card Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PLATFORM_FEATURES.map((feature, idx) => {
            const pastel = getPastelByIndex(idx);
            return (
              <div
                key={idx}
                className="nb-card-lg rounded-2xl p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-150"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl ${pastel} border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center`}
                    >
                      {getFeatureIcon(feature.icon)}
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      {feature.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold font-display text-[#171717] dark:text-[#F4F1E8]">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-[#404040] dark:text-[#9AA6BE] mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t-2 border-[#171717] dark:border-[#2B3347] flex items-center justify-between text-xs font-bold">
                  <span className="text-[#404040] dark:text-[#9AA6BE]">Sub-100ms response</span>
                  <span className="px-2 py-0.5 rounded bg-[#FFD84D] text-[#171717] border border-[#171717] font-extrabold">
                    Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
