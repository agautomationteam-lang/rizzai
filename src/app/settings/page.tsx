"use client";

import { useStore } from "@/lib/store";
import { LogOut, User, Crown, Coins, Bell, Shield, HelpCircle, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SettingsPage() {
  const { user, logout } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and preferences.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
        <div className="w-16 h-16 rounded-full gradient-rizz flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
          {user?.displayName?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="text-lg font-bold text-gray-900">{user?.displayName}</div>
        <div className="text-sm text-gray-500">{user?.email}</div>
        <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-xs font-medium text-amber-700">
          <Crown className="w-3 h-3" />
          {user?.tier} Plan
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{user?.credits}</div>
          <div className="text-xs text-gray-500">Credits</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{user?.monthlyUsed}</div>
          <div className="text-xs text-gray-500">Used this month</div>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <Link href="/profiles" className="flex items-center gap-3 p-4 hover:bg-gray-50 transition border-b border-gray-100">
          <Heart className="w-5 h-5 text-rose-500" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Connected Profiles</div>
            <div className="text-xs text-gray-500">Manage your dating apps</div>
          </div>
        </Link>
        <Link href="/upgrade" className="flex items-center gap-3 p-4 hover:bg-gray-50 transition border-b border-gray-100">
          <Coins className="w-5 h-5 text-amber-500" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Subscription</div>
            <div className="text-xs text-gray-500">Manage your plan</div>
          </div>
        </Link>
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <Bell className="w-5 h-5 text-blue-500" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Notifications</div>
            <div className="text-xs text-gray-500">Push and email preferences</div>
          </div>
          <div className="w-10 h-6 bg-gray-200 rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full shadow absolute top-1 left-1" />
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <Shield className="w-5 h-5 text-emerald-500" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Privacy</div>
            <div className="text-xs text-gray-500">Data and sharing settings</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <HelpCircle className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Help & Support</div>
            <div className="text-xs text-gray-500">FAQ and contact</div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-xl bg-rose-50 text-rose-600 font-medium flex items-center justify-center gap-2 hover:bg-rose-100 transition"
      >
        <LogOut className="w-4 h-4" />
        Log Out
      </button>

      <div className="text-center text-xs text-gray-400">RizzAI v1.0 • Demo Build</div>
    </div>
  );
}
