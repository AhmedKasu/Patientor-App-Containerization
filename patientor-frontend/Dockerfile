FROM node:19.8.1-alpine3.17 AS base

WORKDIR /usr/src/app
COPY package*.json .

FROM base AS test-stage
RUN npm ci
COPY . .
RUN CI=true npm test

FROM test-stage AS build-stage
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.25-alpine3.18 AS production-stage
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html