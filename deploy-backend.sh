#!/bin/bash
# This script sets up the chart API with the database
pathToDBPEM=$1
dbInstance=$2
pathToServerPEM=$3
serverInstance=$4
influxToken=$5
bucketName=$6
install=${3:-0} # defaults to 0

# Create the chart directory if it doesn't exist
ssh -i $pathToServerPEM ec2-user@$serverInstance 'mkdir -p chart'

# Moves the docker compose files that will create the server onto that instance
# scp -i $pathToPEM ./docker-compose.server.yml .env ec2-user@$instance:~/chart

# This section should only be run once per instance
if test $install -eq 1
then
  # For the database we'll have to install the database
  # Moves the influx install script onto the instance
  scp -i $pathToDBPEM ./ec2-influx.sh ec2-user@$dbInstance:~
  # Runs the file database install (that you just moved to the instance), on that instance
  ssh -i $pathToDBPEM ec2-user@$dbInstance bash ec2-influx.sh
  # Setup the database
  ssh -i $pathToDBPEM ec2-user@$dbInstance './influx setup -f -u robin -p stocks -b robinhood-chart -o dr-katherine-johnson -r 5000h -t INFLUX_TOKEN'
  # On the server we'll have to install docker
  # Moves the docker install script onto the server instance
  scp -i $pathToServerPEM ./ec2-install.sh ec2-user@$serverInstance:~
  # Runs the file ec2-install.sh (that you just moved to the instance), on that instance
  ssh -i $pathToServerPEM ec2-user@$serverInstance bash ec2-install.sh
fi