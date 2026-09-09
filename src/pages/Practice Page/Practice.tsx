import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Save,
  Send,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AppSidebar } from "../../components/Global Component/AppSidebar";
import ThemeToggle from "../../components/Global Component/ThemeToggle";
import AttemptEditor from "../../components/Attempt/AttemptEditor";
import AttemptFeedback from "../../components/Attempt/AttemptFeedback";
import AttemptHelperPanel from "../../components/Attempt/AttemptHelperPanel";
import AttemptOverview, {
  ReadinessChecklist,
} from "../../components/Attempt/AttemptOverview";
import AttemptProblemDrawer from "../../components/Attempt/AttemptProblemDrawer";
import AttemptStepper from "../../components/Attempt/AttemptStepper";
import {
  ATTEMPT_STEPS,
  type AttemptStepId,
  type Submission,
} from "../../components/Attempt/attempt.types";
import {
  practiceApi,
  type Attempt as ApiAttempt,
} from "../../services/practice.api";
import { problemsApi, type Problem } from "../../services/problems.api";
import { submitAttempt as submitAttemptApi } from "../../services/submissions.api";

const fieldForStep: Record<
  Exclude<AttemptStepId, "review">,
  keyof Submission
> = {
  requirements: "requirements",
  entities: "entities",
  relationships: "relationships",
  flow: "flow",
  tradeoffs: "tradeoffs",
};

