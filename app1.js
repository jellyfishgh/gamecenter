var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var koa = require('koa');

var app = koa();
app.keys = ['keys', 'keykeys'];
app.use(session({
    store: redisStore()
}));

app.use(function* () {
    console.log(this.path);
    switch (this.path) {
        case '/get':
            get.call(this);
            break;
        case '/remove':
            remove.call(this);
            break;
        case '/regenerate':
            yield regenerate.call(this);
            break;
    }
});

function get() {
    var session = this.session;
    session.count = session.count || 0;
    session.count++;
    this.body = session.count;
}

function remove() {
    this.session = null;
    this.body = 0;
}

function* regenerate() {
    get.call(this);
    yield this.regenerateSession();
    get.call(this);
}

var port = 8080;
app.listen(port);
console.log('server listen at ' + port);