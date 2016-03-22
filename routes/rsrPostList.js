var React = require('react');
var db = require('./rsrDb');

var DOM = React.DOM,
    div = DOM.div,
    h1 = DOM.h1,
    ul = DOM.ul,
    li = DOM.li,
    a = DOM.a;

module.exports = React.createClass({
    statics: {
        fetchData: db.getAllPosts
    },
    render: function() {
        return div(null,
            h1(null, 'Jellyfish\'s blogs'),
            ul({
                children: this.props.data.map(function(post) {
                    return li(null, a({
                        href: 'rsrServer/posts/' + post.id,
                        onClick: this.props.onClick
                    }, post.title));
                }.bind(this))
            })
        );
    }
});
