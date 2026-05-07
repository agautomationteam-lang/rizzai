"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Sparkles, Lock, ChevronRight, Copy, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { mockScreenshotAnalysis } from "@/lib/mockAi";
import type { ScreenshotAnalysis } from "@/types";
import Link from "next/link";

export default function ScreenshotsPage() {
  const { consumeCredits, addScreenshotAnalysis, user, isDemo } = useStore();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScreenshotAnalysis | null>(null);
  const [copied, setCopied] = useState(false);

  const canAnalyze = user && user.credits >= 2;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && images.length < 4) {
          setImages((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyze = async () => {
    if (!canAnalyze || images.length === 0) return;
    if (!consumeCredits(2)) return;
    setLoading(true);
    const analysis = await mockScreenshotAnalysis(images[0]);
    setLoading(false);
    setResult(analysis);
    addScreenshotAnalysis(analysis);
  };

  const copyReply = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Screenshot Analysis</h1>
        <p className="text-sm text-gray-500">Upload chat screenshots for AI reading.</p>
      </div>

      {isDemo && (
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <div className="text-sm font-medium text-amber-800">Screenshot analysis is locked in demo</div>
            <div className="text-xs text-amber-700">
              Sign up free to unlock screenshot AI reading, ghosting detection, and reply suggestions.
            </div>
          </div>
        </div>
      )}

      {!result && (
        <div className="space-y-4">
          <div className={`bg-white rounded-xl p-4 border border-gray-100 ${isDemo ? "opacity-50 pointer-events-none" : ""}`}>
            <label className="text-sm font-medium text-gray-900 mb-2 block">Screenshots ({images.length}/4)</label>
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="aspect-[3/4] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Upload</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || images.length === 0 || !canAnalyze}
            className="w-full py-4 rounded-xl gradient-rizz text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Reading screenshots...
              </>
            ) : !canAnalyze ? (
              <>
                <Lock className="w-4 h-4" />
                Insufficient Credits (need 2)
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Conversation
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">2 credits</span>
              </>
            )}
          </button>

          {!canAnalyze && (
            <Link href="/upgrade" className="block text-center text-sm text-rose-500 font-medium">
              Get more credits →
            </Link>
          )}
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">Platform Detected</div>
              <div className="text-lg font-bold text-gray-900">{result.platformDetected}</div>
              <div className="mt-3 text-sm text-gray-700">{result.contextSummary}</div>
            </div>

            {/* Ghosting Meter */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">Ghosting Probability</span>
                <span className={`text-lg font-bold ${(result.ghostingProbability || 0) > 0.5 ? "text-rose-500" : "text-emerald-500"}`}>
                  {Math.round((result.ghostingProbability || 0) * 100)}%
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(result.ghostingProbability || 0) * 100}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full rounded-full ${(result.ghostingProbability || 0) > 0.5 ? "bg-rose-400" : "bg-emerald-400"}`}
                />
              </div>
            </div>

            {/* Red Flags */}
            {result.redFlags && result.redFlags.length > 0 && (
              <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
                <h3 className="text-sm font-semibold text-rose-800 mb-3">Red Flags</h3>
                <ul className="space-y-2">
                  {result.redFlags.map((flag, i) => (
                    <li key={i} className="text-sm text-rose-700 flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Replies */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Suggested Replies</h3>
              <div className="space-y-3">
                {result.suggestedReplies?.map((reply, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-700">{reply}</span>
                    <button onClick={() => copyReply(reply)}>
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setResult(null); setImages([]); }}
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm"
            >
              Analyze Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
