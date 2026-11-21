import React from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  Search,
  Terminal,
  Cpu,
  Layers,
  CircleDot,
  Flame,
  Compass,
  MessageSquare,
  Activity,
  Film,
  Clapperboard,
  Video,
  PlaySquare,
  Image,
  Palette,
  Aperture,
  Wand2,
  Dice5,
  Presentation,
  Sliders,
  Sparkle,
  LayoutTemplate,
  MonitorPlay,
  Globe,
  Layout,
  PanelTop,
  Code,
  AppWindow,
  KeyRound,
  ArrowUpRight,
} from 'lucide-react';
import { AITool } from './AIData';
import { getPastelByIndex } from '../../ui/NeubrutalUI';

interface AIToolCardProps {
  tool: AITool;
  index?: number;
  onOpenTool: (tool: AITool) => void;
}

export const AIToolCard: React.FC<AIToolCardProps> = ({
  tool,
  index = 0,
  onOpenTool,
}) => {
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#171717] stroke-[2.5]' };
    switch (iconName) {
      case 'Bot': return <Bot {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Search': return <Search {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'CircleDot': return <CircleDot {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'MessageSquare': return <MessageSquare {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Film': return <Film {...props} />;
      case 'Clapperboard': return <Clapperboard {...props} />;
      case 'Video': return <Video {...props} />;
      case 'PlaySquare': return <PlaySquare {...props} />;
      case 'Image': return <Image {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Aperture': return <Aperture {...props} />;
      case 'Wand2': return <Wand2 {...props} />;
      case 'Dice5': return <Dice5 {...props} />;
      case 'Presentation': return <Presentation {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Sparkle': return <Sparkle {...props} />;
      case 'LayoutTemplate': return <LayoutTemplate {...props} />;
      case 'MonitorPlay': return <MonitorPlay {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'PanelTop': return <PanelTop {...props} />;
      case 'Code': return <Code {...props} />;
      case 'AppWindow': return <AppWindow {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const pastelBg = getPastelByIndex(index);

  return (
    <div
      id={`ai-tool-${tool.id}`}
      className="nb-card-lg rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between gap-5"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-13 h-13 rounded-xl ${pastelBg} border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
        >
          {renderIcon(tool.iconName)}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-black font-display text-lg sm:text-xl text-[#171717] dark:text-[#F4F1E8] tracking-tight leading-snug truncate">
            {tool.name}
          </h4>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#FFF7DC] text-[#171717] border border-[#171717] text-[11px] font-extrabold uppercase tracking-wide">
            {tool.categoryLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onOpenTool(tool)}
          className="nb-btn nb-btn-primary w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold"
        >
          <span>Open {tool.name}</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="flex items-center justify-end pt-2 border-t-2 border-[#171717]/10 dark:border-[#2B3347]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-[11px] font-mono font-extrabold">
            <KeyRound className="w-3 h-3 stroke-[2.5]" />
            <span>Pass: vishnu</span>
          </span>
        </div>
      </div>
    </div>
  );
};
