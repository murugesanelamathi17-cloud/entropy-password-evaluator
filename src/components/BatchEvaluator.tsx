import React, { useState } from 'react';
import { KeyRound, Download, Play, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { evaluatePassword } from '../core/evaluator';
import { FullEvaluationResult } from '../types';
import { BENCHMARK_PRESETS } from '../data/benchmarks';
import { getClassificationColor } from '../core/structuralDeviation';

export const BatchEvaluator: React.FC = () => {
  const defaultList = BENCHMARK_PRESETS.map((p) => p.password).join('\n') + '\n12345678\nMyP@ssw0rd2024!\ncorrect-horse-battery-staple';
  const [inputText, setInputText] = useState(defaultList);
  const [results, setResults] = useState<FullEvaluationResult[]>(() => {
    return defaultList
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
      .map((p) => evaluatePassword(p));
  });

  const handleRunBatch = () => {
    const list = inputText
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const evaluated = list.map((pwd) => evaluatePassword(pwd));
    setResults(evaluated);
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;

    const headers = [
      'Password',
      'Length',
      'f1_Renyi',
      'f2_Keyboard',
      'f3_Markov',
      'f4_Fourier',
      'f5_Substring',
      'WeightedScore_S(x)',
      'Classification',
      'StructuralDeviation_D(x)',
    ];

    const rows = results.map((r) => [
      `"${r.password.replace(/"/g, '""')}"`,
      r.password.length,
      r.features.f1_renyi.toFixed(4),
      r.features.f2_keyboard.toFixed(4),
      r.features.f3_markov.toFixed(4),
      r.features.f4_fourier.toFixed(4),
      r.features.f5_substring.toFixed(4),
      r.finalWeightedScore.toFixed(4),
      `"${r.classification}"`,
      r.deviation.deviationDistance.toFixed(4),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'harmonic_entropy_evaluation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Batch Password Evaluation & Comparison</h3>
              <p className="text-xs text-slate-400">
                Paste a list of candidate passwords (one per line) to evaluate and compare them simultaneously
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunBatch}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Evaluate Batch
            </button>
            <button
              onClick={handleExportCSV}
              disabled={results.length === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Input Textarea */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Password Input List:
          </label>
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-600"
            placeholder="Enter one password per line..."
          />
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="px-3 py-2.5">#</th>
                <th className="px-3 py-2.5">Password</th>
                <th className="px-3 py-2.5 text-center">f₁ (Rényi)</th>
                <th className="px-3 py-2.5 text-center">f₂ (Keys)</th>
                <th className="px-3 py-2.5 text-center">f₃ (Markov)</th>
                <th className="px-3 py-2.5 text-center">f₄ (Fourier)</th>
                <th className="px-3 py-2.5 text-center">f₅ (Substr)</th>
                <th className="px-3 py-2.5 text-center">Score S(x)</th>
                <th className="px-3 py-2.5 text-center">Tier</th>
                <th className="px-3 py-2.5 text-right">Deviation D(x)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {results.map((res, i) => {
                const colors = getClassificationColor(res.classification);
                return (
                  <tr key={i} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-3 py-2 text-slate-400">{i + 1}</td>
                    <td className="px-3 py-2 font-bold text-white max-w-[180px] truncate">
                      {res.password}
                    </td>
                    <td className="px-3 py-2 text-center text-cyan-400">
                      {res.features.f1_renyi.toFixed(3)}
                    </td>
                    <td className="px-3 py-2 text-center text-amber-400">
                      {res.features.f2_keyboard.toFixed(3)}
                    </td>
                    <td className="px-3 py-2 text-center text-violet-400">
                      {res.features.f3_markov.toFixed(3)}
                    </td>
                    <td className="px-3 py-2 text-center text-pink-400">
                      {res.features.f4_fourier.toFixed(3)}
                    </td>
                    <td className="px-3 py-2 text-center text-emerald-400">
                      {res.features.f5_substring.toFixed(3)}
                    </td>
                    <td className="px-3 py-2 text-center font-bold">
                      <span className={`px-2 py-0.5 rounded font-mono ${colors.text} ${colors.bg}`}>
                        {res.finalWeightedScore.toFixed(4)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {res.classification}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-slate-200">
                      {res.deviation.deviationDistance.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
