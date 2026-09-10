import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Network, 
  Layers, 
  ShieldCheck, 
  Terminal,
  Workflow,
  Lock
} from 'lucide-react';
import { BRAND_NAME, BRAND_TAGLINE, BrandMark } from './Brand';

export default function AuthLeftPanel() {
  const [activeTab, setActiveTab] = useState<'diagram' | 'rubric' | 'concurrency'>('diagram');

  return (
    <div
      className="hidden lg:flex flex-col justify-between h-full w-full p-10 xl:p-14 relative overflow-hidden select-none"
      style={{
        background: 'linear-gradient(145deg, #09090b 0%, #11112b 45%, #0f172a 100%)',
      }}
    >
      {/* ── Ambient Mesh Gradients & Glows ── */}
      <div 
        className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full opacity-25 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} 
      />
      <div 
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full opacity-15 blur-[100px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }} 
      />

      {/* ── Precision Dot Grid Overlay ── */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      {/* ── Top Header: Brand Mark & Tagline ── */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <BrandMark compact />
          <div>
            <p className="text-white font-extrabold text-base tracking-tight">{BRAND_NAME}</p>
            <p className="text-indigo-300/80 text-[10px] uppercase tracking-widest font-mono font-semibold">{BRAND_TAGLINE}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-indigo-300">AI Studio v2.4</span>
        </div>
      </div>

      {/* ── Center: Interactive SaaS Studio Preview Window ── */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
        
        {/* Floating SaaS Window Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-white/5"
        >
          {/* Window Titlebar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-400/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[10px] text-slate-400">designprep.io/studio/parking-lot</span>
            </div>
            <div className="flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400">
              <ShieldCheck className="h-3 w-3 inline mr-1" /> Verified Architecture
            </div>
          </div>

          {/* Interactive Workspace Tabs */}
          <div className="flex border-b border-white/10 bg-slate-900/40 px-3 text-xs font-semibold overflow-x-auto">
            <button 
              onClick={() => setActiveTab('diagram')}
              className={`py-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'diagram' ? 'border-indigo-500 text-indigo-300 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Network className="h-3.5 w-3.5" /> Class Diagram
            </button>
            <button 
              onClick={() => setActiveTab('rubric')}
              className={`py-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'rubric' ? 'border-indigo-500 text-indigo-300 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" /> AI Rubric (96/100)
            </button>
            <button 
              onClick={() => setActiveTab('concurrency')}
              className={`py-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'concurrency' ? 'border-indigo-500 text-indigo-300 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Lock className="h-3.5 w-3.5 text-emerald-400" /> Mutex & Thread Safety
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-5 bg-slate-950/40 min-h-[280px] flex flex-col justify-center">
            {activeTab === 'diagram' ? (
              <div className="space-y-3">
                {/* Root Node */}
                <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/30 p-3 shadow-inner flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">ParkingLot <span className="text-[10px] font-mono text-indigo-300 font-normal">(Singleton)</span></p>
                      <p className="text-[10px] font-mono text-slate-400">- floors: List&lt;Level&gt;</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">1 : N</span>
                </div>

                {/* Connector Branch */}
                <div className="flex justify-center my-[-4px]">
                  <div className="w-px h-4 bg-indigo-500/50" />
                </div>

                {/* Child Nodes Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                    <p className="text-[11px] font-bold text-slate-200">Level (Floor)</p>
                    <p className="text-[9px] font-mono text-slate-400 mt-0.5">+ spots: Map&lt;Type, Queue&gt;</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                    <p className="text-[11px] font-bold text-slate-200">Vehicle Strategy</p>
                    <p className="text-[9px] font-mono text-slate-400 mt-0.5">+ calculateFee(): Fee</p>
                  </div>
                </div>

                {/* AI Tip Banner */}
                <div className="mt-2 rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-2.5 flex items-center gap-2 text-[11px] text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>SOLID Single Responsibility Principle correctly enforced.</span>
                </div>
              </div>
            ) : activeTab === 'rubric' ? (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">OOP & Encapsulation</span>
                  <span className="font-mono font-bold text-indigo-400">98/100</span>
                </div>
                <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[98%]" />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-300 font-medium">Concurrency & Mutex Safety</span>
                  <span className="font-mono font-bold text-emerald-400">94/100</span>
                </div>
                <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[94%]" />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-300 font-medium">Design Pattern Applicability</span>
                  <span className="font-mono font-bold text-amber-400">92/100</span>
                </div>
                <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[92%]" />
                </div>

                <div className="mt-2 p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                  <span>Ready for Principal Engineer LLD Interview evaluation.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1">
                    <Lock className="h-4 w-4 text-emerald-400" />
                    <span>Thread-Safe Spot Allocation</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-mono">
                    synchronized(spotLock) &#123; return spotQueue.poll(); &#125;
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <div className="flex items-center justify-between text-xs text-slate-200 font-bold mb-1">
                    <span>Deadlock Prevention</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Resource ordering applied on multi-floor parking acquisition.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Floating Live AI Feedback Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 max-w-md w-full backdrop-blur-lg shadow-xl"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shrink-0">
            <Cpu className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>AI Architecture Agent</span>
              <span className="text-[9px] font-mono bg-indigo-500/30 text-indigo-300 px-1.5 py-0.2 rounded">Live</span>
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              "Optimal decoupling of pricing strategy from spot allocation. Excellent work."
            </p>
          </div>
        </motion.div>

      </div>

      {/* ── Bottom Feature Highlights Bar ── */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <Workflow className="h-3.5 w-3.5 text-indigo-400" /> 100+ LLD Blueprints
        </span>
        <span className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-emerald-400" /> Instant Rubrics
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-violet-400" /> FAANG Aligned
        </span>
      </div>
    </div>
  );
}