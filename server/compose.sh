#!/bin/bash
# This script controls whether we're docker-compose -ing up or down ...

pathToServerPEM=$1
serverInstance=$2
compose=${3:-0} # defaults to 0

if test $compose -eq 0
then
  # Starts the docker containers
  ssh -i $pathToServerPEM ec2-user@$serverInstance 'cd chart && docker-compose up'
else
  # Stops the docker containers
  ssh -i $pathToServerPEM ec2-user@$serverInstance 'cd chart && docker-compose down -v --rmi all'
fi
