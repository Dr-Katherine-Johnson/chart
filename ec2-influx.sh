# this script installs influxdb v2 on an ec2 instance, and setups the org + bucket + retention

# Install influxdb v2
wget URL
tar -zxvf .tar_FILE

# Copy the influx and influxd binary to your $PATH
sudo cp influxdb_2.0.0-beta.5_linux_amd64/{influx,influxd} ./

# Start influxdb
./influxd