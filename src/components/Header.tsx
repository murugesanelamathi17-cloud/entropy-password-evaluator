import React from 'react';
import { Shield, BookOpen, Sparkles, Activity, KeyRound } from 'lucide-react';

interface HeaderProps {
  onOpenFormulas: () => void;
  activeTab: 'analyzer' | 'batch' | 'docs';
  setActiveTab: (tab: 'analyzer' | 'batch' | 'docs') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFormulas, activeTab, setActiveTab }) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Title & Guidance Credits */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Harmonic Entropy
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Password Evaluator
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Guided by <span className="text-slate-300 font-medium">Dr. K. Senbagam</span> • By <span className="text-slate-300">Hariharan P, Harini R M, Madhesh Kumar D</span>
            </p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Live Signal Analyzer
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'batch'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Batch Benchmark
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'docs'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Theory & Formulas
            </button>
          </div>

          <button
            onClick={onOpenFormulas}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors"
            title="View Research Mathematical Formulas"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Formulas</span>
          </button>
        </div>

      </div>
    </header>
  );
};
