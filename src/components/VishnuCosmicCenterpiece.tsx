import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Bot,
  BookOpen,
  ShieldAlert,
  Gamepad2,
  LayoutGrid,
  Library,
  CheckCircle2,
  Instagram,
  Linkedin,
  Star,
} from 'lucide-react';
import { FOUNDER_INFO } from '../data';
import { useTheme } from './dashboard/ThemeSystem';

export interface CosmicOrbItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  bgClass: string;
  orbitIndex: 0 | 1 | 2;
  initialAngle: number;
  speed: number;
  mobileVisible?: boolean;
}

const COSMIC_FEATURE_ORBS: CosmicOrbItem[] = [
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    subtitle: 'GPT-4o, Code & Research',
    tag: 'AI Tools',
    icon: Bot,
    bgClass: 'bg-[#C9B6FF]',
    orbitIndex: 0,
    initialAngle: 0.2,
    speed: 0.14,
    mobileVisible: true,
  },
  {
    id: 'study',
    title: 'Study Hub',
    subtitle: 'Notes, Syllabus & Roadmaps',
    tag: 'Handwritten',
    icon: BookOpen,
    bgClass: 'bg-[#8EC5FF]',
    orbitIndex: 0,
    initialAngle: 3.3,
    speed: 0.14,
    mobileVisible: true,
  },
  {
    id: 'exam-vault',
    title: 'Exam Vault',
    subtitle: 'PYQs, Papers & Solutions',
    tag: 'Question Banks',
    icon: ShieldAlert,
    bgClass: 'bg-[#FF8A65]',
    orbitIndex: 1,
    initialAngle: 1.6,
    speed: -0.11,
    mobileVisible: true,
  },
  {
    id: 'games',
    title: 'Arcade Flow',
    subtitle: '2048, Wordle & Chess AI',
    tag: 'Games',
    icon: Gamepad2,
    bgClass: 'bg-[#FFD84D]',
    orbitIndex: 1,
    initialAngle: 4.8,
    speed: -0.11,
    mobileVisible: false,
  },
  {
    id: 'apps',
    title: 'Student Apps',
    subtitle: 'GPA, Resume & Utilities',
    tag: 'Productivity',
    icon: LayoutGrid,
    bgClass: 'bg-[#B8F2E6]',
    orbitIndex: 2,
    initialAngle: 2.7,
    speed: 0.09,
    mobileVisible: true,
  },
  {
    id: 'books',
    title: 'Books Library',
    subtitle: 'E-Books & Audiobooks',
    tag: 'Library',
    icon: Library,
    bgClass: 'bg-[#FFF7DC]',
    orbitIndex: 2,
    initialAngle: 5.9,
    speed: 0.09,
    mobileVisible: false,
  },
];

interface VishnuCosmicCenterpieceProps {
  onSelectItem?: (id: string) => void;
  mousePos?: { x: number; y: number };
  revealed?: boolean;
}

