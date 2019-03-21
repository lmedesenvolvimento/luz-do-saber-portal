FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

ADD ./docker-web-app/package*.json ./

RUN npm install

ADD ./docker-web-app .

ADD ./dist/web ./public

EXPOSE 8080

CMD [ "npm", "start"]