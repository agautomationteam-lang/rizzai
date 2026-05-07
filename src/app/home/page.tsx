"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { Camera, MessageCircle, Upload, Zap, History, Coins, ChevronRight, Sparkles, TrendingUp, Flame, Heart, Download, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const quickActions = [
  { href: "/profiles", icon: Heart, label: "My\nProfiles", color: "from-rose-400 to-orange-400" },
  { href: "/analyzer", icon: Camera, label: "Profile\nAnalyzer", color: "from-rose-400 to-orange-400" },
  { href: "/wingman", icon: MessageCircle, label: "Wingman\nChat", color: "from-violet-400 to-purple-400" },
  { href: "/screenshots", icon: Upload, label: "Screenshot\nAnalysis", color: "from-emerald-400 to-teal-400" },
  { href: "/viral", icon: Zap, label: "Viral\nTools", color: "from-amber-400 to-yellow-400" },
  { href: "/upgrade", icon: Coins, label: "Get\nCredits", color: "from-pink-400 to-rose-400" },
];

export default function Dashboard() {
  const { user, history, connectedProfiles, isDemo } = useStore();
  const recentHistory = history.slice(0, 3);
  const [showDownloadBanner, setShowDownloadBanner] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true;
    setShowDownloadBanner(!isStandalone);
  }, []);

  return (
    <div className="space-y-6 pb-8">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">
          Hey, {user?.displayName || "there"} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Ready to level up your dating game?</p>
      </motion.div>

      {/* Download App Banner (web only) */}
      {showDownloadBanner && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 text-white flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">Get the Android App</div>
            <div className="text-xs text-gray-400">Use RizzAI on the go — no browser needed</div>
          </div>
          <a
            href="https://github.com/agautomationteam-lang/rizzai/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-gray-900 text-xs font-medium hover:bg-gray-100 transition"
          >
            <Download className="w-3 h-3" />
            APK
          </a>
        </motion.div>
      )}

      {/* Primary CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link href="/analyzer">
          <div className="relative overflow-hidden rounded-2xl gradient-rizz p-6 text-white shadow-lg shadow-rose-200">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium opacity-90">AI Powered</span>
              </div>
              <h2 className="text-xl font-bold mb-1">Analyze Your Profile</h2>
              <p className="text-sm opacity-90 mb-4">Get scored across 8 dimensions and discover why you&apos;re not getting matches.</p>
              <div className="inline-flex items-center gap-1 text-sm font-medium bg-white/20 px-3 py-1.5 rounded-full">
                Start Analysis <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>
        </Link>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, i) => (
            <Link key={action.href} href={action.href}>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-xl p-4 border border-gray-100 card-shadow flex flex-col items-center text-center gap-2 hover:shadow-md transition"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 whitespace-pre-line">{action.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Connected Profiles */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Connected Profiles</h3>
          <Link href="/profiles" className="text-xs text-rose-500 font-medium">Manage</Link>
        </div>
        <Link href="/profiles">
          <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {connectedProfiles.length > 0 ? `${connectedProfiles.length} profile${connectedProfiles.length > 1 ? 's' : ''} connected` : 'No profiles connected'}
              </div>
              <div className="text-xs text-gray-500">
                {connectedProfiles.length > 0 ? 'Tap to manage your dating apps' : 'Connect Tinder, Bumble, Hinge...'}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </div>
        </Link>
      </motion.div>

      {/* Recent Activity */}
      {recentHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
            <Link href="/history" className="text-xs text-rose-500 font-medium">View all</Link>
          </div>
          <div className="space-y-2">
            {recentHistory.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <History className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                  <div className="text-xs text-gray-500 truncate">{item.preview}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tip of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-800 mb-1">Tip of the Day</div>
            <div className="text-xs text-blue-700 leading-relaxed">
              Ask open-ended questions about specifics in their profile. Generic questions get generic replies.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Banner (Free users) */}
      {user?.tier === "FREE" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/upgrade">
            <div className="bg-white rounded-xl p-4 border border-amber-200 card-shadow flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">Upgrade to Premium</div>
                <div className="text-xs text-gray-500">Unlimited analyses + all coaching modes</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
