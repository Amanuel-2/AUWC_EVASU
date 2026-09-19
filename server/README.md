# AUWC ECSF API

Node.js + TypeScript API for the AUWC ECSF frontend. It uses MongoDB Atlas through the official MongoDB driver.

## Local setup

```bash
cd server
cp .env.example .env
npm install
```

Fill in `server/.env`:

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DB=auwcec_ecsf
JWT_SECRET=use-a-long-random-secret-at-least-32-characters
CLIENT_ORIGIN=http://localhost:5173
```

To create the administrator and demo team-leader accounts, also set `ADMIN_PASSWORD` and `SEED_LEADER_PASSWORD`, then run:

```bash
npm run seed
npm run dev
```

The seed script creates named teams, hides the numbered placeholder groups from public listings, and assigns leader accounts such as `pray@gmail.com` to the Prayer Team. It does not overwrite existing teams or memberships.

## API areas

- `GET /api/health`
- `/api/auth/*` for registration, login, and the current user
- `/api/teams` for public teams and team details
- `/api/teams/:teamId/join` for memberships
- `/api/teams/:teamId/members` for leader member access
- `/api/teams/:teamId/schedule` for schedules
- `/api/teams/:teamId/attendance` for attendance
- `/api/admin/*` for admin-only user, team, and leader management

Team route parameters use the team slug, such as `prayer` or `small-group-1`.
