require('dotenv').config();
const config = require('./env.config.js');
// caching
const cachingURL = config.MEMCACHED_URL;
const Memcached = require('memcached');
// start up the client
const memcached = new Memcached(cachingURL);
// connect to memcached
memcached.connect(cachingURL, (err, conn) => {
  if (err) {
    console.log(`${conn.server} Error while connecting: ${err}`);
  } else {
    console.log('connected to memcached');
  }
});

// takes a duration in min for how long the cache should live in memory
// returns a middleware function
let memCachedMiddleware = (duration) => {
  return (req, res, next) => {
    // our keys will be related to the tickers
    let key = '__chart__' + req.params.ticker;
    console.log(key);
    // check if they are in the cache
    memcached.get(key, function(err, data) {
      if (err) {
        console.log('ERROR GETTING FROM CACHE: ', err);
      }
      if (data) {
        console.log('in cache');
        // if so send it back in the response, no need to process the request
        res.send(data);
        return;
      } else {
        console.log('not in cache processing request');
        // otherwise, process the request, wait for the database response
        res.status(200).sendResponse = res.status(200).send;
        res.status(200).send = (body) => {
          // make sure the request is stored in our cache
          console.log('caching response');
          memcached.set(key, body, (duration * 60), function(err, res) {
            if (err) {
              console.log('ERROR: ', err);
            }
            console.log('NO ERROR: ', res);
          });
          // before the response is sent to the user
          res.status(200).sendResponse(body);
        };
        next();
      }
    });
  };
};

module.exports = { memCachedMiddleware };
