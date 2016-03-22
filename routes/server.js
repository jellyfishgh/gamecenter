var router = require('koa-router')();

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var browserify = require('browserify');
var literalify = require('literalify');

var DOM = React.DOM,
    body = DOM.body,
    div = DOM.div,
    script = DOM.script;

var App = React.createFactory(require('./App'));

router.get('/', function*(next) {
    var props = {
        items: [
            'Item 0',
            'Item 1',
            'Item </script>',
            'Item <!--inject!-->'
        ]
    };
    this.type = 'text/html;charset=utf-8';
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
        script({
            src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react.min.js'
        }),
        script({
            src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react-dom.min.js'
        }),
        script({
            src: '/server/bundle.js'
        })
    ));
});

router.get('/bundle.js', function*(next) {
    this.type = 'text/javascript;charset=utf-8';
    this.body = browserify().add('./routes/browser.js').transform(literalify.configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM'
    })).bundle();
});

function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

module.exports = router;
