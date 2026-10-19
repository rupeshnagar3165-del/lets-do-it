import React, { useState } from 'react';
import { Calculator, TrendingUp, Sparkles, QrCode, CheckCircle2, ArrowRight } from 'lucide-react';

interface ScoreCalculatorProps {
  onOpenPayment: () => void;
}

export const ScoreCalculator: React.FC<ScoreCalculatorProps> = ({ onOpenPayment }) => {
  const [currentScore, setCurrentScore] = useState<number>(44);

  // Score Booster logic
  const marksFromDerivations = Math.min(14, Math.round((70 - currentScore) * 0.45));
  const marksFromOrganicReactions = Math.min(12, Math.round((70 - currentScore) * 0.35));
  const marksFromExamTraps = Math.min(6, Math.max(2, Math.round((70 - currentScore) * 0.2)));

  const projectedScore = Math.min(70, currentScore + marksFromDerivations + marksFromOrganicReactions + marksFromExamTraps);
  const percentageJump = (((projectedScore - currentScore) / 70) * 100).toFixed(1);
  const costPerMark = (49 / (projectedScore - currentScore || 1)).toFixed(2);

  return (
    <section id="score-calculator" className="py-20 bg-dark-grid border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Score Booster Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See Exactly How Much Your Score Jumps
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Most students don't lack intelligence; they lack CBSE marking-scheme step discipline. Slide your current score below to see the transformation.
          </p>
        </div>

        {/* Interactive Calculator Box */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls: Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-200">
                    Your Current Mock / Pre-Board Theory Score:
                  </label>
                  <span className="text-xl font-extrabold text-amber-400 font-code">
                    {currentScore} <span className="text-xs text-slate-400 font-normal">/ 70</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="64"
                  value={currentScore}
                  onChange={(e) => setCurrentScore(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-code">
                  <span>25 (Passing Border)</span>
                  <span>45 (Average)</span>
                  <span>64 (Near Topper)</span>
                </div>
              </div>

              {/* Breakdown of Lost Marks Recovered */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Where TOPPERS CLUB Notes Adds Marks:
                </span>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>28 Guaranteed 5-Mark Physics Derivations</span>
                  </div>
                  <span className="font-bold text-amber-400 font-code">+{marksFromDerivations} Marks</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>35 Organic Chemistry Named Reactions</span>
                  </div>
                  <span className="font-bold text-emerald-400 font-code">+{marksFromOrganicReactions} Marks</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>60+ CBSE Examiner Trap Red Flags</span>
                  </div>
                  <span className="font-bold text-cyan-400 font-code">+{marksFromExamTraps} Marks</span>
                </div>
              </div>

            </div>

            {/* Right Display: Score Transformation Display */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-amber-500/30 text-center relative overflow-hidden shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                Projected Board Exam Result
              </div>

              {/* Before vs After Numbers */}
              <div className="my-4 flex items-center justify-center gap-3">
                <div className="text-left">
                  <div className="text-[11px] text-slate-400 uppercase">Now</div>
                  <div className="text-2xl font-bold text-slate-400 line-through decoration-rose-500 font-code">
                    {currentScore}/70
                  </div>
                </div>

                <ArrowRight className="w-6 h-6 text-amber-400" />

                <div className="text-left">
                  <div className="text-[11px] text-amber-400 uppercase font-bold">With Notes</div>
                  <div className="text-4xl font-extrabold text-white font-code flex items-baseline gap-1">
                    <span className="text-emerald-400">{projectedScore}</span>
                    <span className="text-sm text-slate-400">/70</span>
                  </div>
                </div>
              </div>

              {/* Jump Summary */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 py-2 px-3 rounded-xl text-xs text-emerald-300 font-semibold mb-4">
                +{projectedScore - currentScore} Marks Jump (+{percentageJump}% overall boost!)
              </div>

              {/* ROI statement */}
              <div className="text-xs text-slate-400 mb-5">
                Chapters from <strong className="text-white">₹14 (Physics)</strong> and <strong className="text-white">₹16 (Organic)</strong>
              </div>

              {/* CTA button */}
              <button
                onClick={onOpenPayment}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <QrCode className="w-4 h-4" />
                <span>Boost Your Score via QR</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
