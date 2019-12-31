// TODO: which / all of these get provided by the ec2 instance??
module.exports = {
  // changed from 127.0.0.1 to database b/c it's being used with docker-compose
  // DATABASE_URL: process.env.DATABASE_URL || `mongodb://database`,
  DATABASE_URL: process.env.DATABASE_URL || `mongodb://localhost`,
  DATABASE_NAME: process.env.DATABASE_NAME || `robinhood`,
  // TODO: how to get environment variables into the front end code??
  SERVICE_API_URL: process.env.SERVICE_API_URL || `http://localhost`,
  SERVICE_API_PORT: process.env.SERVICE_API_PORT || `4444`
};

// 2 (3?) sets of env variables depending on whether this is running in development, production on my AWS numbers, or is being deployed on someone else's AWS account
// reads the value of NODE_ENV from the shell environment

// a new comment