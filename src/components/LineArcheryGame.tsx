import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  Target, 
  Wind, 
  Flame, 
  X, 
  Award, 
  EyeOff, 
  Eye, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LineArcheryGameProps {
  onClose: () => void;
  onResumeFocus: () => void;
}

interface Arrow {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  inFlight: boolean;
  stuck: boolean;
  stuckOffset?: { x: number; y: number };
}

interface TargetData {
  x: number;
  y: number;
  baseY: number;
  width: number;
  height: number;
  ringRadii: number[];
}

export const LineArcheryGame: React.FC<LineArcheryGameProps> = ({ onClose, onResumeFocus }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 6 Arrow Game Rounds & Level Progression
  const [level, setLevel] = useState<number>(1);
  const [arrowsLeft, setArrowsLeft] = useState(6);
  const [score, setScore] = useState(0);
  const [bullseyeCount, setBullseyeCount] = useState(0);
  const [windMultiplier, setWindMultiplier] = useState(1.0);
  
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('topper_archery_highscore') || '0', 10);
  });
  
  const [hitFeedback, setHitFeedback] = useState<string | null>(null);
  const [hitFeedbackColor, setHitFeedbackColor] = useState('text-amber-400');
  const [gameOver, setGameOver] = useState(false);
  const [wind, setWind] = useState(0);

  // Interactive aiming state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragCurrentRef = useRef({ x: 0, y: 0 });

  // Physics simulation references
  const bowPosRef = useRef({ x: 70, y: 190 });
  const targetRef = useRef<TargetData>({
    x: 430,
    y: 190,
    baseY: 180,
    width: 26,
    height: 140,
    ringRadii: [14, 28, 42, 56, 70] // Bullseye (yellow), red, blue, black, white
  });

  const arrowRef = useRef<Arrow | null>(null);
  const stuckArrowsRef = useRef<Arrow[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const gameTimeRef = useRef(0);

  // Generate random wind based on level and bullseye count
  const rollWind = useCallback(() => {
    const baseScale = 2.4 + (bullseyeCount * 0.7) + (level - 1) * 1.2;
    const val = (Math.random() * (baseScale * 2) - baseScale).toFixed(1);
    setWind(parseFloat(val));
  }, [bullseyeCount, level]);

  useEffect(() => {
    rollWind();
  }, [rollWind]);

  // Main drawing & physics game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const width = canvas.width;
      const height = canvas.height;
      gameTimeRef.current += 1;

      // 1. DYNAMIC MOVING TARGET CALCULATION (Speed & amplitude increase with level)
      const target = targetRef.current;
      const moveSpeed = 0.024 + (level - 1) * 0.018;
      const moveAmplitude = 45 + Math.min(45, (level - 1) * 16);
      target.y = target.baseY + Math.sin(gameTimeRef.current * moveSpeed) * moveAmplitude;

      // 2. CLEAR CANVAS with subtle night study sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#0a0f1d');
      skyGrad.addColorStop(0.7, '#111827');
      skyGrad.addColorStop(1, '#064e3b'); // grassy base
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant target hill / ground horizon
      ctx.fillStyle = '#065f46';
      ctx.beginPath();
      ctx.ellipse(width / 2, height + 40, width * 0.7, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      // Grass accents
      ctx.fillStyle = '#10b981';
      for (let i = 20; i < width; i += 40) {
        ctx.fillRect(i, height - 12, 2, 6);
        ctx.fillRect(i + 4, height - 15, 2, 9);
      }

      // Draw Archery Moving Target Stand (Wood) - smoothly anchors with moving target
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(target.x + 8, target.y - 70);
      ctx.lineTo(target.x - 12, height - 10);
      ctx.moveTo(target.x + 8, target.y - 70);
      ctx.lineTo(target.x + 22, height - 10);
      ctx.stroke();

      // Vertical Target Guide Pole
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(target.x + 8, 40);
      ctx.lineTo(target.x + 8, height - 10);
      ctx.stroke();

      // Draw Target Face (2.5D perspective disc with rings)
      const ringColors = ['#f8fafc', '#1e293b', '#3b82f6', '#ef4444', '#facc15'];
      for (let r = 4; r >= 0; r--) {
        const radiusY = target.ringRadii[r];
        const radiusX = radiusY * 0.22;
        ctx.fillStyle = ringColors[4 - r];
        ctx.beginPath();
        ctx.ellipse(target.x, target.y, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center mark on bullseye
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(target.x, target.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw all stuck arrows from previous shots - MOVING with the target
      stuckArrowsRef.current.forEach((stuck) => {
        ctx.save();
        const drawX = target.x + (stuck.stuckOffset?.x ?? 0);
        const drawY = target.y + (stuck.stuckOffset?.y ?? 0);
        ctx.translate(drawX, drawY);
        ctx.rotate(stuck.angle);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-35, 0);
        ctx.lineTo(5, 0);
        ctx.stroke();
        // Fletching feathers
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(-35, -4);
        ctx.lineTo(-24, 0);
        ctx.lineTo(-35, 4);
        ctx.fill();
        ctx.restore();
      });

      // Bow & Archer Station
      const bow = bowPosRef.current;

      // Platform
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(bow.x - 45, height - 25, 40, 20, 4);
      ctx.fill();

      // Bow limb curvature and aim calculation
      let pullX = bow.x;
      let pullY = bow.y;
      let power = 0;
      let aimAngle = 0;

      if (isDraggingRef.current) {
        const dx = dragStartRef.current.x - dragCurrentRef.current.x;
        const dy = dragStartRef.current.y - dragCurrentRef.current.y;
        const dist = Math.min(65, Math.hypot(dx, dy));
        aimAngle = Math.atan2(dy, dx);
        power = dist / 65; // 0 to 1
        pullX = bow.x - Math.cos(aimAngle) * dist * 0.7;
        pullY = bow.y - Math.sin(aimAngle) * dist * 0.7;
      }

      // Recurve bow limbs
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(bow.x - 5, bow.y, 42, -Math.PI / 2.2, Math.PI / 2.2, false);
      ctx.stroke();

      // Bowstring
      const bowTop = { x: bow.x + 8, y: bow.y - 40 };
      const bowBottom = { x: bow.x + 8, y: bow.y + 40 };

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(bowTop.x, bowTop.y);
      ctx.lineTo(pullX, pullY);
      ctx.lineTo(bowBottom.x, bowBottom.y);
      ctx.stroke();

      // 3. TRAJECTORY LINE DRAWING:
      // In Level 1: Shown as dotted prediction guide.
      // In Level 2+: REMOVED completely for authentic marksman difficulty!
      const isTrajectoryAllowed = level === 1;

      if (isDraggingRef.current && power > 0.1 && isTrajectoryAllowed) {
        ctx.save();
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);

        let simX = bow.x;
        let simY = bow.y;
        const launchSpeed = power * 22;
        let simVx = Math.cos(aimAngle) * launchSpeed;
        let simVy = Math.sin(aimAngle) * launchSpeed;

        ctx.beginPath();
        ctx.moveTo(simX, simY);

        for (let t = 0; t < 22; t++) {
          simX += simVx;
          simY += simVy;
          simVy += 0.45; // gravity
          simVx += wind * 0.04 * windMultiplier; // increased wind influence
          ctx.lineTo(simX, simY);
          if (simX > target.x + 20 || simY > height) break;
        }
        ctx.stroke();
        ctx.restore();
      }

      // Draw nocked arrow while pulling
      if (isDraggingRef.current && power > 0.1) {
        ctx.save();
        ctx.translate(pullX, pullY);
        ctx.rotate(aimAngle);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-15, 0);
        ctx.lineTo(40, 0);
        ctx.stroke();
        // Arrow head
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(40, -3.5);
        ctx.lineTo(47, 0);
        ctx.lineTo(40, 3.5);
        ctx.fill();
        // Fletching
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(-15, -4);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-15, 4);
        ctx.fill();
        ctx.restore();
      }

      // 4. UPDATE & DRAW ARROW IN FLIGHT
      const currentArrow = arrowRef.current;
      if (currentArrow && currentArrow.inFlight) {
        currentArrow.x += currentArrow.vx;
        currentArrow.y += currentArrow.vy;
        currentArrow.vy += 0.45; // gravity pull
        // Increased wind influence on arrow:
        currentArrow.vx += wind * 0.04 * windMultiplier;
        currentArrow.angle = Math.atan2(currentArrow.vy, currentArrow.vx);

        // Check collision with moving target
        if (
          currentArrow.x >= target.x - 8 &&
          currentArrow.x <= target.x + 14 &&
          currentArrow.y >= target.y - 75 &&
          currentArrow.y <= target.y + 75
        ) {
          // Arrow Hit Target!
          currentArrow.inFlight = false;
          currentArrow.stuck = true;

          const distFromCenter = Math.abs(currentArrow.y - target.y);
          let points = 0;
          let message = 'HIT!';
          let color = 'text-amber-400';
          let isBullseye = false;

          if (distFromCenter <= target.ringRadii[0]) {
            points = 10;
            isBullseye = true;
            message = '🎯 BULLSEYE! +10 PTS! (Wind Influence Increased!)';
            color = 'text-amber-300 font-black animate-bounce';
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });

            // Each Bullseye increases wind multiplier & influence:
            setBullseyeCount((prev) => prev + 1);
            setWindMultiplier((prev) => +(prev + 0.5).toFixed(1));

            // Level up automatically if hitting 2 bullseyes or score >= 20:
            if (level === 1) {
              setLevel(2);
            }
          } else if (distFromCenter <= target.ringRadii[1]) {
            points = 8;
            message = '🔥 GREAT SHOT! +8 PTS!';
            color = 'text-rose-400 font-bold';
          } else if (distFromCenter <= target.ringRadii[2]) {
            points = 6;
            message = '🏹 GOOD HIT! +6 PTS!';
            color = 'text-sky-400 font-semibold';
          } else if (distFromCenter <= target.ringRadii[3]) {
            points = 4;
            message = 'NICE! +4 PTS';
            color = 'text-slate-300';
          } else if (distFromCenter <= target.ringRadii[4]) {
            points = 2;
            message = 'ON TARGET! +2 PTS';
            color = 'text-slate-400';
          }

          setHitFeedback(message);
          setHitFeedbackColor(color);

          setScore((prev) => {
            const nextScore = prev + points;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem('topper_archery_highscore', nextScore.toString());
            }
            // Auto level up if scoring high in level 1
            if (nextScore >= 20 && level === 1) {
              setLevel(2);
            }
            return nextScore;
          });

          // Record relative offset to moving target
          stuckArrowsRef.current.push({
            ...currentArrow,
            stuckOffset: {
              x: currentArrow.x - target.x,
              y: currentArrow.y - target.y
            }
          });

          arrowRef.current = null;
          rollWind();

          if (arrowsLeft <= 1) {
            setGameOver(true);
          }
        } else if (currentArrow.x > width + 30 || currentArrow.y > height - 10) {
          // Arrow Missed
          currentArrow.inFlight = false;
          setHitFeedback('MISS! Moving target swayed past 🎯');
          setHitFeedbackColor('text-rose-400');
          arrowRef.current = null;
          rollWind();

          if (arrowsLeft <= 1) {
            setGameOver(true);
          }
        } else {
          // Draw flying arrow
          ctx.save();
          ctx.translate(currentArrow.x, currentArrow.y);
          ctx.rotate(currentArrow.angle);
          ctx.strokeStyle = '#f8fafc';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-35, 0);
          ctx.lineTo(10, 0);
          ctx.stroke();
          // Arrow head
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(10, -3.5);
          ctx.lineTo(16, 0);
          ctx.lineTo(10, 3.5);
          ctx.fill();
          // Fletching
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.moveTo(-35, -4);
          ctx.lineTo(-24, 0);
          ctx.lineTo(-35, 4);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [arrowsLeft, highScore, rollWind, wind, level, windMultiplier, bullseyeCount]);

  // Touch and Mouse handlers for Aim & Pull
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameOver || arrowsLeft <= 0 || (arrowRef.current && arrowRef.current.inFlight)) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    isDraggingRef.current = true;
    dragStartRef.current = { x, y };
    dragCurrentRef.current = { x, y };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    dragCurrentRef.current = { x, y };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (arrowsLeft <= 0 || (arrowRef.current && arrowRef.current.inFlight)) return;

    const dx = dragStartRef.current.x - dragCurrentRef.current.x;
    const dy = dragStartRef.current.y - dragCurrentRef.current.y;
    const dist = Math.min(65, Math.hypot(dx, dy));

    if (dist > 10) {
      const aimAngle = Math.atan2(dy, dx);
      const power = dist / 65;
      const speed = power * 22;

      arrowRef.current = {
        x: bowPosRef.current.x,
        y: bowPosRef.current.y,
        vx: Math.cos(aimAngle) * speed,
        vy: Math.sin(aimAngle) * speed,
        angle: aimAngle,
        inFlight: true,
        stuck: false
      };

      setArrowsLeft((prev) => prev - 1);
      setHitFeedback(null);
    }
  };

  const resetGame = () => {
    setArrowsLeft(6);
    setScore(0);
    setHitFeedback(null);
    setGameOver(false);
    stuckArrowsRef.current = [];
    arrowRef.current = null;
    rollWind();
  };

  const handleLevelUp = () => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    setArrowsLeft(6);
    setGameOver(false);
    stuckArrowsRef.current = [];
    arrowRef.current = null;
    rollWind();
    setHitFeedback(`LEVEL ${nextLvl}! Trajectory line removed & Target moving faster! 🏹`);
    setHitFeedbackColor('text-amber-300 font-bold');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-amber-400/40 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Glow ambient background */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with 45-min Continuous Focus Break Notification */}
        <div className="text-center space-y-1.5 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>45-Min Continuous Focus Milestone</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Well done! Let's freshen up 🎯
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Concentrated continuously for 45 minutes! Moving target + real wind drift. Pull back and release.
          </p>
        </div>

        {/* Level & Difficulty Status Bar */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 mb-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-lg">
              Level {level} {level === 1 ? '(Rookie)' : level === 2 ? '(Pro Marksman)' : '(Master)'}
            </span>
            {level === 1 ? (
              <span className="text-[11px] text-slate-400 hidden sm:inline-flex items-center gap-1">
                <Eye className="w-3 h-3 text-cyan-400" />
                <span>Trajectory line shown</span>
              </span>
            ) : (
              <span className="text-[11px] text-rose-300 font-bold inline-flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                <EyeOff className="w-3 h-3 text-rose-400" />
                <span>Trajectory Removed!</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {bullseyeCount > 0 && (
              <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
                🎯 {bullseyeCount} Bullseyes ({windMultiplier}x Wind Force)
              </span>
            )}

            {level === 1 && (
              <button
                onClick={handleLevelUp}
                className="text-[10px] text-amber-300 hover:text-white underline font-bold cursor-pointer"
              >
                Level Up &rarr;
              </button>
            )}
          </div>
        </div>

        {/* Top Game Bar: Wind Indicator + Arrows Left + Score */}
        <div className="grid grid-cols-3 gap-2 p-2 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold mb-3 items-center text-center">
          {/* Wind */}
          <div className="flex items-center justify-center gap-1 text-slate-300">
            <Wind className="w-3.5 h-3.5 text-sky-400" />
            <span>Wind:</span>
            <span className={`font-mono ${wind > 0 ? 'text-emerald-400' : wind < 0 ? 'text-amber-400' : 'text-slate-400'}`}>
              {wind > 0 ? `▶ +${wind}` : wind < 0 ? `◀ ${wind}` : '0.0'} m/s
            </span>
          </div>

          {/* Arrows Left (6 Arrow Game) */}
          <div className="flex items-center justify-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white">Arrows:</span>
            <span className="font-mono text-amber-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
              {arrowsLeft} / 6
            </span>
          </div>

          {/* Score & Best */}
          <div className="flex items-center justify-center gap-1 font-mono">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-emerald-400">{score}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 text-[11px]">Best: {highScore}</span>
          </div>
        </div>

        {/* The Moving Archery Canvas Box */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-inner select-none mb-3">
          <canvas
            ref={canvasRef}
            width={480}
            height={260}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-auto block touch-none cursor-crosshair"
          />

          {/* Moving Target Indicator Tag */}
          <div className="absolute top-2.5 right-3 text-[10px] text-amber-400/90 font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded-full border border-amber-400/30 pointer-events-none flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Moving Target Active</span>
          </div>

          {/* Hit / Miss Banner Popup */}
          {hitFeedback && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-950/95 border border-amber-400/40 shadow-xl backdrop-blur-sm pointer-events-none animate-fadeIn text-center max-w-[90%]">
              <span className={`text-xs font-extrabold tracking-wide ${hitFeedbackColor}`}>
                {hitFeedback}
              </span>
            </div>
          )}

          {/* Instructions Overlay while aiming */}
          <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 font-medium pointer-events-none flex items-center gap-1.5">
            <span>🏹 Drag backward to aim.</span>
            {level > 1 && <span className="text-rose-400 font-bold">(No Trajectory Line in Level {level}!)</span>}
          </div>

          {/* Game Over / Round Finish Dialog */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-fadeIn space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">6-Arrow Round Finished!</h4>
                <p className="text-sm text-slate-300 mt-1">
                  You scored <strong className="text-amber-300 text-lg">{score} Points</strong> in Level {level}!
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Bullseyes: {bullseyeCount} • Wind Multiplier: {windMultiplier}x
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={resetGame}
                  className="px-4 py-2 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Round</span>
                </button>

                <button
                  type="button"
                  onClick={handleLevelUp}
                  className="px-5 py-2 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Level Up &amp; Next 6 Arrows</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Health Freshen Up Advice Bar */}
        <div className="grid grid-cols-3 gap-2 p-2 bg-slate-950/70 rounded-xl border border-slate-800 text-[10px] text-slate-400 text-center mb-3">
          <div>💧 Sip fresh water</div>
          <div>🧘‍♂️ Roll shoulders back</div>
          <div>👀 Blink 20 times for eye rest</div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={resetGame}
            className="w-full sm:flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Round (6 Arrows)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onResumeFocus();
              onClose();
            }}
            className="w-full sm:flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 fill-slate-950" />
            <span>Refreshed! Resume Focus</span>
          </button>
        </div>

      </div>
    </div>
  );
};
