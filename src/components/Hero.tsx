import React from 'react';
import { Send, ArrowRight, Banknote, Clock, ShieldCheck, Users } from 'lucide-react';

interface HeroProps {
  onApplyClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#f0fbf6] via-[#edf9f3] to-[#f4fcf8] pt-6 pb-8 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Scheme Badge */}
        <div className="inline-flex items-center gap-2 bg-[#084835] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider shadow-sm mb-4">
          <span>PM YOUTH E-ASAN LOAN SCHEME</span>
          <span className="text-emerald-400">•</span>
          <span>2026</span>
        </div>

        {/* Hero Title and Flag Graphic Layout */}
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div className="flex-1 z-10">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#093529] tracking-tight leading-[1.15] mb-2">
              Apna Karobar,
            </h2>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl italic font-bold text-[#0a7a58] tracking-tight leading-[1.15] mb-4">
              Apna Mustaqbil.
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-xl">
              Government of Pakistan ke asaan qist programme ke zariye{' '}
              <strong className="text-[#084835] font-bold">PKR 10 Lakh se 3 Crore</strong>{' '}
              tak ka qarz — kam markup, tez approval, sirf 48 ghante mein.
            </p>
          </div>

          {/* Pakistan Flag Wave Graphic */}
          <div className="relative w-full md:w-5/12 h-44 sm:h-56 md:h-64 flex items-center justify-center overflow-hidden rounded-2xl">
            <img 
              src="/images/pakistan_wave_flag.jpg" 
              alt="Pakistan National Flag Wave Ribbon" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-700"
            />
            {/* Soft gradient blend on edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
          </div>
        </div>

        {/* Main CTA Button */}
        <div className="mb-4">
          <button 
            id="hero-apply-btn"
            onClick={onApplyClick}
            className="w-full sm:w-auto min-w-[320px] bg-[#074e37] hover:bg-[#063e2c] active:scale-[0.99] text-white px-8 py-4 rounded-2xl sm:rounded-full font-bold shadow-lg shadow-emerald-950/25 flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5 fill-white text-white transform -rotate-12 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-lg sm:text-xl tracking-wide font-semibold">Apply Now</span>
            </div>
            
            <span className="text-emerald-300/60 font-light text-xl">|</span>
            
            <div className="flex items-center gap-3">
              <span className="font-urdu text-lg sm:text-xl font-normal pt-1">درخواست دیں</span>
              <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="bg-[#daf1e7] border border-emerald-200/80 rounded-2xl py-2.5 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#094d38] mb-6 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span>Online Portal Active — Quick 48-Hour Approval</span>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Card 01 */}
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#daf1e7] flex items-center justify-center text-[#084835] flex-shrink-0">
              <Banknote className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="border-l border-emerald-100/80 pl-3">
              <span className="text-[11px] font-bold text-emerald-700 block">01</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#093529] leading-tight">
                10L – 3 Cr
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Zaroorat ke mutabiq qarz limit
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#daf1e7] flex items-center justify-center text-[#084835] flex-shrink-0">
              <Clock className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="border-l border-emerald-100/80 pl-3">
              <span className="text-[11px] font-bold text-emerald-700 block">02</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#093529] leading-tight">
                48 Hours
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tez tareen approval processing
              </p>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#daf1e7] flex items-center justify-center text-[#084835] flex-shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="border-l border-emerald-100/80 pl-3">
              <span className="text-[11px] font-bold text-emerald-700 block">03</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#093529] leading-tight">
                Secure
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Government certified portal
              </p>
            </div>
          </div>

          {/* Card 04 */}
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#daf1e7] flex items-center justify-center text-[#084835] flex-shrink-0">
              <Users className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="border-l border-emerald-100/80 pl-3">
              <span className="text-[11px] font-bold text-emerald-700 block">04</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#093529] leading-tight">
                Sab ke liye
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Karobar, mulazim aur kisan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
