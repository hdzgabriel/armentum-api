var mongoose = require('mongoose');
var AsignacionModel = mongoose.model('Asignacion');
var restify = require('restify');
var log = require('../util/logger').getApplicationLogger().child({route: 'asignacion'});

function listAsignaciones (req, res, next) {
    log.debug('listAsignaciones');
    AsignacionModel.find({}, function (err, asignaciones) {
        if (err) {
            log.error('Error listing asignaciones', err);
            err.status = 500;
            next(err);
        } else {
            res.json(200, asignaciones);
        }
    });
};

function getAsignacion (req, res, next) {
    log.debug('getAsignacion');
    var id = req.params.id;
    if(!id){next(new restify.BadRequestError());}
    
    log.debug('Looking for id: ' + id);
    AsignacionModel.findById(id, function (err, asignacion) {
        if (asignacion) {
            log.debug('Item found: ' + asignacion);
            res.json(200, asignacion);
        } else {
            if(err) {
                log.error('Error getting item ' + id);
                err.status = 500;
            } else {
                err = new restify.NotFoundError();
            }
            next(err);
        }
    })
};

function createAsignacion (req, res, next) {
    log.debug('createAsignacion');
    log.debug('req.body: ');
    log.debug(req.body);
    
    var newAsignacion = new AsignacionModel(req.body);
    
    log.debug('newAsignacion: ' + newAsignacion);
    
    newAsignacion.save (function (err, doc) {
        if (doc) {
            log.debug('Document ' + doc._id + ' created');
            res.json(200, doc);
        } else {
            if(err) {
                log.error('Error saving document: ' + err);
                log.error(err);
                err.status = 500;
            } else {
                err = new restify.InternalError();
            }
            next(err);
        }
    });
    
    /*log.debug('saveAsignacion');
    log.debug(req.body);
    var fecha_ini = req.body.fecha_ini;
    log.debug('fecha_ini: ' + fecha_ini);
    var fecha_fin = req.body.fecha_fin;
    log.debug('fecha_fin: ' + fecha_fin);
    var rol_id = req.body.rol_id;
    log.debug('rol_id: ' + rol_id);
    var rol_nivel = req.body.rol_nivel;
    log.debug('rol_nivel: ' + rol_nivel);
    var equipo_trabajo = req.body.equipo_trabajo;
    log.debug('equipo_trabajo: ' + equipo_trabajo);
    var proyecto = req.body.proyecto;
    log.debug('proyecto: ' + proyecto);
    var comentarios = req.body.comentarios;
    log.debug('comentarios: ' + comentarios);
    var tecs = req.body.tecs;
    log.debug('tecs: ' + tecs);
    var tarea = req.body.tarea;
    log.debug('tarea: ' + tarea);
    
    if ( !fecha_ini || !rol_id || !rol_nivel || !equipo_trabajo || !proyecto || !tarea ) {
        next(restify.BadRequestError());
    }
    
    log.debug('Creating Asignacion');
    
    AsignacionModel.create({
        fecha_ini: fecha_ini,
        fecha_fin: fecha_fin,
        rol_id: rol_id,
        rol_nivel: rol_nivel,
        equipo_trabajo: equipo_trabajo,
        proyecto: proyecto,
        comentarios: comentarios,
        tecs: tecs,
        tarea: tarea
    }, function(err, doc) {
        if (doc) {
            log.debug('Document ' + doc._id + ' created');
            res.json(200, doc);
        } else {
            if(err) {
                log.error('Error saving document: ' + err);
                log.error(err);
                err.status = 500;
            } else {
                err = new restify.InternalError();
            }
            next(err);
        }
    });*/
    
};

module.exports = {
    listAsignaciones: listAsignaciones,
    getAsignacion: getAsignacion,
    createAsignacion: createAsignacion
};