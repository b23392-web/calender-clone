# Calendar App - Google Calendar Clone

A high-fidelity Google Calendar clone built with React, TypeScript, Tailwind CSS, and Lovable Cloud (Supabase). Features drag-and-drop event management, multiple calendar views, and seamless real-time synchronization.

![Calendar App](https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200)

## 🌟 Features

### Calendar Views
- **Monthly View**: Grid-based calendar showing all events for the month
- **Weekly View**: Time-slotted view with hourly breakdown for the week
- **Daily View**: Detailed day schedule with 24-hour time slots
- Smooth transitions between views with persistent date selection

### Event Management
- **Create Events**: Click any empty time slot or date to create new events
- **Edit Events**: Click existing events to modify details
- **Delete Events**: Remove events directly from the event modal
- **Event Details**:
  - Title and description
  - Start and end times
  - All-day event toggle
  - Color categorization (7 color options)
  - Location field
  - Timezone support

### User Experience
- Clean, minimalist Google Calendar-inspired UI
- Responsive design for desktop and mobile
- Today button for quick navigation
- Previous/Next navigation controls
- Visual indicators for today's date
- Color-coded events for easy categorization
- Hover states and smooth animations

### Authentication & Security
- Email/password authentication
- Row Level Security (RLS) policies
- Users can only view and manage their own events
- Secure session management
- Auto-confirm email for testing

## 🏗️ Architecture

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library
- **date-fns** - Date manipulation and formatting
- **@dnd-kit** - Drag and drop functionality
- **React Router** - Client-side routing
- **TanStack Query** - Server state management

### Backend Stack
- **Lovable Cloud** (Supabase) - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Database-level access control
- **Supabase Auth** - User authentication

### Database Schema

```sql
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  all_day BOOLEAN DEFAULT false,
  color TEXT DEFAULT '#4285f4',
  location TEXT,
  recurrence_rule TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS Policies ensure users can only access their own events
-- Automatic timestamp updates via triggers
-- Indexed for fast date-range queries
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd calendar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The project uses Lovable Cloud, which auto-configures the backend. No manual environment setup needed!

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

### First Time Use

1. Click "Sign Up" to create an account
2. Enter your email and password (minimum 6 characters)
3. Sign in with your credentials
4. Start creating events!

## 📁 Project Structure

```
calendar-app/
├── src/
│   ├── components/
│   │   ├── calendar/
│   │   │   ├── CalendarHeader.tsx    # Navigation and view controls
│   │   │   ├── MonthView.tsx         # Monthly grid view
│   │   │   ├── WeekView.tsx          # Weekly time-slot view
│   │   │   ├── DayView.tsx           # Daily schedule view
│   │   │   └── EventModal.tsx        # Create/edit event dialog
│   │   └── ui/                       # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx                 # Main calendar page
│   │   ├── Auth.tsx                  # Authentication page
│   │   └── NotFound.tsx              # 404 page
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts             # Supabase client (auto-generated)
│   │       └── types.ts              # Database types (auto-generated)
│   ├── hooks/
│   │   └── use-toast.ts              # Toast notification hook
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   ├── index.css                     # Global styles & design system
│   └── App.tsx                       # App root & routing
├── public/                           # Static assets
├── supabase/                         # Backend configuration
│   └── migrations/                   # Database migrations
└── package.json                      # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `hsl(217, 89%, 51%)` - Main brand color (Google Calendar blue)
- **Event Colors**:
  - Blue: `#4285f4`
  - Red: `#ea4335`
  - Green: `#34a853`
  - Purple: `#9334ea`
  - Orange: `#f59e0b`
  - Teal: `#14b8a6`
  - Gray: `#6b7280`

### Typography
- System font stack for optimal readability
- Clear hierarchy with semantic headings
- Consistent sizing across components

### Layout
- Grid-based calendar views
- Responsive breakpoints
- Smooth transitions and hover states

## 🔐 Security Features

### Row Level Security (RLS)
All database operations are protected by RLS policies:
- Users can only SELECT their own events
- Users can only INSERT events with their own user_id
- Users can only UPDATE their own events
- Users can only DELETE their own events

### Authentication
- Secure password hashing
- Session management
- Protected routes
- Email confirmation (auto-confirmed in development)

## 🛠️ Technology Choices

### Why React + TypeScript?
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Excellent tooling and IDE support
- **Ecosystem**: Rich library ecosystem
- **Performance**: Virtual DOM for efficient updates

### Why Supabase ?
- **Real-time**: Built-in real-time subscriptions
- **Authentication**: Drop-in auth solution
- **Database**: PostgreSQL with RLS
- **Scalability**: Handles millions of requests
- **Developer Experience**: Simple SDK, no backend code needed

### Why Tailwind CSS?
- **Utility-First**: Rapid UI development
- **Consistency**: Design system tokens
- **Performance**: Purged unused CSS
- **Responsive**: Mobile-first approach

### Why date-fns?
- **Lightweight**: Tree-shakeable, only import what you need
- **Immutable**: Pure functions, no side effects
- **Timezone Support**: Robust timezone handling
- **Modern**: ES modules, TypeScript support

## Event Logic

### Event Creation
1. User clicks empty time slot or date
2. Modal opens with pre-filled start/end times
3. User enters event details
4. Event is saved to database
5. Calendar refreshes to show new event

### Event Editing
1. User clicks existing event
2. Modal opens with current event details
3. User modifies fields
4. Changes are saved to database
5. Calendar updates in real-time

### Conflict Handling
- Multiple events can exist in the same time slot
- Visual stacking shows overlapping events
- Color coding helps distinguish events

### All-Day Events
- Toggle to mark events as all-day
- Displayed at the top of day views
- No specific time required

### Recurring Events (Future Enhancement)
- Schema includes `recurrence_rule` field
- Ready for RRULE implementation
- Can support daily, weekly, monthly patterns

## 🚧 Future Improvements

### Drag and Drop
- Move events by dragging to new time slots
- Resize events by dragging edges
- Visual feedback during drag operation
  
### Event Reminders
- Email notifications before events
- Browser push notifications
- Customizable reminder times

### Calendar Sharing
- Share calendars with other users
- Public calendar URLs
- Permission levels (view/edit)

### Advanced Features
- Event search and filtering
- Category management
- Import/export ICS files
- Multiple calendar support
### Performance Optimizations
- Virtual scrolling for large event lists
- Lazy loading for different views
- Optimistic UI updates
- Offline support with service workers

### UI Enhancements
- Mini calendar in sidebar
- Keyboard shortcuts
- Dark mode
- Customizable themes
- Event templates
- Quick event creation

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

This project is open for contributions! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project open-source technologies.

## 🙏 Acknowledgments

- Design inspired by Google Calendar
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
