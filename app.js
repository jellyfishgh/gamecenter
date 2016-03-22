var koa = require('koa');
var logger = require('koa-logger');
var router = require('koa-router')();
var json = require('koa-json');
var views = require('koa-views');
var parser = require('koa-bodyparser');
var onerror = require('koa-onerror');
var koastatic = require('koa-static');
var path = require('path');

var app = koa();

var index = require('./routes/index');
var server = require('./routes/server');
var rsrServer = require('./routes/rsrServer');
var redis = require('./routes/redis');
var gcbrowser = require('./routes/gcbrowser');
var gcserver = require('./routes/gcserver');

app.use(views('views', {
    root: path.join(__dirname, 'views'),
    default: 'ejs'
}));
app.use(parser());
app.use(json());
app.use(logger());
app.use(koastatic(path.join(__dirname, 'public')));

router.use('/index', index.routes(), index.allowedMethods());
router.use('/server', server.routes(), server.allowedMethods());
router.use('/rsrServer', rsrServer.routes(), rsrServer.allowedMethods());
router.use('/redis', redis.routes(), redis.allowedMethods());
router.use('/gcbrowser', gcbrowser.routes(), gcbrowser.allowedMethods());
router.use('/gcserver', gcserver.routes(), gcserver.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.on('error', function(err, ctx) {
    console.log('server error', err, ctx);
});

var port = 3000;
app.listen(port);
console.log('app listenning at port: ' + port);
