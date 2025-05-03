FROM node:latest

WORKDIR /app

ADD ./app /app

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD [ "npm", "start" ]