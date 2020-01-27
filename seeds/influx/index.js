import Client from '@influxdata/influx';
import data from './seed.js';

// how to update the environment variables for different databases?
const token = process.env.INFLUXDB_TOKEN
const client = new Client('http://127.0.0.1:9999/api/v2', token)

// here is where we have data in Line protocol string
// QUESTION: Would you still have to batch the data?
const data = ''
const bucket = 'robinhood-chart'
// should the orgID go into .env?
const orgID = '66c5cd13f69410bd'

client.write.create(orgID, bucket, data)