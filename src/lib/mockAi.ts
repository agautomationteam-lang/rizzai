import type { ProfileAnalysis, ChatMessage, ScreenshotAnalysis, GeneratedBio, ScoreCard } from '@/types';

function id() {
  return Math.random().toString(36).slice(2, 10);
}

function now() {
  return new Date().toISOString();
}

export async function mockProfileAnalysis(bioText: string, roastMode = false): Promise<ProfileAnalysis> {
  await new Promise((r) => setTimeout(r, 1500));
  
  const overallScore = Math.floor(Math.random() * 30) + 55; // 55-85
  
  const coachSuggestions = [
    { category: 'bio', priority: 'high' as const, text: "Lead with a specific hobby instead of generic phrases like 'loves hiking'." },
    { category: 'photos', priority: 'high' as const, text: 'Your only photo with a smile is the 4th one — 73% of users never scroll that far.' },
    { category: 'bio', priority: 'medium' as const, text: 'Add a conversation starter or question to make it easier for matches to message you.' },
    { category: 'photos', priority: 'medium' as const, text: 'Include a full-body photo in natural lighting — it builds trust.' },
    { category: 'vibe', priority: 'low' as const, text: 'Show more of your personality — what makes you laugh?' },
  ];
  
  const roastSuggestions = [
    { category: 'bio', priority: 'high' as const, text: "Bro, that bio screams 'I have exactly one hobby and it\'s video games.' Let's fix this." },
    { category: 'photos', priority: 'high' as const, text: 'Photo #2 makes you look 10 years older. Delete it. Now.' },
    { category: 'vibe', priority: 'medium' as const, text: 'Zero smiling photos. You look like you\'re plotting revenge against your ex.' },
    { category: 'style', priority: 'medium' as const, text: 'That bathroom selfie with the toilet visible? We need to talk.' },
  ];
  
  const rewrittenBio = bioText
    ? `Building apps by day, chasing sunsets by weekend. Currently reading: Atomic Habits. Let's debate pineapple on pizza.`
    : undefined;

  return {
    id: 'anal_' + id(),
    overallScore,
    scores: {
      attractiveness: Math.min(100, overallScore + Math.floor(Math.random() * 10) - 5),
      bioQuality: Math.min(100, overallScore + Math.floor(Math.random() * 20) - 10),
      confidence: Math.min(100, overallScore + Math.floor(Math.random() * 15) - 7),
      swipePotential: Math.min(100, overallScore + Math.floor(Math.random() * 12) - 6),
      emotionalImpression: Math.min(100, overallScore + Math.floor(Math.random() * 14) - 7),
      authenticity: Math.min(100, overallScore + Math.floor(Math.random() * 10) - 5),
      humor: Math.min(100, overallScore + Math.floor(Math.random() * 25) - 12),
      photoQuality: Math.min(100, overallScore + Math.floor(Math.random() * 15) - 7),
    },
    suggestions: roastMode ? roastSuggestions : coachSuggestions,
    rewrittenBio: roastMode ? undefined : rewrittenBio,
    photoFeedback: [
      { photoIndex: 0, score: 90, note: roastMode ? 'Best photo. Still mid though.' : 'Great eye contact and lighting' },
      { photoIndex: 1, score: 45, note: roastMode ? 'Toilet in background. Legendary fail.' : 'Consider a different background' },
    ],
    redFlags: roastMode ? undefined : ['Bio is too generic', 'No full-body photo'],
    roast: roastMode
      ? [
          "Your profile looks like it was assembled by an AI that only knows LinkedIn.",
          "I've seen more excitement in a Terms of Service page.",
          "Swipe right if you enjoy long walks to the fridge.",
        ]
      : undefined,
    createdAt: now(),
  };
}

