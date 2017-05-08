module.exports = {
    "getLinks": function (after = "", callback) {
        var posts;
        var after;
        var err;
        try {
            reddit.get(subreddit + '.json?limit=100' + ((after == "") ? "" : "&after=" + after), function (err, response) {
                if (err) throw err;
                console.log("Image list populated (" + posts.length + " total)");
                after = response.data.after;
                posts = response.data.children;
            });
        }
        catch (ex) {
            err = ex;
            posts = null;
            after = null;
        }
        finally {
            callback (err, posts, after);
        }
    },
}