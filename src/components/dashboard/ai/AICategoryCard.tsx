import React from 'react';
import {
  MessageSquareText,
  Video,
  Image as ImageIcon,
  Presentation,
  Globe,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AICategory } from './AIData';
import { getPastelByIndex } from '../../ui/NeubrutalUI';

interface AICategoryCardProps {
  category: AICategory;
  toolCount: number;
  index?: number;
  onSelect: (category: AICategory) => void;
}

export const AICategoryCard: React.FC<AICategoryCardProps> = ({
  category,
  toolCount,
  index = 0,
  onSelect,
}) => {
  const renderIcon = (name: string) => {
    const props = { className: 'w-7 h-7 text-[#171717] stroke-[2.5]' };
    switch (name) {
      case 'MessageSquareText':
        return <MessageSquareText {...props} />;
      case 'Video':
        return <Video {...props} />;
      case 'Image':
        return <ImageIcon {...props} />;
      case 'Presentation':
        return <Presentation {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const pastelBg = getPastelByIndex(index);

  return (
    <div
      id={`ai-folder-${category.id}`}
      onClick={() => onSelect(category)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(category);
        }
      }}
      className="group nb-card-lg nb-card-interactive rounded-2xl p-6 sm:p-7 bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] cursor-pointer flex flex-col justify-between min-h-[230px]"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div
            className={`w-14 h-14 rounded-xl ${pastelBg} border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
          >
            {renderIcon(category.iconName)}
          </div>

          <span className="px-3 py-1 rounded-lg bg-[#FFF7DC] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider tabular-nums">
            {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
          </span>
        </div>

        <h3 className="text-2xl font-black font-display tracking-tight mb-2">
          {category.title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] leading-relaxed">
          {category.shortDescription}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t-2 border-[#171717]/15 dark:border-[#2B3347] flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider">
          Explore Tools
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    </div>
  );
};
