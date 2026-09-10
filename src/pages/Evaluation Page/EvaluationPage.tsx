import { useEffect, useState } from 'react';
import { Award, Bell, ChevronDown, ChevronRight, Loader2, RefreshCcw } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppSidebar } from '../../components/Global Component/AppSidebar';
import ThemeToggle from '../../components/Global Component/ThemeToggle';
import { evaluationsApi, type Evaluation, type EvaluationHistoryEntry, type EvaluationProblem, type EvaluationTotals } from '../../services/evaluations.api';

const emptyTotals: EvaluationTotals = { questionsAttempted: 0, submissions: 0, completedEvaluations: 0, averageScore: null, bestScore: null };

export default function EvaluationPage() {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const [totals, setTotals] = useState(emptyTotals);
  const [problems, setProblems] = useState<EvaluationProblem[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState(problemId || '');
  const [selectedAttemptIndex, setSelectedAttemptIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryingSubmission, setRetryingSubmission] = useState<string | null>(null);

  const load = async () => {
    const dashboard = await evaluationsApi.listAll();
    setTotals(dashboard.totals);
    setProblems(dashboard.problems);
    setSelectedProblemId((current) => current || dashboard.problems[0]?.problemId || '');
  };

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        await load();
        if (active) setError('');
      } catch (requestError) {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load evaluations.');
      } finally {
        if (active) setLoading(false);
      }
    };
    refresh();
    const timer = window.setInterval(refresh, 5000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  useEffect(() => {
    if (problemId && problemId !== selectedProblemId) {
      setSelectedProblemId(problemId);
      setSelectedAttemptIndex(0);
    }
  }, [problemId, selectedProblemId]);

  const selectProblem = (nextProblemId: string) => {
    setSelectedProblemId(nextProblemId);
    setSelectedAttemptIndex(0);
    navigate(`/evaluation/problem/${nextProblemId}`);
  };

  const retryEvaluation = async (submissionId: string) => {
    setRetryingSubmission(submissionId);
    try {
      await evaluationsApi.evaluate(submissionId);
      await load();
    } catch (retryError) {
      setError(retryError instanceof Error ? retryError.message : 'Retry failed. Please try again.');
    } finally {
      setRetryingSubmission(null);
    }
  };

  const selectedProblem = problems.find((problem) => problem.problemId === selectedProblemId);
  if (loading) return <EvaluationState message="Loading your evaluation dashboard..." />;
  if (error && problems.length === 0) return <EvaluationState message={error} />;

  return <div className="min-h-screen bg-[#f7f8fc] pb-24 text-slate-900 lg:pb-0"><div className="flex min-h-screen">
    <AppSidebar active="evaluation" />
    <div className="min-w-0 flex-1">
      <header className="flex h-16 items-center justify-end gap-3 border-b border-slate-200 bg-white px-5 sm:px-8"><ThemeToggle /><Bell className="h-5 w-5 text-slate-500" /><span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">S</span><span className="hidden text-sm font-medium text-slate-700 sm:block">Shadil</span><ChevronDown className="h-4 w-4 text-slate-400" /></header>
      <main className="mx-auto max-w-375 space-y-6 px-5 py-6 sm:px-8">
        <header className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-3xl font-bold tracking-tight">Evaluation dashboard</h1><p className="mt-2 text-sm text-slate-500">Review real feedback, identify weak areas, and improve with another attempt.</p></div><Link to="/problems" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"><RefreshCcw className="h-4 w-4" /> Choose a problem</Link></header>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><Metric label="Questions attempted" value={String(totals.questionsAttempted)} /><Metric label="Total submissions" value={String(totals.submissions)} /><Metric label="Evaluated" value={String(totals.completedEvaluations)} /><Metric label="Average score" value={totals.averageScore == null ? '—' : `${totals.averageScore}/100`} /><Metric label="Best score" value={totals.bestScore == null ? '—' : `${totals.bestScore}/100`} /></section>
        {error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
        <div className="grid gap-6 xl:grid-cols-[1fr_1.35fr]">
          <QuestionList problems={problems} selectedProblemId={selectedProblemId} onSelect={selectProblem} />
          <EvaluationDetail entries={selectedProblem?.submissions || []} problemId={selectedProblemId} selectedIndex={selectedAttemptIndex} onSelect={setSelectedAttemptIndex} retryingSubmission={retryingSubmission} onRetry={retryEvaluation} />
        </div>
      </main>
    </div>
  </div></div>;
}

function QuestionList({ problems, selectedProblemId, onSelect }: { problems: EvaluationProblem[]; selectedProblemId: string; onSelect: (id: string) => void }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold">Question evaluations</h2><p className="mt-1 text-xs text-slate-400">Every submitted attempt is kept.</p></div><Award className="h-5 w-5 text-amber-500" /></div><div className="mt-5 space-y-3">{problems.map((problem) => <button key={problem.problemId} type="button" onClick={() => onSelect(problem.problemId)} className={`w-full rounded-xl border p-4 text-left transition-colors ${selectedProblemId === problem.problemId ? 'border-indigo-300 bg-indigo-50' : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50'}`}><div className="flex items-center justify-between gap-3"><span className="font-bold text-slate-800">{problem.title}</span><span className="text-xs font-semibold text-indigo-600">{problem.submissions.length} attempt{problem.submissions.length === 1 ? '' : 's'}</span></div><div className="mt-2 flex flex-wrap gap-2">{problem.submissions.map((entry, index) => <span key={entry.submission._id || entry.submission.id} className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-500">Attempt {problem.submissions.length - index}: {entry.evaluation?.overallScore == null ? entry.evaluation?.status || 'Pending' : `${entry.evaluation.overallScore}/100`}</span>)}</div></button>)}{problems.length === 0 && <p className="py-10 text-center text-sm text-slate-500">Submit a solution to start building your evaluation history.</p>}</div></section>;
}

