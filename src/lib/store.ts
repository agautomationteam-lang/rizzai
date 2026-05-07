import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, ProfileAnalysis, Conversation, ScreenshotAnalysis, GeneratedBio, ScoreCard, HistoryItem, CoachingMode, DatingProfile } from '@/types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  onboardingStep: number;
  analyses: ProfileAnalysis[];
  conversations: Conversation[];
  screenshotAnalyses: ScreenshotAnalysis[];
  generatedBios: GeneratedBio[];
  scoreCards: ScoreCard[];
  history: HistoryItem[];
  currentMode: CoachingMode;
  connectedProfiles: DatingProfile[];
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
  setOnboardingStep: (step: number) => void;
  addAnalysis: (analysis: ProfileAnalysis) => void;
  addConversation: (conversation: Conversation) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  addScreenshotAnalysis: (analysis: ScreenshotAnalysis) => void;
  addGeneratedBio: (bio: GeneratedBio) => void;
  addScoreCard: (card: ScoreCard) => void;
  addHistoryItem: (item: HistoryItem) => void;
  consumeCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  setCurrentMode: (mode: CoachingMode) => void;
  upgradeTier: (tier: 'PREMIUM' | 'PRO') => void;
  addConnectedProfile: (profile: DatingProfile) => void;
  removeConnectedProfile: (id: string) => void;
}

import type { ChatMessage } from '@/types';

const DEFAULT_USER: User = {
  id: 'usr_1',
  email: 'demo@rizzai.app',
  displayName: 'Rizz King',
  tier: 'FREE',
  credits: 0,
  monthlyUsed: 0,
  monthlyLimit: 0,
  onboardingComplete: false,
  hasActiveSubscription: false,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      onboardingStep: 0,
      analyses: [],
      conversations: [],
      screenshotAnalyses: [],
      generatedBios: [],
      scoreCards: [],
      history: [],
      currentMode: 'SOFT',
      connectedProfiles: [],

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      login: (email, name) => {
        const user: User = {
          ...DEFAULT_USER,
          email,
          displayName: name || email.split('@')[0],
          id: 'usr_' + Math.random().toString(36).slice(2, 8),
        };
        set({ user, isAuthenticated: true });
      },
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      completeOnboarding: () => {
        set((state) => ({
          user: state.user ? { ...state.user, onboardingComplete: true } : null,
          onboardingStep: 4,
        }));
      },
      
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      
      addAnalysis: (analysis) => {
        set((state) => ({ analyses: [analysis, ...state.analyses] }));
        get().addHistoryItem({
          id: analysis.id,
          type: 'profile',
          title: 'Profile Analysis',
          preview: `Score: ${analysis.overallScore}/100`,
          createdAt: analysis.createdAt,
        });
      },
      
      addConversation: (conversation) => {
        set((state) => ({ conversations: [conversation, ...state.conversations] }));
      },
      
      addMessage: (conversationId, message) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, messages: [...c.messages, message], updatedAt: new Date().toISOString() }
              : c
          ),
        }));
      },
      
      addScreenshotAnalysis: (analysis) => {
        set((state) => ({ screenshotAnalyses: [analysis, ...state.screenshotAnalyses] }));
        get().addHistoryItem({
          id: analysis.id,
          type: 'screenshot',
          title: 'Screenshot Analysis',
          preview: analysis.contextSummary || 'Conversation analyzed',
          createdAt: analysis.createdAt,
        });
      },
      
      addGeneratedBio: (bio) => {
        set((state) => ({ generatedBios: [bio, ...state.generatedBios] }));
        get().addHistoryItem({
          id: bio.id,
          type: 'bio',
          title: `Bio Generator (${bio.tone})`,
          preview: bio.variations[0]?.slice(0, 60) + '...' || 'Bio generated',
          createdAt: bio.createdAt,
        });
      },
      
      addScoreCard: (card) => {
        set((state) => ({ scoreCards: [card, ...state.scoreCards] }));
        get().addHistoryItem({
          id: card.id,
          type: 'viral',
          title: card.title,
          preview: `Grade: ${card.overallGrade}`,
          createdAt: card.createdAt,
        });
      },
      
      addHistoryItem: (item) => {
        set((state) => ({ history: [item, ...state.history] }));
      },
      
      consumeCredits: (amount) => {
        const { user } = get();
        if (!user || user.credits < amount) return false;
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                credits: state.user.credits - amount,
                monthlyUsed: state.user.monthlyUsed + amount,
              }
            : null,
        }));
        return true;
      },
      
      addCredits: (amount) => {
        set((state) => ({
          user: state.user
            ? { ...state.user, credits: state.user.credits + amount }
            : null,
        }));
      },
      
      setCurrentMode: (mode) => set({ currentMode: mode }),

      upgradeTier: (tier) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                tier,
                hasActiveSubscription: true,
                credits: tier === 'PRO' ? 999 : 100,
                monthlyLimit: tier === 'PRO' ? 999 : 100,
              }
            : null,
        }));
      },

      addConnectedProfile: (profile) => {
        set((state) => ({ connectedProfiles: [profile, ...state.connectedProfiles] }));
      },

      removeConnectedProfile: (id) => {
        set((state) => ({ connectedProfiles: state.connectedProfiles.filter((p) => p.id !== id) }));
      },
    }),
    {
      name: 'rizzai-storage',
    }
  )
);
