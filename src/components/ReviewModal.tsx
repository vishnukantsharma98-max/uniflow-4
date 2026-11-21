import React, { useState } from 'react';
import { X, Star, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { StudentReview } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: StudentReview) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmitReview }) => {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('JECRC Foundation');
  const [year, setYear] = useState('3rd Year CSE');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    const newReview: StudentReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      college: college.trim() || 'JECRC Foundation',
      year: year.trim() || 'Engineering Student',
      quote: quote.trim(),
      rating,
      avatarSeed: name.trim(),
    };

    onSubmitReview(newReview);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setQuote('');
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/75"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg nb-modal rounded-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header Bar */}
        <div className="px-6 py-4 bg-[#FFD84D] border-b-[3px] border-[#171717] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#171717]">
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Student Feedback</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A65] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          {!isSuccess ? (
            <div>
              <h3 className="text-2xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight">
                Share Your UniFlow Experience
              </h3>
              <p className="text-xs font-semibold text-[#404040] dark:text-[#9AA6BE] mt-1 mb-6">
                Your feedback helps Vishnu and the team continuously elevate student life.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#171717] dark:text-[#F4F1E8] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Ananya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="nb-input w-full px-4 py-2.5 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#171717] dark:text-[#F4F1E8] mb-1.5">
                      College / Campus
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., JECRC Foundation"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="nb-input w-full px-4 py-2.5 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#171717] dark:text-[#F4F1E8] mb-1.5">
                      Year / Branch
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 3rd Year CSE"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="nb-input w-full px-4 py-2.5 rounded-xl text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#171717] dark:text-[#F4F1E8] mb-1.5">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1.5 rounded-lg border-2 border-[#171717] bg-[#FFFFFF] hover:bg-[#FFF7DC] cursor-pointer transition-transform active:translate-y-0.5"
                      >
                        <Star
                          className={`w-5 h-5 stroke-[2] ${
                            star <= (hoverRating || rating)
                              ? 'text-[#171717] fill-[#FFD84D]'
                              : 'text-[#737373]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 px-2.5 py-1 rounded-lg bg-[#B8F2E6] border-2 border-[#171717] text-xs font-extrabold text-[#171717]">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#171717] dark:text-[#F4F1E8] mb-1.5">
                    Your Review / Experience
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How did UniFlow help your notes, exams, coding, or daily productivity?"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="nb-input w-full px-4 py-2.5 rounded-xl text-sm font-semibold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full nb-btn nb-btn-primary py-3 px-6 rounded-xl text-sm font-extrabold mt-2"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit Experience</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-[#B8F2E6] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9 text-[#171717] stroke-[2.5]" />
              </div>
              <h4 className="text-xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8]">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs font-semibold text-[#404040] dark:text-[#9AA6BE] mt-1.5">
                Your review is now live in the student community showcase.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
