import { RenyiResult } from '../types';

export function calculateRenyiEntropy(password: string): RenyiResult {
  const n = password.length;
  if (n === 0) {
    return {
      n: 0,
      uniqueChars: 0,
      frequencies: {},
      probabilities: {},
      sumSquaredProb: 0,
      h2Raw: 0,
      h2Max: 1,
      f1Norm: 0,
    };
  }

  // Count frequencies
  const frequencies: Record<string, number> = {};
  for (const char of password) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }

  const uniqueChars = Object.keys(frequencies).length;
  const probabilities: Record<string, number> = {};
  let sumSquaredProb = 0;

  for (const [char, count] of Object.entries(frequencies)) {
    const p = count / n;
    probabilities[char] = p;
    sumSquaredProb += p * p;
  }

  // Collision Entropy: H2 = -log2(sum(p_i^2))
  // If sumSquaredProb is very close to 0 or 1, handle safely
  const h2Raw = sumSquaredProb > 0 ? -Math.log2(sumSquaredProb) : 0;

  // Maximum possible entropy for string of length n is log2(n)
  const h2Max = n > 1 ? Math.log2(n) : 1;

  // Normalized score: (H2 - f1_min) / (f1_max - f1_min) with f1_min = 0
  const f1Norm = Math.min(1, Math.max(0, h2Max > 0 ? h2Raw / h2Max : 0));

  return {
    n,
    uniqueChars,
    frequencies,
    probabilities,
    sumSquaredProb: Math.round(sumSquaredProb * 10000) / 10000,
    h2Raw: Math.round(h2Raw * 10000) / 10000,
    h2Max: Math.round(h2Max * 10000) / 10000,
    f1Norm: Math.round(f1Norm * 10000) / 10000,
  };
}
