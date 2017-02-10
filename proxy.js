let express = require('express');
let proxy = require('http-proxy-middleware');
let rewrite = require('express-urlrewrite');
let chalk = require('chalk');
let app = express();
let hostUri = 'http://epam-dev-box3.int.kronos.com';
let proxyUri = 'http://localhost:9000';
let staticPath = "d:\Git projects\eou\staging_files\web_server\applications\navigator\html5";


app.use(rewrite('/wfcstatic/applications/navigator/html5/setup-main/js/main.min.js*', '/setup-main/js/main.js'));

app.use('/wfcstatic/applications/navigator/html5/setup-main', function (req, res, next) {
    req.path = req.path.replace('.min.', '.');
    next();
}, express.static(staticPath));

let options = {
        target: hostUri,   // target host 
        changeOrigin: true,  // needed for virtual hosted sites 
        onProxyRes: process// require("./processLocation")(proxyUri, hostUri)
};
 
let proxyInstance = proxy(options);

app.use('*', proxyInstance);
app.listen(9000);


function process(proxyRes, req, res, options) {
	    if(proxyRes.headers.location) {
	    	proxyRes.headers.location = proxyRes.headers.location.replace(hostUri, proxyUri);
	    	console.log(`${chalk.red('location')}: ${proxyRes.headers.location}`);
	    }
};