import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Check, X, Sparkles, ShieldAlert, Layers } from 'lucide-react';

const requirements = [
  'Multiple floors and parking spots',
  'Different vehicle types and suitable spots',
  'Ticket generation on entry',
  'Payment at automated exit or attendant',
  'Capacity limits and full-lot messaging',
];

interface AttemptProblemDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AttemptProblemDrawer({ open, onClose }: AttemptProblemDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-y-0 right-0 z-[101] flex w-full max-w-xl flex-col bg-white shadow-2xl shadow-slate-950/20 border-l border-slate-200/80"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-md shadow-indigo-600/30">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600">Problem Brief</span>
                    <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-700 ring-1 ring-amber-500/20">Medium</span>
                  </div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900 mt-0.5">Design a Parking Lot</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-200/80 hover:text-slate-700 transition-colors active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Overview</h3>
                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  Design a parking lot that handles different vehicle types, multiple floors, ticketing, payment, and efficient spot allocation under high concurrency.
                </p>
              </div>

              {/* Required Behavior */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="h-4 w-4 text-indigo-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required behavior</h3>
                </div>
                <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
                  {requirements.map((requirement, index) => (
                    <div key={requirement} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="text-sm font-medium text-slate-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluation Focus */}
              <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/60 p-5 ring-1 ring-indigo-500/10">
                <div className="flex items-center gap-2 mb-2 text-indigo-900 font-bold text-sm">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>Evaluation Focus</span>
                </div>
                <p className="text-sm leading-relaxed text-indigo-950/80 font-medium">
                  Explain responsibility assignment, coupling, extensibility, core behavior, and edge-case handling to impress senior interviewers.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 bg-slate-50/80 p-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 active:scale-[0.99] transition-all"
              >
                Back to design
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}