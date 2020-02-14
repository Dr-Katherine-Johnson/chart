// the child_process allows us to execute commands
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// prevents backpressuring when writing to stream as there are a max number of bytes
// that can be stored inside a writeable stream's internal buffer
// see nodejs.org/api/stream.html#stream_even_drain
const write = function (writer, data) {
  return new Promise((resolve) => {
    if (!writer.write(data)) {
      // returns a promise when we get a drain, await will need to be called
      writer.once('drain', resolve)
    } else {
      resolve();
    }
  })
};
const deleteFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}
// copies a file into the container
const dockerCopy = (filename) => {
  const dockerCP = spawn('docker', ['cp', path.join(__dirname, `${filename}`), `timescaledb:/${filename}`]);
  // TO DO : what is all this info! => console.log(dockerCP);
  return new Promise((resolve, reject) => {
      dockerCP.on('exit', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(code);
        }

      });
  });
};
// load a schema onto timescale running on docker
const dockerTSDBLoadSchema = (schema) => {
  const dockerExec = spawn('docker', ['exec', 'timescaledb', 'psql', '-U', 'postgres', '-a', 'robinhood_price_chart', '-f',`\/${schema}`]);
  return dockerCopy(schema)
    .then(done => {
      return new Promise((resolve, reject) => {
        dockerExec.on('exit', (code) => {
          if (code === 0) {
            resolve(code);
          } else {
            reject(code);
          }
        });
      });
    })
    .catch(err => console.log(err))
};


module.exports = { write, dockerCopy, dockerTSDBLoadSchema, deleteFile };

