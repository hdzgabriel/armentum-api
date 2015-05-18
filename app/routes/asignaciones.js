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

module.exports = {
    listAsignaciones: listAsignaciones,
    getAsignacion: getAsignacion
};