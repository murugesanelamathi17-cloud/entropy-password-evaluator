import React from 'react';
import { Sparkles, Keyboard, GitBranch, Waves, Repeat } from 'lucide-react';
import { FullEvaluationResult } from '../types';

interface FeatureSummaryCardsProps {
  result: FullEvaluationResult;
}

export const FeatureSummaryCards: React.FC<FeatureSummaryCardsProps> = ({ result }) => {
  const { features, weights, renyi, keyboard, markov, fourier, substring } = result;

  const cards = [
    {
      id: 'f1',
      name: 'Rényi Collision Entropy',
      symbol: 'f₁',
      icon: Sparkles,
      color: 'from-blue-500/20 to-cyan-500/10 text-cyan-400 border-cyan-500/30',
      barColor: 'bg-cyan-400',
      weight: '22.74%',
      weightNum: weights.w1,
      score: features.f1_renyi,
      contribution: features.f1_renyi * weights.w1,
      formula: 'H₂(X) = -log₂(∑ pᵢ²)',
      rawLabel: `H₂ = ${renyi.h2Raw.toFixed(2)} bits`,
      details: `${renyi.uniqueChars} unique chars / max ${renyi.h2Max.toFixed(2)} bits`,
    },
    {
      id: 'f2',
      name: 'Keyboard Adjacency & Turns',
      symbol: 'f₂',
      icon: Keyboard,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
      barColor: 'bg-amber-400',
      weight: '25.06%',
      weightNum: weights.w2,
      score: features.f2_keyboard,
      contribution: features.f2_keyboard * weights.w2,
      formula: 'f₂(x) = √(L(x) · T(x))',
      rawLabel: `L = ${keyboard.totalDistance.toFixed(1)}u, T = ${keyboard.turningComplexity.toFixed(2)}`,
      details: `${keyboard.steps.length} steps, ${keyboard.turningSteps.length} turns computed`,
    },
    {
      id: 'f3',
      name: 'Markov Cross-Entropy',
      symbol: 'f₃',
      icon: GitBranch,
      color: 'from-violet-500/20 to-purple-500/10 text-violet-400 border-violet-500/30',
      barColor: 'bg-violet-400',
      weight: '30.45%',
      weightNum: weights.w3,
      score: features.f3_markov,
      contribution: features.f3_markov * weights.w3,
      formula: 'P(X) = ∏ P(Xᵢ | Xᵢ₋₁, Xᵢ₋₂)',
      rawLabel: `H_cross = ${markov.crossEntropy.toFixed(2)} b/c`,
      details: `Joint P(x) = ${markov.jointProbability}`,
    },
    {
      id: 'f4',
      name: 'Fourier Spectral Flatness',
      symbol: 'f₄',
      icon: Waves,
      color: 'from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30',
      barColor: 'bg-pink-400',
      weight: '11.66%',
      weightNum: weights.w4,
      score: features.f4_fourier,
      contribution: features.f4_fourier * weights.w4,
      formula: 'SF = GM(|X(k)|) / AM(|X(k)|)',
      rawLabel: `SF = ${fourier.spectralFlatness.toFixed(4)}`,
      details: `AM = ${fourier.arithmeticMean.toFixed(1)}, GM = ${fourier.geometricMean.toFixed(2)}`,
    },
    {
      id: 'f5',
      name: 'Substring Recurrence',
      symbol: 'f₅',
      icon: Repeat,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
      barColor: 'bg-emerald-400',
      weight: '10.09%',
      weightNum: weights.w5,
      score: features.f5_substring,
      contribution: features.f5_substring * weights.w5,
      formula: 'f₅ = 1 - R(x) / R_ref(n)',
      rawLabel: `R(x) = ${substring.recurrenceScore}`,
      details: `Ref max R_ref = ${substring.referenceMax} (${substring.entries.length} repeats)`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const percent = Math.min(100, Math.max(0, card.score * 100));

        return (
          <div
            key={card.id}
            className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
          >
            {/* Top row: Symbol and Weight */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg border bg-gradient-to-br ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono font-bold text-sm text-white">
                    {card.symbol}
                  </span>
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  w: {card.weight}
                </div>
              </div>

              <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">
                {card.name}
              </h4>
              <p className="font-mono text-[11px] text-slate-400 mb-3 line-clamp-1">
                {card.formula}
              </p>
            </div>

            {/* Score & Progress */}
            <div className="space-y-2 mt-auto pt-2 border-t border-slate-800/80">
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold font-mono text-white">
                  {card.score.toFixed(4)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  +{card.contribution.toFixed(4)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${card.barColor}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                <span className="truncate">{card.rawLabel}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
