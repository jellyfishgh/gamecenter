var router = require('koa-router')();

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var rsrRouter = require('./rsrRouter');
var db = require('./rsrDb');
var App = React.createFactory(require('./rsrApp'));
var DOM = React.DOM,
    body = DOM.body,
    div = DOM.div,
    script = DOM.script;

function createGenerator(ctx) {
    return function* generator(next) {
        console.log('url: ' + ctx.url);
        var route = rsrRouter.resolve(ctx.url);
        console.log(route);
        if (route) {
            console.log("---route pass---");
            route.fetchData(createCallBack(route, ctx));
        }
    };
}
function createCallBack(route, ctx) {
    return function(err, data) {
        if (err) {
            return err.toString();
        }
        serverReactRender.call(ctx, {
            routeKey: route.key,
            data: data
        });
    };
}

function serverReactRender(props) {
    this.body = ReactDOMServer.renderToStaticMarkup(body(null,
        div({
            id: 'content',
            dangerouslySetInnerHTML: {
                __html: ReactDOMServer.renderToString(App(props))
            }
        }),
        script({
            dangerouslySetInnerHTML: {
                __html: 'var APP_PROPS = ' + safeStringify(props) + ';'
            }
        }),
        // script({
        //     src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react.min.js'
        // }),
        // script({
        //     src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react-dom.min.js'
        // }),
        // script({
        //     src: '/rsrServer/rsrBundle.js'
        // })
        script({
            src: '/dist/rsrBundle.js'
        })
    ));
}

router.get('/', function *(next){
    createGenerator(this)().next();
});
router.get('/:posts', function *(next){
    createGenerator(this)().next();
});
router.get('/:posts/:id', function *(next){
    createGenerator(this)().next();
});
router.get('/rsrBundle.js', require('./rsrBundle'));

function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

module.exports = router;
