import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, type AuthUser } from '../../features/auth/auth.api';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import { ContinuePractice, DashboardIntro, Goals, Insights, Metrics, OtherProblems, RecentAttempts, Streak } from '../../components/Dashboard/DashboardSections';
import { AppSidebar } from '../../components/Global Component/AppSidebar';

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();
  useEffect(() => { authApi.me().then(({ user: currentUser }) => setUser(currentUser)).catch(() => navigate('/login', { replace: true })); }, [navigate]);
  if (!user) return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500">Loading your dashboard…</div>;

  return <div className="dashboard-scale min-h-screen bg-[#f8faff] pb-24 lg:pb-0"><div className="flex min-h-screen"><AppSidebar user={user} active="dashboard" /><div className="min-w-0 flex-1"><DashboardHeader user={user} /><main className="mx-auto max-w-[1360px] px-5 py-6 sm:px-8"><DashboardIntro name={user.name} /><Metrics /><div className="mt-5 grid gap-5 lg:grid-cols-12"><div className="space-y-5 lg:col-span-8"><ContinuePractice /><OtherProblems /><RecentAttempts /></div><div className="space-y-5 lg:col-span-4"><Streak /><Goals /><Insights /></div></div></main></div></div></div>;
}
