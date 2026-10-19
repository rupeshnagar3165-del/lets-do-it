import React from 'react';
import { Sparkles, CheckCircle2, Zap, Award, Flame } from 'lucide-react';

export const InteractiveScrollBanner: React.FC = () => {
  const items = [
    { text: 'Ace your exams affordably', icon: Flame, color: 'text-amber-400' },
    { text: 'Physics: ₹14 / Chapter', icon: Zap, color: 'text-amber-400' },
    { text: 'Chemistry: ₹16 / Chapter', icon: Zap, color: 'text-emerald-400' },
    { text: 'Separate Download Option for Every Chapter', icon: CheckCircle2, color: 'text-cyan-400' },
    { text: 'Personal UPI QR Code Payment', icon: Flame, color: 'text-rose-400' },
    { text: '28 Essential 5-Mark Physics Derivations', icon: Sparkles, color: 'text-purple-400' },
    { text: 'Topper Notes with CBSE Exam Trap Warnings', icon: Award, color: 'text-emerald-400' },
  ];

  return (
    <div className="relative overflow-hidden py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800/80">
      <div className="flex select-none">
        {/* Double row for infinite seamless scroll */}
        <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-8 items-center pr-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-300 uppercase whitespace-nowrap">
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span>{item.text}</span>
                <span className="text-slate-600 font-bold ml-2">/</span>
              </div>
            );
          })}
        </div>
        <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-8 items-center pr-8" aria-hidden="true">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`dup-${idx}`} className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-300 uppercase whitespace-nowrap">
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span>{item.text}</span>
                <span className="text-slate-600 font-bold ml-2">/</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
