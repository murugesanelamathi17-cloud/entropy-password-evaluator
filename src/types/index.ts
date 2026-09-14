export interface RenyiResult {
  n: number;
  uniqueChars: number;
  frequencies: Record<string, number>;
  probabilities: Record<string, number>;
  sumSquaredProb: number;
  h2Raw: number;
  h2Max: number;
  f1Norm: number;
}

export interface KeyboardStep {
  fromChar: string;
  toChar: string;
  fromCoord: [number, number];
  toCoord: [number, number];
  distance: number;
}

export interface TurningStep {
  triplet: string;
  v1: [number, number];
  v2: [number, number];
  dotProduct: number;
  mag1: number;
  mag2: number;
  cosTheta: number;
  thetaDeg: number;
}

export interface KeyboardResult {
  steps: KeyboardStep[];
  turningSteps: TurningStep[];
  totalDistance: number; // L(x)
  turningComplexity: number; // T(x)
  f2Raw: number; // sqrt(L * T)
  f2Max: number;
  f2Norm: number;
}

export interface MarkovStep {
  char: string;
  context: string;
  order: number;
  probability: number;
}

export interface MarkovResult {
  order: number;
  steps: MarkovStep[];
  jointProbability: number;
  crossEntropy: number;
  f3Score: number;
}

export interface FourierComponent {
  index: number;
  char: string;
  ascii: number;
  re: number;
  im: number;
  magnitude: number;
}

export interface FourierResult {
  asciiValues: number[];
  components: FourierComponent[];
  arithmeticMean: number;
  geometricMean: number;
  spectralFlatness: number;
  f4Score: number;
}

export interface SubstringEntry {
  substring: string;
  length: number;
  count: number;
  positions: string[];
  contribution: number;
}

export interface SubstringResult {
  entries: SubstringEntry[];
  recurrenceScore: number; // R(x)
  referenceMax: number; // R_ref(n)
  f5Norm: number;
}

export interface FeatureVector {
  f1_renyi: number;
  f2_keyboard: number;
  f3_markov: number;
  f4_fourier: number;
  f5_substring: number;
}

export type StrengthClassification = 
  | 'Very weak'
  | 'Weak'
  | 'Moderate'
  | 'Strong'
  | 'Very strong';

export interface StructuralDeviationResult {
  fx: number[];
  muR: number[];
  diff: number[];
  diffSquared: number[];
  weights: number[];
  weightedVarianceSum: number;
  deviationDistance: number; // D(x)
}

export interface FullEvaluationResult {
  password: string;
  renyi: RenyiResult;
  keyboard: KeyboardResult;
  markov: MarkovResult;
  fourier: FourierResult;
  substring: SubstringResult;
  features: FeatureVector;
  weights: {
    w1: number;
    w2: number;
    w3: number;
    w4: number;
    w5: number;
  };
  finalWeightedScore: number; // S(x)
  classification: StrengthClassification;
  deviation: StructuralDeviationResult;
}
