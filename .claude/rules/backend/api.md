---
paths:
  - "backend/**/*.ts"
---

# Backend API Rules

- All route handlers must use `async/await` with `try/catch`, calling `next(err)` on errors
- New routers must be mounted in `backend/src/server.ts` — never create standalone Express apps
- Mongoose models go in `backend/src/models/` with an exported TypeScript interface
- New route files go in `backend/src/routes/` and export a default `Router`
- Do not add per-route CORS headers — CORS is handled globally in `server.ts`
- Always compile and verify with `npm run build` from `backend/` after changes
