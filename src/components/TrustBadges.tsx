import React from 'react';
import { ShieldCheck, Ban, Globe, Clock } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <section className="w-full bg-[#f4fcf8] pt-6 pb-2 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Trust Badges Container */}
        <div className="bg-white/80 backdrop-blur-sm border border-emerald-100/90 rounded-2xl p-4 sm:p-5 shadow-sm mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            {/* Government Verified */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835] flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#094d38] uppercase">
                GOVERNMENT VERIFIED
              </span>
            </div>

            {/* Zero Advance Fee */}
            <div className="flex items-center gap-3 sm:border-l sm:border-emerald-100 sm:pl-4">
              <div className="w-10 h-10 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835] flex-shrink-0">
                <Ban className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#094d38] uppercase">
                ZERO ADVANCE FEE
              </span>
            </div>
          </div>

          <div className="border-t border-emerald-100/80 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* State Bank Regulated */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835] flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#094d38] uppercase">
                STATE BANK REGULATED
              </span>
            </div>

            {/* 100% Online */}
            <div className="flex items-center gap-3 sm:border-l sm:border-emerald-100 sm:pl-4">
              <div className="w-10 h-10 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835] flex-shrink-0">
                <Globe className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#094d38] uppercase">
                100% ONLINE
              </span>
            </div>
          </div>

          {/* Centered 48H Approval */}
          <div className="mt-4 pt-3 border-t border-emerald-100/80 flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835]">
              <Clock className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#094d38] uppercase">
              48H APPROVAL
            </span>
          </div>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#093529] tracking-tight leading-tight mb-3">
            Apni interest{' '}
            <span className="italic font-normal text-[#0a7a58]">register karein</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Yeh chhota sa form ek representative ko aap se rabta karne deta hai jo asal application mein rehnumbai karega. Sirf basic contact aur interest ki maloomat — kabhi bhi CNIC, bank ya card details nahi.
          </p>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#093529] tracking-tight">
            Loan <span className="italic font-normal text-[#0a7a58]">application</span> form
          </h3>
        </div>
      </div>
    </section>
  );
};
