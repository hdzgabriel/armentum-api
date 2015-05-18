var mongoose = require('mongoose');
var RolModel = mongoose.model('Rol');
var restify = require('restify');
var log = require('../util/logger').getApplicationLogger().child({route: 'roles'});

function listRoles (req, res, next) {
    log.debug('listRoles');
    RolModel.find({}, function (err, roles) {
        if (err) {
            log.error('Error listing roles', err);
            err.status = 500;
            next(err);
        } else {
            res.json(200, roles);
        }
    });
};

function getRol (req, res, next) {
    log.debug('getRol');
    var id = req.params.id;
    if(!id){next(new restify.BadRequestError());}
    
    log.debug('Looking for id: ' + id);
    RolModel.findById(id, function (err, rol) {
        if (rol) {
            log.debug('Item found: ' + rol);
            res.json(200, rol);
        } else {
            if(err) {
                log.error('Error gettin item ' + id);
                err.status = 500;
            } else {
                err = new restify.NotFoundError();
            }
            next(err);
        }
    })
};

module.exports = {
    listRoles: listRoles,
    getRol: getRol
};