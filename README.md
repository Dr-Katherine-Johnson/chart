# Chart
> Price chart for this particular stock

## Related Projects
  ###### Reverse Proxy that interacts with the other microservices
  - https://github.com/Dr-Wing/chart-proxy

  ###### Microservices
  - https://github.com/Dr-Wing/about-microservice

## Table of Contents
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
> To start the app - from the root directory, run the slush file with (requires docker and docker-compose)
```sh
bash start.sh
```
> The app is now running in a container at port 4444. The mongo database is available at port 1000. To stop the app and (clean up after yourself!)
```sh
docker-compose down -v --rmi all
```

## Requirements
### With Docker
- docker
- docker-compose
### Without Docker
- node, npm, and mongo

## Development
### With Docker
- Follow directions to install the Watchman utility https://facebook.github.io/watchman/docs/install.html
- Install the https://pypi.org/project/pywatchman/ dependency to use watchman-make
- `watchman-make` watches for changes in the project root directory, and runs a script that relaunches `docker-compose`

```sh
watchman-make -p '*' --run 'bash relaunch.sh'
```

- Use the flag `--build-arg NODE_ENV=development` to build an image from which to run containers that contain all development dependencies (defaults to building an image with only production dependencies)

### Without Docker
- From within the root directory:
```sh
npm install
  ```