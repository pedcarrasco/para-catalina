import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Sun } from 'lucide-react';

interface SunflowerGardenAnimationProps {
  userName: string;
  onComplete: () => void;
}

export const SunflowerGardenAnimation: React.FC<SunflowerGardenAnimationProps> = ({
  userName,
  onComplete,
}) => {
  const [stage, setStage] = useState<'GROWING' | 'BLOOMED'>('GROWING');

  useEffect(() => {
    // Transition to BLOOMED after 3 seconds
    const timer1 = setTimeout(() => {
      setStage('BLOOMED');
    }, 3200);

    // Auto progress after 7.5 seconds if user hasn't clicked
    const timer2 = setTimeout(() => {
      onComplete();
    }, 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 relative z-10 overflow-hidden bg-gradient-to-b from-amber-50/80 via-amber-100/60 to-amber-200/40">
      {/* Light Rays Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/50 via-amber-100/10 to-transparent pointer-events-none" />

      {/* Floating Golden Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`gold-sparkle-${i}`}
            initial={{
              x: `${Math.random() * 100}%`,
              y: '100%',
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              y: '-20%',
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeOut',
            }}
            className="absolute w-3 h-3 bg-amber-300 rounded-full blur-[1px] shadow-[0_0_12px_#fbbf24]"
          />
        ))}
      </div>

      {/* Top Banner Text */}
      <div className="w-full text-center pt-8 sm:pt-12 relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-amber-200/80 shadow-xs mb-4"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-xs sm:text-sm font-sans-body font-semibold text-amber-900 tracking-wider uppercase">
            Para ti, {userName}
          </span>
          <Sparkles className="w-4 h-4 text-amber-600" />
        </motion.div>

        {/* Required Text */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-3xl sm:text-5xl font-serif-title font-bold text-amber-950 tracking-tight leading-tight max-w-2xl mx-auto drop-shadow-xs"
        >
          Para alguien tan especial como tú... 🌻
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
          className="text-amber-800 font-handwriting text-2xl sm:text-3xl mt-2"
        >
          Floreciendo con todo mi cariño
        </motion.p>
      </div>

      {/* Center Interactive Sunflower Garden SVG */}
      <div className="w-full max-w-3xl h-[380px] sm:h-[480px] relative flex items-end justify-center z-10 px-4 pb-4">
        {/* Soil Base with soft grass curves */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-amber-900/20 via-amber-800/10 to-transparent rounded-t-full blur-xs" />

        {/* Center Main Sunflower */}
        <div className="relative flex flex-col items-center">
          <svg
            width="320"
            height="400"
            viewBox="0 0 320 400"
            className="w-64 sm:w-80 h-auto overflow-visible"
          >
            {/* Green Stem growing */}
            <motion.path
              d="M 160 400 Q 160 280 160 160"
              fill="none"
              stroke="#65a30d"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />

            {/* Leaves growing on stem */}
            <motion.path
              d="M 160 280 C 120 270 90 290 80 300 C 110 320 150 300 160 280 Z"
              fill="#4d7c0f"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
            <motion.path
              d="M 160 220 C 200 210 230 230 240 240 C 210 260 170 240 160 220 Z"
              fill="#4d7c0f"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />

            {/* Blooming Sunflower Head */}
            <g transform="translate(160, 150)">
              {/* Petals array blooming out */}
              {Array.from({ length: 16 }).map((_, idx) => {
                const angle = (idx * 360) / 16;
                return (
                  <motion.path
                    key={`petal-${idx}`}
                    d="M 0 0 C -12 -35, -8 -70, 0 -85 C 8 -70, 12 -35, 0 0 Z"
                    fill="url(#petalGradient)"
                    transform={`rotate(${angle})`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 2.0 + (idx % 4) * 0.08,
                      duration: 1.0,
                      type: 'spring',
                      stiffness: 120,
                    }}
                  />
                );
              })}

              {/* Glowing Sunflower Center Disk */}
              <motion.circle
                cx="0"
                cy="0"
                r="38"
                fill="url(#centerGradient)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
              />
              <motion.circle
                cx="0"
                cy="0"
                r="32"
                fill="#78350f"
                stroke="#d97706"
                strokeWidth="2"
                strokeDasharray="4 2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.4, duration: 0.8 }}
              />

              {/* Sparkle Ring inside flower center */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <circle
                    key={`dot-${i}`}
                    cx={Math.cos((i * Math.PI) / 4) * 22}
                    cy={Math.sin((i * Math.PI) / 4) * 22}
                    r="2.5"
                    fill="#fef08a"
                  />
                ))}
              </motion.g>
            </g>

            {/* SVG Gradients */}
            <defs>
              <linearGradient id="petalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <radialGradient id="centerGradient">
                <stop offset="0%" stopColor="#92400e" />
                <stop offset="70%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Side Smaller Sunflowers */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 0.85 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute left-6 sm:left-16 bottom-2"
        >
          <Sun className="w-20 h-20 text-amber-500 animate-spin-slow drop-shadow-md" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 0.85 }}
          transition={{ delay: 2.1, duration: 1 }}
          className="absolute right-6 sm:right-16 bottom-2"
        >
          <Sun className="w-20 h-20 text-amber-500 animate-spin-slow drop-shadow-md" style={{ animationDirection: 'reverse' }} />
        </motion.div>
      </div>

      {/* Bottom Action Area */}
      <div className="pb-10 relative z-20 text-center">
        <AnimatePresence>
          {stage === 'BLOOMED' && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={onComplete}
              className="py-4 px-8 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white font-sans-body font-bold text-lg shadow-[0_10px_30px_rgba(217,119,6,0.4)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 cursor-pointer border border-amber-300/40"
            >
              <span>Ver tu sorpresa especial</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {stage === 'GROWING' && (
          <p className="text-amber-800/70 font-sans-body text-sm font-medium animate-pulse">
            Cultivando una hermosa sorpresa... ✨
          </p>
        )}
      </div>
    </div>
  );
};
