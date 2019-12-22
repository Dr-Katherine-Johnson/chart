# Execute this file once once docker is installed
docker-compose up -d
# TODO: workaround because docker-compose doesn't seem to be executing multiple shell commands in one line ...
# docker exec -d chart_chart_1 node seeds/start.js
docker exec ${MACHINE_NAME}_chart_1 node seeds/start.js