import { SubstringEntry, SubstringResult } from '../types';

export function calculateSubstringRecurrence(password: string): SubstringResult {
  const n = password.length;
  if (n < 2) {
    return {
      entries: [],
      recurrenceScore: 0,
      referenceMax: 0,
      f5Norm: 1,
    };
  }

  // Calculate reference maximum: R_ref(n) = sum_{k=2}^n k * (n - k)
  let referenceMax = 0;
  for (let k = 2; k <= n; k++) {
    referenceMax += k * (n - k);
  }

  // Collect all substrings of length >= 2
  const substrCounts: Map<string, { count: number; positions: string[] }> = new Map();

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const sub = password.substring(i, i + len);
      const posStr = `${i + 1}-${i + len}`;
      const existing = substrCounts.get(sub);
      if (existing) {
        existing.count += 1;
        existing.positions.push(posStr);
      } else {
        substrCounts.set(sub, { count: 1, positions: [posStr] });
      }
    }
  }

  // Filter for repeated substrings (r_x(u) >= 2) and compute R(x)
  const entries: SubstringEntry[] = [];
  let recurrenceScore = 0;

  for (const [sub, data] of substrCounts.entries()) {
    if (data.count >= 2) {
      const len = sub.length;
      const contribution = (data.count - 1) * len;
      recurrenceScore += contribution;

      entries.push({
        substring: sub,
        length: len,
        count: data.count,
        positions: data.positions,
        contribution,
      });
    }
  }

  // Sort entries by length asc, then count desc
  entries.sort((a, b) => a.length - b.length || b.count - a.count);

  // Normalized score: f5 = 1 - min(1, R(x) / R_ref(n))
  // If referenceMax is 0 (for n <= 2), f5 is 1 if R(x) == 0 else 0
  let f5Norm = 1;
  if (referenceMax > 0) {
    f5Norm = 1 - Math.min(1, recurrenceScore / referenceMax);
  } else if (recurrenceScore > 0) {
    f5Norm = 0;
  }

  return {
    entries,
    recurrenceScore,
    referenceMax,
    f5Norm: Math.round(f5Norm * 10000) / 10000,
  };
}
