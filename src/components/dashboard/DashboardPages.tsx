import React from 'react';
import { useTheme } from './ThemeSystem';
import { Semester1View } from './semester1/Semester1View';
import { Semester2View } from './semester2/Semester2View';
import { Semester3View } from './semester3/Semester3View';
import { AIView } from './ai/AIView';
import { StudyResourcesView } from './studyResources/StudyResourcesView';
import { StudentAppsView } from './studentApps/StudentAppsView';
import { SocialMediaView } from './socialMedia/SocialMediaView';
import { BooksView } from './books/BooksView';
import { GamesView } from './games/GamesView';
import { EntertainmentView } from './entertainment/EntertainmentView';
import { Moon, Sun, Monitor, Palette, Check } from 'lucide-react';

export const Semester1Page: React.FC = () => <Semester1View />;
export const Semester2Page: React.FC = () => <Semester2View />;
export const Semester3Page: React.FC = () => <Semester3View />;
export const StudyResourcesPage: React.FC = () => <StudyResourcesView />;
export const BooksPage: React.FC = () => <BooksView />;
export const EntertainmentPage: React.FC = () => <EntertainmentView />;
export const GamesPage: React.FC = () => <GamesView />;
export const AIPage: React.FC = () => <AIView />;
export const StudentAppsPage: React.FC = () => <StudentAppsView />;
export const SocialMediaAppsPage: React.FC = () => <SocialMediaView />;

export const SettingsPage: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themeOptions = [
    {
      id: 'light' as const,
      label: 'Light',
      desc: 'Warm off-white #FFFDF5',
      icon: Sun,
      bg: 'bg-[#FFD84D]',
    },
    {
      id: 'dark' as const,
      label: 'Dark',
      desc: 'High-contrast ink mode',
      icon: Moon,
      bg: 'bg-[#C9B6FF]',
    },
    {
      id: 'system' as const,
      label: 'System',
      desc: 'Matches OS preference',
      icon: Monitor,
      bg: 'bg-[#B8F2E6]',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center py-6 space-y-6">
      <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#161B26] space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-3">
              <Palette className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Appearance</span>
            </span>
            <h2 className="text-2xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight">
              Theme Preference
            </h2>
            <p className="text-sm font-medium text-[#404040] dark:text-[#9AA6BE] mt-1">
              Choose your interface mode or sync automatically with your device settings.
            </p>
          </div>
          <span className="px-3 py-1 rounded-lg bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase">
            Active: {resolvedTheme}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={`relative p-5 rounded-xl border-2 border-[#171717] dark:border-[#3D475E] flex flex-col items-start gap-3 text-left cursor-pointer transition-all duration-120 ${
                  isSelected
                    ? `${opt.bg} text-[#171717] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#283044]`
                    : 'bg-[#FFFDF5] dark:bg-[#1E2534] text-[#171717] dark:text-[#F4F1E8] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D] shadow-[2px_2px_0px_#171717]'
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] flex items-center justify-center text-[#171717]">
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-md bg-[#171717] text-[#FFD84D] flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-base font-extrabold font-display block">{opt.label}</span>
                  <span
                    className={`text-xs font-semibold block mt-0.5 ${
                      isSelected ? 'text-[#262626]' : 'text-[#404040] dark:text-[#9AA6BE]'
                    }`}
                  >
                    {opt.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
