import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface AddToCalendarProps {
  event: {
    title: string;
    description: string;
    start: string; // ISO date string
    end: string; // ISO date string
    location?: string;
    url?: string;
  };
  className?: string;
}

const calendarOptions = [
  { name: "Google Calendar", icon: "📅", generator: google },
  { name: "Outlook", icon: "📧", generator: outlook },
  { name: "Office 365", icon: "🏢", generator: office365 },
  { name: "Yahoo Calendar", icon: "📌", generator: yahoo },
  { name: "Apple Calendar (.ics)", icon: "🍎", generator: ics },
];

export default function AddToCalendar({
  event,
  className,
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCalendarClick = (generator: any) => {
    try {
      const calendarUrl = generator(event);

      if (generator === ics) {
        // For .ics files, create a blob and download
        const element = document.createElement("a");
        const file = new Blob([calendarUrl], { type: "text/calendar" });
        element.href = URL.createObjectURL(file);
        element.download = "birthday-party.ics";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        // For other calendars, open in new tab
        window.open(calendarUrl, "_blank", "noopener,noreferrer");
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add to calendar:", error);
    }
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="gap-2 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300"
      >
        <CalendarDays className="h-4 w-4" />
        Add to Calendar
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </Button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
            {calendarOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleCalendarClick(option.generator)}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
              >
                <span className="text-lg">{option.icon}</span>
                <span className="font-medium text-gray-700">{option.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
