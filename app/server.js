'use strict';

var nconf = require('nconf');
var restify = require('restify');
var path = require('path');

var db = require('./model/db');

var empleado = require('./model/empleados');

var empleados = require('./routes/empleados');

nconf.file('server', path.join(path.resolve(''), '/app/config/server.json'));

function createServer (options) {
    
    var server = restify.createServer({
        name: nconf.get('server:name'),
        version: nconf.get('server:version'),
        acceptable: nconf.get('server:acceptable'),
        log: options.log,
    });
    
    server.pre(restify.pre.pause());
    server.pre(restify.pre.sanitizePath());
    server.pre(restify.pre.userAgentConnection());
    
    server.use(restify.requestLogger());
    server.use(restify.throttle({
        burst: 10,
        rate: 5,
        ip: true
    }));
    
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());
    server.use(restify.bodyParser());
    
    server.port = nconf.get('server:port');
    
    server.on('after', restify.auditLogger({log: options.log}));
    
    server.get('/api/empleados', empleados.listEmpleados);
    server.get('/api/empleados/:id', empleados.getEmpleado);
    server.post('/api/empleados/', empleados.createEmpleado);
    server.patch('/api/empleados/:id', empleados.updateEmpleado);
    server.del('/api/empleados/:id', empleados.deleteEmpleado);
    
    return server;
};

module.exports = {createServer: createServer};