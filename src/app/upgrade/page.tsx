"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Coins, Loader2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const plans = [
  {
    name: "Premium",
    price: "$29.99",
    period: "/month",
    priceId: "price_premium_monthly",
    description: "Unlimited coaching & no limits",
    features: [
      "Unlimited analyses",
      "All coaching modes (Soft/Hard/Extreme)",
      "Unlimited screenshots",
      "No watermarks",
      "Priority AI queue",
      "Weekly dating reports",
      "Roast + Coach modes",
      "Attraction & ghosting detection",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Pro",
    price: "$45.99",
    period: "/month",
    priceId: "price_pro_monthly",
    description: "Everything + advanced features",
    features: [
      "Everything in Premium",
      "AI Voice Coaching",
      "Wardrobe Analysis",
      "Post-Date Feedback Loop",
      "Custom AI Personality",
      "1-on-1 Monthly Power Hour",
      "Early access to new features",
      "VIP Badge",
    ],
    cta: "Go Pro",
    popular: false,
  },
];

const creditPacks = [
  { amount: 50, price: "$9.99", label: "Most Popular" },
  { amount: 120, price: "$19.99", label: "Best Value" },
  { amount: 300, price: "$39.99", label: "Power User" },
];

export default function UpgradePage() {
  const { user, addCredits } = useStore();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const subscribe = async (priceId: string, planName: string) => {
    setLoadingPlan(planName);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, successUrl: `${window.location.origin}/home?success=1`, cancelUrl: `${window.location.origin}/upgrade?canceled=1` }),
      });
      const data = await res.json();
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        alert("Payment setup incomplete. Add your Stripe keys in .env.local");
      }
    } catch (e) {
      alert("Payment setup incomplete. Add your Stripe keys in .env.local");
    }
    setLoadingPlan(null);
  };

  const buyCredits = (amount: number) => {
    addCredits(amount);
    alert(`Added ${amount} credits! (Demo mode — integrate Stripe for real payments)`);
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upgrade</h1>
        <p className="text-sm text-gray-500">Unlock your full dating potential. No free tier — serious results only.</p>
      </div>

      {/* Current Credits */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 text-center">
        <div className="text-sm text-amber-700 mb-1">Your Credits</div>
        <div className="text-4xl font-black text-amber-800">{user?.credits || 0}</div>
        <div className="text-xs text-amber-600 mt-1">{user?.tier} Plan</div>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-2xl p-6 border-2 ${plan.popular ? "border-rose-400" : "border-gray-100"} relative`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-rizz text-white text-xs font-medium">
                Most Popular
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <p className="text-xs text-gray-500">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                <div className="text-xs text-gray-500">{plan.period}</div>
              </div>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => subscribe(plan.priceId, plan.name)}
              disabled={loadingPlan === plan.name}
              className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 ${
                plan.popular
                  ? "gradient-rizz text-white"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              } disabled:opacity-60`}
            >
              {loadingPlan === plan.name ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirecting...
                </>
              ) : (
                plan.cta
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Credit Packs */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Credit Packs</h3>
        <div className="grid grid-cols-3 gap-3">
          {creditPacks.map((pack) => (
            <button
              key={pack.amount}
              onClick={() => buyCredits(pack.amount)}
              className="bg-white rounded-xl p-4 border border-gray-100 text-left hover:border-rose-200 transition"
            >
              <div className="flex items-center gap-2 mb-1">
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="text-lg font-bold text-gray-900">{pack.amount}</span>
              </div>
              <div className="text-sm text-gray-700">{pack.price}</div>
              <div className="text-xs text-gray-400">{pack.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
