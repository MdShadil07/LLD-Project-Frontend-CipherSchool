export type AuthUser = { id: string; name: string; email: string; createdAt: string };
type ApiResponse = { user: AuthUser };

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (response.ok) return response.status === 204 ? (undefined as T) : response.json() as Promise<T>;
  const body = await response.json().catch(() => ({ message: 'Something went wrong. Please try again.' }));
  throw new Error(body.message);
}

export const authApi = {
  signup: (payload: { name: string; email: string; password: string }) => request<ApiResponse>('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) => request<ApiResponse>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request<ApiResponse>('/auth/me'),
  logout: () => request<void>('/auth/logout', { method: 'POST' }),
};
