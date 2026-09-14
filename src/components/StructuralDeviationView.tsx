import React from 'react';
import { Target, Cpu, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { FullEvaluationResult } from '../types';

interface StructuralDeviationViewProps {
  result: FullEvaluationResult;
}

export const StructuralDeviationView: React.FC<StructuralDeviationViewProps> = ({ result }) => {
  const { deviation, finalWeightedScore, features, classification } = result;

  // 5 axes names for radar chart
  const axes = [
    { name: 'f1: Rényi Entropy', key: 'f1' },
    { name: 'f2: Keyboard Walk', key: 'f2' },
    { name: 'f3: Markov Model', key: 'f3' },
    { name: 'f4: Fourier Flatness', key: 'f4' },
    { name: 'f5: Substring Recurrence', key: 'f5' },
  ];

  // Radar chart dimensions
  const size = 260;
  const center = size / 2;
  const radius = 95;

  // Polar coordinate helper
  const getCoordinates = (index: number, total: number, val: number) => {
    // angle in radians, starting from top (-PI / 2)
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const r = Math.min(1, Math.max(0, val)) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build polygon points for evaluated password (values 0-1)
  const passwordVals = [
    features.f1_renyi,
    features.f2_keyboard,
    features.f3_markov,
    features.f4_fourier,
    features.f5_substring,
  ];

  const passwordPoints = passwordVals
    .map((v, i) => {
      const { x, y } = getCoordinates(i, 5, v);
      return `${x},${y}`;
    })
    .join(' ');

  // Ideal random baseline polygon (normalized representation)
  const randomRefVals = [0.95, 0.85, 0.90, 0.88, 0.96];
  const refPoints = randomRefVals
    .map((v, i) => {
      const { x, y } = getCoordinates(i, 5, v);
      return `${x},${y}`;
    })
    .join(' ');

  const isPredictable = deviation.deviationDistance > 40;

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Structural Deviation Theory
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                D(x) = {deviation.deviationDistance.toFixed(4)}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Measures distance from Monte Carlo random reference distribution: D(x) = √( (F(x) - μ_R)ᵀ W (F(x) - μ_R) )
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
              isPredictable
                ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            }`}
          >
            {isPredictable ? (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            )}
            {isPredictable ? 'High Deviation (Predictable)' : 'Low Deviation (Random)'}
          </div>
        </div>
      </div>

      {/* Grid: Radar Chart + Matrix Math Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: 5-Axis Radar Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            5-Dimensional Feature Radar:
          </div>

          <svg width={size} height={size} className="select-none overflow-visible">
            {/* Background concentric rings */}
            {[0.25, 0.5, 0.75, 1.0].map((level, idx) => (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius * level}
                fill="none"
                stroke="#334155"
                strokeDasharray={level === 1.0 ? 'none' : '2 2'}
                strokeWidth={level === 1.0 ? '1.5' : '1'}
                opacity={0.5}
              />
            ))}

            {/* Spokes from center to vertices */}
            {axes.map((_, i) => {
              const { x, y } = getCoordinates(i, 5, 1.0);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#334155"
                  strokeWidth="1"
                  opacity={0.6}
                />
              );
            })}

            {/* Reference Random Baseline Polygon */}
            <polygon
              points={refPoints}
              fill="rgba(148, 163, 184, 0.12)"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Evaluated Password Polygon */}
            <polygon
              points={passwordPoints}
              fill={isPredictable ? 'rgba(244, 63, 94, 0.25)' : 'rgba(56, 189, 248, 0.25)'}
              stroke={isPredictable ? '#f43f5e' : '#38bdf8'}
              strokeWidth="2.5"
            />

            {/* Vertex dots */}
            {passwordVals.map((v, i) => {
              const { x, y } = getCoordinates(i, 5, v);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={isPredictable ? '#f43f5e' : '#38bdf8'}
                  stroke="#0b0f19"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Axis Labels */}
            {axes.map((axis, i) => {
              const { x, y } = getCoordinates(i, 5, 1.25);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[9px] font-mono font-bold fill-slate-300"
                >
                  {axis.key.toUpperCase()}
                </text>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
              <span>Password F(x)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 border-t border-dashed border-slate-400" />
              <span>Random Baseline μ_R</span>
            </div>
          </div>
        </div>

        {/* Right: Matrix Step-by-Step Breakdown */}
        <div className="lg:col-span-7 space-y-3 text-xs font-mono">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-cyan-300">
              1. Monte Carlo Reference Distribution μ_R:
            </div>
            <div className="text-[10px] text-slate-400 overflow-x-auto py-1 bg-slate-900/60 px-2 rounded border border-slate-800/80">
              μ_R = [{deviation.muR.map((v) => v.toFixed(3)).join(', ')}]
            </div>

            <div className="text-[11px] font-bold text-cyan-300 pt-1">
              2. Password Feature Vector F(x):
            </div>
            <div className="text-[10px] text-slate-400 overflow-x-auto py-1 bg-slate-900/60 px-2 rounded border border-slate-800/80">
              F(x) = [{deviation.fx.map((v) => v.toFixed(4)).join(', ')}]
            </div>

            <div className="text-[11px] font-bold text-cyan-300 pt-1">
              3. Vector Difference (F(x) - μ_R):
            </div>
            <div className="text-[10px] text-slate-400 overflow-x-auto py-1 bg-slate-900/60 px-2 rounded border border-slate-800/80">
              Δ = [{deviation.diff.map((v) => v.toFixed(4)).join(', ')}]
            </div>

            <div className="text-[11px] font-bold text-cyan-300 pt-1">
              4. Weight Matrix W = diag(0.22, 0.25, 0.30, 0.11, 0.10):
            </div>
            <div className="text-[10px] text-slate-300 py-1 flex items-center justify-between border-t border-slate-800/80">
              <span>(F(x) - μ_R)ᵀ · W · (F(x) - μ_R):</span>
              <span className="font-bold text-amber-400">
                {deviation.weightedVarianceSum.toFixed(4)}
              </span>
            </div>
            <div className="text-[10px] text-slate-300 py-1 flex items-center justify-between border-t border-slate-800/80">
              <span className="font-bold text-white">Deviation Distance D(x):</span>
              <span className="text-sm font-bold text-cyan-400">
                {deviation.deviationDistance.toFixed(4)}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            <strong>Conclusion:</strong> {isPredictable ? (
              <span className="text-rose-300">
                Large deviation from random reference profile confirms a highly predictable, vulnerable password structure.
              </span>
            ) : (
              <span className="text-emerald-300">
                Low deviation indicates the feature profile closely mirrors an ideal, mathematically random password.
              </span>
            )}
          </p>
        </div>

      </div>
    </div>
  );
};
