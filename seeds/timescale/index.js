// TODO test bash script and run using child_process module
const { exec } = require('child_process');
var script = exec('sh seed.sh', (err, stdout, stderr) => {
  if (err) {
    console.log(`exec error: ${err}`);
  }
  console.log(stdout);
  console.log(stderr);
})