FROM node:alpine

WORKDIR /home/node/

COPY node_modules /home/node/node_modules
COPY server /home/node/server
COPY dist /home/node/dist
COPY configuration.properties package.json package-lock.json configuration.js /home/node/
COPY configuration.properties.docker-compose /home/node/configuration.properties

CMD npm start