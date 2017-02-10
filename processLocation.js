let chalk = require('chalk');

module.exports = function(hostUri, proxyUri) {
    return function (proxyRes, req, res, options) {
	    if(proxyRes.headers.location) {
	    	proxyRes.headers.location = proxyRes.headers.location.replace(hostUri, proxyUri);
	    	console.log(`${chalk.red('location')}: ${proxyRes.headers.location}`);
	    }
    };
}
