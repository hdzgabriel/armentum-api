var bunyan = require('bunyan');
var nconf = require('nconf');
var path = require('path');

nconf.file('logger', path.join(path.resolve(''), '/app/config/logger.json'));

function getServerLogger ( serializers ) {
    return bunyan.createLogger({
        name: nconf.get('logger:server:name'),
        streams: [{
            type: nconf.get('logger:server:file:type'),
            level: nconf.get('logger:server:file:level'),
            path: path.join(path.resolve(''), nconf.get('logger:server:file:path')),
            period: nconf.get('logger:server:file:period'),
            count: nconf.get('logger:server:file:count')
        }],
        serializers: serializers ? serializers : bunyan.stdSerializers
    });
};

function getApplicationLogger ( serializers ) {
    return bunyan.createLogger({
        name: nconf.get('logger:app:name'),
        streams: [{
            type: nconf.get('logger:app:file:type'),
            level: nconf.get('logger:app:file:level'),
            path: path.join(path.resolve(''), nconf.get('logger:app:file:path')),
            period: nconf.get('logger:app:file:period'),
            count: nconf.get('logger:app:file:count')
        }],
        serializers: serializers ? serializers : bunyan.stdSerializers
    });
};

module.exports = {getServerLogger: getServerLogger, getApplicationLogger: getApplicationLogger};