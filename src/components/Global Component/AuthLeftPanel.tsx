import { BRAND_NAME, BRAND_TAGLINE, BrandMark } from './Brand';


/**
 * AuthLeftPanel — Premium decorative side panel shared by Login & Signup.
 * Displays an animated LLD-themed graphic with floating elements.
 */
export default function AuthLeftPanel() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between h-full w-full p-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0f0c29 0%, #1a1040 50%, #0d1b3e 100%)',
      }}
    >
      {/* ── Animated background orbs ── */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)', transform: 'translate(-50%,-50%)' }} />

      {/* ── Dot grid overlay ── */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* ── Top: Logo ── */}
      <div className="relative z-10 flex items-center gap-3">
        <BrandMark compact />
        <div>
          <p className="text-white font-bold text-base tracking-tight">{BRAND_NAME}</p>
          <p className="text-indigo-300/70 text-[10px] uppercase tracking-widest font-medium">{BRAND_TAGLINE}</p>
        </div>
      </div>

      {/* ── Center: Interactive UML Graphic ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-10">

        {/* Glowing card container */}
        <div className="relative w-full max-w-sm">
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />

          {/* Window */}
          <div className="relative rounded-2xl border border-white/10 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>

            {/* Title bar */}
            <div className="flex items-center gap-1.5 px-4 h-9 border-b border-white/5"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-auto font-mono text-[9px] text-white/25">elevator.lld</span>
            </div>

            <div className="p-6 flex flex-col items-center gap-5">

              {/* Root class */}
              <MiniClass
                name="ElevatorSystem"
                color="#6366f1"
                items={['+ requestFloor(int)', '+ getStatus()', '+ dispatchElevator()']}
                isMethods
              />

              {/* SVG connector */}
              <svg width="160" height="28" className="opacity-60" overflow="visible">
                <line x1="40" y1="0" x2="20" y2="28" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="80" y1="0" x2="80" y2="28" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="120" y1="0" x2="140" y2="28" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="20" cy="28" r="3" fill="#6366f1" />
                <circle cx="80" cy="28" r="3" fill="#6366f1" />
                <circle cx="140" cy="28" r="3" fill="#6366f1" />
              </svg>

              {/* Child classes */}
              <div className="flex gap-3 w-full">
                <MiniClass name="Elevator" color="#8b5cf6" items={['+ floor', '+ state']} small />
                <MiniClass name="Floor" color="#06b6d4" items={['+ floorNo', '+ button']} small />
                <MiniClass name="Request" color="#a855f7" items={['+ direction', '+ time']} small />
              </div>
            </div>
          </div>
        </div>

        {/* Floating feedback badge */}
        <div
          className="mt-6 flex items-start gap-2 px-3 py-2.5 rounded-xl max-w-xs w-full"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            animation: 'float 4s ease-in-out infinite',
          }}
        >
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: 'rgba(99,102,241,0.3)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 5v5l3 3" />
            </svg>
          </div>
          <p className="text-xs text-white/70 leading-snug">
            <span className="text-indigo-300 font-semibold">AI Feedback: </span>
            Great use of the Strategy pattern for scheduling!
          </p>
        </div>
      </div>

      {/* ── Bottom: Testimonial ── */}
      <div className="relative z-10">
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          ))}
        </div>
        <p className="text-white/60 text-sm leading-relaxed italic mb-4">
          "The AI feedback pinpointed exactly where my Elevator design broke SRP. I improved more in one week than in months of solo practice."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            A
          </div>
          <div>
            <p className="text-white/80 text-sm font-semibold">Arjun Mehta</p>
            <p className="text-white/40 text-xs">SDE-II, Bangalore</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mini class card inside the panel ── */
function MiniClass({
  name, color, items, isMethods = false, small = false
}: {
  name: string; color: string; items: string[]; isMethods?: boolean; small?: boolean;
}) {
  return (
    <div
      className="rounded-xl border overflow-hidden transition-all duration-300 hover:scale-105 cursor-default"
      style={{
        flex: small ? 1 : undefined,
        width: small ? undefined : '100%',
        background: 'rgba(255,255,255,0.05)',
        borderColor: `${color}40`,
        boxShadow: `0 0 20px ${color}15`,
      }}
    >
      <div className="px-3 py-1.5 text-center border-b" style={{ borderColor: `${color}30`, background: `${color}15` }}>
        <span className="text-[10px] font-bold text-white/90 tracking-wide">{name}</span>
      </div>
      <div className="px-2.5 py-2 space-y-1">
        {items.map((item, i) => (
          <p key={i} className="text-[8.5px] font-mono leading-snug" style={{ color: isMethods ? '#c4b5fd' : color === '#06b6d4' ? '#67e8f9' : '#a78bfa' }}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
