# This would be the Dockerfile to use with docker-compose
FROM node:10.16.3
ARG NODE_ENV=production
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install --production
EXPOSE 4444
CMD npm run start-docker