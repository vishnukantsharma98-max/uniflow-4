import React from 'react';
import { BookOpen, FolderArchive, Bot, Gamepad2, Zap, Target } from 'lucide-react';

export const StatsRibbon: React.FC = () => {
  const stats = [
    {
      value: '12+',
      label: 'Subjects',
      icon: <BookOpen className="w-5 h-5 text-[#171717] stroke-[2.5]" />,
      subtext: 'Engineering Core',
      bg: 'bg-[#FFD84D]',
    },
    {
      value: '30K+',
      label: 'Resources',
      icon: <FolderArchive className="w-5 h-5 text-[#171717] stroke-[2.5]" />,
      subtext: 'Notes, PYQs & Papers',
      bg: 'bg-[#B8F2E6]',
    },
    {
      value: '15+',
      label: 'AI Tools',
      icon: <Bot className="w-5 h-5 text-[#171717] stroke-[2.5]" />,
      subtext: 'Code, Math & Research',
      bg: 'bg-[#C9B6FF]',
    },
    {
      value: '10+',
      label: 'Games',
      icon: <Gamepad2 className="w-5 h-5 text-[#171717] stroke-[2.5]" />,
      subtext: 'Focus & Arcade',
      bg: 'bg-[#FF8A65]',
    },
    {
      value: '24/7',
      label: 'Always Live',
      icon: <Zap className="w-5 h-5 text-[#171717] stroke-[2.5]" />,
      subtext: 'Cloud Synchronized',
      bg: 'bg-[#8EC5FF]',
    },
    {
      value: '100%',
      label: 'Student First',
      icon: <Target className="w-5 h-5 text-[#171717] stroke-[2.5]" />,
      subtext: 'Zero Clutter',
      bg: 'bg-[#FFF7DC]',
    },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 scroll-reveal">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-4 sm:p-5 border-2 border-[#171717] dark:border-[#171717] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#38435E] ${stat.bg} text-[#171717] flex flex-col items-start justify-between transition-transform duration-150 hover:-translate-y-1`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFFDF5] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center mb-3">
              {stat.icon}
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight tabular-nums leading-none">
              {stat.value}
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider mt-1.5">
              {stat.label}
            </span>
            <span className="text-[11px] font-semibold text-[#262626] mt-0.5">
              {stat.subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
