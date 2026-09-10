import { Check, ChevronRight, Clock3, Lightbulb, Link2, UsersRound, Sparkles, Layers } from 'lucide-react';

const practiceItems = ['Class design and responsibilities', 'Abstraction and interfaces', 'Design patterns (Strategy, Factory, etc.)', 'Handling edge cases', 'Extensibility and maintainability'];
const related = [
  ['Vehicle Rental System', '🚙'],
  ['Toll Booth System', '🏛️'],
  ['Car Sharing System', '🚗'],
];

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-950/5 ring-1 ring-slate-900/5 transition-all hover:border-indigo-200/80 ${className}`}>
      {children}
    </section>
  );
}

export function ProblemCards() {
  return (
    <aside className="space-y-6 lg:col-span-4 xl:col-span-3">
      
      {/* Problem Details Card */}
      <Card>
        <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/60 shadow-sm">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-900">Problem Details</h2>
            <p className="text-[10px] font-mono text-slate-400">Specifications & metadata</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-500 font-medium">
              <UsersRound className="h-3.5 w-3.5 text-indigo-500" /> Difficulty
            </span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200 shadow-sm">
              Beginner
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-500 font-medium">
              <Clock3 className="h-3.5 w-3.5 text-indigo-500" /> Est. Time
            </span>
            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
              30–45 mins
            </span>
          </div>

          <div className="flex items-start justify-between gap-2 pt-1">
            <span className="flex shrink-0 items-center gap-2 text-slate-500 font-medium mt-1">
              <Link2 className="h-3.5 w-3.5 text-indigo-500" /> Topics
            </span>
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[180px]">
              <Tag label="OOP" />
              <Tag label="Design Patterns" />
              <Tag label="System Design" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-2 text-slate-500 font-medium">
              <UsersRound className="h-3.5 w-3.5 text-indigo-500" /> Companies
            </span>
            <div className="flex flex-wrap justify-end gap-1">
              <Tag label="Amazon" />
              <Tag label="Google" />
              <Tag label="Flipkart" />
              <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">+3</span>
            </div>
          </div>
        </div>
      </Card>

      {/* What You'll Practice Card */}
      <Card>
        <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-slate-100">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-violet-50 text-violet-600 border border-violet-200/60 shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-900">What You'll Practice</h2>
            <p className="text-[10px] font-mono text-slate-400">Core architectural goals</p>
          </div>
        </div>

        <ul className="space-y-3">
          {practiceItems.map((item) => (
            <li key={item} className="flex items-start gap-3 text-xs text-slate-600 font-medium leading-relaxed">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5 shadow-sm">
                <Check className="h-3 w-3 stroke-[3]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Related Problems Card */}
      <Card>
        <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-slate-100">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 shadow-sm">
            <Link2 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-900">Related Problems</h2>
            <p className="text-[10px] font-mono text-slate-400">Continue your path</p>
          </div>
        </div>

        <div className="space-y-2">
          {related.map(([label, icon]) => (
            <button 
              key={label} 
              type="button"
              className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 text-left text-xs font-bold text-slate-700 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <span className="text-base p-1.5 rounded-xl bg-white shadow-sm border border-slate-100">{icon}</span>
              <span className="flex-1 truncate group-hover:text-indigo-600 transition-colors">{label}</span>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </Card>

      {/* Pro Tip Card */}
      <Card className="border-indigo-200/80 bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-amber-700 border border-amber-200 shadow-sm">
            <Lightbulb className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          </div>
          <span className="text-xs font-bold text-slate-900">Architectural Tip</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-600 font-medium">
          Start by identifying key entities and their responsibilities. Think about how the system will scale and how to handle different vehicle types cleanly.
        </p>
      </Card>

    </aside>
  );
}

function Tag({ label }: { label: string }) { 
  return (
    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-600 border border-slate-200/60 shadow-sm">
      {label}
    </span>
  ); 
}