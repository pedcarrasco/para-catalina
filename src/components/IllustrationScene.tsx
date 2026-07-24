import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ArrowRight, Upload, Image as ImageIcon, RotateCcw } from 'lucide-react';

// Default generated Ghibli illustration of Catalina with her tuxedo cat
import defaultIllustration from '../assets/images/catalina_and_cat_1784858626352.jpg';

interface IllustrationSceneProps {
  userName: string;
  customImageUri: string | null;
  onImageChange: (uri: string | null) => void;
  onNext: () => void;
}

export const IllustrationScene: React.FC<IllustrationSceneProps> = ({
  userName,
  customImageUri,
  onImageChange,
  onNext,
}) => {
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const activeImage = customImageUri || defaultIllustration;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageChange(event.target.result as string);
          setShowImageUploader(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setShowImageUploader(false);
      setUrlInput('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 py-8 relative z-10 overflow-hidden bg-gradient-to-b from-amber-50 via-rose-50/50 to-amber-100/60">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="text-center z-10 max-w-xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs sm:text-sm font-sans-body font-semibold mb-3 shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Un retrato lleno de luz</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-4xl font-serif-title font-bold text-amber-950 mb-1"
        >
          {userName} & su fiel compañero 🐱❤️
        </motion.h2>

        <p className="text-amber-800/80 font-handwriting text-xl sm:text-2xl">
          Entre girasoles, sol y ronroneos
        </p>
      </div>

      {/* Main Animated Illustration Frame */}
      <div className="relative my-4 z-20 w-full max-w-sm sm:max-w-md flex flex-col items-center">
        {/* Animated Floral Frame Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-3 sm:p-4 bg-white/80 backdrop-blur-md shadow-[0_20px_60px_rgba(217,119,6,0.25)] border-2 border-amber-200/90 group"
        >
          {/* Breathing subtle float wrapper for image */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md bg-amber-100"
          >
            {/* The main illustration image */}
            <img
              src={activeImage}
              alt="Catalina con su gato"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />

            {/* Glowing Light Bokeh Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-amber-200/10 pointer-events-none" />

            {/* Floating sparkles over the illustration */}
            <motion.div
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-6 right-6 text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>

            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
              className="absolute bottom-12 left-6 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>

            {/* Subtle Cat Tail / Heart Animation Badge */}
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-200 shadow-sm flex items-center space-x-1.5">
              <span className="text-xs font-sans-body font-semibold text-amber-900">Catalina & Mishi</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Quick Option to Replace Image */}
          <button
            type="button"
            onClick={() => setShowImageUploader(!showImageUploader)}
            className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 font-sans-body text-xs font-semibold flex items-center justify-center space-x-2 transition-colors border border-amber-200/80"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>{customImageUri ? 'Cambiar foto de referencia' : '¿Usar tu propia foto? Clic aquí'}</span>
          </button>
        </motion.div>

        {/* Modal / Panel to Replace Reference Image */}
        {showImageUploader && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-3 p-4 bg-white rounded-2xl shadow-xl border border-amber-200 text-left z-30 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-950 font-sans-body uppercase tracking-wider">
                Reemplazar Foto de Referencia
              </h4>
              {customImageUri && (
                <button
                  type="button"
                  onClick={() => {
                    onImageChange(null);
                    setShowImageUploader(false);
                  }}
                  className="text-xs text-rose-600 hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restaurar original</span>
                </button>
              )}
            </div>

            {/* File upload input */}
            <div>
              <label className="block w-full py-2 px-3 border-2 border-dashed border-amber-300 rounded-xl text-center text-xs text-amber-800 font-medium cursor-pointer hover:bg-amber-50 transition-colors">
                <Upload className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                Subir foto desde tu dispositivo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* URL input */}
            <form onSubmit={handleUrlSubmit} className="flex space-x-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="O pega el enlace de una imagen..."
                className="flex-1 text-xs px-3 py-2 border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600"
              >
                Usar
              </button>
            </form>
          </motion.div>
        )}
      </div>

      {/* Next Step Button */}
      <div className="z-20 text-center pb-6">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onNext}
          className="py-4 px-8 rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-amber-600 text-white font-sans-body font-bold text-lg shadow-[0_10px_30px_rgba(244,63,94,0.35)] hover:shadow-[0_15px_35px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 cursor-pointer border border-rose-200/50"
        >
          <span>Leer tu mensaje especial</span>
          <Heart className="w-5 h-5 fill-current text-white/90 animate-pulse" />
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
