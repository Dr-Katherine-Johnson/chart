# create the csv files
node seed.js

# Using Docker
# start up the container
docker run -d --name timescaledb -p 127.0.0.1:5432:5432 timescale/timescaledb:latest-pg11
# get a postgres shell
docker exec -it timescaledb psql -U postgres
# create database then quit
CREATE DATABASE robinhood_price_chart;
\q
# IMPORT TABLE SCHEMA
docker cp ./chart.sql timescaledb:/chart.sql
docker exec -it timescaledb psql -U postgres -a robinhood_price_chart -f /chart.sql
# import data
docker cp ./tickers.csv timescaledb:/tickers.csv
docker cp ./prices.csv timescaledb:/prices.csv
docker exec -it timescaledb psql -U postgres -d robinhood_price_chart -h localhost -c "\COPY tickers FROM tickers.csv CSV"
docker exec -it timescaledb psql -U postgres -d robinhood_price_chart -h localhost -c "\COPY prices FROM prices.csv CSV"
# to access the database
# docker exec -it timescaledb psql -U postgres -a robinhood_price_chart

# Without docker, working in the timescale directory
# CREATE DATABASE robinhood_price_chart;
# \c robinhood_price_chart
# CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
# # import the table schemas
# psql -U postgres -d robinhood_price_chart -h localhost < chart.sql
# import data
# psql -U postgres -d robinhood_price_chart -h localhost -c "\COPY tickers FROM tickers.csv CSV"
# psql -U postgres -d robinhood_price_chart -h localhost -c "\COPY prices FROM prices.csv CSV"