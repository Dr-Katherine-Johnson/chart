FROM node:10.16.3
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install
EXPOSE 4444
CMD ["npm", "run", "start-docker"]