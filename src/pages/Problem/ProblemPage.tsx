import { useEffect, useState } from "react";
import { Bell, CarFront, ChevronDown, Clock3, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AppSidebar } from "../../components/Global Component/AppSidebar";
import ThemeToggle from "../../components/Global Component/ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";
import { problemsApi, type Problem } from "../../services/problems.api";

export default function ProblemPage() {
  const { slug = "parking-lot" } = useParams();
  const { darkMode } = useTheme();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    problemsApi
      .getBySlug(slug)
      .then(({ problem: loaded }) => setProblem(loaded))
      .catch((requestError) =>
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load this problem.",
        ),
      )
      .finally(() => setLoading(false));
  }, [slug]);
  if (loading)
    return (
      <ProblemState
        title="Loading problem"
        message="Fetching the complete problem brief..."
      />
    );
  if (error || !problem)
    return (
      <ProblemState
        title="Problem unavailable"
        message={error || "Problem not found."}
      />
    );

  return (
    <div className="problem-scale min-h-screen bg-slate-50 pb-24 font-sans text-slate-900 lg:pb-0">
      <div className="flex min-h-screen">
        <AppSidebar active="problems" />
        <div className="min-w-0 flex-1">
          <header
            className={`flex h-20 items-center gap-5 border-b px-6 sm:px-10 ${darkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"}`}
          >
            <div className="relative max-w-[560px] flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                aria-label="Search problems"
                placeholder="Search problems..."
                className={`h-11 w-full rounded-lg border pl-11 text-sm outline-none ${darkMode ? "border-slate-700 bg-slate-900 text-slate-200" : "border-slate-200 bg-slate-50 text-slate-700"}`}
              />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-xs text-white">
                S
              </span>
              <span className="hidden text-sm sm:inline">Shadil</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </header>
          <main className="mx-auto max-w-[1360px] px-6 py-7 sm:px-10">
            <Link
              to="/problems"
              className="mb-4 inline-block text-sm text-slate-400 hover:text-indigo-600"
            >
              Problems <span className="mx-2">›</span>
              <span className="text-slate-600">{problem.title}</span>
            </Link>
            <section className="mb-6 flex flex-wrap items-center gap-5 border-b border-slate-200 pb-6">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100">
                <CarFront className="h-7 w-7 text-indigo-600" />
              </div>
              <div className="mr-auto">
                <h1 className="text-3xl font-bold tracking-tight">
                  {problem.title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm text-slate-500">
                  {problem.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="rounded bg-emerald-50 px-2.5 py-1 font-medium text-emerald-600">
                    {problem.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    {problem.estimatedTime} minutes
                  </span>
                  {problem.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded bg-slate-100 px-2 py-1"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/practice?problem=${problem.slug}`}
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white"
              >
                Start Practice →
              </Link>
            </section>
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">Problem requirements</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Use these requirements as the contract for your design.
                </p>
                <Section
                  title="Functional requirements"
                  items={problem.requirements}
                  numbered
                />
                <Section
                  title="Non-functional requirements"
                  items={problem.nonFunctionalRequirements}
                />
                <section className="mt-8">
                  <h2 className="text-lg font-bold">Evaluation rubric</h2>
                  <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
                    {problem.rubric.map((criterion) => (
                      <div
                        key={criterion.criterion}
                        className="flex items-start justify-between gap-4 p-4"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {criterion.criterion}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            {criterion.description}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                          {criterion.weight}%
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </article>
              <aside className="space-y-5">
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                  <h2 className="font-bold text-indigo-900">
                    Before you start
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-indigo-800">
                    Explain responsibilities, relationships, core behavior,
                    trade-offs, and edge cases. There is no single correct
                    design.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="font-bold text-slate-800">Practice focus</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {problem.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  items,
  numbered = false,
}: {
  title: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      <ol className="mt-3 space-y-3">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-slate-600"
          >
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${numbered ? "bg-indigo-600 text-white" : "text-indigo-500"}`}
            >
              {numbered ? index + 1 : "•"}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}
function ProblemState({ title, message }: { title: string; message: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
        <Link
          to="/problems"
          className="mt-5 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to problems
        </Link>
      </div>
    </div>
  );
}
