import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { UniFlowLogo } from './UniFlowLogo';
import { useTheme } from './dashboard/ThemeSystem';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  isSigningIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenSearch, isSigningIn = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      const sections = ['home', 'features', 'explore', 'ai-hub', 'resources', 'founder'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Explore', href: '#explore', id: 'explore' },
    { label: 'AI Hub', href: '#ai-hub', id: 'ai-hub' },
    { label: 'Resources', href: '#resources', id: 'resources' },
    { label: 'About Founder', href: '#founder', id: 'founder' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-[#FFFDF5] dark:bg-[#0D1017] border-b-[3px] border-[#171717] dark:border-[#3D475E] transition-all duration-150 ${
        isScrolled ? 'py-2.5 shadow-[0_4px_0px_#171717] dark:shadow-[0_4px_0px_#283044]' : 'py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* LEFT: UniFlow Neubrutalist Logo */}
        <a
          href="#home"
          aria-label="UniFlow Home"
          className="flex items-center shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
        >
          <UniFlowLogo size="md" />
        </a>

        {/* CENTER: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold font-display tracking-wide border-2 transition-all duration-150 ${
                  isActive
                    ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[3px_3px_0px_#171717] dark:border-[#171717] dark:shadow-[3px_3px_0px_#38435E]'
                    : 'bg-transparent text-[#171717] dark:text-[#F4F1E8] border-transparent hover:border-[#171717] dark:hover:border-[#FFD84D] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            className="nb-btn-sm w-9 h-9 rounded-lg bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] flex items-center justify-center cursor-pointer"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FFD84D] stroke-[2.5]" />
            ) : (
              <Moon className="w-4 h-4 text-[#171717] stroke-[2.5]" />
            )}
          </button>

          {/* Search Spotlight Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search resources"
            className="nb-btn-sm px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#B8F2E6] text-[#171717] flex items-center gap-1.5 text-xs font-extrabold cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 bg-[#FFFDF5] text-[10px] font-mono font-bold text-[#171717] rounded border border-[#171717]">
              ⌘K
            </kbd>
          </button>

          {/* Login Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenAuth();
            }}
            className="hidden md:inline-flex nb-btn-sm px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] text-xs font-extrabold cursor-pointer"
          >
            Login
          </button>

          {/* Primary Google CTA */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenAuth();
            }}
            aria-label="Continue with Google"
            className="nb-btn nb-btn-primary px-3.5 sm:px-4 py-2 rounded-lg text-xs font-extrabold shrink-0"
          >
            <div className="w-4 h-4 rounded-sm bg-[#FFFFFF] border border-[#171717] flex items-center justify-center p-0.5 shrink-0 pointer-events-none">
              <svg className="w-full h-full pointer-events-none" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <span className="hidden sm:inline whitespace-nowrap pointer-events-none">
              {isSigningIn ? 'Signing in...' : 'Continue with Google'}
            </span>
            <span className="sm:hidden whitespace-nowrap pointer-events-none">
              {isSigningIn ? 'Signing in...' : 'Sign in'}
            </span>
          </button>

          {/* Mobile & Tablet Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden nb-btn-sm w-9 h-9 rounded-lg bg-[#C9B6FF] text-[#171717] flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5] pointer-events-none" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-4 pb-6 bg-[#FFFDF5] dark:bg-[#0D1017] border-t-[3px] border-[#171717] dark:border-[#3D475E] shadow-[0_6px_0px_#171717]">
          <div className="flex flex-col gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-extrabold font-display border-2 transition-all ${
                    isActive
                      ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[3px_3px_0px_#171717]'
                      : 'bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] border-[#171717] dark:border-[#3D475E] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="pt-4 border-t-2 border-[#171717] dark:border-[#3D475E] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full nb-btn nb-btn-white py-2.5 rounded-xl text-sm font-extrabold"
            >
              Login
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full nb-btn nb-btn-primary py-3 rounded-xl text-sm font-extrabold"
            >
              <div className="w-4 h-4 rounded-sm bg-[#FFFFFF] border border-[#171717] flex items-center justify-center p-0.5 shrink-0 pointer-events-none">
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
              <ArrowRight className="w-4 h-4 stroke-[2.5] pointer-events-none" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
