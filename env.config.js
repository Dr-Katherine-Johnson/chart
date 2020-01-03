let obj = {
  DATABASE_NAME: 'robinhood',
  SERVICE_API_PORT: `4444`,
  DATABASE_URL: `mongodb://localhost`,
  SERVICE_API_URL: `http://localhost`,
};

if (process.env.NODE_ENV === 'production') {
  obj = Object.assign({}, obj, {
    DATABASE_URL: 'mongodb://database',
    // the client will the get deployed url from the browser, as it's running
    SERVICE_API_URL: null,
  });
}

module.exports = obj;