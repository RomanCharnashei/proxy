let express = require('express');
let proxy = require('http-proxy-middleware');
let rewrite = require('express-urlrewrite');
let logger = require('morgan');
let chalk = require('chalk');
let app = express();
let config = require("./config");


app.use('/wfcstatic/applications/navigator/html5', require("./html5"));

let proxyOptions = {
    target: config.hostUri,   // target host
    onProxyRes: locationReplace
};
 
app.use('*', proxy(proxyOptions));
app.listen(9000);

function locationReplace(proxyRes, req, res, options) {
	    if(proxyRes.headers.location) {
            proxyRes.headers.location = proxyRes.headers.location.replace(config.hostUri, config.proxyUri);
	    	console.log(`${chalk.red('location')}: ${proxyRes.headers.location}`);
	    }
};