import { Calendar, Clock, MapPin, Palette, Car } from "lucide-react";
import AddToCalendar from "./AddToCalendar";
import RSVPForm from "./RSVPForm";
import { EVENT_CONFIG } from "../config/eventConfig";

export default function InvitationContent() {
  return (
    <main className="px-6 py-8 bg-amber-50 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <p className="text-lg text-gray-700">
          Join us for a fun-filled celebration for
        </p>
        <h3 className="font-display text-5xl lg:text-6xl text-purple-600 leading-tight">
          {EVENT_CONFIG.guest.name}!
        </h3>
      </div>

      {/* Event Details Cards */}
      <div className="grid gap-6 max-w-lg mx-auto">
        {/* Date Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-400">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">Date</h4>
              <p className="text-pink-600 font-medium">
                {EVENT_CONFIG.event.date.readable}
              </p>
            </div>
          </div>
        </div>

        {/* Time Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-400">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-cyan-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">Time</h4>
              <p className="text-purple-600 font-medium">
                {EVENT_CONFIG.event.time.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-400">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">Location</h4>
              <p className="text-cyan-600 font-medium">
                {EVENT_CONFIG.venue.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {EVENT_CONFIG.venue.address.full}
              </p>
              <a
                href={EVENT_CONFIG.venue.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                📍 View on Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Activities Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Palette className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">Activities</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {EVENT_CONFIG.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg text-center"
                  >
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Parking Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">Parking</h4>
              <p className="text-sm text-gray-600 mt-1">
                {EVENT_CONFIG.venue.parking}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto px-6">
        <RSVPForm />
        <AddToCalendar />
      </div>

      {/* Party Closing Message */}
      <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-md p-6 max-w-md mx-auto border border-pink-200">
        <div className="space-y-3">
          <div className="text-4xl">🎉✨🎂</div>
          <h4 className="font-bold text-gray-800 text-lg">
            Can't Wait to Celebrate!
          </h4>
          <p className="text-gray-600 leading-relaxed">
            We're so excited to party with Tiferet and can't wait to see all her
            friends there! It's going to be an amazing day full of crafts, cake,
            and birthday fun!
          </p>
          <div className="text-2xl">🎨🌟🎁</div>
        </div>
      </div>
    </main>
  );
}
