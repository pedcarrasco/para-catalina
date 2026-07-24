import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, Volume2, VolumeX, Mail, Gift, Star, Sun, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';
import { LoveNote } from '../types';

interface FinalMessageCardProps {
  userName: string;
  onReplay: () => void;
}

const SPECIAL_NOTES: LoveNote[] = [
  {
    id: '1',
    title: 'Tu Sonrisa Única',
    content: 'Tu sonrisa ilumina cualquier día gris, como un hermoso campo de girasoles recibiendo la primera luz de la mañana. 🌻',
    icon: '✨',
  },
  {
    id: '2',
    title: 'Tu Calidez y Dulzura',
    content: 'La ternura y el cariño que transmites hacen que el mundo sea un lugar infinitamente más bonito y especial. ❤️',
    icon: '🌷',
  },
  {
    id: '3',
    title: 'Simplemente Única',
    content: 'Nunca olvides lo valiosa, maravillosa y sorprendente que eres en cada pequeño detalle. 🌟',
    icon: '👑',
  },
];

export const FinalMessageCard: React.FC<FinalMessageCardProps> = ({
  userName,
  onReplay,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  // Trigger confetti when envelope opens or component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      triggerGoldenConfetti();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const triggerGoldenConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#f43f5e', '#fef08a', '#fb7185'],
      });
    } catch {
      // safe fallback
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      romanticAudio.stop();
      setIsPlaying(false);
    } else {
      romanticAudio.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 py-8 relative z-10 overflow-hidden bg-gradient-to-b from-amber-50/90 via-rose-50/60 to-amber-100/80">
      {/* Background Floating Decor */}
      <div className="absolute top-10 left-10 text-amber-300/40 animate-float-slow">
        <Sun className="w-28 h-28" />
      </div>
      <div className="absolute bottom-10 right-10 text-amber-300/40 animate-float-slow" style={{ animationDelay: '3s' }}>
        <Sun className="w-28 h-28" />
      </div>

      {/* Top Floating Music Bar */}
      <div className="w-full max-w-xl flex items-center justify-between z-20 px-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-200 text-amber-900 text-xs font-sans-body font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Carta Digital para {userName}</span>
        </div>

        <button
          type="button"
          onClick={toggleMusic}
          className="p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-200/80 text-amber-800 hover:text-amber-950 hover:bg-amber-100/80 shadow-2xs transition-all flex items-center space-x-2 text-xs font-sans-body font-semibold cursor-pointer"
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="hidden sm:inline">Música Activa 🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Activar Música</span>
            </>
          )}
        </button>
      </div>

      {/* Main Love Letter Container */}
      <div className="w-full max-w-lg my-6 z-20 px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(217,119,6,0.22)] border-2 border-amber-200/90 relative overflow-hidden text-amber-950"
        >
          {/* Letter Flower Stamp */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-xl bg-amber-100 border-2 border-dashed border-amber-300 flex items-center justify-center text-amber-700 shadow-2xs rotate-6">
            <span className="text-xl">🌻</span>
          </div>

          {/* Letter Body Header */}
          <div className="mb-6">
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-serif-title font-bold text-amber-950 tracking-tight flex items-center space-x-2"
            >
              <span>{userName}</span>
              <span className="text-3xl sm:text-4xl">🌻</span>
            </motion.h1>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full mt-2" />
          </div>

          {/* Required Main Heartfelt Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-6 font-sans-body text-base sm:text-lg text-amber-900/90 leading-relaxed font-medium"
          >
            <p className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 italic font-serif-title text-amber-950 text-lg sm:text-xl shadow-2xs">
              "Quería crear algo especial para recordarte lo hermosa y única que eres."
            </p>

            <p className="text-amber-900/90 font-medium leading-relaxed">
              Espero que este pequeño detalle pueda sacarte una sonrisa ❤️
            </p>
          </motion.div>

          {/* Interactive Extra Heart Notes Section */}
          <div className="mt-8 pt-6 border-t border-amber-200/60">
            <h3 className="text-xs font-bold font-sans-body text-amber-800 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Notas especiales para ti (Haz clic para abrir):</span>
            </h3>

            <div className="space-y-2">
              {SPECIAL_NOTES.map((note) => {
                const isExpanded = expandedNoteId === note.id;
                return (
                  <div
                    key={note.id}
                    className="rounded-2xl border border-amber-200/80 bg-amber-50/40 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedNoteId(isExpanded ? null : note.id);
                        romanticAudio.playChime();
                      }}
                      className="w-full px-4 py-3 text-left font-sans-body text-sm font-semibold text-amber-950 flex items-center justify-between hover:bg-amber-100/60 transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <span>{note.icon}</span>
                        <span>{note.title}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-600 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-3 pt-1 text-xs sm:text-sm font-sans-body text-amber-900/80 leading-relaxed border-t border-amber-200/40"
                        >
                          {note.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Confetti Heart Button */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={triggerGoldenConfetti}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-rose-100 text-rose-800 text-xs font-sans-body font-bold hover:bg-rose-200 transition-colors border border-rose-200"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-bounce" />
              <span>¡Lluvia de girasoles y luces! 🌻✨</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Replay Button Required */}
      <div className="z-20 text-center pb-6">
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={onReplay}
          className="py-3.5 px-7 rounded-full bg-white/90 hover:bg-white text-amber-950 font-sans-body font-bold text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 cursor-pointer border-2 border-amber-300/80 text-amber-900"
        >
          <RotateCcw className="w-4 h-4 text-amber-600" />
          <span>Volver a ver la animación 🌻</span>
        </motion.button>

        <p className="mt-3 text-xs text-amber-900/60 font-sans-body font-medium">
          Creado con cariño y admiración ❤️
        </p>
      </div>
    </div>
  );
};
