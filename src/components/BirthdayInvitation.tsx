import { useState } from "react";
import InvitationHeader from "./InvitationHeader";
import InvitationContent from "./InvitationContent";
import InvitationFooter from "./InvitationFooter";
import RSVPForm from "./RSVPForm";
import StickyRSVP from "./StickyRSVP";

export default function BirthdayInvitation() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const openRSVP = () => setRsvpOpen(true);

  return (
    <div className="min-h-screen gradient-rainbow-magical relative overflow-hidden">
      {/* Floating orbs and sparkles */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="rainbow-orb rainbow-orb-1" />
        <div className="rainbow-orb rainbow-orb-2" />
        <div className="rainbow-orb rainbow-orb-3" />

        <div className="sparkle-container">
          <div className="sparkle" style={{ top: "15%", left: "25%" }} />
          <div className="sparkle" style={{ top: "35%", right: "20%" }} />
          <div className="sparkle" style={{ bottom: "40%", left: "15%" }} />
          <div className="sparkle" style={{ top: "60%", right: "35%" }} />
          <div className="sparkle" style={{ bottom: "20%", right: "25%" }} />
        </div>

        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-violet-200/30 rounded-full blur-2xl animate-float-gentle" />
        <div
          className="absolute top-1/4 right-12 w-24 h-24 bg-gradient-to-br from-violet-200/30 to-pink-100/30 rounded-full blur-xl animate-float-gentle"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-amber-100/30 to-pink-200/30 rounded-full blur-xl animate-float-gentle"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main card; bottom padding leaves room for the sticky RSVP bar */}
      <div className="relative z-10 container max-w-lg mx-auto px-4 pt-8 pb-32 lg:pt-12">
        <div className="overflow-hidden shadow-2xl border-0 glass magical-glow rounded-2xl">
          <div className="animate-fade-in">
            <InvitationHeader />
            <InvitationContent onRSVP={openRSVP} />
            <InvitationFooter />
          </div>
        </div>
      </div>

      <RSVPForm open={rsvpOpen} onOpenChange={setRsvpOpen} />
      <StickyRSVP onRSVP={openRSVP} hidden={rsvpOpen} />
    </div>
  );
}
