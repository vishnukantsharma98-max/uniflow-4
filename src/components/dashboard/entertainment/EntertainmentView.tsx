import React from 'react';
import { Tv, Film, ExternalLink, Flame, KeyRound } from 'lucide-react';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';
import { NbPasswordBanner, getPastelByIndex } from '../../ui/NeubrutalUI';

export const EntertainmentView: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  const entertainmentResource = {
    title: 'FMHY',
    url: 'https://fmhy.net/video',
    description:
      'Movies, Shows, Web Series, Anime, Manga, Live TV & Sports, Apps',
  };

  const featureTags = [
    'Movies',
    'Shows',
    'Web Series',
    'Anime',
    'Manga',
    'Live TV & Sports',
    'Apps',
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24 space-y-8">
      {/* Hero Header */}
      <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FF8A65] text-[#171717]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-15 h-15 rounded-2xl bg-[#FFFDF5] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center shrink-0">
              <Film className="w-8 h-8 text-[#171717] stroke-[2.5]" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-2">
                Streaming &amp; Entertainment Hub
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                Entertainment
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#171717]/85 mt-1 max-w-xl">
                Access all-in-one entertainment streaming for movies, shows, anime, live TV, sports, and media.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <NbPasswordBanner password="vishnu" className="bg-[#FFD84D]" />
          </div>
        </div>
      </div>

      {/* Main Entertainment Resource Card */}
      <div className="max-w-2xl mx-auto">
        <div
          id="entertainment-card-tbcpl"
          className="nb-card-lg rounded-2xl p-7 sm:p-9 bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] flex flex-col justify-between gap-6"
        >
          <div>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FFD84D] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center text-[#171717] shrink-0">
                <Tv className="w-9 h-9 stroke-[2.5]" />
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-lg bg-[#FF8A65] text-[#171717] border-2 border-[#171717] uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Streaming Portal</span>
              </span>
            </div>

            <h2 className="text-3xl font-black font-display tracking-tight mb-2">
              {entertainmentResource.title}
            </h2>

            <p className="text-sm sm:text-base font-medium text-[#525252] dark:text-[#9AA6BE] leading-relaxed mb-6">
              {entertainmentResource.description}
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2">
              {featureTags.map((tag, idx) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-lg ${getPastelByIndex(idx)} text-[#171717] border-2 border-[#171717] text-xs font-extrabold`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-5 border-t-2 border-[#171717]/15 dark:border-[#2B3347] space-y-4">
            <div className="flex items-center justify-between text-xs font-extrabold bg-[#FFF7DC] dark:bg-[#1E2534] px-4 py-2.5 rounded-xl border-2 border-[#171717] dark:border-[#3D475E]">
              <span className="flex items-center gap-2 text-[#171717] dark:text-[#F4F1E8]">
                <KeyRound className="w-4 h-4 stroke-[2.5]" />
                <span>Access Requirement</span>
              </span>
              <span className="font-mono text-[#171717] dark:text-[#FFD84D] uppercase">
                Password: vishnu
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                openProtectedResource(
                  entertainmentResource.url,
                  entertainmentResource.title
                )
              }
              className="nb-btn nb-btn-accent w-full py-4 px-6 rounded-xl text-sm sm:text-base font-black"
            >
              <span>Launch Entertainment Portal</span>
              <ExternalLink className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
