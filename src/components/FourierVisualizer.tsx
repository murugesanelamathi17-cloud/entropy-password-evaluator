import React from 'react';
import { Waves, Activity, BarChart2 } from 'lucide-react';
import { FourierResult } from '../types';

interface FourierVisualizerProps {
  password: string;
  fourier: FourierResult;
}

export const FourierVisualizer: React.FC<FourierVisualizerProps> = ({
  password,
  fourier,
}) => {
  const maxMag = Math.max(...fourier.components.map((c) => c.magnitude), 1);
  const chartHeight = 130; // px

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/30">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Fourier Spectral Flatness (DFT)
              <span className="text-xs px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 font-mono">
                f₄ = {fourier.f4Score.toFixed(4)}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Discrete Fourier Transform decomposes character ASCII signal into frequency harmonics
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">AM (Avg Mag):</span>{' '}
            <span className="text-pink-400 font-bold">{fourier.arithmeticMean.toFixed(2)}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">GM (Geo Mag):</span>{' '}
            <span className="text-cyan-400 font-bold">{fourier.geometricMean.toFixed(3)}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">Flatness:</span>{' '}
            <span className="text-amber-400 font-bold">{fourier.spectralFlatness.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Frequency Domain Spectrum Bins */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-pink-400" />
            DFT Frequency Magnitude Spectrum |X(k)|:
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            SF = GM / AM = {fourier.spectralFlatness.toFixed(4)}
          </span>
        </div>

        {/* Magnitude Bar Chart */}
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
          <div className="h-[140px] flex items-end gap-1.5 sm:gap-2 px-2 relative">
            {/* AM line indicator */}
            {maxMag > 0 && (
              <div
                className="absolute left-0 right-0 border-b border-dashed border-pink-400/60 z-10 pointer-events-none flex items-center justify-end pr-2"
                style={{
                  bottom: `${Math.min(100, (fourier.arithmeticMean / maxMag) * 100)}%`,
                }}
              >
                <span className="text-[9px] font-mono text-pink-300 bg-slate-950/80 px-1 rounded">
                  AM: {fourier.arithmeticMean.toFixed(1)}
                </span>
              </div>
            )}

            {/* GM line indicator */}
            {maxMag > 0 && (
              <div
                className="absolute left-0 right-0 border-b border-dotted border-cyan-400/60 z-10 pointer-events-none flex items-center justify-end pr-2"
                style={{
                  bottom: `${Math.min(100, (fourier.geometricMean / maxMag) * 100)}%`,
                }}
              >
                <span className="text-[9px] font-mono text-cyan-300 bg-slate-950/80 px-1 rounded">
                  GM: {fourier.geometricMean.toFixed(2)}
                </span>
              </div>
            )}

            {/* Spectrum Bins */}
            {fourier.components.map((comp) => {
              const heightPct = Math.min(100, Math.max(4, (comp.magnitude / maxMag) * 100));
              const isDominant = comp.magnitude > fourier.arithmeticMean;

              return (
                <div
                  key={comp.index}
                  className="flex-1 flex flex-col items-center group relative h-full justify-end"
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-800 text-white text-[10px] font-mono px-2 py-1 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap border border-slate-700">
                    k={comp.index}: |X|={comp.magnitude.toFixed(1)} (Re={comp.re}, Im={comp.im})
                  </div>

                  {/* Magnitude Bar */}
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isDominant
                        ? 'bg-gradient-to-t from-pink-600 to-rose-400 shadow-md shadow-pink-500/20'
                        : 'bg-slate-700/60 hover:bg-slate-600'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />

                  {/* Frequency index label */}
                  <span className="text-[9px] font-mono text-slate-400 mt-1">
                    k={comp.index}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time-Domain ASCII Signal Sequence */}
      <div>
        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          Time-Domain Signal y(t) = ASCII Code Sequence:
        </div>

        <div className="flex flex-wrap gap-1.5">
          {fourier.asciiValues.map((val, i) => (
            <div
              key={i}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center text-center font-mono"
            >
              <span className="text-[10px] text-slate-400">t={i}</span>
              <span className="text-xs font-bold text-white">&apos;{password[i]}&apos;</span>
              <span className="text-[10px] text-pink-400">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
