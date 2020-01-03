#!/bin/bash
# This script is part 1 of setting up a docker installation of a Robinhood clone service on EC2

instance=$1
pathToPEM=$2
first=${3:-0} # defaults to 0

# Moves this directory onto that instance
scp -i $pathToPEM -r ./instance ec2-user@$instance:~/chart

# This section should only be run once per instance
if test $first -eq 1
then
  # Moves the install script onto the instance
  scp -i $pathToPEM ./ec2-install.sh ec2-user@$instance:~

  # Runs the file ec2-install.sh (that you just moved to the instance), on that instance
  ssh -i $pathToPEM ec2-user@$instance bash ec2-install.sh
fi

# Starts the docker container
ssh -i $pathToPEM ec2-user@$instance 'cd chart && docker-compose up'