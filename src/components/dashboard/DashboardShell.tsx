import React, { useState, useEffect } from 'react';
import { DashboardPageId, DashboardShellProps } from './types';
import { DesktopNavRail } from './DesktopNavRail';
import { TopBar } from './TopBar';
import { MobilePushMenu } from './MobilePushMenu';
import { MobileBottomNav } from './MobileBottomNav';
import { DashboardHome } from './DashboardHome';
import {
  Semester1Page,
  Semester2Page,
  Semester3Page,
  StudyResourcesPage,
  BooksPage,
  EntertainmentPage,
  GamesPage,
  AIPage,
  StudentAppsPage,
  SocialMediaAppsPage,
  SettingsPage,
} from './DashboardPages';
import { ThemeProvider, useTheme } from './ThemeSystem';
import { PasswordGateProvider } from './passwordGate/PasswordGateContext';
import { useResponsiveBreakpoint } from './useResponsiveBreakpoint';
import {
  Search,
  BookOpen,
  Bot,
  LayoutGrid,
  X,
  GraduationCap,
  Library,
  Gamepad2,
  PlayCircle,
  Share2,
  ArrowUpRight,
} from 'lucide-react';
import { parseRoute, navigate, initializeHistory } from './navigationRouter';

interface DashboardContentProps extends DashboardShellProps {
  onNavigate?: (path: string) => void;
}

const SEARCH_SHORTCUTS: Array<{
  title: string;
  subtitle: string;
  page: DashboardPageId;
  icon: React.ElementType;
  bg: string;
}> = [
  { title: 'Semester 1', subtitle: 'Maths, Physics & PYQs', page: 'semester-1', icon: GraduationCap, bg: 'bg-[#FFD84D]' },
  { title: 'Semester 2', subtitle: 'DSA, Math for AI & Notes', page: 'semester-2', icon: GraduationCap, bg: 'bg-[#8EC5FF]' },
  { title: 'Semester 3', subtitle: 'COA, OS, DBMS & Vault', page: 'semester-3', icon: GraduationCap, bg: 'bg-[#C9B6FF]' },
  { title: 'Study Resources', subtitle: 'Placement & Roadmaps', page: 'study-resources', icon: BookOpen, bg: 'bg-[#B8F2E6]' },
  { title: 'AI Lab', subtitle: 'AI Tools & Models', page: 'ai', icon: Bot, bg: 'bg-[#C9B6FF]' },
  { title: 'Books Library', subtitle: 'Digital Library & Literature', page: 'books', icon: Library, bg: 'bg-[#FFD84D]' },
  { title: 'Game Zone', subtitle: 'Arcade & Focus Breaks', page: 'games', icon: Gamepad2, bg: 'bg-[#FF8A65]' },
  { title: 'Entertainment', subtitle: 'Cinema Lounge & Shows', page: 'entertainment', icon: PlayCircle, bg: 'bg-[#FF8A65]' },
  { title: 'Student Apps', subtitle: 'Productivity & Utilities', page: 'student-apps', icon: LayoutGrid, bg: 'bg-[#8EC5FF]' },
  { title: 'Social Media Apps', subtitle: 'Student Networks', page: 'social-media-apps', icon: Share2, bg: 'bg-[#B8F2E6]' },
];

