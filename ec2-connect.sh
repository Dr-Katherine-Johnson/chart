#!/bin/bash
# This script is part 3 of setting up a docker installation of a Robinhood clone service on EC2

# $1 should be the public url of the EC2 instance you have running
publicDNS=$1

# Connects to the instance using SSH (ie, something like this ...)
# ssh -i ~/aws/Administrator-key-pair-useast1.pem ec2-user@EC2_INSTANCE_URL_GOES_HERE
ssh -i ~/aws/Administrator-key-pair-useast1.pem ec2-user@$1