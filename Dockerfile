# ----------- Build Phase -------------
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies first (leveraging Docker cache)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm ci --legacy-peer-deps

# Copy the rest of the source
COPY . .

# Build the production-ready bundle
RUN npm run build  # This should produce the `dist/` folder via Vite

# ----------- Run Phase --------------
# We use a lightweight web-server image to serve static files
FROM nginx:alpine AS runner

# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx static files configuration
RUN rm /etc/nginx/conf.d/default.conf

# Add a minimal configuration that always serves index.html (for client-side routing)
RUN printf "server {\n  listen       80;\n  server_name  _;\n  root   /usr/share/nginx/html;\n  index  index.html;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n" > /etc/nginx/conf.d/pokemem.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
