import { Check, ChevronRight, Clock3, Lightbulb, Link2, UsersRound } from 'lucide-react';

const practiceItems = ['Class design and responsibilities', 'Abstraction and interfaces', 'Design patterns (Strategy, Factory, etc.)', 'Handling edge cases', 'Extensibility and maintainability'];
const related = [
  ['Vehicle Rental System', '🚙'],
  ['Toll Booth System', '🏛️'],
  ['Car Sharing System', '🚗'],
];

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-slate-200 bg-white p-3 shadow-sm ${className}`}>{children}</section>;
}

export function ProblemCards() {
  return (
    <aside className="space-y-2.5 lg:col-span-4 xl:col-span-3">
      <Card>
        <h2 className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-slate-800"><span className="grid h-4 w-4 place-items-center rounded-full bg-indigo-100 text-[9px] text-indigo-600">i</span> Problem Details</h2>
        <div className="space-y-2 text-[9px] text-slate-500">
          <div className="flex items-center justify-between"><span className="flex items-center gap-2"><UsersRound className="h-3 w-3 text-indigo-500" />Difficulty</span><b className="rounded bg-emerald-50 px-2 py-0.5 text-[8px] font-medium text-emerald-600">Beginner</b></div>
          <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Clock3 className="h-3 w-3 text-indigo-500" />Estimated Time</span><b className="font-medium text-slate-700">30–45 minutes</b></div>
          <div className="flex items-start justify-between gap-2"><span className="flex shrink-0 items-center gap-2"><Link2 className="h-3 w-3 text-indigo-500" />Topics</span><span className="flex flex-wrap justify-end gap-1"><Tag label="OOP" /><Tag label="Design Patterns" /><Tag label="System Design" /></span></div>
          <div className="flex items-center justify-between"><span className="flex items-center gap-2"><UsersRound className="h-3 w-3 text-indigo-500" />Companies</span><span className="flex gap-1"><Tag label="Amazon" /><Tag label="Google" /><Tag label="Flipkart" /><Tag label="+3" /></span></div>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-slate-800"><span className="text-indigo-500">♨</span> What You&apos;ll Practice</h2>
        <ul className="space-y-1.5">{practiceItems.map((item) => <li key={item} className="flex items-center gap-2 text-[9px] text-slate-500"><Check className="h-3.5 w-3.5 rounded-full bg-emerald-400 p-[3px] text-[#10231f]" />{item}</li>)}</ul>
      </Card>
      <Card>
        <h2 className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold text-slate-800"><Link2 className="h-3.5 w-3.5 text-indigo-500" /> Related Problems</h2>
        <div className="space-y-1">{related.map(([label, icon]) => <button key={label} className="flex w-full items-center gap-2 rounded px-1 py-1 text-left text-[9px] text-slate-600 hover:bg-slate-50"><span className="text-xs">{icon}</span><span className="flex-1">{label}</span><ChevronRight className="h-3 w-3 text-indigo-500" /></button>)}</div>
      </Card>
      <Card className="border-indigo-200 bg-indigo-50">
        <h2 className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-slate-800"><Lightbulb className="h-3.5 w-3.5 fill-[#f9cd4d] text-[#f9cd4d]" /> Tip</h2>
        <p className="text-[9px] leading-relaxed text-slate-600">Start by identifying the key entities and their responsibilities. Think about how the system will scale and how to handle different vehicle types.</p>
      </Card>
    </aside>
  );
}

function Tag({ label }: { label: string }) { return <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[7px] text-slate-500">{label}</span>; }
