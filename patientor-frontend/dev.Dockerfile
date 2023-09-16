FROM node:19.8.1-alpine3.17

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

CMD ["npm", "start"]