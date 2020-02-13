const { Client } = require('pg');
const { copyFrom } = require('pg-copy-streams');

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

const loadDataToTable = (inputFile, targetTable) => {
  const execute = (target) => {
    return new Promise((resolve, reject) => {
      timescale.query(`Truncate ${target}`, (err) => {
        if (err) {
          timescale.end();
          reject(err);
        } else {
          console.log(`Truncated ${target}`)
          resolve(target);
        }
      })
    })
  }
  return execute(targetTable)
    .then(done => {
      return new Promise((resolve, reject) => {
        var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN`))
        var fileStream = fs.createReadStream(inputFile)
        fileStream.on('error', (error) =>{
            console.log(`Error in creating read stream`)
            reject(error);
        })
        stream.on('error', (error) => {
            console.log(`Error in creating stream`)
            reject(error);
        })
        stream.on('end', () => {
            console.log(`Completed loading data into ${targetTable}`)
            client.end()
            resolve();
        })
        fileStream.pipe(stream);
      })
    })
    .catch((err) => {
      return console.log(`Error: ${err}`;
    });
  })
}

module.exports = { timescale, loadDataToTable };
