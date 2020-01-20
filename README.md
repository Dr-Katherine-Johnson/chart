# Chart
> Price chart microservice for a Service-oriented architecture clone of the [stock detail page from Robinhood.com](https://robinhood.com/stocks/AAPL)

## Table of Contents
- [Chart](#chart)
  - [Table of Contents](#table-of-contents)
  - [Related Projects](#related-projects)
  - [Deployment](#deployment)
    - [If Needed](#if-needed)
  - [Requirements](#requirements)
  - [Development](#development)
  - [Build](#build)

## Related Projects
- [Reverse Proxy](https://github.com/Dr-Wing/chart-proxy) that interacts with the other microservices
- Microservices
  - [About](https://github.com/Dr-Wing/about-microservice)
  - [People Also Bought](https://github.com/Dr-Wing/people-also-bought)
  - [Earnings Chart](https://github.com/Dr-Wing/earnings)

## Deployment
- Create a file in the project directory named `.env`, based on `.env.template`. This file will need:
  1. The URL of the deployed EC2 instance for this service
  2. The URL of the deployed EC2 instance for the price chart service
  3. The absolute path to the private key file in order to authenticate into that instance.

- From your LOCAL computer
```sh
# Makes the environment variables you just defined in `.env` available in your current shell
export $(cat .env)
```

```sh
# Only include the 1 at the end if this is the first time you've run this script on this instance (installs things like docker, docker-compose, etc...)
bash deploy.sh $pathToPEM $instance 1 && bash compose.sh $pathToPEM $instance
```

- (if needed) Enter yes at the prompt.

- The app is now running on the instance in a container at port 4444. The mongo database is available in its own container at port 1000.

### If Needed
- To stop (and clean up after yourself!) or restart the app, run these commands from your local machine (respectively)
```sh
bash compose.sh $pathToPEM $instance 1
```

- To restart the app:
```sh
bash compose.sh $pathToPEM $instance
```

- To connect to the mongo db running in the mongo container (ie, check if there is data there, etc ...), from the ec2 instance, run
```sh
docker exec -i chart_mongo_1 mongo "mongodb://localhost"
```

## Requirements
- docker
- docker-compose

## Development using Docker
Make sure you have docker running on your machine.

- From within the root directory:

Mount an external volume where dependencies will be installed
```sh
make setup
  ```

Install binary dependencies
  ```sh
make install
  ```

To start a development environment
  ```sh
make dev
  ```

For other commands see docker-compose.builder.yml and Makefile. Example:
Build webpack bundle
  ```sh
make bundle
  ```

## Build
- Creates a webpack bundle, Builds a docker image, and pushes it to dockerhub
```sh
npm run build
```