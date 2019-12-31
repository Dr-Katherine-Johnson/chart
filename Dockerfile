# This would be the Dockerfile to use with docker-compose
FROM node:10.18.0-alpine3.11
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install --production
EXPOSE 4444
CMD npm run start-docker