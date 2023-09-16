FROM node:19.8.1-alpine3.17 AS build 
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install 

FROM node:19.8.1-alpine3.17  
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY . .
  
CMD ["npm", "run", "dev"]