import React, { useState } from 'react';
import { Sparkles, Beaker, Zap, QrCode, Search, Check, Copy, BookOpen } from 'lucide-react';

interface ReactionItem {
  id: string;
  name: string;
  category: 'Physics' | 'Chemistry';
  equation: string;
  reagents: string;
  topperTrick: string;
  cbeTrap: string;
}

const HIGH_YIELD_REACTIONS: ReactionItem[] = [
  // Chemistry High-Yield
  {
    id: 'chem-r1',
    name: 'Aldol Condensation',
    category: 'Chemistry',
    equation: '2 CH₃CHO  --[dil. NaOH]-->  CH₃-CH(OH)-CH₂-CHO  --[Δ]-->  CH₃-CH=CH-CHO + H₂O',
    reagents: 'Dilute NaOH / Ba(OH)₂ + Warm (Δ)',
    topperTrick: 'Requires at least ONE α-hydrogen! If NO α-hydrogen, it undergoes Cannizzaro instead.',
    cbeTrap: 'Cross-aldol between two different aldehydes with α-H gives a mixture of FOUR products! Always mention this in 3-mark questions.'
  },
  {
    id: 'chem-r2',
    name: 'Cannizzaro Reaction',
    category: 'Chemistry',
    equation: '2 HCHO  --[50% conc. NaOH]-->  CH₃OH (Methanol) + HCOONa (Sodium Formate)',
    reagents: 'Concentrated (50%) NaOH or KOH',
    topperTrick: 'It is a self-redox (disproportionation) reaction: 1 molecule is REDUCED to alcohol, 1 is OXIDIZED to carboxylate salt.',
    cbeTrap: 'Substrates MUST have NO α-hydrogen (HCHO, Benzaldehyde, Trimethylacetaldehyde).'
  },
  {
    id: 'chem-r3',
    name: "Kolbe's Reaction",
    category: 'Chemistry',
    equation: 'Phenol  --[1. NaOH / 2. CO₂ (400 K, 4-7 atm) / 3. H⁺]-->  Salicylic Acid',
    reagents: 'NaOH, CO₂ gas under pressure, acid workup',
    topperTrick: 'Forms Salicylic acid (ortho-hydroxybenzoic acid), which is the precursor for Aspirin!',
    cbeTrap: 'Phenoxide ion is MORE nucleophilic than phenol, allowing attack on weak electrophile CO₂.'
  },
  {
    id: 'chem-r4',
    name: 'Reimer-Tiemann Reaction',
    category: 'Chemistry',
    equation: 'Phenol + CHCl₃ + 3 NaOH  --[340 K]-->  Salicylaldehyde + 3 NaCl + 2 H₂O',
    reagents: 'Chloroform (CHCl₃) + Aqueous NaOH',
    topperTrick: 'Introduces a -CHO aldehyde group at ortho position. Electrophile is neutral :CCl₂ (Dichlorocarbene).',
    cbeTrap: 'If CCl₄ is used instead of CHCl₃, the product formed is SALICYLIC ACID, not Salicylaldehyde!'
  },
  {
    id: 'chem-r5',
    name: 'Hoffmann Bromamide Degradation',
    category: 'Chemistry',
    equation: 'R-CONH₂ + Br₂ + 4 NaOH  --[Δ]-->  R-NH₂ + Na₂CO₃ + 2 NaBr + 2 H₂O',
    reagents: 'Bromine (Br₂) + 4 moles aqueous NaOH',
    topperTrick: 'The BEST way to "step down" a carbon chain by exactly 1 carbon. Converts 1° amide to 1° amine.',
    cbeTrap: 'The amine formed has ONE CARBON LESS than parent amide. Always count carbons in conversion problems!'
  },
  {
    id: 'chem-r6',
    name: 'Gabriel Phthalimide Synthesis',
    category: 'Chemistry',
    equation: 'Phthalimide  --[KOH]-->  K-phthalimide  --[R-X]-->  N-alkyl phthalimide  --[NaOH]-->  1° Aliphatic Amine',
    reagents: 'Phthalimide, alc. KOH, Alkyl Halide (R-X), aq. NaOH',
    topperTrick: 'Prepares PURE primary (1°) aliphatic amines without secondary or tertiary contamination.',
    cbeTrap: 'Aromatic amines (Aniline) CANNOT be prepared by this method because aryl halides cannot do SN2 on phthalimide ion.'
  },
  {
    id: 'chem-r7',
    name: 'Clemmensen vs Wolff-Kishner Reduction',
    category: 'Chemistry',
    equation: 'C=O  --[Clemmensen: Zn-Hg / conc. HCl]-->  CH₂   |   C=O  --[Wolff-Kishner: NH₂NH₂ / KOH]-->  CH₂',
    reagents: 'Clemmensen: Zn-Hg + conc. HCl (Acidic) | Wolff-Kishner: Hydrazine + KOH (Basic)',
    topperTrick: 'Both turn carbonyl C=O into alkane CH₂. Choose Clemmensen for base-sensitive reactants, and Wolff-Kishner for acid-sensitive reactants.',
    cbeTrap: 'Using Clemmensen on a molecule with -OH or C=C will cause acid-catalyzed side reactions.'
  },
  {
    id: 'chem-r8',
    name: 'Sandmeyer & Gattermann Reactions',
    category: 'Chemistry',
    equation: 'Ar-N₂⁺Cl⁻  --[CuCl/HCl]-->  Ar-Cl   |   Ar-N₂⁺Cl⁻  --[CuBr/HBr]-->  Ar-Br   |   Ar-N₂⁺Cl⁻  --[Cu/HCl]-->  Ar-Cl (Gattermann)',
    reagents: 'Cuprous halides (Cu₂X₂) in Sandmeyer; Copper powder (Cu) in Gattermann',
    topperTrick: 'Sandmeyer gives much higher yield than Gattermann. Used to introduce Cl, Br, and CN onto aromatic ring.',
    cbeTrap: 'For Fluorobenzene, use Balz-Schiemann (HBF₄). For Iodobenzene, simply warm with aqueous KI (no copper needed!).'
  },
  // Physics High-Yield Derivations
  {
    id: 'phy-d1',
    name: "Lens Maker's 5-Step Derivation",
    category: 'Physics',
    equation: '1/f = (μ₂/μ₁ - 1) * [ 1/R₁ - 1/R₂ ]',
    reagents: 'Double Convex Thin Lens with Radii R₁ & R₂ in medium μ₁',
    topperTrick: 'Surface 1 creates intermediate image I₁. Surface 2 treats I₁ as a VIRTUAL OBJECT inside the glass medium.',
    cbeTrap: 'Apply sign convention strictly: R₁ is positive (+), R₂ is negative (-). For symmetric convex lens 1/f = 2(μ-1)/R.'
  },
  {
    id: 'phy-d2',
    name: 'Series LCR Circuit Impedance & Resonance',
    category: 'Physics',
    equation: 'Z = √[R² + (ωL - 1/ωC)²]   |   Resonance: fr = 1 / [2π √(LC)]   |   Power Factor cos φ = R/Z = 1',
    reagents: 'Phasor diagram with inductive reactance XL = ωL and capacitive reactance XC = 1/(ωC)',
    topperTrick: 'At resonance, impedance is purely RESISTIVE (Z = R) and current amplitude is at its maximum peak I₀ = V₀/R.',
    cbeTrap: 'At resonance, power factor cos φ = 1 (not 0!). Voltage across L and C cancel because VL and VC are 180° out of phase.'
  },
  {
    id: 'phy-d3',
    name: "Gauss's Law: Infinite Line Charge Proof",
    category: 'Physics',
    equation: '∮ E · dA = q_enclosed / ε₀   =>   E · (2π r L) = (λ · L) / ε₀   =>   E = λ / (2πε₀ r)',
    reagents: 'Cylindrical Gaussian surface of radius r and length L coaxial with the infinite straight wire',
    topperTrick: 'Electric flux through the two circular flat end faces is ZERO because E is perpendicular to normal (cos 90° = 0).',
    cbeTrap: 'State clearly that flux only penetrates the curved cylindrical area. Draw the radial field vectors.'
  },
  {
    id: 'phy-d4',
    name: 'Biot-Savart Law: Axial B-Field Circular Coil',
    category: 'Physics',
    equation: 'B = (μ₀ I R²) / [2 (R² + x²)^(3/2)]   |   At Center (x=0): B = (μ₀ I) / (2R)',
    reagents: 'Circular loop of radius R carrying current I, point P at distance x along perpendicular axis',
    topperTrick: 'Diametrically opposite current elements produce vertical dB cos θ components that cancel, while axial dB sin θ components add up.',
    cbeTrap: 'For N turns, multiply by N: B_center = μ₀NI / (2R). Always state the right-hand grip rule for direction.'
  },
  {
    id: 'phy-d5',
    name: "Huygens' Principle: Snell's Law Verification",
    category: 'Physics',
    equation: 'sin i / sin r = (v₁ t / AC) / (v₂ t / AC) = v₁ / v₂ = μ₂ / μ₁   (Snell’s Law Proved)',
    reagents: 'Plane incident wavefront AB striking plane interface AC at angle i, refracted secondary wavelets at angle r',
    topperTrick: 'In time t, incident wave covers distance BC = v₁t in medium 1, and secondary wavelet covers AD = v₂t in medium 2.',
    cbeTrap: 'Always draw arrows on wavefronts and light rays. Wavelength changes to λ′ = λ / μ while frequency ν remains constant.'
  }
];