export const VishnuCosmicCenterpiece: React.FC<VishnuCosmicCenterpieceProps> = ({
  onSelectItem,
  mousePos = { x: 0, y: 0 },
}) => {
  const [hoveredOrbId, setHoveredOrbId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (previousTimeRef.current !== null) {
        const delta = (currentTime - previousTimeRef.current) / 1000;
        const speedFactor = hoveredOrbId ? 0.25 : 1.0;
        setTime((prev) => prev + delta * speedFactor);
      }
      previousTimeRef.current = currentTime;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hoveredOrbId]);

  const orbitConfigs = useMemo(() => {
    if (isMobile) {
      return [
        { rx: 138, ry: 90, tiltDeg: -14 },
        { rx: 152, ry: 102, tiltDeg: 18 },
        { rx: 164, ry: 112, tiltDeg: -28 },
      ];
    }
    return [
      { rx: 218, ry: 122, tiltDeg: -16 },
      { rx: 270, ry: 146, tiltDeg: 20 },
      { rx: 312, ry: 138, tiltDeg: -32 },
    ];
  }, [isMobile]);

  const computeOrb3D = (orb: CosmicOrbItem) => {
    const config = orbitConfigs[orb.orbitIndex];
    const currentAngle = orb.initialAngle + time * orb.speed;
    const tiltRad = (config.tiltDeg * Math.PI) / 180;

    const cosAngle = Math.cos(currentAngle);
    const sinAngle = Math.sin(currentAngle);
    const unrotatedX = config.rx * cosAngle;
    const unrotatedY = config.ry * sinAngle;

    const x = unrotatedX * Math.cos(tiltRad) - unrotatedY * Math.sin(tiltRad);
    const y = unrotatedX * Math.sin(tiltRad) + unrotatedY * Math.cos(tiltRad);

    const depth = sinAngle;
    const isFront = depth >= -0.15;
    const baseScale = isMobile ? 0.82 : 1.0;
    const depthScale = isFront ? baseScale * (1 + depth * 0.08) : baseScale * (1 + depth * 0.12);
    const zIndex = isFront ? (hoveredOrbId === orb.id ? 40 : 25) : 5;

    return {
      x,
      y,
      scale: depthScale,
      zIndex,
    };
  };

  const parallaxX = (mousePos.x || 0) * (isMobile ? 3 : 8);
  const parallaxY = (mousePos.y || 0) * (isMobile ? 3 : 8);

  return (
    <div className="relative w-full min-h-[450px] h-[480px] sm:h-[540px] lg:h-[600px] flex items-center justify-center select-none overflow-visible">
      {/* 1. CRISP ARCHITECTURAL DASHED ORBIT TRACKS */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center transition-transform duration-200"
        style={{
          transform: `translate3d(${-parallaxX * 0.6}px, ${-parallaxY * 0.6}px, 0)`,
        }}
      >
        <svg
          className="w-full h-full max-w-[660px] max-h-[660px] overflow-visible"
          viewBox="-340 -340 680 680"
          fill="none"
        >
          <ellipse
            cx="0"
            cy="0"
            rx={orbitConfigs[0].rx}
            ry={orbitConfigs[0].ry}
            transform={`rotate(${orbitConfigs[0].tiltDeg} 0 0)`}
            stroke={isDark ? '#FFFDF5' : '#171717'}
            strokeOpacity="0.3"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <ellipse
            cx="0"
            cy="0"
            rx={orbitConfigs[1].rx}
            ry={orbitConfigs[1].ry}
            transform={`rotate(${orbitConfigs[1].tiltDeg} 0 0)`}
            stroke={isDark ? '#FFD84D' : '#171717'}
            strokeOpacity="0.22"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          {!isMobile && (
            <ellipse
              cx="0"
              cy="0"
              rx={orbitConfigs[2].rx}
              ry={orbitConfigs[2].ry}
              transform={`rotate(${orbitConfigs[2].tiltDeg} 0 0)`}
              stroke={isDark ? '#B8F2E6' : '#171717'}
              strokeOpacity="0.18"
              strokeWidth="2"
              strokeDasharray="4 10"
            />
          )}
          {/* Geometric Corner Accent Shapes */}
          <rect x="-200" y="-130" width="14" height="14" fill="#FFD84D" stroke="#171717" strokeWidth="2" transform="rotate(15 -200 -130)" />
          <rect x="195" y="115" width="16" height="16" fill="#B8F2E6" stroke="#171717" strokeWidth="2" transform="rotate(-12 195 115)" />
          <circle cx="210" cy="-105" r="7" fill="#FF8A65" stroke="#171717" strokeWidth="2" />
          <circle cx="-210" cy="120" r="8" fill="#C9B6FF" stroke="#171717" strokeWidth="2" />
        </svg>
      </div>

      {/* 2. CENTRAL FOUNDER ANCHOR CARD */}
      <div
        className="relative z-10 w-full max-w-[270px] sm:max-w-[310px] rounded-2xl bg-[#FFFFFF] dark:bg-[#161B26] border-[3px] border-[#171717] dark:border-[#3D475E] shadow-[8px_8px_0px_#171717] dark:shadow-[8px_8px_0px_#283044] overflow-hidden transition-transform duration-200"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      >
        {/* Top Yellow Header Bar */}
        <div className="px-3.5 py-2.5 bg-[#FFD84D] border-b-[3px] border-[#171717] flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold font-display uppercase tracking-wider text-[#171717]">
            <Star className="w-3.5 h-3.5 fill-[#171717] text-[#171717]" />
            <span>Founder & Architect</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#FFFDF5] border-2 border-[#171717] text-[10px] font-extrabold text-[#171717] uppercase">
            UniFlow
          </span>
        </div>

        {/* Portrait & Identity */}
        <div className="p-4 flex flex-col items-center">
          <div className="w-44 h-52 sm:w-48 sm:h-56 rounded-xl overflow-hidden border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] bg-[#FFF7DC]">
            <img
              src={FOUNDER_INFO.photoUrl}
              alt="Vishnu Kant Sharma - Founder UniFlow"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>

          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-extrabold font-display text-[#171717] dark:text-[#F4F1E8]">
                {FOUNDER_INFO.name}
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#171717] fill-[#B8F2E6] shrink-0" />
            </div>
            <p className="text-[11px] font-bold text-[#404040] dark:text-[#9AA6BE] mt-0.5">
              AI & DS Student · {FOUNDER_INFO.university}
            </p>
          </div>
        </div>

        {/* Bottom Mint Connect Bar */}
        <div className="px-3.5 py-2.5 bg-[#B8F2E6] border-t-[3px] border-[#171717] flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#171717]">
            Direct Connect
          </span>
          <div className="flex items-center gap-1.5">
            <a
              href={FOUNDER_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Vishnu"
              className="nb-btn-sm w-7 h-7 rounded-lg bg-[#FF8A65] text-[#171717] flex items-center justify-center"
            >
              <Instagram className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href={FOUNDER_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Vishnu"
              className="nb-btn-sm w-7 h-7 rounded-lg bg-[#8EC5FF] text-[#171717] flex items-center justify-center"
            >
              <Linkedin className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE PASTEL ORBITING CARDS */}
      {COSMIC_FEATURE_ORBS.map((orb) => {
        if (isMobile && !orb.mobileVisible) return null;

        const coords = computeOrb3D(orb);
        const isHovered = hoveredOrbId === orb.id;
        const Icon = orb.icon;
        const currentScale = isHovered ? coords.scale * 1.08 : coords.scale;

        return (
          <button
            type="button"
            key={orb.id}
            onMouseEnter={() => setHoveredOrbId(orb.id)}
            onMouseLeave={() => setHoveredOrbId(null)}
            onClick={() => onSelectItem && onSelectItem(orb.id)}
            style={{
              transform: `translate3d(${coords.x + parallaxX * 1.1}px, ${coords.y + parallaxY * 1.1}px, 0) scale(${currentScale})`,
              zIndex: coords.zIndex,
              willChange: 'transform',
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center gap-2.5 p-2 pr-3.5 rounded-xl border-2 border-[#171717] shadow-[4px_4px_0px_#171717] ${orb.bgClass} text-[#171717] text-left`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-[#171717] stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-[74px] sm:min-w-[86px]">
              <span className="text-xs font-extrabold font-display leading-tight whitespace-nowrap text-[#171717]">
                {orb.title}
              </span>
              <span className="text-[10px] font-bold leading-tight whitespace-nowrap text-[#262626] mt-0.5">
                {isHovered ? orb.subtitle : orb.tag}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
