import { EVENT_CONFIG } from "../config/eventConfig";

export default function InvitationFooter() {
  return (
    <footer className="bg-gradient-to-br from-violet-900 via-purple-900 to-pink-900 text-white px-6 py-10 text-center space-y-3">
      <div className="text-4xl" aria-hidden="true">
        🦄
      </div>
      <p className="font-display text-2xl uppercase tracking-wide text-pink-200">
        Can't wait to celebrate with you!
      </p>
      <p className="text-sm text-violet-100">
        Love, {EVENT_CONFIG.guest.firstName} & family 💖
      </p>
      <p className="pt-4 text-xs text-violet-200/80">
        Questions? Just reply to the message this invite came in.
      </p>
    </footer>
  );
}
