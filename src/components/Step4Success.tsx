import React, { useState, useEffect } from 'react';
import { Check, FileText, Search, Clock, Phone, Home, ArrowRight, RefreshCw, FastForward } from 'lucide-react';

interface Step4SuccessProps {
  onGoHome: () => void;
  submissionTime?: number;
}

const REVIEW_DURATION_MS = 20 * 60 * 1000; // 20 minutes in milliseconds

export const Step4Success: React.FC<Step4SuccessProps> = ({ onGoHome, submissionTime }) => {
  // Get or persist submission timestamp
  const [initialTime, setInitialTime] = useState<number>(() => {
    if (submissionTime) return submissionTime;
    const stored = localStorage.getItem('loan_portal_submitted_at');
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) return parsed;
    }
    const now = Date.now();
    localStorage.setItem('loan_portal_submitted_at', now.toString());
    return now;
  });

  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [simulationOffsetMs, setSimulationOffsetMs] = useState<number>(0);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const effectiveElapsed = (currentTime - initialTime) + simulationOffsetMs;
  const isPending = effectiveElapsed >= REVIEW_DURATION_MS;

  // Calculate remaining time for 20-minute countdown
  const remainingMs = Math.max(0, REVIEW_DURATION_MS - effectiveElapsed);
  const remainingMinutes = Math.floor(remainingMs / 60000);
  const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);
  const formattedCountdown = `${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  const toggleFastForward = () => {
    if (isPending) {
      // Reset back to just submitted
      const now = Date.now();
      setInitialTime(now);
      setSimulationOffsetMs(0);
      localStorage.setItem('loan_portal_submitted_at', now.toString());
    } else {
      // Fast forward past 20 minutes
      setSimulationOffsetMs(REVIEW_DURATION_MS + 1000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mb-10">
      <div className="bg-white border-2 border-emerald-100/90 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
        {/* Animated Green Checkmark with Radial Rays */}
        <div className="relative w-28 h-28 mx-auto mb-5 flex items-center justify-center">
          {/* Radial Rays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <div
                key={deg}
                className="absolute w-1.5 h-3.5 bg-emerald-500 rounded-full"
                style={{
                  transform: `rotate(${deg}deg) translateY(-38px)`,
                }}
              />
            ))}
          </div>

          {/* Center Checkmark Circle */}
          <div className="w-20 h-20 rounded-full bg-[#0a7a58] text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 ring-4 ring-emerald-100">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#093529] tracking-tight mb-1">
          Your Form Is Successful
        </h3>
        <p className="font-urdu text-xl sm:text-2xl font-bold text-[#0a7a58] mb-6">
          آپ کا فارم کامیابی سے جمع ہو گیا ہے
        </p>

        {/* Dynamic Status Callout Box */}
        {!isPending ? (
          <div className="bg-[#f0fbf6] border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 text-left max-w-2xl mx-auto mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#084835] text-white flex items-center justify-center flex-shrink-0 shadow-sm relative mt-0.5 sm:mt-0">
                  <Search className="w-6 h-6 stroke-[2] animate-pulse" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-[#093529] text-base sm:text-lg">
                      Application Under Review
                    </h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      زیر جائزہ
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Your application has been submitted and is immediately under review. It will move to <span className="font-semibold text-emerald-800">Pending</span> after 20 minutes.
                  </p>
                  <p className="font-urdu text-xs sm:text-sm text-[#084835] mt-0.5 font-medium">
                    درخواست 20 منٹ تک جائزہ میں رہے گی
                  </p>
                </div>
              </div>

              {/* Countdown Badge - Visible on both mobile and desktop */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center flex-shrink-0 pt-2 sm:pt-0 border-t border-emerald-200/60 sm:border-t-0 pl-0 sm:pl-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Review Timer
                </span>
                <div className="flex items-center gap-1.5 text-base sm:text-lg font-mono font-bold text-[#084835] bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs sm:mt-1">
                  <Clock className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>{formattedCountdown}</span>
                </div>
                <span className="text-[10px] text-slate-500 hidden sm:block mt-0.5">20 min countdown</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#fffbeb] border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-left max-w-2xl mx-auto mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm relative mt-0.5 sm:mt-0">
                  <Clock className="w-6 h-6 stroke-[2]" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-amber-950 text-base sm:text-lg">
                      Application Status: Pending
                    </h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      زیر التواء
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">
                    Initial 20-minute review is complete! Your application is now in <span className="font-semibold text-amber-900">Pending</span> status awaiting final 48-hour approval.
                  </p>
                  <p className="font-urdu text-xs sm:text-sm text-amber-900 mt-0.5 font-medium">
                    ابتدائی 20 منٹ مکمل، اب 48 گھنٹے کے اندر حتمی تصدیق ہوگی
                  </p>
                </div>
              </div>

              {/* Status Badge - Visible on both mobile and desktop */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center flex-shrink-0 pt-2 sm:pt-0 border-t border-amber-200/70 sm:border-t-0 pl-0 sm:pl-2">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  Current Stage
                </span>
                <span className="text-xs sm:text-sm font-bold text-amber-950 bg-white px-3 py-1 rounded-lg border border-amber-200 sm:mt-1">
                  Pending / زیر التواء
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4-Stage Timeline - Optimized for Mobile (2x2 grid) and Desktop (4 columns) */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-3.5 sm:p-6 max-w-3xl mx-auto mb-6 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2">
            {/* Step 1: Submitted - ALWAYS COMPLETED */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#f8fdfa] sm:bg-transparent">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0a7a58] text-white flex items-center justify-center mb-1.5 sm:mb-2 shadow-sm">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#093529]">Submitted</span>
              <span className="font-urdu text-[11px] sm:text-xs text-slate-600 font-medium">جمع کرائی گئی</span>
              <div className="mt-1.5 sm:mt-2 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Step 2: Under Review - ACTIVE IMMEDIATELY, COMPLETED AFTER 20 MINS */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#f8fdfa] sm:bg-transparent relative">
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1.5 sm:mb-2 transition-all ${
                isPending
                  ? 'bg-[#0a7a58] text-white shadow-sm'
                  : 'bg-[#084835] text-white ring-4 ring-emerald-200 shadow-md scale-105'
              }`}>
                <Search className={`w-5 h-5 stroke-[2] ${!isPending ? 'animate-pulse' : ''}`} />
              </div>
              <span className={`text-[11px] sm:text-xs font-bold ${!isPending ? 'text-[#084835]' : 'text-[#093529]'}`}>
                Under Review
              </span>
              <span className="font-urdu text-[11px] sm:text-xs text-slate-600 font-medium">زیر جائزہ</span>
              
              <div className="mt-1.5 sm:mt-2 flex items-center justify-center">
                {isPending ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 animate-pulse">
                    <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
                    <span>Active</span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Pending - WAITING FIRST 20 MINS, THEN BECOMES ACTIVE */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#f8fdfa] sm:bg-transparent">
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1.5 sm:mb-2 transition-all ${
                isPending
                  ? 'bg-amber-500 text-white ring-4 ring-amber-100 shadow-md scale-105'
                  : 'bg-[#f0fbf6] border border-emerald-200 text-slate-400'
              }`}>
                <Clock className="w-5 h-5 stroke-[2]" />
              </div>
              <span className={`text-[11px] sm:text-xs font-bold ${isPending ? 'text-amber-900' : 'text-slate-600'}`}>
                Pending
              </span>
              <span className="font-urdu text-[11px] sm:text-xs text-slate-600 font-medium">زیر التواء</span>
              
              <div className="mt-1.5 sm:mt-2 flex items-center justify-center">
                {isPending ? (
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">
                    <Clock className="w-3 h-3" />
                    <span>In Queue</span>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200 text-xs font-bold">
                    •••
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Reply in 48 Hours */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#f8fdfa] sm:bg-transparent">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f0fbf6] border border-emerald-200 flex items-center justify-center text-[#084835] mb-1.5 sm:mb-2">
                <Phone className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#093529]">Reply in 48 Hours</span>
              <span className="font-urdu text-[11px] sm:text-xs text-slate-600 font-medium">48 گھنٹوں میں جواب</span>
              <div className="mt-1.5 sm:mt-2 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-300">
                <Clock className="w-3.5 h-3.5 stroke-[2]" />
              </div>
            </div>
          </div>
        </div>

        {/* 48 Hour Notice Box */}
        <div className="bg-[#daf1e7] border border-emerald-200/90 rounded-2xl p-4 flex items-center gap-3.5 max-w-2xl mx-auto mb-6 text-left">
          <div className="w-10 h-10 rounded-full bg-white text-[#084835] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Clock className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h5 className="font-bold text-[#094d38] text-sm sm:text-base">
              You will receive an official SMS update within 48 hours.
            </h5>
            <p className="font-urdu text-xs sm:text-sm text-[#094d38]/90 font-medium mt-0.5">
              آپ کو 48 گھنٹوں کے اندر ایس ایم ایس موصول ہوگا۔
            </p>
          </div>
        </div>

        {/* Quick Demo Test Toggle for User / Tester */}
        <div className="max-w-xl mx-auto mb-8 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-left">
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-800">20-Minute Timer Simulation:</span>{' '}
            {isPending ? 'Currently in Pending mode (>20 mins)' : `Under Review (${formattedCountdown} remaining)`}
          </div>
          <button
            type="button"
            onClick={toggleFastForward}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 shadow-2xs"
          >
            {isPending ? (
              <>
                <RefreshCw className="w-3 h-3 text-emerald-600" />
                <span>Reset to Under Review</span>
              </>
            ) : (
              <>
                <FastForward className="w-3 h-3 text-amber-600" />
                <span>Simulate 20 Mins (Jump to Pending)</span>
              </>
            )}
          </button>
        </div>

        {/* Thank You Footer */}
        <div className="mb-6 flex flex-col items-center">
          <div className="text-sm font-bold text-[#093529]">
            Thank you for applying!
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-[1px] w-12 bg-emerald-200" />
            <span className="font-urdu text-sm font-semibold text-[#0a7a58]">
              درخواست دینے کا شکریہ
            </span>
            <div className="h-[1px] w-12 bg-emerald-200" />
          </div>
        </div>

        {/* Go to Home Button */}
        <button
          onClick={onGoHome}
          className="w-full sm:w-auto min-w-[280px] bg-[#074e37] hover:bg-[#063e2c] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-3 transition-all cursor-pointer mx-auto"
        >
          <Home className="w-5 h-5" />
          <span className="text-base sm:text-lg">Go to Home</span>
          <span className="text-emerald-300/60 font-light">/</span>
          <span className="font-urdu text-base sm:text-lg">ہوم پیج پر جائیں</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
