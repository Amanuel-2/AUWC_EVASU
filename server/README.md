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
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=re_...
EMAIL_FROM=AUWC ECSF <noreply@your-verified-domain.example>
```

To create the administrator and demo team-leader accounts, also set `ADMIN_PASSWORD` and `SEED_LEADER_PASSWORD`, then run:

```bash
npm run seed
npm run dev
```

The seed script creates named teams, hides the numbered placeholder groups from public listings, and assigns leader accounts such as `pray@gmail.com` to the Prayer Team. It does not overwrite existing teams or memberships.

## API areas

- `GET /api/health`
- `/api/auth/*` for registration, login, current user, and password reset

## Password reset email setup

Password reset requests always return the same generic response, whether or not the email exists. Configure a verified sending domain in Resend, then set `RESEND_API_KEY`, `EMAIL_FROM`, and the trusted public `FRONTEND_URL` in the server environment. The API stores only SHA-256 hashes of 30-minute reset tokens in MongoDB; the token is single-use and a successful reset invalidates existing JWT sessions.

For local testing, use a Resend test/verified recipient and check the inbox. If `RESEND_API_KEY` is not configured, no reset email is sent and the token is removed; reset tokens are never returned by the API or written to logs.
- `/api/teams` for public teams and team details
- `/api/teams/:teamId/join` for memberships
- `/api/teams/:teamId/members` for leader member access
- `/api/teams/:teamId/schedule` for schedules
- `/api/teams/:teamId/attendance` for attendance
- `/api/admin/*` for admin-only user, team, and leader management

Team route parameters use the team slug, such as `prayer` or `small-group-1`.
