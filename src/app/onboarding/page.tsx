"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Heart, MessageCircle, Camera, Compass, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const steps = [
  {
    title: "Your AI Dating Wingman",
    subtitle: "Get more matches. Send better texts. Know where you stand.",
    content: (
      <div className="space-y-4">
        <div className="bg-rose-50 rounded-xl p-4 flex items-start gap-3">
          <Camera className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-gray-900">Analyze Your Profile</div>
            <div className="text-xs text-gray-500">Get scored across 8 dimensions with specific fixes.</div>
          </div>
        </div>
        <div className="bg-violet-50 rounded-xl p-4 flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-gray-900">Conversation Coach</div>
            <div className="text-xs text-gray-500">Paste any chat and get 3 tailored reply suggestions.</div>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-gray-900">Screenshot Intelligence</div>
            <div className="text-xs text-gray-500">Upload screenshots for emotion & ghosting detection.</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "What brings you here?",
    subtitle: "We'll personalize your first experience.",
    content: (
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Camera, label: "Fix my profile", desc: "Get more matches" },
          { icon: MessageCircle, label: "Help with chats", desc: "Better replies" },
          { icon: Heart, label: "Understand matches", desc: "Read the room" },
          { icon: Compass, label: "Just exploring", desc: "See what works" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:border-rose-200 transition cursor-pointer">
            <item.icon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">{item.label}</div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Which apps do you use?",
    subtitle: "We'll tailor our advice for your platforms.",
    content: (
      <div className="flex flex-wrap gap-2">
        {["Tinder", "Bumble", "Hinge", "OkCupid", "Other"].map((app) => (
          <button
            key={app}
            className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700 hover:border-rose-300 hover:text-rose-600 transition"
          >
            {app}
          </button>
        ))}
      </div>
    ),
  },
];

export default function OnboardingPage() {
  const { completeOnboarding } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      router.push("/upgrade");
    }
  };

  const skip = () => {
    completeOnboarding();
    router.push("/upgrade");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-2xl p-6 shadow-xl shadow-rose-100/50">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i <= step ? "w-8 bg-rose-500" : "w-4 bg-gray-200"}`}
                />
              ))}
            </div>
            <button onClick={skip} className="text-xs text-gray-400 hover:text-gray-600">
              Skip
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1">{steps[step].title}</h2>
              <p className="text-sm text-gray-500 mb-6">{steps[step].subtitle}</p>
              {steps[step].content}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={next}
            className="w-full mt-6 py-3 rounded-xl gradient-rizz text-white font-semibold flex items-center justify-center gap-2"
          >
            {step === steps.length - 1 ? "Get Started" : "Continue"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
