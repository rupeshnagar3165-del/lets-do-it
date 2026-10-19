import React, { useState } from 'react';
import { STUDENT_REVIEWS } from '../data/chapters';
import { Star, ShieldCheck, TrendingUp, Award, Quote, CheckCircle2, BookOpen } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Physics' | 'Chemistry'>('All');

  const filteredReviews = STUDENT_REVIEWS.filter((review) => {
    if (filter === 'All') return true;
    return review.subject === filter || review.subject === 'Both';
  });

  return (
    <section id="reviews" className="py-20 bg-[#090d15] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Real Student Score Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            From Pre-Board Panic to 95%+ in Board Exams
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Read how Class 12 students across India used TOPPERS CLUB notes to turn lengthy derivations and organic reaction mechanisms into easy, full-mark answers.
          </p>

          {/* Simple Explanation Note */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Scores shown are out of 70 marks (CBSE Class 12 Board Theory Paper).</span>
          </div>

          {/* Subject Filter Tabs */}
          <div className="mt-6 inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl gap-1.5 shadow-inner">
            {(['All', 'Physics', 'Chemistry'] as const).map((subject) => (
              <button
                key={subject}
                onClick={() => setFilter(subject)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
                  filter === subject
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {subject === 'All' ? 'All Student Reviews (6)' : `${subject} Students (3)`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between shadow-lg relative group"
            >
              <div>
                {/* Score transformation pill & Stars */}
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-code">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{review.beforeScore} ➔ {review.afterScore}</span>
                  </div>
                </div>

                {/* Highlight Topic Badge */}
                {review.highlightTopic && (
                  <div className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>{review.highlightTopic}</span>
                  </div>
                )}

                {/* Quote */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Student Bio */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold flex items-center justify-center text-xs shadow-md shrink-0">
                    {review.avatarLetter}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {review.schoolOrCity}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20 whitespace-nowrap">
                  {review.verifiedBadge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Stats */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-code">8,420+</div>
            <div className="text-xs text-slate-400 mt-1">Students Benefited</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-code">98.6%</div>
            <div className="text-xs text-slate-400 mt-1">Author's Board Score</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-code">28</div>
            <div className="text-xs text-slate-400 mt-1">5-Mark Derivations</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-code">₹14 / ₹16</div>
            <div className="text-xs text-slate-400 mt-1">Per Chapter Price</div>
          </div>
        </div>

      </div>
    </section>
  );
};
