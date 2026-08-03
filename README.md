# Campus Event Tracker and RSVP Portal

A full-stack event management and RSVP portal built with Flask for the backend and React/Vite for the frontend. The application supports user registration, authentication, event browsing, event creation for organizers, and RSVP management.

## Project Overview

- Backend: Flask application with REST API endpoints for authentication, events, RSVPs, and tags.
- Frontend: React app built with Vite located under `client/event tracker`.
- Database: SQLite by default via SQLAlchemy.
- Authentication: JWT-based auth using `Flask-JWT-Extended`.
- API host: `http://127.0.0.1:5555`

## Key Features

- User registration and login
- Protected routes for authenticated users
- Event listing with search and filters
- Event details and RSVP actions
- Organizer/admin event creation and management
- Tag creation and event categorization

## Repository Structure

- `app.py` — Flask application factory and route definitions.
- `controllers/` — optional RESTful controller modules for auth, event, RSVP, and tag logic.
- `models/` — SQLAlchemy models for users, events, RSVPs, tags, and organizer profiles.
- `schemas/` — Marshmallow schemas for model serialization.
- `extensions.py` — shared Flask extension instances.
- `migrations/` — Alembic migration configuration.
- `client/event tracker/` — React frontend application.

## Backend Setup

### Prerequisites

- Python 3.11+ (project dependencies target Python 3.12-compatible packages)
- `pip`

### Install dependencies

```bash
cd /home/cory/Desktop/CampusEventrackerandRsvpPortal
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Run the backend

```bash
python app.py
```

This starts the Flask backend at:

```text
http://127.0.0.1:5555
```

### Database

The app uses SQLite by default and stores data in `instance/app.db`.

Apply schema changes and add the sample data with:

```bash
flask --app app db upgrade
python seed.py
```

### Backend API Routes

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive an access token
- `GET /api/auth/me` — authenticated user profile
- `GET /api/events` — list events with optional paging/filters
- `POST /api/events` — create a new event (organizer/admin only)
- `GET /api/events/<id>` — fetch a single event
- `PATCH /api/events/<id>` — update event (admin only)
- `DELETE /api/events/<id>` — delete event (admin only)
- `POST /api/events/<id>/rsvp` — submit RSVP for an event
- `GET /api/users/me/rsvps` — list user RSVPs
- `GET /api/tags` — list all tags
- `POST /api/tags` — create a new tag
- `GET /api/analytics` — organizer/admin event and RSVP totals

Public registration creates student accounts only. An administrator must assign
organizer or admin roles, preventing privilege escalation through the sign-up form.

## Frontend Setup

### Prerequisites

- Node.js 18+ and npm

### Install dependencies

```bash
cd /home/cory/Desktop/CampusEventrackerandRsvpPortal/client/event tracker
npm install
```

### Run the frontend

```bash
npm run dev
```

The React app will be available at the address shown by Vite, typically:

```text
http://localhost:5173
```

### Frontend API Configuration

The frontend uses `client/event tracker/src/services/api.js` to send requests to

```text
http://127.0.0.1:5555
```

The auth service and event service utilities use this centralized API helper.

## Development Notes

- The frontend `Register.jsx` page now uses `authService.register()`.
- The frontend `Events.jsx` page uses `eventService.getEvents()` with `useEffect`.
- JWT token storage is handled in `localStorage` and sent automatically via `api.js`.
- Protected frontend auth state is managed via `AuthContext` and `useAuth()`.

## Running the Full Stack Locally

1. Start the Flask backend:
   ```bash
   cd /home/cory/Desktop/CampusEventrackerandRsvpPortal
   source venv/bin/activate
   python app.py
   ```
2. Start the React frontend:
   ```bash
   cd /home/cory/Desktop/CampusEventrackerandRsvpPortal/client/event tracker
   npm install
   npm run dev
   ```
3. Open the frontend app in the browser and use registration/login.

## Optional Improvements

- Configure a non-default `JWT_SECRET_KEY` in `.env` before deployment.

## Contact

If you want to extend the portal, start with `app.py` for backend routes and `client/event tracker/src` for frontend pages and services.
