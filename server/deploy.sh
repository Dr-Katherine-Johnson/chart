#!/bin/bash
# This script sets up a docker-compose installation of the chart service of a Robinhood clone on EC2

pathToServerPEM=$1
serverInstance=$2
install=${3:-0} # defaults to 0

# Create the chart directory if it doesn't exist
ssh -i $pathToServerPEM ec2-user@$serverInstance 'mkdir -p chart'

# Moves these files onto that instance
scp -i $pathToServerPEM ./docker-compose.yml .env ec2-user@$serverInstance:~/chart

# This section should only be run once per instance
if test $install -eq 1
then
  # Moves the install script onto the instance
  scp -i $pathToServerPEM ./ec2-install.sh ec2-user@$serverInstance:~

  # Runs the file ec2-install.sh (that you just moved to the instance), on that instance
  ssh -i $pathToServerPEM ec2-user@$serverInstance bash ec2-install.sh
fi