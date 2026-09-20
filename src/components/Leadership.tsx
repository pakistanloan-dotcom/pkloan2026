import React from 'react';
import { Landmark, Users } from 'lucide-react';

export const Leadership: React.FC = () => {
  return (
    <section className="w-full bg-[#f4fcf8] py-8 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-extrabold tracking-widest text-emerald-800 uppercase">
              LEADERSHIP
            </span>
            <div className="h-[2px] w-16 bg-emerald-300 rounded-full" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#093529] tracking-tight leading-tight">
            A vision for a{' '}
            <span className="italic font-normal text-[#0a7a58]">prosperous</span>{' '}
            Pakistan.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Guided by strong leadership, working for a brighter future.
          </p>
        </div>

        {/* Leadership Cards Stack */}
        <div className="space-y-6">
          {/* Card 1: Prime Minister */}
          <div className="relative bg-white border border-emerald-100 rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            {/* Background wave curve decoration */}
            <div className="absolute right-0 bottom-0 w-48 h-24 bg-gradient-to-tl from-emerald-100/60 to-transparent pointer-events-none rounded-br-3xl" />
            
            {/* Photo */}
            <div className="w-full sm:w-56 h-64 sm:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-md ring-2 ring-emerald-100">
              <img 
                src="/images/shehbaz_sharif.jpg" 
                alt="Prime Minister Muhammad Shehbaz Sharif" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Info */}
            <div className="flex-1 relative z-10 text-left w-full">
              <div className="inline-flex items-center gap-1.5 bg-[#daf1e7] text-[#094d38] px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2">
                <Landmark className="w-3.5 h-3.5" />
                <span>PRIME MINISTER OF PAKISTAN</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#093529] mb-2 leading-tight">
                Muhammad Shehbaz Sharif
              </h3>
              <div className="h-1 w-10 bg-emerald-600 rounded-full mb-4" />
              <blockquote className="italic text-slate-700 font-medium text-base sm:text-lg leading-relaxed flex items-start gap-1">
                <span className="text-[#0a7a58] font-serif text-2xl leading-none">“</span>
                <span className="pt-0.5">
                  Har Pakistani ko maaliyati asani aur khud mukhtari milni chahiye.
                </span>
                <span className="text-[#0a7a58] font-serif text-2xl leading-none">”</span>
              </blockquote>
            </div>
          </div>

          {/* Card 2: Chief Minister Punjab */}
          <div className="relative bg-white border border-emerald-100 rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden flex flex-col-reverse sm:flex-row items-center gap-5 sm:gap-6">
            {/* Background wave curve decoration */}
            <div className="absolute left-0 bottom-0 w-48 h-24 bg-gradient-to-tr from-emerald-100/60 to-transparent pointer-events-none rounded-bl-3xl" />

            {/* Info */}
            <div className="flex-1 relative z-10 text-left w-full">
              <div className="inline-flex items-center gap-1.5 bg-[#daf1e7] text-[#094d38] px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>CHIEF MINISTER — PUNJAB</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#093529] mb-2 leading-tight">
                Maryam Nawaz Sharif
              </h3>
              <div className="h-1 w-10 bg-emerald-600 rounded-full mb-4" />
              <blockquote className="italic text-slate-700 font-medium text-base sm:text-lg leading-relaxed flex items-start gap-1">
                <span className="text-[#0a7a58] font-serif text-2xl leading-none">“</span>
                <span className="pt-0.5">
                  Naujawan aur chote karobari hazraat ki maali madad hamari tarjeeh hai.
                </span>
                <span className="text-[#0a7a58] font-serif text-2xl leading-none">”</span>
              </blockquote>
            </div>

            {/* Photo */}
            <div className="w-full sm:w-56 h-64 sm:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-md ring-2 ring-emerald-100">
              <img 
                src="/images/maryam_nawaz.jpg" 
                alt="Chief Minister Maryam Nawaz Sharif" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
