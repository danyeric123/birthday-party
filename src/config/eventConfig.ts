import { format, formatISO } from "date-fns";
import { fromZonedTime, format as formatTz } from "date-fns-tz";

// Eastern Time Zone
const TIMEZONE = "America/New_York";

// Single source of truth for event timing
const EVENT_START_DATE = new Date("2025-08-10T15:00:00"); // 3:00 PM in local time
const EVENT_END_DATE = new Date("2025-08-10T16:30:00"); // 4:30 PM in local time

// Convert to Eastern Time (handles DST automatically)
const EVENT_START_ET = fromZonedTime(EVENT_START_DATE, TIMEZONE);
const EVENT_END_ET = fromZonedTime(EVENT_END_DATE, TIMEZONE);

// RSVP deadline
const RSVP_DEADLINE_DATE = new Date("2025-08-03T23:59:59");
const RSVP_DEADLINE_ET = fromZonedTime(RSVP_DEADLINE_DATE, TIMEZONE);

// Date formatting utility functions
const formatEventDate = {
  // ISO formats for calendar APIs
  startISO: () => formatISO(EVENT_START_ET),
  endISO: () => formatISO(EVENT_END_ET),
  dateISO: () => format(EVENT_START_ET, "yyyy-MM-dd"),

  // Human readable formats
  fullDate: () =>
    formatTz(EVENT_START_ET, "EEEE, MMMM do, yyyy", { timeZone: TIMEZONE }),
  shortDate: () =>
    formatTz(EVENT_START_ET, "EEEE, MMMM do", { timeZone: TIMEZONE }),

  // Time formats
  startTime: () => formatTz(EVENT_START_ET, "h:mm a", { timeZone: TIMEZONE }),
  endTime: () => formatTz(EVENT_END_ET, "h:mm a", { timeZone: TIMEZONE }),
  timeRange: () =>
    `${formatEventDate.startTime()} - ${formatEventDate.endTime()}`,

  // 24-hour time formats for calendar APIs
  startTime24: () => formatTz(EVENT_START_ET, "HH:mm", { timeZone: TIMEZONE }),
  endTime24: () => formatTz(EVENT_END_ET, "HH:mm", { timeZone: TIMEZONE }),

  // Numeric values
  year: () =>
    parseInt(formatTz(EVENT_START_ET, "yyyy", { timeZone: TIMEZONE })),
  month: () => parseInt(formatTz(EVENT_START_ET, "M", { timeZone: TIMEZONE })),
  day: () => parseInt(formatTz(EVENT_START_ET, "d", { timeZone: TIMEZONE })),

  // RSVP deadline
  rsvpDeadlineISO: () => formatISO(RSVP_DEADLINE_ET),
  rsvpDeadline: () =>
    formatTz(RSVP_DEADLINE_ET, "MMMM do, yyyy", { timeZone: TIMEZONE }),
};

// Centralized event configuration with computed properties
export const EVENT_CONFIG = {
  // Guest of honor
  guest: {
    name: "Tiferet Nagarpowers",
    firstName: "Tiferet",
  },

  // Event details - all computed from single source of truth
  event: {
    title: "Tiferet Nagarpowers' Birthday Party",
    fullTitle: "Tiferet Nagarpowers' Birthday Party at Cool Crafts",
    timezone: TIMEZONE,

    // All date/time properties are computed
    get date() {
      return {
        iso: formatEventDate.dateISO(),
        readable: formatEventDate.fullDate(),
        display: formatEventDate.shortDate(),
        year: formatEventDate.year(),
        month: formatEventDate.month(),
        day: formatEventDate.day(),
      };
    },

    get time() {
      return {
        start: {
          iso: formatEventDate.startISO(),
          display: formatEventDate.startTime(),
          time24: formatEventDate.startTime24(),
        },
        end: {
          iso: formatEventDate.endISO(),
          display: formatEventDate.endTime(),
          time24: formatEventDate.endTime24(),
        },
        duration: formatEventDate.timeRange(),
        durationHours: 3, // Static since it's always 3 hours
      };
    },

    description:
      "Join us for a fun-filled birthday celebration for Tiferet Nagarpowers! Kids will enjoy plaster craft painting, decorating banks & cork boards, and birthday fun at Cool Crafts of Long Island.",
  },

  // Venue information
  venue: {
    name: "Cool Crafts of Long Island",
    shortName: "Cool Crafts",
    businessName: "COOL CRAFTS of Long Island, Inc.",
    address: {
      street: "3443 Merrick Rd",
      city: "Wantagh",
      state: "NY",
      zip: "11793",
      full: "3443 Merrick Rd, Wantagh, NY 11793",
    },
    contact: {
      phone: "(516) 735-2007",
      phoneRaw: "15167352007",
      phoneLink: "tel:+15167352007",
      website: "www.coolcraftslongisland.com",
      websiteUrl: "https://www.coolcraftslongisland.com",
    },
    location: {
      googleMapsUrl:
        "https://maps.google.com/?q=3443+Merrick+Rd,+Wantagh,+NY+11793",
      fullAddress:
        "Cool Crafts of Long Island, 3443 Merrick Rd, Wantagh, NY 11793",
    },
    parking: "Parking available in the front and rear of building",
  },

  // RSVP details - computed deadline
  get rsvp() {
    return {
      deadline: {
        iso: formatEventDate.rsvpDeadlineISO(),
        readable: formatEventDate.rsvpDeadline(),
      },
      maxGuests: 8,
    };
  },

  // Activities and other details - based on Cool Crafts of Long Island offerings
  activities: [
    "🎨 Plaster Craft Painting",
    "🏦 Paint Banks & Mini Lockers",
    "📋 Cork Board Decorating",
    "🎂 Birthday Celebration & Cake",
  ],

  // Calendar event data - computed from base dates
  get calendar() {
    return {
      title: "Tiferet Nagarpowers' Birthday Party at Cool Crafts",
      description:
        "Join us for a fun-filled birthday celebration for Tiferet Nagarpowers! Kids will enjoy plaster craft painting, decorating banks & cork boards, and birthday fun at Cool Crafts of Long Island. Address: 3443 Merrick Rd, Wantagh, NY 11793. Parking available in front and rear of building.",
      location:
        "Cool Crafts of Long Island, 3443 Merrick Rd, Wantagh, NY 11793",
      startISO: formatEventDate.startISO(),
      endISO: formatEventDate.endISO(),
    };
  },

  // Email template data
  get email() {
    return {
      subject: "RSVP: Birthday Party for Tiferet Nagarpowers",
      eventName: "Tiferet Nagarpowers' Birthday Party",
    };
  },
} as const;

// Helper functions for common formatting
export const formatEventTitle = (includeVenue = false) =>
  includeVenue ? EVENT_CONFIG.event.fullTitle : EVENT_CONFIG.event.title;

export const formatDateTime = () =>
  `${EVENT_CONFIG.event.date.readable} (${EVENT_CONFIG.event.time.duration})`;

export const formatAddress = (includeVenueName = true) =>
  includeVenueName
    ? EVENT_CONFIG.venue.location.fullAddress
    : EVENT_CONFIG.venue.address.full;

// Utility function to get event dates in different formats
export const getEventDates = () => ({
  startDate: EVENT_START_ET,
  endDate: EVENT_END_ET,
  rsvpDeadline: RSVP_DEADLINE_ET,
  timezone: TIMEZONE,
});

// Utility function for custom date formatting
export const formatEventDateCustom = (formatStr: string, useEndDate = false) =>
  formatTz(useEndDate ? EVENT_END_ET : EVENT_START_ET, formatStr, {
    timeZone: TIMEZONE,
  });
