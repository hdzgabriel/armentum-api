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
    server.use(restify.CORS());
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());
    server.use(restify.bodyParser());
    
    server.port = nconf.get('server:port');
    
    server.on('after', restify.auditLogger({log: options.log}));
    
    //Empleados
    server.get('/armentum/api/empleados', empleados.listEmpleados);
    server.get('/armentum/api/empleados/:id', empleados.getEmpleado);
    server.post('/armentum/api/empleados/', empleados.createEmpleado);
    server.patch('/armentum/api/empleados/:id', empleados.updateEmpleado);
    server.del('/armentum/api/empleados/:id', empleados.deleteEmpleado);
    
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
    
    //Proyectos
    server.get('/armentum/api/proyectos', proyectos.listProyectos);
    server.get('/armentum/api/proyectos/:id', proyectos.getProyecto);
    
    //Tareas
    server.get('/armentum/api/tareas', tareas.listTareas);
    server.get('/armentum/api/tareas/:id', tareas.getTarea);
    
    return server;
};

module.exports = {createServer: createServer};