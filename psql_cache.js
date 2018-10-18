var redis = require('redis');
var client = redis.createClient(6379, 'ec2-18-234-176-211.compute-1.amazonaws.com');

client.on('error', function(err) {
  console.error(err);
});

client.on('connect', function() {
  console.log('Connected to Redis Client');
});

module.exports = client;