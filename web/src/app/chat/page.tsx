"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquare,
  Settings,
  Trash2,
  Menu,
  Database,
  ArrowUp,
  ChevronLeft,
  Rocket,
  Globe,
  HelpCircle,
  FileText,
  Code2,
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isAnimated?: boolean;
  sources?: string[];
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

const INITIAL_MOCK_SESSIONS: ChatSession[] = [
  {
    id: "session-1",
    title: "Voyager 1 Launch Mission",
    messages: [
      { id: "1a", role: "user", content: "When was Voyager 1 launched?" },
      {
        id: "1b",
        role: "assistant",
        content:
          "Voyager 1 was launched by NASA on **September 5, 1977**, from Launch Complex 41 at the Cape Canaveral Air Force Station. It was launched aboard a Titan IIIE-Centaur rocket.\n\nInterestingly, its sister craft Voyager 2 was actually launched two weeks *earlier* on August 20, 1977, but Voyager 1 was put on a faster trajectory that allowed it to reach Jupiter and Saturn ahead of Voyager 2.",
        sources: ["SpaceY Archives", "NASA"],
      },
    ],
  },
  {
    id: "session-2",
    title: "The Golden Record Message",
    messages: [
      { id: "2a", role: "user", content: "What is the Golden Record?" },
      {
        id: "2b",
        role: "assistant",
        content:
          "The **Voyager Golden Records** are two phonograph records that were included aboard both Voyager spacecraft launched in 1977. \n\nThey contain sounds and images selected to portray the diversity of life and culture on Earth, intended for any intelligent extraterrestrial life form who may find them. The records act as a cosmic time capsule and greeting from humanity.",
        sources: ["SpaceY Archives", "Wikipedia"],
      },
    ],
  },
];

