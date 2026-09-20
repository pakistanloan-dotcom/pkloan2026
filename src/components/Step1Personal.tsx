import React, { useState } from 'react';
import { User, CreditCard, Phone, Users, Calendar, MapPin, Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../types';

interface Step1PersonalProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step1Personal: React.FC<Step1PersonalProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatCNIC = (val: string) => {
    // Keep digits only, max 13 digits
    const cleaned = val.replace(/\D/g, '').slice(0, 13);
    if (cleaned.length > 12) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(12)}`;
    } else if (cleaned.length > 5) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    return cleaned;
  };

  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNIC(e.target.value);
    onChange('cnic', formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d-]/g, '').slice(0, 12);
    onChange('mobileNo', cleaned);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.cnic.trim() || formData.cnic.replace(/\D/g, '').length < 13) {
      newErrors.cnic = 'Valid 13-digit CNIC is required';
    }
    if (!formData.mobileNo.trim() || formData.mobileNo.replace(/\D/g, '').length < 11) {
      newErrors.mobileNo = 'Valid 11-digit Mobile number is required';
    }
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.province) newErrors.province = 'Please select province';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

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
              <User className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#093529] leading-tight">
                Personal Information
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Apni zaati maloomat darj karein.
              </p>
            </div>
          </div>
          <div className="font-urdu text-xl sm:text-2xl font-bold text-[#093529]">
            ذاتی معلومات
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleContinue} className="space-y-4 sm:space-y-5">
          {/* Full Name */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                پورا نام
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <User className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => onChange('fullName', e.target.value)}
                placeholder="e.g. Ali Khan"
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.fullName ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          {/* CNIC */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                CNIC <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                شناختی کارڈ نمبر
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <CreditCard className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="text"
                value={formData.cnic}
                onChange={handleCnicChange}
                placeholder="12345-1234567-1"
                maxLength={15}
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.cnic ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.cnic && <p className="text-xs text-red-500 mt-1">{errors.cnic}</p>}
          </div>

          {/* Mobile No */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Mobile No <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                موبائل نمبر
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Phone className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="text"
                value={formData.mobileNo}
                onChange={handlePhoneChange}
                placeholder="0300-1234567"
                maxLength={12}
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.mobileNo ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.mobileNo && <p className="text-xs text-red-500 mt-1">{errors.mobileNo}</p>}
          </div>

          {/* Gender */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Gender <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                جنس
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Users className="w-5 h-5 stroke-[2]" />
              </div>
              <select
                value={formData.gender}
                onChange={(e) => onChange('gender', e.target.value)}
                className={`w-full pl-11 pr-10 py-3 bg-[#f2faf6] border ${
                  errors.gender ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base appearance-none cursor-pointer`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male / مرد</option>
                <option value="Female">Female / عورت</option>
                <option value="Other">Other / دیگر</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                تاریخ پیدائش
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Calendar className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => onChange('dob', e.target.value)}
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.dob ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
          </div>

          {/* Province */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Province <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                صوبہ
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <MapPin className="w-5 h-5 stroke-[2]" />
              </div>
              <select
                value={formData.province}
                onChange={(e) => onChange('province', e.target.value)}
                className={`w-full pl-11 pr-10 py-3 bg-[#f2faf6] border ${
                  errors.province ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base appearance-none cursor-pointer`}
              >
                <option value="">Select province</option>
                <option value="Punjab">Punjab / پنجاب</option>
                <option value="Sindh">Sindh / سندھ</option>
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa / خیبر پختونخوا</option>
                <option value="Balochistan">Balochistan / بلوچستان</option>
                <option value="Islamabad">Islamabad Capital Territory / اسلام آباد</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan / گلگت بلتستان</option>
                <option value="Azad Kashmir">Azad Kashmir / آزاد کشمیر</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Address <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                مستقل پتہ
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Home className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => onChange('address', e.target.value)}
                placeholder="Enter your complete address"
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.address ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
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
