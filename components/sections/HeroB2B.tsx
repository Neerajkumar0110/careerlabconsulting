'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

type Avatar = {
  src: string;
  name: string;
};

function safeParse<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// ─────────────────────────────────────────────────────────────
// DEFAULT AVATARS
// ─────────────────────────────────────────────────────────────

const ALL_AVATARS: Avatar[] = [
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778936014/ChatGPT_Image_May_14_2026_08_33_14_PM_wk2pqg.png',
    name: 'AI Expert 1',
  },
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935902/ChatGPT_Image_May_14_2026_08_32_34_PM_yc89pq.png',
    name: 'AI Expert 2',
  },
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935887/ChatGPT_Image_May_14_2026_08_34_53_PM_umfssj.png',
    name: 'AI Expert 3',
  },
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935868/ChatGPT_Image_May_16_2026_06_13_51_PM_qrsrgm.png',
    name: 'AI Expert 4',
  },
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935867/ChatGPT_Image_May_16_2026_06_15_37_PM_gebmnk.png',
    name: 'AI Expert 5',
  },
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935866/ChatGPT_Image_May_14_2026_08_35_46_PM_xs37pp.png',
    name: 'AI Expert 6',
  },
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935864/ChatGPT_Image_May_16_2026_06_15_21_PM_ywow9v.png',
    name: 'AI Expert 7',
  },
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935847/ChatGPT_Image_May_14_2026_08_33_58_PM_mfuoyl.png',
    name: 'AI Expert 8',
  },
  {
    src: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935726/main-sample.png',
    name: 'AI Expert 9',
  },
];

const DEFAULT_AVATARS = ALL_AVATARS.slice(0, 4);

// ─────────────────────────────────────────────────────────────
// SPACE BACKGROUND
// ─────────────────────────────────────────────────────────────

const SpaceBackground = ({ numStars = 400 }: { numStars?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;

    let stars: {
      x: number;
      y: number;
      z: number;
    }[] = [];

    const speed = 2;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      stars = [];

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.fillStyle = 'white';

      stars.forEach((star) => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = canvas.width;

          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const x = (star.x / star.z) * cx + cx;
        const y = (star.y / star.z) * cy + cy;

        const r = (1 - star.z / canvas.width) * 2;

        if (
          x >= 0 &&
          x < canvas.width &&
          y >= 0 &&
          y < canvas.height
        ) {
          ctx.beginPath();
          ctx.globalAlpha = 1 - star.z / canvas.width;
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    draw();

    window.addEventListener('resize', setup);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setup);
    };
  }, [numStars]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full" />

      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function HeroB2B() {
  const { get } = usePageContent('hero-b2b');

  // CMS values

  const badgeLabel = get(
    'hero',
    'badge_label',
    'The Future of Work is Autonomous'
  );

  const headlineLine1 = get(
    'hero',
    'headline_line1',
    'Command Your'
  );

  const headlineAccent = get(
    'hero',
    'headline_accent',
    'AI Empire'
  );

  const bodyText = get(
    'hero',
    'body_text',
    'Deploy custom AI workforces that execute tasks autonomously. Reduce overhead by 70% and scale instantly.'
  );

  const bodyHighlight = get(
    'hero',
    'body_highlight',
    'execute tasks'
  );

  const btnPrimaryLabel = get(
    'hero',
    'btn_primary_label',
    'Deploy AI Workforce'
  );

  const whatsappNumber = get(
    'hero',
    'whatsapp_number',
    '918700236923'
  );

  const whatsappMessage = get(
    'hero',
    'whatsapp_message',
    'I want to deploy AI Agents.'
  );

  const btnDemoLabel = get(
    'hero',
    'btn_demo_label',
    'Watch Demo'
  );

  const demoVideoUrl = get(
    'hero',
    'demo_video_url',
    'https://www.youtube.com/watch?v=IWFJ_IWr6kg'
  );

  const accentColor = get(
    'hero',
    'accent_color',
    '#3b82f6'
  );

  const numStarsRaw = get(
    'hero',
    'num_stars',
    '400'
  );

  const numStars = parseInt(numStarsRaw, 10) || 400;

  const avatarsRaw = get('hero', 'avatars_json', '');

  // IMPORTANT:
  // Stable SSR-safe initial state

  const [avatars, setAvatars] =
    useState<Avatar[]>(DEFAULT_AVATARS);

  useEffect(() => {
    const parsed = safeParse<Avatar[]>(
      avatarsRaw,
      DEFAULT_AVATARS
    );

    // ALWAYS LIMIT TO 4
    const cleaned = parsed
      .filter((a) => a?.src)
      .slice(0, 4);

    setAvatars(
      cleaned.length > 0
        ? cleaned
        : DEFAULT_AVATARS
    );
  }, [avatarsRaw]);

  // ───────────────────────────────────────────────────────────

  const renderBody = () => {
    if (
      !bodyHighlight ||
      !bodyText.includes(bodyHighlight)
    ) {
      return <>{bodyText}</>;
    }

    const [before, after] =
      bodyText.split(bodyHighlight);

    return (
      <>
        {before}

        <span className="text-white font-bold underline decoration-blue-500/50">
          {bodyHighlight}
        </span>

        {after}
      </>
    );
  };

  const handleDeploy = useCallback(() => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      '_blank'
    );
  }, [whatsappNumber, whatsappMessage]);

  const handleWatchDemo = useCallback(() => {
    window.open(demoVideoUrl, '_blank');
  }, [demoVideoUrl]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-30 pb-20 px-4 overflow-hidden bg-[#020617]">
      <SpaceBackground numStars={numStars} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.23, 1, 0.32, 1],
        }}
        className="relative z-10 w-full max-w-6xl mx-auto text-center mt-10 md:mt-0"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-4 px-5 py-2.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
          >
            <div className="flex -space-x-4">
              {avatars.map((avatar, i) => (
                <div
                  key={`${avatar.src}-${i}`}
                  className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#020617] overflow-hidden bg-slate-800"
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.name}
                    fill
                    sizes="48px"
                    quality={100}
                    className="object-cover"
                    priority={i < 2}
                  />
                </div>
              ))}
            </div>

            <div className="h-6 w-px bg-white/20 mx-1" />

            <p className="text-blue-400 text-[10px] md:text-[9px] font-black tracking-[0.15em] uppercase flex items-center gap-2">
              <Sparkles
                size={14}
                className="animate-pulse"
                style={{ color: accentColor }}
              />

              <span style={{ color: accentColor }}>
                {badgeLabel}
              </span>
            </p>
          </motion.div>

          <h1 className="text-5xl sm:text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase">
            {headlineLine1}

            <br />

            <span
              className="relative inline-block italic"
              style={{ color: accentColor }}
            >
              {headlineAccent}

              <svg
                className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M1 9.5C50.5 3.5 150.5 1.5 299 9.5"
                  stroke={accentColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed px-4 font-medium">
          {renderBody()}
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button
            onClick={handleDeploy}
            className="w-full sm:w-auto px-10 py-5 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 40px -10px ${accentColor}99`,
            }}
          >
            {btnPrimaryLabel}

            <ArrowRight size={18} />
          </button>

          <button
            onClick={handleWatchDemo}
            className="w-full sm:w-auto px-10 py-5 bg-white/[0.03] border border-white/10 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />

            {btnDemoLabel}
          </button>
        </div>
      </motion.div>
    </section>
  );
}