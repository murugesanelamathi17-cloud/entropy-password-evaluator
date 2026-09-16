# Entropy-Based Password Evaluation System
### Harmonic Entropy & Structural Deviation Theory

**Under the Guidance of:** Dr. K. Senbagam  
**Presented by:** Hariharan P, Harini R M, Madhesh Kumar D

?? **Live Web Application**: [https://murugesanelamathi17-cloud.github.io/entropy-password-evaluator/](https://murugesanelamathi17-cloud.github.io/entropy-password-evaluator/)  
?? **GitHub Source Code**: [https://github.com/murugesanelamathi17-cloud/entropy-password-evaluator](https://github.com/murugesanelamathi17-cloud/entropy-password-evaluator)

---

## ?? Overview
Modern password meters evaluate passwords using checkbox complexity rules (digit, uppercase, symbol, length). This produces false calls in both directions:
- `Password1!` ticks every checkbox but is an early guess for real attacker dictionaries.
- Passphrases like `correct-horse-battery-staple` get penalized merely for missing symbols.

Harmonic Entropy models a password as a **structured signal** measured across multiple independent angles:
1. **$f_1$ - Rényi Collision Entropy ($\alpha = 2$):** $H_2(X) = -\log_2(\sum p_i^2)$ (Weight: 22.74%)
2. **$f_2$ - Keyboard Adjacency & Turning Complexity:** $L(x) = \sum d(p_i, p_{i+1})$, $T(x) = \frac{1}{m}\sum \frac{\theta_i}{180^\circ}$, $f_2(x) = \sqrt{L(x) \cdot T(x)}$ (Weight: 25.06%)
3. **$f_3$ - Higher-Order Markov Cross-Entropy:** 2nd-order Markov model trained on leaked password datasets (Weight: 30.45%)
4. **$f_4$ - Fourier Spectral Flatness:** Discrete Fourier Transform (DFT) on ASCII signals; $\text{SF} = \frac{\text{GM}}{\text{AM}}$ (Weight: 11.66%)
5. **$f_5$ - Substring Reuse & Recurrence:** $R(x) = \sum (r_x(u) - 1)|u|$, $R_{\text{ref}}(n) = \sum_{k=2}^n k(n - k)$ (Weight: 10.09%)

---

## ??? Section 6.1: Corpus-Frequency Gating (A Sixth Signal)
Stress-testing the 5-feature model against the adversarial case **`"password1"`** exposed a fundamental limitation of weighted averaging:
`"password1"` has no keyboard walk ($f_2=0.945$), no DFT periodicity ($f_4=0.940$), no substring repetition ($f_5=1.000$), and moderate entropy ($f_1=0.909$).
In the 5-feature model, it scores **$S_5(x) \approx 0.712$ (Strong)** — a false positive, because benign features dilute the decisive breach signal.

### 6.1.1 Defining $f_6$ / $\phi_6$: Corpus Frequency Rank
$$\phi_6(x) = \frac{\log_{10}(\text{rank}(x))}{\log_{10}(|C|)}$$
Where $|C| = 14,000,000$ (RockYou breach corpus).
For `"password1"`, rank is 5 out of 14,000,000 $\implies \phi_6 \approx 0.098$.

### Candidate Integration Mechanisms:
- **6.1.2 Mechanism A (Additive Extension):**
  $S_{\text{add}}(x) = 0.65 \cdot S_5(x) + 0.35 \cdot \phi_6(x) \implies S_{\text{add}}(\text{"password1"}) \approx \mathbf{0.492}$.
- **6.1.3 Mechanism B (Multiplicative Gate - Recommended):**
  $$S_{\text{gated}}(x) = S_5(x) \cdot \phi_6(x)$$
  For `"password1"`: $0.712 \times 0.098 \approx \mathbf{0.070}$ (**Very weak**).
  Decisively encodes that structural randomness and freedom from known compromise are independent necessary conditions.
- **6.1.4 Mechanism C (Hard Cap):**
  $S_{\text{final}}(x) = \min(S_5(x), 0.05)$ for $\text{rank}(x) \le 100,000 \implies S_{\text{final}}(\text{"password1"}) = \mathbf{0.050}$.

---

## ?? Running the App Locally

### Quick Run
Double-click `start-app.bat` or run:
```bash
npm.cmd run dev
```
Opens automatically on `http://localhost:5173/`.
