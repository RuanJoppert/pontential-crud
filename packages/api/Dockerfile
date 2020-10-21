FROM node:12-alpine AS builder
RUN mkdir -p /var/www
RUN npm i lerna -g --loglevel notice
WORKDIR /var/www
COPY package*.json /var/www/
RUN npm install
COPY . /var/www/
RUN npm run build

FROM node:12-alpine AS production
WORKDIR /var/www
COPY --from=builder ./var/www/dist ./dist
COPY package* ./
RUN npm install --production
CMD node dist/index.js
