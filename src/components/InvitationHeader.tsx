import { Sparkles, Heart, Crown } from "lucide-react";
import { EVENT_CONFIG } from "../config/eventConfig";

export default function InvitationHeader() {
  return (
    <header className="relative gradient-unicorn-dream text-white px-6 py-12 text-center overflow-hidden">
      {/* Magical sparkle background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-2 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-4 right-1/3 w-32 h-32 bg-pink-100 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-purple-100 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Magical unicorn and rainbow decorations */}
        <div className="flex justify-center items-center gap-3 text-4xl mb-6">
          <span className="animate-bounce text-5xl">🦄</span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <Sparkles className="h-6 w-6 text-pink-200 animate-pulse" />
              <span className="animate-bounce delay-100 text-3xl">🌈</span>
              <Crown className="h-6 w-6 text-yellow-200 animate-pulse delay-300" />
            </div>
            <div className="flex items-center gap-1">
              <span className="animate-bounce delay-200 text-2xl">✨</span>
              <Heart className="h-5 w-5 text-pink-200 animate-pulse delay-600" />
              <span className="animate-bounce delay-400 text-2xl">💖</span>
            </div>
          </div>
          <span className="animate-bounce delay-500 text-5xl">🎂</span>
        </div>

        {/* Main heading with rainbow text effect */}
        <div className="space-y-4">
          <h1 className="font-display text-4xl lg:text-5xl text-white drop-shadow-lg tracking-wider leading-tight animate-float-gentle">
            You're Invited to a
            <br />
            <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-rainbow-pulse">
              Magical Party
            </span>
          </h1>
          <div className="flex justify-center items-center gap-2 text-3xl animate-bounce-magical">
            <span>🦄</span>
            <span>✨</span>
            <span>🌈</span>
            <span>💫</span>
          </div>
          <h2 className="text-2xl font-display text-pink-100 drop-shadow">
            at {EVENT_CONFIG.venue.shortName}!
          </h2>
          <p className="text-purple-100 text-sm font-medium">
            {EVENT_CONFIG.venue.contact.website}
          </p>
        </div>

        {/* Enhanced decorative border with magical elements */}
        <div className="flex justify-center items-center gap-3 mt-8">
          <div className="h-px bg-white/40 flex-1 max-w-16" />
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-pulse">🧚‍♀️</span>
            <span className="text-3xl animate-bounce">🎂</span>
            <span className="text-2xl animate-pulse delay-500">🧚‍♀️</span>
          </div>
          <div className="h-px bg-white/40 flex-1 max-w-16" />
        </div>

        {/* Age and celebration details */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mx-4 border border-white/30 shadow-lg">
          <div className="flex justify-center items-center gap-3 text-2xl mb-2">
            <span>🎉</span>
            <span className="text-lg font-bold text-white">
              Let's Celebrate!
            </span>
            <span>🎊</span>
          </div>
          <p className="text-pink-100 text-sm">
            Arts & Crafts • Birthday Fun • Magical Memories
          </p>
        </div>
      </div>
    </header>
  );
}
