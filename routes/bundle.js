var router = require('koa-router')();

var browserify = require('browserify');
var literalify = require('literalify');

router.get('/', function*(next) {
    this.type = 'text/javascript;charset=utf-8';
    this.body = browserify().add('./routes/browser.js').transform(literalify.configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM'
    })).bundle();
});

module.exports = router;
