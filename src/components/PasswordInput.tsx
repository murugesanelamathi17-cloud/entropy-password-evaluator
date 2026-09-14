import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, RefreshCw, Copy, Check, ShieldAlert, ShieldCheck } from 'lucide-react';
import { FullEvaluationResult } from '../types';
import { BENCHMARK_PRESETS } from '../data/benchmarks';
import { getClassificationColor } from '../core/structuralDeviation';

interface PasswordInputProps {
  password: string;
  setPassword: (val: string) => void;
  result: FullEvaluationResult;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  result,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  const colors = getClassificationColor(result.classification);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRandomStrong = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    let res = '';
    const array = new Uint32Array(16);
    crypto.getRandomValues(array);
    for (let i = 0; i < 16; i++) {
      res += chars[array[i] % chars.length];
    }
    setPassword(res);
  };

  // Percentage for the continuous bar
  const scorePercent = Math.min(100, Math.max(0, result.finalWeightedScore * 100));

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 md:p-6 shadow-xl relative overflow-hidden">
      {/* Glow highlight */}
      <div
        className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: colors.accent }}
      />

      {/* Input Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            Target Password
            <span className="text-xs font-mono font-normal text-slate-400">
              ({password.length} characters)
            </span>
          </label>
          <p className="text-xs text-slate-400">
            Type any password or select a presentation benchmark below
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={generateRandomStrong}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            title="Generate high harmonic random password"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Random Strong
          </button>
          <button
            onClick={handleCopy}
            disabled={!password}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors disabled:opacity-40"
            title="Copy password"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Input Box */}
      <div className="relative mb-5">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to evaluate harmonic signal..."
          className="w-full bg-slate-950/80 border-2 border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3.5 pr-12 font-mono text-base sm:text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner tracking-wider"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-md transition-colors"
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Strength Evaluation Bar & Classification Banner */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Harmonic Strength:
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border flex items-center gap-1.5 ${colors.bg} ${colors.text} ${colors.border}`}
            >
              {result.finalWeightedScore < 0.4 ? (
                <ShieldAlert className="w-3.5 h-3.5" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5" />
              )}
              {result.classification}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">Weighted Score S(x):</span>
            <span className={`text-base font-bold ${colors.text}`}>
              {result.finalWeightedScore.toFixed(4)}
            </span>
            <span className="text-slate-500">/ 1.0000</span>
          </div>
        </div>

        {/* 5-Band Visual Progress Meter */}
        <div className="relative pt-1">
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 flex gap-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500`}
              style={{
                width: `${scorePercent}%`,
                backgroundColor: colors.accent,
                boxShadow: `0 0 12px ${colors.glow}`,
              }}
            />
          </div>

          {/* Scale Labels */}
          <div className="grid grid-cols-5 text-[10px] text-slate-500 font-mono mt-1.5 text-center">
            <span className={result.finalWeightedScore <= 0.2 ? 'text-rose-400 font-bold' : ''}>
              Very weak (0.0-0.2)
            </span>
            <span
              className={
                result.finalWeightedScore > 0.2 && result.finalWeightedScore <= 0.4
                  ? 'text-orange-400 font-bold'
                  : ''
              }
            >
              Weak (0.21-0.4)
            </span>
            <span
              className={
                result.finalWeightedScore > 0.4 && result.finalWeightedScore <= 0.6
                  ? 'text-amber-400 font-bold'
                  : ''
              }
            >
              Moderate (0.41-0.6)
            </span>
            <span
              className={
                result.finalWeightedScore > 0.6 && result.finalWeightedScore <= 0.8
                  ? 'text-cyan-400 font-bold'
                  : ''
              }
            >
              Strong (0.61-0.8)
            </span>
            <span className={result.finalWeightedScore > 0.8 ? 'text-emerald-400 font-bold' : ''}>
              Very strong (0.81-1.0)
            </span>
          </div>
        </div>
      </div>

      {/* Preset Quick-Buttons */}
      <div>
        <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
          <span>Quick Benchmarks:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {BENCHMARK_PRESETS.map((preset) => (
            <button
              key={preset.password}
              onClick={() => setPassword(preset.password)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                password === preset.password
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
