let obj = {
  BUCKET: 'robinhood-chart',
  SERVICE_CHART_PORT: `4444`,
  SERVICE_CHART_URL: process.env.SERVICE_CHART_URL,
  MEMCACHED_URL: `memcached://localhost:11211`,
};
// console.log(obj);
module.exports = obj;