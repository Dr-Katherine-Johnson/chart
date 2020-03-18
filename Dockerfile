# This would be the Dockerfile to use with docker-compose
FROM node:10.18.0-alpine3.11
WORKDIR /chart
COPY . /chart
RUN npm install --production
EXPOSE 4444
CMD npm run start-docker