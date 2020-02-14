const { seedTSDB } = require('./timescale-seed.js');
const { dockerTSDBLoadSchema, deleteFile } = require('./seedUtils.js');
const path = require('path');
const fs = require('fs');


// After starting up the container
// Create database
// load the schema
// dockerTSDBLoadSchema('chart.sql');
// seed database
seedTSDB(1000);



