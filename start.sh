# Execute this file once once docker is installed
docker-compose up -d
# TODO: workaround because dockerthe npm run start-docker doesn't seem to be running the seeding script ...
# docker exec ${MACHINE_NAME}_chart_1 node seeds/start.js
docker exec -d chart_chart_1 node seeds/start.js