import React from 'react';
import { Home, GraduationCap, FolderGit2, Sparkles } from 'lucide-react';
import { DashboardPageId } from './types';

interface MobileBottomNavProps {
  activePage: DashboardPageId;
  onSelectPage: (page: DashboardPageId) => void;
}

interface BottomNavItem {
  id: DashboardPageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'semester-2', label: 'Sem 2', icon: GraduationCap },
  { id: 'semester-1', label: 'Sem 1', icon: GraduationCap },
  { id: 'study-resources', label: 'Resources', icon: FolderGit2 },
  { id: 'ai', label: 'AI', icon: Sparkles },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onSelectPage,
}) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden absolute bottom-0 left-0 right-0 z-40 bg-[#FFFDF5] dark:bg-[#0D1017] border-t-[3px] border-[#171717] dark:border-[#3D475E] px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] select-none"
    >
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPage(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl border-2 transition-all duration-120 cursor-pointer ${
                isActive
                  ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[2px_2px_0px_#171717] font-extrabold'
                  : 'bg-transparent text-[#404040] dark:text-[#9AA6BE] border-transparent font-bold hover:text-[#171717] dark:hover:text-[#FFFDF5]'
              }`}
            >
              <Icon className="w-4.5 h-4.5 stroke-[2.5]" />
              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
