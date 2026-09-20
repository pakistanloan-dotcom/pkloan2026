import React from 'react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onApplyClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onApplyClick }) => {
  return (
    <footer className="w-full bg-[#edf8f3] text-slate-700 pt-12 relative overflow-hidden border-t border-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Logo and Tagline */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#084835] flex items-center justify-center shadow-md shadow-emerald-950/15 flex-shrink-0">
            <svg 
              viewBox="0 0 100 100" 
              className="w-8 h-8 fill-white"
              aria-label="Pakistan Crescent and Star"
            >
              <path d="M52 18 C32 18 16 34 16 54 C16 74 32 90 52 90 C65 90 76 83 82 72 C60 76 40 60 40 40 C40 31 44 23 52 18 Z" />
              <polygon points="68,26 73,39 86,39 76,48 80,61 68,53 57,61 61,48 51,39 64,39" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-extrabold tracking-widest text-[#0e6f54] uppercase">
              MINISTRY OF FINANCE
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#093529] tracking-tight leading-tight">
              Pakistan Loan Portal
            </h4>
          </div>
        </div>

        <p className="text-sm text-slate-600 max-w-xl leading-relaxed mb-8">
          Official portal for loan assistance programmes. All applications are processed through verified government channels.
        </p>

        {/* Contact Section */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
            CONTACT
          </div>
          <div className="space-y-2.5 text-sm sm:text-base text-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835]">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-semibold text-[#093529]">0800114400 (Helpline)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="font-semibold text-[#093529]">03422050953 (WhatsApp)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835]">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium text-slate-700">info@finance.gov.pk</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#daf1e7] flex items-center justify-center text-[#084835]">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-medium text-slate-700">Q-Block, Pak Secretariat, Islamabad</span>
            </div>
          </div>
        </div>

        {/* Section Links */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
            SECTION
          </div>
          <ul className="space-y-2 text-sm sm:text-base font-semibold text-[#093529]">
            <li>
              <a href="#about" className="hover:text-emerald-700 transition-colors">
                About Programme
              </a>
            </li>
            <li>
              <button 
                onClick={onApplyClick}
                className="hover:text-emerald-700 transition-colors font-semibold cursor-pointer text-left"
              >
                Apply for Loan
              </button>
            </li>
            <li>
              <a href="#terms" className="hover:text-emerald-700 transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-emerald-700 transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-emerald-200/80 mb-6" />

        {/* Copyright & National Slogan */}
        <div className="text-center pb-24 text-xs font-medium text-slate-600 space-y-1">
          <p className="tracking-wider uppercase text-[11px] text-slate-500">
            © MOF.GOV.PK — GOVERNMENT OF PAKISTAN
          </p>
          <p className="font-bold text-[#084835] tracking-widest text-sm">
            PAKISTAN ZINDABAD 🇵🇰
          </p>
          <p className="text-[10px] tracking-wider text-slate-400">
            ALL RIGHTS RESERVED
          </p>
        </div>
      </div>

      {/* Decorative Wavy Curves at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <path 
            d="M0 60 C320 120 420 0 720 50 C1020 100 1140 10 1440 40 L1440 120 L0 120 Z" 
            fill="#063e2c" 
          />
          <path 
            d="M0 80 C240 30 520 120 840 80 C1160 40 1320 110 1440 80 L1440 120 L0 120 Z" 
            fill="#084835" 
            opacity="0.85" 
          />
        </svg>
      </div>
    </footer>
  );
};
