import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, duration = 2600 }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Smooth progress animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration - 400) {
        setIsFadingOut(true);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        onFinish();
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f4fcf7] select-none transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Interest-Free Loan Scheme Portal"
    >
      <div className="flex flex-col items-center max-w-sm w-full px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        {/* Emblem Card - soft rounded container matching screenshot */}
        <div className="w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-[36px] shadow-[0_12px_35px_rgba(8,72,53,0.08)] border border-emerald-50 flex items-center justify-center p-5 mb-8 transition-transform transform">
          <div className="w-full h-full flex items-center justify-center relative">
            <img
              src="/images/pakistan_emblem_logo.jpg"
              alt="State Emblem of Pakistan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter contrast-125"
              onError={(e) => {
                // Fallback SVG in case image doesn't render
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('svg')) {
                  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                  svg.setAttribute('viewBox', '0 0 100 100');
                  svg.setAttribute('class', 'w-24 h-24 text-[#084835]');
                  svg.innerHTML = `
                    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="2.5" />
                    <path d="M52 24 C38 24 28 34 28 48 C28 62 38 72 52 72 C62 72 70 66 74 58 C58 61 44 48 44 32 C44 26 48 24 52 24 Z" fill="currentColor"/>
                    <polygon points="63,28 67,39 78,39 69,46 72,57 63,50 54,57 57,46 48,39 59,39" fill="currentColor"/>
                  `;
                  parent.appendChild(svg);
                }
              }}
            />
          </div>
        </div>

        {/* English Title - Bold Sans/Display */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a2f24] font-sans mb-3">
          Interest-Free Loan Scheme
        </h1>

        {/* Urdu Calligraphy - Nastaliq script */}
        <div className="font-urdu text-2xl sm:text-3xl font-bold text-[#084835] mb-2 leading-relaxed" dir="rtl">
          بلا سود قرضہ سکیم
        </div>

        {/* Subtitle - Government of Pakistan */}
        <p className="text-sm sm:text-base font-medium text-slate-600 mb-10 tracking-wide">
          Government of Pakistan
        </p>

        {/* Progress Bar Container - matches screenshot's thin dual-tone bar */}
        <div className="w-56 sm:w-64 h-1.5 bg-[#d8eee2] rounded-full overflow-hidden mb-3 relative">
          <div
            className="h-full bg-[#084835] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <span className="text-xs sm:text-sm font-medium text-slate-500 tracking-wider">
          Loading...
        </span>
      </div>
    </div>
  );
};
