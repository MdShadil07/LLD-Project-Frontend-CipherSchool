import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, FileText, Cpu, LineChart, Target, Lightbulb, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-28 overflow-visible relative">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[900px] h-[900px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #eef2ff 0%, transparent 70%)', transform: 'translate(30%, -20%)' }} />
      <div className="absolute bottom-0 left-0 -z-10 w-[700px] h-[700px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #f5f3ff 0%, transparent 70%)', transform: 'translate(-30%, 20%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left Copy ── */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wide uppercase mb-8">
              <Sparkles className="w-3 h-3" />
              <span>Practice · Get Feedback · Grow</span>
            </div>

            <h1 className="text-5xl lg:text-[3.6rem] font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Turn LLD Practice<br />into <span className="text-indigo-600">Real Progress</span>
            </h1>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Solve real-world Low-Level Design problems, submit your solutions, get explainable feedback, and improve with every attempt.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <button className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white rounded-xl flex items-center justify-center gap-2 group transition-all"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 10px 40px rgba(79,70,229,0.35)' }}>
                Start Practicing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-indigo-200 hover:bg-indigo-50 shadow-sm transition-all">
                Browse Problems
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Feature icon={<FileText className="w-4 h-4 text-indigo-500" />} text="Curated LLD Problems" />
              <Feature icon={<Cpu className="w-4 h-4 text-indigo-500" />} text="AI-Powered Feedback" />
              <Feature icon={<LineChart className="w-4 h-4 text-indigo-500" />} text="Track Your Progress" />
              <Feature icon={<Target className="w-4 h-4 text-indigo-500" />} text="Learn at Your Pace" />
            </div>
          </div>

          {/* ── Right Graphic ── */}
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   HERO MOCKUP  — premium interactive UML graphic
───────────────────────────────────────────────── */
function HeroMockup() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative select-none" style={{ perspective: '1200px' }}>

      {/* Glow blob behind the window */}
      <div className="absolute inset-0 rounded-3xl -z-10 blur-3xl opacity-25"
        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', transform: 'scale(1.08) translateY(10px)' }} />

      {/* ── App Window ── */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: 'linear-gradient(160deg, #0f1729 0%, #141e30 100%)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)',
          transform: 'rotateY(-4deg) rotateX(3deg)',
          transition: 'transform 0.5s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'rotateY(-4deg) rotateX(3deg)')}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 h-10 border-b border-white/5"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-auto text-[10px] text-slate-500 font-mono">parking-lot.lld</span>
        </div>

        {/* Body */}
        <div className="flex" style={{ minHeight: 320 }}>

          {/* Sidebar steps */}
          <div className="w-36 shrink-0 border-r border-white/5 py-5 px-3 flex flex-col gap-1">
            <StepRow num="1" label="Requirements" />
            <StepRow num="2" label="Design" active />
            <StepRow num="3" label="Submit" />
            <StepRow num="4" label="Feedback" />
            <div className="mt-auto pt-6 text-[9px] text-slate-600 italic leading-snug">
              Better<br />Designs<br />Brighter<br />Engineers
            </div>
          </div>

          {/* Diagram canvas */}
          <div className="flex-1 relative p-6 overflow-hidden">

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* SVG connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {/* ParkingLot → Vehicle */}
              <line x1="46%" y1="115" x2="18%" y2="230" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
              {/* ParkingLot → ParkingSpot */}
              <line x1="54%" y1="115" x2="54%" y2="230" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
              {/* ParkingLot → Floor */}
              <line x1="62%" y1="115" x2="84%" y2="230" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
              {/* Arrow heads */}
              <polygon points="18,230 14,220 22,220" fill="#4f46e5" opacity="0.5" />
              <polygon points="54%,230 calc(54% - 4px),220 calc(54% + 4px),220" fill="#4f46e5" opacity="0.5" />
            </svg>

            {/* ── Class: ParkingLot (root) ── */}
            <div className="relative z-10 mx-auto mb-8"
              style={{ width: 160 }}>
              <ClassCard
                name="ParkingLot"
                methods={['+ parkVehicle(v)', '+ removeVehicle(id)', '+ getAvailableSpots()']}
                isRoot
                isHovered={hovered === 'ParkingLot'}
                onHover={setHovered}
              />
            </div>

            {/* ── Children row ── */}
            <div className="relative z-10 flex justify-between gap-3">
              <ClassCard
                name="Vehicle"
                fields={['+ vehicleId', '+ type']}
                isHovered={hovered === 'Vehicle'}
                onHover={setHovered}
              />
              <ClassCard
                name="ParkingSpot"
                fields={['+ spotId', '+ isOccupied']}
                isHovered={hovered === 'ParkingSpot'}
                onHover={setHovered}
              />
              <ClassCard
                name="Floor"
                fields={['+ floorNumber', '+ spots']}
                isHovered={hovered === 'Floor'}
                onHover={setHovered}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating badge 1 – green ── */}
      <FloatingBadge
        style={{ top: '22%', right: '-60px' }}
        delay="0s"
        icon={<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
        text="Good separation of responsibilities!"
        accentColor="#10b981"
      />

      {/* ── Floating badge 2 – amber ── */}
      <FloatingBadge
        style={{ bottom: '18%', right: '-52px' }}
        delay="1.4s"
        icon={<Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
        text="Consider handling edge cases for full capacity."
        accentColor="#f59e0b"
      />

      {/* ── Doodle annotation ── */}
      <div className="absolute -bottom-14 right-4 flex items-center gap-2"
        style={{ transform: 'rotate(-8deg)' }}>
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-slate-500">Design</p>
          <p className="text-sm font-semibold text-indigo-500">Iterate</p>
          <p className="text-sm font-semibold text-slate-500">Improve</p>
        </div>
        {/* Hand-drawn arrow SVG */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="text-indigo-400">
          <path d="M8 36 C12 20, 28 10, 36 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeDasharray="2 3" />
          <path d="M30 4 L36 8 L32 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </div>
  );
}

/* ── Small sub-components ── */

function StepRow({ num, label, active = false }: { num: string; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs font-medium transition-colors cursor-default ${active ? 'text-indigo-300' : 'text-slate-500 hover:text-slate-300'}`}
      style={active ? { background: 'rgba(99,102,241,0.15)' } : {}}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${active ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400'}`}>
        {num}
      </div>
      {label}
    </div>
  );
}

