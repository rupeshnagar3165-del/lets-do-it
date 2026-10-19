import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';

interface CaptchaWidgetProps {
  value: string;
  onChange: (val: string) => void;
  isValid: boolean;
  onValidationChange: (isValid: boolean) => void;
  errorMessage?: string;
}

// Generate human-readable random captcha avoiding confusing letters (0/O, 1/I)
const generateCaptchaCode = (length = 5): string => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const CaptchaWidget: React.FC<CaptchaWidgetProps> = ({
  value,
  onChange,
  onValidationChange,
  errorMessage
}) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [isRotating, setIsRotating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate new captcha code and draw on canvas
  const refreshCaptcha = useCallback(() => {
    setIsRotating(true);
    const newCode = generateCaptchaCode(5);
    setCaptchaCode(newCode);
    setTimeout(() => setIsRotating(false), 400);
  }, []);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  // Redraw canvas whenever captchaCode changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !captchaCode) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Anti-robot decorative noise lines
    const lineColors = ['#f59e0b', '#10b981', '#38bdf8', '#818cf8', '#f43f5e'];
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = lineColors[i % lineColors.length];
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(Math.random() * 20, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        width - Math.random() * 20,
        Math.random() * height
      );
      ctx.stroke();
    }

    // Random noise dots
    for (let i = 0; i < 45; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, 255, 0.35)`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Render characters with slight rotation & random fonts
    const charList = captchaCode.split('');
    const charSpacing = width / (charList.length + 1);

    charList.forEach((char, idx) => {
      ctx.save();
      const x = charSpacing * (idx + 1);
      const y = height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 24 - 12) * (Math.PI / 180);

      ctx.translate(x, y);
      ctx.rotate(angle);

      // Random vibrant topper colors for each letter
      const charColors = ['#fbbf24', '#34d399', '#38bdf8', '#f472b6', '#a78bfa', '#facc15'];
      ctx.fillStyle = charColors[idx % charColors.length];
      ctx.font = `bold ${Math.floor(22 + Math.random() * 4)}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 4;
      ctx.fillText(char, 0, 0);

      ctx.restore();
    });
  }, [captchaCode]);

  // Validation sync
  useEffect(() => {
    if (!value.trim()) {
      onValidationChange(false);
      return;
    }
    const isMatched = value.trim().toUpperCase() === captchaCode.toUpperCase();
    onValidationChange(isMatched);
  }, [value, captchaCode, onValidationChange]);

  const isMatched = value.trim().length > 0 && value.trim().toUpperCase() === captchaCode.toUpperCase();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Anti-Robot Security Verification: *</span>
        </label>
        <button
          type="button"
          onClick={refreshCaptcha}
          className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          title="Generate a new fresh Captcha"
        >
          <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
          <span>New Captcha</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Captcha Canvas Image Box */}
        <div
          onClick={refreshCaptcha}
          className="relative bg-slate-950 border border-slate-700 hover:border-amber-400/50 rounded-xl overflow-hidden cursor-pointer select-none shrink-0 shadow-inner group transition-all"
          title="Click to generate new code"
        >
          <canvas
            ref={canvasRef}
            width={160}
            height={46}
            className="block"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all pointer-events-none" />
          <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-amber-300">
            Click to refresh
          </span>
        </div>

        {/* Input Field */}
        <div className="relative flex-1">
          <input
            type="text"
            required
            maxLength={6}
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            placeholder="Enter code above"
            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm font-code font-bold tracking-widest placeholder-slate-500 uppercase focus:outline-none transition-colors ${
              isMatched
                ? 'border-emerald-500 text-emerald-300 focus:border-emerald-400'
                : value.length > 0
                ? 'border-amber-500/50 text-white focus:border-amber-400'
                : 'border-slate-800 text-white focus:border-amber-400'
            }`}
          />
          {isMatched && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs font-bold flex items-center gap-1 pointer-events-none">
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden xs:inline">Verified</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-tight">
        Type the 5 characters shown above to prove you are a human student and prevent robot attack.
      </p>

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-rose-400 text-[11px] font-medium">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
