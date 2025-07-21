import InvitationHeader from "./InvitationHeader";
import InvitationContent from "./InvitationContent";
import InvitationFooter from "./InvitationFooter";

export default function BirthdayInvitation() {
  return (
    <div className="min-h-screen gradient-rainbow-magical relative overflow-hidden">
      {/* Magical floating rainbow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="rainbow-orb rainbow-orb-1" />
        <div className="rainbow-orb rainbow-orb-2" />
        <div className="rainbow-orb rainbow-orb-3" />

        {/* Additional magical sparkles */}
        <div className="sparkle-container">
          <div className="sparkle" style={{ top: "15%", left: "25%" }} />
          <div className="sparkle" style={{ top: "35%", right: "20%" }} />
          <div className="sparkle" style={{ bottom: "40%", left: "15%" }} />
          <div className="sparkle" style={{ top: "60%", right: "35%" }} />
          <div className="sparkle" style={{ bottom: "20%", right: "25%" }} />
        </div>

        {/* Dreamy background clouds */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-2xl animate-float-gentle" />
        <div
          className="absolute top-1/4 right-12 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl animate-float-gentle"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-xl animate-float-gentle"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 left-1/3 w-16 h-16 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full blur-lg animate-float-gentle"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Main content container with magical glass effect */}
      <div className="relative z-10 container max-w-lg mx-auto px-4 py-8 lg:py-12">
        <div className="overflow-hidden shadow-2xl border-0 glass magical-glow rounded-2xl">
          {/* Animated entrance effect */}
          <div className="animate-fade-in">
            <InvitationHeader />
            <InvitationContent />
            <InvitationFooter />
          </div>
        </div>

        {/* Magical floating action hint with unicorn */}
        <div className="text-center mt-8 animate-bounce-magical">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/30">
            <span
              className="text-2xl animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              🦄
            </span>
            <p className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Scroll up to RSVP for the magical party!
            </p>
            <span
              className="text-xl animate-bounce"
              style={{ animationDelay: "1s" }}
            >
              ✨
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
