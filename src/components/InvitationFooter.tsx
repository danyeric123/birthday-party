import { MapPin, Phone, Globe } from "lucide-react";
import { EVENT_CONFIG } from "../config/eventConfig";

export default function InvitationFooter() {
  return (
    <footer className="bg-gray-800 text-white px-6 py-8 text-center space-y-6">
      {/* Business Name */}
      <div>
        <h4 className="text-2xl font-bold text-cyan-300">
          {EVENT_CONFIG.venue.shortName}{" "}
          <span className="text-sm font-light text-white">
            of Long Island, Inc.
          </span>
        </h4>
      </div>

      {/* Contact Information Grid */}
      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-center justify-center gap-3">
          <MapPin className="h-5 w-5 text-cyan-300 flex-shrink-0" />
          <div className="text-slate-200">
            <p className="font-medium">{EVENT_CONFIG.venue.address.street}</p>
            <p className="font-medium">
              {EVENT_CONFIG.venue.address.city},{" "}
              {EVENT_CONFIG.venue.address.state}{" "}
              {EVENT_CONFIG.venue.address.zip}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-center gap-3">
          <Phone className="h-5 w-5 text-cyan-300 flex-shrink-0" />
          <a
            href={EVENT_CONFIG.venue.contact.phoneLink}
            className="text-slate-200 hover:text-white transition-colors font-medium"
          >
            {EVENT_CONFIG.venue.contact.phone}
          </a>
        </div>

        {/* Website */}
        <div className="flex items-center justify-center gap-3">
          <Globe className="h-5 w-5 text-cyan-300 flex-shrink-0" />
          <a
            href={EVENT_CONFIG.venue.contact.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-200 hover:text-white transition-colors font-medium"
          >
            {EVENT_CONFIG.venue.contact.website}
          </a>
        </div>
      </div>

      {/* Parking Notice */}
      <div className="pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">{EVENT_CONFIG.venue.parking}</p>
      </div>
    </footer>
  );
}
