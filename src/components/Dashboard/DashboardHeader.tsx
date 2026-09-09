import { Bell, ChevronDown, Search } from 'lucide-react';
import type { AuthUser } from '../../features/auth/auth.api';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../Global Component/ThemeToggle';

export function DashboardHeader({ user }: { user: AuthUser }) {
  const { darkMode } = useTheme();
  return <header className={`flex h-16 items-center gap-5 border-b px-5 sm:px-8 ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-white'}`}><div className="relative w-full max-w-[520px]"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input aria-label="Search" placeholder="Search problems, topics, or anything..." className={`h-10 w-full rounded-lg border pl-10 pr-12 text-sm outline-none placeholder:text-slate-400 ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-200 focus:border-indigo-500' : 'border-slate-200 bg-slate-50 focus:border-indigo-400 focus:bg-white'}`} /><kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500">Ctrl K</kbd></div><div className="ml-auto flex items-center gap-3"><ThemeToggle /><Bell className={`h-5 w-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} /><span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">{user.name[0].toUpperCase()}</span><span className={`hidden text-sm font-medium sm:block ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{user.name}</span><ChevronDown className="h-4 w-4 text-slate-400" /></div></header>;
}
