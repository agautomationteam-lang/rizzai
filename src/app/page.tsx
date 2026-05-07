"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Zap, Shield, Star, ChevronRight, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: "AI Profile Analyzer",
      desc: "Get your dating profile scored across 8 dimensions. Discover why you're not getting matches and exactly how to fix it.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      title: "Conversation Wingman",
      desc: "Paste any chat and get 3 tailored reply suggestions in under 10 seconds. Soft, Hard, or Extreme mode — your choice.",
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Screenshot Intelligence",
      desc: "Upload chat screenshots. Our AI reads emotions, detects ghosting probability, and tells you where you stand.",
    },
  ];

  const steps = [
    { step: "1", title: "Upload your profile or paste a conversation", desc: "Takes 10 seconds. No judgment." },
    { step: "2", title: "AI analyzes in real-time", desc: "Scores, insights, and reply suggestions generated instantly." },
    { step: "3", title: "Copy, paste, and get more dates", desc: "Use the suggestions directly in your dating apps." },
  ];

  const testimonials = [
    { name: "Alex M.", text: "Went from 2 matches/week to 15. The roast mode is brutal but accurate.", score: "4.8" },
    { name: "Jordan K.", text: "I was ghosted constantly. RizzAI helped me understand what I was doing wrong.", score: "4.9" },
    { name: "Sam T.", text: "The extreme mode replies actually work. Got 3 dates in my first week.", score: "5.0" },
  ];

  const faqs = [
    { q: "Is this cheating?", a: "Think of RizzAI like Grammarly for dating. We help you communicate better, not pretend to be someone else." },
    { q: "Which dating apps work with RizzAI?", a: "All of them. Tinder, Bumble, Hinge, OkCupid — we're platform agnostic. Just paste your conversation or upload a screenshot." },
    { q: "How accurate is the AI?", a: "Our users report 80%+ accuracy on profile scores and a 3x improvement in response rates when using our reply suggestions." },
    { q: "Is my data private?", a: "Absolutely. We auto-delete screenshots after 24 hours. Your conversations are encrypted and never sold." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-rizz flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-rizz-text">RizzAI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it Works</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
            <Link href="/login" className="text-sm font-medium text-gray-900 hover:text-gray-600">Log in</Link>
            <Link href="/signup" className="px-4 py-2 rounded-full gradient-rizz text-white text-sm font-medium hover:opacity-90 transition">
              Get Started
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            <div className="w-5 h-0.5 bg-gray-900 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-900 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-900"></div>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm text-gray-600">Features</a>
            <a href="#how-it-works" className="block text-sm text-gray-600">How it Works</a>
            <a href="#pricing" className="block text-sm text-gray-600">Pricing</a>
            <Link href="/login" className="block text-sm font-medium text-gray-900">Log in</Link>
            <Link href="/signup" className="block px-4 py-2 rounded-full gradient-rizz text-white text-sm font-medium text-center">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 opacity-60"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium mb-6">
                <Sparkles className="w-3 h-3" />
                Trusted by 50,000+ singles
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Your AI{" "}
                <span className="gradient-rizz-text">Dating Wingman</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Get more matches. Send better texts. Know where you stand. 
                AI-powered dating coach that tells you exactly what to text next — so you stop getting ghosted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="px-8 py-4 rounded-full gradient-rizz text-white font-semibold text-center hover:opacity-90 transition shadow-lg shadow-rose-200">
                  Get Started Free
                </Link>
                <Link href="/demo" className="px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold text-center hover:bg-gray-50 transition">
                  Try Demo
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>4.9/5 from 2,400+ reviews</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-orange-400"></div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Profile Analysis</div>
                      <div className="text-xs text-gray-500">Overall Score</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-rizz-text">78</div>
                </div>
                
                <div className="space-y-3 mb-4">
                  {[
                    { label: "Attractiveness", score: 82 },
                    { label: "Bio Quality", score: 65 },
                    { label: "Photo Quality", score: 75 },
                    { label: "Swipe Potential", score: 88 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium text-gray-900">{item.score}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${item.score}%` }} 
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full gradient-rizz"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-rose-50 rounded-xl">
                  <div className="text-xs font-medium text-rose-800 mb-1">AI Suggestion</div>
                  <div className="text-xs text-rose-700">Lead with a specific hobby instead of generic phrases like &quot;loves hiking&quot;.</div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
              >
                <div className="text-xs text-gray-500 mb-1">Text Rizz Score</div>
                <div className="text-2xl font-bold text-amber-500">73/100</div>
                <div className="text-xs text-gray-400">Smooth but needs edge</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
              >
                <div className="text-xs text-gray-500 mb-1">Date Probability</div>
                <div className="text-2xl font-bold text-emerald-500">87%</div>
                <div className="text-xs text-gray-400">Looking good!</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 items-center text-gray-400">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium text-gray-600">Product Hunt #1</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-400" />
              <span className="text-sm font-medium text-gray-600">50K+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-gray-600">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-gray-600">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything you need to win at dating</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From profile optimization to conversation coaching — RizzAI covers your entire dating funnel.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 card-shadow hover:shadow-xl transition"
              >
                <div className="w-12 h-12 rounded-xl gradient-rizz flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-rose-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-600">From awkward to awesome in 30 seconds.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-rizz flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Real results from real users</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 card-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.floor(parseFloat(t.score)) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-sm font-medium text-gray-900 ml-2">{t.score}</span>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="font-medium text-gray-900">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-rose-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600">Start free. Upgrade when you&apos;re ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-rose-400 card-shadow relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-rizz text-white text-xs font-medium">
                Most Popular
              </div>
              <div className="text-sm font-medium text-gray-500 mb-2">Premium</div>
              <div className="text-4xl font-bold text-gray-900 mb-6">$29.99<span className="text-base font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["Unlimited analyses", "All coaching modes (Soft/Hard/Extreme)", "Unlimited screenshots", "No watermarks on shares", "Priority AI queue", "Weekly dating reports"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full py-3 rounded-xl gradient-rizz text-center font-medium text-white hover:opacity-90 transition">
                Start Free Trial
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 card-shadow">
              <div className="text-sm font-medium text-gray-500 mb-2">Pro</div>
              <div className="text-4xl font-bold text-gray-900 mb-6">$45.99<span className="text-base font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["Everything in Premium", "AI Voice Coaching", "Wardrobe Analysis", "Post-Date Feedback", "Custom AI Personality", "1-on-1 Monthly Power Hour"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full py-3 rounded-xl bg-gray-900 text-center font-medium text-white hover:bg-gray-800 transition">
                Go Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-5 pb-5 text-gray-600"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-rose-500 to-orange-400">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to stop getting ghosted?</h2>
          <p className="text-white/90 text-lg mb-8">Join 50,000+ singles who use RizzAI to get more matches and better dates.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="inline-block px-8 py-4 rounded-full bg-white text-rose-600 font-semibold hover:bg-gray-100 transition shadow-lg">
              Get Started Free
            </Link>
            <Link href="/demo" className="inline-block px-8 py-4 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 transition border border-white/30">
              Try Demo — No Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-rizz flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-rizz-text">RizzAI</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
            <div className="text-sm text-gray-400">© 2026 RizzAI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
