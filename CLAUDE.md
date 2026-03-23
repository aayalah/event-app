# Event Hub — Claude Code Guide

## Project overview
Next.js 16 (App Router) event discovery platform. Users log in, search by location, date, and category, and browse event cards on a dashboard.

## Stack
- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui components (Radix UI primitives)
- **Data fetching:** TanStack React Query v5, Axios
- **Forms:** React Hook Form + Zod
- **Auth:** NextAuth v4
- **Package manager:** Yarn

## Commands
```bash
yarn dev       # Start dev server (http://localhost:3000)
yarn build     # Production build
yarn lint      # ESLint
yarn tsc --noEmit  # Type check
```

## Project structure
```
src/
├── app/
│   ├── page.tsx                      # Login / sign-up page
│   ├── api/
│   │   ├── login/route.ts            # POST /api/login → backend proxy
│   │   ├── users/route.ts            # POST /api/users → backend proxy
│   │   ├── events/route.ts           # GET /api/events → backend proxy
│   │   └── categories/route.ts       # GET /api/categories → backend proxy
│   ├── components/
│   │   ├── login_form.tsx
│   │   └── signup_form.tsx
│   └── (dashboard)/dashboard/
│       ├── page.tsx                  # Main dashboard
│       └── components/
│           ├── event_card.tsx
│           └── filter_bar.tsx        # Location, date, category filters
├── components/ui/                    # shadcn/ui components
└── lib/
    ├── queries/
    │   ├── login.ts                  # useLogin
    │   ├── users.ts                  # useCreateAccount, useCurrentUser
    │   ├── events.ts                 # useLocationSearch
    │   └── categories.ts             # useCategories
    └── utils.ts
```

## Architecture notes

### API routes
All routes in `src/app/api/` are proxies — they forward requests to the backend at `process.env.API_URL` (default: `http://localhost:3001`). Do not add business logic here.

### React Query
- Query keys follow the pattern `["resourceName", ...params]`
- `useCurrentUser` caches the logged-in user under `["currentUser"]`
- Login and account creation both call `queryClient.setQueryData(["currentUser"], ...)` on success to avoid a redundant fetch

### Environment variables
| Variable | Description |
|---|---|
| `API_URL` | Backend base URL (e.g. `http://localhost:3001`) |

## CI
- **Claude PR Review** — automatically reviews every PR and posts a structured comment (summary, issues, suggestions, verdict)
