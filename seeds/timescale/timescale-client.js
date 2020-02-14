const { Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const path = require('path');

const timescale = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'robin',
  database: 'robinhood_price_chart',
});

timescale
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

const loadCSV = function(table, idx) {
  let inputFile = path.join(__dirname, `${table}.csv`);
  let stream = timescale.query(copyFrom(`COPY ${table} FROM STDIN CSV`));
  let fileStream = fs.createReadStream(inputFile);
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
