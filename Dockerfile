FROM node:latest

ADD . .
RUN npm install

EXPOSE 8081

CMD node server.js
