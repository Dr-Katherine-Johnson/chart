const csv = require('csvtojson');

module.exports.fluxToJSON = (fluxCSV) => {
  return csv({ignoreEmpty: true, ignoreColumns: /(result|table)/})
    .fromString(fluxCSV)
    .then(jsonObj => jsonObj)
    .catch(err => console.log(err));
}