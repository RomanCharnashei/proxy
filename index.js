var http = require('http'),
    httpProxy = require('http-proxy'),
	chalk = require('chalk'),
	hostUri = 'http://localhost:8001',
	proxyUri = 'http://localhost:9000';
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

proxy.on('proxyRes', processLocation);
proxy.on('proxyReq', uriRewriter);

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
	console.log(`${req.method}: ${req.url}`);
  	proxy.web(req, res, { target: hostUri });
});

console.log("listening on port 9000")
server.listen(9000);




function processLocation(proxyRes, req, res, options) {
	if(proxyRes.headers.location) {
		proxyRes.headers.location = proxyRes.headers.location.replace(hostUri, proxyUri);
		console.log(`${chalk.red('location')}: ${proxyRes.headers.location}`);
	}
}

function uriRewriter(proxyReq, req, res, options) {
	var src = proxyReq.path,
		dest = null;
	switch(src) {
		case '/wfcstatic/applications/navigator/html5/setup-main/js/main.min.js':
			dest = '/setup-main/js/main.js';
			
	}

	if(dest) {
		proxyReq.path = dest;
		console.log(`${chalk.blue('Rewrite')}: '${src}' to '${dest}'`);
	}
}
