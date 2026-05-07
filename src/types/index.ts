export type SubscriptionTier = 'FREE' | 'PREMIUM' | 'PRO';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  tier: SubscriptionTier;
  credits: number;
  monthlyUsed: number;
  monthlyLimit: number;
  onboardingComplete: boolean;
  hasActiveSubscription: boolean;
}

export type CoachingMode = 'SOFT' | 'HARD' | 'EXTREME' | 'ROAST' | 'COACH';

export interface DatingProfile {
  id: string;
  platform: 'Tinder' | 'Bumble' | 'Hinge' | 'OkCupid' | 'Other';
  profileUrl?: string;
  bio?: string;
  photos: string[];
  connectedAt: string;
}

export interface ProfileAnalysis {
  id: string;
  overallScore: number;
  scores: {
    attractiveness: number;
    bioQuality: number;
    confidence: number;
    swipePotential: number;
    emotionalImpression: number;
    authenticity: number;
    humor: number;
    photoQuality: number;
  };
  suggestions: Array<{
    category: string;
    priority: 'high' | 'medium' | 'low';
    text: string;
  }>;
  rewrittenBio?: string;
  photoFeedback?: Array<{
    photoIndex: number;
    score: number;
    note: string;
  }>;
  redFlags?: string[];
  roast?: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  alternatives?: string[];
  tone?: string;
  strategyNotes?: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  platform?: string;
  matchName?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ScreenshotAnalysis {
  id: string;
  imageUrl: string;
  ocrText?: string;
  platformDetected?: string;
  emotionalMetrics?: {
    sentiment: string;
    urgency: number;
    interestLevel: number;
  };
  suggestedReplies?: string[];
  ghostingProbability?: number;
  contextSummary?: string;
  redFlags?: string[];
  createdAt: string;
}

export interface GeneratedBio {
  id: string;
  tone: string;
  platform?: string;
  variations: string[];
  createdAt: string;
}

export interface ScoreCard {
  id: string;
  title: string;
  overallGrade: string;
  categoryScores: {
    rizz: number;
    photos: number;
    bio: number;
    conversation: number;
  };
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  type: 'profile' | 'wingman' | 'screenshot' | 'bio' | 'viral';
  title: string;
  preview: string;
  createdAt: string;
}

export type Platform = 'Tinder' | 'Bumble' | 'Hinge' | 'OkCupid' | 'Other';
