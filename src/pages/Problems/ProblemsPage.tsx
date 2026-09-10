import { useEffect, useMemo, useState } from 'react';
import { 
  Bell, 
  BookOpen, 
  CarFront, 
  CheckCircle2, 
  ChevronDown, 
  Clock3, 
  Code2, 
  Filter, 
  Flame, 
  Layers3, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Target, 
  UsersRound, 
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppSidebar } from '../../components/Global Component/AppSidebar';
import ThemeToggle from '../../components/Global Component/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import { problemsApi, type ProblemDifficulty, type ProblemSummary } from '../../services/problems.api';

type CardProblem = ProblemSummary & { 
  icon: typeof CarFront; 
  accent: string; 
  solved: string; 
  progress: number; 
  featured?: boolean 
};

const icons = { 
  'parking-lot': [CarFront, 'from-indigo-500 to-violet-500'], 
  'elevator-system': [Layers3, 'from-cyan-500 to-blue-500'], 
  'vending-machine': [Code2, 'from-emerald-500 to-teal-500'], 
  'library-management': [BookOpen, 'from-amber-500 to-orange-500'], 
  'food-delivery': [Zap, 'from-rose-500 to-pink-500'], 
  'movie-ticket-booking': [Target, 'from-fuchsia-500 to-purple-500'] 
} as const;

