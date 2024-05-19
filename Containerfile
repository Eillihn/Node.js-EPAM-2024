# Stage 1: Build
FROM node:21-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json tsconfig.json .env ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:21-alpine

WORKDIR .

# Copy only the built files and node_modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/.env ./.env

RUN mkdir -p /dist/task10/temp && chown -R node:node /dist/task10/temp
CMD ["sh", "-c", "npm run start:task10:migration:up && npm run start:task10:seeds"]

USER node

ENV API_PORT=8000

EXPOSE ${API_PORT}

CMD ["sh", "-c", "npm run start:task10"]
