const csv = require('csvtojson');

module.exports.fluxToJSON = (fluxCSV) => {
  return csv({checkType: true, ignoreEmpty: true, ignoreColumns: /(result|table)/})
    .fromString(fluxCSV)
    .then(jsonObj => jsonObj)
    .catch(err => console.log(err));
}

module.exports.isEmpty = (csv) => {
  return /^\r\n$/.test(csv);
}