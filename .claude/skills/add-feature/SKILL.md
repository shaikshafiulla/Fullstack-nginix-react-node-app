---
name: add-feature
description: Add a new full-stack feature to this project. Coordinates backend (Express route + Mongoose model) and frontend (React component + API calls) work. Use when the user wants to add a new resource or capability to the app.
disable-model-invocation: false
argument-hint: "[feature-name] [description]"
---

# Add Full-Stack Feature

Add the new feature: **$ARGUMENTS**

Follow these steps in order:

## 1. Understand the Request

Clarify what the feature is:
- What is the data model / resource? (e.g., "users", "products", "comments")
- What CRUD operations are needed? (create, read, update, delete)
- Any special business logic or validation?

## 2. Backend — Use the `backend-agent`

Delegate backend implementation to the `backend-agent` sub-agent with these instructions:

> Add the backend for: $ARGUMENTS
>
> 1. Read `backend/src/models/Item.ts` and `backend/src/routes/items.ts` to understand existing patterns
> 2. Create `backend/src/models/<Name>.ts` with the Mongoose schema and TypeScript interface
> 3. Create `backend/src/routes/<name>.ts` with CRUD route handlers (GET all, POST create, PUT/:id update, DELETE/:id delete)
> 4. Mount the new router in `backend/src/server.ts` at `/api/<name>s`
> 5. Run `npm run build` from `backend/` to verify TypeScript compiles

## 3. Frontend — Use the `frontend-agent`

Delegate frontend implementation to the `frontend-agent` sub-agent with these instructions:

> Add the frontend for: $ARGUMENTS
>
> 1. Read `frontend/src/App.tsx` and `frontend/src/api/index.ts` to understand existing patterns
> 2. Add Axios API functions for the new resource in `frontend/src/api/index.ts` or a new file
> 3. Create a new React component in `frontend/src/components/<Name>/<Name>.tsx`
> 4. Integrate the component into `App.tsx`
> 5. Run `npm run lint` from `frontend/` to check for lint errors
> 6. Run `npm run build` from `frontend/` to verify TypeScript compiles

## 4. Verify Integration

After both agents complete:
- Confirm the backend API route matches what the frontend Axios call expects (e.g., `/api/products`)
- Confirm response shape from backend matches the TypeScript interface on the frontend
- Summarize what was added and how to test it with `docker-compose up`
