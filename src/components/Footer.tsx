import React from 'react';
import { Instagram, Linkedin, Mail, Sparkles } from 'lucide-react';
import { UniFlowLogo } from './UniFlowLogo';
import { FOUNDER_INFO } from '../data';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t-[3px] border-[#171717] dark:border-[#3D475E] bg-[#FFF7DC] dark:bg-[#0D1017] pt-14 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b-2 border-[#171717] dark:border-[#3D475E]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block">
              <UniFlowLogo size="md" />
            </a>
            <p className="text-sm font-medium text-[#262626] dark:text-[#9AA6BE] max-w-sm leading-relaxed">
              Your digital student command center. Uniting study resources, PYQs, AI models, games, and productivity tools into one structured flow.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={FOUNDER_INFO.links.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title={`Instagram (${FOUNDER_INFO.instagramHandle})`}
                className="nb-btn-sm w-10 h-10 rounded-xl bg-[#FF8A65] text-[#171717] flex items-center justify-center"
              >
                <Instagram className="w-4 h-4 stroke-[2.5]" />
              </a>
              <a
                href={FOUNDER_INFO.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
                className="nb-btn-sm w-10 h-10 rounded-xl bg-[#8EC5FF] text-[#171717] flex items-center justify-center"
              >
                <Linkedin className="w-4 h-4 stroke-[2.5]" />
              </a>
              <a
                href={FOUNDER_INFO.links.email}
                aria-label="Email"
                title="Send Email"
                className="nb-btn-sm w-10 h-10 rounded-xl bg-[#C9B6FF] text-[#171717] flex items-center justify-center"
              >
                <Mail className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-extrabold font-display uppercase tracking-wider text-[#171717] dark:text-[#FFD84D] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#262626] dark:text-[#D5DBE8]">
              <li><a href="#home" className="hover:underline decoration-2 underline-offset-4">Home</a></li>
              <li><a href="#features" className="hover:underline decoration-2 underline-offset-4">Features</a></li>
              <li><a href="#explore" className="hover:underline decoration-2 underline-offset-4">Ecosystem</a></li>
              <li><a href="#ai-hub" className="hover:underline decoration-2 underline-offset-4">AI Studio</a></li>
              <li><a href="#resources" className="hover:underline decoration-2 underline-offset-4">Resources</a></li>
              <li><a href="#founder" className="hover:underline decoration-2 underline-offset-4">About Founder</a></li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-xs font-extrabold font-display uppercase tracking-wider text-[#171717] dark:text-[#FFD84D] mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#262626] dark:text-[#D5DBE8]">
              <li><a href="#explore" className="hover:underline decoration-2 underline-offset-4">Study & Notes Vault</a></li>
              <li><a href="#explore" className="hover:underline decoration-2 underline-offset-4">Exam Papers & PYQs</a></li>
              <li><a href="#explore" className="hover:underline decoration-2 underline-offset-4">AI Assistant Suite</a></li>
              <li><a href="#explore" className="hover:underline decoration-2 underline-offset-4">Focus Arcade</a></li>
              <li><a href="#explore" className="hover:underline decoration-2 underline-offset-4">Digital Bookshelf</a></li>
              <li><a href="#explore" className="hover:underline decoration-2 underline-offset-4">CGPA Calculator</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs font-extrabold font-display uppercase tracking-wider text-[#171717] dark:text-[#FFD84D] mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#262626] dark:text-[#D5DBE8]">
              <li><a href="#home" className="hover:underline decoration-2 underline-offset-4">Privacy Policy</a></li>
              <li><a href="#home" className="hover:underline decoration-2 underline-offset-4">Terms of Service</a></li>
              <li><a href="#home" className="hover:underline decoration-2 underline-offset-4">Cookie Policy</a></li>
              <li><a href="#home" className="hover:underline decoration-2 underline-offset-4">Community Guidelines</a></li>
              <li className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-xs font-extrabold">
                  B.Tech First-Year Project
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#262626] dark:text-[#9AA6BE]">
          <p>© 2026 UniFlow. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Designed & Built with passion by</span>
            <a
              href="#founder"
              className="px-2 py-0.5 rounded bg-[#B8F2E6] text-[#171717] border-2 border-[#171717] font-extrabold hover:bg-[#FFD84D] transition-colors"
            >
              {FOUNDER_INFO.name}
            </a>
            <Sparkles className="w-3.5 h-3.5 text-[#171717] dark:text-[#FFD84D] inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
