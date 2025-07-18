import { AddToCalendarButton } from "add-to-calendar-button-react";
import { EVENT_CONFIG } from "../config/eventConfig";
import { cn } from "../lib/utils";
import { useEffect } from "react";

interface AddToCalendarProps {
  className?: string;
}

export default function AddToCalendar({ className }: AddToCalendarProps) {
  // Extract date and time parts from EVENT_CONFIG
  const eventDate = EVENT_CONFIG.event.date.iso; // YYYY-MM-DD format
  const startTime = EVENT_CONFIG.event.time.start.time24; // "15:00" format (24-hour)
  const endTime = EVENT_CONFIG.event.time.end.time24; // "16:30" format (24-hour)

  // Inject custom styles to match RSVP button theme
  useEffect(() => {
    const styleId = "atcb-custom-styles";

    // Remove existing styles if they exist
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new style element
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .atcb {
        /* Match RSVP button styling */
        background: white !important;
        color: #db2777 !important; /* pink-600 */
        border: 2px solid rgba(255, 255, 255, 0.2) !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        font-weight: 600 !important;
        font-size: 1.125rem !important; /* text-lg */
        padding: 0.75rem 2rem !important; /* py-3 px-8 */
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        min-height: 48px !important;
      }
      
      .atcb:hover {
        background: rgba(255, 255, 255, 0.9) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      }
      
      .atcb-icon {
        color: #db2777 !important; /* pink-600 */
        margin-right: 0.5rem !important;
      }
      
      .atcb-text {
        color: #db2777 !important; /* pink-600 */
      }
      
      /* Style the dropdown */
      .atcb-list {
        background: white !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
      }
      
      .atcb-list-item {
        color: #374151 !important; /* gray-700 */
        padding: 0.75rem 1rem !important;
      }
      
      .atcb-list-item:hover {
        background: #fdf2f8 !important; /* pink-50 */
        color: #db2777 !important; /* pink-600 */
      }
    `;

    document.head.appendChild(style);

    // Cleanup function
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <div className={cn("inline-block", className)}>
      <AddToCalendarButton
        name={EVENT_CONFIG.calendar.title}
        description={EVENT_CONFIG.calendar.description}
        startDate={eventDate}
        endDate={eventDate} // Same day event
        startTime={startTime}
        endTime={endTime}
        timeZone={EVENT_CONFIG.event.timezone}
        location={EVENT_CONFIG.calendar.location}
        options={[
          "Apple",
          "Google",
          "iCal",
          "Microsoft365",
          "Outlook.com",
          "Yahoo",
        ]}
        buttonStyle="round"
        lightMode="bodyScheme"
        size="3"
        listStyle="modal"
        trigger="click"
        hideIconButton={false}
        hideTextLabelButton={false}
        label="Add to Calendar"
      />
    </div>
  );
}
