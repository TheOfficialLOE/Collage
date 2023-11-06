FROM node:18-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
COPY . .
RUN pnpm build:collage
RUN pnpm build:worker
RUN pnpm db:generate
EXPOSE 3000