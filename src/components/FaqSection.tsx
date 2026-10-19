import React, { useState } from 'react';
import { HelpCircle, ChevronDown, QrCode } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Can I download individual chapters separately?',
    a: 'YES! Every chapter has its own separate download option: ₹14 for Physics chapters and ₹16 for Chemistry chapters. If you only need Chapter 1 (Electric Charges) or Haloalkanes for your test, simply select that chapter and pay via QR. You never have to pay for chapters you already know!'
  },
  {
    q: 'Why is payment ONLY through your own UPI QR Code?',
    a: 'Payment gateways charge extra convenience fees and require OTP logins that waste study time. With our personal UPI QR Code, you scan and transfer directly via GPay / PhonePe / Paytm / BHIM without any middlemen or extra platform charges.'
  },
  {
    q: 'How fast do I get the PDF after scanning the QR code?',
    a: 'Instantly! Once you complete the payment on your UPI app, simply enter your full name, date of birth (DOB), and solve the quick anti-robot captcha. Your browser immediately generates and downloads your verified notes PDF.'
  },
  {
    q: 'Can I print these notes for physical study?',
    a: 'Absolutely. The PDF is crafted in standard high-resolution A4 portrait layout with ruled lines, clear handwritten fonts, and margins specifically designed for spiral binding or sticking on study walls.'
  },
  {
    q: 'Will this help if I have only 15-30 days left before exams?',
    a: 'This is EXACTLY who these notes are built for. Instead of getting overwhelmed by 800 pages of NCERT, our notes distill the exact 5-mark derivations and high-weightage reaction questions that CBSE examiners ask year after year.'
  },
  {
    q: 'Are all derivations written in CBSE step-by-step format?',
    a: 'Yes. Every derivation includes: (1) Initial statement & diagram with vector arrows, (2) Mathematical proof steps, (3) Final highlighted boxed formula, and (4) Special limiting cases (e.g. r >> a) required by the CBSE marking scheme for full marks.'
  }
];

interface FaqSectionProps {
  onOpenPayment: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenPayment }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-[#070b11] border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Everything you need to know about TOPPERS CLUB notes, QR code verification, and instant download.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final CTA Box */}
        <div className="mt-14 text-center p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-emerald-500/15 border border-amber-500/30">
          <h3 className="text-2xl font-bold text-white">
            Ace Your Class 12 Exams Affordably
          </h3>
          <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto">
            Handwritten notes with CBSE step-by-step derivations &amp; exam trap warnings. Available from ₹14 for Physics and ₹16 for Organic Chemistry.
          </p>
          <button
            onClick={onOpenPayment}
            className="mt-6 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 cursor-pointer transition hover:scale-[1.02]"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR Code &amp; Download Notes</span>
          </button>
        </div>

      </div>
    </section>
  );
};
