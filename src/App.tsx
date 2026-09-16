import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { PasswordInput } from './components/PasswordInput';
import { AudioHarmonicSynthesizer } from './components/AudioHarmonicSynthesizer';
import { FeatureSummaryCards } from './components/FeatureSummaryCards';
import { CorpusGatingView } from './components/CorpusGatingView';
import { KeyboardVisualizer } from './components/KeyboardVisualizer';
import { FourierVisualizer } from './components/FourierVisualizer';
import { SubstringMatrix } from './components/SubstringMatrix';
import { StructuralDeviationView } from './components/StructuralDeviationView';
import { BatchEvaluator } from './components/BatchEvaluator';
import { DocsView } from './components/DocsView';
import { FormulaModal } from './components/FormulaModal';
import { evaluatePassword } from './core/evaluator';
import { GatingMechanism } from './types';

export function App() {
  // Default to presentation example "ababab"
  const [password, setPassword] = useState('ababab');
  const [activeTab, setActiveTab] = useState<'analyzer' | 'batch' | 'docs'>('analyzer');
  const [mechanism, setMechanism] = useState<GatingMechanism>('multiplicative');
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  // Compute live harmonic evaluation with active gating mechanism
  const result = useMemo(
    () => evaluatePassword(password, mechanism),
    [password, mechanism]
  );

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation Bar */}
      <Header
        onOpenFormulas={() => setIsFormulaModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            {/* 1. Primary Password Input & Continuous Gauge Meter */}
            <PasswordInput
              password={password}
              setPassword={setPassword}
              result={result}
              mechanism={mechanism}
              setMechanism={setMechanism}
            />

            {/* 2. Web Audio Harmonic Synthesizer */}
            <AudioHarmonicSynthesizer
              password={password}
              fourier={result.fourier}
            />

            {/* 3. 6-Feature Dimensional Summary Cards (f1 through f6) */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Harmonic Feature Breakdown F(X) = (f1, f2, f3, f4, f5, f6)
                </h2>
                <span className="text-[11px] font-mono text-cyan-400">
                  Includes Section 6.1 Corpus Gating (f6)
                </span>
              </div>
              <FeatureSummaryCards result={result} />
            </div>

            {/* 4. Section 6.1 Corpus-Frequency Gating Interactive Engine */}
            <CorpusGatingView
              result={result}
              mechanism={mechanism}
              setMechanism={setMechanism}
            />

            {/* 5. Deep Visualizers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Keyboard Walk Visualizer */}
              <KeyboardVisualizer
                password={password}
                keyboardResult={result.keyboard}
              />

              {/* Fourier Spectral Flatness Visualizer */}
              <FourierVisualizer
                password={password}
                fourier={result.fourier}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Substring Recurrence Matrix */}
              <SubstringMatrix
                password={password}
                substringResult={result.substring}
              />

              {/* Structural Deviation Theory & 5-Axis Radar */}
              <StructuralDeviationView result={result} />
            </div>
          </div>
        )}

        {activeTab === 'batch' && <BatchEvaluator />}

        {activeTab === 'docs' && <DocsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            Entropy Based Password Evaluation • Guided by{' '}
            <strong className="text-slate-300">Dr. K. Senbagam</strong>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Presented by Hariharan P • Harini R M • Madhesh Kumar D
          </div>
        </div>
      </footer>

      {/* Educational Formula Modal */}
      <FormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
      />
    </div>
  );
}

export default App;
