FROM node:12-alpine AS builder
WORKDIR /var/www
COPY . .
RUN npm install
RUN npm run build

FROM node:12-alpine AS production
WORKDIR /var/www
COPY --from=builder ./var/www/dist .
COPY package* ./
RUN npm install --production
CMD node dist/index.js
