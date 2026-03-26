# Dockerfile for frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Use a lightweight server to serve the build
FROM node:18-alpine

RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]