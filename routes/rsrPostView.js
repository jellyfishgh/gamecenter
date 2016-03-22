var React = require('react');
var db = require('./rsrDb');

var DOM = React.DOM,
    div = DOM.div,
    h1 = DOM.h1,
    p = DOM.p,
    a = DOM.a;

module.exports = React.createClass({
    statics: {
        fetchData: db.getPost
    },
    render: function() {
        var post = this.props.data;
        return div(null,
            h1(null, post.title),
            p(null, post.body),
            p(null, a({
                href: '/rsrServer',
                onClick: this.props.onClick
            }, '< Jellyfish\'s Home'))
        );
    }
});
