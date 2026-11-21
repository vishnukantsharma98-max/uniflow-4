import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  GraduationCap,
  FolderGit2,
  Sparkles,
  Library,
  LayoutGrid,
  Share2,
  PlayCircle,
  Gamepad2,
  ArrowUpRight,
  Search,
  Layers,
  BookOpen,
  Bot,
} from 'lucide-react';
import { DashboardPageId } from './types';
import { WelcomePopup } from './WelcomePopup';
import { shouldShowWelcomePopup, markWelcomePopupShown } from '../../firebase/welcomeSession';
import { navigate } from './navigationRouter';

interface DashboardHomeProps {
  user: User;
  onSelectPage?: (page: DashboardPageId) => void;
  onOpenSearch?: () => void;
}

interface DestinationCardItem {
  id: DashboardPageId;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ElementType;
  bgClass: string;
}

const DESTINATION_CARDS: DestinationCardItem[] = [
  {
    id: 'semester-1',
    title: 'Semester 1',
    subtitle: 'Maths, Physics & PYQs',
    tag: 'Academics',
    icon: GraduationCap,
    bgClass: 'bg-[#FFD84D]',
  },
  {
    id: 'semester-2',
    title: 'Semester 2',
    subtitle: 'DSA, Math for AI & Notes',
    tag: 'Academics',
    icon: GraduationCap,
    bgClass: 'bg-[#8EC5FF]',
  },
  {
    id: 'semester-3',
    title: 'Semester 3',
    subtitle: 'COA, OS, DBMS & Exam Vault',
    tag: 'Academics',
    icon: GraduationCap,
    bgClass: 'bg-[#C9B6FF]',
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    subtitle: 'Cinema Lounge & Shows',
    tag: 'Media',
    icon: PlayCircle,
    bgClass: 'bg-[#FF8A65]',
  },
  {
    id: 'study-resources',
    title: 'Study Resources',
    subtitle: 'Placement & Roadmaps',
    tag: 'Career',
    icon: FolderGit2,
    bgClass: 'bg-[#B8F2E6]',
  },
  {
    id: 'books',
    title: 'Books',
    subtitle: 'Digital Library & Literature',
    tag: 'Library',
    icon: Library,
    bgClass: 'bg-[#FFD84D]',
  },
  {
    id: 'games',
    title: 'Game Zone',
    subtitle: 'Quick brain breaks',
    tag: 'Arcade',
    icon: Gamepad2,
    bgClass: 'bg-[#B8F2E6]',
  },
  {
    id: 'ai',
    title: 'AI Lab',
    subtitle: 'Tools & Intelligence',
    tag: 'AI Suite',
    icon: Sparkles,
    bgClass: 'bg-[#C9B6FF]',
  },
  {
    id: 'student-apps',
    title: 'Student Apps',
    subtitle: 'Productivity & Utilities',
    tag: 'Utilities',
    icon: LayoutGrid,
    bgClass: 'bg-[#8EC5FF]',
  },
  {
    id: 'social-media-apps',
    title: 'Social Media Apps',
    subtitle: 'Student Networks',
    tag: 'Connect',
    icon: Share2,
    bgClass: 'bg-[#FF8A65]',
  },
];

