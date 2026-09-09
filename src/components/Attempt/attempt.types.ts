export const ATTEMPT_STEPS = [
  { id: 'requirements', label: 'Requirements', hint: 'Scope and assumptions' },
  { id: 'entities', label: 'Entities', hint: 'Classes and enums' },
  { id: 'relationships', label: 'Relationships', hint: 'Collaboration and coupling' },
  { id: 'flow', label: 'Core flow', hint: 'Runtime behavior' },
  { id: 'tradeoffs', label: 'Trade-offs', hint: 'Edge cases and scale' },
  { id: 'review', label: 'Review', hint: 'Validate submission' },
] as const;

export type AttemptStepId = (typeof ATTEMPT_STEPS)[number]['id'];
export type AttemptStatus = 'DRAFT' | 'SUBMITTED' | 'EVALUATING' | 'COMPLETED' | 'FAILED';

export type Submission = {
  requirements: string;
  assumptions: string;
  entities: string;
  relationships: string;
  flow: string;
  tradeoffs: string;
};

export type CriterionResult = {
  criterion: string;
  score: number;
  evidence: string;
  concern: string;
  suggestion: string;
};

export type AttemptRecord = {
  id: string;
  problemSlug: string;
  problemTitle: string;
  createdAt: string;
  submittedAt?: string;
  status: AttemptStatus;
  submission: Submission;
  results?: CriterionResult[];
};

export const EMPTY_SUBMISSION: Submission = {
  requirements: '',
  assumptions: '',
  entities: '',
  relationships: '',
  flow: '',
  tradeoffs: '',
};
