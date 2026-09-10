import { CheckCircle2, Clock3, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Attempt } from '../../services/practice.api';
import type { ProblemSummary } from '../../services/problems.api';

type RecentActivityProps = {
  attempts: Attempt[];
  problemsMap: Record<string, ProblemSummary>;
};

export default function RecentActivity({ attempts, problemsMap }: RecentActivityProps) {
  const recentAttempts = [...attempts]
    .sort((first, second) => new Date(second.lastSavedAt).getTime() - new Date(first.lastSavedAt).getTime())
    .slice(0, 5);

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-950/5 ring-1 ring-slate-900/5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900">Recent Activity</h2>
          <p className="mt-0.5 text-[11px] font-mono text-slate-400">Updates from your latest practice work</p>
        </div>
        <Link to="/my-attempts" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {recentAttempts.map((attempt) => {
          const problem = problemsMap[attempt.problemId];
          const activity = activityForStatus(attempt.status);
          const attemptId = attempt._id || attempt.id;

          return (
            <Link 
              key={attemptId} 
              to={`/practice/${attemptId}`} 
              className="group flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/40 p-3.5 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-sm ${activity.iconClass}`}>
                <activity.Icon className="h-4 w-4" />
              </span>
              
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {activity.title}: <span className="text-slate-700 font-semibold">{problem?.title ?? attempt.problemId}</span>
                </span>
                <span className="mt-1 flex items-center gap-1 text-[10px] font-mono text-slate-400">
                  <Clock3 className="h-3 w-3 text-slate-400" />
                  {formatActivityDate(attempt.lastSavedAt)}
                </span>
              </span>

              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${activity.badgeClass}`}>
                {activity.label}
              </span>
            </Link>
          );
        })}

        {recentAttempts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
            <FileText className="mx-auto h-8 w-8 text-slate-300 mb-2" />
            <p className="text-xs font-bold text-slate-700">No recent activity yet.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Start or resume a practice challenge to see your timeline.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function activityForStatus(status: Attempt['status']) {
  if (status === 'DRAFT') {
    return { 
      title: 'Draft saved', 
      label: 'In progress', 
      Icon: FileText, 
      iconClass: 'bg-amber-50 text-amber-600 border border-amber-200/60', 
      badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200' 
    };
  }
  if (status === 'SUBMITTED') {
    return { 
      title: 'Solution submitted', 
      label: 'Submitted', 
      Icon: CheckCircle2, 
      iconClass: 'bg-blue-50 text-blue-600 border border-blue-200/60', 
      badgeClass: 'bg-blue-50 text-blue-700 border border-blue-200' 
    };
  }
  if (status === 'COMPLETED') {
    return { 
      title: 'Evaluation completed', 
      label: 'Completed', 
      Icon: CheckCircle2, 
      iconClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60', 
      badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
    };
  }
  return { 
    title: 'Practice updated', 
    label: status, 
    Icon: FileText, 
    iconClass: 'bg-slate-100 text-slate-600 border border-slate-200', 
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200' 
  };
}

function formatActivityDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}