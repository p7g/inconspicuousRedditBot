var fs = require('fs');

module.exports = {
    "init": function () {
        fs.appendFile("../log/log.txt", "\n\nLOG TIME:" + Date.now(), (err) => {
            if (err) throw err;
            console.info("Log file initialized");
        });
    },
    "log": function (msg) {
        fs.appendFile("../log/log.txt", "\n" + msg, (err) => {
            if (err) throw err;
        });
        console.log(msg);
    }
}