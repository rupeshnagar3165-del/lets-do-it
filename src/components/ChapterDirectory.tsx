import React, { useState } from 'react';
import { PHYSICS_CHAPTERS, CHEMISTRY_CHAPTERS } from '../data/chapters';
import { Chapter } from '../types';
import { 
  BookOpen, 
  Search, 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  QrCode, 
  Zap, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ChapterDirectoryProps {
  onOpenPayment: (chapter?: Chapter) => void;
}

export const ChapterDirectory: React.FC<ChapterDirectoryProps> = ({ onOpenPayment }) => {
  // Category filter: strictly 'physics' and 'chemistry' (plus 'all' view)
  const [activeCategory, setActiveCategory] = useState<'all' | 'physics' | 'chemistry'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track expanded chapter IDs: allow expanding all or individually
  const allChapters = [...PHYSICS_CHAPTERS, ...CHEMISTRY_CHAPTERS];
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['phy-1', 'chem-1']));

  const filteredChapters = allChapters.filter((ch) => {
    if (activeCategory === 'physics' && ch.subject !== 'physics') return false;
    if (activeCategory === 'chemistry' && ch.subject !== 'chemistry') return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.tagline.toLowerCase().includes(q) ||
        ch.keyDerivationsOrMechanisms.some((d) => d.toLowerCase().includes(q)) ||
        ch.highlightPoints.some((h) => h.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const physicsCount = PHYSICS_CHAPTERS.length;
  const chemistryCount = CHEMISTRY_CHAPTERS.length;

  const toggleChapter = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const allIds = new Set(filteredChapters.map((c) => c.id));
    setExpandedIds(allIds);
  };

  const handleCollapseAll = () => {
    setExpandedIds(new Set());
  };

  const isAllExpanded = filteredChapters.length > 0 && filteredChapters.every((c) => expandedIds.has(c.id));

  return (
    <section id="syllabus" className="py-20 bg-[#090d15] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete Formulas &amp; Derivations • Physics &amp; Chemistry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            All Chapter Formulas &amp; Derivations Breakdown
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Handcrafted chapterwise notes featuring essential CBSE formulas, 5-mark derivations, and reaction roadmaps. Physics notes for <strong>₹15</strong> and Chemistry notes for <strong>₹16</strong>.
          </p>

          {/* Clean 2-Category Tabs (Physics & Chemistry) + Controls */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* The 2 Categories */}
            <div className="flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl gap-1.5 shadow-inner w-full md:w-auto justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Chapters ({allChapters.length})
              </button>
              <button
                onClick={() => setActiveCategory('physics')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'physics'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>⚡ Physics</span>
                <span className="text-[11px] opacity-80">({physicsCount})</span>
              </button>
              <button
                onClick={() => setActiveCategory('chemistry')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'chemistry'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🧪 Chemistry</span>
                <span className="text-[11px] opacity-80">({chemistryCount})</span>
              </button>
            </div>

            {/* Right Controls: Expand All / Collapse All & Search */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 transition cursor-pointer shrink-0"
                title={isAllExpanded ? "Collapse All Derivations" : "Show All Chapter Formulas & Derivations"}
              >
                {isAllExpanded ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Show All Formulas &amp; Derivations</span>
                  </>
                )}
              </button>

              {/* Search Bar */}
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search formulas, derivations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-5 max-w-5xl mx-auto">
          {filteredChapters.map((chapter) => {
            const isExpanded = expandedIds.has(chapter.id);
            const isPhysics = chapter.subject === 'physics';
            const isPurchasable = !['phy-9', 'phy-10', 'phy-11', 'phy-12', 'phy-13', 'phy-14', 'chem-5'].includes(chapter.id);

            return (
              <div
                key={chapter.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900/95 border-amber-500/40 shadow-xl ring-1 ring-amber-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleChapter(chapter.id)}
                  className="p-5 flex items-start sm:items-center justify-between cursor-pointer select-none gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Chapter Number Badge */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 sm:mt-0 ${
                        isPhysics
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {chapter.number < 10 ? `0${chapter.number}` : chapter.number}
                    </div>

                    <div>
                      {/* Meta Information: Subject, Weightage, Notes/Formula Access */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          {isPhysics ? 'Class 12 Physics' : 'Class 12 Chemistry'}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs font-semibold text-amber-300">
                          {chapter.weightage}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span
                          className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                            isPhysics
                              ? 'text-amber-300 bg-amber-500/15 border-amber-500/30'
                              : 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
                          }`}
                        >
                          {isPurchasable ? `₹${chapter.price} / Chapter` : 'Formulas & Derivations Guide'}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                        {chapter.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                        {chapter.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20 hidden md:inline">
                      {isPurchasable ? `₹${chapter.price} Pass` : 'Formula Guide'}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 transition-transform ${
                        isExpanded ? 'bg-amber-500/20 text-amber-300' : ''
                      }`}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Important Formulas & Key Derivations Preview Strip (Always visible for easy scan) */}
                <div className="px-5 pb-4 pt-0">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>Essential Formulas &amp; Derivations:</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChapter(chapter.id);
                        }}
                        className="text-[11px] font-bold text-slate-400 hover:text-amber-300 transition underline cursor-pointer"
                      >
                        {isExpanded ? 'Hide Details' : 'View Full Derivation Proofs & PYQs'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-code">
                      {chapter.keyDerivationsOrMechanisms.slice(0, isExpanded ? undefined : 2).map((deriv, idx) => (
                        <div
                          key={idx}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-amber-500/20 text-amber-200 flex items-start gap-1.5 truncate"
                          title={deriv}
                        >
                          <span className="text-amber-400 font-bold shrink-0">📌</span>
                          <span className="truncate">{deriv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Body: Step-by-Step Breakdown, Core Topics & PYQs */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-6 animate-fadeIn">
                    
                    {/* Complete Formulas & Derivations Checklist */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-emerald-500/10 border border-amber-500/25">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span>All Key CBSE Derivations &amp; Formulas in Chapter</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm font-code">
                        {chapter.keyDerivationsOrMechanisms.map((deriv, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-slate-900/90 border border-amber-500/20 text-amber-200 flex items-start gap-2 shadow-sm"
                          >
                            <span className="text-amber-400 font-bold shrink-0">📌</span>
                            <span className="leading-snug">{deriv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chapter Core Concepts & Topics */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Core Topics Covered in Notes</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                        {chapter.highlightPoints.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Most Repeated CBSE Questions (PYQs) */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-3 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-rose-400" />
                        <span>10-Year CBSE Most Repeated Questions (PYQ)</span>
                      </h4>
                      <div className="space-y-2">
                        {chapter.mostRepeatedQuestions.map((q, i) => (
                          <div key={i} className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/15 text-xs text-rose-200 flex items-start gap-2">
                            <span className="font-bold text-rose-400 shrink-0">Q{i + 1}.</span>
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/80 -mx-5 -mb-6 p-4 rounded-b-2xl border-t border-slate-800">
                      <div className="text-xs text-slate-300">
                        {isPurchasable ? (
                          <span>Get complete handwritten notes &amp; derivations for <strong className="text-emerald-400 font-bold">₹{chapter.price} Only</strong></span>
                        ) : (
                          <span>Formulas &amp; derivations guide included • <strong className="text-amber-300">Free to Study</strong></span>
                        )}
                      </div>

                      {isPurchasable ? (
                        <button
                          onClick={() => onOpenPayment(chapter)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition cursor-pointer shadow-md"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Download Chapter Notes (₹{chapter.price})</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenPayment()}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 transition cursor-pointer shadow-md"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Get Full Notes Vault (₹169)</span>
                        </button>
                      )}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-slate-800 max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need Just One Chapter Tonight? Get It Separately.
          </h3>
          <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
            Pay ₹15 for Physics or ₹16 for Chemistry via personal UPI QR code, or choose from our 3 Master Vaults: Physics (₹119), Chemistry (₹49), or Full Master Vault (₹169).
          </p>
          <button
            onClick={() => onOpenPayment()}
            className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Select Chapter &amp; Download via QR</span>
          </button>
        </div>

      </div>
    </section>
  );
};
