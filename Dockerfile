# stage 1 - installing dependencies

ARG NODE_VERSION=22.11.0-alpine

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json package-lock.json* .npmrc* ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund



# stage 2 - build next.js app in standalone mode


FROM node:${NODE_VERSION} AS builder

ARG BASE_URL=http://localhost:3000

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production
ENV BASE_URL=${BASE_URL}

RUN npm run build



# stage 3 - run next.js app

FROM node:${NODE_VERSION} AS runner

ARG BASE_URL=http://localhost:3000

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV BASE_URL=${BASE_URL}


COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]