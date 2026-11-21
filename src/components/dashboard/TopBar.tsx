import React, { useState } from 'react';
import { Search, Moon, Sun, Monitor, Menu, X } from 'lucide-react';
import { User } from 'firebase/auth';
import { DashboardPageId } from './types';
import { useTheme } from './ThemeSystem';

interface TopBarProps {
  activePage: DashboardPageId;
  user: User;
  onOpenSearch?: () => void;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

const PAGE_TITLES: Record<DashboardPageId, string> = {
  home: 'Home',
  'semester-1': 'Semester 1',
  'semester-2': 'Semester 2',
  'semester-3': 'Semester 3',
  'study-resources': 'Study Resources',
  books: 'Books',
  entertainment: 'Entertainment',
  games: 'Games',
  ai: 'AI',
  'student-apps': 'Student Apps',
  'social-media-apps': 'Social Media Apps',
  settings: 'Settings',
  admin: 'Admin Portal',
};

export const TopBar: React.FC<TopBarProps> = ({
  activePage,
  user,
  onOpenSearch,
  onToggleMobileMenu,
  isMobileMenuOpen = false,
}) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const pageTitle = PAGE_TITLES[activePage] || 'Home';

  return (
    <header className="sticky top-0 z-30 h-[64px] w-full flex items-center justify-between px-3.5 sm:px-6 lg:px-8 bg-[#FFFDF5] dark:bg-[#0D1017] border-b-[3px] border-[#171717] dark:border-[#3D475E] shrink-0">
      {/* LEFT: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="min-[1200px]:hidden nb-btn-sm w-10 h-10 rounded-xl bg-[#FFD84D] text-[#171717] flex items-center justify-center cursor-pointer shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>
        )}

        <h1 className="text-base sm:text-xl font-extrabold font-display tracking-tight text-[#171717] dark:text-[#F4F1E8] truncate">
          {pageTitle}
        </h1>
      </div>

      {/* CENTER: Search Workspace Trigger */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-4 hidden sm:block">
        <button
          type="button"
          onClick={onOpenSearch}
          className="nb-btn-sm w-full h-10 px-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] text-[#404040] dark:text-[#9AA6BE] text-left text-xs font-bold flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#171717] dark:text-[#FFD84D] stroke-[2.5]" />
            <span>Search workspace...</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-[#FFD84D] text-[#171717] border border-[#171717] text-[10px] font-mono font-extrabold">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* RIGHT: Mobile Search, Theme Switcher & Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search"
          className="sm:hidden nb-btn-sm w-10 h-10 rounded-xl bg-[#B8F2E6] text-[#171717] flex items-center justify-center cursor-pointer"
        >
          <Search className="w-4.5 h-4.5 stroke-[2.5]" />
        </button>

        {/* Theme Mode Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowThemeMenu((prev) => !prev)}
            aria-label="Toggle theme mode"
            title={`Theme: ${theme} (Active: ${resolvedTheme})`}
            className="nb-btn-sm w-10 h-10 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#FFD84D] flex items-center justify-center cursor-pointer"
          >
            {resolvedTheme === 'dark' ? (
              <Moon className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Sun className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>

          {showThemeMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowThemeMenu(false)} />
              <div className="absolute right-0 top-12 w-40 p-1.5 rounded-xl bg-[#FFFDF5] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#283044] z-50 flex flex-col gap-1">
                {[
                  { id: 'light' as const, label: 'Light', icon: Sun },
                  { id: 'dark' as const, label: 'Dark', icon: Moon },
                  { id: 'system' as const, label: 'System', icon: Monitor },
                ].map((opt) => {
                  const OptIcon = opt.icon;
                  const active = theme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setTheme(opt.id);
                        setShowThemeMenu(false);
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-extrabold text-left cursor-pointer border-2 transition-colors ${
                        active
                          ? 'bg-[#FFD84D] text-[#171717] border-[#171717]'
                          : 'border-transparent text-[#171717] dark:text-[#F4F1E8] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D]'
                      }`}
                    >
                      <OptIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* User Profile Quick Chip */}
        <div className="flex items-center gap-2.5 pl-2.5 border-l-2 border-[#171717] dark:border-[#3D475E]">
          <div className="w-9 h-9 rounded-lg bg-[#C9B6FF] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center font-extrabold text-xs text-[#171717] overflow-hidden shrink-0">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Student'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span>{(user.displayName || user.email || 'V')[0].toUpperCase()}</span>
            )}
          </div>

          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-extrabold font-display leading-none truncate max-w-[130px] text-[#171717] dark:text-[#F4F1E8]">
              {user.displayName || 'Vishnu Kant Sharma'}
            </span>
            <span className="text-[10.5px] font-semibold leading-tight mt-0.5 truncate max-w-[130px] text-[#404040] dark:text-[#9AA6BE]">
              {user.email || 'vishnukantsharma98@gmail.com'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
