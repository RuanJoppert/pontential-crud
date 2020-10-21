FROM build AS builder
RUN npm run build

FROM node:12-alpine AS production
WORKDIR /var/www
COPY --from=builder ./var/www/dist ./dist
COPY package* ./
RUN npm install --production
CMD ["npm", "run", "start"]
