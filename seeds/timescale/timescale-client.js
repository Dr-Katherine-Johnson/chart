// timescale is an extension of posgtres so we can connect using a postgres client
const { Client } = require('pg');
// this library allows us to use the COPY command from SQL for postgres
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const path = require('path');

const timescale = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'robin', // should probably go into .env file
  database: 'robinhood_price_chart', // database needs to be created before we can connect
});

timescale
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

const loadCSV = function(table, file, idx) {
  let stream = timescale.query(copyFrom(`COPY ${table} FROM STDIN CSV`));
  let fileStream = fs.createReadStream(file);
  return new Promise((resolve, reject) => {
    fileStream.on('error', (error) =>{
      console.log(`Error in reading file: ${error}`);
      reject(error);
    })
    stream.on('error', (error) => {
        console.log(`Error in copy command: ${error}`);
      reject(error);
    })
    stream.on('end', () => {
        console.log(`Completed loading data${idx ? ` up to ${idx} idx` : ''} into ${table}`);
        resolve();
    })
    fileStream.pipe(stream);
  });
};

module.exports = { timescale, loadCSV };
