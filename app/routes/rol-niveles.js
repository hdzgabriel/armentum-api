var mongoose = require('mongoose');
var RolNivelModel = mongoose.model('RolNivel');
var restify = require('restify');
var log = require('../util/logger').getApplicationLogger().child({route: 'rol-niveles'});

function listRolNiveles (req, res, next) {
    log.debug('listRolNiveles');
    RolNivelModel.find({}, function (err, rolNivel) {
        if (err) {
            log.error('Error listing rol-niveles', err);
            err.status = 500;
            next(err);
        } else {
            res.json(200, rolNivel);
        }
    });
};

function getRolNivel (req, res, next) {
    log.debug('getRolNivel');
    var id = req.params.id;
    if(!id){next(new restify.BadRequestError());}
    
    log.debug('Looking for id: ' + id);
    RolNivelModel.findById(id, function (err, rolNivel) {
        if (rolNivel) {
            log.debug('Item found: ' + rolNivel);
            res.json(200, rolNivel);
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
    listRolNiveles: listRolNiveles,
    getRolNivel: getRolNivel
};