import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
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
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
} from 'lucide-react';
import { DashboardPageId } from './types';
import { UniFlowLogo } from '../UniFlowLogo';
import { checkUserRole } from '../../firebase/firestoreService';

interface DesktopNavRailProps {
  activePage: DashboardPageId;
  user: User;
  onSelectPage: (page: DashboardPageId) => void;
  onLogout: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  id: DashboardPageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
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

export const DesktopNavRail: React.FC<DesktopNavRailProps> = ({
  activePage,
  user,
  onSelectPage,
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
        ...PRIMARY_NAV_ITEMS,
        { id: 'admin' as DashboardPageId, label: 'Admin Portal', icon: ShieldCheck, badge: 'ADMIN' },
      ]
    : PRIMARY_NAV_ITEMS;

  const isExpanded = !isCollapsed || isHovered;

  return (
    <aside
      onMouseEnter={() => {
        if (isCollapsed) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (isCollapsed) setIsHovered(false);
      }}
      aria-label="Sidebar Navigation"
      className={`hidden min-[1200px]:flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 bg-[#FFFDF5] dark:bg-[#0D1017] border-r-[3px] border-[#171717] dark:border-[#3D475E] transition-[width] duration-200 select-none ${
        isExpanded ? 'w-[254px]' : 'w-[80px]'
      }`}
    >
      {/* Top Section: Brand + User Profile */}
      <div className="flex flex-col shrink-0">
        {/* 1. Primary UniFlow Brand */}
        <div className="h-[64px] flex items-center px-3.5 border-b-[3px] border-[#171717] dark:border-[#3D475E] shrink-0">
          <div className="flex items-center justify-between w-full gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectPage('home');
              }}
              aria-label="UniFlow Home"
              title="Return to Home"
              className="flex items-center gap-2 min-w-0 cursor-pointer"
            >
              <UniFlowLogo size="sm" showText={isExpanded} />
            </button>

            {onToggleCollapse && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCollapse();
                }}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="nb-btn-sm w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] flex items-center justify-center cursor-pointer shrink-0"
              >
                {isCollapsed && !isHovered ? (
                  <PanelLeftOpen className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <PanelLeftClose className="w-4 h-4 stroke-[2.5]" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* 2. User Info Tile */}
        <div className="p-3 shrink-0 border-b-2 border-[#171717] dark:border-[#2B3347]">
          <div
            className="flex items-center gap-2.5 p-2 rounded-xl bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] overflow-hidden"
            title={user.displayName || user.email || 'User'}
          >
            <div className="w-9 h-9 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center font-extrabold text-xs overflow-hidden shrink-0">
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

            {isExpanded && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-extrabold font-display leading-tight truncate text-[#171717]">
                  {user.displayName || 'Vishnu Kant Sharma'}
                </span>
                <span className="text-[10.5px] font-semibold leading-tight truncate mt-0.5 text-[#262626]">
                  {user.email || 'vishnukantsharma98@gmail.com'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Navigation Items */}
      <nav className="flex-1 flex flex-col gap-1.5 px-3 py-3 overflow-y-auto overflow-x-hidden min-h-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectPage(item.id);
              }}
              title={!isExpanded ? item.label : undefined}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex items-center h-10 px-2.5 rounded-xl text-[13px] font-extrabold font-display shrink-0 border-2 transition-all duration-120 cursor-pointer ${
                isActive
                  ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[3px_3px_0px_#171717] dark:border-[#171717] dark:shadow-[3px_3px_0px_#38435E]'
                  : 'bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] border-transparent hover:border-[#171717] dark:hover:border-[#FFD84D] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D]'
              }`}
            >
              <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>

              {isExpanded && (
                <span className="ml-2.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.label}
                </span>
              )}

              {item.badge && isExpanded && (
                <span className="ml-auto px-1.5 py-0.5 rounded bg-[#FF8A65] text-[#171717] border border-[#171717] text-[9px] font-mono font-extrabold">
                  {item.badge}
                </span>
              )}

              {isActive && isExpanded && !item.badge && (
                <ChevronRight className="w-4 h-4 ml-auto stroke-[2.5]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Action: Sign Out */}
      <div className="p-3 border-t-[3px] border-[#171717] dark:border-[#3D475E] shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLogout();
          }}
          title={!isExpanded ? 'Sign Out' : undefined}
          className="w-full nb-btn nb-btn-accent h-10 px-3 rounded-xl text-xs font-extrabold justify-start"
        >
          <LogOut className="w-4 h-4 stroke-[2.5] shrink-0" />
          {isExpanded && <span className="whitespace-nowrap">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
