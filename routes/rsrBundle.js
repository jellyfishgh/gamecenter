var router = require('koa-router')();

var browserify = require('browserify');
var literalify = require('literalify');

module.exports = function*(next) {
    this.type = "text/javascript;charset=utf-8";
    this.body = browserify().add('./routes/rsrBrowser.js').transform(literalify.configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM'
    })).bundle();
};
