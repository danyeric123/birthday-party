import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Calendar, Clock, MapPin, Sparkles, Car } from "lucide-react";
import AddToCalendar from "./AddToCalendar";
import { RSVPButton } from "./RSVPForm";
import { EVENT_CONFIG } from "../config/eventConfig";

const TONES = {
  pink: {
    card: "from-pink-50 to-white border-pink-200",
    chip: "bg-pink-100 text-pink-600",
  },
  lavender: {
    card: "from-violet-50 to-white border-violet-200",
    chip: "bg-violet-100 text-violet-600",
  },
  gold: {
    card: "from-amber-50 to-white border-amber-200",
    chip: "bg-amber-100 text-amber-600",
  },
} as const;

function DetailCard({
  icon: Icon,
  label,
  tone,
  children,
}: {
  icon: LucideIcon;
  label: string;
  tone: keyof typeof TONES;
  children: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`card-magical flex items-start gap-4 rounded-2xl border bg-gradient-to-br p-5 shadow-sm ${t.card}`}
    >
      <div className={`shrink-0 rounded-xl p-3 ${t.chip}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

export default function InvitationContent({ onRSVP }: { onRSVP: () => void }) {
  return (
    <main className="px-6 py-8 gradient-soft-magic space-y-8">
      <div className="grid gap-4 max-w-lg mx-auto">
        <DetailCard icon={Calendar} label="Date" tone="pink">
          <p className="text-lg font-bold text-gray-800">
            {EVENT_CONFIG.event.date.readable}
          </p>
        </DetailCard>

        <DetailCard icon={Clock} label="Time" tone="lavender">
          <p className="text-lg font-bold text-gray-800">
            {EVENT_CONFIG.event.time.duration}
          </p>
        </DetailCard>

        <DetailCard icon={MapPin} label="Location" tone="pink">
          <p className="text-lg font-bold text-gray-800">
            {EVENT_CONFIG.venue.name}
          </p>
          <p className="text-sm text-gray-600">
            {EVENT_CONFIG.venue.address.full}
          </p>
          <a
            href={EVENT_CONFIG.venue.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm font-medium rounded-full hover:from-pink-600 hover:to-violet-600 transition-all btn-hover-lift focus-magical"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Open in Google Maps
          </a>
        </DetailCard>

        <DetailCard icon={Car} label="Parking" tone="lavender">
          <p className="text-sm font-medium text-gray-700">
            {EVENT_CONFIG.venue.parking}
          </p>
        </DetailCard>

        <div className="card-magical rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-pink-50 to-violet-50 p-5 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-amber-500" aria-hidden="true" />
            <h2 className="font-display text-2xl uppercase tracking-wide text-violet-700">
              Unicorn Fun
            </h2>
            <Sparkles className="h-5 w-5 text-amber-500" aria-hidden="true" />
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {EVENT_CONFIG.activities.map((activity) => (
              <li
                key={activity}
                className="text-sm text-gray-700 bg-white/80 px-3 py-3 rounded-xl text-center border border-white font-medium shadow-sm"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RSVP */}
      <div id="rsvp" className="max-w-lg mx-auto text-center space-y-5 scroll-mt-24">
        <p className="text-gray-700 leading-relaxed">
          If you can, please let us know by{" "}
          <strong className="text-pink-700">
            {EVENT_CONFIG.rsvp.deadline.display}
          </strong>
          . It helps us plan the fun! 💌
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RSVPButton onClick={onRSVP} />
          <AddToCalendar className="w-auto" />
        </div>
      </div>
    </main>
  );
}
