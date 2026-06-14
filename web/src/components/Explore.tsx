"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Network, Rocket, HelpCircle, Binary, Search, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// --- Visual Component 1: Knowledge Base ---
function KnowledgeBaseVisual({ isActive }: { isActive: boolean }) {
  const tags = [
    { text: "Voyager 1", x: "18%", y: "22%", delay: 0 },
    { text: "Voyager 2", x: "74%", y: "18%", delay: 1.5 },
    { text: "Hubble", x: "12%", y: "76%", delay: 0.8 },
    { text: "Cassini", x: "78%", y: "72%", delay: 2.3 },
    { text: "JWST", x: "46%", y: "14%", delay: 3.1 },
    { text: "Pioneer", x: "44%", y: "82%", delay: 1.9 },
  ];

  return (
    <div className="relative w-full h-[280px] bg-zinc-50/70 border border-zinc-100 rounded-2xl overflow-hidden flex items-center justify-center">
      {/* Concentric Orbits */}
      <svg className="absolute inset-0 w-full h-full text-zinc-200/60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50%" cy="50%" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="50%" cy="50%" r="120" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Orbiting Satellite Dot */}
      {isActive && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute w-[180px] h-[180px] pointer-events-none flex items-start justify-center"
        >
          <span className="w-2 h-2 rounded-full bg-zinc-500 shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
        </motion.div>
      )}

      {/* Database Core */}
      <div className="z-10 w-16 h-16 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-md relative group">
        <div className="absolute inset-0.5 rounded-full bg-zinc-50 animate-pulse -z-10" />
        <Database className="w-6 h-6 text-zinc-800" />
      </div>

      {/* Drifting Tags */}
      <AnimatePresence>
        {isActive &&
          tags.map((tag, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: [0, idx % 2 === 0 ? 6 : -6, idx % 3 === 0 ? -4 : 4, 0],
                y: [0, idx % 2 === 0 ? -8 : 8, idx % 3 === 0 ? 5 : -5, 0],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.5, delay: tag.delay * 0.1 },
                scale: { duration: 0.5, delay: tag.delay * 0.1 },
                x: { repeat: Infinity, duration: 6 + idx, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 7 + idx, ease: "easeInOut" },
              }}
              style={{ position: "absolute", left: tag.x, top: tag.y }}
              className="text-[10px] font-mono tracking-wider font-semibold border border-zinc-200/80 bg-white shadow-sm hover:border-zinc-400 rounded-full px-3 py-1 text-zinc-500 cursor-default select-none z-10 transition-colors duration-300"
            >
              {tag.text}
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Subtle Live Status Console */}
      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[9px] text-zinc-400 font-mono tracking-wider">
        <span>STATUS: INDEXED</span>
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
          1.2K ARCHIVES ONLINE
        </span>
      </div>
    </div>
  );
}

// --- Visual Component 2: Retrieval Engine ---
function RetrievalEngineVisual({ isActive }: { isActive: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setStep(0);
      return;
    }

    const interval = setInterval(() => {
      setStep((prev) => (prev === 3 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="relative w-full h-[280px] bg-zinc-50/70 border border-zinc-100 rounded-2xl overflow-hidden p-5 flex flex-col justify-between select-none">
      {/* Central Flow Line */}
      <div className="absolute left-[34px] top-8 bottom-8 w-0.5 bg-zinc-200/80 -z-10" />

      {/* Step 1: User Query */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
          step >= 0 ? "bg-white border-zinc-800 text-zinc-900 shadow-sm" : "bg-zinc-100 border-zinc-200 text-zinc-400"
        }`}>
          <HelpCircle className="w-4 h-4" />
        </div>
        <motion.div
          animate={step >= 0 ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -5 }}
          className="flex-grow text-left bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] rounded-xl px-3 py-1.5"
        >
          <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase mb-0.5">User Query</span>
          <p className="text-[11px] font-semibold text-zinc-800 leading-tight">{"\"Where is Voyager 1?\""}</p>
        </motion.div>
      </div>

      {/* Step 2: Vector Representation */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
          step >= 1 ? "bg-white border-zinc-800 text-zinc-900 shadow-sm" : "bg-zinc-100 border-zinc-200 text-zinc-400"
        }`}>
          <Binary className="w-4 h-4" />
        </div>
        <div className="flex-grow text-left">
          <motion.div
            animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -5 }}
            className="bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] rounded-xl px-3 py-1.5"
          >
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase mb-0.5">Semantic Map</span>
            <div className="flex gap-1.5 items-center">
              <span className="text-[10px] font-mono text-zinc-600 font-semibold">[0.38, -0.92, 0.47, ...]</span>
              {step === 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-ping" />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Step 3: Neural Search */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
          step >= 2 ? "bg-white border-zinc-800 text-zinc-900 shadow-sm" : "bg-zinc-100 border-zinc-200 text-zinc-400"
        }`}>
          <Search className="w-4 h-4" />
        </div>
        <div className="flex-grow text-left">
          <motion.div
            animate={step >= 2 ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -5 }}
            className="bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] rounded-xl px-3 py-1.5 relative overflow-hidden"
          >
            {step === 2 && (
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-zinc-100 to-transparent -z-10"
              />
            )}
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase mb-0.5">Archive Matching</span>
            <span className="text-[10px] font-semibold text-zinc-700">Scanning 12.8M vectors...</span>
          </motion.div>
        </div>
      </div>

      {/* Step 4: Top Results */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
          step >= 3 ? "bg-white border-zinc-800 text-zinc-900 shadow-sm" : "bg-zinc-100 border-zinc-200 text-zinc-400"
        }`}>
          <FileText className="w-4 h-4" />
        </div>
        <div className="flex-grow text-left">
          <motion.div
            animate={step >= 3 ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -5 }}
            className="bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] rounded-xl px-3 py-1.5"
          >
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase mb-0.5">Relevant Records found</span>
            <span className="text-[10px] font-semibold text-zinc-800">Doc #V1_COORD (Confidence: 99.4%)</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- Visual Component 3: Grounded Responses ---
