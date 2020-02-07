DROP EXTENSION IF EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS timescaledb;

DROP TABLE IF EXISTS "tickers";
CREATE TABLE "tickers"(
  ticker TEXT,
  company TEXT,
)

DROP TABLE IF EXISTS "prices";
CREATE TABLE "prices"(
  ticker TEXT NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  open_price NUMERIC,
  high NUMERIC,
  low NUMERIC,
  close_price NUMERIC,
  volume NUMERIC,
);
-- Specifically timescaleDB
-- This creates a hypertable that is partitioned by time and ticker
-- Since this specifies an optional "space partition" in addition to time
-- TimescaleDB will automatically create the following index:
-- CREATE INDEX ON prices (date_time DESC, ticker);
SELECT create_hypertable('prices', 'date_time', 'ticker', 1);

