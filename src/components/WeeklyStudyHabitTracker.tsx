import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  CheckCircle2, 
  Circle, 
  Flame, 
  Trophy, 
  Sparkles, 
  Clock, 
  RotateCcw,
  Award,
  Check,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DayHabit {
  id: string;
  name: string;
  shortName: string;
  completed: boolean;
  minutes: number;
}

const DEFAULT_DAYS: DayHabit[] = [
  { id: 'mon', name: 'Monday', shortName: 'Mon', completed: true, minutes: 45 },
  { id: 'tue', name: 'Tuesday', shortName: 'Tue', completed: true, minutes: 45 },
  { id: 'wed', name: 'Wednesday', shortName: 'Wed', completed: true, minutes: 60 },
  { id: 'thu', name: 'Thursday', shortName: 'Thu', completed: false, minutes: 0 },
  { id: 'fri', name: 'Friday', shortName: 'Fri', completed: false, minutes: 0 },
  { id: 'sat', name: 'Saturday', shortName: 'Sat', completed: false, minutes: 0 },
  { id: 'sun', name: 'Sunday', shortName: 'Sun', completed: false, minutes: 0 }
];

interface WeeklyStudyHabitTrackerProps {
  onOpenTimerModal?: () => void;
  continuousFocusSeconds?: number;
}

export const WeeklyStudyHabitTracker: React.FC<WeeklyStudyHabitTrackerProps> = ({ 
  onOpenTimerModal,
  continuousFocusSeconds = 0 
}) => {
  const [days, setDays] = useState<DayHabit[]>(() => {
    const saved = localStorage.getItem('topper_weekly_habits');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_DAYS;
      }
    }
    return DEFAULT_DAYS;
  });

  const completedCount = days.filter((d) => d.completed).length;
  const totalMinutes = days.reduce((sum, d) => sum + (d.completed ? (d.minutes || 45) : 0), 0);
  const consistencyPercent = Math.round((completedCount / 7) * 100);

  // Auto-check today if user has completed a 45-minute continuous focus session
  useEffect(() => {
    if (continuousFocusSeconds >= 45 * 60) {
      const todayIndex = (new Date().getDay() + 6) % 7; // 0 = Mon, 6 = Sun
      setDays((prev) => {
        if (prev[todayIndex]?.completed) return prev;
        const next = [...prev];
        next[todayIndex] = { ...next[todayIndex], completed: true, minutes: 45 };
        localStorage.setItem('topper_weekly_habits', JSON.stringify(next));
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
        return next;
      });
    }
  }, [continuousFocusSeconds]);

  const toggleDay = (index: number) => {
    setDays((prev) => {
      const next = [...prev];
      const isNowCompleted = !next[index].completed;
      next[index] = {
        ...next[index],
        completed: isNowCompleted,
        minutes: isNowCompleted ? 45 : 0
      };
      localStorage.setItem('topper_weekly_habits', JSON.stringify(next));

      if (isNowCompleted) {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 }
        });
      }

      return next;
    });
  };

  const handleResetWeek = () => {
    const reset = days.map((d) => ({ ...d, completed: false, minutes: 0 }));
    setDays(reset);
    localStorage.setItem('topper_weekly_habits', JSON.stringify(reset));
  };

  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <section id="habit-tracker" className="py-20 bg-[#06090f] border-t border-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Consistency Builder • 45-Min Habit Tracker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Weekly Study Habit Tracker
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Check off each day you complete your 45-minute focus session. Toppers aren't born; they're built 45 minutes at a time.
          </p>
        </div>

        {/* Tracker Container */}
        <div className="bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Progress Overview Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-8">
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Consistency Score
              </span>
              <div className="text-2xl font-black text-amber-300 font-mono mt-0.5">
                {consistencyPercent}% <span className="text-xs text-slate-400 font-normal">({completedCount}/7 Days)</span>
              </div>
            </div>

            <div className="text-center sm:text-left border-y sm:border-y-0 sm:border-x border-slate-800/80 py-2 sm:py-0 sm:px-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Focus This Week
              </span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                {(totalMinutes / 60).toFixed(1)} hrs <span className="text-xs text-slate-400 font-normal">({totalMinutes} mins)</span>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Habit Streak Status
              </span>
              <div className="text-2xl font-black text-white font-mono mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                <Flame className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{completedCount >= 5 ? 'On Fire! 🔥' : completedCount >= 3 ? 'Building Up ✨' : 'Kickstarting 🚀'}</span>
              </div>
            </div>
          </div>

          {/* 7 Days of the Week Interactive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
            {days.map((day, idx) => {
              const isToday = idx === todayIndex;
              return (
                <button
                  key={day.id}
                  onClick={() => toggleDay(idx)}
                  className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center justify-between min-h-[140px] cursor-pointer group ${
                    day.completed
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 shadow-md ring-1 ring-emerald-500/20'
                      : isToday
                      ? 'bg-slate-950 border-amber-400/50 text-slate-300 ring-2 ring-amber-400/20'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider block font-sans">
                      {day.shortName}
                    </span>
                    {isToday && (
                      <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold uppercase block">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Icon Check / Pending */}
                  <div className="my-2">
                    {day.completed ? (
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-amber-400/50 group-hover:text-amber-400 transition">
                        <Clock className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] font-mono">
                    {day.completed ? (
                      <span className="text-emerald-400 font-bold">45m Done</span>
                    ) : (
                      <span className="text-slate-500 group-hover:text-slate-300">Tap to check</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Actions & Quote */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              <span>💡 Tip: Complete a 45-minute focus session with our Study Timer to check off today automatically!</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleResetWeek}
                title="Reset this week's checks"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Week</span>
              </button>

              <button
                onClick={onOpenTimerModal}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Open 45-Min Focus Timer</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
