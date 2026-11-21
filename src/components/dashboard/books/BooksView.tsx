import React, { useState, useMemo, useEffect } from 'react';
import { Library, Layers, BookOpen } from 'lucide-react';
import {
  BOOK_CATEGORIES,
  BOOK_RESOURCES_DATA,
  BookCategory,
  BookResource,
} from './BooksData';
import { BookCategoryCard } from './BookCategoryCard';
import { BookResourceCard } from './BookResourceCard';
import { parseRoute, navigate, goBack } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbBackButton,
  NbPasswordBanner,
  NbSearchBar,
  NbEmptyState,
} from '../../ui/NeubrutalUI';

export const BooksView: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'books' && parsed.booksState) {
      if (parsed.booksState.mode === 'category' && parsed.booksState.context.category) {
        const found = BOOK_CATEGORIES.find(
          (c) => c.id === parsed.booksState?.context.category
        );
        if (found) {
          return { mode: 'category' as const, selectedCategory: found };
        }
      }
    }
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments[1] === 'books' && segments[2]) {
      const found = BOOK_CATEGORIES.find((c) => c.id === segments[2]);
      if (found) {
        return { mode: 'category' as const, selectedCategory: found };
      }
    }
    return { mode: 'booksHome' as const, selectedCategory: null as BookCategory | null };
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

  const navigateToCategory = (cat: BookCategory) => {
    navigate(`/app/books/${cat.id}`);
    setViewState({ mode: 'category', selectedCategory: cat });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBooksHome = () => {
    goBack('/app/books');
    setViewState({ mode: 'booksHome', selectedCategory: null });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    BOOK_CATEGORIES.forEach((cat) => {
      counts[cat.id] = BOOK_RESOURCES_DATA.filter((r) => r.category === cat.id).length;
    });
    return counts;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return BOOK_RESOURCES_DATA.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.categoryLabel.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const currentCategoryResources = useMemo(() => {
    if (viewState.mode !== 'category' || !viewState.selectedCategory) return [];
    return BOOK_RESOURCES_DATA.filter(
      (r) => r.category === viewState.selectedCategory?.id
    );
  }, [viewState]);

  const handleOpenResource = (res: BookResource) => {
    if (!res.url) return;
    openProtectedResource(res.url, res.title);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24">
      {/* 1. TOP BACK BUTTON */}
      {viewState.mode === 'category' && (
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <NbBackButton onClick={handleBackToBooksHome} label="Back to Books" />

          {viewState.selectedCategory && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFF7DC] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-extrabold">
              <button
                type="button"
                onClick={handleBackToBooksHome}
                className="text-[#525252] dark:text-[#9AA6BE] hover:underline cursor-pointer"
              >
                Books &amp; Libraries
              </button>
              <span className="text-[#171717] dark:text-[#F4F1E8]">/</span>
              <span className="text-[#171717] dark:text-[#F4F1E8]">
                {viewState.selectedCategory.name}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. HEADER & SEARCH (BOOKS HOME) */}
      {viewState.mode === 'booksHome' && (
        <div className="space-y-6 mb-8">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#B8F2E6] text-[#171717]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-15 h-15 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
                  <Library className="w-8 h-8 text-[#171717] stroke-[2.5]" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                    Digital Library &amp; Literature Vault
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                    Books &amp; Libraries
                  </h1>
                  <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1 max-w-2xl">
                    Curated book categories and open-access repositories across Fiction, Self-Help, Non-Fiction, Finance, Mysteries, and Classic Novels.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <NbPasswordBanner password="vishnu" className="bg-[#FFD84D]" />
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <NbSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search book libraries or categories..."
            />
          </div>
        </div>
      )}

      {/* 3. ACTIVE SEARCH RESULTS VIEW */}
      {searchQuery.trim() !== '' && viewState.mode === 'booksHome' ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8]">
              Search Results{' '}
              <span className="inline-block ml-1 px-2.5 py-0.5 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-sm font-mono tabular-nums">
                {searchResults.length}
              </span>
            </h2>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="nb-btn-sm px-3 py-1.5 rounded-lg bg-[#FFFDF5] text-[#171717] text-xs font-extrabold cursor-pointer"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((res, idx) => (
                <BookResourceCard
                  key={res.id}
                  resource={res}
                  index={idx}
                  onOpenResource={handleOpenResource}
                />
              ))}
            </div>
          ) : (
            <NbEmptyState
              title="No Book Resources Found"
              description={`No library or repository matches "${searchQuery}". Try a different keyword.`}
              actionLabel="Clear Search"
              onAction={() => setSearchQuery('')}
            />
          )}
        </div>
      ) : (
        <>
          {viewState.mode === 'booksHome' ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-black font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight">
                    Book Categories
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-0.5">
                    Select a genre or category to access curated online libraries and public domain collections.
                  </p>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tabular-nums">
                  {BOOK_CATEGORIES.length} Categories
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {BOOK_CATEGORIES.map((cat, idx) => (
                  <BookCategoryCard
                    key={cat.id}
                    category={cat}
                    index={idx}
                    resourceCount={categoryCounts[cat.id] || 0}
                    onClick={() => navigateToCategory(cat)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {viewState.selectedCategory && (
                <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#8EC5FF] text-[#171717]">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
                        <BookOpen className="w-8 h-8 text-[#171717] stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-[11px] font-extrabold uppercase tracking-wider mb-2">
                          <Layers className="w-3 h-3 stroke-[2.5]" />
                          <span>Category Collection</span>
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
                          {viewState.selectedCategory.name}
                        </h2>
                        <p className="text-xs sm:text-sm font-semibold text-[#171717]/80 max-w-xl mt-1">
                          {viewState.selectedCategory.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3">
                      <span className="px-4 py-1.5 rounded-lg bg-[#FFFDF5] text-[#171717] font-extrabold text-xs border-2 border-[#171717] tabular-nums">
                        {currentCategoryResources.length} Libraries &amp; Catalogs
                      </span>
                      <NbPasswordBanner password="vishnu" className="bg-[#FFD84D]" />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategoryResources.map((res, idx) => (
                  <BookResourceCard
                    key={res.id}
                    resource={res}
                    index={idx}
                    onOpenResource={handleOpenResource}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
