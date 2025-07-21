import {
  Calendar,
  Clock,
  MapPin,
  Palette,
  Car,
  Sparkles,
  Heart,
} from "lucide-react";
import AddToCalendar from "./AddToCalendar";
import RSVPForm from "./RSVPForm";
import { EVENT_CONFIG } from "../config/eventConfig";

export default function InvitationContent() {
  return (
    <main className="px-6 py-8 gradient-soft-magic space-y-8">
      {/* Hero Section with magical enhancement */}
      <div className="text-center space-y-6">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-3xl animate-bounce">🌟</span>
          <p className="text-lg text-gray-700 font-medium">
            Join us for a magical celebration for
          </p>
          <span className="text-3xl animate-bounce delay-300">🌟</span>
        </div>
        <h3 className="font-display text-5xl lg:text-6xl rainbow-text leading-tight animate-float-gentle">
          {EVENT_CONFIG.guest.name}!
        </h3>
        <div className="flex justify-center items-center gap-2 text-2xl">
          <span className="animate-pulse">🦄</span>
          <span className="animate-pulse delay-200">🌈</span>
          <span className="animate-pulse delay-400">💖</span>
          <span className="animate-pulse delay-600">✨</span>
        </div>
      </div>

      {/* Enhanced Event Details Cards with rainbow theme */}
      <div className="grid gap-6 max-w-lg mx-auto">
        {/* Date Card - Pink Rainbow */}
        <div className="card-magical bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl shadow-lg p-6 border-l-4 border-pink-400 magical-glow">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-pink-100 to-rose-200 p-4 rounded-2xl shadow-inner">
                <Calendar className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-lg">🗓️</span>
                <h4 className="font-bold text-gray-800 text-lg">Date</h4>
                <span className="text-lg">🗓️</span>
              </div>
              <p className="text-pink-600 font-bold text-lg">
                {EVENT_CONFIG.event.date.readable}
              </p>
            </div>
          </div>
        </div>

        {/* Time Card - Purple Rainbow */}
        <div className="card-magical bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl shadow-lg p-6 border-l-4 border-purple-400 magical-glow">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-100 to-violet-200 p-4 rounded-2xl shadow-inner">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-lg">⏰</span>
                <h4 className="font-bold text-gray-800 text-lg">Time</h4>
                <span className="text-lg">⏰</span>
              </div>
              <p className="text-purple-600 font-bold text-lg">
                {EVENT_CONFIG.event.time.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Location Card - Cyan Rainbow */}
        <div className="card-magical bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl shadow-lg p-6 border-l-4 border-cyan-400 magical-glow">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-200 p-4 rounded-2xl shadow-inner">
                <MapPin className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-lg">📍</span>
                <h4 className="font-bold text-gray-800 text-lg">Location</h4>
                <span className="text-lg">🏠</span>
              </div>
              <p className="text-cyan-600 font-bold text-lg">
                {EVENT_CONFIG.venue.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {EVENT_CONFIG.venue.address.full}
              </p>
              <a
                href={EVENT_CONFIG.venue.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all btn-hover-lift focus-magical"
              >
                🗺️ View on Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Activities Card - Rainbow Gradient */}
        <div className="card-magical bg-gradient-to-br from-yellow-50 via-green-50 to-emerald-100 rounded-2xl shadow-lg p-6 border-l-4 border-yellow-400 magical-glow">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-yellow-100 to-emerald-200 p-4 rounded-2xl shadow-inner">
                <Palette className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-2 mb-3">
                <span className="text-lg">🎨</span>
                <h4 className="font-bold text-gray-800 text-lg">
                  Magical Activities
                </h4>
                <span className="text-lg">✨</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {EVENT_CONFIG.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-700 bg-gradient-to-r from-white to-gray-50 px-3 py-3 rounded-xl text-center shadow-inner border font-medium hover:scale-105 transition-transform"
                  >
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Parking Info - Enhanced with magical styling */}
        <div className="card-magical bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-indigo-200 magical-glow">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-200 p-4 rounded-2xl shadow-inner">
                <Car className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-lg">🚗</span>
                <h4 className="font-bold text-gray-800 text-lg">Parking</h4>
                <span className="text-lg">🅿️</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                {EVENT_CONFIG.venue.parking}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto px-6">
        <RSVPForm />
        <AddToCalendar className="w-auto" />
      </div>

      {/* Enhanced Party Closing Message */}
      <div className="text-center gradient-magical-card rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-pink-200 magical-glow">
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-2 text-4xl">
            <span className="animate-bounce">🦄</span>
            <span className="animate-bounce delay-200">🌈</span>
            <span className="animate-bounce delay-400">🎂</span>
          </div>
          <h4 className="font-bold text-gray-800 text-xl rainbow-text">
            Can't Wait to Celebrate!
          </h4>
          <p className="text-gray-700 leading-relaxed font-medium">
            We're so excited to party with Tiferet and can't wait to see all her
            friends there! It's going to be an amazing day full of crafts, cake,
            and magical birthday fun!
          </p>
          <div className="flex justify-center items-center gap-2 text-3xl">
            <span className="animate-pulse">✨</span>
            <Heart className="h-6 w-6 text-pink-500 animate-pulse delay-300" />
            <span className="animate-pulse delay-600">💖</span>
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse delay-900" />
            <span className="animate-pulse delay-1200">🧚‍♀️</span>
          </div>
        </div>
      </div>
    </main>
  );
}
