"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import BottomNav from "@/components/layout/BottomNav";
import AppHeader from "@/components/layout/AppHeader";
import DemoBanner from "@/components/layout/DemoBanner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isDemo } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Demo users are always "authenticated" for layout purposes
    if (!isAuthenticated && !isDemo) {
      router.push("/login");
    } else if (user && !user.onboardingComplete && !isDemo) {
      router.push("/onboarding");
    } else if (user && !user.hasActiveSubscription && !isDemo && pathname !== "/upgrade" && pathname !== "/profiles" && pathname !== "/settings") {
      router.push("/upgrade");
    }
  }, [isAuthenticated, user, router, pathname, isDemo]);

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
