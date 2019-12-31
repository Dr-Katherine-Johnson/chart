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
- If it does not already exist, create a `.env` file in the project root directory with:
- `SERVICE_API_URL` environment variable set to the fully qualified URL of the deployed instance
- `NODE_ENV=production`

- From your LOCAL computer:
```sh
bash ec2-move-files.sh EC2_INSTANCE_URL_GOES_HERE
```

- ssh into the ec2 instance like so:
```sh
ssh -i ~/aws/Administrator-key-pair-useast1.pem ec2-user@EC2_INSTANCE_URL_GOES_HERE
```

- From the ec2 instance
```sh
bash ec2-install.sh
```

- Logout of the ec2 instance with `exit` and log back in using the command above
- Again from the ec2 instance
```sh
docker-compose up
```

> The app is now running in a container at port 4444. The mongo database is available at port 1000. To stop the app (and clean up after yourself!), run this command from the ec2 instance:
```sh
docker-compose down -v --rmi all
```

### If Needed
- To connect to the mongo db running in the mongo container (ie, check if there is data there, etc ...), from the ec2 instance, run
```sh
docker exec -i ec2-user_mongo_1 mongo "mongodb://localhost"
```

## Requirements
### With Docker
- docker
- docker-compose
### Without Docker
- node, npm, and mongo

## Development
### With Docker
OLD VERSION
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

  ```sh
npm run dev
  ```

  ```sh
npm run start-dev
  ```