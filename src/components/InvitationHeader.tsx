import { EVENT_CONFIG } from "../config/eventConfig";

export default function InvitationHeader() {
  return (
    <header className="relative gradient-unicorn-dream text-white px-6 pt-10 pb-12 text-center overflow-hidden">
      {/* Soft glow background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 left-1/4 w-40 h-40 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-pink-100/40 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <img
          src="/unicorn.png"
          alt=""
          width={128}
          height={128}
          className="h-28 w-28 rounded-3xl shadow-xl ring-4 ring-white/60 animate-float-gentle"
        />

        <h1 className="space-y-2">
          <span className="block text-sm font-semibold uppercase tracking-[0.25em] text-white/90">
            You're invited to
          </span>
          <span className="block font-display text-6xl leading-none tracking-wide drop-shadow-md">
            {EVENT_CONFIG.guest.firstName}'s
          </span>
          <span className="block font-display text-[1.7rem] uppercase leading-tight tracking-wide text-amber-100 drop-shadow">
            Unicorn Birthday Party
          </span>
        </h1>
      </div>
    </header>
  );
}
