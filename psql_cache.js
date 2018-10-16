var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
  console.error(err);
});

client.on('connect', function() {
  console.log('Connected to Redis Client');
});

// client.get('my test key', function(error, result) {
//   if (error) console.error(error);
//   console.log('GET result ->', result);
// });
module.exports = client;