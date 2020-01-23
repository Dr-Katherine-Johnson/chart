# Chart
> Price chart microservice for a Service-oriented architecture clone of the [stock detail page from Robinhood.com](https://robinhood.com/stocks/AAPL)

## Table of Contents
- [Chart](#chart)
  - [Table of Contents](#table-of-contents)
  - [Related Projects](#related-projects)
  - [Deployment](#deployment)
    - [If Needed](#if-needed)
  - [Requirements](#requirements)
  - [Development using Docker](#development-using-docker)
    - [Mount](#mount)
    - [Dependencies](#dependencies)
    - [Develop](#develop)
    - [Run a MongoDB shell](#run-a-mongo-shell)
  - [Build](#build)
  - [API](#api)
    - [Prices](#prices)
    - [Current price](#current-price)
    - [Percent change](#percent-change)

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

## Additional Documentation

For documentation related to the database see:
- Mongoose (^5.7) https://mongoosejs.com/docs/api.html

## Requirements
- CLI like Bash
- docker
- docker-compose

## Development using Docker
Make sure you have docker running on your machine.

### Mount

- From within the root directory:

Mount an external volume where dependencies will be installed
```sh
make setup
  ```

### Dependencies

Install binary dependencies
  ```sh
make install
  ```

If you're installing new packages first start a shell in the container
running node. Find the CONTAINER_NAME corresponding with the node image with:
  ```sh
docker ps
  ```
If make install ran successfully you should see "chart_chart1". Start a shell in the container:
  ```sh
docker exec -ti chart_chart1 /bin/bash
  ```

You'll see something like:
  ```sh
root@2e3dba3578ae:/usr/src/service#
  ```

You can then install additional dependencies with the command
  ```sh
npm install PACKAGE --save
  ```
where `PACKAGE` is the name of your npm package.

### Develop
To start a development environment, use the commmand
  ```sh
make dev
  ```
This will create a bundle.js, start the server, seed the database and connect the server to the database.

For other commands see docker-compose.builder.yml and Makefile. Example:
Build webpack bundle
  ```sh
make bundle
  ```

### Run a MongoDB shell
From the root directory in your terminal, once your Mongo container is running (it should be called `chart_mongo_1`), you can run an interactive shell to query the database:
  ```sh
  docker exec -ti chart_mongo_1 mongo
  ```


## Build
- Creates a webpack bundle, Builds a docker image, and pushes it to dockerhub
```sh
npm run build
```

## API

### Prices

<table>
  <tr>
    <td>Endpoint</td>
    <td>Output</td>
    <td>Shape (JSON)</td>
    <td>Example Resonse</td>
  </tr>
  <tr>
    <td>GET /price/:ticker</td>
    <td>Returns all the prices for a ticker as objects in the prices array</td>
    <td>
      <pre lang="json">
      {
        "ticker": "APPL",
        "name": "Apple",
        "prices": [
          {
            "dateTime": "2019-11-16T22:27:19.319Z",
            "open": "264.03",
            "high": "264.40",
            "low": "264.02",
            "close": "264.35",
            "volume": "96770"
          },
          // ... about 1750 more prices
        ]
      }
      </pre>
    </td>
    <td>
      <pre lang="json">
      {
        "ticker": String,
        "name": String,
        "prices": [
          {
            "dateTime": String, // ISO 8601
            "open": Number,
            "high": Number,
            "low": Number,
            "close": Number,
            "volume": Number,
          },
          // ... about 1750 more prices
        ]
      }
      </pre>
    </td>
  </tr>
  <tr>
    <td>POST /price/:ticker</td>
    <td>Creates a ticker with corresponding prices</td>
    <td>
      body
      <pre lang="json">
      {
        "ticker": String,
        "name": String,
        "prices": [
          {
            "dateTime": String, // ISO 8601
            "open": Number,
            "high": Number,
            "low": Number,
            "close": Number,
            "volume": Number,
          },
          // ... about 1750 more prices
        ]
      }
      </pre>
    </td>
    <td>
      201 ticker saved successfully
      400 could not save
      409 trying to post a duplicate ticker
    </td>
  </tr>
</table>

### Current Price

<table>
  <tr>
    <td>Endpoint</td>
    <td>Output</td>
    <td>Shape (JSON)</td>
    <td>Example Resonse</td>
  </tr>
  <tr>
    <td>GET /current-price/:ticker</td>
    <td>Returns the last available price for that stock</td>
    <td>
      <pre lang="json">
        {
          "price": NUMBER
        }
      </pre>
    </td>
    <td>
      <pre lang="json">
        {
          "price": "264.35"
        }
      </pre>
    </td>
  </tr>
    <tr>
    <td>GET /current-price/:ticker</td>
    <td>Returns the last available price for that stock</td>
    <td>
      <pre lang="json">
        {
          "price": NUMBER
        }
      </pre>
    </td>
    <td>
      <pre lang="json">
        {
          "price": "264.35"
        }
      </pre>
    </td>
  </tr>
</table>

### Percent change

<table>
  <tr>
    <td>Endpoint</td>
    <td>Output</td>
    <td>Shape (JSON)</td>
    <td>Example Resonse</td>
  </tr>
  <tr>
    <td>GET /percent-change/:ticker</td>
    <td>Returns the percent change between the last available price and the price immediately before that (ie, the penultimate data point)</td>
    <td>
      <pre lang="json">
        {
          "percentChange": NUMBER
        }
      </pre>
    </td>
    <td>
      <pre lang="json">
        {
          "percentChange": "-0.0014"
        }
      </pre>
    </td>
  </tr>
</table>