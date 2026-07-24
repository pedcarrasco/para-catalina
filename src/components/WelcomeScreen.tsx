import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Sun } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [nameInput, setNameInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setShowHint(true);
      return;
    }

    // Play sweet welcome chime and start music
    romanticAudio.playChime();
    romanticAudio.start();

    // Call onStart handler
    onStart(trimmed);
  };

  const handleQuickCatalina = () => {
    setNameInput('Catalina');
    setShowHint(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(251,191,36,0.15)] border border-amber-100/80 text-center relative overflow-hidden"
      >
        {/* Soft decorative background ribbon */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/30 rounded-full blur-xl" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-rose-200/30 rounded-full blur-xl" />

        {/* Sunflower Icon Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-100 via-amber-200 to-amber-300 text-amber-700 shadow-inner mb-6 relative group"
        >
          <Sun className="w-10 h-10 text-amber-600 animate-spin-slow" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 bg-rose-400 text-white rounded-full p-1 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>

        {/* Romantic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl sm:text-4xl font-serif-title font-bold text-amber-950 mb-3 tracking-wide"
        >
          Un Detalle Especial
        </motion.h1>

        {/* Required Prompt Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-amber-900/80 font-sans-body text-base sm:text-lg mb-8 leading-relaxed font-medium"
        >
          Antes de comenzar, dime tu nombre ✨
        </motion.p>

        {/* Name Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="relative">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                if (showHint) setShowHint(false);
              }}
              placeholder="Escribe tu nombre..."
              className="w-full px-5 py-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200/80 text-amber-950 placeholder-amber-400/80 font-sans-body text-center text-lg focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-200/50 transition-all shadow-inner"
              autoFocus
            />
            {/* Quick autocomplete button if user wants to tap Catalina */}
            {!nameInput && (
              <button
                type="button"
                onClick={handleQuickCatalina}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-sans-body font-semibold text-amber-700 bg-amber-100/90 rounded-xl hover:bg-amber-200 transition-colors border border-amber-200/60"
              >
                Catalina 🌻
              </button>
            )}
          </div>

          {showHint && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-rose-500 font-sans-body font-medium"
            >
              Por favor escribe tu nombre para descubrir la sorpresa ❤️
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white font-sans-body font-bold text-lg shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>Continuar</span>
            <Heart className="w-5 h-5 fill-current text-white/90 group-hover:scale-125 transition-transform" />
          </button>
        </motion.form>

        <p className="mt-6 text-xs text-amber-800/60 font-sans-body font-light">
          Preparado con cariño para Catalina 💛
        </p>
      </motion.div>
    </div>
  );
};
