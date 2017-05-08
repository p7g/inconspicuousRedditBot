'use strict';
var http = require('http');
var Eris = require('eris');
var reddit = require('redditor');

var bot = new Eris(process.env.TOKEN);
var port = process.env.port || 8080;

var subreddit = process.env.SUBREDDIT;
var posts = [];
var after = "";
var autoSend = {
    "active": false,
    "interval": ""
}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Nothing to see here...\n');
}).listen(port);

bot.on('ready', () => {
    console.log("Ready...");
    reddit.get(subreddit + '.json?count=100/', function (err, response) {
        if (err) throw err;
        console.log("Image list populated");
        after = response.data.after;
        posts = response.data.children;
    });
});

bot.on("messageCreate", (msg) => {
    if (msg.content === process.env.MSG) {
        console.log("Received message");
        if (posts.length >= 2) {
            console.log("Enough images, won't get more");
            bot.createMessage(process.env.CHANNEL_ID, posts.shift().data.url);
        }
        else {
            console.log("Last image, getting more");
            posts = reddit.get(subreddit + '.json?count=100&after=' + posts.after, function (err, response) {
                if (err) throw err;
                return response.data;
            });
            bot.createMessage(process.env.CHANNEL_ID, posts.shift().data.url);
        }
    }
    if (msg.content === process.env.MSG + " autosend") {
        bot.createMessage("Autosend is now " + (!autoSend) ? "true" : "false");
        autosend = (autosend) ? false : true;
        if (autosend) {
            autoSend.interval = setInterval(() => {
                bot.createMessage(process.env.CHANNEL_ID, posts.shift().data.url);
            }, process.env.INTERVAL);
            return;
        }
        clearInterval(autoSend.interval);
    }
});

bot.connect();