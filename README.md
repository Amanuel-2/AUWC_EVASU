# AUWC ECSF Fellowship Management System

A responsive React and TypeScript application for AUWC ECSF, designed to support university fellowship membership, ministry teams, leader workflows, attendance tracking, meeting schedules, and role-based dashboards.

## Features

- Public fellowship landing page with teams, events, testimonials, and contact sections
- Authentication simulation with protected dashboard routes
- Admin dashboard for system-wide overview and future global management modules
- Team Leader dashboard restricted to the leader's assigned team
- Team member search, filtering, responsive tables/cards, and detail modal
- Attendance marking with Present, Absent, Late, and Excused states
- Meeting schedule update form with validation
- Leader profile editing, profile picture URL, contact updates, and password simulation
- Responsive sidebar/drawer navigation for desktop and mobile
- Mock API services and Context API state management
- Tailwind CSS theme based on the AUWC ECSF logo colors

## Demo Accounts

Use any password for the mock login flow.

| Role | Email | Destination |
| --- | --- | --- |
| Admin | `admin@auwcec.edu` | `/admin` |
| Team Leader | `leader@auwcec.edu` | `/leader` |

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router 7
- Tailwind CSS 4
- Radix UI primitives
- Lucide React icons
- Context API for mock auth and dashboard state

## Project Structure

```text
src/
  app/
    components/          Shared app components and UI primitives
    context/             Authentication context
    data/                Public mock team data
    features/
      admin/             Admin guard and dashboard
      leader/            Team leader dashboard modules
    pages/               Public pages and auth screens
    routes.tsx           Route definitions and protection boundaries
  assets/                Local project assets, including the AUWC ECSF logo
  styles/                Tailwind imports and theme tokens
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Notes

This application currently uses mock data and browser state to simulate backend behavior. The architecture is ready for replacing mock services with API calls while keeping route guards, feature modules, and reusable components intact.

## MongoDB Configuration

MongoDB credentials must stay on the server side. Put the connection string in an environment variable such as `MONGODB_URI` in your backend or deployment environment. Do not import it into React components or commit the real password to the repository. See `.env.example` for the expected shape.