const QUICK_STATS = [
  { label: 'Active Modules', value: '10', icon: Layers, bg: 'bg-[#FFD84D]' },
  { label: 'Semesters Ready', value: '03', icon: BookOpen, bg: 'bg-[#B8F2E6]' },
  { label: 'AI Tools Hub', value: '15+', icon: Bot, bg: 'bg-[#C9B6FF]' },
  { label: 'Arcade & Media', value: '24/7', icon: Gamepad2, bg: 'bg-[#8EC5FF]' },
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  user,
  onSelectPage,
  onOpenSearch,
}) => {
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);

  const getUserFirstName = () => {
    if (user?.displayName && user.displayName.trim().length > 0) {
      const parts = user.displayName.trim().split(/\s+/);
      if (parts[0]) return parts[0];
    }
    if (user?.email) {
      const localPart = user.email.split('@')[0];
      const cleaned = localPart.replace(/[0-9._-]/g, ' ').trim().split(/\s+/)[0];
      if (cleaned && cleaned.length > 0) {
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
      }
    }
    return 'Vishnu';
  };

  const userFirstName = getUserFirstName() || 'Vishnu';

  useEffect(() => {
    if (user?.uid && shouldShowWelcomePopup(user.uid)) {
      markWelcomePopupShown(user.uid);
      setShowWelcomePopup(true);
    }
  }, [user?.uid]);

  const handleClosePopup = () => {
    if (user?.uid) {
      markWelcomePopupShown(user.uid);
    }
    setShowWelcomePopup(false);
  };

  const handleCardClick = (pageId: DashboardPageId) => {
    if (onSelectPage) {
      onSelectPage(pageId);
    } else {
      navigate(pageId === 'home' ? '/app' : `/app/${pageId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="uniflow-home-container" className="w-full flex flex-col gap-6 sm:gap-8 pb-10">
      {/* 1. BOLD WELCOME HERO BANNER */}
      <header
        id="home-minimal-header"
        className="rounded-2xl p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#161B26] border-[3px] border-[#171717] dark:border-[#3D475E] shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#283044] flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div>
          <span className="inline-block px-3 py-1 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-3">
            Student Command Center
          </span>
          <h1
            id="home-greeting-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#171717] dark:text-[#F4F1E8] leading-tight"
          >
            Hey, {userFirstName}!
          </h1>
          <p className="text-sm sm:text-base font-medium text-[#404040] dark:text-[#9AA6BE] mt-1.5">
            Your centralized academic, AI, and creative workspace — jump into any module below.
          </p>
        </div>

        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="nb-btn nb-btn-secondary px-5 py-3 rounded-xl text-sm font-extrabold shrink-0 self-start md:self-center"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Quick Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#FFFDF5] border border-[#171717] text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>
        )}
      </header>

      {/* 2. COLORFUL STATISTIC CARDS STRIP */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4" aria-label="Workspace overview stats">
        {QUICK_STATS.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-2xl p-4 sm:p-5 ${stat.bg} text-[#171717] border-2 border-[#171717] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#38435E] flex items-center justify-between gap-3`}
            >
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#262626]">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold font-display tabular-nums leading-none mt-1.5">
                  {stat.value}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#FFFDF5] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center shrink-0">
                <StatIcon className="w-5 h-5 text-[#171717] stroke-[2.5]" />
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. MULTI-COLUMN WORKSPACE DESTINATION GRID */}
      <section aria-label="Workspace modules">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8]">
            All Workspace Modules
          </h2>
          <span className="px-2.5 py-1 rounded-lg bg-[#FFF7DC] dark:bg-[#1E2534] text-[#171717] dark:text-[#FFD84D] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-extrabold">
            {DESTINATION_CARDS.length} Hubs
          </span>
        </div>

        <div
          id="home-quick-access-grid"
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {DESTINATION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                id={`card-${card.id}`}
                type="button"
                onClick={() => handleCardClick(card.id)}
                className={`group relative w-full min-h-[168px] rounded-2xl p-5 sm:p-6 ${card.bgClass} text-[#171717] border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#38435E] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#171717] dark:hover:shadow-[4px_4px_0px_#F4F1E8] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-120 flex flex-col justify-between text-left cursor-pointer select-none`}
              >
                {/* Top Row: Icon & Tag + Arrow */}
                <div className="w-full flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FFFDF5] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[#171717] stroke-[2.5]" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#FFFDF5] border-2 border-[#171717] text-[10px] font-extrabold uppercase tracking-wider">
                      {card.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#FFFDF5] flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Content Block */}
                <div className="mt-5">
                  <h3 className="text-xl font-extrabold font-display tracking-tight text-[#171717]">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#262626] mt-1 leading-snug">
                    {card.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <WelcomePopup isOpen={showWelcomePopup} onClose={handleClosePopup} />
    </div>
  );
};
