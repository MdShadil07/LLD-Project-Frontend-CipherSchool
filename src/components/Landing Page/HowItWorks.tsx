import React from 'react';
import { FileCode, PenTool, UploadCloud, MessageSquare, BarChart3, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">A simple practice loop designed for real learning.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-px bg-slate-200 -z-10 -translate-y-12"></div>

          <Step 
            number="1" 
            title="Choose Problem" 
            desc="Pick from curated LLD problems."
            icon={<FileCode className="w-5 h-5 text-brand-600" />}
            hasArrow={true}
          />
          <Step 
            number="2" 
            title="Design" 
            desc="Work on your solution (text, code, or diagram)."
            icon={<PenTool className="w-5 h-5 text-brand-600" />}
            hasArrow={true}
          />
          <Step 
            number="3" 
            title="Submit" 
            desc="Submit your design for evaluation."
            icon={<UploadCloud className="w-5 h-5 text-brand-600" />}
            hasArrow={true}
          />
          <Step 
            number="4" 
            title="Get Feedback" 
            desc="Receive detailed, explainable feedback."
            icon={<MessageSquare className="w-5 h-5 text-brand-600" />}
            hasArrow={true}
          />
          <Step 
            number="5" 
            title="Improve" 
            desc="Review, learn and try again."
            icon={<BarChart3 className="w-5 h-5 text-brand-600" />}
            hasArrow={false}
          />
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, desc, icon, hasArrow }: { number: string, title: string, desc: string, icon: React.ReactNode, hasArrow: boolean }) {
  return (
    <div className="flex flex-col items-center relative w-full lg:w-[18%]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center h-full w-full max-w-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          {number}. {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {desc}
        </p>
      </div>
      {hasArrow && (
        <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-12 w-6 h-6 items-center justify-center z-10 text-slate-300">
          <ArrowRight className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
