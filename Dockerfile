# ========= Dependencies (cache) =========
FROM node:22 AS deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ========= Build stage (skip for local dev) =========
FROM node:22 AS builder

WORKDIR /app

# Reuse node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy app source
COPY . .

# Build Next.js app (only for production)
ARG BUILD_ENV=production
RUN if [ "$BUILD_ENV" = "production" ]; then yarn build; fi

# ========= Runtime stage =========
FROM node:22 AS runner

WORKDIR /app

# Copy built app and node_modules from builder
COPY --from=builder /app ./

EXPOSE ${CLIENT_PORT}

# Default to production command, override in docker-compose for dev
CMD ["yarn", "start"]
