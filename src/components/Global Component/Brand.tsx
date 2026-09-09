import { Network } from 'lucide-react';

export const BRAND_NAME = 'ModelForge';
export const BRAND_TAGLINE = 'Low-level design, made practical.';

export function BrandMark({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  return (
    <div className={`grid shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-md shadow-indigo-500/15 ${compact ? 'h-8 w-8' : 'h-9 w-9'} ${className}`}>
      <Network className={compact ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={2} />
    </div>
  );
}
