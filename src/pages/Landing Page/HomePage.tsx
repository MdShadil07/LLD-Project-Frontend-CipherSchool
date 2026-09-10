import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../../components/Global Component/logo';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  LineChart,
  Menu,
  Play,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from 'lucide-react';

// --- Reusable Components ---

type BadgeVariant = 'indigo' | 'emerald' | 'amber' | 'rose';
type SectionHeadingProps = { badge?: ReactNode; title: ReactNode; subtitle?: ReactNode; align?: 'left' | 'center' };

const Badge = ({ children, variant = 'indigo', className = '' }: { children: ReactNode; variant?: BadgeVariant; className?: string }) => {
  const variants = {
    indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-800',
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800',
    amber: 'bg-amber-50 text-amber-700 ring-amber-500/30 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800',
    rose: 'bg-rose-50 text-rose-700 ring-rose-500/30 dark:bg-rose-950/50 dark:text-rose-300 dark:ring-rose-800',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const SectionHeading = ({ badge, title, subtitle, align = 'left' }: SectionHeadingProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className={`mb-12 flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}
  >
    {badge && <Badge className="mb-4">{badge}</Badge>}
    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">{title}</h2>
    {subtitle && <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-600">{subtitle}</p>}
  </motion.div>
);

// --- Navbar Component ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Problems', 'How it Works', 'Features', 'Pricing', 'Testimonials'];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="ModelForge home"><Logo /></Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2">Sign In</Link>
          <Link to="/signup" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 active:scale-95 transition-all">Get Started Free</Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-200 bg-white px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-indigo-600"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <button className="w-full py-3 text-center text-sm font-semibold text-slate-700 bg-slate-50 rounded-xl">Sign In</button>
                <button className="w-full py-3 text-center text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-md">Get Started Free</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero Section with Interactive Sandbox Mockup ---

const Hero = () => {
  const [activeTab, setActiveTab] = useState('diagram');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-28 sm:pt-36 pb-20 lg:pb-32">
      {/* Background Ambient Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/60 via-violet-50/20 to-transparent pointer-events-none blur-3xl -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <Badge variant="indigo" className="mb-6">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
              <span>Next-Gen LLD Interview Platform</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Architect Systems.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800">
                Ace LLD Interviews.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Practice real-world Low-Level Design problems with instant AI evaluation, automated SOLID scoring, and architectural feedback.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:scale-95 transition-all">
                Start Practicing Free <ArrowRight className="h-5 w-5" />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                <Play className="h-4 w-4 fill-slate-700" /> Watch 2-min Demo
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <p className="text-2xl font-black text-slate-900">100+</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Curated LLD Cases</p>
              </div>
              <div>
                <p className="text-2xl font-black text-indigo-600">94%</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Interview Pass Rate</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">12K+</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Active Engineers</p>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Sandbox Window */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative w-full max-w-2xl mx-auto"
          >
            <div className="rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-slate-800 overflow-hidden text-white">
              {/* Window Header */}
              <div className="flex items-center justify-between bg-slate-950 px-4 py-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-3 text-xs font-mono text-slate-400">designprep.io/sandbox/parking-lot</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">AI Active</span>
                </div>
              </div>

              {/* Sandbox Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-900/80 px-4 gap-4 text-xs font-semibold">
                <button 
                  onClick={() => setActiveTab('diagram')}
                  className={`py-3 border-b-2 transition-colors ${activeTab === 'diagram' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  Class Diagram
                </button>
                <button 
                  onClick={() => setActiveTab('rubric')}
                  className={`py-3 border-b-2 transition-colors ${activeTab === 'rubric' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  AI Rubric Score (92/100)
                </button>
              </div>

              {/* Sandbox Body */}
              <div className="p-6 bg-slate-900 min-h-[340px] flex flex-col justify-center">
                {activeTab === 'diagram' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold">OOP</div>
                        <div>
                          <p className="text-sm font-bold text-white">ParkingLot (Singleton)</p>
                          <p className="text-xs text-slate-400">Manages floors, gates, and spot allocation strategy</p>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-semibold">Validated</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                        <p className="text-xs font-bold text-slate-300">Floor</p>
                        <p className="text-[11px] text-slate-400 mt-1">List&lt;ParkingSpot&gt; spots</p>
                      </div>
                      <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                        <p className="text-xs font-bold text-slate-300">Vehicle</p>
                        <p className="text-[11px] text-slate-400 mt-1">Car, Bike, Truck (Strategy)</p>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-300 flex items-center justify-between">
                      <span>💡 AI Suggestion: Apply Strategy Pattern for pricing calculation.</span>
                      <span className="underline cursor-pointer font-bold">Apply</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">SOLID Principles Adherence</span>
                      <span className="text-emerald-400 font-bold">96%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[96%]"></div>
                    </div>

                    <div className="flex justify-between items-center text-xs mt-3">
                      <span className="text-slate-300">Encapsulation & Modularity</span>
                      <span className="text-indigo-400 font-bold">90%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[90%]"></div>
                    </div>

                    <div className="flex justify-between items-center text-xs mt-3">
                      <span className="text-slate-300">Concurrency & Edge Cases</span>
                      <span className="text-amber-400 font-bold">85%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[85%]"></div>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-800">
                      ✅ Ready for senior-level system design interview evaluation.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- Stats Bar ---

const Stats = () => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-30 mb-20">
    <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/80 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
      {[
        { value: '100+', label: 'Real-World LLD Problems', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { value: '10K+', label: 'Active Software Engineers', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { value: '4.9/5', label: 'Average User Rating', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
        { value: 'FAANG', label: 'Interview Rubric Aligned', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
      ].map((s, i) => (
        <div key={i} className={`flex items-center gap-4 ${i !== 0 ? 'lg:pl-8 pt-4 lg:pt-0' : ''}`}>
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.bg} ${s.color} shrink-0`}>
            <s.icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Popular Problems Section ---

const PopularProblems = () => {
  const problems = [
    { title: 'Parking Lot', level: 'Medium', desc: 'Design a multi-floor parking lot handling various vehicle types and spot allocation.', tag: 'OOP & Patterns', attempts: '12.5K' },
    { title: 'Rate Limiter', level: 'Hard', desc: 'Implement distributed rate limiting with sliding window and token bucket algorithms.', tag: 'Concurrency', attempts: '8.7K' },
    { title: 'Elevator System', level: 'Hard', desc: 'Design an intelligent scheduling algorithm for multi-car elevator networks.', tag: 'State Machine', attempts: '6.1K' },
    { title: 'Splitwise', level: 'Medium', desc: 'Expense sharing application with graph-based debt simplification.', tag: 'Data Modeling', attempts: '9.8K' },
  ];

  return (
    <section id="problems" className="py-24 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <SectionHeading badge="Curated Problems" title="Master essential LLD scenarios" subtitle="Hand-picked challenges modeled after real tech interviews" align="left" />
          <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors mb-10">
            View All 100+ Problems <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-200/80 hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">{p.tag}</span>
                  <Badge variant={p.level === 'Hard' ? 'rose' : 'amber'}>{p.level}</Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-slate-400" /> {p.attempts} solved</span>
                <span className="text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Practice <ArrowRight className="h-3 w-3" /></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Features Bento Grid ---

const Features = () => (
  <section id="features" className="py-24 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading badge="Advanced Architecture" title="Engineered for elite system designers" subtitle="Everything you need to transform from writing code to architecting scalable systems" align="center" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {/* Bento Card 1 */}
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 md:p-10 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Cpu className="w-48 h-48 text-indigo-400" /></div>
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 mb-6">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black mb-3">AI Architectural Evaluation Engine</h3>
            <p className="text-slate-300 max-w-md text-sm sm:text-base leading-relaxed">
              Our proprietary evaluator analyzes your class diagrams, design patterns, and separation of concerns against FAANG interview rubrics in real-time.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-6 text-xs font-mono text-indigo-300">
            <span>✓ SOLID Validation</span>
            <span>✓ Concurrency Checks</span>
            <span>✓ Extensibility Score</span>
          </div>
        </div>

        {/* Bento Card 2 */}
        <div className="bg-slate-50 p-8 rounded-3xl ring-1 ring-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-6">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Targeted Weakness Detection</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Identify precisely which design patterns or edge-case handling need improvement before your actual interview.</p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-bold text-emerald-600">Precision Analytics →</div>
        </div>

        {/* Bento Card 3 */}
        <div className="bg-slate-50 p-8 rounded-3xl ring-1 ring-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-6">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Historical Growth Tracking</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Compare your naive initial solutions with your final optimized architectures over time.</p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-bold text-amber-600">Visual Progress →</div>
        </div>

        {/* Bento Card 4 */}
        <div className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Badge variant="indigo" className="bg-white/20 text-white ring-white/30 mb-4">Enterprise Ready</Badge>
            <h3 className="text-2xl font-black mb-2">Peer Benchmarking & Mock Interviews</h3>
            <p className="text-indigo-100 text-sm max-w-lg leading-relaxed">See how your design decisions rank against top 5% engineers worldwide.</p>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-slate-50 shrink-0">
            Explore Enterprise
          </button>
        </div>
      </div>
    </div>
  </section>
);

// --- Pricing Section ---

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Flexible Plans" title="Invest in your engineering career" subtitle="Simple, transparent pricing with no hidden fees" align="center" />

        <div className="flex justify-center mb-12">
          <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-2">
            <button 
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${!annual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Monthly Billing
            </button>
            <button 
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${annual ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600'}`}
            >
              Annual Billing <span className="text-[10px] bg-emerald-400 text-slate-950 px-1.5 py-0.5 rounded ml-1 font-extrabold">Save 30%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Community Free</h3>
              <p className="text-xs text-slate-500 mt-1">For beginners starting their LLD journey.</p>
              <div className="my-6">
                <span className="text-4xl font-black text-slate-900">$0</span>
                <span className="text-xs text-slate-500 font-medium ml-1">/ forever</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 15 Core LLD Problems</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Basic Class Diagram Builder</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Community Discussions</li>
              </ul>
            </div>
            <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-900 font-bold text-sm hover:bg-slate-200 transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 ring-2 ring-indigo-500 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 right-8 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pro Intelligence</h3>
              <p className="text-xs text-slate-400 mt-1">For serious engineers targeting senior/staff roles.</p>
              <div className="my-6">
                <span className="text-4xl font-black text-white">{annual ? '$19' : '$29'}</span>
                <span className="text-xs text-slate-400 font-medium ml-1">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> All 100+ LLD & HLD Cases</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Unlimited AI Rubric Evaluations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> SOLID & Concurrency Deep Dives</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Peer Ranking & Leaderboard</li>
              </ul>
            </div>
            <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all">
              Start 7-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials Section ---

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading badge="Success Stories" title="Trusted by elite software engineers" align="center" />

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {[
          { name: 'Priya Sharma', role: 'SDE II at Amazon', quote: '"The AI architectural evaluation caught edge cases in my Parking Lot design that I would have missed in the actual interview. Landed the offer!"' },
          { name: 'Rahul Kumar', role: 'Staff Engineer at Google', quote: '"Finally, a platform that doesn\'t just give canned solutions, but evaluates YOUR specific class diagram and design patterns."' },
          { name: 'Ananya Mehta', role: 'Senior SWE at Microsoft', quote: '"The SOLID principle feedback loop is incredible. It feels like having a Principal Architect pair-programming with you."' },
        ].map((t, i) => (
          <div key={i} className="bg-slate-50 p-8 rounded-3xl ring-1 ring-slate-200/80 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-slate-700 font-medium leading-relaxed italic mb-8">{t.quote}</p>
            </div>
            <div className="pt-6 border-t border-slate-200">
              <p className="font-bold text-slate-900 text-sm">{t.name}</p>
              <p className="text-xs text-indigo-600 font-semibold">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- CTA Section ---

const CTA = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-600 px-8 py-16 sm:px-16 sm:py-24 text-center text-white shadow-2xl shadow-indigo-600/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-indigo-600 to-indigo-950 -z-10"></div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
        Ready to master Low-Level Design?
      </h2>
      <p className="max-w-xl mx-auto text-indigo-100 text-base sm:text-lg mb-10 leading-relaxed">
        Join over 12,000 software engineers preparing for their next big career leap.
      </p>
      <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-base shadow-xl hover:bg-slate-50 active:scale-95 transition-all">
        Get Started For Free Today <ArrowRight className="inline h-5 w-5 ml-2" />
      </button>
    </div>
  </section>
);

// --- Footer Component ---

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-10">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <Logo dark />
        </div>
        <p className="text-xs leading-relaxed text-slate-400 max-w-sm mb-6">
          The ultimate platform for mastering Low-Level Design, Object-Oriented Design, and architectural system interviews.
        </p>
        <p className="text-xs text-slate-500">© 2026 ModelForge. All rights reserved.</p>
      </div>

      <div>
        <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</p>
        <ul className="space-y-2.5 text-xs">
          {['Problems', 'Evaluation AI', 'Pricing', 'Enterprise'].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
        </ul>
      </div>

      <div>
        <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</p>
        <ul className="space-y-2.5 text-xs">
          {['About', 'Careers', 'Blog', 'Press'].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
        </ul>
      </div>

      <div>
        <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal</p>
        <ul className="space-y-2.5 text-xs">
          {['Privacy Policy', 'Terms of Service', 'Security'].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
        </ul>
      </div>
    </div>
  </footer>
);

// --- Root Component ---

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <Hero />
      <Stats />
      <PopularProblems />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
