# This would be the Dockerfile to use with docker-compose
FROM node:10.18.0-alpine3.11
RUN mkdir -p /api
WORKDIR /api
COPY . /api
RUN npm install --production
EXPOSE 4444
CMD npm start