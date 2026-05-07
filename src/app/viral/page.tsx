"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Heart, Share2, Lock, ChevronRight, Zap, BarChart3, Award } from "lucide-react";
import { useStore } from "@/lib/store";
import { mockScoreCard } from "@/lib/mockAi";
import type { ScoreCard } from "@/types";
import Link from "next/link";

const tools = [
  { id: "rizz-score", icon: Zap, label: "Text Rizz Score", desc: "Get your conversation graded", cost: 2 },
  { id: "date-prob", icon: Heart, label: "Date Probability", desc: "Will they say yes?", cost: 2 },
  { id: "report", icon: BarChart3, label: "Dating Report Card", desc: "Full profile breakdown", cost: 3 },
  { id: "predictor", icon: TrendingUp, label: "Swipe Predictor", desc: "Rate your profile", cost: 2 },
];

export default function ViralPage() {
  const { consumeCredits, addScoreCard, scoreCards, user } = useStore();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreCard | null>(null);

  const runTool = async (toolId: string, cost: number) => {
    if (!consumeCredits(cost)) return;
    setActiveTool(toolId);
    setLoading(true);
    const card = await mockScoreCard();
    setLoading(false);
    setResult(card);
    addScoreCard(card);
  };

  const gradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-emerald-500";
    if (grade.startsWith("B")) return "text-blue-500";
    return "text-amber-500";
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Viral Tools</h1>
        <p className="text-sm text-gray-500">Generate shareable scorecards and flex on your friends.</p>
      </div>

      {!result && (
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool, i) => (
            <motion.button
              key={tool.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => runTool(tool.id, tool.cost)}
              className="bg-white rounded-xl p-5 border border-gray-100 card-shadow text-left hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-lg gradient-rizz flex items-center justify-center mb-3">
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-1">{tool.label}</div>
              <div className="text-xs text-gray-500 mb-3">{tool.desc}</div>
              <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                <Sparkles className="w-3 h-3" />
                {tool.cost} credits
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Generating your scorecard...</p>
        </div>
      )}

      {result && !loading && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
          {/* Shareable Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 gradient-rizz" />
            <div className="text-sm text-gray-400 mb-2">{result.title}</div>
            <div className={`text-7xl font-black mb-4 ${gradeColor(result.overallGrade)}`}>
              {result.overallGrade}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {Object.entries(result.categoryScores).map(([key, score]) => (
                <div key={key} className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-xs text-gray-400 capitalize">{key}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xs text-gray-500">rizzai.app</div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl gradient-rizz text-white font-medium text-sm flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={() => { setResult(null); setActiveTool(null); }}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm"
            >
              Create Another
            </button>
          </div>
        </motion.div>
      )}

      {/* Recent Cards */}
      {scoreCards.length > 0 && !result && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Recent Cards</h3>
          <div className="space-y-2">
            {scoreCards.slice(0, 3).map((card) => (
              <div key={card.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{card.title}</div>
                  <div className="text-xs text-gray-500">Grade: {card.overallGrade}</div>
                </div>
                <Award className={`w-6 h-6 ${gradeColor(card.overallGrade)}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
