import React from 'react';
import { Repeat, Hash, Layers } from 'lucide-react';
import { SubstringResult } from '../types';

interface SubstringMatrixProps {
  password: string;
  substringResult: SubstringResult;
}

export const SubstringMatrix: React.FC<SubstringMatrixProps> = ({
  password,
  substringResult,
}) => {
  const { entries, recurrenceScore, referenceMax, f5Norm } = substringResult;

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Repeat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Substring Reuse & Recurrence
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                f₅ = {f5Norm.toFixed(4)}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Scans all substrings |u| ≥ 2 and penalizes internal repetition: R(x) = ∑ (r_x(u) - 1)|u|
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">R(x):</span>{' '}
            <span className="text-emerald-400 font-bold">{recurrenceScore}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">R_ref(n):</span>{' '}
            <span className="text-cyan-400 font-bold">{referenceMax}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-400">Repeats:</span>{' '}
            <span className="text-amber-400 font-bold">{entries.length}</span>
          </div>
        </div>
      </div>

      {/* Recurrence Table */}
      {entries.length === 0 ? (
        <div className="p-6 text-center bg-slate-950/60 rounded-xl border border-slate-800/80">
          <Layers className="w-8 h-8 text-emerald-500/50 mx-auto mb-2" />
          <p className="text-xs text-slate-300 font-semibold">Zero Substring Recurrence Detected</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            No repeated multi-character patterns found. Maximum internal variation score achieved (f₅ = 1.0000).
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="px-3 py-2.5">Substring (u)</th>
                <th className="px-3 py-2.5">Length |u|</th>
                <th className="px-3 py-2.5">Occurrences r_x(u)</th>
                <th className="px-3 py-2.5">Positions (1-indexed)</th>
                <th className="px-3 py-2.5 text-right">Penalty Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {entries.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-3 py-2 font-bold text-emerald-400">&quot;{item.substring}&quot;</td>
                  <td className="px-3 py-2 text-slate-400">{item.length}</td>
                  <td className="px-3 py-2 font-semibold text-amber-400">{item.count}</td>
                  <td className="px-3 py-2 text-slate-400">{item.positions.join(', ')}</td>
                  <td className="px-3 py-2 text-right font-bold text-rose-400">
                    +({item.count} - 1) × {item.length} = {item.contribution}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-950/90 font-bold border-t border-slate-800 text-slate-200">
              <tr>
                <td colSpan={4} className="px-3 py-2 text-right">
                  Total Recurrence Score R(x):
                </td>
                <td className="px-3 py-2 text-right text-rose-400">{recurrenceScore}</td>
              </tr>
              <tr className="text-slate-400 text-[11px]">
                <td colSpan={4} className="px-3 py-1.5 text-right">
                  f₅ = 1 - min(1, {recurrenceScore} / {referenceMax}):
                </td>
                <td className="px-3 py-1.5 text-right text-emerald-400">
                  {f5Norm.toFixed(4)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
