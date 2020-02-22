const { seedTSDB } = require('./timescale-seed.js');
const { dockerTSDBLoadSchema, deleteFile } = require('./seedUtils.js');
const path = require('path');
const fs = require('fs');


// Start up the container
// Create database
// load the schema
dockerTSDBLoadSchema('chart.sql');
// seed database
seedTSDB(1350000);

// Can be converted to a docker-compose if this database is chosen


