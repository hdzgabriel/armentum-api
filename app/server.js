'use strict';

var nconf = require('nconf');
var restify = require('restify');
var path = require('path');

var db = require('./model/db');

var empleado = require('./model/empleados');
var rol = require('./model/roles');
var rolnivel = require('./model/rol-niveles');
var equipotrabajo = require('./model/equipos-trabajo');
var asignacion = require('./model/asignaciones');
var proyecto = require('./model/proyectos');
var tarea = require('./model/tareas');

var empleados = require('./routes/empleados');
var roles = require('./routes/roles');
var rolniveles = require('./routes/rol-niveles');
var equipostrabajo = require('./routes/equipos-trabajo');
var asignaciones = require('./routes/asignaciones');
var proyectos = require('./routes/proyectos');
var tareas = require('./routes/tareas');

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
    
    //Probar que pasa con credenciales.
    var allowCrossDomain = function (req, res, next) {
        req.log.debug('allowCrossDomain');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
        
        if (req.method === 'OPTIONS') {
            req.log.debug('############ OPTIONS #############');
            res.send(200);
        } else {
            next();
        }
    };
    
    restify.CORS.ALLOW_HEADERS.push('authorization');
    restify.CORS.ALLOW_HEADERS.push('sid');
    restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
    restify.CORS.ALLOW_HEADERS.push('lang');
    restify.CORS.ALLOW_HEADERS.push('origin');
    restify.CORS.ALLOW_HEADERS.push('withcredentials');
    restify.CORS.ALLOW_HEADERS.push('x-requested-with');
    
    server.use(restify.CORS());
    server.use(restify.fullResponse());
    
    //server.configure(function(){
    //    server.use(allowCrossDomain);
    //    server.use(server.router);
    //});
    
    /*server.use( function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    });*/
    
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());
    server.use(restify.bodyParser());
    
    server.port = nconf.get('server:port');
    
    server.on('after', restify.auditLogger({log: options.log}));
    
    // Options
    //server.opts(/\.*/, function(req, res, next){
    //    req.log.debug('OPTIONS');
    //    res.send(200);next();
    //});
    
    //Empleados
    server.get('/armentum/api/empleados', empleados.listEmpleados);
    server.get('/armentum/api/empleados/:id', empleados.getEmpleado);
    server.post('/armentum/api/empleados/', empleados.createEmpleado);
    server.put('/armentum/api/empleados/:id', empleados.updateEmpleado);
    server.del('/armentum/api/empleados/:id', empleados.deleteEmpleado);
    server.put('/armentum/api/empleados/:id/asignaciones', empleados.updateEmpleado); //Se actualizan las asignaciones del Empleado.
    
    //Roles
    server.get('/armentum/api/roles', roles.listRoles);
    server.get('/armentum/api/roles/:id', roles.getRol);
    
    //Rol Niveles
    server.get('/armentum/api/rolniveles', rolniveles.listRolNiveles);
    server.get('/armentum/api/rolniveles/:id', rolniveles.getRolNivel);
    
    //Equipos de Trabajo
    server.get('/armentum/api/equipostrabajo', equipostrabajo.listEquiposTrabajo);
    server.get('/armentum/api/equipostrabajo/:id', equipostrabajo.getEquipoTrabajo);
    
    //Asignaciones
    server.get('/armentum/api/asignaciones', asignaciones.listAsignaciones);
    server.get('/armentum/api/asignaciones/:id', asignaciones.getAsignacion);
    server.post('/armentum/api/asignaciones/', asignaciones.createAsignacion);
    
    //Proyectos
    server.get('/armentum/api/proyectos', proyectos.listProyectos);
    server.get('/armentum/api/proyectos/:id', proyectos.getProyecto);
    server.get('/armentum/api/proyectos', proyectos.getProyectByKeyword);
    
    //Tareas
    server.get('/armentum/api/tareas', tareas.listTareas);
    server.get('/armentum/api/tareas/:id', tareas.getTarea);
    
    return server;
};

module.exports = {createServer: createServer};