import React from 'react';
import { Award, ShieldAlert, Cpu, Layers } from 'lucide-react';

export const DocsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title & Guidance Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">
          <Award className="w-4 h-4" /> Research Project Documentation
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Entropy Based Password Evaluation
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          Under the Guidance of <strong className="text-white">Dr. K. Senbagam</strong>
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
          <span className="px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
            Presented by: <strong>Hariharan P</strong>
          </span>
          <span className="px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
            Presented by: <strong>Harini R M</strong>
          </span>
          <span className="px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
            Presented by: <strong>Madhesh Kumar D</strong>
          </span>
        </div>
      </div>

      {/* Section 1: The Core Problem */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          1. Introduction & The Vulnerability of Legacy Password Meters
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Every modern login page has a password strength meter that turns red, yellow, or green. But how much can we actually trust it?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
            <span className="font-bold text-rose-300">The Problem with Checkbox Logic:</span>
            <p className="text-slate-300 leading-relaxed">
              Most meters just check boxes: has a digit, has an uppercase character, has a symbol, and is 8+ characters long.
              This produces bad calls in both directions. <code className="text-rose-300 font-bold">&quot;Password1!&quot;</code> ticks 
              every box and gets rated &quot;Strong&quot; — even though it is one of the very first candidates attacker dictionaries try.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
            <span className="font-bold text-cyan-300">The False Negative Trap:</span>
            <p className="text-slate-300 leading-relaxed">
              Conversely, long, genuinely random multi-word passphrases (e.g. <code className="text-cyan-300 font-bold">&quot;correct-horse-battery-staple&quot;</code>) 
              can get falsely marked weak simply for lacking an arbitrary special symbol, despite offering massive brute-force security.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Harmonic Signal Hypothesis */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          2. The Harmonic Signal Hypothesis
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed italic bg-slate-950 p-4 rounded-xl border border-slate-800">
          &quot;Harmonic Entropy asks a different question: instead of treating a password as just a string of random-looking characters, 
          what if we treated it as a structured signal — something with a shape, a rhythm, a path — and measured it from five independent angles at once?&quot;
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          {'A password x = x₁x₂...xₙ is mapped to a 5-dimensional feature vector: '}
          <code className="text-cyan-300 font-bold ml-1">{'F(X) = (f₁, f₂, f₃, f₄, f₅)'}</code>.
        </p>

        {/* Feature Cards in Docs */}
        <div className="space-y-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-cyan-400">{'f₁: Symbol Level Randomness — Rényi Collision Entropy (α = 2)'}</div>
            <p className="text-slate-400">
              {'Unlike Shannon entropy, Rényi collision entropy H₂(X) = -log₂(∑ pᵢ²) tracks actual collision probability (the likelihood that two independent guesses match), penalizing low-diversity distributions without being misled by isolated rare symbols.'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-amber-400">{'f₂: Keyboard Layout Structure & Turning Complexity'}</div>
            <p className="text-slate-400">
              {'Maps keys to 2D coordinates on a keyboard matrix, calculating spatial walk length L(x) and directional change complexity T(x). Identifies linear keyboard walks (e.g. "qwerty", "123456") where distance is small and turn angles are zero.'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-violet-400">{'f₃: Sequential Periodicity — Higher-Order Markov Models'}</div>
            <p className="text-slate-400">
              {'Utilizes 2nd-order Markov transitions learned from leaked password corpora to calculate conditional probabilities P(Xᵢ | Xᵢ₋₁, Xᵢ₋₂) and joint sequence cross-entropy, detecting dictionary roots, syllable structures, and common prefixes.'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-pink-400">{'f₄: Spectral Periodicity — Discrete Fourier Transform & Flatness'}</div>
            <p className="text-slate-400">
              {'Converts characters to ASCII signals and computes the Discrete Fourier Transform (DFT). Spectral Flatness (SF = Geometric Mean / Arithmetic Mean of frequency magnitudes) differentiates white noise from periodic alternating structures (e.g. "ababab" collapses SF to 0.011).'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-emerald-400">{'f₅: Internal Repetition — Substring Reuse & Recurrence'}</div>
            <p className="text-slate-400">
              {'Extracts all multi-character substrings |u| >= 2 and penalizes duplicate recurrences against a theoretical maximum recurrence envelope R_ref(n) = ∑ (k = 2 to n) k * (n - k).'}
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Weight Derivation & Structural Deviation */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          3. Weight Derivation & Structural Deviation Theory
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-200">Inverse Variance Weighting (N = 999,994):</span>
            <p className="text-slate-400 leading-relaxed">
              Features with lower variance receive higher weights because they are more stable and consistent across the password universe:
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-slate-300">
              <li>• w₁ (Rényi Entropy): <strong>22.74%</strong> (0.2274)</li>
              <li>• w₂ (Keyboard Walk): <strong>25.06%</strong> (0.2506)</li>
              <li>• w₃ (Markov Cross-Entropy): <strong>30.45%</strong> (0.3045)</li>
              <li>• w₄ (Spectral Flatness): <strong>11.66%</strong> (0.1166)</li>
              <li>• w₅ (Substring Reuse): <strong>10.09%</strong> (0.1009)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-200">Structural Deviation Metric D(x):</span>
            <p className="text-slate-400 leading-relaxed">
              Measures the weighted Mahalanobis/Euclidean distance from the Monte Carlo random reference vector μ_R:
            </p>
            <div className="font-mono text-[11px] p-2 bg-slate-900 rounded border border-slate-800 text-cyan-300">
              {'D(x) = √( (F(x) - μ_R)ᵀ W (F(x) - μ_R) )'}
            </div>
            <p className="text-[11px] text-slate-400">
              Passwords with large D(x) strongly deviate from the random reference profile, proving high predictability and structural weakness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
