"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Camera, Link2, Heart, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import type { DatingProfile } from "@/types";

const platforms = ["Tinder", "Bumble", "Hinge", "OkCupid", "Other"] as const;

export default function ProfilesPage() {
  const { connectedProfiles, addConnectedProfile, removeConnectedProfile } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [platform, setPlatform] = useState<typeof platforms[number]>("Tinder");
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
      profileUrl: profileUrl || undefined,
      bio: bio || undefined,
      photos,
      connectedAt: new Date().toISOString(),
    };
    addConnectedProfile(profile);
    setShowAdd(false);
    setProfileUrl("");
    setBio("");
    setPhotos([]);
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Connected Profiles</h1>
        <p className="text-sm text-gray-500">Link all your dating apps for cross-platform coaching.</p>
      </div>

      {/* Connected Profiles List */}
      <div className="space-y-3">
        {connectedProfiles.length === 0 && !showAdd && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-sm text-gray-400 mb-4">No profiles connected yet.</p>
            <button
              onClick={() => setShowAdd(true)}
              className="px-6 py-2.5 rounded-full gradient-rizz text-white text-sm font-medium"
            >
              Connect Your First Profile
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
                    Connected {new Date(profile.connectedAt).toLocaleDateString()}
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

            {profile.profileUrl && (
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-rose-500 font-medium"
              >
                <Link2 className="w-3 h-3" /> View Profile
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Profile Button */}
      {!showAdd && connectedProfiles.length > 0 && (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 text-sm font-medium flex items-center justify-center gap-2 hover:border-rose-300 hover:text-rose-500 transition"
        >
          <Plus className="w-4 h-4" /> Connect Another Profile
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
            <h3 className="text-sm font-semibold text-gray-900">Connect Profile</h3>
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
            <label className="text-xs font-medium text-gray-700 mb-1 block">Profile URL (optional)</label>
            <input
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://tinder.com/..."
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Bio (optional)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Paste your current bio..."
              className="w-full h-20 p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-200"
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
