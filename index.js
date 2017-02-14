let express = require('express');
let proxy = require('http-proxy-middleware');
let rewrite = require('express-urlrewrite');
let logger = require('morgan');
let chalk = require('chalk');
let app = express();
let config = require("./config");
let proxyOptions = {
    target: config.hostUri,   // target host
    onProxyRes: locationReplace
};
let proxyInstance = proxy(proxyOptions);


app.use('/wfcstatic/applications/navigator/html5', require("./html5"));

app.use('/wfcstatic/applications/navigator/html5/peopleeditor', proxyInstance);

app.use('/wfcstatic/applications/navigator/html5', express.static(config.staticPath));

app.use(function(req, res, next){
    console.log(req.url);
    next();
});

app.use('*', proxyInstance);
app.listen(9000);

function locationReplace(proxyRes, req, res, options) {
	    if(proxyRes.headers.location) {
            proxyRes.headers.location = proxyRes.headers.location.replace(config.hostUri, config.proxyUri);
	    	console.log(`${chalk.red('location')}: ${proxyRes.headers.location}`);
	    }
};