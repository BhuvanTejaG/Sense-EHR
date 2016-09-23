
var express = require('express');

var server = express();


// Server Dependencies

var dep = {

    path: require('path'),
    cors: require('cors'),
    config: require('./build/config'),
    bodyParser: require('body-parser')

}

// Server Configuration

function configureServer () {

    server.use(dep.bodyParser.urlencoded({ extended: false }));
    server.use(dep.bodyParser.json());
    server.use(dep.cors());

    /* Enable cross origin requests from clients*/
    server.all('/*', function(req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        next();

    });

    // Use Expresss
    server.use(express.static(__dirname + '/build/public'));
	server.use('/node_modules', express.static(__dirname + '/node_modules'));
	server.use('/bower_components', express.static(__dirname + '/bower_components'));
	server.use(express.static(__dirname + '/build/public/angular-app'));
	
};


// Server Start Function

function start() {

    configureServer();
    var port = process.env.PORT || dep.config.port;
    server.listen(port);
    console.log("[]: Server listening on port %d", port);

}

start();
