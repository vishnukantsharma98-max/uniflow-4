import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Bot, Gamepad2, Library, LayoutGrid, ArrowUpRight, Sparkles } from 'lucide-react';
import { SEARCH_INDEX } from '../data';
import { SearchResultItem } from '../types';

interface SearchSpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchSpotlightModal: React.FC<SearchSpotlightModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Study', 'Exam Vault', 'AI Hub', 'Games', 'Apps', 'Books', 'Resources'];

  const filteredResults = SEARCH_INDEX.filter((item: SearchResultItem) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getCategoryIcon = (category: string) => {
    const cls = 'w-4 h-4 text-[#171717] stroke-[2.5]';
    switch (category) {
      case 'AI Hub':
        return { icon: <Bot className={cls} />, bg: 'bg-[#C9B6FF]' };
      case 'Games':
        return { icon: <Gamepad2 className={cls} />, bg: 'bg-[#FFD84D]' };
      case 'Books':
        return { icon: <Library className={cls} />, bg: 'bg-[#B8F2E6]' };
      case 'Apps':
        return { icon: <LayoutGrid className={cls} />, bg: 'bg-[#8EC5FF]' };
      default:
        return { icon: <BookOpen className={cls} />, bg: 'bg-[#FF8A65]' };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#171717]/75"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl nb-modal rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 bg-[#FFD84D] border-b-[3px] border-[#171717] gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center shrink-0">
            <Search className="w-4 h-4 text-[#171717] stroke-[2.5]" />
          </div>
          <input
            type="text"
            placeholder="Search notes, PYQs, AI models, games, books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[#171717] text-base font-bold focus:outline-none placeholder:text-[#404040]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A65] cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono font-extrabold text-[#171717] bg-[#FFFDF5] border-2 border-[#171717] rounded-lg hover:bg-[#B8F2E6] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto bg-[#FFF7DC] dark:bg-[#161B26] border-b-2 border-[#171717] dark:border-[#3D475E]">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold whitespace-nowrap border-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[2px_2px_0px_#171717]'
                    : 'bg-[#FFFFFF] dark:bg-[#1E2534] text-[#171717] dark:text-[#F4F1E8] border-[#171717] dark:border-[#3D475E] hover:bg-[#B8F2E6] hover:text-[#171717]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-2 bg-[#FFFDF5] dark:bg-[#0D1017]">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => {
              const style = getCategoryIcon(item.category);
              return (
                <a
                  key={item.id}
                  href={item.link}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#283044] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D] transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg ${style.bg} border-2 border-[#171717] flex items-center justify-center shrink-0`}
                    >
                      {style.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded bg-[#FFD84D] text-[#171717] border border-[#171717]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#404040] dark:text-[#9AA6BE] truncate">
                        {item.type} · <span className="font-extrabold">{item.category}</span>
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#171717] dark:text-[#FFD84D] stroke-[2.5] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              );
            })
          ) : (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFD84D] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#171717] stroke-[2.5]" />
              </div>
              <p className="text-sm font-extrabold text-[#171717] dark:text-[#F4F1E8]">
                No matching student resources found
              </p>
              <p className="text-xs font-semibold text-[#404040] dark:text-[#9AA6BE] mt-1">
                Try searching for &quot;DSA&quot;, &quot;PYQ&quot;, &quot;Math&quot;, or &quot;AI&quot;
              </p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-[#B8F2E6] border-t-2 border-[#171717] flex items-center justify-between text-xs font-extrabold text-[#171717]">
          <span>Search 30,000+ indexed university resources</span>
          <span>UniFlow Ecosystem</span>
        </div>
      </div>
    </div>
  );
};
