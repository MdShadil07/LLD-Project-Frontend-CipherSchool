import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, ArrowRight, Sparkles } from 'lucide-react';

const projectData = {
    logoSrc: "/logo.svg",
    title: "CognitoSpeak",
    description: "A production-grade AI learning platform designed to improve fluency and public speaking. Features real-time audio/video rooms, diverse AI personalities, and a dedicated speech-processing architecture.",

    features: [
        {
            id: "ai-personas",
            title: "5 AI Personalities",
            desc: "Dynamic conversational practice tailored to various professional scenarios.",
            iconSrc: "/assets/icons/ai.png" // Point to your actual image
        },
        {
            id: "realtime-av",
            title: "Real-Time Audio/Video",
            desc: "Low-latency WebRTC infrastructure for seamless group interactions.",
            iconSrc: "/assets/icons/video.png"
        },
        {
            id: "mass-rooms",
            title: "Massive Practice Rooms",
            desc: "Concurrent room support for hundreds of learners to practice randomly.",
            iconSrc: "/assets/icons/rooms.png"
        },
        {
            id: "speech-worker",
            title: "Pronunciation Engine",
            desc: "Backend worker utilizing FFmpeg & librosa for acoustic analysis.",
            iconSrc: "/assets/icons/audio.png"
        }
    ],

    techStack: ["React", "WebRTC", "FFmpeg", "Librosa", "Node.js", "Redis"],
    demoUrl: "https://cognitolearn.dev",
    githubUrl: "https://github.com/MdShadil07/English-Learn-Backend.git"
};

export function ExploreWorkModal({ isOpen = true, onClose = () => { } }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">

                {/* Subtle Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm"
                    aria-hidden="true"
                />

                {/* Precise, Compact Apple-style Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Spring easing
                    className="relative w-full max-w-[520px] rounded-[28px] bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/60 overflow-hidden z-10 my-auto"
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="absolute top-5 right-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="p-7 sm:p-9">

                        {/* Header: Exact Logo Integration */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3.5 mb-5">
                                {/* Icon Placeholder - Replace projectData.logoSrc with your standalone icon image */}
                                <img
                                    src={projectData.logoSrc}
                                    alt="CognitoSpeak Icon"
                                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain shrink-0"
                                />

                                {/* Replicated Typography from Image */}
                                <div className="flex flex-col justify-center">
                                    <h2
                                        className="text-[22px] sm:text-[26px] font-extrabold tracking-tight leading-none mb-1 font-sans"
                                        style={{ color: '#0F2926' }}
                                    >
                                        CognitoSpeak
                                    </h2>
                                    <p
                                        className="text-[13px] sm:text-[14.5px] font-medium leading-none font-sans tracking-wide"
                                        style={{ color: '#43A077' }}
                                    >
                                        AI-Powered Learning
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm leading-relaxed text-slate-600 font-medium">
                                {projectData.description}
                            </p>
                        </div>

                        {/* Compact Feature List */}
                        <div className="mb-7 space-y-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Core Capabilities
                            </h3>
                            {projectData.features.map((feature) => (
                                <div key={feature.id} className="flex items-start gap-4">
                                    {/* Small Icon Container */}
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 mt-0.5">
                                        <img
                                            src={feature.iconSrc}
                                            alt=""
                                            className="h-5 w-5 object-contain"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                if (e.currentTarget.parentElement) {
                                                    e.currentTarget.parentElement.innerHTML = `<span class="text-[10px] font-bold text-slate-400">⚡</span>`;
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
                                            {feature.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-1.5">
                                {projectData.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] font-semibold text-slate-600"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                            <a
                                href={projectData.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-md shadow-slate-900/10"
                            >
                                View Project <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href={projectData.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
                            >
                                <GitBranch className="h-4 w-4" /> GitHub
                            </a>
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default ExploreWorkModal;