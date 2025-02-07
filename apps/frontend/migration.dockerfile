FROM node:lts-alpine3.20 AS base

FROM base AS build

WORKDIR /app

COPY ./migration.ts .

COPY ./db ./db

COPY ./migrations ./migrations

COPY ./package.json .

COPY ./package-lock.json .

COPY ./tsconfig.json .

COPY ./tsconfig.migration.json .

COPY ./webpack.config.migration.js .

RUN npm install

RUN npm run build:migration

FROM base AS main

WORKDIR /app

COPY --from=build /app/migrations ./migrations

COPY --from=build /app/dist/migration.js .

CMD [ "node", "migration.js"]

