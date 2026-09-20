import React, { useState, useRef } from 'react';
import { Landmark, User, CreditCard, Receipt, Coins, UploadCloud, Clock, Send, ArrowLeft, Check, Copy } from 'lucide-react';
import { FormData } from '../types';

interface Step3PaymentProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const Step3Payment: React.FC<Step3PaymentProps> = ({
  formData,
  onChange,
  onSubmit,
  onBack,
  isSubmitting = false,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyNumber = () => {
    navigator.clipboard.writeText('03032782757');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileSelect = (file: File) => {
    if (file) {
      onChange('screenshotFile', file);
      const url = URL.createObjectURL(file);
      onChange('screenshotPreviewUrl', url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account Number is required';
    if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';
    if (!formData.loanAmount.trim()) newErrors.loanAmount = 'Loan Amount is required';
    if (!formData.screenshotFile && !formData.screenshotPreviewUrl) {
      newErrors.screenshot = 'Please upload your EasyPaisa payment screenshot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
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
                Loan Application Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Apni loan application submit karein.
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-urdu text-xl sm:text-2xl font-bold text-[#093529]">
              قرض کی درخواست
            </div>
            <div className="font-urdu text-xs sm:text-sm text-slate-500">
              فیس ادائیگی
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                placeholder="Enter Your Full Name"
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.fullName ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
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
                placeholder="Enter Your Account Number"
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.accountNumber ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.accountNumber && <p className="text-xs text-red-500 mt-1">{errors.accountNumber}</p>}
          </div>

          {/* Transaction ID */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                ٹرانزیکشن آئی ڈی
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Receipt className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="text"
                value={formData.transactionId}
                onChange={(e) => onChange('transactionId', e.target.value)}
                placeholder="Enter Transaction ID"
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.transactionId ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.transactionId && <p className="text-xs text-red-500 mt-1">{errors.transactionId}</p>}
          </div>

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
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800">
                <Coins className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                type="text"
                value={formData.loanAmount}
                onChange={(e) => onChange('loanAmount', e.target.value)}
                placeholder="Enter Loan Amount (PKR)"
                className={`w-full pl-11 pr-4 py-3 bg-[#f2faf6] border ${
                  errors.loanAmount ? 'border-red-400' : 'border-emerald-200'
                } rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base`}
              />
            </div>
            {errors.loanAmount && <p className="text-xs text-red-500 mt-1">{errors.loanAmount}</p>}
          </div>

          {/* Fee Summary Box */}
          <div className="bg-[#f0fbf6] border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#084835] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                Rs
              </div>
              <div>
                <span className="text-xs font-bold text-[#093529] block mb-1">Form Fee</span>
                <span className="inline-block bg-[#084835] text-white font-bold text-xs sm:text-sm px-3 py-1 rounded-full">
                  150 PKR
                </span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-emerald-200 mx-2" />
            <div className="text-right">
              <div className="text-xs text-slate-500 font-semibold">Total Amount</div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-[#093529] leading-tight">
                150 PKR
              </div>
              <div className="font-urdu text-[11px] text-slate-500 mt-0.5">
                کل رقم / 150 روپے
              </div>
            </div>
          </div>

          {/* EasyPaisa Payment Box */}
          <div className="border border-emerald-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header bar */}
            <div className="bg-[#084835] text-white py-2 px-4 text-xs sm:text-sm font-bold tracking-wide">
              Payment Details (EasyPaisa)
            </div>

            {/* Account Details */}
            <div className="bg-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* EasyPaisa Icon Symbol */}
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-2xl shadow-sm">
                  <span className="lowercase font-sans -mt-1">e</span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    EasyPaisa
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#093529] tracking-tight">
                    03032782757
                  </div>
                  <div className="text-sm font-semibold text-slate-600">
                    Bilal Hussain
                  </div>
                </div>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={copyNumber}
                className="px-3 py-1.5 rounded-lg border border-emerald-300 text-xs font-bold text-[#084835] hover:bg-[#daf1e7] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Yellow Warning Box */}
          <div className="bg-[#fffbeb] border border-amber-200 rounded-2xl p-4 text-slate-800 text-xs sm:text-sm flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
              !
            </div>
            <div className="space-y-1">
              <div className="inline-block bg-amber-300/80 text-slate-900 px-2.5 py-0.5 rounded-md font-bold text-xs">
                Payment Karne Ka Tarika:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-700 pt-1 font-medium leading-relaxed">
                <li>150 PKR form fee + 150 PKR total amount is number par EasyPaisa karein.</li>
                <li>Payment karne ke baad uska screenshot yahan upload karein.</li>
                <li>Apna form submit karein.</li>
              </ol>
            </div>
          </div>

          {/* Payment Screenshot Upload */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#093529]">
                Payment Screenshot Upload <span className="text-red-500">*</span>
              </label>
              <span className="font-urdu text-xs sm:text-sm font-semibold text-[#093529]">
                تصدیقی سکرین شاٹ
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`w-full border-2 border-dashed ${
                errors.screenshot ? 'border-red-400 bg-red-50/30' : 'border-emerald-300 bg-[#f4fcf8]'
              } rounded-2xl p-6 text-center cursor-pointer hover:bg-[#eaf8f1] transition-colors`}
            >
              {formData.screenshotPreviewUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-emerald-300 shadow-sm">
                    <img
                      src={formData.screenshotPreviewUrl}
                      alt="Payment Receipt Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-emerald-800">
                    {formData.screenshotFile?.name || 'Screenshot Selected'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Click or drag new image to replace
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud className="w-10 h-10 text-emerald-700 stroke-[1.5] mb-2" />
                  <div className="text-sm font-bold text-[#093529]">
                    Choose File <span className="font-normal text-slate-500">or drag and drop</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Upload EasyPaisa payment screenshot (JPG, PNG)
                  </div>
                </div>
              )}
            </div>
            {errors.screenshot && (
              <p className="text-xs text-red-500 mt-1">{errors.screenshot}</p>
            )}
          </div>

          {/* Green 48-Hour Processing Notice */}
          <div className="bg-[#daf1e7] border border-emerald-300/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-right">
            <div className="w-8 h-8 rounded-full bg-white text-[#084835] flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 stroke-[2]" />
            </div>
            <p className="font-urdu text-xs sm:text-sm text-[#094d38] font-medium leading-relaxed">
              48 گھنٹے کے اندر تصدیقی پیغام موصول ہوگا۔
            </p>
          </div>

          {/* Buttons Navigation */}
          <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-[#daf1e7] hover:bg-[#cbf0e1] text-[#084835] font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back / واپس</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-[#084835] hover:bg-[#063e2c] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer transition-all disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 fill-white -rotate-12" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
