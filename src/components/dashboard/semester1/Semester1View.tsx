import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  ListOrdered,
  BookOpen,
  GraduationCap,
  Calculator,
  Atom,
  FlaskConical,
  Terminal,
  Laptop,
  Brain,
  MessageSquare,
  Presentation,
  FileText,
  Download,
  Youtube,
  Leaf,
  ChevronRight,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';
import {
  SEM1_SUBJECTS,
  SEM1_ASSIGNMENTS,
  SEM1_TEST_DATA,
  SEM1_SYLLABUS_DATA,
  EVS_RESOURCE,
} from './Semester1Data';
import { parseRoute, navigate, goBack, slugify } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbBackButton,
  NbPasswordBanner,
  getPastelByIndex,
} from '../../ui/NeubrutalUI';

export const Semester1View: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'semester-1' && parsed.sem1State) {
      return parsed.sem1State;
    }
    return { mode: 'sem1Home' as const, context: {} };
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
    goBack('/app/semester-1');
  };

  const getBackLabel = () => {
    const { mode } = viewState;
    if (mode === 'assignments') return 'Assignments';
    if (mode === 'testDetail') return 'Exam Vault';
    return 'Semester 1';
  };

  const renderSubjectIcon = (name: string, className: string = 'w-6 h-6') => {
    switch (name) {
      case 'EM-I':
      case 'Mathematics':
        return <Calculator className={className} />;
      case 'Applied Physics':
        return <Atom className={className} />;
      case 'Applied Physics Lab':
        return <FlaskConical className={className} />;
      case 'CPLT':
        return <Terminal className={className} />;
      case 'CPLT Lab':
        return <Laptop className={className} />;
      case 'AI':
      case 'Artificial Intelligence':
        return <Brain className={className} />;
      case 'Communication Skills':
        return <MessageSquare className={className} />;
      case 'Communication Skills Lab':
        return <Presentation className={className} />;
      case 'EVS':
        return <Leaf className={className} />;
      case 'Engineering Chemistry':
        return <FlaskConical className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  const renderPasswordBadge = (pwd = 'vishnu') => (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-[11px] font-mono font-extrabold">
      <KeyRound className="w-3 h-3 stroke-[2.5]" />
      <span>Pass: {pwd}</span>
    </span>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-20">
      {/* Top Synchronized In-App Back Button */}
      {viewState.mode !== 'sem1Home' && (
        <div className="mb-6">
          <NbBackButton
            onClick={handleBack}
            label={`Back to ${getBackLabel()}`}
          />
        </div>
      )}

      {/* 1. SEMESTER 1 ROOT VIEW (4 Bold Neubrutalist Cards) */}
      {viewState.mode === 'sem1Home' && (
        <div className="space-y-8">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FFD84D] text-[#171717]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-3">
                  Academic Archive
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                  Semester 1 Hub
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1">
                  Exam papers, official syllabus, subject assignments &amp; EVS Swayam resources.
                </p>
              </div>
              <div className="shrink-0">
                <NbPasswordBanner password="vishnu" label="Key" className="bg-[#FFFDF5]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Exam Vault */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-1/exam-vault')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#C9B6FF] text-[#171717] text-left flex flex-col justify-between min-h-[250px] cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5 text-[#171717]">
                  <ClipboardCheck className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-black font-display mb-2">Exam Vault</h2>
                <p className="text-sm font-semibold text-[#171717]/80">
                  In-Sem 1, In-Sem 2 &amp; End Sem papers
                </p>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>Explore Tests</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Syllabus */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-1/syllabus')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#B8F2E6] text-[#171717] text-left flex flex-col justify-between min-h-[250px] cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5 text-[#171717]">
                  <ListOrdered className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-black font-display mb-2">Syllabus</h2>
                <p className="text-sm font-semibold text-[#171717]/80">
                  Official curriculum for Sem 1
                </p>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>View Curriculum</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Assignments */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-1/assignments')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#8EC5FF] text-[#171717] text-left flex flex-col justify-between min-h-[250px] cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5 text-[#171717]">
                  <BookOpen className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-black font-display mb-2">Assignments</h2>
                <p className="text-sm font-semibold text-[#171717]/80">
                  Subject-wise task library
                </p>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>View Subjects</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* (EVS) Swayam */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-1/evs-swayam')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#FF8A65] text-[#171717] text-left flex flex-col justify-between min-h-[250px] cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center mb-5 text-[#171717]">
                  <GraduationCap className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-black font-display mb-2">(EVS) Swayam</h2>
                <p className="text-sm font-semibold text-[#171717]/80">
                  Environmental Studies notes &amp; playlist
                </p>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                <span>Open Notes &amp; Videos</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 2. EXAM VAULT / TESTS SELECTION */}
      {viewState.mode === 'testsMenu' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Semester 1 Exam Vault
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                Select Examination
              </h2>
              <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                Choose between mid-terms or final semester papers
              </p>
            </div>
            <NbPasswordBanner password="vishnu" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* In-Sem 1 */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-1/exam-vault/in-sem-1')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-7 bg-[#8EC5FF] text-[#171717] text-left flex flex-col justify-between min-h-[260px] cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase">
                    Mid-Term 1
                  </span>
                </div>
                <h3 className="text-3xl font-black font-display mb-2">In-Sem 1</h3>
                <p className="text-sm font-semibold text-[#171717]/80">
                  First mid-term question papers &amp; verified solutions
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-[#171717] flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase">5 Subjects Available</span>
                {renderPasswordBadge()}
              </div>
            </button>

            {/* In-Sem 2 */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-1/exam-vault/in-sem-2')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-7 bg-[#C9B6FF] text-[#171717] text-left flex flex-col justify-between min-h-[260px] cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase">
                    Mid-Term 2
                  </span>
                </div>
                <h3 className="text-3xl font-black font-display mb-2">In-Sem 2</h3>
                <p className="text-sm font-semibold text-[#171717]/80">
                  Second mid-term question papers &amp; verified solutions
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-[#171717] flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase">5 Subjects Available</span>
                {renderPasswordBadge()}
              </div>
            </button>

            {/* End Sem */}
            <button
              type="button"
              onClick={() => navigateTo('/app/semester-1/exam-vault/end-sem')}
              className="group nb-card-lg nb-card-interactive rounded-2xl p-7 bg-[#B8F2E6] text-[#171717] text-left flex flex-col justify-between min-h-[260px] cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase">
                    Final Exams
                  </span>
                </div>
                <h3 className="text-3xl font-black font-display mb-2">End Sem</h3>
                <p className="text-sm font-semibold text-[#171717]/80">
                  Final semester examination papers
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-[#171717] flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase">4 Subjects</span>
                {renderPasswordBadge()}
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 3. TEST DETAIL VIEW */}
      {viewState.mode === 'testDetail' && (
        <div className="space-y-8">
          {(() => {
            const currentSemData = SEM1_TEST_DATA['2025']?.['Semester - I'] || [];
            const block =
              currentSemData.find((b) => b.title === viewState.context.testTitle) ||
              currentSemData[0];
            const isEndSem = viewState.context.testTitle === 'End Sem';

            return (
              <>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                      Exam Vault &bull; {block.title}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                      {block.title} Question Papers
                    </h2>
                    <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                      {isEndSem
                        ? 'Semester 1 End-Semester subjects'
                        : 'Access questions and verified solutions'}
                    </p>
                  </div>
                  <NbPasswordBanner password="vishnu" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {block.subjects.map((sub, idx) => {
                    const hasQuestion = Boolean(sub.questionLink && sub.questionLink.trim() !== '');
                    const hasAnswer = Boolean(sub.answerLink && sub.answerLink.trim() !== '');
                    const displayName = sub.name === 'Mathematics' ? 'EM-I' : sub.name;
                    const pastelBg = getPastelByIndex(idx);

                    return (
                      <div
                        key={idx}
                        className="nb-card-lg rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-13 h-13 rounded-xl ${pastelBg} text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
                            >
                              {renderSubjectIcon(sub.name, 'w-6 h-6 stroke-[2.5]')}
                            </div>
                            <div>
                              <h4 className="font-black font-display text-xl text-[#171717] dark:text-[#F4F1E8]">
                                {displayName}
                              </h4>
                              <span className="text-xs font-bold text-[#525252] dark:text-[#9AA6BE]">
                                {block.title} Exam
                              </span>
                            </div>
                          </div>
                          {renderPasswordBadge()}
                        </div>

                        <div className="flex flex-col gap-3">
                          {isEndSem ? (
                            hasQuestion ? (
                              <button
                                type="button"
                                onClick={() =>
                                  openProtectedResource(
                                    sub.questionLink!,
                                    `${sub.name} - End Sem Paper`
                                  )
                                }
                                className="nb-btn nb-btn-primary w-full py-3 rounded-xl text-sm font-extrabold"
                              >
                                <Download className="w-4 h-4 stroke-[2.5]" />
                                <span>Question Paper</span>
                              </button>
                            ) : (
                              <div className="w-full text-center py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-[#525252] dark:text-[#9AA6BE] bg-[#FFF7DC] dark:bg-[#1E2534] border-2 border-dashed border-[#171717] dark:border-[#3D475E]">
                                Paper not uploaded yet
                              </div>
                            )
                          ) : (
                            <div className="flex gap-3">
                              {hasQuestion ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openProtectedResource(
                                      sub.questionLink!,
                                      `${sub.name} - ${block.title} Question`
                                    )
                                  }
                                  className="nb-btn nb-btn-blue flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold"
                                >
                                  <Download className="w-4 h-4 stroke-[2.5]" />
                                  <span>Question</span>
                                </button>
                              ) : (
                                <span className="flex-1 text-center py-2.5 rounded-xl text-xs font-extrabold text-[#525252] bg-[#FFF7DC] dark:bg-[#1E2534] dark:text-[#8693AD] border-2 border-dashed border-[#171717]/40 cursor-not-allowed">
                                  Question N/A
                                </span>
                              )}

                              {hasAnswer ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openProtectedResource(
                                      sub.answerLink!,
                                      `${sub.name} - ${block.title} Solution`
                                    )
                                  }
                                  className="nb-btn nb-btn-secondary flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold"
                                >
                                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                                  <span>Solution</span>
                                </button>
                              ) : (
                                <span className="flex-1 text-center py-2.5 rounded-xl text-xs font-extrabold text-[#525252] bg-[#FFF7DC] dark:bg-[#1E2534] dark:text-[#8693AD] border-2 border-dashed border-[#171717]/40 cursor-not-allowed">
                                  Soon
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* 4. SYLLABUS DIRECTORY VIEW */}
      {viewState.mode === 'syllabusSubjects' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Official Curriculum
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                Semester 1 Curriculum
              </h2>
              <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                Official course syllabus documents
              </p>
            </div>
            <NbPasswordBanner password="vishnu" />
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
            {(SEM1_SYLLABUS_DATA['2025']?.['1st Semester'] || []).map((sub, idx) => {
              const displayName = sub.name === 'Mathematics' ? 'EM-I' : sub.name;
              const pastelBg = getPastelByIndex(idx);
              return (
                <div
                  key={idx}
                  className="nb-card rounded-2xl p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${pastelBg} text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
                    >
                      {renderSubjectIcon(sub.name, 'w-6 h-6 stroke-[2.5]')}
                    </div>
                    <div>
                      <h4 className="font-black font-display text-[#171717] dark:text-[#F4F1E8] text-base sm:text-lg">
                        {displayName}
                      </h4>
                      <span className="text-xs font-bold text-[#525252] dark:text-[#9AA6BE]">
                        Complete Syllabus PDF
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block">{renderPasswordBadge()}</div>
                    <button
                      type="button"
                      onClick={() => openProtectedResource(sub.link, `${displayName} Syllabus`)}
                      className="nb-btn nb-btn-secondary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold"
                      title="Download Syllabus"
                    >
                      <Download className="w-4 h-4 stroke-[2.5]" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. ASSIGNMENT SUBJECTS LIST VIEW */}
      {viewState.mode === 'subjects' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#8EC5FF] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Task Library
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                Semester 1 Assignments
              </h2>
              <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                Select a subject to access all assignments &amp; solutions
              </p>
            </div>
            <NbPasswordBanner password="vishnu" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {SEM1_SUBJECTS.map((subj, idx) => {
              const count = SEM1_ASSIGNMENTS.filter(
                (a) => a.subject === subj || (subj === 'EM-I' && a.subject === 'Mathematics')
              ).length;
              const slug = slugify(subj);
              const pastelBg = getPastelByIndex(idx);

              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => navigateTo(`/app/semester-1/assignments/${slug}`)}
                  className="group nb-card nb-card-interactive rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] text-left flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <div
                      className={`w-14 h-14 rounded-xl ${pastelBg} text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center mb-4`}
                    >
                      {renderSubjectIcon(subj, 'w-7 h-7 stroke-[2.5]')}
                    </div>
                    <h3 className="font-black font-display text-lg text-[#171717] dark:text-[#F4F1E8] leading-snug">
                      {subj}
                    </h3>
                  </div>
                  <div className="pt-3 border-t-2 border-[#171717]/15 dark:border-[#2B3347] flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#FFF7DC] text-[#171717] border-2 border-[#171717] text-xs font-extrabold tabular-nums">
                      {count} {count === 1 ? 'Task' : 'Tasks'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#171717] dark:text-[#F4F1E8] stroke-[3] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. SPECIFIC SUBJECT ASSIGNMENTS VIEW */}
      {viewState.mode === 'assignments' && (
        <div className="space-y-6">
          {(() => {
            const currentSubj = viewState.context.subject || 'EM-I';
            const assignments = SEM1_ASSIGNMENTS.filter(
              (a) =>
                a.subject === currentSubj ||
                (currentSubj === 'EM-I' && a.subject === 'Mathematics')
            );

            return (
              <>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#8EC5FF] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                      Assignments Library
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                      {currentSubj}
                    </h2>
                  </div>
                  <NbPasswordBanner password="vishnu" />
                </div>

                {assignments.length === 0 ? (
                  <div className="nb-card-lg rounded-2xl p-12 text-center bg-[#FFF7DC] dark:bg-[#161B26]">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#FFD84D] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center">
                      <FileText className="w-8 h-8 text-[#171717] stroke-[2.5]" />
                    </div>
                    <h3 className="text-xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                      No Assignments Yet
                    </h3>
                    <p className="text-sm font-semibold text-[#525252] dark:text-[#9AA6BE] mt-1">
                      Check back later for updates.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {assignments.map((assign, idx) => (
                      <div
                        key={assign.id}
                        className="nb-card-lg rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-10 h-10 rounded-lg ${getPastelByIndex(idx)} border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center font-mono font-black text-sm text-[#171717] shrink-0`}
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-lg font-black font-display text-[#171717] dark:text-[#F4F1E8] leading-snug">
                              {assign.title.replace('Maths', 'EM-I')}
                            </h3>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-wrap gap-3">
                            {assign.questionLink ? (
                              <button
                                type="button"
                                onClick={() =>
                                  openProtectedResource(
                                    assign.questionLink,
                                    `${assign.title} - Question`
                                  )
                                }
                                className="nb-btn nb-btn-primary flex-1 py-2.5 rounded-xl text-sm font-extrabold"
                              >
                                <Download className="w-4 h-4 stroke-[2.5]" />
                                <span>Question</span>
                              </button>
                            ) : (
                              <span className="flex-1 bg-[#FFF7DC] dark:bg-[#1E2534] text-[#525252] dark:text-[#8693AD] border-2 border-dashed border-[#171717]/40 py-2.5 rounded-xl font-bold text-center text-xs">
                                No Question Link
                              </span>
                            )}

                            {assign.answerLink && (
                              <button
                                type="button"
                                onClick={() =>
                                  openProtectedResource(
                                    assign.answerLink,
                                    `${assign.title} - Solution`
                                  )
                                }
                                className="nb-btn nb-btn-secondary flex-1 py-2.5 rounded-xl text-sm font-extrabold"
                              >
                                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                                <span>Solution</span>
                              </button>
                            )}
                          </div>
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

      {/* 7. EVS SWAYAM NOTES & PLAYLIST VIEW */}
      {viewState.mode === 'swayamNotes' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-10 bg-[#FF8A65] text-[#171717]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
                <Leaf className="w-9 h-9 text-[#171717] stroke-[2.5]" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                  Swayam Course
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-display">
                  {EVS_RESOURCE.title}
                </h2>
                <p className="text-sm sm:text-base font-semibold text-[#171717]/85 mt-1">
                  {EVS_RESOURCE.subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <NbPasswordBanner password={EVS_RESOURCE.password} />
          </div>

          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase mb-2">
                Chapter Study Pack
              </span>
              <h3 className="text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                {EVS_RESOURCE.chapter}
              </h3>
              <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                {EVS_RESOURCE.desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
              <button
                type="button"
                onClick={() =>
                  openProtectedResource(EVS_RESOURCE.notesLink, 'EVS Chapter 1 Notes')
                }
                className="nb-btn nb-btn-accent px-5 py-3 rounded-xl text-sm font-extrabold flex-1 md:flex-none"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>View Notes</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  openProtectedResource(
                    EVS_RESOURCE.playlistLink,
                    'EVS Video Lectures Playlist'
                  )
                }
                className="nb-btn nb-btn-white px-5 py-3 rounded-xl text-sm font-extrabold flex-1 md:flex-none"
              >
                <Youtube className="w-5 h-5 text-[#FF6B6B] stroke-[2.5]" />
                <span>Playlist</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
