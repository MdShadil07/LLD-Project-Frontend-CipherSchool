import { useState } from 'react';
import { BarChart3, Bookmark, ChevronLeft, ChevronRight, FileText, Home, Settings, Sparkles, UserRound, ClipboardCheck, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { BRAND_NAME, BRAND_TAGLINE, BrandMark } from './Brand';

const navigation = [
  { label: 'Dashboard', icon: Home, key: 'dashboard', to: '/dashboard' },
  { label: 'Problems', icon: FileText, key: 'problems', to: '/problems' },
  { label: 'Practice', icon: BarChart3, key: 'practice', to: '/practice' },
  { label: 'My Attempts', icon: History, key: 'my-attempts', to: '/my-attempts' },
  { label: 'Evaluation', icon: ClipboardCheck, key: 'evaluation', to: '/evaluation/parking-lot' },
  { label: 'Bookmarks', icon: Bookmark, key: 'bookmarks', to: '/dashboard#bookmarks' },
  { label: 'Progress', icon: BarChart3, key: 'progress', to: '/dashboard#progress' },
  { label: 'Profile', icon: UserRound, key: 'profile', to: '/dashboard#profile' },
  { label: 'Settings', icon: Settings, key: 'settings', to: '/dashboard#settings' },
];

type SidebarUser = { name: string; email: string };
type SidebarSection = 'dashboard' | 'problems' | 'practice' | 'my-attempts' | 'evaluation' | 'bookmarks' | 'progress' | 'profile' | 'settings';

export function AppSidebar({ user, active = 'problems' }: { user?: SidebarUser; active?: SidebarSection }) {
  const [collapsed, setCollapsed] = useState(false);
  const { darkMode } = useTheme();

  return (
    <>
      <div aria-hidden="true" className={`hidden h-screen shrink-0 transition-[width] lg:block ${collapsed ? 'w-[76px]' : 'w-[220px] xl:w-[248px]'}`} />
      <aside className={`sidebar-scrollbar-hidden fixed inset-y-0 left-0 z-40 hidden h-screen shrink-0 flex-col overflow-y-auto border-r shadow-[8px_0_30px_rgba(15,23,42,.03)] backdrop-blur transition-colors lg:flex ${darkMode ? 'border-slate-800 bg-slate-950 text-slate-100' : 'border-slate-200/80 bg-white/95'} ${collapsed ? 'w-[76px]' : 'w-[220px] xl:w-[248px]'}`}>
        <div className={`flex min-h-16 border-b px-3 py-2 ${darkMode ? 'border-slate-800' : 'border-slate-100'} ${collapsed ? 'flex-col justify-center gap-2' : 'items-center justify-between gap-2'}`}>
          {collapsed ? <button type="button" onClick={() => setCollapsed(false)} className="group relative grid h-10 w-10 shrink-0 place-items-center" aria-label="Expand sidebar" title="Expand sidebar"><BrandMark compact className="transition-opacity group-hover:opacity-20" /><ChevronRight className="absolute h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" /></button> : <BrandMark compact />}
          {!collapsed && <div className="min-w-0 flex-1 leading-none"><p className={`whitespace-nowrap text-sm font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{BRAND_NAME}</p><p className="mt-1 whitespace-nowrap text-[8px] font-medium tracking-wide text-slate-400">{BRAND_TAGLINE}</p></div>}
          <div className="flex items-center">
            {!collapsed && <button type="button" onClick={() => setCollapsed(true)} className={`grid h-9 w-9 place-items-center rounded-lg transition-colors ${darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`} aria-label="Collapse sidebar" title="Collapse sidebar"><ChevronLeft className="h-4 w-4" /></button>}
          </div>
        </div>

        <nav className={`mt-5 space-y-1.5 ${collapsed ? 'px-2' : 'px-3'}`} aria-label="Primary navigation">
          {navigation.map(({ label, icon: Icon, key, to }) => <Link key={label} to={to} title={collapsed ? label : undefined} aria-label={label} className={`group relative flex w-full items-center rounded-xl text-left transition-all ${collapsed ? 'justify-center px-2.5 py-3' : 'gap-3 px-3.5 py-3'} ${key === active ? (darkMode ? 'bg-indigo-500/15 text-indigo-300' : 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-500/5') : (darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900')}`}><Icon className="h-[18px] w-[18px] shrink-0" /><span className={`truncate text-sm font-medium ${collapsed ? 'sr-only' : ''}`}>{label}</span>{collapsed && <span className="pointer-events-none absolute left-14 z-20 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block">{label}</span>}</Link>)}
        </nav>

        <div className="mt-auto">
          {!collapsed && (user ? <UserCard user={user} darkMode={darkMode} /> : <PracticeFooter darkMode={darkMode} />)}
        </div>
      </aside>

      <nav className={`fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-2xl border p-2 shadow-[0_12px_40px_rgba(15,23,42,.14)] backdrop-blur-lg lg:hidden ${darkMode ? 'border-slate-700 bg-slate-950/95' : 'border-slate-200/80 bg-white/95'}`} aria-label="Mobile navigation">
        {navigation.slice(0, 5).map(({ label, icon: Icon, key, to }) => <Link key={label} to={to} aria-label={label} className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors ${key === active ? (darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600') : (darkMode ? 'text-slate-400' : 'text-slate-500')}`}><Icon className="h-5 w-5" /><span className="truncate">{label}</span></Link>)}
      </nav>
    </>
  );
}

function PracticeFooter({ darkMode }: { darkMode: boolean }) {
  return <div className={`relative mx-3 mb-3 overflow-hidden rounded-2xl border p-4 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-indigo-100 bg-[linear-gradient(160deg,#f8faff_0%,#eef2ff_58%,#e5e7ff_100%)]'}`}><div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[14px] border-indigo-200/40" /><div className="relative flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"><Sparkles className="h-4 w-4" /></span><span className="text-[10px] font-semibold text-indigo-500">Keep going</span></div><p className={`relative mt-4 text-xs font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-800'}`}>Better designs<br />start with practice.</p><div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/80"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-indigo-600 to-violet-500" /></div><p className={`relative mt-2 text-[9px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>12 of 18 milestones</p></div>;
}

function UserCard({ user, darkMode }: { user: SidebarUser; darkMode: boolean }) {
  const initial = user.name.trim().charAt(0).toUpperCase() || 'U';
  return <div className={`mt-auto border-t p-4 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}><button className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${darkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-50 hover:bg-indigo-50'}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">{initial}</span><span className="min-w-0 flex-1"><span className={`block truncate text-xs font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{user.name}</span><span className="block truncate text-[10px] text-slate-400">{user.email}</span></span></button></div>;
}
