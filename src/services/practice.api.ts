import { Submission } from '../components/Attempt/attempt.types';

export type AttemptStatus = 'DRAFT' | 'SUBMITTED' | 'EVALUATING' | 'COMPLETED' | 'FAILED';

export interface Attempt {
  id: string; // mapping _id to id happens dynamically or we use _id if mapped
  _id?: string;
  userId: string;
  problemId: string;
  status: AttemptStatus;
  startedAt: string;
  lastSavedAt: string;
  timeSpentSeconds: number;
  draft: Submission; // The attempt draft matches the Submission interface
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

import { getStoredToken } from '../features/auth/auth.api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error?.message || 'API Error');
  }

  return data;
}

export const practiceApi = {
  async list(): Promise<{ attempts: Attempt[] }> {
    return fetchWithAuth(`/practice`, {
      method: 'GET',
    });
  },

  async start(problemId: string): Promise<{ attempt: Attempt }> {
    return fetchWithAuth(`/problems/${problemId}/practice`, {
      method: 'POST',
    });
  },

  async get(attemptId: string): Promise<{ attempt: Attempt }> {
    return fetchWithAuth(`/practice/${attemptId}`, {
      method: 'GET',
    });
  },

  async saveDraft(attemptId: string, draft: Partial<Submission>, timeSpentSeconds: number): Promise<{ attempt: Attempt }> {
    return fetchWithAuth(`/practice/${attemptId}/draft`, {
      method: 'PATCH',
      body: JSON.stringify({ draft, timeSpentSeconds }),
    });
  },
};
