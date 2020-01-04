#!/bin/bash
# This script controls whether we're docker-compose -ing up or down ...

pathToPEM=$1
instance=$2
compose=${3:-0} # defaults to 0

if test $compose -eq 0
then
  # Starts the docker containers
  ssh -i $pathToPEM ec2-user@$instance 'cd chart && docker-compose up'
else
  # Stops the docker containers
  ssh -i $pathToPEM ec2-user@$instance 'cd chart && docker-compose down -v --rmi all'
fi
