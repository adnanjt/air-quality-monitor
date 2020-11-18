# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV PATH $(yarn global bin):$PATH
COPY package*.json ./
COPY package.json /app/package.json
RUN yarn install
RUN yarn global add @vue/cli -g
COPY . .

# debug stage
ENV NODE_ENV='development'
ENV ENV='development'
EXPOSE 8080
CMD ["yarn", "serve"]
