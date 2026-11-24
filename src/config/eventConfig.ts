import { format, formatISO } from "date-fns";
import { fromZonedTime, format as formatTz } from "date-fns-tz";

// Eastern Time Zone
const TIMEZONE = "America/New_York";

// Single source of truth for event timing
const EVENT_START_DATE = new Date("2026-11-29T14:30:00"); // 2:30 PM in local time
const EVENT_END_DATE = new Date("2026-11-29T16:00:00"); // 4:00 PM in local time

// Convert to Eastern Time (handles DST automatically)
const EVENT_START_ET = fromZonedTime(EVENT_START_DATE, TIMEZONE);
const EVENT_END_ET = fromZonedTime(EVENT_END_DATE, TIMEZONE);

// RSVP deadline
const RSVP_DEADLINE_DATE = new Date("2026-11-27T23:59:59");
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
  rsvpDeadlineDisplay: () =>
    formatTz(RSVP_DEADLINE_ET, "EEEE, MMMM do", { timeZone: TIMEZONE }),
  rsvpDeadlineShort: () =>
    formatTz(RSVP_DEADLINE_ET, "EEE, MMM d", { timeZone: TIMEZONE }),
};

// Centralized event configuration with computed properties
export const EVENT_CONFIG = {
  // Guest of honor
  guest: {
    name: "Rivkah Nagarpowers",
    firstName: "Rivkah",
  },

  // Event details - all computed from single source of truth
  event: {
    title: "Rivkah Nagarpowers' Birthday Party",
    fullTitle:
      "Rivkah Nagarpowers' Unicorn Birthday Party with Nail Painting, Face Painting, Movie & Snuggles",
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
        durationHours: 1.5, // Static since it's always 1.5 hours
      };
    },

    description:
      "Join us for a magical unicorn-themed birthday celebration for Rivkah Nagarpowers! We'll have nail painting, face painting, a fun movie, and lots of snuggles at our home.",
  },

  // Venue information
  venue: {
    name: "Rivkah's House",
    shortName: "Rivkah's House",
    businessName: "",
    address: {
      street: "1086 Lynn Pl Apt 6",
      city: "Woodmere",
      state: "NY",
      zip: "11598",
      full: "1086 Lynn Pl Apt 6, Woodmere, NY 11598",
    },
    contact: {
      phone: "",
      phoneRaw: "",
      phoneLink: "",
      website: "",
      websiteUrl: "",
    },
    location: {
      googleMapsUrl:
        "https://maps.google.com/?q=1086+Lynn+Pl+Apt+6,+Woodmere,+NY+11598",
      fullAddress: "1086 Lynn Pl Apt 6, Woodmere, NY 11598",
    },
    parking: "Street parking available",
  },

  // RSVP details - computed deadline
  get rsvp() {
    return {
      deadline: {
        iso: formatEventDate.rsvpDeadlineISO(),
        readable: formatEventDate.rsvpDeadline(),
        display: formatEventDate.rsvpDeadlineDisplay(),
        short: formatEventDate.rsvpDeadlineShort(),
      },
      maxGuests: 8,
    };
  },

  // Activities and other details - unicorn-themed party at home
  activities: [
    "🦄 Unicorn Magic",
    "💅 Nail Painting",
    "🎨 Face Painting",
    "🎬 Movie Time",
    "🤗 Snuggles & Fun",
    "🎂 Birthday Cake",
  ],

  // Calendar event data - computed from base dates
  get calendar() {
    return {
      title: "Rivkah Nagarpowers' Unicorn Birthday Party",
      description:
        "Join us for a magical unicorn-themed birthday celebration for Rivkah Nagarpowers! We'll have nail painting, face painting, a fun movie, and lots of snuggles. Address: 1086 Lynn Pl Apt 6, Woodmere, NY 11598. Street parking available.",
      location: "1086 Lynn Pl Apt 6, Woodmere, NY 11598",
      startISO: formatEventDate.startISO(),
      endISO: formatEventDate.endISO(),
    };
  },

  // Email template data
  get email() {
    return {
      subject: "RSVP: Unicorn Birthday Party for Rivkah Nagarpowers",
      eventName: "Rivkah Nagarpowers' Unicorn Birthday Party",
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
