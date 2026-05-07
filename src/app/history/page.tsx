"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MessageCircle, Upload, Zap, History, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";

const typeConfig: Record<string, { icon: typeof Camera; color: string; bg: string }> = {
  profile: { icon: Camera, color: "text-rose-500", bg: "bg-rose-50" },
  wingman: { icon: MessageCircle, color: "text-violet-500", bg: "bg-violet-50" },
  screenshot: { icon: Upload, color: "text-emerald-500", bg: "bg-emerald-50" },
  bio: { icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
  viral: { icon: History, color: "text-blue-500", bg: "bg-blue-50" },
};

export default function HistoryPage() {
  const { history } = useStore();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? history : history.filter((h) => h.type === filter);

  const filters = [
    { value: "all", label: "All" },
    { value: "profile", label: "Profiles" },
    { value: "wingman", label: "Wingman" },
    { value: "screenshot", label: "Screenshots" },
    { value: "bio", label: "Bios" },
    { value: "viral", label: "Viral" },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">History</h1>
        <p className="text-sm text-gray-500">Your past analyses and creations.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              filter === f.value ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <History className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-sm text-gray-400">No history yet. Start analyzing!</p>
          </div>
        )}
        {filtered.map((item, i) => {
          const config = typeConfig[item.type] || typeConfig.profile;
          const Icon = config.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                <div className="text-xs text-gray-500 truncate">{item.preview}</div>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
