// Simple client to connect to influxDB database v2 does not have a node client
const axios = require('axios');

/**
 *
 * @param {String} hostname indicates the url where influxDB api is located, if hosted locally this would be http://localhost => http://localhost:9999/api/v2
 *
 * @param {String} token the token authenticates the request and should be located in an .env file
 *
 * @param {Object} options should be {bucket: 'BUCKET_NAME', orgID: 'ID', precision: 'ns|ms|s'} if precision is not specified it will assume ms by default since this is the type given by JavaScript .getTime method
 * @param {String} data should follow line protocol syntax as well as best practices
 *
 * @returns {Promise} with the result of writing the point to influxDB
 *
 * ex:
 * http://localhost:9999/api/v2/write?org=66c5cd13f69410bd&bucket=robinhood-chart&precision=ms
 *
 */

module.exports = {
  writePoints(hostname, options, token, data) {
    const { bucket, orgID, precision } = options;
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
  query(token, endpoint, ticker) {

  }
}