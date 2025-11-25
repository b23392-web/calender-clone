# calender-clone
cloning google calender
📅 Google Calendar Clone — Modern Scheduling App

A fully interactive, browser-based calendar application inspired by Google Calendar, built using React, TypeScript, Tailwind CSS, Supabase, and modern UI libraries.
The app offers an intuitive layout with month/week/day views, event management features, and real-time data syncing.

✨ Highlights
📆 Calendar Views

Month View — clean grid layout showing all events at a glance

Week View — time-slot grid with hour-based divisions

Day View — focused 24-hour schedule

Quick navigation between dates and views

Smooth transitions & consistent date selection

📝 Event Management

Create, edit, and delete events via modal

Set:

Title, optional description

Start/end time

All-day toggle

Color labels

Location

Timezone

Events auto-refresh after any change

Handles overlapping events with stacked layouts

🎨 UI/UX Experience

Interface inspired by the Google Calendar visual language

shadcn/ui + Tailwind CSS used for component styling and form elements

Minimalistic, responsive layout for desktop and mobile

Highlight indicators for today's date

Color-coded events

Thoughtful hover states and micro-animations

🧱 Tech Stack
Frontend

React 18 + TypeScript

Vite (fast dev tooling)

Tailwind CSS

shadcn/ui

date-fns for date handling

@dnd-kit for drag & drop (if enabled)

React Router for navigation

TanStack Query for server state fetching

Backend

Supabase (PostgreSQL + Auth + RLS)

Real-time subscriptions for event updates

Secure authentication using email/password

🗄️ Database Schema
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  all_day BOOLEAN DEFAULT false,
  color TEXT DEFAULT '#4285f4',
  location TEXT,
  recurrence_rule TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


Row Level Security ensures each user only accesses their own events.

🚀 Getting Started
Prerequisites

Node.js 18+

Git

Supabase Project (with the schema above)

Installation
git clone <REPO_URL>
cd calendar-app
npm install

Environment Variables

Create .env:

VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key

Run Development Server
npm run dev


Go to: http://localhost:5173

🗂️ Project Structure
src/
├── components/
│   ├── calendar/
│   │   ├── CalendarHeader.tsx
│   │   ├── MonthView.tsx
│   │   ├── WeekView.tsx
│   │   ├── DayView.tsx
│   │   └── EventModal.tsx
│   └── ui/               # shadcn components
├── pages/
│   ├── Auth.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── hooks/
├── lib/
└── App.tsx

🎨 Design & UX Inspiration (Requested)

Your UI/UX draws from three main sources:

1. Google Calendar

Grid layouts

Colors

Top navigation

Clean visual hierarchy

2. shadcn/ui

Dialogs

Form inputs

Buttons

Transitions

3. Tailwind CSS

Utility classes for spacing, colors, responsiveness

Smooth hover & focus states

Custom design tokens

This combination gives the app a polished, platform-grade experience without copying any single tool directly.

🔐 Security

Supabase Auth secures all endpoints

Row Level Security ensures:

Users can only READ their own events

Users can only INSERT events with their own user_id

UPDATE/DELETE restricted to owner

🧠 Behind the Scenes (Event Logic)
Event Creation

Click any slot → pre-filled modal → validate → store → UI refresh

Editing

Open the modal with existing details

Save → updated in Supabase → instantly reflected

Overlapping Events

Stacked visually

Width is dynamically adjusted

All-Day Events

Rendered above time slots

Ignore hourly boundaries

🔧 Scripts

npm run dev — development mode

npm run build — production build

npm run preview — preview build

npm run lint — ESLint checks

🚧 Future Enhancements

Calendar sharing

Push/email reminders

ICS import/export

Themes + dark mode

Advanced recurring events

Drag-to-resize events

Offline caching & PWA mode

🤝 Contributing

Fork repo

Create feature branch

Commit changes

Submit PR

📄 License

This project uses open-source technologies; you may adapt or extend as needed.

🙌 Acknowledgements

UI inspiration from Google Calendar

Components from shadcn/ui

Icons from Lucide

Backend powered by Supabase
