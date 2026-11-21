import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import {
  AI_CATEGORIES,
  AI_TOOLS_DATA,
  AICategory,
  AITool,
} from './AIData';
import { AICategoryCard } from './AICategoryCard';
import { AIToolCard } from './AIToolCard';
import { parseRoute, navigate, goBack } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbBackButton,
  NbPasswordBanner,
  NbSearchBar,
  NbEmptyState,
} from '../../ui/NeubrutalUI';

export const AIView: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'ai' && parsed.aiState) {
      if (parsed.aiState.mode === 'category' && parsed.aiState.context.category) {
        const found = AI_CATEGORIES.find(
          (c) => c.id === parsed.aiState?.context.category
        );
        if (found) {
          return { mode: 'category' as const, selectedCategory: found };
        }
      }
    }
    return { mode: 'aiHome' as const, selectedCategory: null as AICategory | null };
  };

  const [viewState, setViewState] = useState(getCurrentState);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setViewState(getCurrentState());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToCategory = (cat: AICategory) => {
    navigate(`/app/ai/${cat.id}`);
    setViewState({ mode: 'category', selectedCategory: cat });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAIHome = () => {
    goBack('/app/ai');
    setViewState({ mode: 'aiHome', selectedCategory: null });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    AI_CATEGORIES.forEach((cat) => {
      counts[cat.id] = AI_TOOLS_DATA.filter((tool) => tool.category === cat.id).length;
    });
    return counts;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return AI_TOOLS_DATA.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const currentCategoryTools = useMemo(() => {
    if (viewState.mode !== 'category' || !viewState.selectedCategory) return [];
    return AI_TOOLS_DATA.filter(
      (tool) => tool.category === viewState.selectedCategory?.id
    );
  }, [viewState]);

  const handleOpenTool = (tool: AITool) => {
    openProtectedResource(tool.url, tool.name);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24">
      {/* 1. TOP BACK BUTTON & BREADCRUMB */}
      {viewState.mode === 'category' && (
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <NbBackButton onClick={handleBackToAIHome} label="Back to AI" />

          {viewState.selectedCategory && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFF7DC] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-extrabold">
              <button
                type="button"
                onClick={handleBackToAIHome}
                className="text-[#525252] dark:text-[#9AA6BE] hover:underline cursor-pointer"
              >
                AI Hub
              </button>
              <span className="text-[#171717] dark:text-[#F4F1E8]">/</span>
              <span className="text-[#171717] dark:text-[#F4F1E8]">
                {viewState.selectedCategory.title}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. SEARCH BAR */}
      <div className="mb-8 max-w-2xl mx-auto">
        <NbSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search AI tools (e.g., ChatGPT, Claude, PixVerse, Ideogram)..."
        />
      </div>

      {/* 3. ACTIVE SEARCH RESULTS */}
      {searchQuery.trim() !== '' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
              Search Results for &ldquo;{searchQuery}&rdquo;{' '}
              <span className="inline-block ml-1 px-2.5 py-0.5 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-sm font-mono tabular-nums">
                {searchResults.length}
              </span>
            </h2>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="nb-btn-sm px-3 py-1.5 rounded-lg bg-[#FFFDF5] text-[#171717] text-xs font-extrabold cursor-pointer"
            >
              Clear search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <NbEmptyState
              title="No matching AI tools found"
              description="Try searching for another tool name or category."
              actionLabel="Reset Search"
              onAction={() => setSearchQuery('')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((tool, idx) => (
                <AIToolCard
                  key={tool.id}
                  tool={tool}
                  index={idx}
                  onOpenTool={handleOpenTool}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. AI MAIN PAGE (5 CATEGORY CARDS) */}
      {viewState.mode === 'aiHome' && !searchQuery.trim() && (
        <div className="space-y-8">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#C9B6FF] text-[#171717]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-15 h-15 rounded-2xl bg-[#FFD84D] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
                  <Sparkles className="w-8 h-8 text-[#171717] stroke-[2.5]" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                    AI Hub &bull; {AI_TOOLS_DATA.length} Tools
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                    Your intelligent toolkit.
                  </h1>
                  <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1 max-w-xl">
                    Explore curated AI tools for chat, video, images, presentations, and websites.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <NbPasswordBanner password="vishnu" className="bg-[#FFD84D]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_CATEGORIES.map((cat, idx) => (
              <AICategoryCard
                key={cat.id}
                category={cat}
                index={idx}
                toolCount={categoryCounts[cat.id] || 0}
                onSelect={navigateToCategory}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. CATEGORY DETAIL PAGE */}
      {viewState.mode === 'category' &&
        viewState.selectedCategory &&
        !searchQuery.trim() && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                  {currentCategoryTools.length} Curated Tools
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight">
                  {viewState.selectedCategory.title}
                </h1>
                <p className="text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1">
                  {viewState.selectedCategory.shortDescription}
                </p>
              </div>
              <NbPasswordBanner password="vishnu" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentCategoryTools.map((tool, idx) => (
                <AIToolCard
                  key={tool.id}
                  tool={tool}
                  index={idx}
                  onOpenTool={handleOpenTool}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
