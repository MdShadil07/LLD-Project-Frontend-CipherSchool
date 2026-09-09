import { useNavigate, useParams } from 'react-router-dom';
import { Bell, ChevronDown } from 'lucide-react';
import { AppSidebar } from '../../components/Global Component/AppSidebar';
import ThemeToggle from '../../components/Global Component/ThemeToggle';
import EvaluationHeader from '../../components/Evaluation/EvaluationHeader';
import { AggregateScore, EvaluationSummary, MetricsBreakdown } from '../../components/Evaluation/EvaluationScoreCard';
import EvaluationTabs from '../../components/Evaluation/EvaluationTabs';

export default function EvaluationPage() {
  const navigate = useNavigate();
  const { attemptId } = useParams();
  return <div className="min-h-screen bg-[#f7f8fc] pb-24 text-slate-900 lg:pb-0"><div className="flex min-h-screen"><AppSidebar active="evaluation" /><div className="min-w-0 flex-1"><div className="flex h-16 items-center justify-end gap-3 border-b border-slate-200 bg-white px-5 sm:px-8"><ThemeToggle /><Bell className="h-5 w-5 text-slate-500" /><span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">S</span><span className="hidden text-sm font-medium text-slate-700 sm:block">Shadil</span><ChevronDown className="h-4 w-4 text-slate-400" /></div><EvaluationHeader onRetake={() => navigate(`/practice/${attemptId ?? ''}`)} /><main className="mx-auto max-w-[1500px] space-y-6 px-5 py-6 sm:px-8"><EvaluationSummary /><div className="grid gap-6 lg:grid-cols-3"><AggregateScore /><div className="lg:col-span-2"><MetricsBreakdown /></div></div><EvaluationTabs /></main></div></div></div>;
}
