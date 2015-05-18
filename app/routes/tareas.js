var mongoose = require('mongoose');
var TareaModel = mongoose.model('Tarea');
var restify = require('restify');
var log = require('../util/logger').getApplicationLogger().child({route: 'tarea'});

function listTareas (req, res, next) {
    log.debug('listTareas');
    TareaModel.find({}, function (err, tareas) {
        if (err) {
            log.error('Error listing tareas', err);
            err.status = 500;
            next(err);
        } else {
            res.json(200, tareas);
        }
    });
};

function getTarea (req, res, next) {
    log.debug('getTarea');
    var id = req.params.id;
    if(!id){next(new restify.BadRequestError());}
    
    log.debug('Looking for id: ' + id);
    TareaModel.findById(id, function (err, tarea) {
        if (tarea) {
            log.debug('Item found: ' + tarea);
            res.json(200, tarea);
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
    listTareas: listTareas,
    getTarea: getTarea
};