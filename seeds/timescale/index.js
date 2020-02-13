const { seedTSDB } = require('./timescale-seed.js');
const { dockerTSDBLoadSchema } = require('./seedUtils.js');

// After starting up the container
// Create database
// load the schema
dockerTSDBLoadSchema('chart.sql');
// seed database
seedTSDB(200);

