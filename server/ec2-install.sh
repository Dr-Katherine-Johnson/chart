#!/bin/bash
# This script is part 2 of setting up a docker installation of a Robinhood clone service on EC2. This script should be invoked in the EC2 instance.

# Installs docker
sudo yum update -y
sudo yum install -y docker

# Starts the docker service
sudo service docker start

# Adds the ec2-user to the docker group so you can execute docker commands without using sudo
sudo usermod -a -G docker ec2-user

# Installs docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null

# Adjusts permissions
sudo chmod +x /usr/local/bin/docker-compose