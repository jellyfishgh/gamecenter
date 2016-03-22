var router = require('koa-router')();
var redis = require('redis');
var coRedis = require('co-redis');

var client = redis.createClient({
    port: 6379,
    host: '127.0.0.1'
});
client.on('error', function(err) {
    console.log('Error: ' + err);
});

var coDb = coRedis(client);

router.get('/', function*(next) {
    yield this.render('pages/redis', {
        "title": 'redis',
        "thisYear": new Date().getFullYear(),
        "foo": yield coDb.get('foo')
    });
});

module.exports = router;
