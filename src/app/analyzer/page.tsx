"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ChevronRight, Sparkles, Copy, Check, Flame, MessageSquare, Share2, Lock, AlertTriangle } from "lucide-react";
import { useStore } from "@/lib/store";
import { mockProfileAnalysis } from "@/lib/mockAi";
import type { ProfileAnalysis } from "@/types";
import Link from "next/link";

export default function AnalyzerPage() {
  const { consumeCredits, addAnalysis, user, isDemo, recordDemoUsage } = useStore();
  const [bioText, setBioText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProfileAnalysis | null>(null);
  const [roastMode, setRoastMode] = useState(false);
  const [copiedBio, setCopiedBio] = useState(false);
  const [demoLimitReached, setDemoLimitReached] = useState(false);

  const canAnalyze = user && user.credits >= (roastMode ? 3 : 1);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && images.length < 6) {
          setImages((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyze = async () => {
    if (!canAnalyze && !isDemo) return;
    const cost = roastMode ? 3 : 1;
    
    if (isDemo) {
      if (!recordDemoUsage('profile')) {
        setDemoLimitReached(true);
        return;
      }
    } else {
      if (!consumeCredits(cost)) return;
    }
    
    setLoading(true);
    const analysis = await mockProfileAnalysis(bioText, roastMode);
    setLoading(false);
    setResult(analysis);
    addAnalysis(analysis);
  };

  const copyBio = () => {
    if (result?.rewrittenBio) {
      navigator.clipboard.writeText(result.rewrittenBio);
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const scoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-50";
    if (score >= 60) return "bg-amber-50";
    return "bg-rose-50";
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Analyzer</h1>
        <p className="text-sm text-gray-500">Upload your profile and get AI feedback.</p>
      </div>

      {!result && (
        <div className="space-y-4">
          {/* Roast Toggle */}
          <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${roastMode ? "bg-orange-100" : "bg-gray-100"}`}>
                <Flame className={`w-5 h-5 ${roastMode ? "text-orange-500" : "text-gray-500"}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Roast Mode</div>
                <div className="text-xs text-gray-500">Brutally honest feedback</div>
              </div>
            </div>
            <button
              onClick={() => setRoastMode(!roastMode)}
              className={`w-12 h-7 rounded-full transition relative ${roastMode ? "bg-orange-500" : "bg-gray-200"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition ${roastMode ? "left-6" : "left-1"}`} />
            </button>
          </div>

          {/* Bio Input */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <label className="text-sm font-medium text-gray-900 mb-2 block">Your Bio</label>
            <textarea
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              placeholder="Paste your dating app bio here..."
              className="w-full h-24 p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <label className="text-sm font-medium text-gray-900 mb-2 block">Photos ({images.length}/6)</label>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {images.length < 6 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Add</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          {/* Analyze CTA */}
          <button
            onClick={handleAnalyze}
            disabled={loading || (!bioText && images.length === 0) || !canAnalyze}
            className="w-full py-4 rounded-xl gradient-rizz text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI Analyzing...
              </>
            ) : !canAnalyze ? (
              <>
                <Lock className="w-4 h-4" />
                Insufficient Credits
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze My Profile
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{roastMode ? 3 : 1} credit</span>
              </>
            )}
          </button>

          {demoLimitReached && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-amber-800">Demo limit reached</div>
                <div className="text-xs text-amber-700">
                  You&apos;ve used all 3 profile analyses.{" "}
                  <Link href="/signup" className="underline font-medium">Sign up free</Link> to continue.
                </div>
              </div>
            </div>
          )}

          {!canAnalyze && !isDemo && (
            <Link href="/upgrade" className="block text-center text-sm text-rose-500 font-medium">
              Get more credits →
            </Link>
          )}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Overall Score */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
              <div className={`text-6xl font-black mb-2 ${scoreColor(result.overallScore)}`}>
                {result.overallScore}
              </div>
              <div className="text-sm text-gray-500">Overall Score</div>
              {roastMode && result.roast && (
                <div className="mt-4 space-y-2">
                  {result.roast.map((r, i) => (
                    <div key={i} className="text-sm text-orange-700 bg-orange-50 rounded-lg p-3">
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Score Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Score Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(result.scores).map(([key, score]) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className={`font-medium ${scoreColor(score)}`}>{score}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${score >= 80 ? "bg-emerald-400" : score >= 60 ? "bg-amber-400" : "bg-rose-400"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {roastMode ? "Roast Lines" : "Suggestions"}
              </h3>
              <div className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <div key={i} className={`rounded-lg p-3 ${roastMode ? "bg-orange-50" : scoreBg(s.priority === "high" ? 50 : 70)}`}>
                    <div className="flex items-start gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${s.priority === "high" ? "bg-rose-100 text-rose-700" : "bg-gray-100 text-gray-600"}`}>
                        {s.priority}
                      </span>
                      <span className="text-sm text-gray-700">{s.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewritten Bio */}
            {!roastMode && result.rewrittenBio && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">AI-Rewritten Bio</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 mb-3">
                  {result.rewrittenBio}
                </div>
                <button
                  onClick={copyBio}
                  className="flex items-center gap-2 text-sm text-rose-500 font-medium"
                >
                  {copiedBio ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedBio ? "Copied!" : "Copy Bio"}
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => { setResult(null); setBioText(""); setImages([]); }}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm"
              >
                Analyze Another
              </button>
              <button className="flex-1 py-3 rounded-xl gradient-rizz text-white font-medium text-sm flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
