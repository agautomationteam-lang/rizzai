"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Sparkles, Camera, MessageCircle, PenLine, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const { startDemo, isDemo, isAuthenticated } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isDemo && !isAuthenticated) {
      startDemo();
    }
  }, [isDemo, isAuthenticated, startDemo]);

  useEffect(() => {
    if (isDemo) {
      const t = setTimeout(() => router.push("/home"), 800);
      return () => clearTimeout(t);
    }
  }, [isDemo, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-2xl p-6 shadow-xl shadow-rose-100/50 text-center">
          <div className="w-14 h-14 rounded-xl gradient-rizz flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Try RizzAI Free</h1>
          <p className="text-sm text-gray-500 mb-6">
            Experience the full app without signing up. Your progress won&apos;t be saved.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                <Camera className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-left flex-1">
                <div className="text-sm font-medium text-gray-900">Profile Analysis</div>
                <div className="text-xs text-gray-500">3 analyses included</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-violet-500" />
              </div>
              <div className="text-left flex-1">
                <div className="text-sm font-medium text-gray-900">Wingman Chat</div>
                <div className="text-xs text-gray-500">5 messages included</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <PenLine className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-left flex-1">
                <div className="text-sm font-medium text-gray-900">Bio Rewriter</div>
                <div className="text-xs text-gray-500">3 rewrites included</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/home")}
            className="w-full py-3 rounded-xl gradient-rizz text-white font-semibold flex items-center justify-center gap-2"
          >
            Start Demo
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            Want to save your work?{" "}
            <Link href="/signup" className="text-rose-500 font-medium hover:underline">
              Sign up free
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