// Apple/Linear Easing Transition (No Bounce)
const transitionSettings = {
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  duration: 0.6,
};

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_MOCK_SESSIONS);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState<"archives" | "live" | "hybrid">("archives");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Sync current session messages
  useEffect(() => {
    if (currentSessionId) {
      const activeSession = sessions.find((s) => s.id === currentSessionId);
      if (activeSession) {
        setMessages(activeSession.messages);
      }
    } else {
      setMessages([]);
    }
  }, [currentSessionId, sessions]);

  // Auto-resize input text area
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [inputValue]);

  // Handle suggestion card clicks
  const handleSuggestionClick = (suggestionText: string) => {
    sendMessage(suggestionText);
  };

  // Create a new empty chat session
  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setInputValue("");
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Select a chat session
  const handleSelectSession = (id: string) => {
    setCurrentSessionId(id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Delete a chat session
  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updatedSessions = sessions.filter((s) => s.id !== id);
    setSessions(updatedSessions);
    if (currentSessionId === id) {
      if (updatedSessions.length > 0) {
        setCurrentSessionId(updatedSessions[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  // Handle message sending
  const sendMessage = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    setInputValue("");
    setIsLoading(true);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedText,
    };

    let updatedSessionId = currentSessionId;
    let newSessions = [...sessions];

    // If starting a new session
    if (!updatedSessionId) {
      const newSessionTitle =
        trimmedText.length > 28 ? trimmedText.substring(0, 28) + "..." : trimmedText;
      const newSessionId = `session-${Date.now()}`;
      const newSession: ChatSession = {
        id: newSessionId,
        title: newSessionTitle,
        messages: [userMsg],
      };
      newSessions = [newSession, ...sessions];
      setSessions(newSessions);
      setCurrentSessionId(newSessionId);
      updatedSessionId = newSessionId;
    } else {
      newSessions = sessions.map((s) => {
        if (s.id === updatedSessionId) {
          return { ...s, messages: [...s.messages, userMsg] };
        }
        return s;
      });
      setSessions(newSessions);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedText, mode }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMsg: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.answer || "No response received.",
          isAnimated: true,
          sources: data.sources || [],
        };

        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === updatedSessionId) {
              return { ...s, messages: [...s.messages, assistantMsg] };
            }
            return s;
          })
        );
      } else {
        throw new Error(data.error || "Failed to query the database.");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong while retrieving the archives.";
      const errorMsg: Message = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content: `Error: ${errorMessage}`,
        isAnimated: false,
      };
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === updatedSessionId) {
            return { ...s, messages: [...s.messages, errorMsg] };
          }
          return s;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // Helper to format custom markdown patterns
  const renderMessageContent = (text: string) => {
    const paragraphs = text.split("\n\n");
    return paragraphs.map((para, pIdx) => {
      // Bullet list
      if (para.trim().startsWith("- ") || para.trim().startsWith("* ")) {
        const items = para.split(/\n[-*]\s+/);
        return (
          <ul key={pIdx} className="list-disc pl-5 my-3.5 space-y-2 text-[#111111] font-light text-[15px] leading-relaxed">
            {items.map((item, iIdx) => {
              const cleanItem = iIdx === 0 ? item.replace(/^[-*]\s+/, "") : item;
              return <li key={iIdx}>{renderInlineFormatting(cleanItem)}</li>;
            })}
          </ul>
        );
      }
      return (
        <p key={pIdx} className="my-3 text-[#111111] font-light leading-relaxed text-[15px]">
          {renderInlineFormatting(para)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-[#111111]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={idx} className="italic text-[#111111]">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex h-screen bg-[#F6F6F4] text-[#111111] overflow-hidden font-sans antialiased">
      {/* Sidebar - Collapsible & Responsive */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={transitionSettings}
            className="h-full flex-shrink-0 bg-[#FAFAF8] flex flex-col relative z-30"
          >
            {/* Sidebar Header */}
            <div className="p-5 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-6.5 h-6.5 rounded-lg bg-[#111111] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform group-hover:scale-105 duration-300">
                  <span className="font-mono text-[11px] font-bold">Y</span>
                </div>
                <span className="font-googleSans font-bold tracking-tight text-sm text-[#111111]">
                  SpaceY
                </span>
              </Link>
              <button
                onClick={handleNewChat}
                className="p-1.5 rounded-full hover:bg-black/[0.03] text-[#666666] hover:text-[#111111] transition-colors"
                title="New Chat"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Main Action Button */}
            <div className="px-5 pb-3">
              <button
                onClick={handleNewChat}
                className="w-full py-2 px-4 bg-white border border-black/[0.05] hover:border-black/[0.1] rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-all duration-300 active:scale-[0.99]"
              >
                <Plus className="w-3.5 h-3.5" />
                New Exploration
              </button>
            </div>

            {/* Conversation History List */}
            <div className="flex-grow overflow-y-auto px-3 py-4 space-y-1 scrollbar-none">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#666666]/65 block px-3 mb-3.5">
                Recent Chats
              </span>
              <AnimatePresence initial={false}>
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-xs font-light text-[#666666]/50">
                    No active sessions
                  </div>
                ) : (
                  sessions.map((session) => {
                    const isActive = session.id === currentSessionId;
                    return (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={transitionSettings}
                        className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          isActive
                            ? "bg-black/[0.03] text-[#111111]"
                            : "text-[#666666] hover:bg-black/[0.015] hover:text-[#111111]"
                        }`}
                        onClick={() => handleSelectSession(session.id)}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <MessageSquare
                            className={`w-3.5 h-3.5 flex-shrink-0 ${
                              isActive ? "text-[#111111]" : "text-[#666666]/60"
                            }`}
                          />
                          <span
                            className={`text-xs truncate font-light ${
                              isActive ? "font-semibold" : ""
                            }`}
                          >
                            {session.title}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleDeleteSession(e, session.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-black/[0.04] text-[#666666]/50 hover:text-[#111111] transition-all duration-200"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar Footer (Settings inside soft floating card) */}
            <div className="p-4 relative">
              <div className="bg-white border border-black/[0.04] rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] p-2">
                <Link
                  href="/developer"
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#FAFAF8] rounded-xl text-[#666666] hover:text-[#111111] transition-colors text-xs font-semibold mb-1"
                >
                  <Code2 className="w-4 h-4 text-[#666666]/75" />
                  Developer Portal
                </Link>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#FAFAF8] rounded-xl text-[#666666] hover:text-[#111111] transition-colors text-xs font-semibold"
                >
                  <Settings className="w-4 h-4 text-[#666666]/75" />
                  System Settings
                </button>
              </div>

              {/* Mock Settings Tooltip */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={transitionSettings}
                    className="absolute bottom-20 left-4 right-4 bg-white border border-black/[0.05] rounded-2xl p-4 shadow-[0_12px_30px_rgba(0,0,0,0.05)] z-40 text-left"
                  >
                    <h4 className="text-[10px] font-bold text-[#111111] mb-2.5 uppercase tracking-widest">
                      Connection Info
                    </h4>
                    <div className="space-y-2 text-[10px] text-[#666666] font-mono">
                      <div className="flex justify-between border-b border-black/[0.02] pb-1.5">
                        <span>Database:</span>
                        <span className="text-[#111111] font-semibold">1.2K Vector Docs</span>
                      </div>
                      <div className="flex justify-between border-b border-black/[0.02] pb-1.5">
                        <span>LLM Backend:</span>
                        <span className="text-[#111111] font-semibold">laguna-xs.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pipeline:</span>
                        <span className="text-[#111111] font-semibold">STRICT RAG</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Canvas */}
      <div className="flex-grow flex flex-col h-full relative overflow-hidden bg-[#F6F6F4]">
        {/* Top Header Bar */}
        <header className="h-[64px] px-6 flex items-center justify-between bg-transparent sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-full hover:bg-black/[0.03] text-[#666666] hover:text-[#111111] transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Back to landing link */}
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-semibold text-[#666666] hover:text-[#111111] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Terminal
            </Link>

            <span className="w-[1px] h-3 bg-black/[0.08]" />

            <div className="flex items-center gap-3">
              <span className="font-googleSans font-bold tracking-tight text-xs md:text-sm">
                SpaceY Chat
              </span>
              
              {/* Subtle Status Pill */}
              <div className="inline-flex items-center gap-1.5 text-[9px] tracking-widest font-semibold text-[#666666] uppercase px-2.5 py-0.5 rounded-full border border-black/[0.05] bg-[#FAFAF8] shadow-[0_1px_3px_rgba(0,0,0,0.01)] select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Archives Connected
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Chat Pane (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto w-full scrollbar-none">
          <div className="max-w-3xl w-full mx-auto px-6 py-8 md:px-12 min-h-full flex flex-col">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                // Empty State UI (Visual Centerpiece, vertically centered in scroll area)
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={transitionSettings}
                  className="my-auto flex flex-col items-center justify-center text-center py-8 w-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.05] shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex items-center justify-center text-[#111111] mb-8">
                    <Database className="w-5 h-5 opacity-70" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-4 font-googleSans max-w-2xl leading-tight">
                    What would you like to discover today?
                  </h2>
                  <p className="text-sm text-[#666666] font-light max-w-[500px] mb-12 leading-relaxed">
                    Explore spacecraft, missions, and scientific discoveries through natural
                    conversation grounded in our telemetry and records archives.
                  </p>

                  {/* Grid Suggestion Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    {[
                      { text: "Tell me about Voyager 1", icon: Rocket, label: "Voyager 1" },
                      { text: "Compare Voyager 1 and Voyager 2", icon: Globe, label: "Compare Missions" },
                      { text: "What is the Golden Record?", icon: HelpCircle, label: "Golden Record" },
                      { text: "How far is Voyager 1 from Earth?", icon: FileText, label: "Deep Space" },
                    ].map((suggestion, idx) => {
                      const IconComp = suggestion.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ ease: "easeOut", duration: 0.2 }}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className="p-5 rounded-2xl border border-black/[0.04] bg-white text-left shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:border-black/[0.08] transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#666666]/50">
                              {suggestion.label}
                            </span>
                            <IconComp className="w-4 h-4 text-[#111111] opacity-60" />
                          </div>
                          <p className="text-xs font-semibold text-[#111111] leading-relaxed">
                            {suggestion.text}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                // Message List UI
                <div key="messages-list" className="space-y-12 py-6 w-full flex-grow">
                  {messages.map((message) => {
                    const isUser = message.role === "user";
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={transitionSettings}
                        className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[85%] ${isUser ? "text-right" : "text-left"}`}>
                          {isUser ? (
                            // User Bubble - Dark Matte bubble, soft corners
                            <div className="inline-block px-5 py-3 rounded-2xl bg-[#111111] text-white font-normal text-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                              {message.content}
                            </div>
                          ) : (
                            // Assistant Message (No Bubble, formatted text)
                            <div className="w-full prose prose-zinc max-w-none text-[#111111]">
                              <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-5.5 h-5.5 rounded-md bg-[#111111] flex items-center justify-center text-white shadow-sm">
                                  <span className="font-mono text-[9px] font-bold">Y</span>
                                </div>
                                <span className="text-[11px] font-bold tracking-widest text-[#666666] uppercase">
                                  SpaceY Intelligence
                                </span>
                              </div>
                              <div className="pl-8 space-y-4">
                                {renderMessageContent(message.content)}
                                
                                {/* Source Badges - Capsule Labels */}
                                {message.sources && message.sources.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-black/[0.04] select-none">
                                    {message.sources.map((src) => (
                                      <div
                                        key={src}
                                        className="inline-flex items-center bg-white border border-black/[0.05] hover:border-black/[0.1] rounded-md px-2 py-0.5 text-[10px] font-semibold text-[#666666] transition-colors"
                                      >
                                        <span className="text-emerald-500 font-bold mr-1">✓</span>
                                        {src}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Typing/Loading State */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex w-full justify-start"
                    >
                      <div className="text-left w-full">
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-5.5 h-5.5 rounded-md bg-[#111111] flex items-center justify-center text-white shadow-sm">
                            <span className="font-mono text-[9px] font-bold">Y</span>
                          </div>
                          <span className="text-[11px] font-bold tracking-widest text-[#666666] uppercase">
                            SpaceY Intelligence
                          </span>
                        </div>
                        <div className="pl-8 flex flex-col gap-2">
                          {/* Typing Dots */}
                          <div className="flex gap-1.5 items-center h-5">
                            <span className="w-1.5 h-1.5 bg-[#666666]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-[#666666]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-[#666666]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-[10px] text-[#666666]/60 font-mono tracking-widest uppercase">
                            Searching mission archives...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Input Bar (Fixed at the bottom of the flex column) */}
        <div className="w-full bg-[#F6F6F4] pb-6 pt-3 px-4 flex-shrink-0 z-10 border-t border-black/[0.02]">
          <div className="max-w-3xl w-full mx-auto relative">
            {/* Segmented Control Mode Selector (Floating above input) */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex p-1 bg-[#FAFAF8] border border-black/[0.04] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.01)] relative select-none">
                {[
                  { id: "archives", label: "Archives" },
                  { id: "live", label: "Live Research" },
                  { id: "hybrid", label: "Hybrid" },
                ].map((m) => {
                  const isActive = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id as typeof mode)}
                      className={`relative z-10 px-4 py-1.5 text-[11px] font-semibold rounded-full transition-all duration-300 ${
                        isActive
                          ? "text-white font-bold"
                          : "text-[#666666] hover:text-[#111111]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeModeBackground"
                          className="absolute inset-0 bg-[#111111] rounded-full -z-10"
                          transition={transitionSettings}
                        />
                      )}
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Floating Search Bar Container */}
            <div className="bg-white border border-black/[0.04] rounded-[1.75rem] shadow-[0_12px_32px_rgba(0,0,0,0.025)] hover:border-black/[0.08] transition-all duration-300 flex items-end p-2 pl-5 pr-2 min-h-[64px]">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about spacecraft, missions, discoveries..."
                className="flex-grow bg-transparent border-0 outline-none focus:ring-0 text-[15px] font-light text-[#111111] placeholder-[#666666]/40 resize-none py-3.5 max-h-[200px]"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ml-2 mb-1.5 ${
                  inputValue.trim() && !isLoading
                    ? "bg-[#111111] text-white hover:bg-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95"
                    : "bg-black/[0.02] text-zinc-300 cursor-not-allowed"
                }`}
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#666666]/55 text-center mt-2.5 font-light leading-normal select-none tracking-wide">
              SpaceY RAG Engine. Grounded in Voyager 1 and deep space data arrays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
