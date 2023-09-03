FROM node:16-alpine AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/angular-groceries-list /usr/share/nginx/html

COPY ./certs/server.crt /etc/nginx/certs/
COPY ./certs/server.key /etc/nginx/certs/


COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf