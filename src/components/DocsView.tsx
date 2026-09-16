import React from 'react';
import { Award, ShieldAlert, Cpu, Layers, Database, Flame, CheckCircle2 } from 'lucide-react';

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

      {/* NEW: Section 6.1 Feature Spotlight */}
      <div className="bg-slate-900/95 rounded-2xl border border-rose-500/30 p-6 shadow-2xl space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              6.1 Corpus-Frequency Gating: A Sixth Signal
            </h3>
            <span className="text-xs text-rose-300 font-mono">
              Overcoming the Five-Feature Dilution Limitation on Adversarial Candidates
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The five-feature model of Sections 4–6 was stress-tested against a deliberately adversarial case: the password 
          <code className="text-rose-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-rose-500/30 ml-1 mr-1">&quot;password1&quot;</code>, 
          a string with no keyboard-walk pattern (f2 = 0.945), no periodic structure (f4 = 0.940), no internal substring repetition (f5 = 1.000), 
          and only moderately low character entropy (f1 = 0.909) — yet one of the most frequently occurring passwords in every major real-world breach corpus. 
          This case exposes a structural limitation of the weighted-average combination in Section 6: <strong>a signal that only one of five features can detect 
          gets diluted by the other four, even when that one signal is decisive on its own.</strong>
        </p>

        <p className="text-sm text-slate-300 leading-relaxed">
          The concept that closes this gap is <strong>corpus-frequency gating</strong> — scoring a password directly against its observed rank 
          in a real leaked-password corpus, and treating that signal as an <strong>override rather than as one more term to be averaged in</strong>. 
          This defines the sixth feature, f6, and two candidate mechanisms for incorporating it: an additive extension consistent with Section 6, 
          and a multiplicative gate that better reflects how decisively a known-compromised password should be flagged.
        </p>

        {/* 6.1.1 */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <h4 className="text-sm font-bold text-rose-300">6.1.1 Defining f6: Corpus Frequency Rank</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {'Given a large reference corpus C of real leaked passwords (for example, a RockYou-scale breach dataset with |C| = 14,000,000), let rank(x) denote the position of x when the corpus is sorted from most to least frequently occurring. A password that is the single most common entry in C has rank(x) = 1; a password absent from C is treated as having rank(x) = |C| (maximally rare under the reference distribution). The normalized feature is defined as:'}
          </p>
          <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-rose-200 border border-slate-800">
            {'f6(x) = log10(rank(x)) / log10(|C|)'}
          </div>
          <p className="text-xs text-slate-400">
            {'so that f6(x) approaches 0 for passwords near the top of the breach-frequency distribution (weak) and approaches 1 for passwords absent from or very rare within the corpus (strong), consistent with the [0, 1], higher-is-stronger convention used by f1 through f5.'}
          </p>
        </div>

        {/* 6.1.2 Mechanism A */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <h4 className="text-sm font-bold text-amber-300">6.1.2 Mechanism A — Additive Extension</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {'The simplest incorporation folds f6 into the existing weighted sum from Section 6 as a sixth term, redistributing the weights so they still sum to one. Using the illustrative feature values established for "password1" in Section 9 — f1 = 0.909, f2 = 0.945, f3 = 0.149, f4 = 0.940, f5 = 1.000 — and an illustrative corpus rank of 5 out of 14,000,000 unique passwords, f6 evaluates to approximately 0.098.'}
          </p>
          <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-amber-200 border border-slate-800">
            {'S_add(x) = 0.65 · S5(x) + 0.35 · f6(x)  ?  0.65(0.712) + 0.35(0.098) ˜ 0.492'}
          </div>
          <p className="text-xs text-slate-400">
            {'This is a meaningful improvement, but the score still does not clearly communicate that "password1" is one of the most compromised strings in existence — because an average, by construction, can never be pulled below the influence of its other terms, however low any single term goes.'}
          </p>
        </div>

        {/* 6.1.3 Mechanism B */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <h4 className="text-sm font-bold text-cyan-300">6.1.3 Mechanism B — Multiplicative Gate (Recommended)</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {'A more decisive alternative treats f6 not as a sixth addend but as a multiplier applied to the five-feature score S(x) computed in Section 6:'}
          </p>
          <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-cyan-200 border border-slate-800">
            {'S_gated(x) = S5(x) · f6(x)  ?  0.712 · 0.098 ˜ 0.070  (Very weak)'}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Applied to the same worked values, S_gated(x) = 0.712 × 0.098 ˜ 0.070 — a result that correctly reflects the password&apos;s real-world weakness far more decisively than the additive extension. The multiplicative form encodes a specific and defensible modeling claim: <strong>structural randomness (what f1–f5 measure) and freedom from known compromise (what f6 measures) are not interchangeable, fungible evidence that should be averaged together</strong> — they are closer to independent necessary conditions, and a password that fails badly on either one should not be rescued by scoring well on the other.
          </p>
          <p className="text-xs text-slate-400">
            This mirrors the geometric intuition established in Section 5: structural deviation D(x) measures distance from a random-password profile, while f6 measures distance from a known-compromised profile, and conflating the two into a single linear combination discards exactly the information that matters most when they disagree.
          </p>
        </div>

        {/* 6.1.4 Mechanism C */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <h4 className="text-sm font-bold text-rose-400">6.1.4 Mechanism C — Hard Cap</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            A third, more conservative mechanism avoids modifying the continuous score at all and instead imposes a ceiling: if a password&apos;s corpus rank falls within some threshold N (e.g., the top 100,000 most frequently observed passwords), its final reported score is capped at a low value t regardless of how well it scores on f1 through f5:
          </p>
          <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-rose-200 border border-slate-800">
            {'S_final(x) = min(S5(x), t)  if rank(x) = N,  else S5(x)'}
          </div>
          <p className="text-xs text-slate-400">
            With t = 0.05 and N = 100,000, &quot;password1&quot; (illustrative rank 5) is capped directly to S_final(x) = 0.05. This is the mechanism closest to how blocklist-based checks operate in deployed meters such as the CHI 2017 data-driven meter, combining a learned model with an explicit heuristic override.
          </p>
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
          {'A password x = x1x2...x? is mapped to a multi-dimensional feature vector: '}
          <code className="text-cyan-300 font-bold ml-1">{'F(X) = (f1, f2, f3, f4, f5, f6)'}</code>.
        </p>

        {/* Feature Cards in Docs */}
        <div className="space-y-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-cyan-400">{'f1: Symbol Level Randomness — Rényi Collision Entropy (a = 2)'}</div>
            <p className="text-slate-400">
              {'Unlike Shannon entropy, Rényi collision entropy H2(X) = -log2(? p?²) tracks actual collision probability, penalizing low-diversity distributions without being misled by isolated rare symbols.'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-amber-400">{'f2: Keyboard Layout Structure & Turning Complexity'}</div>
            <p className="text-slate-400">
              {'Maps keys to 2D coordinates on a keyboard matrix, calculating spatial walk length L(x) and directional change complexity T(x). Identifies linear keyboard walks (e.g. "qwerty", "123456").'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-violet-400">{'f3: Sequential Periodicity — Higher-Order Markov Models'}</div>
            <p className="text-slate-400">
              {'Utilizes 2nd-order Markov transitions learned from leaked password corpora to calculate conditional probabilities P(X? | X??1, X??2) and joint sequence cross-entropy.'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-pink-400">{'f4: Spectral Periodicity — Discrete Fourier Transform & Flatness'}</div>
            <p className="text-slate-400">
              {'Converts characters to ASCII signals and computes the Discrete Fourier Transform (DFT). Spectral Flatness differentiates white noise from periodic alternating structures.'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-emerald-400">{'f5: Internal Repetition — Substring Reuse & Recurrence'}</div>
            <p className="text-slate-400">
              {'Extracts all multi-character substrings |u| >= 2 and penalizes duplicate recurrences against a theoretical maximum recurrence envelope R_ref(n) = ? (k = 2 to n) k * (n - k).'}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-rose-400">{'f6: Breach Corpus Frequency Gating'}</div>
            <p className="text-slate-400">
              {'Evaluates logarithmic rank in real breach corpora (|C| = 14M) to ensure known compromised passwords cannot be rescued by favorable structural scores.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
