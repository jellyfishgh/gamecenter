var router = require('koa-router')();

router.get('index', generator);
router.get('/', generator);

function* generator(next) {
    var n = this.session.views || 0;
    this.session.views = ++n;
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
        "count": this.session.views,
        "thisYear": (new Date()).getFullYear()
    });
}

module.exports = router;
