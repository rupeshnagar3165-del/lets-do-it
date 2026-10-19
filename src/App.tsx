import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveScrollBanner } from './components/InteractiveScrollBanner';
import { NotebookPreview } from './components/NotebookPreview';
import { ChapterDirectory } from './components/ChapterDirectory';
import { ReactionExplorer } from './components/ReactionExplorer';
import { ScoreCalculator } from './components/ScoreCalculator';
import { PaymentSection } from './components/PaymentSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { FocusTimerModal } from './components/FocusTimerModal';
import { LineArcheryGame } from './components/LineArcheryGame';
import { DailyChallenge } from './components/DailyChallenge';
import { WeeklyStudyHabitTracker } from './components/WeeklyStudyHabitTracker';
import { ToppersLeaderboard } from './components/ToppersLeaderboard';
import { Chapter } from './types';
import { QrCode, ArrowUp, Clock, Target, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentChapter, setSelectedPaymentChapter] = useState<Chapter | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Focus Timer System: Editable up to 5 hours (300 mins) + 45-min unpaused MSN Archery trigger
  const [totalDurationMinutes, setTotalDurationMinutes] = useState<number>(45);
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [continuousFocusSeconds, setContinuousFocusSeconds] = useState<number>(0);
  const [isFocusTimerOpen, setIsFocusTimerOpen] = useState<boolean>(false);
  const [isArcheryOpen, setIsArcheryOpen] = useState<boolean>(false);

  // Scroll listener for back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timer Tick & Continuous Unpaused Focus Tracker
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });

        setContinuousFocusSeconds((prev) => {
          const next = prev + 1;
          // Every 45 minutes (2700 seconds) without focus time paused:
          if (next >= 45 * 60) {
            // Automatically pause focus timer and trigger interactive MSN Line Archery game
            setTimerActive(false);
            setIsArcheryOpen(true);
            confetti({
              particleCount: 90,
              spread: 70,
              origin: { y: 0.5 }
            });
            return 0; // Reset continuous streak for next 45-min cycle
          }
          return next;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleToggleTimer = () => {
    if (!timerActive) {
      if (timeLeft === 0) {
        setTimeLeft(totalDurationMinutes * 60);
      }
      setTimerActive(true);
    } else {
      // User paused the timer: reset unpaused continuous focus streak
      setTimerActive(false);
      setContinuousFocusSeconds(0);
    }
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    setTimeLeft(totalDurationMinutes * 60);
    setContinuousFocusSeconds(0);
  };

  const handleSetDuration = (newMinutes: number) => {
    setTotalDurationMinutes(newMinutes);
    setTimeLeft(newMinutes * 60);
    setTimerActive(false);
    setContinuousFocusSeconds(0);
  };

  const handleResumeAfterArchery = () => {
    setIsArcheryOpen(false);
    if (timeLeft === 0) {
      setTimeLeft(totalDurationMinutes * 60);
    }
    setTimerActive(true);
    setContinuousFocusSeconds(0);
  };

  const handleOpenPayment = (chapter?: Chapter) => {
    if (chapter) {
      setSelectedPaymentChapter(chapter);
    }
    setIsPaymentModalOpen(true);
  };

  const handleScrollToNotebook = () => {
    const el = document.getElementById('notebook-preview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTimerShort = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (hrs > 0) {
      return `${hrs}h ${m.toString().padStart(2, '0')}m`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-amber-400/30 selection:text-amber-200 pb-16 sm:pb-8">
      
      {/* Sticky Navigation */}
      <Navbar
        onOpenPayment={() => handleOpenPayment()}
        onOpenNotebook={handleScrollToNotebook}
        timerActive={timerActive}
        timeLeft={timeLeft}
        onOpenTimerModal={() => setIsFocusTimerOpen(true)}
        onToggleTimer={handleToggleTimer}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          onOpenPayment={() => handleOpenPayment()}
          onOpenNotebook={handleScrollToNotebook}
        />

        {/* Dynamic Moving Ticker Ribbon on Scroll */}
        <InteractiveScrollBanner />

        {/* Daily Challenge Component: Quick High-Yield CBSE Question */}
        <DailyChallenge onOpenPayment={() => handleOpenPayment()} />

        {/* Interactive Notebook Preview Section */}
        <NotebookPreview
          onOpenPayment={handleOpenPayment}
        />

        {/* Complete Syllabus & Chapter Breakdown with PYQs */}
        <ChapterDirectory
          onOpenPayment={handleOpenPayment}
        />

        {/* Interactive 35 Name Reactions & Derivations Hub */}
        <ReactionExplorer
          onOpenPayment={() => handleOpenPayment()}
        />

        {/* Weekly Study Habit Tracker: 45-min focus sessions */}
        <WeeklyStudyHabitTracker
          onOpenTimerModal={() => setIsFocusTimerOpen(true)}
          continuousFocusSeconds={continuousFocusSeconds}
        />

        {/* Toppers Leaderboard: Top study streaks and total focus time */}
        <ToppersLeaderboard
          onOpenTimerModal={() => setIsFocusTimerOpen(true)}
          userFocusMinutes={Math.floor((totalDurationMinutes * 60 - timeLeft) / 60) + 45}
        />

        {/* Interactive Score Booster Calculator */}
        <ScoreCalculator
          onOpenPayment={() => handleOpenPayment()}
        />

        {/* Payment Section (Personal UPI QR Code with Name, DOB & Captcha) */}
        <PaymentSection />

        {/* Real Student Testimonials & Score Transformations */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FaqSection
          onOpenPayment={() => handleOpenPayment()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPayment={() => handleOpenPayment()}
      />

      {/* Modal Popup for Quick QR Payment from any button */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        initialChapter={selectedPaymentChapter}
      />

      {/* Focus Timer Modal (Editable up to 5 hours) */}
      <FocusTimerModal
        isOpen={isFocusTimerOpen}
        onClose={() => setIsFocusTimerOpen(false)}
        timeLeft={timeLeft}
        timerActive={timerActive}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        onSetDuration={handleSetDuration}
        totalDurationMinutes={totalDurationMinutes}
        continuousFocusSeconds={continuousFocusSeconds}
        onTriggerFreshenUp={() => {
          setIsFocusTimerOpen(false);
          setIsArcheryOpen(true);
        }}
      />

      {/* 45-Min Continuous Focus Interactive MSN Line Archery Modal */}
      {isArcheryOpen && (
        <LineArcheryGame
          onClose={() => setIsArcheryOpen(false)}
          onResumeFocus={handleResumeAfterArchery}
        />
      )}

      {/* Floating Bottom Quick Action Dock on Mobile / Desktop (Anti-overlap) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 max-w-[calc(100vw-1.5rem)] flex-wrap justify-end">
        {/* Floating Focus Timer Widget (Quick Access) */}
        <button
          onClick={() => setIsFocusTimerOpen(true)}
          title="Open Focus Timer & MSN Line Archery"
          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-full border shadow-xl backdrop-blur-md transition-all cursor-pointer hover:scale-105 text-xs font-bold shrink-0 ${
            timerActive
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-amber-400/25 ring-2 ring-amber-400/30'
              : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <Clock className={`w-3.5 h-3.5 ${timerActive ? 'animate-spin' : 'text-amber-400'}`} />
          <span className="font-code font-black">{formatTimerShort(timeLeft)}</span>
          {continuousFocusSeconds > 0 && timerActive && (
            <span className="text-[10px] bg-slate-950/80 text-amber-300 px-1.5 py-0.2 rounded-full hidden sm:inline-flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5 fill-amber-300" />
              {Math.floor(continuousFocusSeconds / 60)}m/45m
            </span>
          )}
        </button>

        {showBackToTop && (
          <button
            onClick={handleScrollToTop}
            title="Back to Top"
            className="p-2.5 sm:p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-xl backdrop-blur-sm transition-all cursor-pointer hover:scale-105 shrink-0"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => handleOpenPayment()}
          className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300 shrink-0"
        >
          <QrCode className="w-4 h-4 text-slate-950" />
          <span className="hidden xs:inline">Download Notes via QR</span>
          <span className="xs:hidden">Get Notes</span>
        </button>
      </div>

      {/* Vercel Web Analytics */}
      <Analytics />

    </div>
  );
}
