FROM node:19.8.1-alpine3.17 AS base
WORKDIR /usr/src/app
COPY --chown=node:node package*.json .
RUN npm ci

FROM base AS build-stage
COPY . .
RUN npm run tsc

FROM build-stage AS production-stage
ENV NODE_ENV=production
COPY --from=build-stage /usr/src/app/build /usr/src/app/build
USER node
CMD ["npm", "start"]
