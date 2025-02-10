FROM node:lts-alpine3.20 AS base

FROM base AS build

WORKDIR /app

COPY ./apps/frontend ./apps/frontend

COPY ./packages/db ./packages/db

COPY package.json .

COPY package-lock.json .

RUN npm install

RUN npm run build --workspace=frontend

FROM base AS main

WORKDIR /app

COPY --from=build /app/apps/frontend/.next/standalone ./

EXPOSE 3000

CMD [ "node", "server.js" ]

