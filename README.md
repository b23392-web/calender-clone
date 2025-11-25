# Google Calendar Clone – Web Application

A fully functional calendar and scheduling application inspired by Google Calendar, built with React, TypeScript, Tailwind CSS, and Supabase. The application supports multi-view calendar navigation, secure authentication, real-time updates, and a clean UI/UX modeled after modern calendar interfaces.

---

## 1. Overview

This project implements essential calendar features such as month/week/day views, event creation and editing, color categorization, all-day events, and timezone handling.

The UI/UX draws inspiration from:
- Google Calendar’s layout and user flows  
- shadcn/ui for modals, dialogs, and component styling  
- Tailwind CSS for utility-driven design consistency

---

## 2. Features

### Calendar Views
- Monthly, weekly, and daily views  
- Continuous navigation between dates  
- “Today” quick jump  
- Responsive design for large and small screens  

### Event Management
- Create, edit, and delete events  
- Includes title, description, start/end time, all-day toggle, color, location, and timezone  
- Supports overlapping events with visual stacking  
- Database prepared for recurring events (RRULE)  
- Automatic UI refresh after modifications  

### Authentication & Security
- Email/password authentication with Supabase Auth  
- Secure session management  
- Row Level Security ensures users only read/write their own events  

---

## 3. Setup and Run Instructions

### Prerequisites
- Node.js 18+  
- Git  
- Supabase project configured  

### Installation

```bash
git clone <REPOSITORY_URL>
cd calendar-app
npm install


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

Environment Variables
Create .env:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key


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

Run Development Server
npm run dev


Go to: http://localhost:5173


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
Conclusion

This project delivers a complete and secure calendar application modeled after Google Calendar. Its architecture emphasizes modularity, responsiveness, and scalability. With planned future enhancements, it can serve as the foundation for a production-level scheduling system.
