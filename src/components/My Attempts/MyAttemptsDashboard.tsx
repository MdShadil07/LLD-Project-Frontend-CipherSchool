import { useEffect, useState } from 'react';
import { BarChart3, Clock3, Code2, Loader2, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { evaluationsApi, type EvaluationHistoryEntry, type EvaluationTotals } from '../../services/evaluations.api';

type Row = EvaluationHistoryEntry & { title: string; attemptNumber: number };
const emptyTotals: EvaluationTotals = { questionsAttempted: 0, submissions: 0, completedEvaluations: 0, averageScore: null, bestScore: null };

export default function MyAttemptsDashboard() {
  const [totals, setTotals] = useState(emptyTotals);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const dashboard = await evaluationsApi.listAll();
        if (!active) return;
        setTotals(dashboard.totals);
        setRows(dashboard.problems.flatMap((problem) => problem.submissions.map((entry, index) => ({ ...entry, title: problem.title, attemptNumber: problem.submissions.length - index }))));
        setError('');
      } catch (requestError) {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load attempts.');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const timer = window.setInterval(load, 5000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  if (loading) return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>;
  if (error && rows.length === 0) return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error}</div>;

  return <div className="space-y-6">
    <header><h1 className="text-3xl font-bold tracking-tight text-slate-900">My Attempts</h1><p className="mt-2 text-sm text-slate-500">Your actual submitted designs and evaluator results.</p></header>
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <Metric icon={Clock3} label="Total submissions" value={String(totals.submissions)} />
      <Metric icon={BarChart3} label="Average score" value={totals.averageScore == null ? '—' : `${totals.averageScore}/100`} />
      <Metric icon={Target} label="Questions attempted" value={String(totals.questionsAttempted)} />
      <Metric icon={BarChart3} label="Best score" value={totals.bestScore == null ? '—' : `${totals.bestScore}/100`} />
    </section>
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4"><h2 className="text-sm font-bold text-slate-800">Submission history</h2></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-xs"><thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Problem</th><th className="px-5 py-3">Attempt</th><th className="px-5 py-3">Submitted</th><th className="px-5 py-3">Score</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Action</th></tr></thead><tbody>{rows.map((row) => <tr key={row.submission._id || row.submission.id} className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600"><Code2 className="h-4 w-4" /></span><span className="font-semibold text-slate-800">{row.title}</span></div></td><td className="px-5 text-slate-600">Attempt {row.attemptNumber}</td><td className="px-5 text-slate-500">{new Date(row.submission.submittedAt).toLocaleString()}</td><td className="px-5 font-bold text-slate-800">{row.evaluation?.overallScore == null ? '—' : `${row.evaluation.overallScore}/100`}</td><td className="px-5"><Status status={row.evaluation?.status || 'PENDING'} /></td><td className="px-5"><Link to={`/evaluation/problem/${row.submission.problemId}`} className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-indigo-600 hover:bg-indigo-50">View evaluation</Link></td></tr>)}{rows.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-500">No submissions yet. <Link to="/problems" className="font-semibold text-indigo-600">Choose a problem</Link></td></tr>}</tbody></table></div>
    </section>
  </div>;
}

function Metric({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) { return <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-50"><Icon className="h-5 w-5 text-indigo-600" /></span><div><p className="text-2xl font-bold text-slate-900">{value}</p><p className="text-xs font-medium text-slate-500">{label}</p></div></div></article>; }
function Status({ status }: { status: 'EVALUATING' | 'COMPLETED' | 'FAILED' | 'PENDING' }) { const color = status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' : status === 'FAILED' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'; return <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${color}`}>{status === 'PENDING' ? 'Awaiting evaluation' : status}</span>; }
