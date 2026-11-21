import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Gamepad2,
  Library,
  LayoutGrid,
  PlayCircle,
  FolderGit2,
  ArrowRight,
  Check,
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data';
import { getPastelByIndex } from './ui/NeubrutalUI';

interface EcosystemCategoriesProps {
  onOpenAuth: () => void;
}

export const EcosystemCategories: React.FC<EcosystemCategoriesProps> = ({ onOpenAuth }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'study' | 'resources' | 'tools'>('all');

  const getCategoryIcon = (iconName: string, className = 'w-5 h-5 stroke-[2.5]') => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Gamepad2':
        return <Gamepad2 className={className} />;
      case 'Library':
        return <Library className={className} />;
      case 'LayoutGrid':
        return <LayoutGrid className={className} />;
      case 'PlayCircle':
        return <PlayCircle className={className} />;
      case 'FolderGit2':
        return <FolderGit2 className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const filteredCategories = CATEGORIES_DATA.filter((cat) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return cat.id === 'ai-hub';
    if (activeFilter === 'study') return cat.id === 'study' || cat.id === 'books';
    if (activeFilter === 'resources') return cat.id === 'resources' || cat.id === 'study';
    if (activeFilter === 'tools') return cat.id === 'apps' || cat.id === 'games' || cat.id === 'entertainment';
    return true;
  });

  const filterTabs: Array<{ id: 'all' | 'ai' | 'resources' | 'study' | 'tools'; label: string }> = [
    { id: 'all', label: 'All Modules' },
    { id: 'ai', label: 'AI Hub' },
    { id: 'resources', label: 'Resources & PYQs' },
    { id: 'study', label: 'Study & Books' },
    { id: 'tools', label: 'Apps & Games' },
  ];

  return (
    <section id="explore" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden scroll-mt-20">
      {/* Anchor landmarks */}
      <div id="ai-hub" className="absolute top-1/4 left-0 -mt-20 pointer-events-none" />
      <div id="resources" className="absolute top-1/2 left-0 -mt-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Modular Student Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight leading-tight">
            Everything you need.{' '}
            <span className="inline-block px-2.5 py-0.5 bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] rounded-lg">
              One place.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#404040] dark:text-[#9AA6BE] font-medium mt-4 leading-relaxed">
            Stop switching across dozens of tabs and scattered drives. UniFlow organizes every essential branch of your university journey into one unified workspace.
          </p>

          {/* Neubrutalist Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-7">
            {filterTabs.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`nb-btn-sm px-4 py-2 rounded-lg text-xs font-extrabold font-display cursor-pointer ${
                    active
                      ? 'bg-[#FFD84D] text-[#171717]'
                      : 'bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCategories.map((cat, idx) => {
            const pastel = getPastelByIndex(idx);
            return (
              <div
                key={cat.id}
                id={`cat-${cat.id}`}
                onClick={onOpenAuth}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenAuth();
                  }
                }}
                className="group nb-card-lg rounded-2xl p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#161B26] cursor-pointer flex flex-col justify-between hover:-translate-y-1 transition-transform duration-150"
              >
                <div>
                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${pastel} text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center`}
                    >
                      {getCategoryIcon(cat.icon)}
                    </div>
                    {cat.badge && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#FFD84D] text-[#171717] border-2 border-[#171717]">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8]">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-extrabold text-[#404040] dark:text-[#9AA6BE]">
                      · {cat.tagline}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-[#404040] dark:text-[#9AA6BE] mt-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Outlined Item Chips */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-2 border-[#171717] dark:border-[#2B3347]">
                    {cat.items.slice(0, 3).map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFFDF5] dark:bg-[#1E2534] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-bold text-[#171717] dark:text-[#F4F1E8]"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3] text-[#171717] dark:text-[#FFD84D] shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-5 border-t-2 border-[#171717] dark:border-[#2B3347] flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#171717] dark:text-[#FFD84D] truncate">
                    {cat.highlightText}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg ${pastel} text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] text-xs font-extrabold shrink-0 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform`}
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
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
