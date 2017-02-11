let express = require('express');
let chalk = require('chalk');
let config = require("../config");
let router = express.Router();

router.use(function (req, res, next){
    req.url = '/setup-main' + req.url.replace('main.min.js', 'main.js');
    console.log(`${chalk.green('Redirect to: ')}${req.url}`);
    next();
});

router.use(express.static(config.staticPath));

module.exports = router;