import type { Evaluation } from './evaluations.api';
import type { Attempt } from './practice.api';
import type { ProblemSummary } from './problems.api';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

export type DashboardEntry = { attempt: Attempt; problem: ProblemSummary | null; evaluation: Evaluation | null };
export type DashboardData = {
  metrics: { problemsSolved: number; totalAttempts: number; averageScore: number | null; practiceSeconds: number };
  activity: { label: string; attempts: number }[];
  scoreHistory: { score: number; completedAt: string }[];
  continueAttempt: DashboardEntry | null;
  recentAttempts: DashboardEntry[];
};

import { getStoredToken } from '../features/auth/auth.api';

export async function getDashboard(): Promise<DashboardData> {
  const token = getStoredToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_URL}/dashboard`, { credentials: 'include', headers });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error?.message || body.message || 'Unable to load dashboard.');
  return body.data as DashboardData;
}
