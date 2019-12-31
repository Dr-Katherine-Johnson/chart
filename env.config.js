// TODO: which / all of these get provided by the ec2 instance??
let obj = {
  DATABASE_NAME: 'robinhood',
  SERVICE_API_PORT: `4444`
};

if (process.env.NODE_ENV === 'production') {
  obj = Object.assign({}, obj, {
    DATABASE_URL: 'mongodb://database',
    // TODO: how to get environment variables into the front end code??
    // TODO: I only know this when the actual code is deployed on an AWS server??
    SERVICE_API_URL: process.env.SERVICE_API_URL,
  });

} else {
  obj = Object.assign({}, obj, {
    DATABASE_URL: `mongodb://localhost`,
    SERVICE_API_URL: `http://localhost`,
  });
}

module.exports = obj;

// 2 (3?) sets of env variables depending on whether this is running in development, production on my AWS numbers, or is being deployed on someone else's AWS account
// reads the value of NODE_ENV from the shell environment