function EvaluationDetail({ entries, problemId, selectedIndex, onSelect, retryingSubmission, onRetry }: { entries: EvaluationHistoryEntry[]; problemId: string; selectedIndex: number; onSelect: (index: number) => void; retryingSubmission: string | null; onRetry: (submissionId: string) => Promise<void> }) {
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>(null);
  const entry = entries[selectedIndex];
  useEffect(() => setExpandedCriterion(null), [entry?.evaluation?._id, entry?.evaluation?.id]);
  if (!entry) return <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">Select a question to inspect its feedback.</section>;
  const evaluation = entry.evaluation;
  const submissionId = entry.submission._id || entry.submission.id;
  const attemptNumber = entries.length - selectedIndex;
  return <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div><p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Question feedback</p><h2 className="mt-2 text-2xl font-bold">Attempt {attemptNumber}</h2><p className="mt-2 text-sm leading-relaxed text-slate-500">{evaluation?.overallSummary || 'This submission is waiting for evaluation.'}</p></div>
    <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">{entries.map((attempt, index) => <button key={attempt.submission._id || attempt.submission.id} type="button" onClick={() => onSelect(index)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${index === selectedIndex ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Attempt {entries.length - index}</button>)}</div>
    {evaluation?.status === 'COMPLETED' ? <CompletedEvaluation evaluation={evaluation} expandedCriterion={expandedCriterion} onToggle={setExpandedCriterion} problemId={problemId} /> : <EvaluationStatus evaluation={evaluation} submissionId={submissionId} retryingSubmission={retryingSubmission} onRetry={onRetry} />}
  </section>;
}

