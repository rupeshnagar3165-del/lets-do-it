import React from 'react';
import { BookOpen, ShieldCheck, Mail, Heart, QrCode } from 'lucide-react';

interface FooterProps {
  onOpenPayment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPayment }) => {
  return (
    <footer className="bg-[#05080d] border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                TOPPERS CLUB
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-sm">
              <strong className="text-amber-300 font-semibold">Ace your exams affordably.</strong> The complete Class 12 Physics &amp; Organic Chemistry handwritten notes vault for CBSE, State Boards, JEE, and NEET.
            </p>
            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <p>• Handcrafted by a 98.6% Class 12 Board Topper</p>
              <p>• Payment strictly via personal UPI QR code: <span className="font-code text-amber-300 font-semibold">rupeshnagar3165@upi</span></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Study Vault
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#notebook-preview" className="hover:text-amber-400 transition">Sample Handwritten Pages</a></li>
              <li><a href="#syllabus" className="hover:text-amber-400 transition">14 Physics Chapters List</a></li>
              <li><a href="#syllabus" className="hover:text-amber-400 transition">Organic Chemistry Roadmaps</a></li>
              <li><a href="#reactions-hub" className="hover:text-amber-400 transition">35 Named Reactions Flashcards</a></li>
              <li><a href="#score-calculator" className="hover:text-amber-400 transition">Score Booster Calculator</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Student Support &amp; Verification
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              If your UPI transaction went through but you need an additional copy sent to your WhatsApp or Gmail, email us with your full name and DOB:
            </p>
            <div className="flex items-center gap-2 text-slate-200 font-code text-xs bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>rupeshnagar3165@gmail.com</span>
            </div>
            <button
              onClick={onOpenPayment}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan QR Code to Download Notes</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} TOPPERS CLUB • Crafted with dedication for all Class 12 aspirants.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>CBSE Class 12</span>
            <span>·</span>
            <span>State Boards</span>
            <span>·</span>
            <span>JEE Main</span>
            <span>·</span>
            <span>NEET UG</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
