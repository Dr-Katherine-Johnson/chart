# Execute this file once once docker is installed
docker-compose up -d
# TODO: workaround because docker-compose doesn't seem to be executing multiple shell commands in one line ...
# docker exec -d chart_chart_1 node seeds/start.js
docker exec ec2-user_chart_1 node seeds/start.js
# TODO: the ec2 instance seems to hang when running this file
# http requests in the browser that worked, now hang, after attempting to run the seeding script, but before the console.log's that the seeding script finished fire
# jumpy keyboard response in the ec2 instance, after running the seed script??
exit