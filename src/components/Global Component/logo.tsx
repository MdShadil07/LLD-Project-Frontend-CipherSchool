

export const Logo = ({ 
  variant = 'horizontal', // 'horizontal' | 'sidebar' | 'icon' | 'badge'
  theme = 'light',        // 'light' | 'dark'
  size = 'md',            // 'sm' | 'md' | 'lg' | 'xl'
  showSubtitle = false,
  className = ''
}) => {
  // Size mapping configurations for icons and text
  const dimensions = {
    sm: { icon: 28, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 36, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 48, text: 'text-2xl', sub: 'text-[11px]' },
    xl: { icon: 64, text: 'text-4xl', sub: 'text-xs' },
  }[size] || { icon: 36, text: 'text-xl', sub: 'text-[10px]' };

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subColor = theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600';

  const LogoMark = () => (
    <div 
      className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-white/20 shrink-0 transition-transform hover:scale-105"
      style={{ width: dimensions.icon, height: dimensions.icon }}
    >
      {/* Abstract System Architecture Node Mark SVG */}
      <svg width={dimensions.icon * 0.55} height={dimensions.icon * 0.55} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {/* Glowing AI status beacon dot indicator */}
      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-indigo-950 animate-pulse"></span>
    </div>
  );

  if (variant === 'icon') {
    return <LogoMark />;
  }

  return (
    <div className={`flex items-center gap-3 cursor-pointer group select-none ${className}`}>
      <LogoMark />
      {(variant === 'horizontal' || variant === 'sidebar' || variant === 'badge') && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight leading-none ${dimensions.text} ${textColor}`}>
              Design<span className="text-indigo-600 group-hover:text-indigo-500 transition-colors">Prep</span>
            </span>
            {variant === 'badge' && (
              <span className="rounded-md bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">PRO</span>
            )}
          </div>
          {showSubtitle && (
            <span className={`font-semibold tracking-widest uppercase mt-0.5 ${dimensions.sub} ${subColor}`}>
              System Architecture & LLD
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;