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
> To start the app:
> From the root directory
> Install docker
> Run the slush file with
```sh
bash start.sh
```
> The app is now running in a container at port 4444.
> The mongo database is available at port 1000
> To stop the app and (clean up after yourself!)
```sh
docker-compose down -v
```

## Requirements
- Docker

## Development
  ### Installing Dependencies
    - none needed if using Docker

    - Otherwise, from within the root directory:
    ```sh
    npm install
    ```