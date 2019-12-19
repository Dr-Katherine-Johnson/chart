# This would be the Dockerfile to use with docker-compose

FROM node:10.16.3
RUN mkdir -p /app
WORKDIR /app
COPY . /app
# TODO: can remove the --production flag when NODE_ENV is set to production
RUN npm install --production
EXPOSE 4444
CMD ["npm", "run", "start-docker"]