import React, { useRef, useState, useEffect } from 'react';
import {
  Home,
  GraduationCap,
  FolderGit2,
  Library,
  PlayCircle,
  Gamepad2,
  Sparkles,
  LayoutGrid,
  Share2,
  Settings,
  LogOut,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { DashboardPageId } from './types';
import { UniFlowLogo } from '../UniFlowLogo';
import { checkUserRole } from '../../firebase/firestoreService';

interface MobilePushMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: DashboardPageId;
  onSelectPage: (page: DashboardPageId) => void;
  user: User;
  onLogout: () => void;
}

interface MenuItem {
  id: DashboardPageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'semester-1', label: 'Semester 1', icon: GraduationCap },
  { id: 'semester-2', label: 'Semester 2', icon: GraduationCap },
  { id: 'semester-3', label: 'Semester 3', icon: GraduationCap },
  { id: 'study-resources', label: 'Study Resources', icon: FolderGit2 },
  { id: 'books', label: 'Books', icon: Library },
  { id: 'entertainment', label: 'Entertainment', icon: PlayCircle },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'ai', label: 'AI', icon: Sparkles },
  { id: 'student-apps', label: 'Student Apps', icon: LayoutGrid },
  { id: 'social-media-apps', label: 'Social Media Apps', icon: Share2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const MobilePushMenu: React.FC<MobilePushMenuProps> = ({
  isOpen,
  onClose,
  activePage,
  onSelectPage,
  user,
  onLogout,
}) => {
  const touchStartXRef = useRef<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    checkUserRole(user).then((info) => {
      if (mounted) {
        setIsAdmin(info.isAdmin);
      }
    });
    return () => {
      mounted = false;
    };
  }, [user]);

  const navItems = isAdmin
    ? [
        ...MENU_ITEMS,
        { id: 'admin' as DashboardPageId, label: 'Admin Portal', icon: ShieldCheck, badge: 'ADMIN' },
      ]
    : MENU_ITEMS;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 35) {
      onClose();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-20 min-[1200px]:hidden select-none bg-transparent ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-24px, 0, 0)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease',
        }}
        className="w-[75vw] max-w-[285px] md:w-[320px] md:max-w-[320px] h-full flex flex-col justify-between p-4 pt-6 pb-6 bg-[#FFFDF5] dark:bg-[#0D1017] border-r-[3px] border-[#171717] dark:border-[#3D475E] overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex flex-col gap-3.5 shrink-0">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectPage('home');
              }}
              aria-label="UniFlow Home"
              className="cursor-pointer"
            >
              <UniFlowLogo size="sm" />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="nb-btn-sm w-9 h-9 rounded-lg bg-[#FF8A65] text-[#171717] flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* User Profile Tile */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717]">
            <div className="w-9 h-9 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center font-extrabold text-xs overflow-hidden shrink-0">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{(user.displayName || user.email || 'U')[0].toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-extrabold font-display truncate text-[#171717]">
                {user.displayName || 'Student User'}
              </span>
              <span className="text-[10.5px] font-semibold truncate text-[#262626]">
                {user.email || 'student@uniflow'}
              </span>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-1.5 my-3 overflow-y-auto overflow-x-hidden min-h-0 pr-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onClose();
                  onSelectPage(item.id);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-extrabold font-display border-2 shrink-0 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[3px_3px_0px_#171717]'
                    : 'bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] border-transparent hover:border-[#171717] dark:hover:border-[#FFD84D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-[#FF8A65] text-[#171717] border border-[#171717] text-[9px] font-mono font-extrabold">
                    {item.badge}
                  </span>
                )}

                {isActive && !item.badge && <ChevronRight className="w-4 h-4 stroke-[2.5]" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Logout */}
        <div className="pt-3 border-t-2 border-[#171717] dark:border-[#3D475E] shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full nb-btn nb-btn-accent py-2.5 px-3.5 rounded-xl text-xs font-extrabold justify-start"
          >
            <LogOut className="w-4 h-4 stroke-[2.5]" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
