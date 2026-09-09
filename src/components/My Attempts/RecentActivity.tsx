import { CheckCircle2, Clock3, FileText } from 'lucide-react';
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
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">Recent Activity</h2>
          <p className="mt-1 text-[10px] text-slate-400">Updates from your latest practice work</p>
        </div>
        <Link to="/my-attempts" className="text-[10px] font-bold text-indigo-600 hover:underline">
          View All →
        </Link>
      </div>
      <div className="space-y-4">
        {recentAttempts.map((attempt) => {
          const problem = problemsMap[attempt.problemId];
          const activity = activityForStatus(attempt.status);
          const attemptId = attempt._id || attempt.id;

          return (
            <Link key={attemptId} to={`/practice/${attemptId}`} className="flex items-start gap-3 rounded-lg p-1 text-xs text-slate-600 transition-colors hover:bg-slate-50">
              <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${activity.iconClass}`}>
                <activity.Icon className="h-3 w-3" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-slate-800">{activity.title}: {problem?.title ?? attempt.problemId}</span>
                <span className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock3 className="h-3 w-3" />
                  {formatActivityDate(attempt.lastSavedAt)}
                </span>
              </span>
              <span className={`shrink-0 text-[9px] font-semibold ${activity.statusClass}`}>{activity.label}</span>
            </Link>
          );
        })}
        {recentAttempts.length === 0 && <p className="py-4 text-xs text-slate-400">No recent activity yet.</p>}
      </div>
    </section>
  );
}

function activityForStatus(status: Attempt['status']) {
  if (status === 'DRAFT') return { title: 'Draft saved', label: 'In progress', Icon: FileText, iconClass: 'bg-amber-100 text-amber-600', statusClass: 'text-amber-600' };
  if (status === 'SUBMITTED') return { title: 'Solution submitted', label: 'Submitted', Icon: CheckCircle2, iconClass: 'bg-blue-100 text-blue-600', statusClass: 'text-blue-600' };
  if (status === 'COMPLETED') return { title: 'Evaluation completed', label: 'Completed', Icon: CheckCircle2, iconClass: 'bg-emerald-100 text-emerald-600', statusClass: 'text-emerald-600' };
  return { title: 'Practice updated', label: status, Icon: FileText, iconClass: 'bg-slate-100 text-slate-600', statusClass: 'text-slate-500' };
}

function formatActivityDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
