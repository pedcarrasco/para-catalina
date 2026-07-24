import React, { useMemo } from 'react';

export const ParticleBackground: React.FC = () => {
  // Generate static random positions for particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 8 + 4}px`,
      duration: `${Math.random() * 8 + 6}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, []);

  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 12 + 14,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 8}s`,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft warm light gradient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-100/50 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '4s' }} />

      {/* Floating golden sparkle particles */}
      {particles.map((p) => (
        <div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse-soft"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Floating sunflower petals */}
      {petals.map((petal) => (
        <div
          key={`petal-${petal.id}`}
          className="absolute top-0 text-amber-400 opacity-80"
          style={{
            left: petal.left,
            animation: `float-petal ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.5}
            viewBox="0 0 24 36"
            fill="currentColor"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path d="M12 0 C18 10, 24 20, 12 36 C0 20, 6 10, 12 0 Z" className="text-amber-400/90 fill-current drop-shadow-xs" />
          </svg>
        </div>
      ))}
    </div>
  );
};
