import AddToCalendar from './AddToCalendar'
import RSVPForm from './RSVPForm'

export default function InvitationContent() {
  // Event details for calendar
  const eventDetails = {
    title: "Tiferet Nagarpowers' Birthday Party at Cool Crafts",
    description: "Join us for a fun-filled birthday celebration for Tiferet Nagarpowers! Activities, crafts, and birthday fun at Cool Crafts of Long Island. Address: 3443 Merrick Rd, Wantagh, NY 11793. Parking available in front and rear of building.",
    start: "2025-08-10T14:00:00", // 2 PM on August 10th, 2025
    end: "2025-08-10T17:00:00",   // 5 PM on August 10th, 2025
    location: "Cool Crafts of Long Island, 3443 Merrick Rd, Wantagh, NY 11793",
    url: "https://www.coolcraftslongisland.com"
  }

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 bg-amber-50">
      <div className="text-center">
        <p className="text-base sm:text-lg text-gray-600">Join us for a fun-filled celebration for</p>
        <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-purple-600 my-3 sm:my-4 leading-tight">
          Tiferet Nagarpowers!
        </h3>
      </div>

      <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-base sm:text-lg">
        <div className="flex items-start">
          <span className="text-xl sm:text-2xl mr-3 sm:mr-4 mt-1">🗓️</span>
          <div className="flex-1">
            <p className="font-bold text-gray-800">Date</p>
            <p className="text-purple-700 mb-2">Sunday, August 10th</p>
            <AddToCalendar 
              event={eventDetails}
              className="inline-block"
            />
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-xl sm:text-2xl mr-3 sm:mr-4">⏰</span>
          <div>
            <p className="font-bold text-gray-800">Time</p>
            <p className="text-purple-700">2:00 PM - 5:00 PM</p>
          </div>
        </div>

        <div className="flex items-start">
          <span className="text-xl sm:text-2xl mr-3 sm:mr-4 mt-1">📍</span>
          <div>
            <p className="font-bold text-gray-800">Location</p>
            <p className="text-purple-700">Cool Crafts of Long Island</p>
            <p className="text-sm text-gray-600">3443 Merrick Rd, Wantagh, NY 11793</p>
          </div>
        </div>

        <div className="flex items-start">
          <span className="text-xl sm:text-2xl mr-3 sm:mr-4 mt-1">🎨</span>
          <div>
            <p className="font-bold text-gray-800">Activities</p>
            <p className="text-purple-700">Arts & Crafts, Birthday Fun, and More!</p>
          </div>
        </div>

        <div className="flex items-start">
          <span className="text-xl sm:text-2xl mr-3 sm:mr-4 mt-1">🅿️</span>
          <div>
            <p className="font-bold text-gray-800">Parking</p>
            <p className="text-purple-700">Available in front and rear of building</p>
          </div>
        </div>
      </div>

      {/* RSVP Section */}
      <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-white rounded-xl shadow-md border-2 border-pink-200">
        <div className="text-center">
          <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            🎉 Please RSVP by August 3rd
          </h4>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Help us plan the perfect party! Let us know if you can join the celebration.
          </p>
          <RSVPForm />
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-sm text-gray-500">
          Questions? Visit{' '}
          <a 
            href="https://www.coolcraftslongisland.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 underline"
          >
            www.coolcraftslongisland.com
          </a>
          {' '}or call (516) 735-2007
        </p>
      </div>
    </main>
  )
}
