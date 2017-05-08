'use strict';
require('dotenv').config();
var http = require('http');
var Eris = require('eris');
var links = require('./js/links');
var logger = require('./js/logger');

var bot = new Eris(process.env.TOKEN);
var port = process.env.port || 8080;

var posts = [];
var after = "";
var autoSend = {
    "active": false,
    "interval": null
}

logger.init();

function sendLink () {
    bot.createMessage(process.env.CHANNEL_ID, posts.shift().data.url);
}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Nothing to see here...\n');
}).listen(port);

bot.on('ready', () => {
    logger.log("Ready...");
    links.getLinks(null, function (err, pst, aft) {
        if (err) {
            logger.log(err);
            return;
        }
        posts = pst;
        after = aft;
    });
});

bot.on("messageCreate", (msg) => {
    if (msg.content === process.env.MSG) {
        logger.log("Received link request");
        if (posts.length -1 >= 2) {
            logger.log(posts.length -1 + " links left in storage, won't fetch more");
            sendLink();
        }
        else {
            logger.log("Last link, fatching more...");
            links.getLinks(after, function (err, pst, aft) {
                if (err) {
                    logger.log(err);
                    return;
                }
                posts = pst;
                after = aft;
            });
            sendLink();
        }
    }
    if (msg.content === process.env.MSG + " autosend") {
        logger.log("Received autosend toggle")
        bot.createMessage(process.env.CHANNEL_ID, "Autosend is now " + ((autoSend.active) ? "off" : "on"));
        autoSend.active = (autoSend.active) ? false : true;
        if (autoSend.active) {
            logger.log("Autosend is now true")
            autoSend.interval = setInterval(() => {
                if (posts.length -1 >= 2) {
                    logger.log(posts.length -1 + " links left in storage, won't fetch more");
                    sendLink();
                }
                else {
                    logger.log("Last link, fatching more...");
                    links.getLinks(after, function (err, pst, aft) {
                        if (err) {
                            logger.log(err);
                            return;
                        }
                        posts = pst;
                        after = aft;
                    });
                    sendLink();
                }
                logger.log("Sent automatic message");
            }, process.env.INTERVAL);
            return;
        }
        logger.log("Autosend is now false");
        clearInterval(autoSend.interval);
    }
});

bot.connect();