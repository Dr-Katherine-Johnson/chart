// TODO: which / all of the se get provided by the ec2 instance??
module.exports = {
  PORT: process.env.port || 4444,
  // TODO: changed from 127.0.0.1 to database b/c it's being used with docker-compose
  DATABASE_URL: `mongodb://database`,
  // DATABASE_PORT: `27017`, // unneeded because using docker-compose ??
  DATABASE_NAME: `robinhood`,
  SERVICE_API_URL: `http://localhost`,
  SERVICE_API_PORT: `4444`
};