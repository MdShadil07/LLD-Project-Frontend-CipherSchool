import type { ReactNode } from "react";
import { Bold, Code2, Italic, Link2 } from "lucide-react";
import type { AttemptStepId, Submission } from "./attempt.types";

const fields: Record<
  Exclude<AttemptStepId, "review">,
  {
    title: string;
    description: string;
    label: string;
    placeholder: string;
    minHeight: string;
    key: keyof Submission;
  }
> = {
  requirements: {
    title: "Scope and requirements",
    description: "Define what the system must do and make ambiguity explicit.",
    label: "Requirements",
    placeholder: "1. The parking lot has multiple floors... ",
    minHeight: "min-h-[220px]",
    key: "requirements",
  },
  entities: {
    title: "Core entities",
    description:
      "Identify the nouns, classes, attributes, and enums that form the design vocabulary.",
    label: "Classes, attributes, and enums",
    placeholder:
      "enum VehicleType { CAR, TRUCK, BIKE }\n\nclass ParkingLot { ... }",
    minHeight: "min-h-[320px]",
    key: "entities",
  },
  relationships: {
    title: "Relationships and responsibilities",
    description:
      "Explain ownership, collaboration, composition, and the boundaries between objects.",
    label: "Relationships and patterns",
    placeholder:
      "- ParkingLot has a 1:N relationship with Level\n- PricingStrategy owns fee calculation",
    minHeight: "min-h-[300px]",
    key: "relationships",
  },
  flow: {
    title: "Core flow",
    description:
      "Show the main use case as a sequence of meaningful interactions and state changes.",
    label: "API and execution flow",
    placeholder:
      "1. Vehicle approaches EntryGate.\n2. EntryGate requests an available spot...",
    minHeight: "min-h-[300px]",
    key: "flow",
  },
  tradeoffs: {
    title: "Trade-offs and edge cases",
    description:
      "Show how the design behaves under failure, concurrency, and changing requirements.",
    label: "Scaling, concurrency, and edge cases",
    placeholder:
      "- Two vehicles cannot claim the same spot.\n- Payment failure keeps the ticket open.",
    minHeight: "min-h-[300px]",
    key: "tradeoffs",
  },
};

export default function AttemptEditor({
  step,
  submission,
  onChange,
}: {
  step: Exclude<AttemptStepId, "review">;
  submission: Submission;
  onChange: (key: keyof Submission, value: string) => void;
}) {
  const field = fields[step];
  return (
    <section>
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {field.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {field.description}
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
        <div className="flex items-center gap-1 border-b border-slate-100 bg-slate-50 px-3 py-2">
          <EditorButton label="Bold" icon={<Bold className="h-3.5 w-3.5" />} />
          <EditorButton
            label="Italic"
            icon={<Italic className="h-3.5 w-3.5" />}
          />
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <EditorButton
            label="Insert link"
            icon={<Link2 className="h-3.5 w-3.5" />}
          />
          <EditorButton label="Code" icon={<Code2 className="h-3.5 w-3.5" />} />
          <span className="ml-auto text-[10px] font-mono text-slate-400">
            {submission[field.key].length} chars
          </span>
        </div>
        <label
          className="block px-4 pt-4 text-xs font-bold uppercase tracking-wider text-slate-500"
          htmlFor={`attempt-${field.key}`}
        >
          {field.label}
        </label>
        <textarea
          id={`attempt-${field.key}`}
          value={submission[field.key]}
          onChange={(event) => onChange(field.key, event.target.value)}
          placeholder={field.placeholder}
          className={`w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-slate-700 outline-none ${field.minHeight}`}
          spellCheck="false"
        />
      </div>
      {step === "requirements" && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
            <label
              className="text-xs font-bold uppercase tracking-wider text-slate-500"
              htmlFor="attempt-assumptions"
            >
              Assumptions
            </label>
            <span className="text-[10px] font-mono text-slate-400">
              {submission.assumptions.length} chars
            </span>
          </div>
          <textarea
            id="attempt-assumptions"
            value={submission.assumptions}
            onChange={(event) => onChange("assumptions", event.target.value)}
            placeholder="State boundaries, constraints, and decisions you are making explicit for this design."
            className="min-h-[180px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-slate-700 outline-none"
            spellCheck="false"
          />
        </div>
      )}
    </section>
  );
}

function EditorButton({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
    >
      {icon}
    </button>
  );
}
