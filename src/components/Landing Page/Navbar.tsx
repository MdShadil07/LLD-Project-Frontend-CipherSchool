import { Link } from 'react-router-dom';
import { BRAND_NAME, BRAND_TAGLINE, BrandMark } from '../Global Component/Brand';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BrandMark compact />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-tight tracking-tight">{BRAND_NAME}</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">{BRAND_TAGLINE}</span>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className="text-brand-600 font-medium text-sm">Home</Link>
            <a href="#" className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors">Problems</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors">How it Works</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors">About</a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all focus:ring-4 focus:ring-slate-100">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all focus:ring-4 focus:ring-brand-100">
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
