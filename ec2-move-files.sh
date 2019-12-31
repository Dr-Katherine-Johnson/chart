#!/bin/bash
# This script is part 1 of setting up a docker installation of a Robinhood clone service on EC2

# $1 should be the public url of the EC2 instance you have running
publicDNS=$1

# Moves these 5 files onto that instance
scp -i ~/aws/Administrator-key-pair-useast1.pem ./docker-compose.yml ./.env ./ec2-install.sh ./ec2-connect.sh ./ec2-move-files.sh ec2-user@$publicDNS:~