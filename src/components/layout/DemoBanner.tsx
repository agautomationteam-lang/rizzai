"use client";

import { useStore } from "@/lib/store";
import { LogIn, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DemoBanner() {
  const { isDemo, exitDemo } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!isDemo || dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
            DEMO
          </span>
          <p className="text-xs text-amber-800 truncate">
            Your progress won&apos;t be saved.{" "}
            <Link href="/signup" className="underline font-medium hover:text-amber-900">
              Sign up free
            </Link>{" "}
            to unlock everything.
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Link
            href="/signup"
            className="text-xs bg-amber-600 text-white px-2.5 py-1 rounded-lg font-medium hover:bg-amber-700 transition flex items-center gap-1"
          >
            <LogIn className="w-3 h-3" />
            Sign Up
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-amber-600 hover:text-amber-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