interface ReactionExplorerProps {
  onOpenPayment: () => void;
}

export const ReactionExplorer: React.FC<ReactionExplorerProps> = ({ onOpenPayment }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'Physics' | 'Chemistry'>('all');
  const [selectedReaction, setSelectedReaction] = useState<ReactionItem>(HIGH_YIELD_REACTIONS[0]);
  const [copied, setCopied] = useState(false);

  const filtered = HIGH_YIELD_REACTIONS.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  const handleCopyEquation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="reactions-hub" className="py-20 bg-[#070b11] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Important Formulas &amp; Derivations Flashcard Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Physics Derivations &amp; Chemistry Roadmaps
          </h2>
          <p className="mt-3 text-base text-slate-300">
            CBSE 5-mark derivations and high-yield named reactions that consistently appear on board exam papers. Select a category below to test your recall.
          </p>

          {/* Clean 2-Category Switcher: Physics and Chemistry */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedReaction(HIGH_YIELD_REACTIONS[0]);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Topics ({HIGH_YIELD_REACTIONS.length})
            </button>
            <button
              onClick={() => {
                setActiveCategory('Physics');
                const firstPhy = HIGH_YIELD_REACTIONS.find((r) => r.category === 'Physics');
                if (firstPhy) setSelectedReaction(firstPhy);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'Physics'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚡ Physics</span>
              <span className="text-[11px] opacity-80">(5 Derivations)</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('Chemistry');
                const firstChem = HIGH_YIELD_REACTIONS.find((r) => r.category === 'Chemistry');
                if (firstChem) setSelectedReaction(firstChem);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'Chemistry'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🧪 Chemistry</span>
              <span className="text-[11px] opacity-80">(8 Reactions)</span>
            </button>
          </div>
        </div>

        {/* Reaction Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Reaction Selector List */}
          <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filtered.map((item) => {
              const isSelected = selectedReaction.id === item.id;
              const isPhy = item.category === 'Physics';
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedReaction(item)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md ring-1 ring-amber-500/30'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="pr-2 truncate">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block ${
                        isPhy ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {item.category === 'Physics' ? '⚡ Class 12 Physics' : '🧪 Class 12 Chemistry'}
                    </span>
                    <span className="text-sm font-bold block mt-0.5 truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 shrink-0">
                    Inspect &rarr;
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reaction Detailed Card */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    selectedReaction.category === 'Physics' ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {selectedReaction.category === 'Physics' ? 'Class 12 Physics Derivation' : 'Class 12 Chemistry Named Reaction'}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {selectedReaction.name}
                </h3>
              </div>
              <button
                onClick={() => handleCopyEquation(selectedReaction.equation)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition cursor-pointer"
                title="Copy chemical equation or formula"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Reaction Equation Box */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Governing Equation / Formula
              </span>
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 font-code text-xs sm:text-sm text-amber-300 overflow-x-auto leading-relaxed">
                {selectedReaction.equation}
              </div>
            </div>

            {/* Reagents & Conditions */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {selectedReaction.category === 'Physics' ? 'Setup & Physical Assumptions' : 'Reagents, Catalysts & Conditions'}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                {selectedReaction.reagents}
              </p>
            </div>

            {/* Topper Trick vs Exam Trap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Topper Memory Trick</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedReaction.topperTrick}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Beaker className="w-4 h-4 text-rose-400" />
                  <span>CBSE Exam Trap Spot</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedReaction.cbeTrap}
                </p>
              </div>
            </div>

            {/* Mini CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Download notes for <strong className="text-amber-300">Physics (₹14)</strong> and <strong className="text-emerald-400">Chemistry (₹16)</strong>
              </span>
              <button
                onClick={onOpenPayment}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 transition cursor-pointer shadow-md"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Download Complete Notes via QR</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
