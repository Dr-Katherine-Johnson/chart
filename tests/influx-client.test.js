const Influx = require('../db/influx-client');
const { fluxToJSON } = require('../controller/Utils');
const config = require('../env.config.js');
require('dotenv').config();

const connection = {
  hostname: config.SERVICE_CHART_URL,
  token: process.env.INFLUX_TOKEN,
  bucket: config.BUCKET,
  orgID: process.env.ORG_ID
}

describe('InfluxDB querying', () => {
  let fluxCSV;
  describe('query function', () => {
    it('should connect to database and receive a string', () => {
      // use the endpoint name
      return Influx.query(connection, 'ABCDE', 'change')
        .then(res => {
          return res.data;
        })
        .then(csv => {
          fluxCSV = csv;
          /**
           *  ,result,table,_value
           *  ,,0,445.81
           *  ,,0,493.71
           */
          expect(typeof csv).toBe('string');
        });
    });
  });
  describe('fuxtojson function', () => {
    it('should convert a flux annotated CSV to JSON object', () => {
      return fluxToJSON(fluxCSV)
        .then(result => {
          expect(typeof result).toBe('object');
        })
    })
  })
})