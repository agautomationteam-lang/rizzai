"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, Check, RefreshCw, AlertTriangle } from "lucide-react";
import { useStore } from "@/lib/store";
import { mockBioGeneration } from "@/lib/mockAi";
import type { GeneratedBio } from "@/types";
import AppSelect from "@/components/ui/app-select";

const tones = [
  { value: "funny", label: "Funny", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { value: "genuine", label: "Genuine", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "bold", label: "Bold", color: "bg-rose-100 text-rose-700 border-rose-200" },
];

export default function BioPage() {
  const { consumeCredits, addGeneratedBio, isDemo, recordDemoUsage } = useStore();
  const [traits, setTraits] = useState("");
  const [tone, setTone] = useState("genuine");
  const [platform, setPlatform] = useState("Tinder");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedBio | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [demoLimitReached, setDemoLimitReached] = useState(false);

  const handleGenerate = async () => {
    if (isDemo) {
      if (!recordDemoUsage('bio')) {
        setDemoLimitReached(true);
        return;
      }
    } else {
      if (!consumeCredits(1)) return;
    }
    setLoading(true);
    const traitList = traits.split(",").map((t) => t.trim()).filter(Boolean);
    const bio = await mockBioGeneration(traitList, tone, platform);
    setLoading(false);
    setResult(bio);
    addGeneratedBio(bio);
  };

  const copyBio = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bio Rewriter</h1>
        <p className="text-sm text-gray-500">Generate better dating bios in seconds.</p>
      </div>

      {demoLimitReached && (
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-amber-800">Demo limit reached</div>
            <div className="text-xs text-amber-700">
              You&apos;ve used all 3 bio rewrites.{" "}
              <a href="/signup" className="underline font-medium">Sign up free</a> to continue.
            </div>
          </div>
        </div>
      )}

      {!result && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <label className="text-sm font-medium text-gray-900 mb-2 block">Your Traits / Interests</label>
            <input
              value={traits}
              onChange={(e) => setTraits(e.target.value)}
              placeholder="e.g. software engineer, hiking, dogs, sushi"
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <label className="text-sm font-medium text-gray-900 mb-2 block">Tone</label>
            <div className="flex gap-2">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition ${
                    tone === t.value ? t.color : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <AppSelect
              label="Target Platform"
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

          <button
            onClick={handleGenerate}
            disabled={loading || !traits.trim()}
            className="w-full py-4 rounded-xl gradient-rizz text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Bios
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">1 credit</span>
              </>
            )}
          </button>
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Generated Bios ({result.tone})</h3>
              <button onClick={() => { setResult(null); setTraits(""); }} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
            </div>
            <div className="space-y-3">
              {result.variations.map((bio, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 flex items-start justify-between gap-3">
                  <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
                  <button onClick={() => copyBio(bio, i)} className="shrink-0 mt-0.5">
                    {copiedIdx === i ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
