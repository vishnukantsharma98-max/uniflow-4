import React, { useState, useMemo, useEffect } from 'react';
import { FolderGit2, GraduationCap } from 'lucide-react';
import {
  STUDY_CATEGORIES,
  STUDY_RESOURCES_DATA,
  StudyCategory,
  StudyResource,
} from './StudyResourcesData';
import { StudyCategoryCard } from './StudyCategoryCard';
import { StudyResourceCard } from './StudyResourceCard';
import { parseRoute, navigate, goBack } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbBackButton,
  NbPasswordBanner,
  NbSearchBar,
  NbEmptyState,
} from '../../ui/NeubrutalUI';

export const StudyResourcesView: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'study-resources' && parsed.studyResourcesState) {
      if (
        parsed.studyResourcesState.mode === 'category' &&
        parsed.studyResourcesState.context.category
      ) {
        const found = STUDY_CATEGORIES.find(
          (c) => c.id === parsed.studyResourcesState?.context.category
        );
        if (found) {
          return { mode: 'category' as const, selectedCategory: found };
        }
      }
    }
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments[1] === 'study-resources' && segments[2]) {
      const found = STUDY_CATEGORIES.find((c) => c.id === segments[2]);
      if (found) {
        return { mode: 'category' as const, selectedCategory: found };
      }
    }
    return {
      mode: 'studyHome' as const,
      selectedCategory: null as StudyCategory | null,
    };
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

  const navigateToCategory = (cat: StudyCategory) => {
    navigate(`/app/study-resources/${cat.id}`);
    setViewState({ mode: 'category', selectedCategory: cat });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStudyHome = () => {
    goBack('/app/study-resources');
    setViewState({ mode: 'studyHome', selectedCategory: null });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    STUDY_CATEGORIES.forEach((cat) => {
      counts[cat.id] = STUDY_RESOURCES_DATA.filter(
        (r) => r.category === cat.id
      ).length;
    });
    return counts;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return STUDY_RESOURCES_DATA.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.categoryLabel.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        (r.channelOrAuthor && r.channelOrAuthor.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const currentCategoryResources = useMemo(() => {
    if (viewState.mode !== 'category' || !viewState.selectedCategory) return [];
    return STUDY_RESOURCES_DATA.filter(
      (r) => r.category === viewState.selectedCategory?.id
    );
  }, [viewState]);

  const handleOpenResource = (res: StudyResource) => {
    if (!res.url) return;
    openProtectedResource(res.url, res.title);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24">
      {/* 1. TOP BACK BUTTON */}
      {viewState.mode === 'category' && (
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <NbBackButton
            onClick={handleBackToStudyHome}
            label="Back to Study Resources"
          />

          {viewState.selectedCategory && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFF7DC] dark:bg-[#161B26] border-2 border-[#171717] dark:border-[#3D475E] text-xs font-extrabold">
              <button
                type="button"
                onClick={handleBackToStudyHome}
                className="text-[#525252] dark:text-[#9AA6BE] hover:underline cursor-pointer"
              >
                Study Resources
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
          placeholder="Search study resources (e.g., C Programming, CodeWithHarry, DSA)..."
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
              title="No matching study resources found"
              description="Try searching for another topic or course name."
              actionLabel="Reset Search"
              onAction={() => setSearchQuery('')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((resource, idx) => (
                <StudyResourceCard
                  key={resource.id}
                  resource={resource}
                  index={idx}
                  onOpenResource={handleOpenResource}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. MAIN PAGE: 20 CATEGORY FOLDERS */}
      {viewState.mode === 'studyHome' && !searchQuery.trim() && (
        <div className="space-y-8">
          <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FFD84D] text-[#171717]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-15 h-15 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
                  <FolderGit2 className="w-8 h-8 text-[#171717] stroke-[2.5]" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                    <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Curated CS Vault &bull; {STUDY_CATEGORIES.length} Tracks</span>
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                    Study Resources
                  </h1>
                  <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1 max-w-xl">
                    Explore comprehensive learning playlists, courses, and roadmaps for computer science.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <NbPasswordBanner password="vishnu" className="bg-[#FFFDF5]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {STUDY_CATEGORIES.map((cat, idx) => (
              <StudyCategoryCard
                key={cat.id}
                category={cat}
                index={idx}
                resourceCount={categoryCounts[cat.id] || 0}
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
                <span className="inline-block px-3 py-1 rounded-lg bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2 tabular-nums">
                  {currentCategoryResources.length}{' '}
                  {currentCategoryResources.length === 1 ? 'Resource' : 'Resources'}
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

            {currentCategoryResources.length === 0 ? (
              <NbEmptyState
                title="No resources uploaded yet"
                description="Resources for this category will be available soon."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategoryResources.map((resource, idx) => (
                  <StudyResourceCard
                    key={resource.id}
                    resource={resource}
                    index={idx}
                    onOpenResource={handleOpenResource}
                  />
                ))}
              </div>
            )}
          </div>
        )}
    </div>
  );
};
