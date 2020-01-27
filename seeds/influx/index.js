const Client = require('@influxdata/influx');
const data = require('./seed.js');

// how to update the environment variables for different databases?
const token = process.env.INFLUXDB_TOKEN
const client = new Client('http://127.0.0.1:9999/api/v2', token)

// here is where we have data in Line protocol string
const measurement = 'prices';
const data = data.getLineProtocolString(measurement,100);
const bucket = 'robinhood-chart'
// should the orgID go into .env?
const orgID = '66c5cd13f69410bd'

// QUESTION: Would you still have to batch the data?
client.write.create(orgID, bucket, data)