export type SubmissionResponse = {
  id: string;
  _id?: string;
  attemptId: string;
  problemId: string;
  version: number;
  format: 'STRUCTURED_DESIGN';
  content: Record<string, string>;
  submittedAt: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

export async function submitAttempt(attemptId: string): Promise<{
  submission: SubmissionResponse;
  attemptStatus: 'SUBMITTED';
}> {
  const response = await fetch(`${API_URL}/attempts/${attemptId}/submit`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data.error?.message || data.message || 'Unable to submit this practice.';
    const error = new Error(message) as Error & { code?: string; fields?: string[] };
    error.code = data.error?.code;
    error.fields = data.error?.fields;
    throw error;
  }

  return data.data;
}
