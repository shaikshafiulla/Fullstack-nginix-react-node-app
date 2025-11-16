# ------------ 1. Base Image ------------
FROM node:18-alpine AS base
WORKDIR /app

# ------------ 2. Install Dependencies ------------
COPY package*.json ./
RUN npm install

# ------------ 3. Copy Code + Build ------------
COPY . .
RUN npm run build

# ------------ 4. Runtime Image ------------
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=base /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
