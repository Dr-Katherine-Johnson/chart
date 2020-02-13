# Using Docker to start up TimeScale
# start up the container, create database
docker run -d --name timescaledb -p 5432:5432 -e POSTGRES_PASSWORD=robin POSTGRES_DB robinhood_price_chart timescale/timescaledb:latest-pg11
# get a postgres shell
docker exec -it timescaledb psql -U postgres
# IMPORT TABLE SCHEMA
docker cp ./chart.sql timescaledb:/chart.sql
docker exec -it timescaledb psql -U postgres -a robinhood_price_chart -f /chart.sql
# import data
docker cp ./tickers.csv timescaledb:/tickers.csv
docker cp ./prices.csv timescaledb:/prices.csv
docker exec -it timescaledb psql -U postgres -d robinhood_price_chart -h localhost -c "\COPY tickers FROM tickers.csv CSV"
docker exec -it timescaledb psql -U postgres -d robinhood_price_chart -h localhost -c "\COPY prices FROM prices.csv CSV"
# to access the database
docker exec -it timescaledb psql -U postgres -a robinhood_price_chart