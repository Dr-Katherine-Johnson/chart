const Influx = require('../db/influx-client');
const config = require('../env.config.js');
const dotenv = require('dotenv');
dotenv.config();

const connection = {
  hostname: config.SERVICE_CHART_URL,
  token: process.env.INFLUX_TOKEN,
  bucket: config.BUCKET,
  orgID: process.env.ORG_ID
}

describe('InfluxDB querying', () => {
  describe('query function', () => {
    it('should connect to database and receive a string', () => {
      // use the endpoint name
      return Influx.query(connection, 'ABCDE', 'name')
        .then(res => {
          return res.data;
        })
        .then(csv => {
          expect(typeof csv).toBe('string');
        })
    });
  })
})