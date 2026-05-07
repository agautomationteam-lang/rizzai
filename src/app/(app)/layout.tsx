"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import BottomNav from "@/components/layout/BottomNav";
import AppHeader from "@/components/layout/AppHeader";
import DemoBanner from "@/components/layout/DemoBanner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isDemo, hasHydrated } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Do NOT run auth checks until Zustand has rehydrated from storage.
    // This prevents redirect loops when the mobile keyboard triggers re-renders
    // before persisted auth state is available.
    if (!hasHydrated) return;

    if (!isAuthenticated && !isDemo) {
      router.push("/login");
    } else if (user && !user.onboardingComplete && !isDemo) {
      router.push("/onboarding");
    } else if (
      user &&
      !user.hasActiveSubscription &&
      !isDemo &&
      pathname !== "/upgrade" &&
      pathname !== "/profiles" &&
      pathname !== "/settings"
    ) {
      router.push("/upgrade");
    }
  }, [isAuthenticated, user, router, pathname, isDemo, hasHydrated]);

  // Show nothing while rehydrating to prevent flash of redirect
  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && !isDemo) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoBanner />
      <AppHeader />
      <main className="max-w-lg mx-auto px-4 pt-4 pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
