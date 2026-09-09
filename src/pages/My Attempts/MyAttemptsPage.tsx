import { Bell, ChevronDown } from 'lucide-react';
import { AppSidebar } from '../../components/Global Component/AppSidebar';
import ThemeToggle from '../../components/Global Component/ThemeToggle';
import MyAttemptsDashboard from '../../components/My Attempts/MyAttemptsDashboard';

export default function MyAttemptsPage() {
  return <div className="min-h-screen bg-[#f7f8fc] pb-24 text-slate-900 lg:pb-0"><div className="flex min-h-screen"><AppSidebar active="my-attempts" /><div className="min-w-0 flex-1"><header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-5 sm:px-8"><div className="relative hidden max-w-[520px] flex-1 sm:block"><input aria-label="Search attempts" placeholder="Search problems, topics, or anything..." className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-indigo-400 focus:bg-white" /></div><div className="ml-auto flex items-center gap-3"><ThemeToggle /><Bell className="h-5 w-5 text-slate-500" /><span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">S</span><span className="hidden text-sm font-medium text-slate-700 sm:block">Shadil</span><ChevronDown className="h-4 w-4 text-slate-400" /></div></header><main className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8"><MyAttemptsDashboard /></main></div></div></div>;
}
