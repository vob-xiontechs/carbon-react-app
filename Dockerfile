### Multi-stage Dockerfile for building and serving the Vite app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files first and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

### Production image
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
