#!/bin/bash
# This script is part 1 of setting up a docker installation of a Robinhood clone service on EC2

# $1 should be the public url of the EC2 instance you have running
publicDNS=$1

# Moves this directory onto that instance
scp -i ~/aws/Administrator-key-pair-useast1.pem -r ./instance ec2-user@$publicDNS:~/chart