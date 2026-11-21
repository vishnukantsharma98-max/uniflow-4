import React from 'react';
import {
  Terminal,
  Code2,
  Binary,
  Coffee,
  Network,
  Boxes,
  Database,
  Cpu,
  Radio,
  Microchip,
  Workflow,
  FileCode,
  Globe,
  Layers,
  GitBranch,
  Sparkles,
  Brain,
  Cloud,
  Server,
  Trophy,
  ChevronRight,
  Folder,
} from 'lucide-react';
import { StudyCategory } from './StudyResourcesData';
import { getPastelByIndex } from '../../ui/NeubrutalUI';

interface StudyCategoryCardProps {
  category: StudyCategory;
  resourceCount: number;
  index?: number;
  onSelect: (category: StudyCategory) => void;
}

export const StudyCategoryCard: React.FC<StudyCategoryCardProps> = ({
  category,
  resourceCount,
  index = 0,
  onSelect,
}) => {
  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-[#171717] stroke-[2.5]' };
    switch (name) {
      case 'Terminal': return <Terminal {...props} />;
      case 'Code2': return <Code2 {...props} />;
      case 'Binary': return <Binary {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'Network': return <Network {...props} />;
      case 'Boxes': return <Boxes {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Radio': return <Radio {...props} />;
      case 'Microchip': return <Microchip {...props} />;
      case 'Workflow': return <Workflow {...props} />;
      case 'FileCode': return <FileCode {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Brain': return <Brain {...props} />;
      case 'Cloud': return <Cloud {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Trophy': return <Trophy {...props} />;
      default: return <Folder {...props} />;
    }
  };

  const pastelBg = getPastelByIndex(index);

  return (
    <div
      id={`study-folder-${category.id}`}
      onClick={() => onSelect(category)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(category);
        }
      }}
      className="group nb-card nb-card-interactive rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] cursor-pointer flex flex-col justify-between min-h-[215px]"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div
            className={`w-13 h-13 rounded-xl ${pastelBg} border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
          >
            {renderIcon(category.iconName)}
          </div>

          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-[#FFF7DC] text-[#171717] border-2 border-[#171717] uppercase tracking-wide tabular-nums">
            {resourceCount} {resourceCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <h3 className="text-xl font-black font-display tracking-tight mb-1.5">
          {category.title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] leading-relaxed line-clamp-2">
          {category.shortDescription}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t-2 border-[#171717]/15 dark:border-[#2B3347] flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider">
          Browse Folder
        </span>
        <div className="w-7 h-7 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    </div>
  );
};
