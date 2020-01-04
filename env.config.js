let obj = {
  DATABASE_URL: `mongodb://localhost`,
  DATABASE_NAME: 'robinhood',
  SERVICE_CHART_URL: `http://localhost`,
  SERVICE_CHART_PORT: `4444`,
};

if (process.env.NODE_ENV === 'production') {
  obj = Object.assign({}, obj, {
    DATABASE_URL: 'mongodb://database',
    SERVICE_CHART_URL: process.env.SERVICE_CHART_URL
  });
}

module.exports = obj;