import React from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  Clock3, 
  FileText, 
  Play, 
  Sparkles, 
  Star, 
  Trophy, 
  TrendingUp,
  CheckCircle2,
  Clock,
  ChevronRight,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Type definitions ensuring self-contained type safety
export interface ProblemSummary {
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  [key: string]: any;
}

export interface DashboardEntry {
  attempt: {
    _id?: string;
    id?: string;
    problemId: string;
    status: 'DRAFT' | 'COMPLETED' | 'FAILED' | string;
    lastSavedAt: string;
    timeSpentSeconds: number;
    [key: string]: any;
  };
  problem?: {
    title: string;
    [key: string]: any;
  };
  evaluation?: {
    overallScore?: number;
    status?: string;
    [key: string]: any;
  };
}

export interface DashboardData {
  metrics: {
    problemsSolved: number;
    totalAttempts: number;
    averageScore: number | null;
    practiceSeconds: number;
  };
  activity: Array<{ label: string; attempts: number }>;
  scoreHistory: Array<{ label: string; score: number }>;
  [key: string]: any;
}

export function DashboardIntro({ name }: { name: string }) {
  const firstName = name ? name.split(' ')[0] : 'Engineer';
  return (
    <section className="relative overflow-hidden mb-6 rounded-3xl border border-slate-200/80 bg-gradient-to-r from-white via-indigo-50/40 to-white px-6 py-8 shadow-xl shadow-slate-950/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">Active Workspace</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          Keep pushing boundaries, <span className="text-indigo-600">{firstName}!</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-xl">
          Every saved architectural draft and AI evaluation sharpens your Low-Level Design proficiency for senior engineering interviews.
        </p>
      </div>
    </section>
  );
}

