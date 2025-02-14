FROM node:lts-alpine3.20 AS base

FROM base AS build

WORKDIR /app

COPY ../packages/db ./packages/db

COPY ../package.json ./package.json

COPY ../package-lock.json ./package-lock.json

RUN npm install

RUN npm run build:migration --workspace=db

FROM base AS main

WORKDIR /app

COPY --from=build /app/packages/db/dist .

CMD [ "node", "index.js"]

