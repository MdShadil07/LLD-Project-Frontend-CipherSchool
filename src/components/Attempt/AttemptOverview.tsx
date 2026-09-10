import React from 'react';
import { BarChart3, CheckCircle2, Circle, ShieldCheck, Sparkles, Trophy, Zap } from 'lucide-react';
import type { AttemptStepId, Submission } from './attempt.types';

const rubric = [
  ['Requirement understanding', '15%'],
  ['Responsibilities', '20%'],
  ['Encapsulation and interfaces', '10%'],
  ['Relationships and coupling', '10%'],
  ['Extensibility', '15%'],
  ['Behavior and core flow', '10%'],
  ['Edge cases and robustness', '10%'],
  ['Reasoning and trade-offs', '10%']
];

export default function AttemptOverview({ submission, step }: { submission: Submission; step: AttemptStepId }) {
  const completed = Object.values(submission).filter((value) => typeof value === 'string' && value.trim().length >= 12).length;
  const percent = Math.min(100, Math.round((completed / 6) * 100));

  return (
    <section className="mb-6 grid gap-5 xl:grid-cols-[1.1fr_1.9fr]">
      {/* Workspace Progress Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-indigo-50/20 to-white p-6 shadow-xl shadow-slate-950/5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 ring-1 ring-indigo-500/20 mb-3">
              <Sparkles className="h-3 w-3 animate-pulse" /> Attempt workspace
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Build evidence, not just answers.</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">Your design is evaluated against professional FAANG system design rubrics.</p>
          </div>

          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white font-mono font-black text-sm shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-500/10">
            {percent}%
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white animate-ping" />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="font-bold text-slate-700">{completed} of 6 sections ready</span>
            <span className="text-indigo-600 font-semibold uppercase tracking-wider">Step: {step === 'review' ? 'Final Review' : step}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/50">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 transition-all duration-500 shadow-sm" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      {/* Evaluation Rubric Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-950/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Active Evaluation Rubric</h2>
              <p className="text-[10px] font-mono text-slate-400">Weighted criteria distribution</p>
            </div>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-600">100% total</span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {rubric.map(([label, weight]) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <BarChart3 className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                <span className="text-xs font-medium text-slate-700 truncate">{label}</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50/80 px-2 py-0.5 rounded-md border border-indigo-100 shrink-0 ml-2">{weight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReadinessChecklist({ submission }: { submission: Submission }) {
  const items = [
    ['Requirements and assumptions', Boolean(submission?.requirements && submission?.assumptions)],
    ['Classes and responsibilities', Boolean(submission?.entities)],
    ['Relationships and core flow', Boolean(submission?.relationships && submission?.flow)],
    ['Trade-offs and edge cases', Boolean(submission?.tradeoffs)]
  ];

  const readyCount = items.filter(([_, ready]) => ready).length;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 shadow-xl shadow-slate-950/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Submission readiness</h3>
          <p className="text-sm font-bold text-slate-900 mt-0.5">Pre-flight checklist</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-mono font-bold ${readyCount === items.length ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          {readyCount}/{items.length} Ready
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([label, ready]) => (
          <div key={String(label)} className={`flex items-center gap-3 rounded-2xl border p-4 transition-all ${ready ? 'border-emerald-200 bg-emerald-50/30 shadow-sm' : 'border-slate-200 bg-white'}`}>
            <div className={`grid h-8 w-8 place-items-center rounded-xl shrink-0 ${ready ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-100 text-slate-400'}`}>
              {ready ? <CheckCircle2 className="h-4 w-4 stroke-[3]" /> : <Circle className="h-4 w-4" />}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{label}</p>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">{ready ? 'Complete' : 'Pending input'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}