const difficulties: Array<'All levels' | ProblemDifficulty> = ['All levels', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const labels: Record<ProblemDifficulty, string> = { BEGINNER: 'Beginner', INTERMEDIATE: 'Intermediate', ADVANCED: 'Advanced' };

export default function ProblemsPage() {
  const { darkMode } = useTheme();
  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [query, setQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All levels' | ProblemDifficulty>('All levels');
  const [selectedTopic, setSelectedTopic] = useState('All topics');
  const [sortBy, setSortBy] = useState('Recommended');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { 
    problemsApi.list()
      .then(({ problems: loaded }) => setProblems(loaded))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : 'Unable to load problems.'))
      .finally(() => setLoading(false)); 
  }, []);

  const topics = ['All topics', ...Array.from(new Set(problems.flatMap((problem) => problem.topics)))];

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => { 
      const text = `${problem.title} ${problem.description} ${problem.topics.join(' ')}`.toLowerCase(); 
      return (!query || text.includes(query.toLowerCase())) && 
             (selectedDifficulty === 'All levels' || problem.difficulty === selectedDifficulty) && 
             (selectedTopic === 'All topics' || problem.topics.includes(selectedTopic)); 
    }).sort((a, b) => {
      if (sortBy === 'Shortest') return a.estimatedTime - b.estimatedTime;
      if (sortBy === 'Most solved') return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });
  }, [problems, query, selectedDifficulty, selectedTopic, sortBy]);

  const cardProblems: CardProblem[] = filteredProblems.map((problem, index) => { 
    const [icon, accent] = icons[problem.slug as keyof typeof icons] ?? [Code2, 'from-indigo-500 to-violet-500']; 
    return { ...problem, icon, accent, solved: '0', progress: 0, featured: index === 0 }; 
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-[#f8faff] to-slate-100 text-slate-900'} pb-24 lg:pb-0 selection:bg-indigo-100 selection:text-indigo-900`}>
      <div className="flex min-h-screen">
        
        {/* Persistent App Sidebar */}
        <AppSidebar active="problems" />

        {/* Main Content Pane */}
        <div className="min-w-0 flex-1 flex flex-col">
          
          {/* Header */}
          <header className={`sticky top-0 z-40 flex h-20 items-center justify-between gap-5 border-b px-6 sm:px-10 backdrop-blur-md transition-all ${
            darkMode ? 'border-slate-800 bg-slate-950/85 text-white' : 'border-slate-200/80 bg-white/85 text-slate-900'
          }`}>
            <div className="relative max-w-[560px] flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search className="h-4 w-4" />
              </span>
              <input 
                aria-label="Search problems" 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                placeholder="Search problems, topics, or patterns..." 
                className={`h-11 w-full rounded-xl border pl-11 pr-4 text-sm outline-none transition-all shadow-sm placeholder:text-slate-400 ${
                  darkMode 
                    ? 'border-slate-800 bg-slate-900/60 text-slate-200 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10' 
                    : 'border-slate-200 bg-slate-50/60 text-slate-700 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10'
                }`} 
                spellCheck="false"
              />
            </div>

            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <button type="button" aria-label="Notifications" className={`relative rounded-xl p-2.5 transition-colors border ${darkMode ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-white text-slate-600 shadow-sm'}`}>
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
              </button>
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-xs font-bold text-white shadow-sm">
                  S
                </div>
                <span className="hidden text-sm font-semibold sm:inline">Shadil</span>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1360px] px-6 py-8 sm:px-10">
            
            {/* Hero Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#11112b] to-slate-900 px-6 py-10 text-white shadow-2xl sm:px-12 ring-1 ring-white/10">
              <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
              <div className="absolute -left-20 -bottom-24 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
              
              <div className="relative max-w-2xl z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Practice with intent
                </div>
                <h1 className="text-3xl font-black tracking-tight sm:text-5xl leading-tight">Choose your next design challenge.</h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  Explore curated LLD problems with requirements, classes, and rigorous evaluation rubrics designed for senior engineering interviews.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Stat icon={<BookOpen className="h-4 w-4" />} value={`${problems.length}`} label="catalog problems" />
                  <Stat icon={<ShieldCheck className="h-4 w-4" />} value="8" label="rubric criteria" />
                  <Stat icon={<Flame className="h-4 w-4" />} value="API" label="live catalog" />
                </div>
              </div>
            </section>

            {/* Filters Section */}
            <section className="mt-10 flex flex-col gap-5 border-b border-slate-200/80 dark:border-slate-800 pb-6 xl:flex-row xl:items-center">
              <div className="flex items-center gap-2.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                  <Filter className="h-4 w-4" />
                </div>
                <span>Browse library</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button 
                    key={difficulty} 
                    onClick={() => setSelectedDifficulty(difficulty)} 
                    className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
                      selectedDifficulty === difficulty 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-600/20' 
                        : 'border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-indigo-300 shadow-sm'
                    }`}
                  >
                    {difficulty === 'All levels' ? difficulty : labels[difficulty]}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 xl:ml-auto">
                <SelectControl icon={<SlidersHorizontal className="h-3.5 w-3.5" />} value={selectedTopic} options={topics} onChange={setSelectedTopic} />
                <SelectControl value={sortBy} options={['Recommended', 'Most solved', 'Shortest']} onChange={setSortBy} />
              </div>
            </section>

            {/* Problem Grid or States */}
            {loading ? (
              <State title="Loading problem library" message="Fetching the latest architecture challenges..." />
            ) : error ? (
              <State title="Unable to load problems" message={error} action="Retry" onAction={() => window.location.reload()} />
            ) : filteredProblems.length === 0 ? (
              <State title="No problems match your filters" message="Try a different search term or reset the filters." action="Reset filters" onAction={() => { setQuery(''); setSelectedDifficulty('All levels'); setSelectedTopic('All topics'); }} />
            ) : (
              <>
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProblems.length}</span> challenges
                  </p>
                </div>
                <section className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {cardProblems.map((problem) => (
                    <ProblemCard key={problem.slug} problem={problem} darkMode={darkMode} />
                  ))}
                </section>
              </>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

function ProblemCard({ problem, darkMode }: { problem: CardProblem; darkMode: boolean }) { 
  const Icon = problem.icon; 
  return (
    <Link 
      to={`/problems/${problem.slug}`} 
      className={`group flex min-h-[310px] flex-col rounded-3xl border p-6 shadow-xl shadow-slate-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
        darkMode 
          ? 'border-slate-800 bg-slate-900/60 hover:border-indigo-500/50 hover:bg-slate-900' 
          : 'border-slate-200/80 bg-white hover:border-indigo-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${problem.accent} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </span>
        {problem.featured && (
          <span className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 shadow-sm">
            Featured
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2.5 text-xs">
        <span className={`rounded-full px-3 py-1 font-mono font-bold uppercase tracking-wider text-[10px] ${
          problem.difficulty === 'ADVANCED' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
          problem.difficulty === 'INTERMEDIATE' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
          'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          {labels[problem.difficulty]}
        </span>
        <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
          <Clock3 className="h-3.5 w-3.5 text-indigo-500" />
          {problem.estimatedTime} min
        </span>
      </div>

      <h2 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {problem.title}
      </h2>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
        {problem.description}
      </p>

      <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5 max-w-[180px]">
          {problem.topics.slice(0, 2).map((topic) => (
            <span key={topic} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
              {topic}
            </span>
          ))}
          {problem.topics.length > 2 && (
            <span className="rounded-lg bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
              +{problem.topics.length - 2}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
          Solve <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  ); 
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) { 
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md shadow-sm">
      <span className="text-indigo-400">{icon}</span>
      <span className="text-xs font-medium">
        <b className="mr-1.5 text-white font-bold">{value}</b>
        <span className="text-slate-300">{label}</span>
      </span>
    </div>
  ); 
}

function SelectControl({ icon, value, options, onChange }: { icon?: React.ReactNode; value: string; options: string[]; onChange: (value: string) => void }) { 
  return (
    <label className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm hover:border-indigo-300 transition-all cursor-pointer">
      <span className="text-indigo-500">{icon}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="bg-transparent outline-none cursor-pointer font-semibold">
        {options.map((option) => <option key={option} value={option} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">{option}</option>)}
      </select>
      <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
    </label>
  ); 
}

function State({ title, message, action, onAction }: { title: string; message: string; action?: string; onAction?: () => void }) { 
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-20 text-center shadow-sm">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mb-4 border border-indigo-100 dark:border-indigo-900">
        <Search className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">{message}</p>
      {action && (
        <button onClick={onAction} className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:scale-95 transition-all">
          {action}
        </button>
      )}
    </div>
  ); 
}