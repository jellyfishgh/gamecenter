var router = require('koa-router')();

router.get('/', generator);

function* generator(next) {
    var links = [
        "index",
        "server",
        "rsrServer",
        "redis",
        "gcbrowser",
        "gcserver"
    ];
    yield this.render('pages/index', {
        "title": "index",
        "links": links,
        "thisYear": (new Date()).getFullYear()
    });
}

module.exports = router;
