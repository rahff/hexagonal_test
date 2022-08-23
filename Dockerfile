FROM node:alpine

USER root

WORKDIR /usr/app

COPY . /usr/app/

RUN npm i

CMD ["npm", "start"]