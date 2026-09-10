import React from 'react';
import { Bell, ChevronDown, Search, Command } from 'lucide-react';
import type { AuthUser } from '../../features/auth/auth.api';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../Global Component/ThemeToggle';

export function DashboardHeader({ user }: { user: AuthUser }) {
  const { darkMode } = useTheme();

  return (
    <header className={`sticky top-0 z-40 flex h-16 items-center justify-between gap-5 border-b px-5 sm:px-8 backdrop-blur-md transition-all ${
      darkMode ? 'border-slate-800 bg-slate-950/85 text-white' : 'border-slate-200/80 bg-white/85 text-slate-900'
    }`}>
      {/* Left / Search Bar (Linear/Vercel Command style) */}
      <div className="relative w-full max-w-[520px]">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search className="h-4 w-4" />
        </span>
        <input 
          aria-label="Search" 
          placeholder="Search problems, topics, or anything..." 
          className={`h-10 w-full rounded-xl border pl-10 pr-16 text-sm outline-none transition-all shadow-sm placeholder:text-slate-400 ${
            darkMode 
              ? 'border-slate-800 bg-slate-900/60 text-slate-200 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10' 
              : 'border-slate-200 bg-slate-50/60 text-slate-800 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10'
          }`} 
          spellCheck="false"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
          <span className={`inline-flex items-center gap-0.5 rounded-lg border px-1.5 py-0.5 text-[10px] font-mono font-bold ${
            darkMode ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-200 bg-white text-slate-500 shadow-sm'
          }`}>
            <Command className="h-3 w-3" /> K
          </span>
        </div>
      </div>

      {/* Right Actions & User Profile */}
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />
        
        {/* Notification Bell Button with Live Pulse Badge */}
        <button 
          type="button"
          aria-label="Notifications"
          className={`relative rounded-xl p-2.5 transition-colors border ${
            darkMode 
              ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white' 
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
        </button>

        <div className={`h-6 w-px mx-1 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />

        {/* User Profile Pill Trigger */}
        <button 
          type="button"
          className={`flex items-center gap-3 rounded-2xl border p-1.5 pr-3 transition-all group ${
            darkMode 
              ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800' 
              : 'border-slate-200 bg-white hover:bg-slate-50 shadow-sm'
          }`}
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-xs font-bold text-white shadow-sm">
            {user?.name?.[0]?.toUpperCase() || 'U'}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950"></span>
          </div>
          <span className={`hidden text-sm font-semibold sm:block ${darkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-indigo-600'} transition-colors`}>
            {user?.name || 'User'}
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;