function CompletedEvaluation({ evaluation, expandedCriterion, onToggle, problemId }: { evaluation: Evaluation; expandedCriterion: string | null; onToggle: (id: string | null) => void; problemId: string }) {
  return <><div className="flex flex-wrap items-center gap-4"><div className="rounded-xl bg-emerald-50 px-5 py-4"><p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Overall score</p><p className="mt-1 text-3xl font-black text-emerald-700">{evaluation.overallScore}<span className="text-sm"> / 100</span></p></div><div className="rounded-xl bg-slate-50 px-5 py-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Confidence</p><p className="mt-1 text-xl font-bold text-slate-700">{evaluation.overallConfidence == null ? '—' : `${Math.round(evaluation.overallConfidence * 100)}%`}</p></div></div>
    {evaluation.topImprovements.length > 0 && <section className="rounded-xl border border-amber-100 bg-amber-50 p-4"><h3 className="font-bold text-amber-900">Top improvements</h3><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-amber-800">{evaluation.topImprovements.map((improvement) => <li key={improvement}>{improvement}</li>)}</ol></section>}
    <section><div className="mb-3"><h3 className="font-bold text-slate-800">Criterion breakdown</h3><p className="mt-1 text-xs text-slate-500">Select a criterion to inspect the supporting evidence and next step.</p></div><div className="space-y-3">{evaluation.criteria.map((criterion) => { const expanded = expandedCriterion === criterion.criterionId; return <article key={criterion.criterionId} className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50"><button type="button" onClick={() => onToggle(expanded ? null : criterion.criterionId)} className="flex w-full items-center gap-3 p-4 text-left"><span className="min-w-0 flex-1 font-bold text-slate-800">{criterion.criterion}</span><span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-700">{criterion.score}/10</span>{criterion.weight != null && <span className="text-xs font-semibold text-slate-400">{criterion.weight}%</span>}<ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${expanded ? 'rotate-90' : ''}`} /></button><div className="h-1.5 bg-slate-200"><div className="h-full bg-indigo-600" style={{ width: `${criterion.score * 10}%` }} /></div>{expanded && <div className="space-y-3 border-t border-slate-100 p-4 text-sm"><p className="text-slate-600"><strong>Evidence:</strong> {criterion.evidence}</p><p className="text-amber-700"><strong>Concern:</strong> {criterion.concern}</p><p className="text-emerald-700"><strong>Suggestion:</strong> {criterion.suggestion}</p><p className="text-slate-500"><strong>Confidence:</strong> {Math.round(criterion.confidence * 100)}%</p></div>}</article>; })}</div></section>
    <div className="border-t border-slate-100 pt-5"><p className="font-bold text-slate-800">Ready to improve?</p><p className="mt-1 text-sm text-slate-500">Your current result stays saved; a retry creates a new attempt.</p><Link to={`/practice?problem=${problemId}`} className="mt-3 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white">Retry this problem</Link></div>
  </>;
}

function EvaluationStatus({ evaluation, submissionId, retryingSubmission, onRetry }: { evaluation: Evaluation | null; submissionId?: string; retryingSubmission: string | null; onRetry: (id: string) => Promise<void> }) {
  const evaluating = evaluation?.status === 'EVALUATING';
  return <div className={`rounded-xl border p-5 text-sm ${evaluating ? 'border-amber-100 bg-amber-50 text-amber-800' : 'border-rose-100 bg-rose-50 text-rose-800'}`}><p className="font-bold">{evaluating ? 'Evaluation in progress' : 'Evaluation failed'}</p><p className="mt-1">{evaluating ? 'Your design is being assessed. This page refreshes automatically.' : evaluation?.error?.message || 'The evaluator could not complete this submission.'}</p>{submissionId && evaluation?.status === 'FAILED' && <button type="button" disabled={retryingSubmission === submissionId} onClick={() => onRetry(submissionId)} className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-60">{retryingSubmission === submissionId ? 'Retrying evaluation...' : 'Send for evaluation again'}</button>}</div>;
}

function Metric({ label, value }: { label: string; value: string }) { return <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-2xl font-black text-slate-900">{value}</p></article>; }
function EvaluationState({ message }: { message: string }) { return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500"><div className="flex items-center gap-3">{message.includes('Loading') && <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />}{message}</div></div>; }
