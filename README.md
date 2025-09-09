
# MERN To‑Do Starter (Monorepo)

This is a ready-to-run MERN (MongoDB, Express, React, Node) To‑Do app starter.
It includes:
- CRUD API (`/server`) with Express + Mongoose
- React UI (`/client`) with Vite
- Tests: Jest + Supertest for backend, Vitest + React Testing Library for frontend
- Env examples and deployment hints

## Quick Start (Local)

1) Install Node.js LTS (18+). Confirm with `node -v` and `npm -v`.
2) In one terminal, run the server:
```bash
cd server
cp .env.example .env   # add your MongoDB Atlas URI
npm install
npm run dev
```
3) In a second terminal, run the client:
```bash
cd client
cp .env.example .env   # set VITE_API_URL if needed
npm install
npm run dev
```
Open the URL printed by Vite (typically http://localhost:5173).

## Scripts

- **Server**: `npm run dev` (nodemon), `npm test` (Jest), `npm start` (production)
- **Client**: `npm run dev` (Vite), `npm test` (Vitest), `npm run build` (production)

## Deploy (Overview)

- Backend: Render/Railway. Set `MONGODB_URI` and `CORS_ORIGIN` env vars.
- Frontend: Vercel. Set `VITE_API_URL` to your deployed backend URL + `/api`.

See comments inside files for specifics.
