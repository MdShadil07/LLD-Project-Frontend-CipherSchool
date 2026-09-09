import { CarFront, ClipboardList, Code2, MessageSquare, Settings2 } from 'lucide-react';

const requirements = [
  'The parking lot has multiple floors.',
  'Each floor has multiple parking spots.',
  'Support different vehicle types (Car, Bike, Truck, etc.).',
  'Park a vehicle in an appropriate spot based on its type.',
  'Generate a ticket when a vehicle is parked.',
  'Calculate and collect parking fees when the vehicle exits.',
  'Mark the spot as available after the vehicle exits.',
];
const nonFunctional = ['Efficient spot allocation even when the parking lot is large.', 'Should be extensible to support new vehicle types.', 'Optimize for both time and space complexity.', 'Thread-safe (if concurrent entry/exit is considered).', 'Maintainable and clean design.'];

export function ProblemStatement() {
  return (
    <div className="min-w-0 lg:col-span-8 xl:col-span-9">
      <div className="mb-2 flex gap-5 border-b border-slate-200 px-2 text-[9px] text-slate-400">
        <Tab icon={ClipboardList} label="Problem" active />
        <Tab icon={Settings2} label="Extensions" />
        <Tab icon={MessageSquare} label="Discussions" />
        <Tab icon={Code2} label="Editorial" />
      </div>
      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <Title icon={ClipboardList} title="Problem Statement" />
        <p className="mt-2 max-w-3xl text-[10px] leading-relaxed text-slate-500">Design a parking lot system that can park different types of vehicles in a parking lot with multiple floors. The system should efficiently manage parking spots, handle entry and exit of vehicles, and calculate parking fees.</p>
        <div className="mt-5"><Title icon={CarFront} title="Functional Requirements" /><ol className="mt-3 space-y-1.5">{requirements.map((item, index) => <li key={item} className="flex items-center gap-2.5 text-[9px] text-slate-500"><span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-indigo-600 text-[7px] text-white">{index + 1}</span>{item}</li>)}</ol></div>
        <div className="mt-5"><Title icon={Settings2} title="Non-Functional Requirements" /><ul className="mt-3 space-y-1.5">{nonFunctional.map((item) => <li key={item} className="flex gap-2 text-[9px] text-slate-500"><span className="text-indigo-500">•</span>{item}</li>)}</ul></div>
      </article>
    </div>
  );
}

function Tab({ icon: Icon, label, active = false }: { icon: typeof ClipboardList; label: string; active?: boolean }) { return <button className={`flex items-center gap-1.5 border-b-2 px-1 py-2.5 ${active ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-700'}`}><Icon className="h-3 w-3" />{label}</button>; }
function Title({ icon: Icon, title }: { icon: typeof ClipboardList; title: string }) { return <h2 className="flex items-center gap-2 text-[11px] font-semibold text-slate-800"><Icon className="h-3.5 w-3.5 text-indigo-500" />{title}</h2>; }
