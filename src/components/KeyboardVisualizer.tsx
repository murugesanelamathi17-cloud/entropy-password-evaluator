import React, { useState } from 'react';
import { Keyboard, Navigation, Compass, Info } from 'lucide-react';
import { KeyboardResult } from '../types';
import { KEY_COORDINATES } from '../core/keyboardAdjacency';

interface KeyboardVisualizerProps {
  password: string;
  keyboardResult: KeyboardResult;
}

// Visual layout rows for standard QWERTY keyboard
const KEYBOARD_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];

export const KeyboardVisualizer: React.FC<KeyboardVisualizerProps> = ({
  password,
  keyboardResult,
}) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  // Key sizes and spacing for SVG canvas
  const keyWidth = 46;
  const keyHeight = 44;
  const keyGap = 6;
  const rowOffsets = [10, 24, 34, 52];

  // Helper to get pixel center for a given key on the visual SVG keyboard
  const getKeyCenter = (char: string): { x: number; y: number } | null => {
    const lower = char.toLowerCase();
    for (let r = 0; r < KEYBOARD_ROWS.length; r++) {
      const cIdx = KEYBOARD_ROWS[r].indexOf(lower);
      if (cIdx !== -1) {
        const x = rowOffsets[r] + cIdx * (keyWidth + keyGap) + keyWidth / 2;
        const y = 20 + r * (keyHeight + keyGap) + keyHeight / 2;
        return { x, y };
      }
    }
    // Space bar
    if (char === ' ') {
      return { x: 300, y: 20 + 4 * (keyHeight + keyGap) + keyHeight / 2 };
    }
    return null;
  };

  // Build SVG path points from password sequence
  const pathPoints: { char: string; index: number; x: number; y: number }[] = [];
  for (let i = 0; i < password.length; i++) {
    const center = getKeyCenter(password[i]);
    if (center) {
      pathPoints.push({ char: password[i], index: i, ...center });
    }
  }

  // Active key set for quick highlight lookup
  const activeCharSet = new Set(password.toLowerCase().split(''));

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Keyboard Walk & Turning Complexity
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                f₂ = {keyboardResult.f2Norm.toFixed(4)}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Measures 2D spatial path length L(x) and turn angle deviation T(x)
            </p>
          </div>
        </div>

        {/* Stats Summary Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">L(x):</span>{' '}
            <span className="text-amber-400 font-bold">{keyboardResult.totalDistance.toFixed(2)}</span> u
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">T(x):</span>{' '}
            <span className="text-amber-400 font-bold">{keyboardResult.turningComplexity.toFixed(2)}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">Turns:</span>{' '}
            <span className="text-cyan-400 font-bold">{keyboardResult.turningSteps.length}</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Keyboard Display */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-[700px]">
          <svg viewBox="0 0 720 250" className="w-full h-auto select-none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
              </marker>
              <filter id="keyGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Draw Keyboard Keys */}
            {KEYBOARD_ROWS.map((row, rIdx) =>
              row.map((char, cIdx) => {
                const x = rowOffsets[rIdx] + cIdx * (keyWidth + keyGap);
                const y = 20 + rIdx * (keyHeight + keyGap);
                const isActive = activeCharSet.has(char);
                const coord = KEY_COORDINATES[char] || [0, 0];

                return (
                  <g key={`${rIdx}-${cIdx}`} className="keyboard-key">
                    <rect
                      x={x}
                      y={y}
                      width={keyWidth}
                      height={keyHeight}
                      rx="8"
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'fill-amber-500/20 stroke-amber-400 stroke-2'
                          : 'fill-slate-950/70 stroke-slate-800 hover:stroke-slate-700'
                      }`}
                    />
                    <text
                      x={x + keyWidth / 2}
                      y={y + keyHeight / 2 + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-xs font-mono font-bold uppercase ${
                        isActive ? 'fill-amber-300' : 'fill-slate-400'
                      }`}
                    >
                      {char}
                    </text>
                    {/* Key coordinate watermark */}
                    <text
                      x={x + keyWidth - 6}
                      y={y + keyHeight - 5}
                      textAnchor="end"
                      className="text-[8px] font-mono fill-slate-400"
                    >
                      {coord[0]},{coord[1]}
                    </text>
                  </g>
                );
              })
            )}

            {/* Path lines connecting consecutive keys */}
            {pathPoints.map((pt, idx) => {
              if (idx === pathPoints.length - 1) return null;
              const next = pathPoints[idx + 1];
              const isSelected = selectedStep === idx;

              return (
                <line
                  key={`line-${idx}`}
                  x1={pt.x}
                  y1={pt.y}
                  x2={next.x}
                  y2={next.y}
                  stroke={isSelected ? '#f43f5e' : 'url(#pathGradient)'}
                  strokeWidth={isSelected ? '3.5' : '2.5'}
                  strokeDasharray={isSelected ? 'none' : '4 2'}
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-200"
                />
              );
            })}

            {/* Nodes on path */}
            {pathPoints.map((pt, idx) => (
              <g
                key={`node-${idx}`}
                className="cursor-pointer"
                onClick={() => setSelectedStep(idx)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="10"
                  className={`${
                    idx === 0
                      ? 'fill-cyan-500 stroke-cyan-200'
                      : idx === pathPoints.length - 1
                      ? 'fill-emerald-500 stroke-emerald-200'
                      : 'fill-slate-900 stroke-amber-400'
                  } stroke-2`}
                />
                <text
                  x={pt.x}
                  y={pt.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[9px] font-mono font-bold fill-white pointer-events-none"
                >
                  {idx + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Turning Steps Inspection Table */}
      {keyboardResult.turningSteps.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Directional Turning Angles (θᵢ):
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              T(x) = (1/{keyboardResult.turningSteps.length}) · ∑ (θᵢ / 180°) = {keyboardResult.turningComplexity.toFixed(4)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {keyboardResult.turningSteps.map((turn, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg border text-center transition-all ${
                  turn.thetaDeg >= 170
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : turn.thetaDeg >= 90
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-mono text-xs font-bold">{turn.triplet}</div>
                <div className="text-[11px] font-mono font-semibold">
                  θ = {turn.thetaDeg}°
                </div>
                <div className="text-[9px] text-slate-400 font-mono">
                  cos θ: {turn.cosTheta}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
