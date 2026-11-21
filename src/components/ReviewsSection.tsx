import React, { useState } from 'react';
import { Star, MessageSquarePlus, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { StudentReview } from '../types';
import { getPastelByIndex } from './ui/NeubrutalUI';

interface ReviewsSectionProps {
  reviews: StudentReview[];
  onOpenReviewModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onOpenReviewModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Rotate display starting from currentIndex so arrows visibly cycle reviews
  const orderedReviews =
    reviews.length > 0
      ? [...reviews.slice(currentIndex), ...reviews.slice(0, currentIndex)]
      : [];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 scroll-reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#8EC5FF] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold uppercase tracking-wider mb-3.5">
              <span>Verified Campus Voices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight">
              Loved by Students{' '}
              <span className="inline-block px-2.5 py-0.5 bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] rounded-lg">
                Like You
              </span>
            </h2>
            <p className="text-sm sm:text-base font-medium text-[#404040] dark:text-[#9AA6BE] mt-3">
              Empowering engineers and creatives across departments to stay organized and excel.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={onOpenReviewModal}
              className="nb-btn nb-btn-primary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold"
            >
              <MessageSquarePlus className="w-4 h-4 stroke-[2.5]" />
              <span>Share Your Experience</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Review"
                className="nb-btn-sm w-10 h-10 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Review"
                className="nb-btn-sm w-10 h-10 rounded-xl bg-[#FFFFFF] dark:bg-[#161B26] text-[#171717] dark:text-[#F4F1E8] flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {orderedReviews.slice(0, 6).map((rev, idx) => {
            const pastel = getPastelByIndex(idx);
            return (
              <div
                key={rev.id}
                className="nb-card-lg rounded-2xl p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-150"
              >
                <div>
                  {/* Quote Icon & Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${pastel} border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center`}
                    >
                      <Quote className="w-5 h-5 text-[#171717] stroke-[2.5]" />
                    </div>
                    <div className="flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-[#FFF7DC] border-2 border-[#171717]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#FFD84D] text-[#171717] stroke-[2]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm sm:text-base text-[#171717] dark:text-[#F4F1E8] font-medium leading-relaxed mb-6">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Author Footer */}
                <div className="flex items-center gap-3 pt-4 border-t-2 border-[#171717] dark:border-[#2B3347]">
                  <div
                    className={`w-11 h-11 rounded-xl overflow-hidden border-2 border-[#171717] shadow-[2px_2px_0px_#171717] shrink-0 ${pastel}`}
                  >
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-extrabold font-display text-[#171717] text-base">
                        {rev.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] truncate">
                      {rev.name}
                    </h4>
                    <p className="text-xs font-bold text-[#404040] dark:text-[#9AA6BE] truncate">
                      {rev.college} ·{' '}
                      <span className="text-[#171717] dark:text-[#FFD84D]">{rev.year}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
