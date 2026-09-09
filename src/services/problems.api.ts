export type ProblemDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type ProblemSummary = {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  topics: string[];
  estimatedTime: number;
  createdAt: string;
};

export type Problem = ProblemSummary & {
  requirements: string[];
  nonFunctionalRequirements: string[];
  rubric: Array<{ criterion: string; weight: number; description: string }>;
  beforeYouStart: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { credentials: 'include' });
  if (response.ok) return response.json() as Promise<T>;
  const body = await response.json().catch(() => ({ message: 'Unable to load problems.' }));
  throw new Error(body.message ?? 'Unable to load problems.');
}

export const problemsApi = {
  list: () => request<{ problems: ProblemSummary[] }>('/problems'),
  getBySlug: (slug: string) => request<{ problem: Problem }>(`/problems/${slug}`),
};
