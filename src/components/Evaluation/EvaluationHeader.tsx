import { ArrowLeft, Download, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EvaluationHeader({ onRetake }: { onRetake: () => void }) {
  return <header className="sticky top-0 z-20 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3 sm:px-8"><Link to="/my-attempts" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600"><ArrowLeft className="h-3.5 w-3.5" /> Back to attempts</Link><div className="flex items-center gap-2"><button type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"><Download className="h-3.5 w-3.5 text-slate-400" /> Export report</button><button type="button" onClick={onRetake} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"><RefreshCcw className="h-3.5 w-3.5" /> Retake problem</button></div></header>;
}
