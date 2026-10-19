import React, { useState } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Gamepad2,
  X,
  Sliders,
  Check,
  Flame,
  Award
} from 'lucide-react';

interface FocusTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeLeft: number;
  timerActive: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSetDuration: (totalMinutes: number) => void;
  totalDurationMinutes: number;
  continuousFocusSeconds: number;
  onTriggerFreshenUp: () => void;
}

const PRESET_DURATIONS = [
  { label: '25 Min', minutes: 25, tag: 'Pomodoro' },
  { label: '45 Min', minutes: 45, tag: 'Freshen Up Cycle' },
  { label: '1 Hour', minutes: 60, tag: 'Standard' },
  { label: '1.5 Hours', minutes: 90, tag: 'Derivations' },
  { label: '2 Hours', minutes: 120, tag: 'Deep Work' },
  { label: '3 Hours', minutes: 180, tag: 'Mock Exam' },
  { label: '5 Hours', minutes: 300, tag: 'Max Marathon' }
];

export const FocusTimerModal: React.FC<FocusTimerModalProps> = ({
  isOpen,
  onClose,
  timeLeft,
  timerActive,
  onToggleTimer,
  onResetTimer,
  onSetDuration,
  totalDurationMinutes,
  continuousFocusSeconds,
  onTriggerFreshenUp
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputHours, setInputHours] = useState(Math.floor(totalDurationMinutes / 60));
  const [inputMinutes, setInputMinutes] = useState(totalDurationMinutes % 60);

  if (!isOpen) return null;

  const formatHoursMinutes = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApplyCustomTime = () => {
    let hrs = Math.max(0, Math.min(5, Number(inputHours) || 0));
    let mins = Math.max(0, Math.min(59, Number(inputMinutes) || 0));
    let total = hrs * 60 + mins;
    if (total > 300) total = 300; // Cap at 5 hours
    if (total < 1) total = 1; // Minimum 1 minute
    onSetDuration(total);
    setIsEditing(false);
  };

  const continuousMins = Math.floor(continuousFocusSeconds / 60);
  const continuousSecs = continuousFocusSeconds % 60;
  const nextGameProgress = Math.min(100, (continuousFocusSeconds / (45 * 60)) * 100);

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

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Class 12 Study Focus Timer (Up to 5 Hrs)</span>
          </div>

          <h3 className="text-2xl font-extrabold text-white">
            Study Focus Controller
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Stay focused on Physics derivations and Chemistry formulas.
            Every 45 minutes of continuous unpaused study triggers a refreshing MSN Line Archery game break!
          </p>
        </div>

        {/* Big Timer Digital Display */}
        <div className="text-center p-6 bg-slate-950 rounded-2xl border border-slate-800 mb-6 shadow-inner relative overflow-hidden">
          <div className="text-5xl sm:text-6xl font-black font-code text-white tracking-wider">
            {formatHoursMinutes(timeLeft)}
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-2 text-xs font-semibold">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${
                timerActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${timerActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
              {timerActive ? 'Focus Active' : 'Timer Paused'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">
              Total Target: {Math.floor(totalDurationMinutes / 60)}h {totalDurationMinutes % 60}m
            </span>
          </div>

          {/* Main Controls: Start/Pause, Reset, Custom Duration */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={onToggleTimer}
              className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                timerActive
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
              }`}
            >
              {timerActive ? (
                <>
                  <Pause className="w-4 h-4 fill-slate-950" />
                  <span>Pause Focus</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Start Focus</span>
                </>
              )}
            </button>

            <button
              onClick={onResetTimer}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="Edit Timer Duration"
            >
              <Sliders className="w-4 h-4" />
              <span>{isEditing ? 'Close Edit' : 'Edit Duration'}</span>
            </button>
          </div>
        </div>

        {/* Unpaused Continuous Focus Progress Callout (45 min MSN Archery trigger) */}
        <div className="p-4 bg-gradient-to-r from-amber-500/10 via-slate-950 to-emerald-500/10 border border-amber-500/25 rounded-2xl mb-6">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              Unpaused Continuous Focus Streak:
            </span>
            <span className="font-code font-bold text-white">
              {continuousMins}m {continuousSecs}s / 45m
            </span>
          </div>

          {/* Progress bar to 45 min */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${nextGameProgress}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>
              At <strong>45 continuous minutes</strong> without pause, MSN Line Archery triggers automatically!
            </span>
            <button
              onClick={onTriggerFreshenUp}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold underline shrink-0 cursor-pointer"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Play Archery Game Now</span>
            </button>
          </div>
        </div>

        {/* Custom Duration Editor (Editable up to 5 hours) */}
        {isEditing && (
          <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 mb-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Custom Duration (Up to 5 Hours):</span>
              </h4>
              <span className="text-[11px] text-slate-400">Max limit: 5 hrs 00 mins (300m)</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="space-y-1 text-center">
                <label className="text-[11px] text-slate-400 font-semibold block">Hours (0-5)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={inputHours}
                  onChange={(e) => setInputHours(Math.max(0, Math.min(5, parseInt(e.target.value) || 0)))}
                  className="w-20 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-center text-lg font-bold text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <span className="text-2xl font-bold text-slate-500 mt-5">:</span>

              <div className="space-y-1 text-center">
                <label className="text-[11px] text-slate-400 font-semibold block">Minutes (0-59)</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={inputMinutes}
                  onChange={(e) => setInputMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-20 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-center text-lg font-bold text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="mt-5">
                <button
                  onClick={handleApplyCustomTime}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Check className="w-4 h-4" />
                  <span>Set Timer</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Presets (Up to 5 Hours) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wide block">
            Popular Study Presets:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_DURATIONS.map((preset) => {
              const isCurrent = totalDurationMinutes === preset.minutes;
              return (
                <button
                  key={preset.minutes}
                  onClick={() => {
                    onSetDuration(preset.minutes);
                    setInputHours(Math.floor(preset.minutes / 60));
                    setInputMinutes(preset.minutes % 60);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-bold'
                      : 'bg-slate-950/70 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{preset.label}</div>
                  <div
                    className={`text-[10px] ${
                      isCurrent ? 'text-slate-900 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {preset.tag}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Tip */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            Tip: Keep the timer running while reading the notes. Pausing resets the unpaused continuous streak.
          </p>
        </div>

      </div>
    </div>
  );
};
