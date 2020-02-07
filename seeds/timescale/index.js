CREATE DATABASE robinhood-price-chart;
\c robinhood-price-chart
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

// # import the table schemas
psql -U postgres -d robinhood-price-chart -h localhost < chart.sql

// # import data
psql -U postgres -d robinhood-price-chart -h localhost -c "\COPY tickers FROM tickers.csv CSV"
psql -U postgres -d robinhood-price-chart -h localhost -c "\COPY prices FROM prices.csv CSV"