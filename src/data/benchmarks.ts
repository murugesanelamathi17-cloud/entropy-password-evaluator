export interface BenchmarkPreset {
  name: string;
  password: string;
  category: string;
  description: string;
  expectedTier: string;
}

export const BENCHMARK_PRESETS: BenchmarkPreset[] = [
  {
    name: 'Presentation Testcase ("ababab")',
    password: 'ababab',
    category: 'Presentation Benchmark',
    description: 'Exact reference password analyzed in research presentation slides 8-31.',
    expectedTier: 'Very weak (0.1750)',
  },
  {
    name: 'Sec 6.1 Adversarial ("password1")',
    password: 'password1',
    category: 'Section 6.1 Corpus Gating Trap',
    description: 'Ranks #5 of 14M in breach corpus. 5-feature baseline rates it 0.712 (false positive), but Section 6.1 Multiplicative Gate drops it to 0.070!',
    expectedTier: 'Very weak (0.0700)',
  },
  {
    name: 'Checkbox Trap ("Password1!")',
    password: 'Password1!',
    category: 'False Positive in Legacy Meters',
    description: 'Ticks every legacy complexity rule (uppercase, digit, symbol) but is easily cracked by Markov and pattern models.',
    expectedTier: 'Weak / Moderate',
  },
  {
    name: 'Keyboard Walk ("qwerty123456")',
    password: 'qwerty123456',
    category: 'Adjacency Failure',
    description: 'Sequential keyboard adjacency with low turning complexity and low spectral flatness.',
    expectedTier: 'Very weak',
  },
  {
    name: 'Passphrase ("correct-horse-battery-staple")',
    password: 'correct-horse-battery-staple',
    category: 'Passphrase',
    description: 'Long passphrase with high collision entropy, zero breach matches, and distributed keyboard paths.',
    expectedTier: 'Strong',
  },
  {
    name: 'High Harmonic Random ("kX9#vP2$mL8!zQ")',
    password: 'kX9#vP2$mL8!zQ',
    category: 'High Harmonic Random',
    description: 'Maximal Rényi collision entropy, high Fourier flatness, high turning angles, and absent from breach corpora.',
    expectedTier: 'Very strong',
  },
  {
    name: 'Dictionary Repeat ("adminadmin")',
    password: 'adminadmin',
    category: 'Substring Recurrence Failure',
    description: 'Severe substring recurrence and high Markov cross-entropy vulnerability.',
    expectedTier: 'Very weak',
  },
];
