# calender-clone
cloning google calender
Google Calendar Clone (Full-Stack • High Fidelity)

A high-fidelity, full-stack clone of Google Calendar, built to mirror the real product’s look, feel, and behavior.
This project focuses on delivering smooth UI interactions, realistic calendar logic, and a clean API for managing events.

I built this to deepen my understanding of complex UI systems, time-based layouts, and real-world frontend↔backend syncing.

🔥 Features
🖥️ Frontend

High-fidelity recreation of Google Calendar’s UI

Month, Week, and Day views

Create, edit, and delete events directly on the calendar

Modal / side-panel for event details

Smooth transitions + subtle animations

Fully responsive layout

Keyboard & mouse friendly interactions

🛠️ Backend

RESTful API for event CRUD

Data persistence with your choice of DB (SQLite/Postgres/MongoDB)

Event validation (start < end, correct date formats, etc.)

Handles overlapping events

Optional: recurring events (RRULE-style)

🏗️ Tech Stack

You can adapt this to your preferred stack.
My recommended setup:

Frontend

React or Next.js

Tailwind CSS / SCSS

Zustand / Redux / Context for state

Framer Motion (optional animations)

Backend

Node.js + Express (or Django / Go)

SQLite / PostgreSQL / MongoDB

Prisma / Sequelize / Mongoose

📦 Getting Started
1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Install dependencies
Frontend
cd frontend
npm install

Backend
cd backend
npm install

3. Environment setup

Create a .env in the backend:

DATABASE_URL=your_database_url_here
PORT=5000

4. Run the project
Backend
npm run dev

Frontend
npm run dev


Frontend runs on → http://localhost:3000

Backend runs on → http://localhost:5000

🧠 Architecture Overview
Frontend

Calendar grid dynamically renders based on selected view

Global state stores events, current date, and UI modes

API layer syncs all event actions

Animations smooth out transitions between Month ↔ Week ↔ Day

Backend

Simple RESTful API

CRUD endpoints:

GET /events

POST /events

PUT /events/:id

DELETE /events/:id

Logic for:

conflicting/overlapping events

invalid time ranges

recurring rules (if implemented)

🧩 Edge Cases & Logic Notes
✔ Event Overlaps

Events that overlap are either:

displayed side-by-side, or

rejected by the backend
(depending on your implementation)

✔ Recurring Events

If implemented, rules follow classic RRULE patterns: daily / weekly / monthly.

✔ Time Zones

Dates stored in UTC, displayed in the user’s local timezone.

✔ Dragging / Resizing

Drag to create a new event

Edge-resize to change duration

“Preview” state before confirming the event

These contribute heavily to the natural “Google Calendar feel.”

🎨 Interaction & Animation Notes

Smooth interaction was a priority.
This includes:

Fade-in event modals

Animated transitions between views

Hover effects on events

Snappy grid highlighting while selecting time slots

All animations are kept subtle, not distracting.

📌 Future Improvements

Some ideas for expanding the project:

Shared calendars

User authentication (Google OAuth)

Real-time collaboration (WebSockets)

Color-coded calendars

Email/push reminders

Offline support

🤝 Contributing

Pull requests are welcome!
If you’d like to suggest improvements, feel free to open an issue.

📜 License

This project is licensed under the Apache License.
