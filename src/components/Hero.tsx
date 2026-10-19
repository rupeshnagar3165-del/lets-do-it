import React from 'react';
import { QrCode, BookOpen, ArrowDown, CheckCircle, ShieldCheck, Sparkles, Star, FileText } from 'lucide-react';

interface HeroProps {
  onOpenPayment: () => void;
  onOpenNotebook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPayment, onOpenNotebook }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 bg-dark-grid">
      {/* Background ambient lighting effects for student study desk vibe */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: High-Impact Marketing Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Student Credibility Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>CRAFTED BY A 98.6% CLASS 12 BOARD & JEE TOPPER</span>
            </div>

            {/* Main Headline with Catchy Slogan */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              <span className="block text-slate-100">Ace your exams</span>
              <span className="block bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                affordably.
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-300 mt-2 font-serif-topper italic">
                Class 12 Physics & Organic Chemistry Topper Notes
              </span>
            </h1>

            {/* Empathetic & Convincing Pitch */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I am in Class 12 and spent hundreds of hours preparing the cleanest handwritten notes for Physics and Organic Chemistry. Designed for CBSE Board exams and competitive revision with complete derivations, reactions, and exam trap alerts. Download exactly what you need: Physics chapters at <strong className="text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">₹15 each</strong> and Organic Chemistry chapters at <strong className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">₹16 each</strong>, or save with our 3 Master Vault bundles (₹119 Physics, ₹49 Chemistry, ₹169 Full Combo).
            </p>

            {/* Core Value Highlights (Clean Unboxed List) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto lg:mx-0 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Class 12 Physics:</strong> 8 Core Chapters with Gauss Law, AC, EMI, Ray Optics (₹15/Ch)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Class 12 Chemistry:</strong> Haloalkanes, Aldehydes, Amines, Phenols &amp; Biomolecules (₹16/Ch)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">CBSE Exam Trap Warnings:</strong> 60+ red flags where examiners deduct marks</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Separate Chapter Download:</strong> Instant PDF access via personal UPI QR code</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenPayment}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <QrCode className="w-5 h-5 text-slate-950 group-hover:rotate-6 transition-transform" />
                <span>Download Chapter Notes via QR</span>
              </button>

              <button
                onClick={onOpenNotebook}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-base border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white hover:border-amber-500/50 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Peek Inside Sample Notes</span>
              </button>
            </div>

            {/* Trust and Social Proof Badges */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-slate-300">4.9/5</span>
                <span>(8,420+ Class 12 Students)</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant UPI QR Verification</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Realistic Handwritten Notebook Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glowing aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000" />

              {/* The Topper Spiral Notebook Card */}
              <div className="relative rounded-2xl bg-[#fbfbf8] text-slate-900 shadow-2xl border-4 border-slate-800 overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                
                {/* Spiral Ring Binding Graphic on Left */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-200/90 border-r border-slate-300 flex flex-col justify-around items-center py-4 z-20">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-4 h-2.5 rounded-full bg-slate-800 border border-slate-400 shadow-inner -ml-1.5" />
                  ))}
                </div>

                {/* Notebook Paper Content */}
                <div className="pl-11 pr-5 py-5 bg-notebook-ruled min-h-[460px] flex flex-col justify-between">
                  
                  {/* Notebook Header */}
                  <div>
                    <div className="flex items-center justify-between border-b-2 border-red-400 pb-2 mb-3">
                      <div>
                        <span className="font-code text-[11px] text-red-600 font-bold uppercase tracking-widest">
                          CLASS 12 TOPPER'S MASTER NOTEBOOK
                        </span>
                        <h3 className="font-serif-topper font-bold text-lg text-slate-900 leading-tight">
                          Physics & Organic Chemistry (2024-2026)
                        </h3>
                      </div>
                      <span className="font-code text-xs bg-amber-200 border border-amber-300 px-2 py-0.5 rounded font-bold text-amber-900">
                        ₹15 / ₹16 Pass
                      </span>
                    </div>

                    {/* Handwritten Style Excerpt */}
                    <div className="space-y-3 font-handwriting text-slate-900 text-lg leading-snug">
                      <div className="p-2.5 rounded bg-amber-100/70 border border-amber-300">
                        <p className="font-bold text-amber-950 text-base font-sans flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                          Derivation Gold: Lens Maker's Formula
                        </p>
                        <p className="text-slate-800 text-xl mt-1">
                          1/f = (μ₂/μ₁ - 1) [ 1/R₁ - 1/R₂ ]
                        </p>
                        <p className="text-xs font-sans text-slate-600 mt-0.5">
                          ⭐ Repeated 6 times in CBSE Boards (5 Marks guarantee)
                        </p>
                      </div>

                      <div className="p-2.5 rounded bg-emerald-50 border border-emerald-300">
                        <p className="font-bold text-emerald-950 text-base font-sans flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                          Organic Chemistry Shortcut: SN1 vs SN2
                        </p>
                        <p className="text-slate-800 text-xl mt-1">
                          SN2 = 1° &gt; 2° &gt; 3° (Walden Inversion Umbrella)
                        </p>
                        <p className="text-xs font-sans text-slate-600 mt-0.5">
                          SN1 = 3° &gt; 2° &gt; 1° (Carbocation Intermediate + Racemic)
                        </p>
                      </div>

                      <div className="p-2.5 rounded bg-rose-50 border border-rose-300">
                        <p className="font-bold text-rose-900 text-xs font-sans uppercase tracking-wide flex items-center gap-1">
                          ⚠️ CBSE Examiner Trap:
                        </p>
                        <p className="text-sm font-sans text-rose-950 font-medium">
                          "Never forget ray arrows in telescope diagrams! Without arrows, marks are deducted."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notebook Footer Sticker */}
                  <div className="pt-3 border-t border-slate-300 flex items-center justify-between text-xs">
                    <span className="font-sans font-medium text-slate-600">
                      220+ Pages • Instant PDF Vault
                    </span>
                    <button
                      onClick={onOpenNotebook}
                      className="font-sans font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                    >
                      Flip all pages &rarr;
                    </button>
                  </div>

                </div>

              </div>

              {/* Floating Value Sticker Callout */}
              <div className="absolute -bottom-5 -right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-xl border-2 border-amber-300 flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform">
                <FileText className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-[10px] uppercase leading-tight font-extrabold tracking-wider">Physics ₹15 • Chemistry ₹16</div>
                  <div className="text-xs font-black">Scan QR &amp; Download PDF</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator Prompt */}
        <div className="mt-16 text-center">
          <a
            href="#notebook-preview"
            className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors group"
          >
            <span className="text-xs font-medium tracking-wide uppercase">Scroll to inspect notes &amp; chapters</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-amber-400 group-hover:text-amber-300" />
          </a>
        </div>

      </div>
    </section>
  );
};
