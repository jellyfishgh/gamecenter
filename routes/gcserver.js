var router = require('koa-router')();

router.get('/', function* (next) {
    this.body = yield function* () {
        return "hello world";
    }
});

module.exports = router;