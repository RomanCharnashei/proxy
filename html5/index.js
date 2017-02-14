let express = require('express');
let logger = require('morgan');
let chalk = require('chalk');
let rewrite = require('express-urlrewrite');
let config = require("../config");
let router = express.Router();

router.use("/setup-main", 
    function (req, res, next) {
        req.url = '/setup-main' + req.url.replace('main.min.js', 'main.js');
        console.log(`${chalk.green('Redirect to: ')}${req.url}`);
        next();
    }, 
    express.static(config.staticPath));


router.use("/emptimecard",
    function (req, res, next) {
        req.url = '/emptimecard' + req.url.replace('main.min.js', 'main.js');
        console.log(`${chalk.green('Redirect to: ')}${req.url}`);
        next();
    },
    express.static(config.staticPath));

module.exports = router
