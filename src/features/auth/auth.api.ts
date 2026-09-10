export type AuthUser = { id: string; name: string; email: string; createdAt: string };
type ApiResponse = { user: AuthUser; token?: string };

const VITE_API_URL = 'https://lld-project-backend-cipherschool.onrender.com/api/v1';

console.log('API_URL:', VITE_API_URL);
const TOKEN_KEY = 'session_token';

export function getStoredToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

function storeToken(token: string | undefined) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${VITE_API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });
  if (response.ok) {
    if (response.status === 204) return undefined as T;
    const data = await response.json() as ApiResponse;
    // Store token returned from login/signup for future cross-origin requests
    if ((data as any).token) storeToken((data as any).token);
    return data as T;
  }
  const body = await response.json().catch(() => ({ message: 'Something went wrong. Please try again.' }));
  throw new Error(body.message);
}

export const authApi = {
  signup: (payload: { name: string; email: string; password: string }) => request<ApiResponse>('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) => request<ApiResponse>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request<ApiResponse>('/auth/me'),
  logout: () => {
    clearToken();
    return request<void>('/auth/logout', { method: 'POST' });
  },
};