export function Metrics({ metrics }: { metrics: DashboardData['metrics'] }) {
  const cards = [
    ['Problems solved', String(metrics.problemsSolved || 0), Trophy, 'text-emerald-600', 'bg-emerald-50'], 
    ['Total attempts', String(metrics.totalAttempts || 0), BarChart3, 'text-indigo-600', 'bg-indigo-50'], 
    ['Average score', metrics.averageScore == null ? '—' : `${metrics.averageScore}/100`, Star, 'text-amber-500', 'bg-amber-50'], 
    ['Practice time', formatDuration(metrics.practiceSeconds || 0), Clock3, 'text-violet-600', 'bg-violet-50']
  ] as const;

  return (
    <section className="grid grid-cols-2 gap-4 xl:grid-cols-4 mb-6">
      {cards.map(([label, value, Icon, tone, bgTone]) => (
        <article 
          key={label} 
          className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
        >
          <div className="flex items-center gap-3.5">
            <span className={`grid h-11 w-11 place-items-center rounded-xl ${bgTone} transition-transform group-hover:scale-105`}>
              <Icon className={`h-5 w-5 ${tone}`} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
              <p className="mt-1 text-2xl font-black tracking-tight text-slate-900">{value}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm mb-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function ContinuePractice({ entry }: { entry: DashboardEntry | null }) {
  return (
    <Panel 
      title="Continue practicing" 
      action={
        <Link to="/problems" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          View all problems <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      {entry ? (
        <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/40 via-white to-white p-5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 shrink-0">
            <FileText className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-900 text-base">{entry.problem?.title || entry.attempt.problemId}</h3>
            <p className="mt-1 text-xs font-mono text-slate-500 flex items-center gap-2">
              <span>Last saved {formatDate(entry.attempt.lastSavedAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatDuration(entry.attempt.timeSpentSeconds)}</span>
            </p>
          </div>
          <Link 
            to={`/practice/${entry.attempt._id || entry.attempt.id}`} 
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 active:scale-95 transition-all"
          >
            Resume <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <Empty message="No unfinished practice session. Start a new design challenge when you're ready." action="Browse problems" to="/problems" />
      )}
    </Panel>
  );
}

export function OtherProblems({ problems, attemptedIds }: { problems: ProblemSummary[]; attemptedIds: string[] }) {
  const recommendations = problems.filter((problem) => !attemptedIds.includes(problem.slug)).slice(0, 3);
  
  return (
    <Panel 
      title="Recommended problems" 
      action={
        <Link to="/problems" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          View catalog <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      {recommendations.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((problem) => (
            <article key={problem.slug} className="group rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 hover:bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    problem.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    problem.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {problem.difficulty}
                  </span>
                  <Layers className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-base">{problem.title}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{problem.description}</p>
              </div>
              <Link to={`/problems/${problem.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                Open problem <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <Empty message="You have attempted every available problem. Review an evaluation or retry a challenge to improve." action="View evaluations" to="/evaluation" />
      )}
    </Panel>
  );
}

export function RecentAttempts({ entries }: { entries: DashboardEntry[] }) {
  return (
    <Panel 
      title="Recent attempts" 
      action={
        <Link to="/my-attempts" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          View all history <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      {entries.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-xs">
            <thead className="border-b border-slate-100 text-slate-400 uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="pb-3 font-semibold">Problem</th>
                <th className="pb-3 font-semibold">Last updated</th>
                <th className="pb-3 font-semibold">Score</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.map((entry) => { 
                const draft = entry.attempt.status === 'DRAFT'; 
                const destination = draft ? `/practice/${entry.attempt._id || entry.attempt.id}` : `/evaluation/problem/${entry.attempt.problemId}`; 
                return (
                  <tr key={entry.attempt._id || entry.attempt.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {entry.problem?.title || entry.attempt.problemId}
                    </td>
                    <td className="py-4 text-slate-500 font-mono text-[11px]">{formatDate(entry.attempt.lastSavedAt)}</td>
                    <td className="py-4 font-mono font-bold text-slate-700">
                      {entry.evaluation?.overallScore == null ? <span className="text-slate-300">—</span> : `${entry.evaluation.overallScore}/100`}
                    </td>
                    <td className="py-4"><Status status={entry.evaluation?.status || entry.attempt.status} /></td>
                    <td className="py-4 text-right">
                      <Link to={destination} className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700">
                        {draft ? 'Resume' : 'Review'} <Play className="h-3 w-3 fill-current" />
                      </Link>
                    </td>
                  </tr>
                ); 
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty message="Your submitted and saved attempts will appear here." action="Start practicing" to="/problems" />
      )}
    </Panel>
  );
}

export function ProgressUnderDevelopment() {
  return (
    <section className="rounded-2xl border border-dashed border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-100 text-indigo-600">
          <Sparkles className="h-4 w-4" />
        </span>
        <h2 className="text-base font-bold text-slate-900">Progress insights</h2>
      </div>
      <p className="text-sm leading-relaxed text-slate-600 max-w-2xl">
        Criterion-by-criterion improvement trends are currently being calculated. Your live scores, attempts, and practice time are fully active above.
      </p>
    </section>
  );
}

export function LearningAnalytics({ data }: { data: DashboardData }) {
  const maxActivity = Math.max(1, ...(data.activity?.map((item) => item.attempts) || [1]));
  const totalAttempts7Days = (data.activity || []).reduce((acc, curr) => acc + (curr.attempts || 0), 0);
  const scores = data.scoreHistory || [];
  const scorePoints = scores.map((item, index) => `${scores.length === 1 ? 50 : (index / (scores.length - 1)) * 100},${100 - item.score}`).join(' ');

  return (
    <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-[radial-gradient(ellipse_at_top_right,#f5f7ff,white_60%)] p-6 shadow-xl shadow-slate-950/5 mb-6">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Live learning analytics
          </p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900">Your practice momentum</h2>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 7-Day Activity - Sophisticated redesign */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <p className="text-sm font-bold text-slate-900">7-day activity</p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{totalAttempts7Days} total attempts recorded</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              Active
            </span>
          </div>
          
          <div className="relative pt-6 pb-2">
            {/* Background grid lines for analytical depth */}
            <div className="absolute inset-x-0 top-6 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-slate-200 w-full" />
              <div className="border-b border-dashed border-slate-200 w-full" />
              <div className="border-b border-dashed border-slate-200 w-full" />
            </div>

            <div className="flex h-36 items-end justify-between gap-3 relative z-10">
              {(data.activity || []).map((item) => {
                const isPeak = item.attempts === maxActivity && maxActivity > 0;
                return (
                  <div key={item.label} className="flex h-full flex-1 flex-col justify-end items-center group">
                    {/* Floating Tooltip Value on Hover */}
                    <div className="absolute -top-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-y-2 group-hover:translate-y-0 z-20">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-900 text-white rounded-md shadow-lg whitespace-nowrap">
                        {item.attempts} {item.attempts === 1 ? 'attempt' : 'attempts'}
                      </span>
                    </div>

                    <div className="w-full flex justify-center h-full items-end pb-2">
                      <div 
                        className={`w-full max-w-[26px] rounded-t-xl transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 relative ${
                          isPeak 
                            ? 'bg-gradient-to-t from-indigo-600 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500/30 ring-2 ring-indigo-300/50' 
                            : 'bg-gradient-to-t from-slate-200 via-slate-300 to-indigo-400 group-hover:from-indigo-600 group-hover:to-violet-400'
                        }`} 
                        style={{ height: `${Math.max(item.attempts ? 20 : 8, (item.attempts / maxActivity) * 100)}%` }} 
                      >
                        {isPeak && (
                          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 ring-2 ring-white animate-pulse" />
                        )}
                      </div>
                    </div>
                    <span className="text-center text-[11px] font-mono font-medium text-slate-500 group-hover:text-indigo-600 transition-colors">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Evaluation Scores Trend */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-900">Evaluation scores trend</p>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Latest: {scores[scores.length - 1]?.score ?? '—'}
            </span>
          </div>
          
          {scores.length > 1 ? (
            <div className="mt-2 h-28 relative">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="scoreFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity=".3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={`0,100 ${scorePoints} 100,100`} fill="url(#scoreFill)" />
                <polyline 
                  points={scorePoints} 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="3" 
                  vectorEffect="non-scaling-stroke" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
          ) : (
            <div className="my-auto grid h-28 place-items-center rounded-xl bg-slate-50 px-4 text-center text-xs text-slate-500 font-medium">
              Complete two evaluations to unlock your score progression trend.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Empty({ message, action, to }: { message: string; action: string; to: string }) { 
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
      <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">{message}</p>
      <Link to={to} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700">
        {action} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  ); 
}

function Status({ status }: { status: string }) { 
  const done = status === 'COMPLETED'; 
  const failed = status === 'FAILED'; 
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
      done ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
      failed ? 'bg-rose-50 text-rose-700 border border-rose-200' : 
      'bg-amber-50 text-amber-700 border border-amber-200'
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-emerald-500' : failed ? 'bg-rose-500' : 'bg-amber-500'}`} />
      {status === 'DRAFT' ? 'In progress' : status}
    </span>
  ); 
}

function formatDuration(seconds: number) { 
  if (!seconds) return '0 min'; 
  const hours = Math.floor(seconds / 3600); 
  const minutes = Math.round((seconds % 3600) / 60); 
  return hours ? `${hours}h ${minutes}m` : `${minutes} min`; 
}

function formatDate(value: string) { 
  return new Date(value).toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  }); 
}