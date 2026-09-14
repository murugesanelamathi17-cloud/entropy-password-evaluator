import React from 'react';
import { X, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

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
              <p className="text-xs text-slate-400">Under the Guidance of Dr. K. Senbagam • By Hariharan P, Harini R M, Madhesh Kumar D</p>
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
          
          {/* Concept Overview */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
            <h3 className="text-sm font-semibold text-cyan-300 mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4" /> The Harmonic Signal Hypothesis
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Instead of treating a password as just a string of random characters, Harmonic Entropy treats it as a 
              <strong> structured signal</strong> — something with a shape, a rhythm, and a path — measured from 
              5 independent angles simultaneously: <code className="text-cyan-300">{'F(X) = (f1, f2, f3, f4, f5)'}</code>.
            </p>
          </div>

          {/* Feature 1 */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-cyan-400 text-sm">{'f1: Rényi Collision Entropy (α = 2)'}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Weight: 22.74% (0.2274)</span>
            </div>
            <p className="text-xs text-slate-400">
              Measures symbol-level collision risk. Shannon entropy (α → 1) artificially rewards rare symbols even in predictable patterns, 
              whereas collision entropy directly reflects attacker guessing collisions:
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'H₂(X) = -log₂( ∑ pᵢ² )'} <br />
              {'f₁,norm = (f₁ - f₁,min) / (f₁,max - f₁,min) = H₂(X) / log₂(n)'}
            </div>
            <div className="text-xs text-slate-400 italic">
              {'Example "ababab": p(a)=0.5, p(b)=0.5 → ∑ pᵢ² = 0.5 → H₂ = 1.00 bits → f₁,norm = 1.0 / log₂(6) ≈ 0.387.'}
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-cyan-400 text-sm">{'f2: Keyboard Layout & Turning Adjacency'}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Weight: 25.06% (0.2506)</span>
            </div>
            <p className="text-xs text-slate-400">
              {'Maps each key to 2D coordinates (e.g. \'a\'=(1,2), \'b\'=(6,3)), computing cumulative walk distance L(x) and turning angle complexity T(x):'}
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'L(x) = ∑ d(pᵢ, pᵢ₊₁)'} <br />
              {'T(x) = (1 / m) ∑ (θᵢ / 180°) where cos θ = (v₁ · v₂) / (|v₁||v₂|)'} <br />
              {'f₂(x) = √(L(x) · T(x)) → f₂,norm = f₂(x) / f₂,max'}
            </div>
            <div className="text-xs text-slate-400 italic">
              {'Example "ababab": L(x) = 25.495, θ = 180° (T=1.0) → f₂(x) = 5.049 → f₂,norm = 5.049 / 63.354 ≈ 0.0728.'}
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-cyan-400 text-sm">{'f3: Higher-Order Markov Cross-Entropy'}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Weight: 30.45% (0.3045)</span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluates transition likelihood under an attacker model trained on leaked passwords (capturing suffixes, syllables, and sequences):
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'P(X₁, ..., Xₙ) = ∏ᵢ₌₁ⁿ P(Xᵢ | Xᵢ₋₁, Xᵢ₋₂, ..., Xᵢ₋ₖ)'} <br />
              {'H_cross = - (1 / n) ∑ log₂ P(Xᵢ | context)'}
            </div>
            <div className="text-xs text-slate-400 italic">
              {'Example "ababab": P(a|ab)=0.95, P(b|ba)=0.96 → High probability / low cross entropy → f₃ = 0.067.'}
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-cyan-400 text-sm">{'f4: Fourier Spectral Flatness'}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Weight: 11.66% (0.1166)</span>
            </div>
            <p className="text-xs text-slate-400">
              Converts characters to ASCII values y(t) and applies Discrete Fourier Transform (DFT). Spectral flatness compares Geometric Mean to Arithmetic Mean:
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'X(k) = ∑ₙ₌₀ᴺ⁻¹ y(n) e^(-j 2π k n / N)'} <br />
              {'Spectral Flatness (SF) = Geometric Mean (|X(k)|) / Arithmetic Mean (|X(k)|)'}
            </div>
            <div className="text-xs text-slate-400 italic">
              {'Periodic sequences collapse GM toward 0 (harmonic peaks) → SF ≈ 0.011 for "ababab".'}
            </div>
          </div>

          {/* Feature 5 */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-cyan-400 text-sm">{'f5: Substring Reuse & Recurrence'}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Weight: 10.09% (0.1009)</span>
            </div>
            <p className="text-xs text-slate-400">
              {'Detects repeated multi-character segments of length |u| >= 2 occurring r_x(u) >= 2 times:'}
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
              {'R(x) = ∑ (r_x(u) - 1) * |u|  for all repeated substrings'} <br />
              {'R_ref(n) = ∑ (k = 2 to n) k * (n - k)'} <br />
              {'f₅ = 1 - min(1, R(x) / R_ref(n))'}
            </div>
            <div className="text-xs text-slate-400 italic">
              {'Example "ababab": R(x) = 16, R_ref(6) = 30 → f₅ = 1 - (16 / 30) ≈ 0.4667.'}
            </div>
          </div>

          {/* Structural Deviation & Weighting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
              <span className="font-semibold text-cyan-400 text-sm">Structural Deviation D(x)</span>
              <p className="text-xs text-slate-400">
                Measures weighted Euclidean distance against the Monte Carlo random reference profile:
              </p>
              <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
                {'D(x) = √( (F(x) - μ_R)ᵀ W (F(x) - μ_R) )'} <br />
                {'μ_R = [13.274, 2.717, 2.8935, 0.018, 0.966]'} <br />
                {'W = diag(0.22, 0.25, 0.30, 0.11, 0.10)'}
              </div>
              <p className="text-xs text-slate-400">
                {'Large D(x) = 80.3671 ("ababab") indicates high predictability and severe structural flaw.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
              <span className="font-semibold text-cyan-400 text-sm">Final Weighted Score & Scale</span>
              <p className="text-xs text-slate-400">
                Inverse variance weights derived from N = 999,994 passwords:
              </p>
              <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-cyan-200 border border-slate-800">
                {'S(x) = ∑ wᵢ fᵢ'} <br />
                {'0.00 - 0.20 : Very weak'} <br />
                {'0.21 - 0.40 : Weak'} <br />
                {'0.41 - 0.60 : Moderate'} <br />
                {'0.61 - 0.80 : Strong'} <br />
                {'0.81 - 1.00 : Very strong'}
              </div>
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
