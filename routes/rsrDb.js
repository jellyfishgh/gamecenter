var posts = [{
    "id": 0,
    "title": "故乡",
    "body": "这是故乡这篇文字的正文"
}, {
    "id": 1,
    "title": "阿Q正传",
    "body": "这是阿Q正传的正文"
}, {
    "id": 2,
    "title": "百草园",
    "body": "这是百草园的正文"
}];

module.exports = {
    getAllPosts: function() {
        Array.prototype.slice.call(arguments, -1)[0](null, posts);
    },
    getPost: function(url, callback) {
        var id = url.substr(url.lastIndexOf('/') + 1);
        if (posts[id]) callback(null, posts[id]);
    }
};
