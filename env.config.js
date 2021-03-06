let obj = {
  DATABASE_URL: `mongodb://localhost`,
  DATABASE_NAME: 'robinhood-price-chart',
  SERVICE_CHART_URL: `http://localhost`,
  SERVICE_CHART_PORT: `4444`,
};

if (process.env.NODE_ENV === 'production') {
  obj = Object.assign({}, obj, {
    DATABASE_URL: 'mongodb://database',
    SERVICE_CHART_URL: process.env.SERVICE_CHART_URL
  });
}

if (process.env.NODE_ENV === 'development') {
  obj = Object.assign({}, obj, {
    DATABASE_URL: 'mongodb://database',
  });
}

module.exports = obj;