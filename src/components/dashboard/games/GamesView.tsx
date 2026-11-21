import React, { useState, useMemo } from 'react';
import { Gamepad2, Trophy, Flame, Play } from 'lucide-react';
import { GAMES_DATA, GameItem } from './GamesData';
import { GameCard } from './GameCard';
import { VishnuDriftGame } from '../../VishnuDriftGame';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import {
  NbPasswordBanner,
  NbSearchBar,
  NbEmptyState,
} from '../../ui/NeubrutalUI';

export const GamesView: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingVishnuDrift, setIsPlayingVishnuDrift] = useState(false);

  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return GAMES_DATA;
    const q = searchQuery.toLowerCase().trim();
    return GAMES_DATA.filter(
      (game) =>
        game.name.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOpenGame = (game: GameItem) => {
    openProtectedResource(game.url, game.name);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24">
      {/* 3D Built-in Drift Game Modal/Overlay if active */}
      {isPlayingVishnuDrift && (
        <VishnuDriftGame onClose={() => setIsPlayingVishnuDrift(false)} />
      )}

      {/* Hero Header */}
      <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FFD84D] text-[#171717] mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-15 h-15 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
              <Gamepad2 className="w-8 h-8 text-[#171717] stroke-[2.5]" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Interactive Gaming &amp; Arcade Arena
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                Games
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1 max-w-xl">
                Take a study break with curated web gaming platforms and our built-in 3D drift arena.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <NbPasswordBanner password="vishnu" className="bg-[#FFFDF5]" />
          </div>
        </div>
      </div>

      {/* Built-in UniFlow Game Spotlight: Vishnu Drift Arena 3D */}
      <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#C9B6FF] text-[#171717] mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FF8A65] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center text-[#171717] shrink-0">
              <Flame className="w-9 h-9 stroke-[2.5]" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>UniFlow Built-In 3D Arcade</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
                Vishnu Drift &mdash; Arena 3D
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#171717]/80 max-w-xl mt-1">
                Real-time 3D physics drift simulator with stadium track, high-speed banking curves, dynamic speed HUD, and live lap timing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPlayingVishnuDrift(true)}
            className="nb-btn nb-btn-primary w-full md:w-auto px-7 py-4 rounded-xl text-sm font-black uppercase tracking-wider shrink-0"
          >
            <Play className="w-5 h-5 fill-current stroke-[2.5]" />
            <span>Play Vishnu Drift</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <NbSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search web gaming platforms..."
        />
      </div>

      {/* Grid of Web Game Platforms */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, idx) => (
            <GameCard
              key={game.id}
              game={game}
              index={idx}
              onOpenGame={handleOpenGame}
            />
          ))}
        </div>
      ) : (
        <NbEmptyState
          title="No Game Platforms Found"
          description={`No gaming platforms match your search "${searchQuery}".`}
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      )}
    </div>
  );
};
