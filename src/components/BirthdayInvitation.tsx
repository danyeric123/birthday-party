import InvitationHeader from "./InvitationHeader";
import InvitationContent from "./InvitationContent";
import InvitationFooter from "./InvitationFooter";

export default function BirthdayInvitation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-cyan-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 container max-w-lg mx-auto px-4 py-8 lg:py-12">
        <div className="overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-lg">
          {/* Animated entrance effect */}
          <div className="animate-fade-in">
            <InvitationHeader />
            <InvitationContent />
            <InvitationFooter />
          </div>
        </div>

        {/* Floating action hint */}
        <div className="text-center mt-6 opacity-60">
          <p className="text-sm text-gray-500">Scroll up to RSVP 👆</p>
        </div>
      </div>
    </div>
  );
}
