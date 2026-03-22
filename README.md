# Event Hub

A location-based event discovery platform built with Next.js. Users can sign up, log in, and find events happening near them.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Data Fetching:** TanStack React Query, Axios
- **Forms:** React Hook Form, Zod
- **UI:** Tailwind CSS, Radix UI, Lucide React
- **Auth:** NextAuth

## Project Structure

```
src/
├── app/
│   ├── page.tsx                        # Login / sign-up page
│   ├── api/
│   │   ├── login/route.ts              # POST /api/login
│   │   ├── users/route.ts              # POST /api/users
│   │   └── events/route.ts             # GET /api/events
│   ├── components/
│   │   ├── login_form.tsx
│   │   └── signup_form.tsx
│   └── (dashboard)/dashboard/
│       ├── page.tsx                    # Event discovery dashboard
│       └── components/
│           ├── event_card.tsx
│           └── filter_bar.tsx          # Location search & filters
├── components/ui/                      # Shared UI components
└── lib/
    └── queries/                        # React Query hooks
        ├── login.ts
        ├── users.ts
        └── events.ts
```

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Install dependencies

```bash
yarn install
```

### Environment variables

Create a `.env` file at the project root:

```env
API_URL=http://localhost:3000   # URL of your backend API
```

### Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

All routes proxy to the backend defined by `API_URL`.

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/login` | Authenticate a user |
| `POST` | `/api/users` | Create a new account |
| `GET` | `/api/events?lat=&lon=&radius=` | Fetch events by location |

## Available Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn start    # Run production server
yarn lint     # Run ESLint
```

## CI / Automation

- **Claude PR Review** — Claude automatically reviews every pull request and posts a structured comment with a summary, issues, and verdict.
