var mongoose = require('mongoose');
var EquipoTrabajoModel = mongoose.model('EquipoTrabajo');
var restify = require('restify');
var log = require('../util/logger').getApplicationLogger().child({route: 'equipos-trabajo'});

function listEquiposTrabajo (req, res, next) {
    log.debug('listEquiposTrabajo');
    EquipoTrabajoModel.find({}, function (err, equipoTrabajo) {
        if (err) {
            log.error('Error listing equipos-trabajo', err);
            err.status = 500;
            next(err);
        } else {
            res.json(200, equipoTrabajo);
        }
    });
};

function getEquipoTrabajo (req, res, next) {
    log.debug('getEquipoTrabajo');
    var id = req.params.id;
    if(!id){next(new restify.BadRequestError());}
    
    log.debug('Looking for id: ' + id);
    EquipoTrabajoModel.findById(id, function (err, equipoTrabajo) {
        if (equipoTrabajo) {
            log.debug('Item found: ' + equipoTrabajo);
            res.json(200, equipoTrabajo);
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
    listEquiposTrabajo: listEquiposTrabajo,
    getEquipoTrabajo: getEquipoTrabajo
};