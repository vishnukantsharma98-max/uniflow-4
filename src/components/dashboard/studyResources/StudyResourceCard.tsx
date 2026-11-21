import React from 'react';
import { PlayCircle, ExternalLink, KeyRound, Youtube } from 'lucide-react';
import { StudyResource } from './StudyResourcesData';
import { getPastelByIndex } from '../../ui/NeubrutalUI';

interface StudyResourceCardProps {
  resource: StudyResource;
  index?: number;
  onOpenResource: (resource: StudyResource) => void;
}

export const StudyResourceCard: React.FC<StudyResourceCardProps> = ({
  resource,
  index = 0,
  onOpenResource,
}) => {
  const isYoutube =
    resource.url?.includes('youtube.com') || resource.url?.includes('youtu.be');
  const pastelBg = getPastelByIndex(index);

  return (
    <div
      id={`study-resource-card-${resource.id}`}
      className="nb-card-lg rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] flex flex-col justify-between gap-5"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={`w-13 h-13 rounded-xl ${
              isYoutube ? 'bg-[#FF8A65]' : pastelBg
            } border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center text-[#171717] shrink-0`}
          >
            {isYoutube ? (
              <Youtube className="w-7 h-7 stroke-[2.5]" />
            ) : (
              <PlayCircle className="w-7 h-7 stroke-[2.5]" />
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-[#FFF7DC] text-[#171717] border-2 border-[#171717] uppercase tracking-wider">
              {resource.categoryLabel}
            </span>
            {resource.channelOrAuthor && (
              <span className="text-[11px] font-bold text-[#525252] dark:text-[#9AA6BE]">
                {resource.channelOrAuthor}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-black font-display tracking-tight leading-snug mb-2">
          {resource.title}
          {resource.channelOrAuthor &&
            !resource.title.includes(resource.channelOrAuthor) && (
              <span className="text-[#525252] dark:text-[#9AA6BE] font-semibold">
                {' '}
                &mdash; {resource.channelOrAuthor}
              </span>
            )}
        </h3>

        {resource.description && (
          <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] leading-relaxed line-clamp-2">
            {resource.description}
          </p>
        )}
      </div>

      <div className="pt-4 border-t-2 border-[#171717]/15 dark:border-[#2B3347] space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold bg-[#FFF7DC] dark:bg-[#1E2534] px-3 py-1.5 rounded-lg border-2 border-[#171717] dark:border-[#3D475E]">
          <span className="flex items-center gap-1.5 text-[#171717] dark:text-[#F4F1E8]">
            <KeyRound className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Access Key</span>
          </span>
          <span className="font-mono text-[#171717] dark:text-[#FFD84D] uppercase">
            vishnu
          </span>
        </div>

        {resource.url ? (
          <button
            type="button"
            onClick={() => onOpenResource(resource)}
            className="nb-btn nb-btn-primary w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold"
          >
            <span>Open Resource</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </button>
        ) : (
          <div className="w-full py-3 px-4 rounded-xl bg-[#FFF7DC] dark:bg-[#1E2534] border-2 border-dashed border-[#171717]/40 text-[#525252] dark:text-[#8693AD] text-center text-xs font-extrabold uppercase">
            Resource link not available
          </div>
        )}
      </div>
    </div>
  );
};
