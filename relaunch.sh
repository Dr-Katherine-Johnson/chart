#!/bin/bash
# Script that runs everytime watchman-make detects a change (ie, here is where docker-compose can be restarted when a change is detected in the source files...)
echo 'executing relaunch.sh...'
echo 'Stopping the docker containers...'
docker-compose down
echo 'Restarting the docker containers...'
docker-compose up -d
# TODO: This is currently a bit of a pain, as it causes the database to reseed on every save while developing ...