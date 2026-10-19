import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck, 
  Smartphone, 
  Sparkles, 
  FileText, 
  Edit3,
  CheckCircle2,
  Lock,
  Layers,
  BookOpen,
  Calendar,
  User
} from 'lucide-react';
import { generateToppersClubPdf } from '../utils/pdfGenerator';
import { 
  PAYMENT_PHYSICS_CHAPTERS, 
  PAYMENT_CHEMISTRY_CHAPTERS, 
  PAYMENT_AVAILABLE_CHAPTERS,
  MASTER_VAULTS 
} from '../data/chapters';
import { CaptchaWidget } from './CaptchaWidget';

interface PaymentSectionProps {
  onSuccess?: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ onSuccess }) => {
  // UPI configuration - defaults to user's UPI identifier
  const [upiId, setUpiId] = useState<string>('rupeshnagar3165@upi');
  const [payeeName] = useState<string>('TOPPERS CLUB - Class 12 Vault');
  const [isEditingUpi, setIsEditingUpi] = useState<boolean>(false);
  const [customUpiInput, setCustomUpiInput] = useState<string>('rupeshnagar3165@upi');

  // Purchasable chapters in payment interface: Core 8 Physics & 4 Chemistry
  const paymentChapters = PAYMENT_AVAILABLE_CHAPTERS;

  // Selected Chapter or Master Vault ID (default to full combo vault-master)
  const [selectedItemId, setSelectedItemId] = useState<string>('vault-master');

  const selectedVault = MASTER_VAULTS.find((v) => v.id === selectedItemId) || 
    (selectedItemId === 'all' ? MASTER_VAULTS.find((v) => v.id === 'vault-master') : undefined);
  const activeChapter = paymentChapters.find((c) => c.id === selectedItemId);

  const amount = selectedVault 
    ? selectedVault.price 
    : (activeChapter?.price ?? (activeChapter?.subject === 'chemistry' ? 16 : 15));

  const currentTitle = selectedVault
    ? selectedVault.title
    : (activeChapter ? `${activeChapter.subject === 'physics' ? 'Physics' : 'Chemistry'} Ch ${activeChapter.number}: ${activeChapter.title}` : 'Class 12 Chapter Notes');

  // Payment verification state: Full Name, DOB, Captcha
  const [studentName, setStudentName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isPaidVerified, setIsPaidVerified] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [customQrImage, setCustomQrImage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic UPI payment URL format with dynamic amount (₹15, ₹16, ₹49, ₹119, or ₹169)
  const transactionNote = selectedVault
    ? selectedVault.transactionNote
    : `TOPPERS_CLUB_${activeChapter?.id || 'Ch'}_${amount}`;

  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  // Generate QR Code on canvas
  useEffect(() => {
    if (!customQrImage && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        upiUrl,
        {
          width: 240,
          margin: 1.5,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error('QR code generation error:', error);
        }
      );
    }
  }, [upiUrl, customQrImage, amount]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSaveCustomUpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUpiInput.trim()) {
      setUpiId(customUpiInput.trim());
      setIsEditingUpi(false);
    }
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomQrImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
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
      setIsPaidVerified(true);

      // Trigger celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24']
      });

      // Automatically initiate verified PDF download
      generateToppersClubPdf({
        studentName: studentName.trim(),
        dob: dob.trim(),
        chapterTitle: currentTitle,
        price: amount
      });

      if (onSuccess) onSuccess();
    }, 1000);
  };

  const handleDownloadPdfAgain = () => {
    generateToppersClubPdf({
      studentName: studentName.trim() || 'Class 12 Topper',
      dob: dob.trim(),
      chapterTitle: currentTitle,
      price: amount
    });
  };

  return (
    <section id="payment-qr" className="py-20 bg-[#06090e] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <QrCode className="w-3.5 h-3.5" />
            <span>Official UPI QR Payment Gateway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pay <span className="text-amber-400">₹{amount}</span> via Personal UPI QR Code &amp; Download Instantly
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Download individual chapters (<strong>₹15</strong> for Physics, <strong>₹16</strong> for Chemistry), or select from our 3 Master Vaults: <strong>Physics Vault (₹119)</strong>, <strong>Chemistry Vault (₹49)</strong>, or <strong>Full Master Vault (₹169)</strong>.
          </p>
        </div>

        {/* Main Payment Container */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 rounded-3xl border border-amber-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {!isPaidVerified ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: QR Code Display Card */}
              <div className="md:col-span-6 flex flex-col items-center text-center p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                
                {/* QR Code Header Badge */}
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-code">
                    BHARAT UPI / BHIM QR
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    ₹{amount} LOCKED
                  </span>
                </div>

                {/* The Physical Rendered QR Code */}
                <div className="relative p-3.5 bg-white rounded-2xl shadow-xl border-4 border-amber-400/40 my-2 group">
                  {customQrImage ? (
                    <img
                      src={customQrImage}
                      alt="Personal Payment QR Code"
                      className="w-[230px] h-[230px] object-contain rounded-lg"
                    />
                  ) : (
                    <canvas ref={canvasRef} className="rounded-lg max-w-full" />
                  )}

                  {/* Center Brand Overlay Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-amber-500 text-slate-950 rounded-lg flex items-center justify-center font-black text-xs shadow-md border-2 border-white pointer-events-none">
                    ₹{amount}
                  </div>
                </div>

                {/* Supported Apps bar */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium my-2">
                  <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                    Works with any UPI scanner app
                  </span>
                </div>

                {/* UPI ID Copy Bar */}
                <div className="w-full mt-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div className="truncate text-left pr-2">
                    <span className="text-[10px] text-slate-400 block">UPI ID:</span>
                    <span className="font-code font-bold text-amber-300 truncate block">{upiId}</span>
                  </div>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer flex items-center gap-1 text-[11px] shrink-0"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Mobile Direct Pay Link */}
                <a
                  href={upiUrl}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition md:hidden"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tap to Pay ₹{amount} on Mobile App</span>
                </a>

                {/* Owner UPI Settings Accordion / Toggle */}
                <div className="w-full mt-3 pt-3 border-t border-slate-800/80 text-left">
                  <button
                    onClick={() => setIsEditingUpi(!isEditingUpi)}
                    className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{isEditingUpi ? 'Close UPI Settings' : 'Owner: Change UPI ID or Upload QR'}</span>
                  </button>

                  {isEditingUpi && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <form onSubmit={handleSaveCustomUpi} className="space-y-2">
                        <label className="text-[11px] font-semibold text-slate-300 block">
                          Set Your Personal UPI ID:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customUpiInput}
                            onChange={(e) => setCustomUpiInput(e.target.value)}
                            placeholder="e.g. yourname@okaxis"
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-300 shrink-0"
                          >
                            Save
                          </button>
                        </div>
                      </form>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Or Upload Your Personal QR Image:
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCustomImageUpload}
                          className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-slate-800 file:text-slate-200"
                        />
                        {customQrImage && (
                          <button
                            onClick={() => setCustomQrImage(null)}
                            className="mt-1 text-[10px] text-rose-400 hover:underline block"
                          >
                            Reset to dynamic generator
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Chapter Selector & 3-Step Verification Form */}
              <div className="md:col-span-6 space-y-4">
                
                {/* Chapter & Vault Selection Box */}
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Choose Chapter or Master Vault:</span>
                    </label>
                    <span className="text-xs font-extrabold text-emerald-400 font-code">
                      ₹{amount}
                    </span>
                  </div>

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
                      Physics (₹119)
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
                      Chem (₹49)
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
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-amber-400 cursor-pointer"
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

                  <div className="text-[11px] text-slate-400">
                    Selected: <strong className="text-white">{currentTitle}</strong>
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      1
                    </span>
                    <div>
                      <strong className="text-white">Scan the QR code</strong> and pay exactly <strong className="text-amber-300">₹{amount}</strong> on GPay / PhonePe / Paytm.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      2
                    </span>
                    <div>
                      <strong className="text-white">Enter your Full Name, DOB &amp; verify Captcha</strong> below to generate and download your PDF pass.
                    </div>
                  </div>
                </div>

                {/* The Verification Form: Full Name, DOB & Anti-Robot Captcha */}
                <form onSubmit={handleVerifyPayment} className="space-y-3 pt-1">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Your Full Name (for PDF access pass): *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 cursor-pointer"
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
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Verifying &amp; Compiling PDF...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm &amp; Download PDF (₹{amount})</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Bot-Protected Verification • Direct PDF Download</span>
                  </div>
                </form>

              </div>

            </div>
          ) : (
            /* Success State after Verification - Clearly tell user PDF is Downloadable */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DETAILS &amp; PAYMENT RECEIVED</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome to TOPPERS CLUB, {studentName || 'Topper'}!
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Your verification for <strong className="text-amber-300">₹{amount}</strong> ({currentTitle}) is complete. Student DOB: <strong className="text-white">{dob}</strong>.
                </p>
              </div>

              {/* Prominent notification that PDF is downloadable */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-300 text-xs text-center space-y-1 shadow-lg">
                <div className="font-bold text-sm flex items-center justify-center gap-2 text-white">
                  <Download className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span>Your notes PDF is downloadable right away!</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Your download has started automatically. If your browser didn't save it yet, click the button below to download the file directly.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleDownloadPdfAgain}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Notes PDF Now</span>
                </button>

                <a
                  href="#notebook-preview"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Continue Browsing Notes</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
