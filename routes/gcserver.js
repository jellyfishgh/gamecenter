var router = require('koa-router')();

router.get('/', function*(next){
    this.body = yield "hello world";
});

module.exports = router;
