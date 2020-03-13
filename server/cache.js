require('dotenv').config();
const config = require('../env.config.js');
// caching
const cachingURL = config.MEMCACHED_URL;
const Memcached = require('memcached');
const memcached = new Memcached();
memcached.connect(cachingURL, (err, conn) => {
  if (err) {
    console.log(`${conn.server} Error while connecting: ${err}`);
  }
});

let memCachedMiddleware = (duration) => {
  return (req, res, next) => {
    
  }
}

module.exports = { memCachedMiddleware };
