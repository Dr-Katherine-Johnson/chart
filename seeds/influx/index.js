// import Client from '@influxdata/influx';
// turns out this client is only for the browser
// (node:15610) UnhandledPromiseRejectionWarning: ReferenceError: XMLHttpRequest is not defined
// https://github.com/influxdata/influxdb-client-js/issues/140
// TODO write a new way to seed the database
const { Client } = require('@influxdata/influx');
const seed = require('./seed.js');

// how to update the environment variables for different databases?
const token = process.env.INFLUXDB_TOKEN
const client = new Client('http://127.0.0.1:9999/api/v2', token)

// here is where we have data in Line protocol string
const measurement = 'prices';
// here we are hard-coding the data?
const records = 1;
// const data = seed.getLineProtocolString(measurement,records);
const data = 'prices,ticker=ABC,name=Leannon\ -\ Harris  open=155.81,high=160.14,low=151.39,close=155.48,volume=244217, 1580203800000000000';
const bucket = 'robinhood-chart'
// should the orgID go into .env?
const orgID = '66c5cd13f69410bd'

// QUESTION: Would you still have to batch the data? -> see Docs:
// https://v2.docs.influxdata.com/v2.0/write-data/best-practices/optimize-writes/#batch-writes
client.write.create(orgID, bucket, data)