export default function PracticePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedProblemSlug = searchParams.get("problem") || "parking-lot";

  const [attempt, setAttempt] = useState<ApiAttempt | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [step, setStep] = useState<AttemptStepId>("requirements");
  const [tab, setTab] = useState<"tips" | "reference">("tips");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [message, setMessage] = useState("Loading attempt...");
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Use a ref for the timer interval
  const timerRef = useRef<number | null>(null);
  const autosaveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError("");

    if (!id) {
      practiceApi
        .start(requestedProblemSlug)
        .then(({ attempt: createdAttempt }) => {
          const attemptId = createdAttempt._id || createdAttempt.id;
          if (!attemptId)
            throw new Error("Practice session was created without an id.");
          navigate(`/practice/${attemptId}`, { replace: true });
        })
        .catch((err) => {
          setError(
            err instanceof Error ? err.message : "Unable to start practice.",
          );
          setMessage("Unable to start practice");
        })
        .finally(() => setLoading(false));
      return;
    }

    practiceApi
      .get(id)
      .then(async ({ attempt: loadedAttempt }) => {
        setAttempt(loadedAttempt);
        const { problem: loadedProblem } = await problemsApi.getBySlug(
          loadedAttempt.problemId,
        );
        setProblem(loadedProblem);
        setElapsed(loadedAttempt.timeSpentSeconds || 0);
        setMessage("Ready to design");

        // Start timer
        timerRef.current = window.setInterval(() => {
          setElapsed((value) => value + 1);
        }, 1000);
      })
      .catch((err) => {
        setError(err.message || "Failed to load attempt");
        setMessage("Error loading attempt");
      })
      .finally(() => setLoading(false));

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [id, navigate, requestedProblemSlug]);

  // Debounced auto-save
  useEffect(() => {
    if (!attempt || attempt.status !== "DRAFT" || loading || !id || submitting) return;

    // Don't auto-save immediately on load if it hasn't changed. We assume onChange triggers state updates.
    // A simple approach is just saving whenever attempt.draft changes after 1.5s
    autosaveTimerRef.current = window.setTimeout(async () => {
      try {
        setSaving(true);
        await practiceApi.saveDraft(id, attempt.draft, elapsed);
        setMessage("Autosaved just now");
      } catch (err) {
        console.error("Autosave failed", err);
        setMessage("Autosave failed");
      } finally {
        setSaving(false);
      }
    }, 1500);

    return () => {
      if (autosaveTimerRef.current) {
        window.clearTimeout(autosaveTimerRef.current);
        autosaveTimerRef.current = null;
      }
    };
  }, [attempt?.draft, attempt?.status, id, loading, submitting]); // Only run for editable drafts

  const currentIndex = ATTEMPT_STEPS.findIndex((item) => item.id === step);

  const updateSubmission = (key: keyof Submission, value: string) => {
    setAttempt((current) => {
      if (!current) return current;
      return {
        ...current,
        draft: { ...current.draft, [key]: value },
      };
    });
  };

  const persistDraft = async () => {
    if (!attempt || !id) return;
    try {
      setSaving(true);
      setMessage("Saving draft...");
      await practiceApi.saveDraft(id, attempt.draft, elapsed);
      setMessage("Draft saved manually");
    } catch (err) {
      alert("Failed to save draft");
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const isValid = () => {
    if (!attempt) return false;
    return Object.values(attempt.draft).every(
      (value) => typeof value === "string" && value.trim().length >= 12,
    );
  };

  const requestSubmit = () => {
    if (!isValid()) {
      setStep("review");
      setMessage("Complete every section before submitting.");
      return;
    }
    setConfirmationOpen(true);
  };

  const confirmSubmit = async () => {
    if (!attempt || !id || submitting) return;

    try {
      if (autosaveTimerRef.current) {
        window.clearTimeout(autosaveTimerRef.current);
        autosaveTimerRef.current = null;
      }
      setSubmitting(true);
      setConfirmationOpen(false);
      setMessage("Saving your latest draft...");
      const savedAttempt = await practiceApi.saveDraft(id, attempt.draft, elapsed);
      setAttempt(savedAttempt.attempt);
      setMessage("Submitting your solution...");
      await submitAttemptApi(id);
      setAttempt((current) => current ? { ...current, status: "SUBMITTED" } : current);
      setMessage("Solution submitted");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unable to submit your solution.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-slate-500">Loading your attempt...</p>
        </div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
          <XCircle className="mx-auto h-8 w-8 text-rose-500" />
          <h2 className="mt-4 font-bold text-rose-900">Attempt Unavailable</h2>
          <p className="mt-2 text-sm text-rose-700">
            {error || "Could not find this attempt."}
          </p>
          <Link
            to="/problems"
            className="mt-4 inline-block rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  if (attempt.status === "SUBMITTED") {
    return (
      <SubmittedState
        attempt={attempt}
        problem={problem}
      />
    );
  }

  const formatTime = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#f7f8fc] pb-24 text-slate-900 lg:pb-0">
      <div className="flex min-h-screen">
        <AppSidebar active="practice" />
        <div className="min-w-0 flex-1">
          <header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-5 sm:px-8">
            <input
              aria-label="Search"
              placeholder="Search problems, topics, or anything..."
              className="hidden h-10 w-full max-w-130 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-indigo-400 focus:bg-white sm:block"
            />
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-xs text-slate-400 md:block">
                {message}
              </span>
              <ThemeToggle />
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                S
              </span>
              <span className="hidden text-sm font-medium text-slate-700 sm:block">
                Shadil
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </header>
          <main className="mx-auto max-w-375 px-5 py-6 sm:px-8">
            <AttemptHeader
              problemTitle={problem?.title ?? attempt.problemId}
              time={formatTime}
              onOpenProblem={() => setDrawerOpen(true)}
              onSave={persistDraft}
              saving={saving}
            />
            {problem && <PracticeProblemBrief problem={problem} />}
            <AttemptOverview submission={attempt.draft} step={step} />
            <AttemptStepper currentStep={step} onChange={setStep} />
            <div className="mt-6 flex flex-col gap-6 xl:flex-row">
              <div className="min-w-0 flex-1">
                {step === "review" ? (
                  attempt.status === "COMPLETED" ? (
                    <AttemptFeedback
                      attempt={attempt as any}
                      onRetry={() => {}}
                    />
                  ) : (
                    <ReviewCard submission={attempt.draft} valid={isValid()} />
                  )
                ) : (
                  <AttemptEditor
                    step={
                      fieldForStep[step] as Exclude<AttemptStepId, "review">
                    }
                    submission={attempt.draft}
                    onChange={updateSubmission}
                  />
                )}
                <AttemptActions
                  step={step}
                  index={currentIndex}
                  onPrevious={() =>
                    setStep(ATTEMPT_STEPS[Math.max(0, currentIndex - 1)].id)
                  }
                  onNext={() =>
                    setStep(
                      ATTEMPT_STEPS[
                        Math.min(ATTEMPT_STEPS.length - 1, currentIndex + 1)
                      ].id,
                    )
                  }
                  onSubmit={requestSubmit}
                />
              </div>
              <AttemptHelperPanel step={step} tab={tab} onTabChange={setTab} />
            </div>
          </main>
        </div>
      </div>
      <AttemptProblemDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      {confirmationOpen && (
        <SubmitConfirmation
          submitting={submitting}
          onCancel={() => setConfirmationOpen(false)}
          onConfirm={confirmSubmit}
        />
      )}
    </div>
  );
}

function SubmittedState({
  attempt,
  problem,
}: {
  attempt: ApiAttempt;
  problem: Problem | null;
}) {
  return (
    <div className="min-h-screen bg-[#f7f8fc] pb-24 text-slate-900 lg:pb-0">
      <div className="flex min-h-screen">
        <AppSidebar active="practice" />
        <main className="mx-auto flex w-full max-w-275 flex-1 items-start justify-center px-5 py-12 sm:px-8">
          <section className="w-full rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" /> Submitted
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Solution submitted</h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                  Your design has been saved as an immutable submission. This attempt can no longer be edited.
                </p>
              </div>
              <Link to="/problems" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Back to problems
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatusMetric label="Status" value="SUBMITTED" />
              <StatusMetric label="Submission" value="#1" />
              <StatusMetric label="Problem" value={problem?.title ?? attempt.problemId} />
            </div>
            <div className="mt-8 border-t border-slate-100 pt-8">
              <ReviewCard submission={attempt.draft} valid />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function StatusMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-2 truncate text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

function SubmitConfirmation({
  submitting,
  onCancel,
  onConfirm,
}: {
  submitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900">Submit your solution?</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          After submission, this attempt becomes read-only and cannot be edited.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} disabled={submitting} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 disabled:opacity-50">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={submitting} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Submitting..." : "Submit solution"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AttemptHeader({
  problemTitle,
  time,
  onOpenProblem,
  onSave,
  saving,
}: {
  problemTitle: string;
  time: string;
  onOpenProblem: () => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
      <div>
        <Link
          to="/problems"
          className="mb-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to problem library
        </Link>
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-indigo-100 to-violet-100 text-2xl">
            🚙
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {problemTitle}
              </h1>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Practice
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Create a structured design, explain your decisions, and receive
              feedback against a visible LLD rubric.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm font-bold text-slate-700">
          <Clock3 className="h-4 w-4 text-rose-500" />
          {time}
        </span>
        <button
          type="button"
          onClick={onOpenProblem}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Bookmark className="h-4 w-4" /> Problem brief
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-75"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}{" "}
          {saving ? "Saving..." : "Save draft"}
        </button>
      </div>
    </div>
  );
}
function PracticeProblemBrief({ problem }: { problem: Problem }) {
  return (
    <section className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Problem brief
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">
            {problem.title}
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600">
            {problem.description}
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
          {problem.estimatedTime} min
        </span>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <BriefList title="Functional requirements" items={problem.requirements} />
        <BriefList
          title="Non-functional requirements"
          items={problem.nonFunctionalRequirements}
        />
      </div>
    </section>
  );
}

function BriefList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-indigo-100 bg-white/80 p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AttemptActions({
  step,
  index,
  onPrevious,
  onNext,
  onSubmit,
}: {
  step: AttemptStepId;
  index: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        disabled={index <= 0}
        onClick={onPrevious}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 disabled:invisible"
      >
        <ArrowLeft className="h-4 w-4" />
        {step === "review" ? "Back to Edit" : "Previous"}
      </button>
      {step === "review" ? (
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
        >
          <Send className="h-4 w-4" /> Submit solution
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700"
        >
          Next <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
function ReviewCard({
  submission,
  valid,
}: {
  submission: Submission;
  valid: boolean;
}) {
  const labels: Record<keyof Submission, string> = {
    requirements: "Requirements",
    assumptions: "Assumptions",
    entities: "Classes & Responsibilities",
    relationships: "Relationships",
    flow: "Core Flow",
    tradeoffs: "Trade-offs & Edge Cases",
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Review submission</h2>
          <p className="mt-1 text-sm text-slate-500">
            Validate the artifact before freezing it for evaluation.
          </p>
        </div>
        {valid ? (
          <CheckCircle2 className="h-7 w-7 text-emerald-500" />
        ) : (
          <XCircle className="h-7 w-7 text-amber-500" />
        )}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Object.entries(submission).map(([key, value]) => (
          <article
            key={key}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {labels[key as keyof Submission] ?? key}
            </p>
            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {value || "No evidence provided yet."}
            </pre>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <ReadinessChecklist submission={submission} />
      </div>
    </section>
  );
}