function GroundedResponsesVisual({ isActive }: { isActive: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setStep(0);
      return;
    }

    const interval = setInterval(() => {
      setStep((prev) => (prev === 3 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="relative w-full h-[280px] bg-zinc-50/70 border border-zinc-100 rounded-2xl overflow-hidden p-5 flex flex-col justify-between select-none">
      {/* Central Flow Line */}
      <div className="absolute left-[34px] top-8 bottom-8 w-0.5 bg-zinc-200/80 -z-10" />

      {/* Step 1: Matching Records */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
          step >= 0 ? "bg-white border-zinc-800 text-zinc-900 shadow-sm" : "bg-zinc-100 border-zinc-200 text-zinc-400"
        }`}>
          <FileText className="w-4 h-4" />
        </div>
        <motion.div
          animate={step >= 0 ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -5 }}
          className="flex-grow text-left bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] rounded-xl px-3 py-1.5"
        >
          <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase mb-0.5">Retrieved Knowledge</span>
          <p className="text-[10px] font-medium text-zinc-500 leading-normal truncate">{"\"Voyager 1 interstellar distance is 162.4 AU...\""}</p>
        </motion.div>
      </div>

      {/* Step 2: Context Building */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
          step >= 1 ? "bg-white border-zinc-800 text-zinc-900 shadow-sm" : "bg-zinc-100 border-zinc-200 text-zinc-400"
        }`}>
          <Database className="w-4 h-4" />
        </div>
        <div className="flex-grow text-left">
          <motion.div
            animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -5 }}
            className="bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] rounded-xl px-3 py-1.5"
          >
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase mb-0.5">Verification Builder</span>
            <span className="text-[10px] font-semibold text-zinc-700">Synthesizing facts with query context...</span>
          </motion.div>
        </div>
      </div>

      {/* Step 3: Safety Guardrails */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
          step >= 2 ? "bg-white border-zinc-800 text-zinc-900 shadow-sm" : "bg-zinc-100 border-zinc-200 text-zinc-400"
        }`}>
          <Network className="w-4 h-4" />
        </div>
        <div className="flex-grow text-left">
          <motion.div
            animate={step >= 2 ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -5 }}
            className="bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] rounded-xl px-3 py-1.5"
          >
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase mb-0.5">Fact Grounding Check</span>
            <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Grounded in mission source data
            </span>
          </motion.div>
        </div>
      </div>

      {/* Step 4: Verified Response */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
          step >= 3 ? "bg-white border-emerald-500 text-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.15)]" : "bg-zinc-100 border-zinc-200 text-zinc-400"
        }`}>
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="flex-grow text-left">
          <motion.div
            animate={step >= 3 ? {
              opacity: 1,
              x: 0,
              boxShadow: "0 4px 20px rgba(16, 185, 129, 0.08)",
              borderColor: "#a7f3d0",
              backgroundColor: "#f0fdf4"
            } : {
              opacity: 0.3,
              x: -5,
              boxShadow: "none",
              borderColor: "#f4f4f5",
              backgroundColor: "#ffffff"
            }}
            transition={{ duration: 0.5 }}
            className="border rounded-xl px-3 py-2"
          >
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase mb-0.5">Verified Response</span>
            <p className="text-[10.5px] font-semibold text-zinc-800 leading-tight">
              {"\"Voyager 1 is in interstellar space, 162.4 AU (24.3B km) from Earth.\""}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- Main Explore Component ---
export default function Explore() {
  const [activeTab, setActiveTab] = useState(0);

  const cardsData = [
    {
      id: "knowledge-base",
      num: "01",
      icon: Database,
      title: "Knowledge Base",
      description:
        "Mission records, spacecraft archives, scientific discoveries, launch histories, and exploration datasets are organized into a structured knowledge system.",
      visual: <KnowledgeBaseVisual isActive={activeTab === 0} />,
    },
    {
      id: "retrieval-engine",
      num: "02",
      icon: Network,
      title: "Retrieval Engine",
      description:
        "Every question is converted into a semantic representation. SpaceY searches through mission archives and identifies the most relevant knowledge before generating a response.",
      visual: <RetrievalEngineVisual isActive={activeTab === 1} />,
    },
    {
      id: "grounded-responses",
      num: "03",
      icon: Rocket,
      title: "Grounded Responses",
      description:
        "Instead of relying solely on model memory, SpaceY builds responses from retrieved mission information, improving reliability and reducing hallucinations.",
      visual: <GroundedResponsesVisual isActive={activeTab === 2} />,
    },
  ];

  return (
    <section id="explore" className="py-24 md:py-32 bg-white text-zinc-950 relative overflow-hidden">
      {/* Background soft ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-zinc-100/30 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-400">
              Future Architecture
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6"
          >
            Engineering the <span className="font-light text-zinc-400">Beyond</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-500 font-light leading-relaxed text-base max-w-2xl mx-auto"
          >
            SpaceY transforms mission archives and scientific datasets into an intelligent knowledge system capable of answering questions with context and accuracy.
          </motion.p>
        </div>

        {/* 3-Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {cardsData.map((card, idx) => {
            const CardIcon = card.icon;
            const isActive = activeTab === idx;

            return (
              <motion.div
                key={card.id}
                onClick={() => setActiveTab(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                animate={isActive ? {
                  scale: 1.02,
                  borderColor: "rgba(212, 212, 216, 0.8)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.03)"
                } : {
                  scale: 1.00,
                  borderColor: "rgba(244, 244, 245, 0.6)",
                  boxShadow: "none"
                }}
                className={`text-left p-8 rounded-[2rem] border transition-all duration-500 relative flex flex-col justify-between min-h-[580px] select-none ${
                  isActive
                    ? "bg-white border-zinc-300 opacity-100 z-10"
                    : "bg-zinc-50/40 border-zinc-100 opacity-60 hover:opacity-95 hover:border-zinc-300/80 cursor-pointer"
                }`}
              >
                {/* Accent top gradient on active */}
                {isActive && (
                  <motion.div
                    layoutId="activeCardBorder"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-300 via-zinc-500 to-zinc-300 rounded-t-[2rem]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div>
                  {/* Step Metadata */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-xs font-mono font-bold ${isActive ? "text-zinc-900" : "text-zinc-300"}`}>
                      {card.num}
                    </span>
                    <div className={`p-2 bg-white rounded-xl border border-zinc-200/50 shadow-sm ${
                      isActive ? "text-zinc-900" : "text-zinc-400"
                    }`}>
                      <CardIcon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-bold tracking-tight mb-3 transition-colors ${
                    isActive ? "text-zinc-900" : "text-zinc-500"
                  }`}>
                    {card.title}
                  </h3>
                  
                  <p className={`text-xs leading-relaxed font-light mb-8 transition-colors ${
                    isActive ? "text-zinc-500" : "text-zinc-400"
                  }`}>
                    {card.description}
                  </p>
                </div>

                {/* Animated Graphic Reveal */}
                <div className="mt-auto w-full relative">
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key="active-visual"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {card.visual}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="inactive-visual"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-[280px] bg-zinc-50/20 border border-dashed border-zinc-200 rounded-2xl flex items-center justify-center"
                      >
                        <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-400 group-hover:text-zinc-600 transition-colors">
                          Click to explore
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Centered CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-20"
        >
          <Link
            href="/chat"
            className="inline-flex items-center justify-center text-sm font-semibold tracking-wider uppercase bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-900 px-10 py-4.5 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 font-googleSans"
          >
            Begin Exploration
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
