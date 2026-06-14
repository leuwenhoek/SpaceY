"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Copy,
  Check,
  Code2,
  Database,
  Cpu,
  Layers,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import databases from "./database.json";

// Apple/Linear Easing Transition
const transitionSettings: any = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.6,
};

export default function DeveloperPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const curlCode = `curl -X POST http://localhost:3000/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "When was Voyager 1 launched?", "mode": "hybrid"}'`;

  const jsCode = `fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'When was Voyager 1 launched?',
    mode: 'hybrid' // "archives" | "live" | "hybrid"
  })
})
.then(res => res.json())
.then(data => {
  console.log("Answer:", data.answer);
  console.log("Sources:", data.sources);
});`;

  return (
    <div className="min-h-screen bg-[#F6F6F4] text-[#111111] font-sans antialiased overflow-y-auto pb-20">
      {/* Top Header */}
      <header className="h-[64px] px-6 max-w-6xl mx-auto flex items-center justify-between bg-transparent">
        <div className="flex items-center gap-4">
          <Link
            href="/chat"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#666666] hover:text-[#111111] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Chat
          </Link>
          <span className="w-[1px] h-3 bg-black/[0.08]" />
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#111111]" />
            <span className="font-googleSans font-bold tracking-tight text-sm">
              Developer Portal
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[9px] tracking-widest font-semibold text-[#666666] uppercase px-2.5 py-0.5 rounded-full border border-black/[0.05] bg-[#FAFAF8] shadow-[0_1px_3px_rgba(0,0,0,0.01)] select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          API Online
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 mt-8">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={transitionSettings}
          className="mb-12 text-left"
        >
          <h1 className="text-3xl font-bold tracking-tight text-[#111111] mb-3 font-googleSans">
            Integrate SpaceY Intelligence
          </h1>
          <p className="text-sm text-[#666666] font-light max-w-2xl leading-relaxed">
            Query the SpaceY RAG engine programmatically. You can search mission archives, 
            execute live scientific research, or run hybrid queries from your own tools.
          </p>
        </motion.div>

        {/* Feature Spec Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Pickle Vector DB",
              desc: "1.2K segmented, high-dimensional document chunks loaded on execution.",
              icon: Database,
            },
            {
              title: "Hybrid Pipeline",
              desc: "Seamless combination of local vector databases and restricted web crawlers.",
              icon: Layers,
            },
            {
              title: "OpenRouter LLM",
              desc: "Strictly grounded outputs using Laguna-XS.2 instruction models.",
              icon: Cpu,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ ...transitionSettings, delay: idx * 0.1 }}
                className="bg-white border border-black/[0.04] rounded-2xl p-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FAFAF8] border border-black/[0.03] flex items-center justify-center text-[#111111] mb-4">
                  <Icon className="w-4 h-4 opacity-75" />
                </div>
                <h3 className="text-sm font-semibold text-[#111111] mb-2">{item.title}</h3>
                <p className="text-xs text-[#666666] font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* API Details Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...transitionSettings, delay: 0.3 }}
          className="bg-white border border-black/[0.04] rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left mb-8"
        >
          <h2 className="text-xl font-bold tracking-tight text-[#111111] mb-6 font-googleSans">
            API Reference
          </h2>

          <div className="space-y-6">
            {/* Endpoint block */}
            <div className="pb-6 border-b border-black/[0.03]">
              <h3 className="text-xs font-bold text-[#666666] uppercase tracking-widest mb-3">
                Endpoint URL
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#111111] text-white text-[10px] font-bold tracking-wider uppercase">
                  POST
                </span>
                <code className="text-xs font-mono font-semibold bg-[#FAFAF8] border border-black/[0.04] px-3 py-1.5 rounded-lg text-[#111111] flex-grow break-all">
                  /api/chat
                </code>
              </div>
            </div>

            {/* Request Schema */}
            <div className="pb-6 border-b border-black/[0.03] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-[#666666] uppercase tracking-widest mb-3">
                  Request Payload (JSON)
                </h3>
                <pre className="text-xs font-mono bg-[#FAFAF8] border border-black/[0.04] p-4 rounded-2xl overflow-x-auto text-[#111111]">
{`{
  "message": "string",
  "mode": "archives" | "live" | "hybrid"
}`}
                </pre>
                <div className="mt-3 text-[10px] text-[#666666] space-y-1.5 font-light">
                  <p>• <code className="font-mono text-zinc-900 font-semibold">message</code> (Required): The query question string.</p>
                  <p>• <code className="font-mono text-zinc-900 font-semibold">mode</code> (Optional): Defaults to <code className="font-mono">&quot;archives&quot;</code>.</p>
                </div>
              </div>

              {/* Response Schema */}
              <div>
                <h3 className="text-xs font-bold text-[#666666] uppercase tracking-widest mb-3">
                  Response Payload (JSON)
                </h3>
                <pre className="text-xs font-mono bg-[#FAFAF8] border border-black/[0.04] p-4 rounded-2xl overflow-x-auto text-[#111111]">
{`{
  "answer": "string",
  "sources": ["string"]
}`}
                </pre>
                <div className="mt-3 text-[10px] text-[#666666] space-y-1.5 font-light">
                  <p>• <code className="font-mono text-zinc-900 font-semibold">answer</code>: The RAG grounded answer response.</p>
                  <p>• <code className="font-mono text-zinc-900 font-semibold">sources</code>: List of matched vector databases or web domains.</p>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-[#666666] uppercase tracking-widest">
                  Code Snippets
                </h3>
              </div>

              <div className="space-y-6">
                {/* cURL snippet */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-[#666666] font-mono tracking-wider">cURL Request</span>
                    <button
                      onClick={() => copyToClipboard(curlCode, "curl")}
                      className="inline-flex items-center gap-1.5 text-[10px] text-[#666666] hover:text-[#111111] font-semibold transition-colors"
                    >
                      {copiedText === "curl" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs font-mono bg-[#FAFAF8] border border-black/[0.04] p-4 rounded-2xl overflow-x-auto text-[#111111] whitespace-pre-wrap break-all">
                    {curlCode}
                  </pre>
                </div>

                {/* JS fetch snippet */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-[#666666] font-mono tracking-wider">JavaScript (fetch)</span>
                    <button
                      onClick={() => copyToClipboard(jsCode, "js")}
                      className="inline-flex items-center gap-1.5 text-[10px] text-[#666666] hover:text-[#111111] font-semibold transition-colors"
                    >
                      {copiedText === "js" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs font-mono bg-[#FAFAF8] border border-black/[0.04] p-4 rounded-2xl overflow-x-auto text-[#111111]">
                    {jsCode}
                  </pre>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Databases List Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...transitionSettings, delay: 0.4 }}
          className="bg-white border border-black/[0.04] rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left mt-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-[#111111]" />
            <h2 className="text-xl font-bold tracking-tight text-[#111111] font-googleSans">
              Systems Databases
            </h2>
          </div>
          <p className="text-xs text-[#666666] font-light leading-relaxed mb-6 -mt-3">
            A registry of internal and external data sources connected to the SpaceY Chat engine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {databases.map((db, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAF8] border border-black/[0.03] hover:border-black/[0.06] rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-sm font-semibold text-[#111111] group-hover:text-black transition-colors">
                      {db.name}
                    </h3>
                    {db.link && (
                      <a
                        href={db.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md hover:bg-black/[0.03] text-[#666666] hover:text-[#111111] transition-all"
                        title="Open database link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-[#666666] font-light leading-relaxed">
                    {db.description}
                  </p>
                </div>
                {db.link && (
                  <div className="mt-4 pt-3 border-t border-black/[0.02] flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#666666]/60">Link</span>
                    <a
                      href={db.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-[#111111]/75 hover:text-[#111111] underline underline-offset-2 break-all max-w-[200px] truncate"
                    >
                      {db.link.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
