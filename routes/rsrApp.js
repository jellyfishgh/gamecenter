var React = require('react');
var router = require('./rsrRouter');

module.exports = React.createClass({
    getInitialState: function() {
        return this.props;
    },
    componentDidMount: function() {
        window.onpopstate = function(event){
            console.log(event);
            this.updateUrl();
        }.bind(this);
    },
    handleClick: function(e) {
        e.preventDefault();
        window.history.pushState(null, null, e.target.pathname);
        this.updateUrl();
    },
    updateUrl: function() {
        var route = router.resolve(document.location.pathname);
        if (!route) return window.alert('Not Found');
        route.fetchData(function(err, data) {
            if (err) window.alert(err);
            this.setState({
                routeKey: route.key,
                data: data
            });
        }.bind(this));
    },
    render: function() {
        return React.createElement(router.routes[this.state.routeKey].component, {
            data: this.state.data,
            onClick: this.handleClick
        });
    }
});
