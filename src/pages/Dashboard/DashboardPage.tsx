import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { authApi, type AuthUser } from '../../features/auth/auth.api';
import { getDashboard, type DashboardData } from '../../services/dashboard.api';
import { problemsApi, type ProblemSummary } from '../../services/problems.api';
import { AppSidebar } from '../../components/Global Component/AppSidebar';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import { 
  ContinuePractice, 
  DashboardIntro, 
  LearningAnalytics, 
  Metrics, 
  OtherProblems, 
  ProgressUnderDevelopment, 
  RecentAttempts 
} from '../../components/Dashboard/DashboardSections';

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [auth, data, problemList] = await Promise.all([
          authApi.me(), 
          getDashboard(), 
          problemsApi.list()
        ]);
        if (!active) return;
        setUser(auth.user);
        setDashboard(data);
        setProblems(problemList.problems);
        setError('');
      } catch (requestError) {
        if (!active) return;
        if (requestError instanceof Error && /session|unauthorized|sign in/i.test(requestError.message)) {
          navigate('/login', { replace: true });
        } else {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load dashboard.');
        }
      }
    };

    load();
    const timer = window.setInterval(load, 5000);
    return () => { 
      active = false; 
      window.clearInterval(timer); 
    };
  }, [navigate]);

  // Premium Loading State with Glassmorphic Pulse
  if (!user || !dashboard) {
    return (
      <div className="relative grid min-h-screen place-items-center bg-slate-950 text-white overflow-hidden select-none">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center gap-4 text-center px-6"
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-xl shadow-indigo-600/30 ring-1 ring-white/20">
            <Sparkles className="h-7 w-7 animate-pulse text-indigo-200" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-slate-950 animate-ping" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white">Loading DesignPrep Workspace</h2>
            <p className="mt-1 text-xs font-mono text-slate-400">Fetching live telemetry and architecture drafts...</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
            <span className="text-xs font-mono text-indigo-300">Establishing secure session</span>
          </div>
        </motion.div>
      </div>
    );
  }

  const attemptedIds = dashboard.recentAttempts.map((entry) => entry.attempt.problemId);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-[#f8faff] to-slate-100 text-slate-900 pb-24 lg:pb-0 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="flex min-h-screen">
        
        {/* Persistent App Sidebar */}
        <AppSidebar user={user} active="dashboard" />

        {/* Main Content Pane */}
        <div className="min-w-0 flex-1 flex flex-col">
          <DashboardHeader user={user} />
          
          <main className="mx-auto w-full max-w-[1360px] px-4 sm:px-8 py-8">
            
            {/* Animated Intro Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <DashboardIntro name={user.name} />
            </motion.div>

            {/* Error Banner Alert */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-800 shadow-sm backdrop-blur-md"
                >
                  <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                  <span className="font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <Metrics metrics={dashboard.metrics} />
            </motion.div>

            {/* Live Learning Analytics Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="mt-6"
            >
              <LearningAnalytics data={dashboard} />
            </motion.div>

            {/* Main Interactive Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="mt-6 grid gap-6 lg:grid-cols-12"
            >
              {/* Left Column (8 Spans): Active Practice, Recommended, Attempts */}
              <div className="space-y-6 lg:col-span-8">
                <ContinuePractice entry={dashboard.continueAttempt} />
                <OtherProblems problems={problems} attemptedIds={attemptedIds} />
                <RecentAttempts entries={dashboard.recentAttempts} />
              </div>

              {/* Right Sidebar Column (4 Spans): Progress & Insights */}
              <aside className="lg:col-span-4 space-y-6">
                <ProgressUnderDevelopment />
              </aside>
            </motion.div>

          </main>
        </div>
      </div>
    </div>
  );
}