import React from 'react';
import { motion } from 'framer-motion';
import { Check, FileText, Database, Network, GitPullRequest, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ATTEMPT_STEPS, type AttemptStepId } from './attempt.types';

// Map specific icons for each LLD step to give it an elite SaaS engineering feel
const stepIcons: Record<string, React.ReactNode> = {
  requirements: <FileText className="h-4 w-4" />,
  entities: <Database className="h-4 w-4" />,
  relationships: <Network className="h-4 w-4" />,
  flow: <GitPullRequest className="h-4 w-4" />,
  tradeoffs: <ShieldAlert className="h-4 w-4" />,
  review: <CheckCircle2 className="h-4 w-4" />,
};

interface AttemptStepperProps {
  currentStep: AttemptStepId;
  onChange: (step: AttemptStepId) => void;
}

export default function AttemptStepper({ currentStep, onChange }: AttemptStepperProps) {
  const currentIndex = ATTEMPT_STEPS.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-950/5 ring-1 ring-slate-900/5">
      <div className="flex min-w-[780px] items-center justify-between relative px-2">
        {ATTEMPT_STEPS.map((step, index) => {
          const complete = index < currentIndex;
          const active = index === currentIndex;
          const icon = stepIcons[step.id] || <span className="text-xs font-bold">{index + 1}</span>;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onChange(step.id)}
              className="group relative flex flex-1 flex-col items-center text-center cursor-pointer focus:outline-none"
            >
              {/* Connecting Line behind nodes */}
              {index < ATTEMPT_STEPS.length - 1 && (
                <div className="absolute top-5 left-[50%] right-[-50%] h-[3px] bg-slate-100 z-0 overflow-hidden rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500 ease-out"
                    style={{ width: index < currentIndex ? '100%' : '0%' }}
                  />
                </div>
              )}

              {/* Step Circle Node */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                  active
                    ? 'border-indigo-600 bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-500/20'
                    : complete
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-500'
                }`}
              >
                {complete ? <Check className="h-4 w-4 stroke-[3]" /> : icon}
              </motion.div>

              {/* Step Label & Hint */}
              <div className="mt-3 flex flex-col items-center">
                <span
                  className={`text-xs font-bold tracking-tight transition-colors ${
                    active
                      ? 'text-indigo-900 font-extrabold'
                      : complete
                      ? 'text-slate-700'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  {step.label}
                </span>
                <span className="mt-0.5 text-[10px] font-mono text-slate-400 tracking-wider">
                  {step.hint || `Step 0${index + 1}`}
                </span>
              </div>

              {/* Active Indicator Pulse dot */}
              {active && (
                <span className="absolute -bottom-1 h-1 w-6 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}