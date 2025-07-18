import { Sparkles } from "lucide-react";
import { EVENT_CONFIG } from "../config/eventConfig";

export default function InvitationHeader() {
  return (
    <header className="relative gradient-party text-white px-6 py-8 text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-white rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Decorative icons */}
        <div className="flex justify-center items-center gap-2 text-4xl mb-4">
          <span className="animate-bounce">🎨</span>
          <Sparkles className="h-8 w-8 text-white/80 animate-pulse" />
          <span className="animate-bounce delay-100">✨</span>
          <Sparkles className="h-6 w-6 text-white/60 animate-pulse delay-500" />
          <span className="animate-bounce delay-200">🌀</span>
          <span className="animate-bounce delay-300">⭐</span>
          <span className="animate-bounce delay-400">🎉</span>
        </div>

        {/* Main heading */}
        <div className="space-y-3">
          <h1 className="font-display text-4xl lg:text-5xl text-pink-400 tracking-wider leading-tight">
            You're Invited to a Party
          </h1>
          <h2 className="text-2xl font-display text-cyan-300">
            at {EVENT_CONFIG.venue.shortName}!
          </h2>
          <p className="text-gray-300 text-sm">
            {EVENT_CONFIG.venue.contact.website}
          </p>
        </div>

        {/* Decorative border */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <div className="h-px bg-white/30 flex-1 max-w-16" />
          <span className="text-2xl">🎂</span>
          <div className="h-px bg-white/30 flex-1 max-w-16" />
        </div>
      </div>
    </header>
  );
}
