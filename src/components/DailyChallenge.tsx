import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Flame, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  HelpCircle,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: string;
  subject: 'physics' | 'chemistry';
  chapter: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTrap: string;
  pyqYear: string;
}

const QUESTION_BANK: Question[] = [
  // Physics Questions
  {
    id: 'p-1',
    subject: 'physics',
    chapter: 'Ch 01: Electric Charges & Fields',
    question: 'An electric dipole of charges +q and -q is placed inside a closed Gaussian cube. What is the net electric flux passing through the cube?',
    options: ['q / ε₀', '2q / ε₀', 'Zero', 'q / (2ε₀)'],
    correctIndex: 2,
    explanation: "By Gauss's Law, net electric flux Φ = q_enclosed / ε₀. Since a dipole consists of equal and opposite charges (+q and -q), the total enclosed charge is (+q) + (-q) = 0. Hence, flux is exactly Zero.",
    examTrap: 'Students often calculate flux due to +q alone and forget that the net enclosed dipole charge is zero.',
    pyqYear: 'CBSE 2023, 2019'
  },
  {
    id: 'p-2',
    subject: 'physics',
    chapter: 'Ch 07: Alternating Current',
    question: 'At resonant frequency in a series LCR circuit, what is the value of the circuit power factor (cos φ)?',
    options: ['0', '1.0', '0.5', 'Infinity'],
    correctIndex: 1,
    explanation: 'At resonance, inductive reactance equals capacitive reactance (XL = XC). Thus, total impedance Z = R (purely resistive). Phase angle φ = 0°, so power factor cos φ = cos(0°) = 1.0 (maximum power dissipation).',
    examTrap: 'Do not confuse resonance with wattless current! Power factor at resonance is unity (1.0), NOT zero.',
    pyqYear: 'CBSE 2024, 2020'
  },
  {
    id: 'p-3',
    subject: 'physics',
    chapter: 'Ch 08: Ray Optics',
    question: 'A convex lens of glass (μ = 1.5) having focal length f in air is immersed completely in water (μ = 1.33). Its focal length in water will:',
    options: ['Decrease to f/2', 'Remain unchanged', 'Increase to approximately 4f', 'Become negative'],
    correctIndex: 2,
    explanation: "From Lens Maker's formula, 1/f = (μ_lens/μ_medium - 1)[1/R₁ - 1/R₂]. In water, the relative refractive index drops to (1.5 / 1.33) ≈ 1.125, reducing the curvature power and causing focal length to increase to ~4 times its value in air.",
    examTrap: 'Remember: focal length depends on the surrounding medium. If immersed in a denser liquid (μ_med > μ_lens), the lens even changes nature from converging to diverging.',
    pyqYear: 'CBSE 2022, 2018'
  },
  {
    id: 'p-4',
    subject: 'physics',
    chapter: 'Ch 10: Wave Optics',
    question: 'In Young’s Double Slit Experiment, if the entire apparatus is immersed in a liquid of refractive index μ, the fringe width β:',
    options: ['Increases to μ · β', 'Decreases to β / μ', 'Remains unchanged', 'Becomes zero'],
    correctIndex: 1,
    explanation: 'Fringe width β = λD / d. In a medium of refractive index μ, the wavelength decreases to λ′ = λ / μ while slit distance d and screen distance D remain constant. Thus, the new fringe width is β′ = β / μ.',
    examTrap: 'Speed of light and wavelength shrink in a refractive medium, but frequency remains strictly constant.',
    pyqYear: 'CBSE 2023, 2017'
  },
  {
    id: 'p-5',
    subject: 'physics',
    chapter: 'Ch 11: Dual Nature of Matter',
    question: 'What does the slope of the stopping potential (V₀) versus frequency of incident radiation (ν) graph represent?',
    options: ['Work function (Φ₀)', 'Planck constant (h)', 'Ratio h / e', 'Threshold frequency (ν₀)'],
    correctIndex: 2,
    explanation: "Einstein's photoelectric equation: e·V₀ = hν - Φ₀  =>  V₀ = (h/e)ν - (Φ₀/e). Comparing with y = mx + c, the slope m = h/e, which is a universal constant independent of the target metal.",
    examTrap: 'The slope is h/e, NOT just h! The y-intercept represents -Φ₀/e, and the x-intercept is the threshold frequency ν₀.',
    pyqYear: 'CBSE 2024, 2021'
  },

  // Chemistry Questions
  {
    id: 'c-1',
    subject: 'chemistry',
    chapter: 'Ch 01: Haloalkanes & Haloarenes',
    question: 'Which substitution mechanism proceeds with 100% complete Walden inversion of configuration?',
    options: ['SN1 Mechanism', 'SN2 Mechanism', 'Electrophilic Addition', 'Free Radical Halogenation'],
    correctIndex: 1,
    explanation: 'The SN2 mechanism involves a single-step concerted backside nucleophilic attack on the sp³ carbon opposite to the leaving group, causing an umbrella-like flip known as Walden Inversion.',
    examTrap: 'SN1 gives partial racemisation (retention + inversion) via a planar carbocation intermediate, whereas SN2 gives 100% inversion.',
    pyqYear: 'CBSE 2024, 2022'
  },
  {
    id: 'c-2',
    subject: 'chemistry',
    chapter: 'Ch 02: Aldehydes & Ketones',
    question: 'Which of the following carbonyl compounds will NOT undergo Aldol Condensation with dilute NaOH?',
    options: ['Ethanal (CH₃CHO)', 'Propanone (CH₃COCH₃)', 'Benzaldehyde (C₆H₅CHO)', 'Propanal (CH₃CH₂CHO)'],
    correctIndex: 2,
    explanation: 'Aldol condensation requires at least one α-hydrogen atom to form the nucleophilic enolate ion. Benzaldehyde (C₆H₅CHO) has NO α-hydrogen and instead undergoes the Cannizzaro disproportionation reaction with concentrated alkali.',
    examTrap: 'Be careful: Benzaldehyde can participate in Cross-Aldol if paired with another compound having α-H (like acetone), but CANNOT self-condense.',
    pyqYear: 'CBSE 2023, 2019'
  },
  {
    id: 'c-3',
    subject: 'chemistry',
    chapter: 'Ch 03: Amines',
    question: 'What is the correct order of basic strength of methyl-substituted amines in aqueous medium?',
    options: [
      '(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃',
      '(CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃',
      'CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N > NH₃',
      'NH₃ > CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N'
    ],
    correctIndex: 0,
    explanation: 'In aqueous medium, basicity is determined by a combination of +I inductive effect, hydration stabilization of the conjugate cation, and steric hindrance. For methyl group, the order is 2° > 1° > 3° > NH₃ (Memory code: 213). For ethyl group, it is 231.',
    examTrap: 'In the gas phase, basicity is pure inductive effect: 3° > 2° > 1° > NH₃. But in aqueous solution, hydration makes 2° the strongest!',
    pyqYear: 'CBSE 2024, 2021'
  },
  {
    id: 'c-4',
    subject: 'chemistry',
    chapter: 'Ch 04: Alcohols, Phenols & Ethers',
    question: 'In the Reimer-Tiemann reaction of phenol with chloroform (CHCl₃) and NaOH, the attacking electrophile is:',
    options: ['Carbonium ion (CH₃⁺)', 'Dichlorocarbene (:CCl₂)', 'Trichloromethyl anion (CCl₃⁻)', 'Formyl cation (CHO⁺)'],
    correctIndex: 1,
    explanation: 'In basic medium, chloroform loses a proton and chloride ion to produce neutral dichlorocarbene (:CCl₂), a divalent carbon species with 6 valence electrons that acts as an active electrophile attacking the phenoxide ring.',
    examTrap: 'Dichlorocarbene is an electrically neutral electrophile (not charged). CBSE specifically checks for the two lone dots (:CCl₂).',
    pyqYear: 'CBSE 2023, 2020'
  },
  {
    id: 'c-5',
    subject: 'chemistry',
    chapter: 'Ch 05: Biomolecules',
    question: 'During denaturation of proteins caused by physical or chemical changes, which structure remains completely intact?',
    options: ['Quaternary structure', 'Tertiary structure', 'Secondary structure', 'Primary structure'],
    correctIndex: 3,
    explanation: 'Denaturation breaks weaker hydrogen bonds and hydrophobic interactions holding the secondary (α-helix, β-pleated) and tertiary folded structures, while covalent peptide bonds holding the linear amino acid sequence (Primary structure) remain intact.',
    examTrap: 'Common examples: boiling of egg (coagulation of albumin) and curdling of milk are irreversible denaturations where primary sequence survives.',
    pyqYear: 'CBSE 2022, 2018'
  }
];

