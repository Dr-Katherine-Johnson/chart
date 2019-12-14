// TODO: which / all of the se get provided by the ec2 instance??
module.exports = {
  PORT: process.env.port || 4444,
  DATABASE_URL: `mongodb://127.0.0.1`,
  DATABASE_PORT: `27017`,
  DATABASE_NAME: `robinhood`,
  SERVICE_API_URL: `http://localhost`,
  SERVICE_API_PORT: `4444`
};