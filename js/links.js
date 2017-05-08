var reddit = require('redditor');
var subreddit = process.env.SUBREDDIT;

module.exports = {
    "getLinks": function (after = "", callback) {
        var posts = [];
        var after;
        var err;
        try {
            reddit.get(subreddit + '.json?limit=100' + ((after == "") ? "" : "&after=" + after), function (err, response) {
                if (err) throw err;
                after = response.data.after;
                posts = posts.concat(response.data.children);
                console.log("Image list populated (" + posts.length + " total)");
            callback (err, posts, after);
            });
        }
        catch (ex) {
            err = ex;
            posts = null;
            after = null;
            callback (err, posts, after);
        }
    },
}