FROM node:lts-alpine3.20 AS base

FROM base AS build

WORKDIR /app

COPY ../apps/cron ./apps/cron

COPY ../packages/db ./packages/db

COPY ../packages/shared ./packages/shared

COPY ../package.json .

COPY ../package-lock.json .

RUN npm install

RUN npm run build --workspace=cron

FROM base AS main

WORKDIR /app

COPY --from=build /app/apps/cron/dist/index.js .

CMD [ "node", "index.js"]

