FROM node:12
WORKDIR /var/www
COPY package*.json /var/www/
RUN npm install
COPY . .
RUN ["chmod", "+x", "/var/www/wait-for-it.sh"]
