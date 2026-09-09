import { useEffect, useState } from 'react';
import { BarChart3, Clock3, Code2, Flame, Target, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { practiceApi, type Attempt } from '../../services/practice.api';
import { problemsApi, type ProblemSummary } from '../../services/problems.api';
import RecentActivity from './RecentActivity';

type AttemptFilter = 'ALL' | 'COMPLETED' | 'SUBMITTED' | 'IN_PROGRESS';

// Since the dashboard requires some rich problem details (title, difficulty) that the Attempt object
// only has `problemId` for, we'll fetch problems and map them.
export default function MyAttemptsDashboard() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [problemsMap, setProblemsMap] = useState<Record<string, ProblemSummary>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<AttemptFilter>('ALL');
  
  useEffect(() => {
    async function fetchData() {
      try {
        setError('');
        const [attemptsRes, problemsRes] = await Promise.all([
          practiceApi.list(),
          problemsApi.list()
        ]);
        
        setAttempts(attemptsRes.attempts);
        const pMap: Record<string, ProblemSummary> = {};
        problemsRes.problems.forEach((p) => {
          pMap[p.slug] = p;
        });
        setProblemsMap(pMap);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setError(err instanceof Error ? err.message : 'Unable to load attempts.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const refreshTimer = window.setInterval(fetchData, 5000);
    return () => window.clearInterval(refreshTimer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error && attempts.length === 0) {
    return <div className="flex min-h-[60vh] items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error}</div>;
  }

  const visibleAttempts = attempts.filter((attempt) => {
    if (filter === 'COMPLETED') return attempt.status === 'COMPLETED';
    if (filter === 'SUBMITTED') return attempt.status === 'SUBMITTED';
    if (filter === 'IN_PROGRESS') return attempt.status === 'DRAFT';
    return true;
  });

  // Calculate metrics
  const totalAttempts = visibleAttempts.length;
  // Mock average score since we don't have evaluation logic yet
  const averageScore = attempts.length > 0 ? "78%" : "N/A";
  
  // Calculate unique problems solved. In Phase 3, this would check status === 'COMPLETED'
  // For now, let's just count unique problemIds
  const uniqueProblems = new Set(visibleAttempts.map(a => a.problemId)).size;
  
  // Total practice time
  const totalSeconds = visibleAttempts.reduce((acc, attempt) => acc + (attempt.timeSpentSeconds || 0), 0);
  const totalHours = (totalSeconds / 3600).toFixed(1);

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Attempts</h1>
          <p className="mt-2 text-sm text-slate-500">Track your progress, review past attempts, and keep improving.</p>
        </div>
        <select value={filter} onChange={(event) => setFilter(event.target.value as AttemptFilter)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none">
          <option value="ALL">All attempts</option>
          <option value="COMPLETED">Evaluated</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="IN_PROGRESS">In progress</option>
        </select>
      </header>
      
      <Metrics 
        totalAttempts={totalAttempts} 
        averageScore={averageScore} 
        uniqueProblems={uniqueProblems} 
        totalHours={totalHours} 
      />
      
      <div className="grid gap-6 xl:grid-cols-[1fr_330px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex gap-5 border-b border-slate-100 px-5 pt-4">
            <button className="border-b-2 border-indigo-600 pb-3 text-xs font-bold text-indigo-600">All Attempts</button>
            <button className="pb-3 text-xs font-medium text-slate-400 hover:text-slate-600">Progress by Problem</button>
            <button className="pb-3 text-xs font-medium text-slate-400 hover:text-slate-600">Improvement Trends</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  {['Problem', 'Date', 'Score', 'Status', 'Actions'].map((heading) => (
                    <th key={heading} className="px-5 py-3 font-bold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleAttempts.map((attempt) => {
                  const problem = problemsMap[attempt.problemId] || { title: attempt.problemId, difficulty: 'Unknown' };
                  
                  // Mock scores and status for now if they are just DRAFTs
                  const isDraft = attempt.status === 'DRAFT';
                  const isCompleted = attempt.status === 'COMPLETED';
                  const displayStatus = isDraft ? 'In Progress' : attempt.status;
                  const displayScore = isCompleted ? '82%' : '-';
                  
                      const problemTitle = problem?.title ?? attempt.problemId;
                  const problemDifficulty = problem?.difficulty ?? 'Unknown';

                  return (
                    <tr key={attempt._id || attempt.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                            <Code2 className="h-4 w-4" />
                          </span>
                          <span>
                            <b className="block text-sm text-slate-800">{problemTitle}</b>
                            <small className="mt-1 inline-block rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-600">{problemDifficulty}</small>
                          </span>
                        </div>
                      </td>
                      <td className="px-5 text-slate-500">
                        {new Date(attempt.createdAt).toLocaleDateString(undefined, {
                          month: 'short', day: 'numeric', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-5">
                        {!isCompleted ? (
                          <span className="text-slate-400 italic">No score yet</span>
                        ) : (
                          <>
                            <b className="text-slate-800">{displayScore}</b>
                            <div className="mt-1 h-1.5 w-20 rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-emerald-500" style={{ width: displayScore }} />
                            </div>
                          </>
                        )}
                      </td>
                      <td className="px-5">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          isDraft ? 'bg-amber-50 text-amber-700' : attempt.status === 'SUBMITTED' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {displayStatus}
                        </span>
                      </td>
                      <td className="px-5">
                        <Link to={`/practice/${attempt._id || attempt.id}`} className="rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors">
                          {isDraft ? 'Resume' : 'View submission'}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                {visibleAttempts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-slate-500">
                      {attempts.length === 0 ? "You haven't started any attempts yet." : 'No attempts match this filter.'}
                      {attempts.length === 0 && <Link to="/problems" className="mt-2 inline-block text-indigo-600 hover:underline">Explore problems</Link>}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        
        <aside className="space-y-6">
          <ProgressCard />
          <SkillCard />
          <Insight />
          <RecentActivity attempts={visibleAttempts} problemsMap={problemsMap} />
        </aside>
      </div>
    </div>
  );
}

function Metrics({ totalAttempts, averageScore, uniqueProblems, totalHours }: { totalAttempts: number, averageScore: string, uniqueProblems: number, totalHours: string }) { 
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {[
        ['Total Attempts', totalAttempts.toString(), Clock3, '↑ +2 this week'], 
        ['Average Score', averageScore, BarChart3, '↑ +5%'], 
        ['Problems Solved', uniqueProblems.toString(), Target, '↑ +1 this month'], 
        ['Total Practice Time', `${totalHours} hrs`, Clock3, '↑ +1.2 hrs']
      ].map(([label, value, Icon, change]) => (
        <article key={label as string} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-50">
              <Icon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{value as string}</p>
              <p className="text-xs font-medium text-slate-500">{label as string}</p>
            </div>
          </div>
          <p className="mt-3 inline-flex items-center text-[10px] font-bold tracking-wide text-emerald-600">
            {change as string}
          </p>
        </article>
      ))}
    </div>
  ); 
}

function ProgressCard() { 
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800">Your Progress</h2>
        <select className="text-[10px] font-semibold text-slate-400 bg-transparent outline-none">
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="mt-8 flex h-28 items-end gap-1 border-b border-l border-slate-100 px-3 pb-1">
        {[22, 38, 52, 64, 56, 70, 62, 82].map((height, index) => (
          <div key={index} className="group relative flex-1 flex flex-col justify-end h-full">
            <div className="w-full bg-linear-to-t from-indigo-500 to-indigo-300 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${height}%` }} />
            {index === 7 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold text-white">82%</span>}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between px-3 text-[9px] font-semibold text-slate-400">
        <span>Aug 15</span>
        <span>Sep 8</span>
      </div>
    </article>
  ); 
}

function SkillCard() { 
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold text-slate-800">Skill-wise Improvement</h2>
      <div className="mt-2 flex items-center justify-end gap-3 text-[9px] font-semibold text-slate-400 mb-4">
        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-100"></span> First Attempt</div>
        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-600"></span> Latest Attempt</div>
      </div>
      <div className="space-y-4">
        {[
          ['Requirements', 60, 88], 
          ['Class Design', 55, 80], 
          ['Extensibility', 40, 72], 
          ['Edge Cases', 35, 68], 
          ['Code Quality', 62, 82]
        ].map(([label, first, latest]) => (
          <div key={label as string}>
            <div className="flex justify-between text-[10px] font-medium text-slate-600 mb-1">
              <span>{label as string}</span>
              <div className="text-right">
                <span className="text-slate-400 text-[9px] mr-1">{first as number}%</span>
                <span className="text-slate-700 font-bold">{latest as number}%</span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 relative">
              <div className="absolute left-0 top-0 h-full rounded-full bg-indigo-100" style={{ width: `${first}%` }} />
              <div className="absolute left-0 top-0 h-full rounded-full bg-indigo-600" style={{ width: `${latest}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  ); 
}

function Insight() { 
  return (
    <article className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
      <div className="flex items-center gap-2 text-amber-700">
        <Flame className="h-4 w-4" />
        <h2 className="text-sm font-bold">Insight</h2>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-amber-800 font-medium">
        Your biggest improvement is in <b className="font-bold">Extensibility (+32%)</b>! Keep practicing edge cases to get even better.
      </p>
    </article>
  ); 
}

