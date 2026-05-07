"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Copy, Check, ChevronDown, Sparkles, Lock, AlertTriangle, ExternalLink } from "lucide-react";
import { useStore } from "@/lib/store";
import { mockWingmanReply } from "@/lib/mockAi";
import type { ChatMessage, Conversation } from "@/types";
import type { CoachingMode } from "@/types";
import Link from "next/link";
import AppSelect from "@/components/ui/app-select";

const modes = [
  { value: "SOFT", label: "Soft", color: "bg-blue-100 text-blue-700" },
  { value: "HARD", label: "Hard", color: "bg-rose-100 text-rose-700" },
  { value: "EXTREME", label: "Extreme", color: "bg-purple-100 text-purple-700" },
  { value: "ROAST", label: "Roast", color: "bg-orange-100 text-orange-700" },
  { value: "COACH", label: "Coach", color: "bg-emerald-100 text-emerald-700" },
] as const;

const appDeepLinks: Record<string, string> = {
  Tinder: "tinder://app",
  Bumble: "bumble://",
  Hinge: "hinge://",
};

export default function WingmanPage() {
  const { consumeCredits, addConversation, addMessage, conversations, currentMode, setCurrentMode, user, isDemo, recordDemoUsage } = useStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [matchName, setMatchName] = useState("");
  const [platform, setPlatform] = useState("Tinder");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [demoLimitReached, setDemoLimitReached] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find((c) => c.id === activeConversation);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [conversation?.messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (isDemo) {
      if (!recordDemoUsage('wingman')) {
        setDemoLimitReached(true);
        return;
      }
    } else {
      if (!consumeCredits(1)) return;
    }

    let convId = activeConversation;
    if (!convId) {
      const newConv: Conversation = {
        id: "conv_" + Math.random().toString(36).slice(2, 8),
        title: matchName || "New Conversation",
        matchName: matchName || undefined,
        platform,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addConversation(newConv);
      convId = newConv.id;
      setActiveConversation(convId);
    }

    const userMsg: ChatMessage = {
      id: "msg_" + Math.random().toString(36).slice(2, 8),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    addMessage(convId, userMsg);
    setInput("");
    setLoading(true);

    const reply = await mockWingmanReply(input, currentMode, { matchName, platform });
    addMessage(convId, reply);
    setLoading(false);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openApp = () => {
    const deep = appDeepLinks[platform];
    if (deep) {
      window.open(deep, "_system");
    }
  };

  const currentModeLabel = modes.find((m) => m.value === currentMode);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Wingman</h1>
          <p className="text-xs text-gray-500">Your AI dating coach</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowModeDropdown(!showModeDropdown)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${currentModeLabel?.color}`}
          >
            {currentModeLabel?.label}
            <ChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {showModeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-32 z-20"
              >
                {modes.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => { setCurrentMode(m.value as CoachingMode); setShowModeDropdown(false); }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 ${currentMode === m.value ? "font-bold" : ""}`}
                  >
                    {m.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Context Bar */}
      {!activeConversation && (
        <div className="bg-white rounded-xl p-3 border border-gray-100 mb-4 flex gap-2">
          <input
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
            placeholder="Match name (optional)"
            className="flex-1 text-xs p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
          <div className="w-32">
            <AppSelect
              value={platform}
              onChange={setPlatform}
              options={[
                { value: "Tinder", label: "Tinder" },
                { value: "Bumble", label: "Bumble" },
                { value: "Hinge", label: "Hinge" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {!conversation && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500">Paste your conversation or ask for advice</p>
            <p className="text-xs text-gray-400 mt-1">e.g., &quot;They stopped replying for 2 days, what do I say?&quot;</p>
          </div>
        )}

        {conversation?.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${msg.role === "user" ? "bg-gray-900 text-white" : "bg-white border border-gray-100"} rounded-2xl px-4 py-3`}>
              <div className="text-sm leading-relaxed">{msg.content}</div>

              {msg.role === "assistant" && msg.alternatives && (
                <div className="mt-3 space-y-2 border-t border-gray-100 pt-2">
                  <div className="text-[10px] font-medium text-gray-400 uppercase">Alternatives</div>
                  {msg.alternatives.map((alt, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg p-2">
                      <span className="text-xs text-gray-700">{alt}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => copyText(alt, msg.id + i)}>
                          {copiedId === msg.id + i ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {msg.strategyNotes && (
                <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 rounded-lg p-2">
                  {msg.strategyNotes}
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => copyText(msg.content, msg.id)} className="text-gray-400 hover:text-gray-600">
                  {copiedId === msg.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
                {msg.tone && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{msg.tone}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {demoLimitReached && (
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-start gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-700">
            Demo limit reached. You&apos;ve used all 5 wingman messages.{" "}
            <Link href="/signup" className="underline font-medium">Sign up free</Link> to continue.
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-3">
        {(user?.credits || 0) < 1 && !isDemo ? (
          <Link href="/upgrade" className="flex items-center justify-center gap-2 py-3 text-sm text-rose-500 font-medium">
            <Lock className="w-4 h-4" />
            Out of credits — Upgrade to continue
          </Link>
        ) : (
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Paste conversation or ask for help..."
                className="flex-1 max-h-24 p-2 text-sm bg-gray-50 rounded-lg resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-200"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-lg gradient-rizz text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {activeConversation && (
              <div className="flex gap-2">
                <button
                  onClick={() => copyText(conversation?.messages[conversation.messages.length - 1]?.content || "", "last")}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-xs text-gray-700 font-medium hover:bg-gray-200 transition"
                >
                  <Copy className="w-3 h-3" /> Copy Reply
                </button>
                <button
                  onClick={openApp}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-900 text-xs text-white font-medium hover:bg-gray-800 transition"
                >
                  <ExternalLink className="w-3 h-3" /> Open {platform}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