function ClassCard({
  name, methods, fields, isRoot = false, isHovered, onHover
}: {
  name: string;
  methods?: string[];
  fields?: string[];
  isRoot?: boolean;
  isHovered: boolean;
  onHover: (n: string | null) => void;
}) {
  return (
    <div
      className="rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden"
      style={{
        background: isHovered
          ? 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.12))'
          : 'rgba(255,255,255,0.05)',
        borderColor: isHovered ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.08)',
        boxShadow: isHovered ? '0 0 20px rgba(99,102,241,0.25), 0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.2)',
        transform: isHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
        width: isRoot ? 160 : undefined,
        flex: isRoot ? undefined : 1,
      }}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Class name header */}
      <div className="px-3 py-2 border-b text-center"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: isHovered ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)' }}>
        <span className="text-[11px] font-bold text-slate-200 tracking-wide">{name}</span>
      </div>

      {/* Methods / fields */}
      <div className="px-3 py-2 space-y-1">
        {(methods || fields || []).map((line, i) => (
          <p key={i} className="text-[9px] font-mono leading-relaxed"
            style={{ color: methods ? '#a78bfa' : '#67e8f9' }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function FloatingBadge({
  icon, text, style, delay, accentColor
}: {
  icon: React.ReactNode;
  text: string;
  style: React.CSSProperties;
  delay: string;
  accentColor: string;
}) {
  return (
    <div
      className="absolute z-20 flex items-start gap-2.5 rounded-xl px-3 py-2.5 max-w-[190px]"
      style={{
        ...style,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px ${accentColor}22`,
        animation: `float 4s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      {icon}
      <p className="text-[11px] font-medium text-slate-700 leading-snug">{text}</p>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-600">{text}</span>
    </div>
  );
}
