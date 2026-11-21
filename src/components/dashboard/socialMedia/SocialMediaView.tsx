import React, { useState, useMemo } from 'react';
import { Share2 } from 'lucide-react';
import { SOCIAL_MEDIA_DATA, SocialMediaItem } from './SocialMediaData';
import { SocialMediaCard } from './SocialMediaCard';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbPasswordBanner,
  NbSearchBar,
  NbEmptyState,
} from '../../ui/NeubrutalUI';

export const SocialMediaView: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return SOCIAL_MEDIA_DATA;
    const q = searchQuery.toLowerCase().trim();
    return SOCIAL_MEDIA_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOpenItem = (item: SocialMediaItem) => {
    if (item.isDirectAccess) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      openProtectedResource(item.url, item.name);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24">
      {/* Hero Header */}
      <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#C9B6FF] text-[#171717] mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-15 h-15 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
              <Share2 className="w-8 h-8 text-[#171717] stroke-[2.5]" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Social Media &amp; Student Communities
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                Social Media Apps
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1 max-w-xl">
                Connect with developer communities, peer study groups, campus networks, and tech forums.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <NbPasswordBanner password="vishnu" className="bg-[#FFD84D]" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <NbSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search platforms (e.g., Discord, Reddit, Telegram)..."
        />
      </div>

      {/* Grid of Social Media Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <SocialMediaCard
              key={item.id}
              item={item}
              index={idx}
              onOpenItem={handleOpenItem}
            />
          ))}
        </div>
      ) : (
        <NbEmptyState
          title="No Platforms Found"
          description={`No communities match your search query "${searchQuery}".`}
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      )}
    </div>
  );
};
