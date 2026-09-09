import { useEffect, useState } from 'react';
import { BookOpen, CarFront, Code2, Layers3, Target, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { problemsApi, type ProblemSummary } from '../../services/problems.api';

const icons = {
  'parking-lot': [CarFront, 'text-indigo-500', 'bg-indigo-50 border-indigo-200'],
  'elevator-system': [Layers3, 'text-cyan-500', 'bg-cyan-50 border-cyan-200'],
  'vending-machine': [Code2, 'text-emerald-500', 'bg-emerald-50 border-emerald-200'],
  'library-management': [BookOpen, 'text-amber-500', 'bg-amber-50 border-amber-200'],
  'food-delivery': [Zap, 'text-rose-500', 'bg-rose-50 border-rose-200'],
  'movie-ticket-booking': [Target, 'text-fuchsia-500', 'bg-fuchsia-50 border-fuchsia-200'],
} as const;

export default function PopularProblems() {
  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    problemsApi.list()
      .then(({ problems }) => setProblems(problems.slice(0, 4))) // Only show first 4
      .catch((err) => console.error('Failed to load popular problems', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Problems</h2>
          </div>
          <Link to="/problems" className="inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 group">
            View All Problems
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map(problem => {
              const [Icon, iconColor, levelColor] = icons[problem.slug as keyof typeof icons] ?? [Code2, 'text-indigo-500', 'bg-indigo-50 border-indigo-200'];
              
              return (
                <Link to={`/problems/${problem.slug}`} key={problem.slug} className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${levelColor} text-slate-700`}>
                      {problem.difficulty === 'BEGINNER' ? 'Beginner' : problem.difficulty === 'INTERMEDIATE' ? 'Intermediate' : 'Advanced'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{problem.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow line-clamp-3">
                    {problem.description}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
