export type EvaluationCriterion = {
  criterionId: string;
  criterion: string;
  weight?: number;
  score: number;
  evidence: string;
  concern: string;
  suggestion: string;
  confidence: number;
};

export type Evaluation = {
  _id?: string;
  id?: string;
  submissionId: string;
  attemptId: string;
  status: 'EVALUATING' | 'COMPLETED' | 'FAILED';
  overallScore: number | null;
  overallSummary: string;
  topImprovements: string[];
  overallConfidence: number | null;
  criteria: EvaluationCriterion[];
  submittedAt?: string;
  error?: { code?: string; message?: string };
};

export type EvaluationHistoryEntry = {
  submission: {
    _id?: string;
    id?: string;
    attemptId: string;
    problemId: string;
    version: number;
    submittedAt: string;
    content: Record<string, string>;
  };
  evaluation: Evaluation | null;
};

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

import { getStoredToken } from '../features/auth/auth.api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const authHeader: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...authHeader, ...options?.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || data.message || 'Unable to load evaluations.');
  return data.data as T;
}

export const evaluationsApi = {
  listAll: () => request<{ totals: EvaluationTotals; problems: EvaluationProblem[] }>('/evaluations'),
  listByProblem: (problemId: string) => request<{ problemId: string; history: EvaluationHistoryEntry[] }>(`/problems/${problemId}/evaluations`),
  getBySubmission: (submissionId: string) => request<{ evaluation: Evaluation }>(`/submissions/${submissionId}/evaluation`),
  evaluate: (submissionId: string) => request<{ evaluation: Evaluation }>(`/submissions/${submissionId}/evaluate`, { method: 'POST' }),
};

export type EvaluationTotals = {
  questionsAttempted: number;
  submissions: number;
  completedEvaluations: number;
  averageScore: number | null;
  bestScore: number | null;
};

export type EvaluationProblem = {
  problemId: string;
  title: string;
  submissions: EvaluationHistoryEntry[];
};
