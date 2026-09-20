import React, { useState } from 'react';
import { Landmark, Target, Briefcase, CreditCard, Coins, ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../types';

interface Step2BankProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Bank: React.FC<Step2BankProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.loanAmount.trim()) newErrors.loanAmount = 'Loan amount is required';
    if (!formData.loanPurpose) newErrors.loanPurpose = 'Please select loan purpose';
    if (!formData.occupation) newErrors.occupation = 'Please select occupation';
    if (!formData.bankName) newErrors.bankName = 'Please select bank name';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.monthlyIncome.trim()) newErrors.monthlyIncome = 'Monthly income is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mb-10">
      <div className="bg-white border-2 border-emerald-100/90 rounded-3xl p-5 sm:p-8 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-emerald-100 pb-5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#084835] text-white flex items-center justify-center shadow-sm">
              <Landmark className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#093529] leading-tight">
                Bank Information
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Apni bank ki maloomat darj karein.
              </p>
            </div>
          </div>
          <div className="font-urdu text-xl sm:text-2xl font-bold text-[#093529]">
            بینک کی معلومات
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleContinue} className="space-y-4 sm:space-y-5">
          {/* Loan Amount Required */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Loan Amount Required (PKR) <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                مطلوبہ رقم
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                  Rs
                </div>
              </div>
              <input
                type="text"
                value={formData.loanAmount}
                onChange={(e) => onChange('loanAmount', e.target.value)}
                placeholder="Enter Amount (Range : 1 lakh - 3 Crore)"
                className={`w-full pl-12 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.loanAmount ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.loanAmount && <p className="text-xs text-red-500 mt-1">{errors.loanAmount}</p>}
          </div>

          {/* Loan Purpose */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Loan Purpose <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                قرض کی وجہ
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Target className="w-5 h-5 stroke-[2]" />
              </div>
              <select
                value={formData.loanPurpose}
                onChange={(e) => onChange('loanPurpose', e.target.value)}
                className={`w-full pl-11 pr-10 py-3 bg-[#f2faf6] border ${
                  errors.loanPurpose ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base appearance-none cursor-pointer`}
              >
                <option value="">Select reason For Loan</option>
                <option value="New Business Setup">New Business Setup / نیا کاروبار</option>
                <option value="Business Expansion">Business Expansion / کاروبار میں توسیع</option>
                <option value="Agriculture & Farming">Agriculture & Farming / زراعت اور کھیتی باڑی</option>
                <option value="Livestock & Dairy">Livestock & Dairy / لائیو سٹاک اور ڈیری</option>
                <option value="Shop & Retail">Shop & Retail / دکان اور ریٹیل</option>
                <option value="Personal & Family">Personal & Family / ذاتی اور گھریلو ضرورت</option>
                <option value="Education">Education / تعلیم</option>
                <option value="Other">Other / دیگر</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.loanPurpose && <p className="text-xs text-red-500 mt-1">{errors.loanPurpose}</p>}
          </div>

          {/* Occupation */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Occupation <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                پیشہ
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Briefcase className="w-5 h-5 stroke-[2]" />
              </div>
              <select
                value={formData.occupation}
                onChange={(e) => onChange('occupation', e.target.value)}
                className={`w-full pl-11 pr-10 py-3 bg-[#f2faf6] border ${
                  errors.occupation ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base appearance-none cursor-pointer`}
              >
                <option value="">Select Occupation</option>
                <option value="Business Owner">Business Owner / کاروباری مالک</option>
                <option value="Salaried Employee">Salaried Employee / ملازم پیشہ</option>
                <option value="Farmer">Farmer / کسان</option>
                <option value="Self-Employed">Self-Employed / ذاتی روزگار</option>
                <option value="Government Employee">Government Employee / سرکاری ملازم</option>
                <option value="Other">Other / دیگر</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>}
          </div>

          {/* Bank Name */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                بینک کا نام
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Landmark className="w-5 h-5 stroke-[2]" />
              </div>
              <select
                value={formData.bankName}
                onChange={(e) => onChange('bankName', e.target.value)}
                className={`w-full pl-11 pr-10 py-3 bg-[#f2faf6] border ${
                  errors.bankName ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base appearance-none cursor-pointer`}
              >
                <option value="">Select Bank</option>
                <option value="Habib Bank Limited (HBL)">Habib Bank Limited (HBL)</option>
                <option value="United Bank Limited (UBL)">United Bank Limited (UBL)</option>
                <option value="MCB Bank Limited">MCB Bank Limited</option>
                <option value="Allied Bank Limited (ABL)">Allied Bank Limited (ABL)</option>
                <option value="Meezan Bank">Meezan Bank</option>
                <option value="National Bank of Pakistan (NBP)">National Bank of Pakistan (NBP)</option>
                <option value="Bank Alfalah">Bank Alfalah</option>
                <option value="Askari Bank">Askari Bank</option>
                <option value="The Bank of Punjab (BOP)">The Bank of Punjab (BOP)</option>
                <option value="Faysal Bank">Faysal Bank</option>
                <option value="JS Bank">JS Bank</option>
                <option value="EasyPaisa">EasyPaisa (Telenor Microfinance)</option>
                <option value="JazzCash">JazzCash (Mobilink Microfinance)</option>
                <option value="Other">Other Bank</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.bankName && <p className="text-xs text-red-500 mt-1">{errors.bankName}</p>}
          </div>

          {/* Account Number */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Account Number <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                اکاؤنٹ نمبر
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <CreditCard className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => onChange('accountNumber', e.target.value)}
                placeholder="Enter Account"
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.accountNumber ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.accountNumber && <p className="text-xs text-red-500 mt-1">{errors.accountNumber}</p>}
          </div>

          {/* Monthly Income */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Monthly Income (PKR) <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                ماہانہ آمدنی
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Coins className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="text"
                value={formData.monthlyIncome}
                onChange={(e) => onChange('monthlyIncome', e.target.value)}
                placeholder="Enter Amount"
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.monthlyIncome ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.monthlyIncome && <p className="text-xs text-red-500 mt-1">{errors.monthlyIncome}</p>}
          </div>

          {/* Buttons Navigation */}
          <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-[#daf1e7] hover:bg-[#cbf0e1] text-[#084835] font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back / واپس</span>
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-[#084835] hover:bg-[#063e2c] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20 cursor-pointer transition-colors"
            >
              <span>Continue / آگے بڑھیں</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