const DashboardContent: React.FC<DashboardContentProps> = ({ user, onLogout, onNavigate }) => {
  const [activePage, setActivePage] = useState<DashboardPageId>(() => {
    return parseRoute(typeof window !== 'undefined' ? window.location.pathname : '/app').page;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pushedTouchStartXRef = React.useRef<number | null>(null);
  const mainScrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeHistory();
    const handlePopState = () => {
      const parsed = parseRoute(window.location.pathname);
      setActivePage(parsed.page);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const { isDesktop, isTablet, isMobile } = useResponsiveBreakpoint();

  useEffect(() => {
    if (isDesktop && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop, isMobileMenuOpen]);

  const isPushed = !isDesktop && isMobileMenuOpen;

  const handlePushedTouchStart = (e: React.TouchEvent) => {
    if (isPushed) {
      pushedTouchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handlePushedTouchEnd = (e: React.TouchEvent) => {
    if (!isPushed || pushedTouchStartXRef.current === null) return;
    const diff = pushedTouchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 30) {
      setIsMobileMenuOpen(false);
    }
    pushedTouchStartXRef.current = null;
  };

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPage = (page: DashboardPageId) => {
    if (page === 'admin') {
      if (onNavigate) {
        onNavigate('/admin');
      } else {
        navigate('/admin');
      }
      return;
    }
    const targetPath = page === 'home' ? '/app' : `/app/${page}`;
    navigate(targetPath);
    setActivePage(page);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredShortcuts = SEARCH_SHORTCUTS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  });

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <DashboardHome
            user={user}
            onSelectPage={handleSelectPage}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        );
      case 'semester-1':
        return <Semester1Page />;
      case 'semester-2':
        return <Semester2Page />;
      case 'semester-3':
        return <Semester3Page />;
      case 'study-resources':
        return <StudyResourcesPage />;
      case 'books':
        return <BooksPage />;
      case 'entertainment':
        return <EntertainmentPage />;
      case 'games':
        return <GamesPage />;
      case 'ai':
        return <AIPage />;
      case 'student-apps':
        return <StudentAppsPage />;
      case 'social-media-apps':
        return <SocialMediaAppsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardHome
            user={user}
            onSelectPage={handleSelectPage}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        );
    }
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full relative overflow-hidden flex bg-[#FFD84D] dark:bg-[#0D1017] text-[#171717] dark:text-[#F4F1E8] font-sans">
      {/* Mobile/Tablet Push Drawer Menu (< 1200px only) */}
      {!isDesktop && (
        <MobilePushMenu
          isOpen={isPushed}
          onClose={() => setIsMobileMenuOpen(false)}
          activePage={activePage}
          onSelectPage={handleSelectPage}
          user={user}
          onLogout={onLogout}
        />
      )}

      {/* Desktop Navigation Rail (>= 1200px) */}
      <DesktopNavRail
        activePage={activePage}
        user={user}
        onSelectPage={handleSelectPage}
        onLogout={onLogout}
        isCollapsed={isDesktopCollapsed}
        onToggleCollapse={() => setIsDesktopCollapsed((prev) => !prev)}
      />

      {/* Main Dashboard Application Frame */}
      <div
        onTouchStart={handlePushedTouchStart}
        onTouchEnd={handlePushedTouchEnd}
        style={{
          transformOrigin: 'center center',
          transform: isPushed
            ? isTablet
              ? 'translate3d(clamp(220px, 45vw, 305px), 0, 0) scale(0.84)'
              : 'translate3d(clamp(195px, 58vw, 260px), 0, 0) scale(0.84)'
            : 'translate3d(0, 0, 0) scale(1)',
          borderRadius: isPushed ? '24px' : '0px',
          border: isPushed ? `3px solid ${isDark ? '#FFFDF5' : '#171717'}` : 'none',
          boxShadow: isPushed
            ? isDark
              ? '-8px 8px 0px #000000'
              : '-8px 8px 0px #171717'
            : 'none',
          transition:
            'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 280ms ease, box-shadow 280ms ease',
        }}
        className="flex-1 flex flex-col h-[100dvh] max-h-[100dvh] w-full z-30 overflow-hidden relative bg-[#FFFDF5] dark:bg-[#0D1017]"
      >
        {/* Subtle Dot Grid Texture inside Workspace */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 nb-dot-grid opacity-[0.12] dark:opacity-[0.28] z-0"
        />

        {/* Overlay to close mobile menu on tap */}
        {isPushed && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchStart={handlePushedTouchStart}
            onTouchEnd={handlePushedTouchEnd}
            className="absolute inset-0 z-50 bg-transparent cursor-pointer"
          />
        )}

        {/* Scrollable Page Body */}
        <div
          ref={mainScrollRef}
          className="relative z-10 flex-1 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col"
        >
          <TopBar
            activePage={activePage}
            user={user}
            onOpenSearch={() => setIsSearchOpen(true)}
            onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
            isMobileMenuOpen={isPushed}
          />

          <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-12 max-w-7xl mx-auto flex flex-col">
            {renderActivePage()}
          </main>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        {isMobile && (
          <MobileBottomNav activePage={activePage} onSelectPage={handleSelectPage} />
        )}
      </div>

      {/* Global Search Modal (Neubrutalist Command Palette) */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#171717]/75"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg nb-modal rounded-2xl overflow-hidden"
          >
            {/* Header Search Bar */}
            <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-[#FFD84D] border-b-[3px] border-[#171717]">
              <div className="flex items-center gap-2.5 flex-1">
                <div className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 text-[#171717] stroke-[2.5]" />
                </div>
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Jump to semesters, AI lab, books, games..."
                  className="w-full bg-transparent text-sm font-bold text-[#171717] focus:outline-none placeholder:text-[#404040]"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A65] cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Filtered Shortcuts */}
            <div className="p-3 max-h-80 overflow-y-auto space-y-2 bg-[#FFFDF5] dark:bg-[#0D1017]">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#404040] dark:text-[#9AA6BE] px-1 block">
                Workspace Destinations
              </span>
              {filteredShortcuts.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      handleSelectPage(item.page);
                    }}
                    className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#283044] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D] transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg ${item.bg} border-2 border-[#171717] flex items-center justify-center shrink-0`}
                      >
                        <Icon className="w-4 h-4 text-[#171717] stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] truncate">
                          {item.title}
                        </p>
                        <p className="text-xs font-semibold text-[#404040] dark:text-[#9AA6BE] truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#171717] dark:text-[#FFD84D] stroke-[2.5] shrink-0" />
                  </button>
                );
              })}
              {filteredShortcuts.length === 0 && (
                <p className="text-center py-6 text-xs font-bold text-[#404040] dark:text-[#9AA6BE]">
                  No matching workspace sections.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DashboardShell: React.FC<DashboardShellProps> = (props) => {
  return (
    <ThemeProvider>
      <PasswordGateProvider>
        <DashboardContent {...props} />
      </PasswordGateProvider>
    </ThemeProvider>
  );
};
