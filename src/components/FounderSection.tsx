import React from 'react';
import {
  CheckCircle2,
  Instagram,
  Linkedin,
  Mail,
  GraduationCap,
  Sparkles,
  ExternalLink,
  BrainCircuit,
  Star,
} from 'lucide-react';
import { FOUNDER_INFO } from '../data';

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Founder Container */}
        <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-[#FFFFFF] dark:bg-[#161B26] border-[3px] border-[#171717] dark:border-[#3D475E] shadow-[8px_8px_0px_#171717] dark:shadow-[8px_8px_0px_#283044] relative overflow-hidden scroll-reveal">
          {/* Top Solid Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-2.5 flex border-b-2 border-[#171717]">
            <div className="flex-1 bg-[#FFD84D]" />
            <div className="flex-1 bg-[#B8F2E6]" />
            <div className="flex-1 bg-[#FF8A65]" />
            <div className="flex-1 bg-[#C9B6FF]" />
            <div className="flex-1 bg-[#8EC5FF]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-3">
            {/* LEFT: FOUNDER PORTRAIT CARD */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#FFFDF5] dark:bg-[#0D1017] border-[3px] border-[#171717] dark:border-[#3D475E] shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#283044] overflow-hidden">
                {/* Top Strip */}
                <div className="px-4 py-2.5 bg-[#FFD84D] border-b-[3px] border-[#171717] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold font-display uppercase tracking-wider text-[#171717]">
                    <Star className="w-3.5 h-3.5 fill-[#171717] text-[#171717]" />
                    <span>Founder & Creator</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#B8F2E6] border-2 border-[#171717] text-[10px] font-extrabold text-[#171717] uppercase">
                    Verified
                  </span>
                </div>

                {/* Photo & Name */}
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="w-48 h-56 sm:w-52 sm:h-60 mb-4 rounded-xl overflow-hidden border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] bg-[#FFF7DC]">
                    <img
                      src={FOUNDER_INFO.photoUrl}
                      alt="Vishnu Kant Sharma"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 justify-center">
                    <h4 className="text-xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8]">
                      {FOUNDER_INFO.name}
                    </h4>
                    <CheckCircle2 className="w-5 h-5 text-[#171717] fill-[#FFD84D] shrink-0" />
                  </div>

                  <p className="text-xs font-extrabold text-[#171717] dark:text-[#FFD84D] mt-1">
                    {FOUNDER_INFO.role}
                  </p>
                  <p className="text-xs font-semibold text-[#404040] dark:text-[#9AA6BE] mt-0.5">
                    AIDS Student · {FOUNDER_INFO.university}
                  </p>
                </div>

                {/* Bottom Department Strip */}
                <div className="px-4 py-2.5 bg-[#C9B6FF] border-t-[3px] border-[#171717] flex items-center justify-between text-xs font-extrabold text-[#171717]">
                  <div className="flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4 stroke-[2.5]" />
                    <span>AI & Data Science</span>
                  </div>
                  <span>JECRC University</span>
                </div>
              </div>
            </div>

            {/* RIGHT: FOUNDER STORY & SOCIAL CHANNELS */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold uppercase tracking-wider mb-4 w-fit">
                <GraduationCap className="w-4 h-4 stroke-[2.5]" />
                <span>Student-Led Innovation</span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap mb-2">
                <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-[#171717] dark:text-[#F4F1E8] tracking-tight">
                  Built by{' '}
                  <span className="inline-block px-2.5 py-0.5 bg-[#FFD84D] text-[#171717] border-2 border-[#171717] rounded-lg">
                    {FOUNDER_INFO.name}
                  </span>
                </h3>
              </div>

              <p className="text-base font-extrabold text-[#171717] dark:text-[#FFD84D] mt-2 mb-3">
                {FOUNDER_INFO.tagline}
              </p>

              <p className="text-sm sm:text-base text-[#262626] dark:text-[#D5DBE8] font-medium leading-relaxed mb-6">
                {FOUNDER_INFO.vision}
              </p>

              {/* Founder Quote Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF7DC] dark:bg-[#1E2534] border-2 border-[#171717] dark:border-[#3D475E] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#283044] mb-8">
                <p className="text-sm sm:text-base text-[#171717] dark:text-[#F4F1E8] font-semibold italic leading-relaxed">
                  &ldquo;{FOUNDER_INFO.quote}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t-2 border-[#171717]/20 dark:border-[#2B3347] flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#404040] dark:text-[#9AA6BE]">
                    Student at JECRC University
                  </span>
                  <span className="font-signature text-2xl sm:text-3xl text-[#171717] dark:text-[#FFD84D] font-bold tracking-wide">
                    Vishnu Kant Sharma
                  </span>
                </div>
              </div>

              {/* Direct Contact & Social Channels */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#171717] dark:text-[#F4F1E8] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  <span>Let&apos;s Connect & Collaborate</span>
                </h4>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={FOUNDER_INFO.links.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn nb-btn-accent px-4 py-2.5 rounded-xl text-xs font-extrabold"
                  >
                    <Instagram className="w-4 h-4 stroke-[2.5]" />
                    <span>Instagram</span>
                    <span className="text-[11px] font-bold">({FOUNDER_INFO.instagramHandle})</span>
                  </a>

                  <a
                    href={FOUNDER_INFO.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn nb-btn-blue px-4 py-2.5 rounded-xl text-xs font-extrabold"
                  >
                    <Linkedin className="w-4 h-4 stroke-[2.5]" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>

                  <a
                    href={FOUNDER_INFO.links.email}
                    className="nb-btn nb-btn-purple px-4 py-2.5 rounded-xl text-xs font-extrabold"
                  >
                    <Mail className="w-4 h-4 stroke-[2.5]" />
                    <span>Email Me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
