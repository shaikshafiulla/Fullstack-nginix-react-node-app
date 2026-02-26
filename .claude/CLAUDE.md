# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack CRUD application with React + TypeScript frontend, Express + TypeScript backend, MongoDB database, and Nginx reverse proxy — all orchestrated via Docker Compose.

## Common Commands

### Full Stack (Docker)
```bash
docker-compose up           # Start all services (frontend, backend, mongo)
docker-compose up --build   # Rebuild images and start
docker-compose down         # Stop and remove containers
```

### Backend (runs on port 5000)
```bash
cd backend
npm install
npm run dev     # Development with hot reload (ts-node-dev)
npm run build   # Compile TypeScript to dist/
npm start       # Run compiled dist/server.js
```

### Frontend (Vite dev server)
```bash
cd frontend
npm install
npm run dev     # Vite dev server
npm run build   # Production build to dist/
npm run lint    # ESLint (React + TypeScript rules)
npm run preview # Preview production build locally
```

### Multi-platform Docker Builds
```bash
docker buildx bake          # Build both services
docker buildx bake --push   # Build and push to Docker Hub
# Configure via TAG and DOCKERHUB_USER variables in docker-bake.hcl
```

## Architecture

### Request Flow
Browser → Nginx (port 80) → serves React SPA static files OR proxies `/api/*` → Express backend (port 5000) → MongoDB

### Service Ports
- Frontend/Nginx: `80` (container) mapped to `80` (host)
- Backend: `5000` (container) mapped to `5001` (host, for direct access)
- MongoDB: `27017` (internal only)

### Key Design Decisions
- **Nginx as reverse proxy**: The frontend Axios client uses relative `/api` base URL — all API calls are proxied by Nginx to `http://backend:5000`. This means the frontend works identically in dev (via Vite proxy) and production (via Nginx).
- **SPA routing**: Nginx is configured with `try_files $uri /index.html` to support client-side routing.
- **Multi-stage Docker builds**: Backend image copies only `dist/` to minimize size; frontend image copies only the Vite `dist/` into Nginx.

### Backend Structure
- `backend/src/server.ts` — Express app setup, MongoDB connection, mounts routes at `/api/items`
- `backend/src/routes/items.ts` — CRUD endpoints: `GET /items`, `POST /items`, `PUT /:id`, `DELETE /:id`
- `backend/src/models/Item.ts` — Mongoose schema with `title` (required) and `description` (optional) fields, auto-timestamps

### Frontend Structure
- `frontend/src/App.tsx` — Main component with full CRUD UI (fetch on mount, add/delete items)
- `frontend/src/api/index.ts` — Axios instance with `baseURL: '/api'`
- `frontend/nginx/nginx.conf` — Nginx config for static files + API proxy

## Environment Variables

**Backend** (set in docker-compose or `.env`):
- `PORT` — defaults to 5000
- `MONGO_URI` — e.g. `mongodb://root:example@mongo:27017/admin`

**MongoDB** (docker-compose defaults for local dev):
- `MONGO_INITDB_ROOT_USERNAME=root`
- `MONGO_INITDB_ROOT_PASSWORD=example`

No `.env` file is tracked in git.

## Sub-Agents

This project has two specialized sub-agents for feature development:

- **backend-agent** — Use for Express routes, Mongoose models, middleware, TypeScript backend changes
- **frontend-agent** — Use for React components, Axios API calls, Vite config, CSS/styling changes

## Skills

- `/add-feature` — Coordinate adding a new full-stack feature (invokes backend-agent + frontend-agent)
