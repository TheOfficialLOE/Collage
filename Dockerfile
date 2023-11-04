FROM node:18-alpine
RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN npx nest build collage
RUN npx nest build worker
RUN pnpm db:generate
EXPOSE 3000
CMD ["npx", "nest", "start", "worker"]