# This would be the Dockerfile to use with docker-compose
FROM node:10.16.3
ARG NODE_ENV=production
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN if [ "$NODE_ENV" = production ] ; then npm install --production && echo 'doing production build' ; else npm install && echo 'doing development build' ; fi
EXPOSE 4444
CMD if [ "$NODE_ENV" = production ] ; then npm run start-docker ; else npm run start-dev ; fi