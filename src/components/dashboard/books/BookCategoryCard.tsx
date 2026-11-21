import React from 'react';
import {
  Folder,
  ChevronRight,
  BookMarked,
  Sparkles,
  Library,
  TrendingUp,
  Search,
  BookOpen,
} from 'lucide-react';
import { BookCategory } from './BooksData';
import { getPastelByIndex } from '../../ui/NeubrutalUI';

interface BookCategoryCardProps {
  category: BookCategory;
  resourceCount: number;
  index?: number;
  onClick: () => void;
}

export const BookCategoryCard: React.FC<BookCategoryCardProps> = ({
  category,
  resourceCount,
  index = 0,
  onClick,
}) => {
  const getCategoryIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7 text-[#171717] stroke-[2.5]' };
    switch (iconName) {
      case 'BookMarked':
        return <BookMarked {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Library':
        return <Library {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Search':
        return <Search {...props} />;
      case 'BookOpen':
      default:
        return <BookOpen {...props} />;
    }
  };

  const pastelBg = getPastelByIndex(index);

  return (
    <div
      id={`book-category-card-${category.id}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] cursor-pointer flex flex-col justify-between min-h-[230px]"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div
            className={`w-14 h-14 rounded-xl ${pastelBg} border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0`}
          >
            {getCategoryIcon(category.iconName)}
          </div>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-lg bg-[#FFF7DC] text-[#171717] border-2 border-[#171717] uppercase tracking-wider tabular-nums">
            <Folder className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>
              {resourceCount} {resourceCount === 1 ? 'Resource' : 'Resources'}
            </span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-snug mb-2">
          {category.name}
        </h3>

        <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t-2 border-[#171717]/15 dark:border-[#2B3347] flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider">
          Explore Books &amp; Libraries
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    </div>
  );
};
