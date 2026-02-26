---
paths:
  - "frontend/src/**/*.{ts,tsx}"
---

# Frontend React Rules

- Use functional components and hooks only — no class components
- Always type component props and API response shapes with TypeScript interfaces
- Import the Axios instance from `../api` (or `./api`) — never use `fetch` or hardcoded URLs
- API base URL is `/api` (relative) — Nginx proxies this to the backend; never use `http://localhost:5000`
- New components go in `frontend/src/components/<ComponentName>/`
- Run `npm run lint` from `frontend/` after changes; fix all ESLint errors before finishing
- Run `npm run build` from `frontend/` to verify TypeScript compiles without errors
