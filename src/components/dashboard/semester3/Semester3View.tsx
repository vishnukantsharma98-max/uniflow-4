import React, { useState, useEffect } from 'react';
import {
  ListOrdered,
  ChevronRight,
  Network,
  Binary,
  Cpu,
  FlaskConical,
  Terminal,
  Code2,
  Laptop,
  BookOpen,
  Download,
  KeyRound,
} from 'lucide-react';
import { SEM3_SUBJECTS, Sem3Subject } from './Semester3Data';
import { parseRoute, navigate, goBack } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbBackButton,
  NbPasswordBanner,
  getPastelByIndex,
} from '../../ui/NeubrutalUI';

export const Semester3View: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'semester-3' && parsed.sem3State) {
      return parsed.sem3State;
    }
    return { mode: 'sem3Home' as const, context: {} };
  };

  const [viewState, setViewState] = useState(getCurrentState);

  useEffect(() => {
    const handlePopState = () => {
      setViewState(getCurrentState());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    navigate(path);
    setViewState(getCurrentState());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    goBack('/app/semester-3');
  };

  const renderSubjectIcon = (
    iconName: Sem3Subject['icon'],
    className: string = 'w-6 h-6'
  ) => {
    switch (iconName) {
      case 'Network':
        return <Network className={className} />;
      case 'Binary':
        return <Binary className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'FlaskConical':
        return <FlaskConical className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'Code2':
        return <Code2 className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-20">
      {/* Top Back Button when inside Syllabus Subjects view */}
      {viewState.mode !== 'sem3Home' && (
        <div className="mb-6">
          <NbBackButton onClick={handleBack} label="Back to Semester 3" />
        </div>
      )}

      {/* 1. SEMESTER 3 ROOT VIEW - ONLY SYLLABUS CARD */}
      {viewState.mode === 'sem3Home' && (
        <div className="space-y-8">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#C9B6FF] text-[#171717]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-3">
                  Upcoming Curriculum
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                  Semester 3 Archive
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1">
                  Explore core third-semester course syllabi &amp; lab blueprints.
                </p>
              </div>
              <div className="shrink-0">
                <NbPasswordBanner password="vishnu" label="Key" className="bg-[#FFD84D]" />
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <div
              id="sem3-syllabus-root-card"
              onClick={() => navigateTo('/app/semester-3/syllabus')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigateTo('/app/semester-3/syllabus');
                }
              }}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-8 sm:p-10 bg-[#B8F2E6] text-[#171717] cursor-pointer flex flex-col justify-between min-h-[250px]"
            >
              <div>
                <div className="w-16 h-16 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] rounded-2xl flex items-center justify-center mb-6 text-[#171717]">
                  <ListOrdered className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h2 className="text-3xl font-black font-display mb-2">Syllabus</h2>
                <p className="text-sm sm:text-base font-semibold text-[#171717]/80">
                  Curriculum for Sem 3 &bull; {SEM3_SUBJECTS.length} Subjects &amp; Labs
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>View Curriculum</span>
                <ChevronRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SYLLABUS SUBJECTS VIEW */}
      {viewState.mode === 'syllabusSubjects' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Semester 3 &bull; Syllabus
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                Semester 3 Curriculum
              </h2>
              <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                Official course syllabus subjects and laboratories
              </p>
            </div>
            <NbPasswordBanner password="vishnu" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SEM3_SUBJECTS.map((sub, idx) => {
              const hasLink = Boolean(sub.link && sub.link.trim() !== '');
              const pastelBg = getPastelByIndex(idx);

              return (
                <div
                  key={sub.id}
                  id={`sem3-card-${sub.id}`}
                  className="nb-card-lg rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-5"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-13 h-13 rounded-xl ${pastelBg} text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
                    >
                      {renderSubjectIcon(sub.icon, 'w-6 h-6 stroke-[2.5]')}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black font-display text-lg sm:text-xl text-[#171717] dark:text-[#F4F1E8] tracking-tight leading-snug">
                        {sub.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#525252] dark:text-[#9AA6BE]">
                        {sub.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {hasLink ? (
                      <button
                        type="button"
                        onClick={() =>
                          openProtectedResource(sub.link, `${sub.name} Syllabus`)
                        }
                        className="nb-btn nb-btn-primary w-full py-3 rounded-xl text-sm font-extrabold"
                      >
                        <Download className="w-4 h-4 stroke-[2.5]" />
                        <span>Open Syllabus</span>
                      </button>
                    ) : (
                      <div className="w-full text-center py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#525252] dark:text-[#9AA6BE] bg-[#FFF7DC] dark:bg-[#1E2534] border-2 border-dashed border-[#171717]/50 dark:border-[#3D475E] select-none">
                        Syllabus not uploaded yet
                      </div>
                    )}

                    <div className="flex justify-end pt-2 border-t-2 border-[#171717]/10 dark:border-[#2B3347]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-[11px] font-mono font-extrabold">
                        <KeyRound className="w-3 h-3 stroke-[2.5]" />
                        <span>Pass: vishnu</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
