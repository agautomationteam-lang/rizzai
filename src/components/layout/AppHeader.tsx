"use client";

import { useStore } from "@/lib/store";
import { Coins, Settings } from "lucide-react";
import Link from "next/link";

export default function AppHeader() {
  const { user } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md gradient-rizz flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <span className="text-lg font-bold gradient-rizz-text">RizzAI</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/upgrade" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-semibold text-amber-700">{user?.credits || 0}</span>
          </Link>
          <Link href="/settings" className="p-2 rounded-full hover:bg-gray-100 transition">
            <Settings className="w-4 h-4 text-gray-600" />
          </Link>
        </div>
      </div>
    </header>
  );
}
