import { MapPin } from "lucide-react";
import { EVENT_CONFIG } from "../config/eventConfig";

export default function InvitationFooter() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 text-white px-6 py-8 text-center space-y-6">
      {/* Unicorn Magic Header */}
      <div>
        <div className="text-4xl mb-2">🦄✨</div>
        <h4 className="text-2xl font-bold text-pink-300">Party Location</h4>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <MapPin className="h-5 w-5 text-pink-300 flex-shrink-0" />
          <div className="text-slate-200">
            <p className="font-medium">{EVENT_CONFIG.venue.address.street}</p>
            <p className="font-medium">
              {EVENT_CONFIG.venue.address.city},{" "}
              {EVENT_CONFIG.venue.address.state}{" "}
              {EVENT_CONFIG.venue.address.zip}
            </p>
            <a
              href={EVENT_CONFIG.venue.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-sm text-pink-300 hover:text-pink-200 transition-colors font-medium"
            >
              📍 View on Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Parking Notice */}
      <div className="pt-4 border-t border-purple-700">
        <p className="text-xs text-gray-300">{EVENT_CONFIG.venue.parking}</p>
      </div>
    </footer>
  );
}
