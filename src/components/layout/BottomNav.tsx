"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Camera, Zap, User } from "lucide-react";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/wingman", icon: MessageCircle, label: "Wingman" },
  { href: "/analyzer", icon: Camera, label: "Analyze" },
  { href: "/viral", icon: Zap, label: "Viral" },
  { href: "/settings", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-area-pb">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition ${
                isActive ? "text-rose-500" : "text-gray-400"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-rose-500" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
