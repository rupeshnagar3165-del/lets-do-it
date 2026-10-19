import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  X,
  QrCode,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Calendar,
  User,
  Sparkles,
  Lock
} from 'lucide-react';
import { generateToppersClubPdf } from '../utils/pdfGenerator';
import { Chapter } from '../types';
import { 
  PAYMENT_PHYSICS_CHAPTERS, 
  PAYMENT_CHEMISTRY_CHAPTERS, 
  PAYMENT_AVAILABLE_CHAPTERS,
  MASTER_VAULTS 
} from '../data/chapters';
import { CaptchaWidget } from './CaptchaWidget';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapter?: Chapter | null;
  initialVaultId?: 'vault-physics' | 'vault-chemistry' | 'vault-master' | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  initialChapter,
  initialVaultId 
}) => {
  const [upiId] = useState<string>('rupeshnagar3165@upi');
  const [copied, setCopied] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Purchasable Chapters in payment interface: Core 8 Physics & 4 Chemistry
  const paymentChapters = PAYMENT_AVAILABLE_CHAPTERS;

  // Selected purchase item: specific chapter ID or vault ID
  const [selectedItemId, setSelectedItemId] = useState<string>(() => {
    if (initialVaultId) return initialVaultId;
    if (initialChapter && paymentChapters.some((c) => c.id === initialChapter.id)) {
      return initialChapter.id;
    }
    return 'vault-master';
  });

  // Update selected item whenever initialChapter or initialVaultId changes
  useEffect(() => {
    if (initialVaultId) {
      setSelectedItemId(initialVaultId);
    } else if (initialChapter) {
      if (paymentChapters.some((c) => c.id === initialChapter.id)) {
        setSelectedItemId(initialChapter.id);
      } else {
        setSelectedItemId('vault-master');
      }
    }
  }, [initialChapter, initialVaultId, paymentChapters]);

  // Find vault or individual chapter
  const selectedVault = MASTER_VAULTS.find((v) => v.id === selectedItemId) || 
    (selectedItemId === 'all' ? MASTER_VAULTS.find((v) => v.id === 'vault-master') : undefined);
  const activeChapter = paymentChapters.find((c) => c.id === selectedItemId);

  const amount = selectedVault 
    ? selectedVault.price 
    : (activeChapter?.price ?? (activeChapter?.subject === 'chemistry' ? 16 : 15));

  const currentTitle = selectedVault
    ? selectedVault.title
    : (activeChapter ? `${activeChapter.subject === 'physics' ? 'Physics' : 'Chemistry'} Ch ${activeChapter.number}: ${activeChapter.title}` : 'Chapter Notes');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const transactionNote = selectedVault
    ? selectedVault.transactionNote
    : `TOPPERS_CLUB_${activeChapter?.id || 'Ch'}_${amount}`;

  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=TOPPERS%20CLUB&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  useEffect(() => {
    if (isOpen && canvasRef.current && !isSuccess) {
      QRCode.toCanvas(
        canvasRef.current,
        upiUrl,
        {
          width: 170,
          margin: 1.5,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        },
        (err) => {
          if (err) console.error(err);
        }
      );
    }
  }, [isOpen, upiUrl, isSuccess, amount]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!studentName.trim() || studentName.trim().length < 2) {
      setErrorMessage('Please enter your full student name.');
      return;
    }

    if (!dob.trim()) {
      setErrorMessage('Please select your Date of Birth (DOB).');
      return;
    }

    if (!isCaptchaValid) {
      setErrorMessage('Incorrect anti-robot security code. Please check the characters and try again.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Auto trigger PDF download
      generateToppersClubPdf({
        studentName: studentName.trim(),
        dob: dob.trim(),
        chapterTitle: currentTitle,
        price: amount
      });
    }, 1000);
  };

  const handleDownloadAgain = () => {
    generateToppersClubPdf({
      studentName: studentName.trim() || 'Class 12 Topper',
      dob: dob.trim(),
      chapterTitle: currentTitle,
      price: amount
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="space-y-4 text-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              <span>Instant UPI QR Payment</span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Download Notes for <span className="text-amber-400">₹{amount}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Handwritten notes with CBSE derivations, diagrams &amp; PYQs.
              </p>
            </div>

            {/* Chapter & Vault Selection Box */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wide block">
                Choose Chapter or Master Vault:
              </label>

              {/* Quick Vault Packages Tab Bar */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-[10px] sm:text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedItemId('vault-physics')}
                  className={`py-1.5 px-1 rounded-lg transition text-center cursor-pointer ${
                    selectedItemId === 'vault-physics'
                      ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  Physics Vault (₹119)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItemId('vault-chemistry')}
                  className={`py-1.5 px-1 rounded-lg transition text-center cursor-pointer ${
                    selectedItemId === 'vault-chemistry'
                      ? 'bg-emerald-400 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  Chem Vault (₹49)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItemId('vault-master')}
                  className={`py-1.5 px-1 rounded-lg transition text-center cursor-pointer ${
                    selectedItemId === 'vault-master' || selectedItemId === 'all'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-black'
                      : 'text-amber-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  Full Combo (₹169)
                </button>
              </div>

              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-amber-500/30 rounded-xl text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <optgroup label="👑 Three Master Vault Packages (Save Big)">
                  <option value="vault-master">
                    ⭐ Full Master Vault (8 Physics + 4 Chemistry) - ₹169
                  </option>
                  <option value="vault-physics">
                    ⚡ Physics Master Vault (8 Core Chapters) - ₹119
                  </option>
                  <option value="vault-chemistry">
                    🧪 Chemistry Master Vault (4 Core Chapters) - ₹49
                  </option>
                </optgroup>
                <optgroup label="⚡ Individual Physics Chapters (₹15 Each)">
                  {PAYMENT_PHYSICS_CHAPTERS.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Physics Ch {ch.number}: {ch.title} (₹15)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🧪 Individual Chemistry Chapters (₹16 Each)">
                  {PAYMENT_CHEMISTRY_CHAPTERS.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Chemistry Ch {ch.number}: {ch.title} (₹16)
                    </option>
                  ))}
                </optgroup>
              </select>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="truncate pr-2">Selected: <strong className="text-amber-300">{currentTitle}</strong></span>
                <span className="font-extrabold text-emerald-400 font-code shrink-0">₹{amount} Only</span>
              </div>
            </div>

            {/* QR Code and Side Action Area */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-left">
              {/* QR Canvas Box */}
              <div className="relative p-2.5 bg-white rounded-2xl shadow-xl border-2 border-amber-400/50 shrink-0">
                <canvas ref={canvasRef} className="rounded-lg block" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 text-slate-950 rounded-md flex items-center justify-center font-black text-[10px] shadow border border-white pointer-events-none">
                  ₹{amount}
                </div>
              </div>

              {/* Side Details with Copy UPI ID */}
              <div className="flex flex-col items-start space-y-2 w-full sm:w-auto">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    UPI Payment ID
                  </span>
                  <span className="font-code text-xs font-bold text-slate-100 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 block mt-0.5 break-all">
                    {upiId}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
                  title="Copy UPI handle to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-950" />
                      <span>Copy UPI ID</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 leading-snug">
                  Scan QR with any app &amp; pay <strong className="text-amber-300 font-bold">₹{amount}</strong>.
                </p>

                <a
                  href={upiUrl}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 md:hidden"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Tap to open in UPI App</span>
                </a>
              </div>
            </div>

            {/* Human Verification Form: Full Name, DOB & Anti-Robot Captcha */}
            <form onSubmit={handleVerify} className="space-y-3 pt-1 text-left">
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Name (for PDF access pass): *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Date of Birth (DOB) */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Date of Birth (DOB): *</span>
                </label>
                <input
                  type="date"
                  required
                  max={new Date().toISOString().split('T')[0]}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 cursor-pointer"
                />
              </div>

              {/* Auto-generated Anti-Robot Captcha */}
              <CaptchaWidget
                value={captchaInput}
                onChange={setCaptchaInput}
                isValid={isCaptchaValid}
                onValidationChange={setIsCaptchaValid}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying &amp; Preparing PDF Download...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm &amp; Unlock Download (₹{amount})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Zero Robot Attacks • Instant Direct PDF Generation</span>
              </div>
            </form>

          </div>
        ) : (
          /* Success State: Clear confirmation that PDF is Downloadable */
          <div className="space-y-5 text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verification &amp; Details Received!</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Your PDF is Downloadable Now!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-amber-300">{studentName}</strong> (DOB: {dob})! Your notes for <strong className="text-white">{currentTitle}</strong> are compiled.
              </p>
            </div>

            {/* Prominent Download Banner Callout */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Your notes PDF is downloadable right away.</span>
              </div>
              <p className="text-[11px] text-slate-400">
                If the automatic download didn't start, click the button below to save your copy anytime.
              </p>
            </div>

            <button
              onClick={handleDownloadAgain}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Notes PDF Now</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer block mx-auto"
            >
              Done &amp; Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
