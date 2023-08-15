FROM node:lts-alpine as build-stage
RUN npm install -g http-server
WORKDIR /root/
COPY package.json ./
RUN npm install
COPY . .
RUN ["npm", "run", "build"]
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /root/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
