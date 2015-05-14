'use strict';

var path = require('path');
var restify = require('restify');
var logger = require('./app/util/logger');

var app = require('./app/server');

var log = logger.getServerLogger(restify.bunyan.serializers);

(function main() {
    log.debug ('Creating Server...');
    var server = app.createServer({
        log: log
    });

    server.listen(server.port, function() {
        log.info('listening at %s', server.url);
    });

})();