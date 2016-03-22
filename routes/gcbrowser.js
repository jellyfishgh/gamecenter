var router = require('koa-router')();
var browserify = require('browserify-middleware');
// https://github.com/ForbesLindesay/browserify-middleware

router.get('/', function*(next) {
    var gameBanners = ["sw", "mx", "d10"];
    yield this.render('pages/gcbrowser', {
        "title": "gamecenter",
        "gbs": gameBanners,
        "thisYear": (new Date()).getFullYear()
    });
});

module.exports = router;
