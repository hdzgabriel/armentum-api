var mongoose = require('mongoose');
var ProyectoModel = mongoose.model('Proyecto');
var restify = require('restify');
var log = require('../util/logger').getApplicationLogger().child({route: 'proyecto'});

function listProyectos (req, res, next) {
    log.debug('listProyectos');
    ProyectoModel.find({}, function (err, proyectos) {
        if (err) {
            log.error('Error listing proyectos', err);
            err.status = 500;
            next(err);
        } else {
            res.json(200, proyectos);
        }
    });
};

function getProyecto (req, res, next) {
    log.debug('getProyecto');
    var id = req.params.id;
    if(!id){next(new restify.BadRequestError());}
    
    log.debug('Looking for id: ' + id);
    ProyectoModel.findById(id, function (err, proyecto) {
        if (proyecto) {
            log.debug('Item found: ' + proyecto);
            res.json(200, proyecto);
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
    listProyectos: listProyectos,
    getProyecto: getProyecto
};