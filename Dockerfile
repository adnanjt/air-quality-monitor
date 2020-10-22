

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
RUN yarn global add @vue/cli -g
COPY . .
RUN yarn serve

# debug stage
ENV NODE_ENV='development'
ENV ENV='development'
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /docker-entrypoint.d/ /docker-entrypoint.d/

EXPOSE 8080
FROM nginx:stable-alpine as debug-stage
CMD ["nginx", "-g", "daemon off;"]
