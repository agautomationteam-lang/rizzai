# RizzAI - Play Store Launch Guide

## App Overview
**RizzAI** is an AI Dating Wingman app that helps users get more matches, send better texts, and convert conversations into dates. The app features profile analysis, conversation coaching, screenshot intelligence, bio rewriting, and viral scorecards.

---

## What's Changed (Latest Build)

### Pricing Update
- **Free tier REMOVED** — Serious users only
- **Premium**: $29.99/month (unlimited analyses, all coaching modes, priority AI)
- **Pro**: $45.99/month (everything + voice coaching, wardrobe analysis, custom AI personality)
- 14-day free trial on both plans

### Stripe Payments (Working Integration)
- Real Stripe Checkout integration at `/api/stripe/checkout`
- Webhook handler at `/api/stripe/webhook`
- Subscription lifecycle management
- Add your Stripe keys to `.env.local`:
  ```
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
  STRIPE_SECRET_KEY=sk_live_...
  STRIPE_WEBHOOK_SECRET=whsec_...
  ```

### Dating Profile Connections
- New **Connected Profiles** page at `/profiles`
- Users can connect Tinder, Bumble, Hinge, OkCupid, and Other profiles
- Upload profile photos, paste bio text, and add profile URLs
- Cross-platform coaching based on connected profiles

### Paywall Enforcement
- After signup + onboarding, users are redirected to `/upgrade`
- All app features are gated behind an active subscription
- No free usage — users must subscribe to use RizzAI

---

## Tech Stack
- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **State**: Zustand (persisted to localStorage)
- **Payments**: Stripe Checkout + Webhooks
- **Mobile**: Capacitor 7 + Android
- **Build Output**: Static export (`dist/`) synced to `android/app/src/main/assets/public`

---

## Play Store Setup Steps

### 1. Configure Stripe (Required for Payments)
1. Go to https://dashboard.stripe.com
2. Create two products:
   - **Premium** — $29.99/month
   - **Pro** — $45.99/month
3. Copy the Price IDs into `src/app/upgrade/page.tsx`:
   - `price_premium_monthly` → your actual Price ID
   - `price_pro_monthly` → your actual Price ID
4. Add your keys to `.env.local` (see above)
5. Set up webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Listen to: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`

### 2. Build Android App
```bash
cd C:\Users\megha\OneDrive\Desktop\Try\rizzai
npm run build
npx cap sync android
```

### 3. Open in Android Studio
```bash
npx cap open android
```

### 4. Update App Icons
Replace the default Capacitor icons in:
```
android/app/src/main/res/mipmap-*/
```
Generate proper icons at:
- **mdpi**: 48x48
- **hdpi**: 72x72
- **xhdpi**: 96x96
- **xxhdpi**: 144x144
- **xxxhdpi**: 192x192

Also replace `android/app/src/main/res/drawable/splash.png` with your splash screen.

### 5. Update App Signing
In Android Studio:
1. Build → Generate Signed Bundle / APK
2. Create new keystore or use existing
3. Select **Android App Bundle (.aab)** for Play Store
4. Upload the `.aab` file to Google Play Console

### 6. Google Play Console Setup
1. Create app in [Google Play Console](https://play.google.com/console)
2. App name: **RizzAI**
3. Package name: `com.rizzai.app`
4. Complete store listing:
   - Short description: "Your AI Dating Wingman — Get more matches, better dates, real confidence."
   - Full description: Use the spec document for detailed copy
   - Screenshots: Capture from the app (Profile Analyzer, Wingman Chat, Screenshot Analysis, Viral Tools)
   - Feature graphic: 1024x500
   - App icon: 512x512

### 7. Content Rating & Policies
- Category: Dating
- Content rating: Mature 17+ (dating context)
- Data safety form: Declare camera, photos, and account data usage
- Privacy policy URL: Required — create at `/privacy` route

---

## App Flow (Verified Working)
1. **Landing Page** (`/`) → Marketing site with pricing
2. **Sign Up** (`/signup`) → Email + name + password
3. **Onboarding** (`/onboarding`) → 3-step intro + platform selection
4. **Upgrade** (`/upgrade`) → Choose Premium ($29.99) or Pro ($45.99)
5. **Stripe Checkout** → Real payment or 14-day trial
6. **Dashboard** (`/home`) → Full app access unlocked
7. **Connected Profiles** (`/profiles`) → Link Tinder, Bumble, Hinge
8. **Features**: Analyzer, Wingman Chat, Screenshots, Bio Rewriter, Viral Tools

---

## Testing Checklist Before Launch
- [ ] Stripe test mode checkout works end-to-end
- [ ] Subscription webhook updates user tier correctly
- [ ] Paywall blocks free users from all features
- [ ] Profile photo upload works on Android device
- [ ] Screenshot upload + analysis flow works
- [ ] Chat/Wingman responses generate correctly
- [ ] Bio rewriter generates and copies text
- [ ] Viral scorecards render shareable cards
- [ ] Connected profiles save and display correctly
- [ ] Logout + re-login preserves subscription status
- [ ] App passes Google Play pre-launch report

---

## File Structure
```
rizzai/
├── android/                    # Capacitor Android project
│   └── app/src/main/...
├── src/
│   ├── app/
│   │   ├── (app)/layout.tsx    # App shell with paywall
│   │   ├── home/page.tsx       # Dashboard
│   │   ├── analyzer/page.tsx   # Profile Analyzer
│   │   ├── wingman/page.tsx    # AI Chat Coach
│   │   ├── screenshots/page.tsx # Screenshot Analysis
│   │   ├── bio/page.tsx        # Bio Rewriter
│   │   ├── viral/page.tsx      # Viral Scorecards
│   │   ├── profiles/page.tsx   # Connected Dating Profiles
│   │   ├── upgrade/page.tsx    # Stripe Pricing
│   │   ├── api/stripe/         # Checkout + Webhook
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── onboarding/page.tsx
│   ├── components/layout/      # AppHeader, BottomNav
│   ├── lib/
│   │   ├── store.ts            # Zustand state
│   │   └── mockAi.ts           # AI response engine
│   └── types/index.ts          # TypeScript types
├── capacitor.config.ts         # Capacitor config
├── next.config.ts              # Next.js static export
└── .env.local                  # Stripe keys
```

---

## Support
For Stripe payment issues: https://stripe.com/support
For Capacitor/Android issues: https://capacitorjs.com/docs
For Play Store publishing: https://support.google.com/googleplay/android-developer
