import React from 'react';
import { Database, ShieldAlert, Sparkles, Sliders, CheckCircle2, Lock, Flame } from 'lucide-react';
import { FullEvaluationResult, GatingMechanism } from '../types';

interface CorpusGatingViewProps {
  result: FullEvaluationResult;
  mechanism: GatingMechanism;
  setMechanism: (m: GatingMechanism) => void;
}

export const CorpusGatingView: React.FC<CorpusGatingViewProps> = ({
  result,
  mechanism,
  setMechanism,
}) => {
  const { corpusGating, s5BaselineScore, password } = result;
  const { rank, corpusSize, phi6, mechanismA_additive, mechanismB_multiplicative, mechanismC_hardCap, isCompromised, breachTier } = corpusGating;

  const mechanisms: {
    id: GatingMechanism;
    title: string;
    section: string;
    score: number;
    description: string;
    isRecommended?: boolean;
    badge: string;
    badgeColor: string;
  }[] = [
    {
      id: 'multiplicative',
      title: 'Mechanism B: Multiplicative Gate',
      section: 'Section 6.1.3',
      score: mechanismB_multiplicative,
      description: 'Applies f6 directly as an independent multiplier: S_gated(x) = S5(x) · f6(x). Decisively eliminates false positives for known-compromised passwords.',
      isRecommended: true,
      badge: 'Decisive Override',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    },
    {
      id: 'additive',
      title: 'Mechanism A: Additive Extension',
      section: 'Section 6.1.2',
      score: mechanismA_additive,
      description: 'Folds f6 into the weighted sum with w6 = 0.35, proportionally scaling the other 5 features by 0.65. Moves "password1" from 0.712 to 0.492.',
      badge: 'Weighted Average',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'hardCap',
      title: 'Mechanism C: Hard Cap',
      section: 'Section 6.1.4',
      score: mechanismC_hardCap,
      description: 'Imposes a strict ceiling t = 0.05 if rank = 100,000. Closest to production blocklist overrides (e.g. CHI 2017 meter) with O(1) cutoff.',
      badge: 'Blocklist Override',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    },
    {
      id: 'baseline',
      title: 'Original 5-Feature Baseline',
      section: 'Section 6 Baseline',
      score: s5BaselineScore,
      description: 'Linear combination of f1 through f5 without corpus gating. Vulnerable to dilution by benign features on dictionary words like "password1".',
      badge: 'Vulnerable to Dilution',
      badgeColor: 'bg-slate-800 text-slate-400 border-slate-700',
    },
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-red-500/10 text-rose-400 border border-rose-500/30">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Section 6.1 — Corpus-Frequency Gating: A Sixth Signal
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30">
                f6 = {phi6.toFixed(4)}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluates rank in |C| = 14,000,000 breach corpus to close the &quot;password1&quot; dilution vulnerability
            </p>
          </div>
        </div>

        {/* Breach Status Banner */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 ${
              isCompromised
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}
          >
            {isCompromised ? <Flame className="w-4 h-4 text-rose-400 animate-pulse" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            <div>
              <span className="font-bold">
                {isCompromised ? `Corpus Rank: #${rank.toLocaleString()}` : 'Absent from Breach Corpus'}
              </span>
              <span className="text-[10px] block opacity-80">{breachTier}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Adversarial Case Callout (password1) */}
      {password === 'password1' && (
        <div className="mb-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <ShieldAlert className="w-4 h-4" />
            Adversarial Benchmark Case: &quot;password1&quot;
          </div>
          <p className="text-slate-300 leading-relaxed">
            &quot;password1&quot; has no keyboard walk (f2 = 0.945), no Fourier periodicity (f4 = 0.940), no substring repeats (f5 = 1.000), 
            and moderate entropy (f1 = 0.909). In the 5-feature model, it scores <strong className="text-rose-400">S5(x) = 0.712 (Strong)</strong> — a dangerous false positive! 
            Corpus-Frequency Gating detects its top breach rank (<strong className="text-amber-300">#5 of 14,000,000</strong>, f6 = 0.098) and decisively collapses the score to <strong className="text-emerald-400">0.070 (Very weak)</strong> via Mechanism B.
          </p>
        </div>
      )}

      {/* Formula 6.1.1 Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-slate-400 text-[11px] block mb-1">6.1.1 Corpus Rank:</span>
          <span className="text-white font-bold text-base">#{rank.toLocaleString()}</span>
          <span className="text-slate-500 text-[10px] block mt-0.5">out of 14,000,000 entries</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-slate-400 text-[11px] block mb-1">Normalized Signal f6(x):</span>
          <span className="text-cyan-400 font-bold text-base">{phi6.toFixed(4)}</span>
          <span className="text-slate-500 text-[10px] block mt-0.5">log10(rank) / log10(|C|)</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-slate-400 text-[11px] block mb-1">Active Gated Score:</span>
          <span className="text-emerald-400 font-bold text-base">{result.finalWeightedScore.toFixed(4)}</span>
          <span className="text-slate-500 text-[10px] block mt-0.5 capitalize">{mechanism} Mode</span>
        </div>
      </div>

      {/* Mechanism Comparison Selector */}
      <div>
        <div className="text-xs font-semibold text-slate-300 mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Select Integration Mechanism (Live Override):
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Click any card to switch active meter behavior
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mechanisms.map((m) => {
            const isSelected = mechanism === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setMechanism(m.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{m.title}</span>
                    {m.isRecommended && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40">
                        Recommended
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${m.badgeColor}`}>
                    {m.badge}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {m.description}
                </p>

                <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-500">{m.section} Score:</span>
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-base font-bold text-cyan-300">{m.score.toFixed(4)}</span>
                    <span className="text-[10px] text-slate-500">/ 1.0000</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
