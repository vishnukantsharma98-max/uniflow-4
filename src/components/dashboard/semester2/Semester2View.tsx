import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  BookOpen,
  FileText,
  Code2,
  Table,
  Calculator,
  Network,
  Wrench,
  Briefcase,
  Heart,
  Landmark,
  Download,
  ExternalLink,
  ChevronRight,
  Atom,
  Zap,
  KeyRound,
} from 'lucide-react';
import {
  SEM2_ASSIGNMENT_SUBJECTS,
  SEM2_SUBJECT_METAS,
  SEM2_ASSIGNMENTS,
  SEM2_EXAM_VAULT,
  IHVPE_RESOURCE,
  CONSTITUTION_RESOURCE,
} from './Semester2Data';
import { parseRoute, navigate, goBack } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbBackButton,
  NbPasswordBanner,
  getPastelByIndex,
} from '../../ui/NeubrutalUI';

export const Semester2View: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'semester-2' && parsed.sem2State) {
      return parsed.sem2State;
    }
    return { mode: 'sem2Home' as const, context: {} };
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
    goBack('/app/semester-2');
  };

  const getBackLabel = () => {
    const { mode } = viewState;
    if (mode === 'assignmentDetail') return 'Assignments';
    if (mode === 'examVaultDetail') return 'Exam Vault';
    return 'Semester 2';
  };

  const renderSubjectIcon = (name: string, className: string = 'w-6 h-6') => {
    switch (name) {
      case 'Advanced Excel':
        return <Table className={className} />;
      case 'C++':
        return <Code2 className={className} />;
      case 'DSA':
        return <Network className={className} />;
      case 'Maths for AI':
        return <Calculator className={className} />;
      case 'Engineering Workshop':
        return <Wrench className={className} />;
      case 'Professional Skills':
        return <Briefcase className={className} />;
      case 'Applied Physics':
        return <Atom className={className} />;
      case 'EM-2':
        return <Calculator className={className} />;
      case 'BEEE':
        return <Zap className={className} />;
      case 'IHVPE':
        return <Heart className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  const renderPasswordBadge = () => (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-[11px] font-mono font-extrabold">
      <KeyRound className="w-3 h-3 stroke-[2.5]" />
      <span>Pass: vishnu</span>
    </span>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-20">
      {/* Top Synchronized In-App Back Button */}
      {viewState.mode !== 'sem2Home' && (
        <div className="mb-6">
          <NbBackButton
            onClick={handleBack}
            label={`Back to ${getBackLabel()}`}
          />
        </div>
      )}

      {/* 1. SEMESTER 2 ROOT VIEW (4 MAIN FOLDERS) */}
      {viewState.mode === 'sem2Home' && (
        <div className="space-y-8">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#B8F2E6] text-[#171717]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-3">
                  Active Term
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                  Semester 2 Dashboard
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1">
                  Core assignments, exam vault, IHVPE notes &amp; Indian Constitution resources.
                </p>
              </div>
              <div className="shrink-0">
                <NbPasswordBanner password="vishnu" label="Key" className="bg-[#FFD84D]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* 1. Assignments Card */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-2/assignments')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-7 bg-[#8EC5FF] text-[#171717] text-left flex flex-col justify-between min-h-[230px] cursor-pointer"
            >
              <div>
                <div className="w-15 h-15 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5">
                  <BookOpen className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h2 className="text-3xl font-black font-display mb-2">Assignments</h2>
                <p className="text-sm font-semibold text-[#171717]/80">
                  6 Core Subjects &amp; Tasks
                </p>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>Open Assignments</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* 2. Exam Vault Card */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-2/exam-vault')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-7 bg-[#C9B6FF] text-[#171717] text-left flex flex-col justify-between min-h-[230px] cursor-pointer"
            >
              <div>
                <div className="w-15 h-15 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5">
                  <ClipboardCheck className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h2 className="text-3xl font-black font-display mb-2">Exam Vault</h2>
                <p className="text-sm font-semibold text-[#171717]/80">
                  In-Sem 1, 2, 3 &amp; End Sem
                </p>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>Explore Vault</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* 3. IHVPE Card */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-2/ihvpe')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-7 bg-[#FFD84D] text-[#171717] text-left flex flex-col justify-between min-h-[230px] cursor-pointer"
            >
              <div>
                <div className="w-15 h-15 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5">
                  <Heart className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h2 className="text-3xl font-black font-display mb-2">IHVPE</h2>
                <p className="text-sm font-semibold text-[#171717]/80">
                  Universal Human Values &amp; Professional Ethics
                </p>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>Book, Notes &amp; Assignments</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* 4. Indian Constitution Card */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-2/indian-constitution')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-7 bg-[#FF8A65] text-[#171717] text-left flex flex-col justify-between min-h-[230px] cursor-pointer"
            >
              <div>
                <div className="w-15 h-15 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5">
                  <Landmark className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h2 className="text-3xl font-black font-display mb-2">Indian Constitution</h2>
                <p className="text-sm font-semibold text-[#171717]/80">
                  Study Material &amp; Question Bank
                </p>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>Access Material &amp; QB</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 2. SEMESTER 2 ASSIGNMENTS - SUBJECTS MENU */}
      {viewState.mode === 'assignmentsMenu' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#8EC5FF] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Semester 2 Assignments
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                Select Subject
              </h2>
              <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                Choose a subject to view all assignment question sheets
              </p>
            </div>
            <NbPasswordBanner password="vishnu" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEM2_ASSIGNMENT_SUBJECTS.map((subj, idx) => {
              const meta = SEM2_SUBJECT_METAS[subj];
              const count = SEM2_ASSIGNMENTS.filter((a) => a.subject === subj).length;
              const slug = meta.slug;
              const pastelBg = getPastelByIndex(idx);

              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => navigateTo(`/app/semester-2/assignments/${slug}`)}
                  className="group nb-card nb-card-interactive rounded-2xl p-5 bg-[#FFFFFF] dark:bg-[#161B26] text-left flex items-center gap-4 cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${pastelBg} text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
                  >
                    {renderSubjectIcon(subj, 'w-7 h-7 stroke-[2.5]')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black font-display text-[#171717] dark:text-[#F4F1E8] text-lg leading-snug truncate">
                      {subj}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#FFF7DC] text-[#171717] border border-[#171717] text-[11px] font-extrabold tabular-nums">
                        {count} {count === 1 ? 'Assignment' : 'Assignments'}
                      </span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#FFD84D] border-2 border-[#171717] flex items-center justify-center text-[#171717] shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. SEMESTER 2 SPECIFIC SUBJECT ASSIGNMENTS DETAIL */}
      {viewState.mode === 'assignmentDetail' && (
        <div className="space-y-6">
          {(() => {
            const currentSubj = viewState.context.subject || 'Advanced Excel';
            const assignments = SEM2_ASSIGNMENTS.filter((a) => a.subject === currentSubj);

            return (
              <>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#8EC5FF] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                      Sem 2 Assignments
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                      {currentSubj}
                    </h2>
                  </div>
                  <NbPasswordBanner password="vishnu" />
                </div>

                {assignments.length === 0 ? (
                  <div className="nb-card-lg rounded-2xl p-12 text-center bg-[#FFF7DC] dark:bg-[#161B26] max-w-2xl mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#FFD84D] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center">
                      <FileText className="w-8 h-8 text-[#171717] stroke-[2.5]" />
                    </div>
                    <h3 className="text-xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                      No Assignments Uploaded
                    </h3>
                    <p className="text-sm font-semibold text-[#525252] dark:text-[#9AA6BE] mt-1">
                      Check back later or contact admin.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {assignments.map((assign, idx) => (
                      <div
                        key={assign.id}
                        className="nb-card-lg rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-5"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-10 h-10 rounded-lg ${getPastelByIndex(idx)} border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center font-mono font-black text-sm text-[#171717] shrink-0`}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-lg font-black font-display text-[#171717] dark:text-[#F4F1E8] leading-snug">
                            {assign.title}
                          </h3>
                        </div>

                        <div className="flex flex-col gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              openProtectedResource(
                                assign.questionLink,
                                `${assign.subject} - ${assign.title}`
                              )
                            }
                            className="nb-btn nb-btn-primary w-full py-3 rounded-xl text-sm font-extrabold"
                          >
                            <Download className="w-4 h-4 stroke-[2.5]" />
                            <span>Open Question</span>
                          </button>

                          <div className="flex justify-end pt-2 border-t-2 border-[#171717]/10 dark:border-[#2B3347]">
                            {renderPasswordBadge()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* 4. SEMESTER 2 EXAM VAULT - 4 FOLDERS */}
      {viewState.mode === 'examVaultMenu' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Semester 2 Exam Vault
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                Select Examination
              </h2>
              <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                Mid-term and final examination papers
              </p>
            </div>
            <NbPasswordBanner password="vishnu" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SEM2_EXAM_VAULT.map((block, idx) => (
              <button
                key={block.id}
                type="button"
                onClick={() => navigateTo(`/app/semester-2/exam-vault/${block.id}`)}
                className={`group nb-card-lg nb-card-interactive rounded-2xl p-6 ${getPastelByIndex(idx)} text-[#171717] text-left flex flex-col justify-between min-h-[240px] cursor-pointer`}
              >
                <div>
                  <div className="w-13 h-13 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5">
                    <ClipboardCheck className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-black font-display mb-1">{block.title}</h3>
                  <p className="text-xs font-semibold text-[#171717]/80">{block.subtitle}</p>
                </div>
                <div className="mt-5 pt-3 border-t-2 border-[#171717] flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tabular-nums">
                    {block.subjects.length} Subjects
                  </span>
                  <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. SEMESTER 2 EXAM VAULT DETAIL */}
      {viewState.mode === 'examVaultDetail' && (
        <div className="space-y-8">
          {(() => {
            const currentTestId = viewState.context.testId || 'in-sem-1';
            const block =
              SEM2_EXAM_VAULT.find((b) => b.id === currentTestId) || SEM2_EXAM_VAULT[0];

            return (
              <>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                      Exam Vault &bull; {block.title}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                      {block.title} Papers
                    </h2>
                    <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                      {block.subtitle}
                    </p>
                  </div>
                  <NbPasswordBanner password="vishnu" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {block.subjects.map((subName, idx) => (
                    <div
                      key={idx}
                      className="nb-card rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-5"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${getPastelByIndex(idx)} text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
                        >
                          {renderSubjectIcon(subName, 'w-6 h-6 stroke-[2.5]')}
                        </div>
                        <div>
                          <h4 className="font-black font-display text-lg text-[#171717] dark:text-[#F4F1E8]">
                            {subName}
                          </h4>
                          <span className="text-xs font-bold text-[#525252] dark:text-[#9AA6BE]">
                            {block.title} Exam
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="w-full text-center py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-[#525252] dark:text-[#9AA6BE] bg-[#FFF7DC] dark:bg-[#1E2534] border-2 border-dashed border-[#171717]/50 dark:border-[#3D475E]">
                          Paper not uploaded yet
                        </div>
                        <div className="flex justify-end">{renderPasswordBadge()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* 6. IHVPE VIEW */}
      {viewState.mode === 'ihvpe' && (
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FFD84D] text-[#171717]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                  Universal Human Values
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-display">
                  {IHVPE_RESOURCE.title}
                </h2>
                <p className="text-sm font-semibold text-[#171717]/80 mt-1">
                  {IHVPE_RESOURCE.subtitle}
                </p>
              </div>
              <NbPasswordBanner password="vishnu" className="bg-[#FFFDF5]" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Complete Book Card */}
            <div className="nb-card-lg rounded-2xl p-7 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-6">
              <div>
                <div className="w-14 h-14 bg-[#FF8A65] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5">
                  <BookOpen className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8] mb-2">
                  {IHVPE_RESOURCE.completeBook.title}
                </h3>
                <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE]">
                  {IHVPE_RESOURCE.completeBook.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openProtectedResource(
                    IHVPE_RESOURCE.completeBook.link,
                    IHVPE_RESOURCE.completeBook.title
                  )
                }
                className="nb-btn nb-btn-accent w-full py-3 rounded-xl text-sm font-extrabold"
              >
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                <span>Open Book</span>
              </button>
            </div>

            {/* Unit Notes Card */}
            <div className="nb-card-lg rounded-2xl p-7 bg-[#FFF7DC] dark:bg-[#161B26] flex flex-col justify-between gap-4">
              <div>
                <div className="w-14 h-14 bg-[#FFD84D] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5">
                  <FileText className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8] mb-2">
                  Unit Notes
                </h3>
                <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mb-4">
                  Detailed unit-wise study notes:
                </p>
                <div className="flex flex-col gap-2.5">
                  {IHVPE_RESOURCE.unitNotes.map((unit) => (
                    <button
                      key={unit.unit}
                      type="button"
                      onClick={() =>
                        openProtectedResource(unit.link, `IHVPE - ${unit.unit}`)
                      }
                      className="nb-btn nb-btn-white w-full px-4 py-2.5 rounded-xl justify-between text-sm font-extrabold"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 stroke-[2.5]" />
                        <span>{unit.unit}</span>
                      </span>
                      <Download className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Assignments Card */}
            <div className="nb-card-lg rounded-2xl p-7 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-6">
              <div>
                <div className="w-14 h-14 bg-[#8EC5FF] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5">
                  <Briefcase className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8] mb-2">
                  {IHVPE_RESOURCE.assignments.title}
                </h3>
                <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE]">
                  {IHVPE_RESOURCE.assignments.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openProtectedResource(
                    IHVPE_RESOURCE.assignments.link,
                    IHVPE_RESOURCE.assignments.title
                  )
                }
                className="nb-btn nb-btn-blue w-full py-3 rounded-xl text-sm font-extrabold"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>View Assignments</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. INDIAN CONSTITUTION VIEW */}
      {viewState.mode === 'constitution' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FF8A65] text-[#171717]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                  Law &amp; Rights
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-display">
                  {CONSTITUTION_RESOURCE.title}
                </h2>
                <p className="text-sm font-semibold text-[#171717]/85 mt-1">
                  {CONSTITUTION_RESOURCE.subtitle}
                </p>
              </div>
              <NbPasswordBanner password="vishnu" className="bg-[#FFD84D]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Study Material Card */}
            <div className="nb-card-lg rounded-2xl p-8 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-6">
              <div>
                <div className="w-16 h-16 bg-[#FFD84D] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8] mb-2">
                  {CONSTITUTION_RESOURCE.studyMaterial.title}
                </h3>
                <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE]">
                  {CONSTITUTION_RESOURCE.studyMaterial.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openProtectedResource(
                    CONSTITUTION_RESOURCE.studyMaterial.link,
                    CONSTITUTION_RESOURCE.studyMaterial.title
                  )
                }
                className="nb-btn nb-btn-primary w-full py-3.5 rounded-xl text-base font-extrabold"
              >
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                <span>Access Material</span>
              </button>
            </div>

            {/* Question Bank Card */}
            <div className="nb-card-lg rounded-2xl p-8 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-6">
              <div>
                <div className="w-16 h-16 bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] rounded-2xl flex items-center justify-center mb-6">
                  <Landmark className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8] mb-2">
                  {CONSTITUTION_RESOURCE.questionBank.title}
                </h3>
                <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE]">
                  {CONSTITUTION_RESOURCE.questionBank.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openProtectedResource(
                    CONSTITUTION_RESOURCE.questionBank.link,
                    CONSTITUTION_RESOURCE.questionBank.title
                  )
                }
                className="nb-btn nb-btn-secondary w-full py-3.5 rounded-xl text-base font-extrabold"
              >
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                <span>View QB</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
