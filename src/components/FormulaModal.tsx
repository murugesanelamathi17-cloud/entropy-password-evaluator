import React from 'react';
import { X, BookOpen, Layers, CheckCircle2, Database, Flame } from 'lucide-react';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaModal: React.FC<FormulaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Harmonic Entropy Mathematical Specifications</h2>
              <p className="text-xs text-slate-400">Includes Section 6.1 Corpus-Frequency Gating (A Sixth Signal)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto font-sans text-sm text-slate-300">
          
          {/* Section 6.1 HIGHLIGHT BANNER */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/30 to-slate-950 border border-rose-500/30 space-y-2">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              Section 6.1 — Corpus-Frequency Gating: A Sixth Signal
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              The 5-feature model was stress-tested against the adversarial case <code className="text-rose-300 font-bold">&quot;password1&quot;</code>, 
              a string with no keyboard walk (f2), no periodic DFT structure (f4), and no substring repeats (f5) — yet rank #5 in RockYou breach data. 
              Corpus-frequency gating scores a password directly against its breach rank and treats it as an override rather than an averageable term.
            </p>
          </div>

          {/* Section 6.1 Formulas */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-rose-400 text-sm">6.1.1 Defining f6 / f6: Corpus Frequency Rank</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">|C| = 14,000,000</span>
            </div>
            <p className="text-xs text-slate-400">
              Given corpus C sorted by breach frequency, rank(x) = 1 for most common, and rank(x) = |C| for absent passwords:
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-rose-200 border border-slate-800">
              {'f6(x) = log10(rank(x)) / log10(|C|)'} <br />
              {'Approaches 0 for top compromised passwords (weak) and 1 for absent passwords (strong).'}
            </div>
            <div className="text-xs text-slate-400 italic">
              {'Example "password1": rank = 5 out of 14,000,000 ? f6 = log10(5) / log10(14M) = 0.69897 / 7.1461 ˜ 0.098.'}
            </div>

            {/* Mechanisms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
                <span className="font-bold text-amber-300 block mb-1">6.1.2 Mechanism A (Additive)</span>
                <code className="text-[11px] font-mono text-cyan-300 block mb-1">S_add = 0.65·S5 + 0.35·f6</code>
                <p className="text-[11px] text-slate-400">
                  {'Re-weights w6 = 0.35. For "password1": S_add = 0.65(0.712) + 0.35(0.098) ˜ 0.492.'}
                </p>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
                <span className="font-bold text-cyan-300 block mb-1">6.1.3 Mechanism B (Multiplicative)</span>
                <code className="text-[11px] font-mono text-cyan-300 block mb-1">S_gated = S5(x) · f6(x)</code>
                <p className="text-[11px] text-slate-400">
                  {'Recommended decisive override! For "password1": S_gated = 0.712 · 0.098 ˜ 0.070.'}
                </p>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
                <span className="font-bold text-rose-300 block mb-1">6.1.4 Mechanism C (Hard Cap)</span>
                <code className="text-[11px] font-mono text-cyan-300 block mb-1">{'S_final = min(S5, 0.05)'}</code>
                <p className="text-[11px] text-slate-400">
                  {'Caps at t = 0.05 if rank = 100,000. For "password1" (rank 5): capped directly to 0.05.'}
                </p>
              </div>
            </div>
          </div>

          {/* Features 1 to 5 */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-400 text-sm">f1: Rényi Collision Entropy (a = 2)</span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'H2(X) = -log2( ? p?² )'} <br />
              {'f1,norm = H2(X) / log2(n)'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-400 text-sm">f2: Keyboard Layout & Turning Adjacency</span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'L(x) = ? d(p?, p??1)'} <br />
              {'T(x) = (1 / m) ? (?? / 180°) where cos ? = (v1 · v2) / (|v1||v2|)'} <br />
              {'f2(x) = v(L(x) · T(x)) ? f2,norm = f2(x) / f2,max'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-400 text-sm">f3: Higher-Order Markov Cross-Entropy</span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'P(X1, ..., X?) = ???1n P(X? | X??1, X??2, ..., X???)'} <br />
              {'H_cross = - (1 / n) ? log2 P(X? | context)'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-400 text-sm">f4: Fourier Spectral Flatness</span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'X(k) = ???0??¹ y(n) e^(-j 2p k n / N)'} <br />
              {'Spectral Flatness (SF) = Geometric Mean (|X(k)|) / Arithmetic Mean (|X(k)|)'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-400 text-sm">f5: Substring Reuse & Recurrence</span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'R(x) = ? (r_x(u) - 1) * |u|'} <br />
              {'R_ref(n) = ? (k = 2 to n) k * (n - k)'} <br />
              {'f5 = 1 - min(1, R(x) / R_ref(n))'}
            </div>
          </div>

          {/* Structural Deviation */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-400 text-sm">Structural Deviation D(x)</span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'D(x) = v( (F(x) - µ_R)? W (F(x) - µ_R) )'} <br />
              {'µ_R = [13.274, 2.717, 2.8935, 0.018, 0.966]'} <br />
              {'W = diag(0.22, 0.25, 0.30, 0.11, 0.10)'}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Got it
          </button>
        </div>

      </div>
    </div>
  );
};
