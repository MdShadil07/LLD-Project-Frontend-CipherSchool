import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Bold, Code2, Italic, Link2, List, Sparkles } from 'lucide-react';

// Type definitions ensuring self-contained type safety
export type AttemptStepId = 'requirements' | 'entities' | 'relationships' | 'flow' | 'tradeoffs' | 'review';

export interface Submission {
  requirements?: string;
  entities?: string;
  relationships?: string;
  flow?: string;
  tradeoffs?: string;
  assumptions?: string;
  [key: string]: any;
}

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

interface AttemptEditorProps {
  step: Exclude<AttemptStepId, "review">;
  submission: Submission;
  onChange: (key: keyof Submission, value: string) => void;
}

export default function AttemptEditor({
  step,
  submission,
  onChange,
}: AttemptEditorProps) {
  const field = fields[step] || fields.requirements;
  const mainTextareaRef = useRef<HTMLTextAreaElement>(null);
  const assumptionsTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert markdown formatting around selected text safely
  const handleFormat = (
    textareaRef: React.RefObject<HTMLTextAreaElement | null>,
    key: keyof Submission,
    wrapper: string,
    defaultText = ""
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = String(submission[key] || "");
    const selectedText = value.substring(start, end) || defaultText;
    
    const newValue = value.substring(0, start) + wrapper + selectedText + wrapper + value.substring(end);
    onChange(key, newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + wrapper.length, start + wrapper.length + selectedText.length);
    }, 0);
  };

  const getWordCount = (text = "") => {
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  };

  const currentVal = String(submission[field.key] || "");
  const assumptionsVal = String(submission.assumptions || "");

  return (
    <motion.section
      key={step}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-600">Active Section</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {field.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {field.description}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
        {/* Pro Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/80 px-3 py-2">
          <div className="flex items-center gap-1">
            <EditorButton 
              label="Bold" 
              icon={<Bold className="h-3.5 w-3.5" />} 
              onClick={() => handleFormat(mainTextareaRef, field.key, "**", "bold text")} 
            />
            <EditorButton 
              label="Italic" 
              icon={<Italic className="h-3.5 w-3.5" />} 
              onClick={() => handleFormat(mainTextareaRef, field.key, "*", "italic text")} 
            />
            <span className="mx-1 h-4 w-px bg-slate-200" />
            <EditorButton 
              label="Bullet List" 
              icon={<List className="h-3.5 w-3.5" />} 
              onClick={() => handleFormat(mainTextareaRef, field.key, "\n- ", "list item")} 
            />
            <EditorButton 
              label="Insert link" 
              icon={<Link2 className="h-3.5 w-3.5" />} 
              onClick={() => handleFormat(mainTextareaRef, field.key, "[", "link url](https://)")} 
            />
            <EditorButton 
              label="Code" 
              icon={<Code2 className="h-3.5 w-3.5" />} 
              onClick={() => handleFormat(mainTextareaRef, field.key, "```\n", "code snippet")} 
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>{getWordCount(currentVal)} words</span>
            <span>•</span>
            <span>{currentVal.length} chars</span>
          </div>
        </div>

        <label
          className="block px-4 pt-4 text-xs font-bold uppercase tracking-wider text-slate-500"
          htmlFor={`attempt-${String(field.key)}`}
        >
          {field.label}
        </label>
        <textarea
          ref={mainTextareaRef}
          id={`attempt-${String(field.key)}`}
          value={currentVal}
          onChange={(event) => onChange(field.key, event.target.value)}
          placeholder={field.placeholder}
          className={`w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-slate-700 outline-none ${field.minHeight}`}
          spellCheck="false"
        />
      </div>

      {step === "requirements" && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <label
                className="text-xs font-bold uppercase tracking-wider text-slate-500 cursor-pointer"
                htmlFor="attempt-assumptions"
              >
                Assumptions & Constraints
              </label>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {assumptionsVal.length} chars
            </span>
          </div>
          <textarea
            ref={assumptionsTextareaRef}
            id="attempt-assumptions"
            value={assumptionsVal}
            onChange={(event) => onChange("assumptions", event.target.value)}
            placeholder="State boundaries, constraints, and decisions you are making explicit for this design."
            className="min-h-[160px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-slate-700 outline-none"
            spellCheck="false"
          />
        </div>
      )}
    </motion.section>
  );
}

interface EditorButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function EditorButton({ label, icon, onClick }: EditorButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors active:scale-95"
    >
      {icon}
    </button>
  );
}