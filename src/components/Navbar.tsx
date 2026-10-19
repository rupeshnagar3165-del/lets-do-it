import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, QrCode, Download, Clock, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenPayment: () => void;
  onOpenNotebook: () => void;
  timerActive: boolean;
  timeLeft: number;
  onOpenTimerModal: () => void;
  onToggleTimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPayment,
  onOpenNotebook,
  timerActive,
  timeLeft,
  onOpenTimerModal,
  onToggleTimer
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Scroll Progress Bar at the absolute top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Catchy Top Notice Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-emerald-500/10 border-b border-amber-500/20 text-xs py-2 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Class 12 Board Exam Mission 2024-2026:
          </span>
          <span className="text-slate-300">
            Ace your exams affordably! Handcrafted Class 12 Chapter Notes:{' '}
            <strong className="text-amber-300 font-bold bg-amber-400/20 px-1.5 py-0.5 rounded">Physics ₹14</strong> /{' '}
            <strong className="text-emerald-300 font-bold bg-emerald-400/20 px-1.5 py-0.5 rounded">Chemistry ₹16</strong>
          </span>
          <span className="text-slate-500 hidden sm:inline">·</span>
          <span className="text-emerald-400 font-medium text-[11px] hidden md:inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> 100% NCERT & CBSE Marking Scheme Aligned
          </span>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800 shadow-xl'
            : 'bg-[#0b0f17]/80 backdrop-blur-sm border-b border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  TOPPERS CLUB
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                  Class 12
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 font-medium">Ace your exams affordably</p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-300">
            <a href="#daily-challenge" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <span>Daily Challenge</span>
            </a>
            <a href="#notebook-preview" className="hover:text-amber-400 transition-colors">
              Peek Notes
            </a>
            <a href="#syllabus" className="hover:text-amber-400 transition-colors">
              Chapters &amp; Derivations
            </a>
            <a href="#reactions-hub" className="hover:text-amber-400 transition-colors">
              35 Reactions
            </a>
            <a href="#habit-tracker" className="hover:text-amber-400 transition-colors">
              Habits
            </a>
            <a href="#leaderboard" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-300 font-semibold">
              <span>Leaderboard</span>
            </a>
            <a href="#payment-qr" className="hover:text-amber-400 transition-colors text-emerald-400 font-semibold">
              Scan QR &amp; Pay
            </a>
          </nav>

          {/* Action Area: Pomodoro + CTA */}
          <div className="flex items-center gap-3">
            {/* Study Mode Focus Timer Pill (Editable up to 5 hours + 45-min MSN Line Archery break) */}
            <button
              onClick={onOpenTimerModal}
              title="Study Focus Timer (Editable up to 5 Hours • 45-min MSN Line Archery Break)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-900/90 hover:border-amber-400/50 text-slate-200 transition-all cursor-pointer group shadow-sm"
            >
              <Clock className={`w-3.5 h-3.5 ${timerActive ? 'text-amber-400 animate-spin' : 'text-slate-400 group-hover:text-amber-300'}`} />
              <span className="font-code font-bold text-amber-300">{formatTimer(timeLeft)}</span>
              <span className="text-[10px] text-slate-400 hidden xs:inline">{timerActive ? 'Studying' : 'Set Timer'}</span>
            </button>

            {/* Main Action Button */}
            <button
              onClick={onOpenPayment}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-slate-950" />
              <span>Get Notes via QR</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
