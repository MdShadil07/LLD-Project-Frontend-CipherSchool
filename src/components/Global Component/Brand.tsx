

export const BRAND_NAME = 'DesignPrep';
export const BRAND_TAGLINE = 'System Architecture & LLD';

export interface BrandMarkProps {
  compact?: boolean;
  className?: string;
}

export function BrandMark({ compact = false, className = '' }: BrandMarkProps) {
  const size = compact ? 28 : 36;
  
  return (
    <div 
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-white/20 shrink-0 transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Abstract System Architecture Node Mark SVG */}
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {/* Glowing AI status beacon dot indicator */}
      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-indigo-950 animate-pulse"></span>
    </div>
  );
}

export default BrandMark;