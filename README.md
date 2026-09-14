# Entropy-Based Password Evaluation System
### Harmonic Entropy & Structural Deviation Theory

**Under the Guidance of:** Dr. K. Senbagam  
**Presented by:** Hariharan P, Harini R M, Madhesh Kumar D

?? **Live Web Application**: [https://murugesanelamathi17-cloud.github.io/entropy-password-evaluator/](https://murugesanelamathi17-cloud.github.io/entropy-password-evaluator/)  
?? **GitHub Source Code**: [https://github.com/murugesanelamathi17-cloud/entropy-password-evaluator](https://github.com/murugesanelamathi17-cloud/entropy-password-evaluator)

---

## ?? Overview
Modern password complexity meters (such as 8+ characters, digits, uppercase, special symbols) suffer from critical vulnerabilities:
1. **False Positives:** `Password1!` ticks every checkbox and gets marked "Strong", even though it is one of the first candidates tested by attacker dictionary attacks.
2. **False Negatives:** Multi-word passphrases like `correct-horse-battery-staple` can get marked weak just for lacking an arbitrary special character.

**Harmonic Entropy** evaluates passwords as **structured signals** across 5 independent dimensions $F(X) = (f_1, f_2, f_3, f_4, f_5)$:
1. **$f_1$ - Rényi Collision Entropy ($\alpha = 2$):** $H_2(X) = -\log_2(\sum p_i^2)$ (Weight: **22.74%**)
2. **$f_2$ - Keyboard Adjacency & Turning Complexity:** $L(x) = \sum d(p_i, p_{i+1})$, $T(x) = \frac{1}{m}\sum \frac{\theta_i}{180^\circ}$, $f_2(x) = \sqrt{L(x) \cdot T(x)}$ (Weight: **25.06%**)
3. **$f_3$ - Higher-Order Markov Cross-Entropy:** 2nd-order Markov model trained on leaked password datasets (Weight: **30.45%**)
4. **$f_4$ - Fourier Spectral Flatness:** Discrete Fourier Transform (DFT) on ASCII signals; $\text{SF} = \frac{\text{GM}}{\text{AM}}$ (Weight: **11.66%**)
5. **$f_5$ - Substring Reuse & Recurrence:** $R(x) = \sum (r_x(u) - 1)|u|$, $R_{\text{ref}}(n) = \sum_{k=2}^n k(n - k)$ (Weight: **10.09%**)

### Dual Evaluation Outputs:
- **Weighted Harmonic Score $S(x)$:** $\sum_{i=1}^5 w_i f_i$ mapped to 5 strength bands (`Very weak`, `Weak`, `Moderate`, `Strong`, `Very strong`).
- **Structural Deviation Theory $D(x)$:** $\sqrt{(F(x) - \mu_R)^T W (F(x) - \mu_R)}$ measuring distance from the Monte Carlo random password reference vector.

---

## ?? How to Run the App

### Option A: Double-Click Launcher (Windows)
Double-click `start-app.bat` in this folder. It will launch the Vite development server and open `http://localhost:5173` in your browser.

### Option B: Terminal Command
```bash
# In this directory:
npm.cmd run dev
```

### Option C: Production Preview
```bash
npm.cmd run preview
```

---

## ?? Slide Verification Benchmark
The slide reference example `"ababab"` reproduces exact figures:
- $f_{1,\text{norm}} \approx 0.387$
- $f_{2,\text{norm}} \approx 0.0728$
- $f_3 \approx 0.067$
- $f_4 \approx 0.011$
- $f_5 \approx 0.4667$
- **$S(\text{ababab}) = 0.1750$** ($\to$ **VERY WEAK PASSWORD**)
- **$D(\text{ababab}) = 80.3671$** ($\to$ Large structural deviation confirming high predictability)

