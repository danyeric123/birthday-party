# 🎉 Birthday Party Invitation Website

A beautiful, responsive birthday party invitation website built for Tiferet Nagarpowers' celebration at Cool Crafts of Long Island.

## 🎨 Features

- **Interactive RSVP Form** - Guests can RSVP with dietary requirements and special messages
- **Calendar Integration** - Add event to Google Calendar, Outlook, Apple Calendar, and more
- **Responsive Design** - Mobile-first design that looks great on all devices
- **Email Notifications** - Automatic email confirmation using EmailJS
- **Modern UI/UX** - Clean, festive design with smooth animations and transitions

## 📅 Event Details

- **Who**: Tiferet Nagarpowers' Birthday Party
- **When**: Sunday, August 10th, 2025 (2:00 PM - 5:00 PM)
- **Where**: Cool Crafts of Long Island, 3443 Merrick Rd, Wantagh, NY 11793
- **Activities**: Arts & Crafts, Birthday Fun, and More!
- **RSVP Deadline**: August 3rd, 2025

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Radix UI primitives
- **Forms**: React Hook Form + Zod validation
- **Email Service**: EmailJS
- **Calendar Integration**: calendar-link library
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd birthday-party
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your EmailJS configuration:
```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_RECIPIENT_EMAIL=your_email@example.com
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📧 EmailJS Setup

This project uses EmailJS for sending RSVP confirmations. Check `EMAILJS_SETUP.md` for detailed setup instructions.

## 🏗️ Build & Deploy

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Deploy to Netlify

This project is optimized for Netlify deployment with serverless functions. Simply connect your repository to Netlify and it will automatically deploy.

## 📱 Responsive Design

The invitation is designed mobile-first with breakpoints for:
- Mobile: 320px - 640px
- Tablet: 640px - 1024px  
- Desktop: 1024px+

## 🎯 Project Structure

```
src/
├── components/
│   ├── BirthdayInvitation.tsx    # Main invitation layout
│   ├── InvitationHeader.tsx      # Header with title and decorations
│   ├── InvitationContent.tsx     # Event details and RSVP form
│   ├── InvitationFooter.tsx      # Contact information
│   ├── RSVPForm.tsx              # Interactive RSVP form with validation
│   ├── AddToCalendar.tsx         # Calendar integration dropdown
│   └── ui/                       # Reusable UI components
├── lib/
│   └── utils.ts                  # Utility functions
└── styles/                       # CSS and styling
```

## 🤝 Contributing

This is a personal event invitation website. If you'd like to use it as a template for your own event, feel free to fork and customize!

## 📄 License

This project is for personal use. The template structure can be used for similar event invitation websites.

---

**Contact**: For any questions about the event, visit [Cool Crafts of Long Island](https://www.coolcraftslongisland.com) or call (516) 735-2007.
