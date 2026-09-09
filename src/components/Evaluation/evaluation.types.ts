export type EvaluationMetric = {
  label: string;
  score: number;
  color: string;
  description: string;
};

export const evaluationMetrics: EvaluationMetric[] = [
  { label: 'Requirements Understanding', score: 8.5, color: 'bg-emerald-500', description: 'Covered multi-floor, multi-vehicle types, and pricing rules effectively.' },
  { label: 'Class Design & SRP', score: 9, color: 'bg-violet-500', description: 'Clean separation of concerns with robust encapsulation.' },
  { label: 'Encapsulation & Interfaces', score: 7.5, color: 'bg-indigo-500', description: 'Good abstractions, with room to improve payment boundaries.' },
  { label: 'Extensibility & Scalability', score: 6, color: 'bg-amber-500', description: 'Add strategy-based pricing and modular entry and exit gates.' },
  { label: 'Edge Cases & Concurrency', score: 5.5, color: 'bg-rose-500', description: 'Race conditions during simultaneous spot allocation need explicit locking.' },
  { label: 'Code Quality & Clarity', score: 8, color: 'bg-emerald-500', description: 'Idiomatic naming conventions and readable schema definitions.' },
];

export const rubricWeights = [
  ['Requirement Understanding', '15%'], ['Responsibilities', '20%'], ['Encapsulation / Interfaces', '10%'],
  ['Relationships / Coupling', '10%'], ['Extensibility', '15%'], ['Behavior / Core Flow', '10%'],
  ['Edge Cases / Robustness', '10%'], ['Reasoning / Trade-offs', '10%'],
];
