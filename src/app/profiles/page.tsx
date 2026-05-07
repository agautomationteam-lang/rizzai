"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Camera, Link2, Heart, Trash2, ExternalLink, Smartphone } from "lucide-react";
import { useStore } from "@/lib/store";
import type { DatingProfile } from "@/types";

const platforms = ["Tinder", "Bumble", "Hinge", "OkCupid", "Other"] as const;

const deepLinks: Record<string, string> = {
  Tinder: "tinder://app",
  Bumble: "bumble://",
  Hinge: "hinge://",
  OkCupid: "okcupid://",
};

const webUrls: Record<string, string> = {
  Tinder: "https://tinder.com",
  Bumble: "https://bumble.com",
  Hinge: "https://hinge.co",
  OkCupid: "https://okcupid.com",
};

export default function ProfilesPage() {
  const { connectedProfiles, addConnectedProfile, removeConnectedProfile } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [platform, setPlatform] = useState<typeof platforms[number]>("Tinder");
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [bio, setBio] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && photos.length < 6) {
          setPhotos((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const saveProfile = () => {
    const profile: DatingProfile = {
      id: "prof_" + Math.random().toString(36).slice(2, 8),
      platform,
      username: username || undefined,
      profileUrl: profileUrl || undefined,
      bio: bio || undefined,
      photos,
      connectedAt: new Date().toISOString(),
    };
    addConnectedProfile(profile);
    setShowAdd(false);
    setUsername("");
    setProfileUrl("");
    setBio("");
    setPhotos([]);
  };

  const openApp = (platformName: string) => {
    const deep = deepLinks[platformName];
    const web = webUrls[platformName];
    if (deep) {
      window.open(deep, "_system");
      // Fallback to web after a short delay if deep link fails
      setTimeout(() => {
        if (web) window.open(web, "_blank");
      }, 1500);
    } else if (web) {
      window.open(web, "_blank");
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Dating Profiles</h1>
        <p className="text-sm text-gray-500">Save your dating app profiles for quick access and personalized coaching.</p>
      </div>

      {/* Profiles List */}
      <div className="space-y-3">
        {connectedProfiles.length === 0 && !showAdd && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-sm text-gray-400 mb-4">No profiles saved yet.</p>
            <button
              onClick={() => setShowAdd(true)}
              className="px-6 py-2.5 rounded-full gradient-rizz text-white text-sm font-medium"
            >
              Add Your First Profile
            </button>
          </div>
        )}

        {connectedProfiles.map((profile) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold">
                  {profile.platform[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{profile.platform}</div>
                  <div className="text-xs text-gray-500">
                    Saved {new Date(profile.connectedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeConnectedProfile(profile.id)}
                className="p-2 rounded-full hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {profile.username && (
              <div className="text-xs text-gray-600 mb-2">
                Username: <span className="font-medium text-gray-900">{profile.username}</span>
              </div>
            )}

            {profile.photos.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {profile.photos.map((photo, i) => (
                  <img key={i} src={photo} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                ))}
              </div>
            )}

            {profile.bio && (
              <div className="mt-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-2">{profile.bio}</div>
            )}

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => openApp(profile.platform)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Open {profile.platform}
              </button>
              {profile.profileUrl && (
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Web
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Profile Button */}
      {!showAdd && connectedProfiles.length > 0 && (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 text-sm font-medium flex items-center justify-center gap-2 hover:border-rose-300 hover:text-rose-500 transition"
        >
          <Plus className="w-4 h-4" /> Add Another Profile
        </button>
      )}

      {/* Add Profile Form */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Add Profile</h3>
            <button onClick={() => setShowAdd(false)} className="p-1 rounded-full hover:bg-gray-100">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Platform</label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                    platform === p
                      ? "bg-rose-50 border-rose-200 text-rose-700"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Username (optional)</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username on this app"
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Profile URL (optional)</label>
            <input
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://..."
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Bio (optional)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Paste your current bio..."
              className="w-full h-20 p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Photos ({photos.length}/6)</label>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {photos.length < 6 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                  <Camera className="w-5 h-5 text-gray-400 mb-1" />
                  <span className="text-[10px] text-gray-400">Add</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          <button
            onClick={saveProfile}
            className="w-full py-3 rounded-xl gradient-rizz text-white font-medium text-sm"
          >
            Save Profile
          </button>
        </motion.div>
      )}
    </div>
  );
}
