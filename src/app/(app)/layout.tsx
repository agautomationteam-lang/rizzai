"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import BottomNav from "@/components/layout/BottomNav";
import AppHeader from "@/components/layout/AppHeader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && !user.onboardingComplete) {
      router.push("/onboarding");
    } else if (user && !user.hasActiveSubscription && pathname !== "/upgrade" && pathname !== "/profiles" && pathname !== "/settings") {
      router.push("/upgrade");
    }
  }, [isAuthenticated, user, router, pathname]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader />
      <main className="max-w-lg mx-auto px-4 pt-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
