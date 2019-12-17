console.log('beginning of seeds/start.js');
const seed = require('./seed.js');
console.log('evaluating seeds/start.js');
seed.seedDatabase();
// TODO: why does the second half of the start-docker command not evaluate in docker-compose??
// workaround is using docker exec chart_chart_1 node server/server.js