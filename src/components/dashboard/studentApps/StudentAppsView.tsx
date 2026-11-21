import React, { useState, useMemo } from 'react';
import { AppWindow } from 'lucide-react';
import { STUDENT_APPS_DATA, StudentAppItem } from './StudentAppsData';
import { StudentAppCard } from './StudentAppCard';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbPasswordBanner,
  NbSearchBar,
  NbEmptyState,
} from '../../ui/NeubrutalUI';

export const StudentAppsView: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return STUDENT_APPS_DATA;
    const q = searchQuery.toLowerCase().trim();
    return STUDENT_APPS_DATA.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOpenApp = (app: StudentAppItem) => {
    if (app.isDirectAccess) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    } else {
      openProtectedResource(app.url, app.name);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24">
      {/* Hero Header */}
      <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#8EC5FF] text-[#171717] mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-15 h-15 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
              <AppWindow className="w-8 h-8 text-[#171717] stroke-[2.5]" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Productivity &amp; Utilities Suite
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                Student Apps
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1 max-w-xl">
                Essential student apps for organization, coding, design, research, and career advancement.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <NbPasswordBanner password="vishnu" className="bg-[#FFD84D]" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <NbSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search student apps (e.g., Notion, VS Code, Canva)..."
        />
      </div>

      {/* Grid of Student Apps */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, idx) => (
            <StudentAppCard
              key={app.id}
              app={app}
              index={idx}
              onOpenApp={handleOpenApp}
            />
          ))}
        </div>
      ) : (
        <NbEmptyState
          title="No Apps Found"
          description={`No applications match your search query "${searchQuery}".`}
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      )}
    </div>
  );
};
