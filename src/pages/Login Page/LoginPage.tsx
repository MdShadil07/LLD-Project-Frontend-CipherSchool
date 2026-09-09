import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import AuthLeftPanel from '../../components/Global Component/AuthLeftPanel';
import { authApi } from '../../features/auth/auth.api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.login({ email, password });
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left decorative panel ── */}
      <div className="lg:w-[52%] shrink-0">
        <AuthLeftPanel />
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-14 bg-white relative overflow-hidden">

        {/* Subtle top-right glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #eef2ff, transparent 70%)' }} />

        <div className="max-w-lg w-full mx-auto relative z-10">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Welcome back
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Sign in to LLD Practice</h1>
            <p className="text-slate-500 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                Create one free →
              </Link>
            </p>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-1 gap-3 mb-8">
            <SocialButton icon={<GithubIcon />} label="Continue with GitHub" />
            <SocialButton
              icon={<GoogleIcon />}
              label="Continue with Google"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <FloatLabelInput
              id="login-email"
              type="email"
              label="Email address"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={setEmail}
              focused={focused === 'email'}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              autoComplete="email"
            />
            <FloatLabelInput
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              icon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={setPassword}
              focused={focused === 'password'}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              autoComplete="current-password"
              suffix={
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                Forgot password?
              </a>
            </div>

            <SubmitButton loading={loading} label="Sign In" />
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-400">
            By signing in you agree to our{' '}
            <a href="#" className="underline hover:text-slate-600">Terms</a>{' '}
            &amp;{' '}
            <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md group">
      {icon}
      {label}
    </button>
  );
}

function FloatLabelInput({
  id, type, label, icon, value, onChange, focused, onFocus, onBlur, suffix, autoComplete
}: {
  id: string; type: string; label: string; icon: React.ReactNode;
  value: string; onChange: (v: string) => void;
  focused: boolean; onFocus: () => void; onBlur: () => void;
  suffix?: React.ReactNode; autoComplete?: string;
}) {
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 bg-slate-50/50"
        style={{
          borderColor: focused ? '#6366f1' : '#e2e8f0',
          boxShadow: focused ? '0 0 0 4px rgba(99,102,241,0.08)' : '0 1px 2px rgba(0,0,0,0.04)',
          background: focused ? 'white' : undefined,
        }}
      >
        <span className={`transition-colors duration-200 shrink-0 ${focused ? 'text-indigo-500' : 'text-slate-400'}`}>
          {icon}
        </span>
        <div className="relative flex-1">
          <label
            htmlFor={id}
            className={`absolute left-0 pointer-events-none font-medium transition-all duration-200 ${
              active ? 'text-[10px] top-0 text-indigo-500' : 'text-sm top-1/2 -translate-y-1/2 text-slate-400'
            }`}
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`w-full bg-transparent outline-none text-sm font-medium text-slate-900 transition-all duration-200 ${active ? 'pt-4' : 'pt-0'}`}
            autoComplete={autoComplete ?? (type === 'email' ? 'email' : 'current-password')}
          />
        </div>
        {suffix && <div className="shrink-0">{suffix}</div>}
      </div>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="relative w-full py-4 rounded-xl text-white font-semibold text-base overflow-hidden transition-all group"
      style={{
        background: loading ? '#818cf8' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        boxShadow: loading ? 'none' : '0 8px 32px rgba(79,70,229,0.35)',
      }}
    >
      <span className={`flex items-center justify-center gap-2 transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {label}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </span>
      )}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.02-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
