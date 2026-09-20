import React from 'react';
import { User, Landmark, CreditCard, ShieldCheck } from 'lucide-react';
import { StepNumber } from '../types';

interface StepperProps {
  currentStep: StepNumber;
  onStepClick?: (step: StepNumber) => void;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    {
      step: 1 as StepNumber,
      icon: User,
      title: 'Step 1',
      urdu: 'ذاتی معلومات',
    },
    {
      step: 2 as StepNumber,
      icon: Landmark,
      title: 'Step 2',
      urdu: 'بینک کی معلومات',
    },
    {
      step: 3 as StepNumber,
      icon: CreditCard,
      title: 'Step 3',
      urdu: 'فیس ادائیگی',
    },
    {
      step: 4 as StepNumber,
      icon: ShieldCheck,
      title: 'Step 4',
      urdu: 'کامیابی',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 mb-2">
      <div className="relative flex items-center justify-between">
        {/* Connecting Lines */}
        <div className="absolute left-[12%] right-[12%] top-6 h-[2px] bg-emerald-200 -z-0" />
        <div 
          className="absolute left-[12%] top-6 h-[2px] bg-[#084835] -z-0 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 76}%`
          }}
        />

        {steps.map((item) => {
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;
          const Icon = item.icon;

          return (
            <div 
              key={item.step}
              onClick={() => {
                // Allow navigating to completed steps or current
                if (isCompleted && onStepClick) {
                  onStepClick(item.step);
                }
              }}
              className={`flex flex-col items-center text-center z-10 ${
                isCompleted ? 'cursor-pointer' : ''
              }`}
            >
              {/* Step Circle */}
              <div 
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isActive
                    ? 'bg-[#084835] text-white ring-4 ring-emerald-100 scale-105'
                    : isCompleted
                    ? 'bg-[#0a7a58] text-white'
                    : 'bg-[#daf1e7] text-[#084835] border border-emerald-300/80'
                }`}
              >
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>

              {/* Step Labels */}
              <span className={`text-[11px] sm:text-sm font-bold mt-1.5 sm:mt-2 ${
                isActive ? 'text-[#084835]' : 'text-slate-700'
              }`}>
                {item.title}
              </span>
              
              <span className={`font-urdu text-[11px] sm:text-sm font-medium leading-tight mt-0.5 max-w-[70px] sm:max-w-none truncate sm:overflow-visible ${
                isActive ? 'text-[#084835]' : 'text-slate-600'
              }`}>
                {item.urdu}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
