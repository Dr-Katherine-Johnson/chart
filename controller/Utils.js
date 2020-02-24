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

module.exports.percentChange = (array) => {
  const lastPrice = array[1]._value;
  const prevPrice = array[0]._value;
  let percentChange = (lastPrice - prevPrice) / prevPrice;
  if (isNaN(percentChange)) {
    percentChange = 0;
  }
  return percentChange.toFixed(4);
}