export async function mockWingmanReply(
  userMessage: string,
  mode: string,
  context?: { matchName?: string; platform?: string }
): Promise<ChatMessage> {
  await new Promise((r) => setTimeout(r, 1200));
  
  const name = context?.matchName || 'they';
  
  const softReplies = [
    `Hey ${name}, that's hilarious 😂 what else are you into?`,
    `Haha I feel that! By the way, have you ever tried [shared interest]?`,
    `That's so cool! You seem really interesting — how'd you get into that?`,
  ];
  
  const hardReplies = [
    `${name}, you're trouble and I like it. When are we grabbing drinks?`,
    `Bold of you to assume I'm not already planning our first date.`,
    `Okay but for real — are you this fun in person or just over text?`,
  ];
  
  const extremeReplies = [
    `${name}, I'm deleting my other apps after this conversation. Your move.`,
    `Look, I'm not here to text for 3 weeks. Drinks this week — yes or yes?`,
    `If we don't meet soon, I'm showing up at your favorite coffee shop. Fair warning.`,
  ];
  
  const roastReplies = [
    `${name} just sent you 'lol.' That's not a conversation, that's a cry for help.`,
    `They're breadcrumbing you. Here's 3 power moves to either revive it or move on.`,
    `That reply took you 20 minutes? They replied in 4. You're already losing.`,
  ];
  
  const coachReplies = [
    `Try asking an open-ended question about something specific from their profile.`,
    `Match their energy but add 10% more warmth. People respond to warmth.`,
    `The best move here is to suggest a low-stakes activity related to what they just said.`,
  ];
  
  let reply = '';
  let alternatives: string[] = [];
  
  switch (mode) {
    case 'SOFT':
      reply = softReplies[Math.floor(Math.random() * softReplies.length)];
      alternatives = softReplies.filter((r) => r !== reply).slice(0, 2);
      break;
    case 'HARD':
      reply = hardReplies[Math.floor(Math.random() * hardReplies.length)];
      alternatives = hardReplies.filter((r) => r !== reply).slice(0, 2);
      break;
    case 'EXTREME':
      reply = extremeReplies[Math.floor(Math.random() * extremeReplies.length)];
      alternatives = extremeReplies.filter((r) => r !== reply).slice(0, 2);
      break;
    case 'ROAST':
      reply = roastReplies[Math.floor(Math.random() * roastReplies.length)];
      alternatives = roastReplies.filter((r) => r !== reply).slice(0, 2);
      break;
    case 'COACH':
      reply = coachReplies[Math.floor(Math.random() * coachReplies.length)];
      alternatives = coachReplies.filter((r) => r !== reply).slice(0, 2);
      break;
    default:
      reply = softReplies[0];
      alternatives = softReplies.slice(1, 3);
  }
  
  return {
    id: 'msg_' + id(),
    role: 'assistant',
    content: reply,
    alternatives,
    tone: mode,
    strategyNotes: mode === 'COACH'
      ? 'This approach builds rapport by showing curiosity without pressure.'
      : undefined,
    timestamp: now(),
  };
}

export async function mockScreenshotAnalysis(imageUrl: string): Promise<ScreenshotAnalysis> {
  await new Promise((r) => setTimeout(r, 2000));
  
  return {
    id: 'ss_' + id(),
    imageUrl,
    ocrText: 'Hey! How was your weekend? Not bad, just relaxed. You? Same haha.',
    platformDetected: Math.random() > 0.5 ? 'Tinder' : 'Hinge',
    emotionalMetrics: {
      sentiment: 'Neutral to slightly positive',
      urgency: 0.3,
      interestLevel: 0.45,
    },
    suggestedReplies: [
      "Weekend was chill — but this week I'm planning something more fun. Any recommendations?",
      'Relaxed weekends are underrated. What does your ideal non-relaxed weekend look like?',
      'Haha same. We should change that though — drinks this week?',
    ],
    ghostingProbability: 0.35,
    contextSummary: 'Conversation is friendly but plateauing. Need to inject curiosity or escalate.',
    redFlags: ['One-word replies appearing', 'No questions being asked back'],
    createdAt: now(),
  };
}

export async function mockBioGeneration(traits: string[], tone: string, platform?: string): Promise<GeneratedBio> {
  await new Promise((r) => setTimeout(r, 1200));
  
  const tones: Record<string, string[]> = {
    funny: [
      'Professional third wheel seeking promotion to first wheel.',
      'My love language is memes and snacks.',
      'Here because my therapist said I need to "put myself out there."',
    ],
    genuine: [
      'Software engineer who loves hiking, dogs, and sushi. Looking for someone to explore new trails with.',
      'Building apps by day, chasing sunsets by weekend. Currently reading Atomic Habits.',
      'Dog dad, coffee addict, sunrise chaser. Let\'s find our next adventure together.',
    ],
    bold: [
      'I will out-hike you, out-eat you, and out-laugh you. Try me.',
      'Not here for small talk. Tell me your biggest dream or your worst date.',
      'CEO of my own life. Swipe right if you can keep up.',
    ],
  };
  
  const variations = tones[tone] || tones.genuine;
  
  return {
    id: 'bio_' + id(),
    tone,
    platform,
    variations,
    createdAt: now(),
  };
}

export async function mockScoreCard(): Promise<ScoreCard> {
  await new Promise((r) => setTimeout(r, 1000));
  
  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'];
  const overallGrade = grades[Math.floor(Math.random() * grades.length)];
  
  return {
    id: 'sc_' + id(),
    title: 'My Dating Report Card',
    overallGrade,
    categoryScores: {
      rizz: Math.floor(Math.random() * 30) + 65,
      photos: Math.floor(Math.random() * 30) + 60,
      bio: Math.floor(Math.random() * 35) + 55,
      conversation: Math.floor(Math.random() * 30) + 60,
    },
    createdAt: now(),
  };
}