interface DailyChallengeProps {
  onOpenPayment?: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({ onOpenPayment }) => {
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'physics' | 'chemistry'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Streak count saved in localStorage
  const [dailyStreak, setDailyStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem('topper_daily_streak') || '3', 10);
  });
  
  const [totalAnswered, setTotalAnswered] = useState<number>(() => {
    return parseInt(localStorage.getItem('topper_total_answered') || '12', 10);
  });

  const filteredQuestions = QUESTION_BANK.filter(
    (q) => selectedSubject === 'all' || q.subject === selectedSubject
  );

  const currentQ = filteredQuestions[currentIndex % filteredQuestions.length];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 }
      });
      const nextStreak = dailyStreak + 1;
      setDailyStreak(nextStreak);
      localStorage.setItem('topper_daily_streak', nextStreak.toString());
    }

    const nextTotal = totalAnswered + 1;
    setTotalAnswered(nextTotal);
    localStorage.setItem('topper_total_answered', nextTotal.toString());
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  return (
    <section id="daily-challenge" className="py-20 bg-[#080c14] border-t border-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Daily Board &amp; Entrance PYQ Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Test Your Concept Recall in 60 Seconds
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            One high-yield question daily with step-by-step toppers explanation and common examiner traps.
          </p>

          {/* Subject Filter & Streak Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
            <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl">
              <button
                onClick={() => {
                  setSelectedSubject('all');
                  setCurrentIndex(0);
                  setIsAnswered(false);
                  setSelectedOption(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedSubject === 'all'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Subjects
              </button>
              <button
                onClick={() => {
                  setSelectedSubject('physics');
                  setCurrentIndex(0);
                  setIsAnswered(false);
                  setSelectedOption(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  selectedSubject === 'physics'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>⚡ Physics</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSubject('chemistry');
                  setCurrentIndex(0);
                  setIsAnswered(false);
                  setSelectedOption(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  selectedSubject === 'chemistry'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🧪 Chemistry</span>
              </button>
            </div>

            {/* Streak & Accuracy badge */}
            <div className="flex items-center gap-3 px-3 py-1 text-xs">
              <span className="flex items-center gap-1 font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{dailyStreak} Day Streak!</span>
              </span>
              <span className="text-slate-400 hidden sm:inline text-[11px]">
                {totalAnswered} questions solved
              </span>
            </div>
          </div>
        </div>

        {/* Challenge Interactive Card */}
        <div className="bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Question Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                  currentQ.subject === 'physics'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {currentQ.chapter}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentQ.pyqYear}
              </span>
            </div>

            <span className="text-xs font-code font-bold text-slate-400">
              Q{currentIndex + 1} of {filteredQuestions.length}
            </span>
          </div>

          {/* Question Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-6">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnClass = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-800/60';
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold ring-1 ring-emerald-400';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold';
                } else {
                  btnClass = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-medium">{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Topper Explanation Box (Appears immediately on answer) */}
          {isAnswered && (
            <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
              
              {/* Result Pill */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Bullseye! Correct Answer. Streak maintained!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Oops! Correct answer was Option {String.fromCharCode(65 + currentQ.correctIndex)}.</span>
                    </>
                  )}
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step by step concept explanation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Toppers Explanation &amp; Working:</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>

              {/* CBSE Examiner Trap callout */}
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>CBSE Exam Trap to Watch Out For:</span>
                </span>
                <p className="text-xs text-rose-200 leading-relaxed">
                  {currentQ.examTrap}
                </p>
              </div>

            </div>
          )}

          {/* Action Footer */}
          {!isAnswered && (
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span>Select an option to view instant solution and step-by-step scoring tricks.</span>
              <button
                onClick={handleNextQuestion}
                className="text-amber-400 hover:text-white underline font-semibold cursor-pointer"
              >
                Skip Question &rarr;
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
