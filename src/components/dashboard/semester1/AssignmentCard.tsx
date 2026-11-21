import React from 'react';
import { FileText, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

interface AssignmentCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  questionUrl?: string;
  answerUrl?: string;
  index?: number;
  accentColor?: 'violet' | 'blue' | 'amber' | 'emerald' | 'cyan' | 'indigo';
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  subtitle,
  badge,
  questionUrl,
  answerUrl,
  index,
  accentColor = 'violet',
}) => {
  const hasQuestion = Boolean(
    questionUrl && questionUrl.trim().length > 0 && questionUrl !== 'NONE'
  );
  const hasAnswer = Boolean(
    answerUrl && answerUrl.trim().length > 0 && answerUrl !== 'NONE'
  );

  const colorMap = {
    violet: {
      iconBg: 'bg-[#C9B6FF]',
      badgeBg: 'bg-[#C9B6FF]',
      btnPrimary: 'nb-btn-purple',
    },
    blue: {
      iconBg: 'bg-[#8EC5FF]',
      badgeBg: 'bg-[#8EC5FF]',
      btnPrimary: 'nb-btn-blue',
    },
    amber: {
      iconBg: 'bg-[#FFD84D]',
      badgeBg: 'bg-[#FFD84D]',
      btnPrimary: 'nb-btn-primary',
    },
    emerald: {
      iconBg: 'bg-[#B8F2E6]',
      badgeBg: 'bg-[#B8F2E6]',
      btnPrimary: 'nb-btn-secondary',
    },
    cyan: {
      iconBg: 'bg-[#B8F2E6]',
      badgeBg: 'bg-[#8EC5FF]',
      btnPrimary: 'nb-btn-secondary',
    },
    indigo: {
      iconBg: 'bg-[#C9B6FF]',
      badgeBg: 'bg-[#FFD84D]',
      btnPrimary: 'nb-btn-purple',
    },
  }[accentColor];

  return (
    <div className="nb-card rounded-2xl p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-4">
      {/* Top Details */}
      <div className="flex items-start gap-3.5">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border-2 border-[#171717] shadow-[2px_2px_0px_#171717] text-[#171717] ${colorMap.iconBg}`}
        >
          {badge?.toLowerCase().includes('lab') ? (
            <Sparkles className="w-5 h-5 stroke-[2.5]" />
          ) : (
            <FileText className="w-5 h-5 stroke-[2.5]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm sm:text-base font-black font-display tracking-tight text-[#171717] dark:text-[#F4F1E8] line-clamp-1">
              {title}
            </h4>
            {badge && (
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border-2 border-[#171717] text-[#171717] ${colorMap.badgeBg}`}
              >
                {badge}
              </span>
            )}
            {hasAnswer && !badge && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border-2 border-[#171717] bg-[#B8F2E6] text-[#171717]">
                Solution
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs font-semibold text-[#525252] dark:text-[#9AA6BE] mt-0.5 line-clamp-1">
              {subtitle}
            </p>
          )}
          {index !== undefined && !subtitle && (
            <p className="text-[11px] font-mono font-bold text-[#525252] dark:text-[#9AA6BE] mt-0.5">
              Unit {Math.min(5, Math.ceil((index + 1) / 3))} &bull; Module {index + 1}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 pt-1">
        {hasQuestion && (
          <a
            href={questionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`nb-btn flex-1 px-3.5 py-2.5 rounded-xl text-xs font-extrabold ${
              hasAnswer ? 'nb-btn-white' : colorMap.btnPrimary
            }`}
          >
            <span>Open Question</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        )}

        {hasAnswer && (
          <a
            href={answerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`nb-btn flex-1 px-3.5 py-2.5 rounded-xl text-xs font-extrabold ${
              hasQuestion ? 'nb-btn-secondary' : colorMap.btnPrimary
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{hasQuestion ? 'Solution' : 'Open Solution'}</span>
            <ExternalLink className="w-3 h-3 stroke-[2.5]" />
          </a>
        )}
      </div>
    </div>
  );
};
