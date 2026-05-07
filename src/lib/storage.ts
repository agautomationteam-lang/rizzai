import { createJSONStorage } from "zustand/middleware";

let Preferences: typeof import("@capacitor/preferences").Preferences | null = null;
let isNative = false;
let initDone = false;

async function initStorage() {
  if (initDone) return;
  initDone = true;

  // Dynamic import to avoid SSR issues in Next.js
  if (typeof window !== "undefined") {
    try {
      const cap = await import("@capacitor/core");
      isNative = cap.Capacitor.isNativePlatform();
      if (isNative) {
        const prefs = await import("@capacitor/preferences");
        Preferences = prefs.Preferences;
      }
    } catch {
      // Not a Capacitor environment
      isNative = false;
    }
  }
}

/**
 * A storage object matching the Web Storage API.
 * On native mobile: uses Capacitor Preferences.
 * On web: falls back to localStorage.
 */
const nativeAwareStorage = {
  getItem: async (name: string): Promise<string | null> => {
    await initStorage();

    if (isNative && Preferences) {
      const { value } = await Preferences.get({ key: name });
      return value;
    }

    if (typeof window !== "undefined") {
      return window.localStorage.getItem(name);
    }

    return null;
  },

  setItem: async (name: string, value: string): Promise<void> => {
    await initStorage();

    if (isNative && Preferences) {
      await Preferences.set({ key: name, value });
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(name, value);
    }
  },

  removeItem: async (name: string): Promise<void> => {
    await initStorage();

    if (isNative && Preferences) {
      await Preferences.remove({ key: name });
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(name);
    }
  },
};

/**
 * Zustand persist storage that works on both web (localStorage)
 * and native mobile (Capacitor Preferences).
 */
export const appStorage = createJSONStorage(() => nativeAwareStorage);
