import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppStep } from './types';
import { ParticleBackground } from './components/ParticleBackground';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SunflowerGardenAnimation } from './components/SunflowerGardenAnimation';
import { IllustrationScene } from './components/IllustrationScene';
import { FinalMessageCard } from './components/FinalMessageCard';

export default function App() {
  const [step, setStep] = useState<AppStep>('WELCOME');
  const [userName, setUserName] = useState<string>('Catalina');
  const [customImageUri, setCustomImageUri] = useState<string | null>(null);

  const handleStart = (name: string) => {
    setUserName(name || 'Catalina');
    setStep('SUNFLOWERS_GROWING');
  };

  const handleGardenComplete = () => {
    setStep('ILLUSTRATION_SHOW');
  };

  const handleIllustrationNext = () => {
    setStep('FINAL_CARD');
  };

  const handleReplay = () => {
    setStep('WELCOME');
  };

  return (
    <main className="min-h-screen w-full relative bg-[#FFFDF9] text-[#4A3E3D] selection:bg-amber-200 selection:text-amber-900 font-sans-body overflow-x-hidden">
      {/* Background Floating Golden Particles and Soft Light Blobs */}
      <ParticleBackground />

      {/* Screen Transitions with AnimatePresence */}
      <AnimatePresence mode="wait">
        {step === 'WELCOME' && (
          <motion.div
            key="step-welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
          >
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {step === 'SUNFLOWERS_GROWING' && (
          <motion.div
            key="step-garden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SunflowerGardenAnimation
              userName={userName}
              onComplete={handleGardenComplete}
            />
          </motion.div>
        )}

        {step === 'ILLUSTRATION_SHOW' && (
          <motion.div
            key="step-illustration"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8 }}
          >
            <IllustrationScene
              userName={userName}
              customImageUri={customImageUri}
              onImageChange={setCustomImageUri}
              onNext={handleIllustrationNext}
            />
          </motion.div>
        )}

        {step === 'FINAL_CARD' && (
          <motion.div
            key="step-final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <FinalMessageCard
              userName={userName}
              onReplay={handleReplay}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
