import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import AuthLeftPanel from '../../components/Global Component/AuthLeftPanel';
import { authApi } from '../../features/auth/auth.api';

const PERKS = [
  'Access to 15+ curated LLD problems',
  'AI-powered rubric feedback on every attempt',
  'Track your progress across attempts',
  'No credit card required',
];

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.signup({ name, email, password });
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create your account.');
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

        {/* Subtle glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #eef2ff, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f5f3ff, transparent 70%)' }} />

        <div className="max-w-lg w-full mx-auto relative z-10">

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Free forever · No credit card
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Create your account</h1>
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                Sign in →
              </Link>
            </p>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            {PERKS.map((perk, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-600 leading-snug">{perk}</span>
              </div>
            ))}
          </div>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <SocialButton icon={<GithubIcon />} label="GitHub" />
            <SocialButton icon={<GoogleIcon />} label="Google" />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-medium">or with email</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <FloatLabelInput
              id="signup-name"
              type="text"
              label="Full name"
              icon={<User className="w-4 h-4" />}
              value={name}
              onChange={setName}
              focused={focused === 'name'}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              autoComplete="name"
            />
            <FloatLabelInput
              id="signup-email"
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
            <div>
              <FloatLabelInput
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                label="Create password"
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={setPassword}
                focused={focused === 'password'}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                autoComplete="new-password"
                suffix={
                  <button type="button" onClick={() => setShowPassword(v => !v)}
                    className="text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
              {/* Password strength meter */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(level => (
                      <div key={level} className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background: level <= passwordStrength.score
                            ? passwordStrength.color
                            : '#e2e8f0'
                        }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              By creating an account you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </p>

            <SubmitButton loading={loading} label="Create Free Account" />
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */
function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  if (pw.length === 0) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: 'Too weak', color: '#ef4444' },
    { label: 'Weak', color: '#f97316' },
    { label: 'Fair', color: '#eab308' },
    { label: 'Strong', color: '#22c55e' },
    { label: 'Very strong', color: '#10b981' },
  ];
  return { score, ...map[score] };
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md">
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
        className="flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200"
        style={{
          borderColor: focused ? '#6366f1' : '#e2e8f0',
          boxShadow: focused ? '0 0 0 4px rgba(99,102,241,0.08)' : '0 1px 2px rgba(0,0,0,0.04)',
          background: focused ? 'white' : 'rgba(248,250,252,0.5)',
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
            autoComplete={autoComplete}
            className={`w-full bg-transparent outline-none text-sm font-medium text-slate-900 transition-all duration-200 ${active ? 'pt-4' : 'pt-0'}`}
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

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.02-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
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
