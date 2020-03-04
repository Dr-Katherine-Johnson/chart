// Simple client to connect to influxDB database v2 does not have a node client
const axios = require('axios');

 /**
  * Base class to connect to influx, takes in an authentication object with
  * @param {object} authentication — An object where the keys are the hostname, orgId, and authenticating token
  */

// TODO refactor client to es6 class syntax?
// class Client {
//   constructor(authentication) {
//     this.authentication = authentication;
//   }
// }

/**
 * Class to create the flux queries we need for the API
 */
class fluxQuery {
  constructor(bucket, ticker) {
    this.source = `from(bucket:"${bucket}")`;
    this.start = '|> range(start:2019-08-19)';
    this.fluxquery = {
      name: `|> filter(fn: (r) => r._measurement == "prices" and r.ticker == "${ticker}")|> group(columns: ["name"])|> distinct(column: "name")|> keep(columns: ["_value"])`,
      prices: `|> filter(fn: (r) => r._measurement == "prices" and r.ticker == "${ticker}")|> group()|> keep(columns: ["_time", "_value","_field"])|> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")|> map(fn: (r) => ({ dateTime: r._time, open: r.open, high: r.high, low: r.low, close: r.close, volume: r.volume }))`,
      last: `|> filter(fn: (r) => r._measurement == "prices" and r.ticker == "${ticker}" and r._field == "close")|> keep(columns: ["_value"])|> last()`,
      change: `|> filter(fn: (r) => r._measurement == "prices" and r.ticker == "${ticker}" and r._field == "close")|> tail(n:2)|> keep(columns: ["_value"])`
    }
  }
  createQuery(endpoint) {
    return `${this.source}${this.start}${this.fluxquery[endpoint]}`;
  }
}

module.exports = {
  /**
   * @param {Object} connection
   *
   * const connection = {
      hostname: config.SERVICE_CHART_URL,
      token: process.env.INFLUX_TOKEN,
      bucket: config.BUCKET,
      orgID: process.env.ORG_ID,
      precision: 'ms'
    }
   *
   * hostname —indicates the url where influxDB api is located, if hosted locally this would be http://localhost => http://localhost:9999/api/v2
   *
   * token — the token authenticates the request and should be located in an .env file
   *
   * precision: 'ns|ms|s' if precision is not specified it will assume ms by default since this is the type given by JavaScript .getTime method
   * @param {String} data should follow line protocol syntax as well as best practices
   *
   * @returns {Promise} with the result of writing the point to influxDB
   *
   * ex:
   * http://localhost:9999/api/v2/write?org=66c5cd13f69410bd&bucket=robinhood-chart&precision=ms
   *
   */
  writePoints(connection, data) {
    const { hostname, token, bucket, orgID, precision } = connection;
    var writeInfluxURL = `${hostname}:9999/api/v2/write?org=${orgID}&bucket=${bucket}&precision=${precision}`;
    return axios.post(writeInfluxURL, data, {headers: {
        'Authorization': `Token ${token}`,
        'Content-type': 'text/plain'
      }})
      .then(res => {
        return res;
      })
      .catch(err => console.log(err));
  },
  /**
   * @param {String} ticker indicates the ticker for which we want to get data
   * @param {String} endpoint — corresponds to: name, prices, last, or change
   */
  query(connection, ticker, endpoint) {
    const { hostname, token, orgID, bucket } = connection;
    const queryInfluxURL = `${hostname}:9999/api/v2/query?org=${orgID}`;
    const query = new fluxQuery(bucket, ticker);
    return axios.post(queryInfluxURL, query.createQuery(endpoint), {headers: {
        'Authorization': `Token ${token}`,
        'Accept': 'application/csv',
        'Content-type': 'application/vnd.flux'
      }})
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err;
      })
  }
}
