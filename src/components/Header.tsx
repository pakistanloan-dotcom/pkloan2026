import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full relative overflow-hidden">
      {/* Top National Bar */}
      <div className="bg-[#084835] text-white py-2 px-4 text-xs sm:text-sm font-medium border-b border-emerald-900/40">
        <div className="max-w-4xl mx-auto flex items-center justify-between sm:justify-start sm:gap-4">
          <span className="font-urdu text-sm sm:text-base tracking-wide">
            حکومت پاکستان
          </span>
          <span className="text-emerald-300/60 font-light">|</span>
          <span className="tracking-wide text-xs sm:text-sm font-sans opacity-95">
            Islamic Republic of Pakistan
          </span>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="relative bg-gradient-to-r from-[#ebfaf3] via-[#f1fcf7] to-[#e6f7ef] border-b border-emerald-100/80">
        {/* Subtle background mosque silhouette */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/3 opacity-25 pointer-events-none bg-no-repeat bg-right bg-contain"
          style={{ backgroundImage: 'url("/images/islamabad_monuments.jpg")' }}
        />

        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3.5">
            {/* Pakistan Government / MOF Logo Emblem */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#084835] flex items-center justify-center shadow-md shadow-emerald-950/15 ring-2 ring-emerald-600/30 flex-shrink-0">
              <svg 
                viewBox="0 0 100 100" 
                className="w-8 h-8 sm:w-9 sm:h-9 fill-white"
                aria-label="Pakistan Crescent and Star"
              >
                {/* Crescent and Star */}
                <path d="M52 18 C32 18 16 34 16 54 C16 74 32 90 52 90 C65 90 76 83 82 72 C60 76 40 60 40 40 C40 31 44 23 52 18 Z" />
                <polygon points="68,26 73,39 86,39 76,48 80,61 68,53 57,61 61,48 51,39 64,39" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-extrabold tracking-widest text-[#0e6f54] uppercase">
                MINISTRY OF FINANCE
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#093529] tracking-tight leading-tight">
                Pakistan Loan Portal
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
