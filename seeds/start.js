// TO DO: provide a way to choose a database through environment variables?
const config = require('../env.config.js');

const mongoseed = require('./mongo-seed.js');
console.log('evaluating seeds/start.js');
seed.seedDatabase();