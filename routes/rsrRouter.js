//react server routing example
exports.routes = {
    list: {
        url: /^\/rsrServer(\/posts)?(\/)?$/,
        component: require('./rsrPostList')
    },
    view: {
        url: /^\/rsrServer\/posts\/\d+$/,
        component: require('./rsrPostView')
    }
};
exports.resolve = function(url) {
    for (var key in exports.routes) {
        var route = exports.routes[key];
        var match = typeof route.url === 'string' ? url === route.url : url.match(route.url);
        if (match) {
            return {
                key: key,
                fetchData: fetchData([url], route)
            };
        }
    }
};

function fetchData(params, route) {
    return function(callback) {
        if (!route.component.fetchData) return callback();
        return route.component.fetchData.apply(null, params.concat(callback));
    };
}
