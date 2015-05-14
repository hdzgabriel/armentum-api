var mongoose = require('mongoose');
var EmpleadoModel = mongoose.model('Empleado');
var restify = require('restify');
var log = require('../util/logger').getApplicationLogger().child({route: 'empleados'});


function listEmpleados(req, res, next) {
    log.debug('listEmpleados');
    EmpleadoModel.find({}, function(err, empleados) {
        if (err) {
            err.status(500);
            next(err);
        } else {
            res.json(200, empleados);
        }
    });
};

function getEmpleado(req, res, next) {
    log.debug('getEmpleado');
    var id = req.params.id;
    
    if (!id) {next(new restify.BadRequestError());}
    
    log.debug('Looking for id: ' + id);
    EmpleadoModel.findById(id, function(err, empleado) {
        if (empleado) {
            log.debug('Item found: ' + empleado);
            res.json(200, empleado);
        } else {
            if(err) {
                log.error('Error searching for the item ' + id, err );
                err.status = 500;
            } else {
                log.debug('Item ' + req.id + ' not found');
                err = new restify.NotFoundError();
            }
            next(err);
        }
    });
};

function deleteEmpleado(req, res, next) {
    log.debug('deleteEmpleado');
    var id = req.params.id;
    if (!id) {next(new restify.BadRequestError());}
    
    log.debug('Deleting Item ' + id);
    EmpleadoModel.remove({_id: id}, function (err) {
        if (err) {
            log.error('Error deleting item ' + id, err);
            err.status = 500;
            next(err);
        } else {
            res.send (200);
        }        
    });
}

function updateEmpleado(req, res, next) {
    var id = req.params.id;
    log.debug('id: ' + id);
    if (!id) {next(new restify.BadRequestError());}
    
	var noEmpleado = req.body.no_empleado;
	log.debug('noEmpleado: ' + noEmpleado);
	var apellidos = req.body.apellidos;
	log.debug('apellidos: ' + apellidos);
	var nombres = req.body.nombres;
	log.debug('nombres: ' + nombres);
	var categoria = req.body.categoria;
	log.debug('categoria: ' + categoria);
	var extUser = req.body.ext_user;
	log.debug('ext_user: ' + extUser);
    
    log.debug('Looking for id: ' + id);
    EmpleadoModel.findById(id, function (err, empleado) {
        if (empleado) {
            log.debug('Item found: ' + empleado);
            log.debug('Original Item: ' + empleado);
            if ( noEmpleado && noEmpleado.trim() != '' && !(no_empleado === empleado.no_empleado) ) empleado.no_empleado = noEmpleado;
            if ( apellidos && apellidos.trim() != '' && !(apellidos === empleado.apellidos) ) empleado.apellidos = apellidos;
            if ( nombres && nombres.trim() != '' && !(nombres === empleado.nombres) ) empleado.nombres = nombres;
            if ( categoria && categoria.trim() != '' && !(categria === empleado.categoria) ) empleado.categoria = categoria;
            if ( extUser && extUser.trim() != '' && !(extUser === empleado.ext_user) ) empleado.ext_user = extUser;
            log.debug('Modified Item: ' + empleado);
            empleado.save(function(err) {
                if (err) {
                    err.status = 500;
                    next(err);
                } else {
                    res.json(200, empleado);
                }
            });
        } else {
            if (err) {
                err.status = 500;
                next(err);
            } else {
                err = new restify.NotFoundError();
            }
            next(err);
        }
    });
};

function createEmpleado (req, res, next) {
    log.debug('createEmpleado');
    log.debug(req.body);
    var id = req.body.empleado_id;
    log.debug('id: ' + id);
	var noEmpleado = req.body.no_empleado;
	log.debug('noEmpleado: ' + noEmpleado);
	var apellidos = req.body.apellidos;
	log.debug('apellidos: ' + apellidos);
	var nombres = req.body.nombres;
	log.debug('nombres: ' + nombres);
	var categoria = req.body.categoria;
	log.debug('categoria: ' + categoria);
	var extUser = req.body.ext_user;
	log.debug('ext_user: ' + extUser);
    
    if ( !id || !nombres || !apellidos ) {
        next(restify.BadRequestError());
    }
    
    log.debug('Creating item ' + id);
    EmpleadoModel.create({
        _id: id,
        no_empleado: noEmpleado,
		apellidos: apellidos,
		nombres: nombres,
		categoria: categoria,
		ext_user: extUser
    }, function (err, empleado) {
        if(empleado) {
            log.debug('Item ' + id + 'created' );
            res.json(200, empleado);
        } else {
            if(err) {
                log.error('Error creating item ' + id);
                err.status = 500;
            } else {
                err = new restify.InternalError ();
            }
            next(err);
        }
    });
};

module.exports = {
    listEmpleados: listEmpleados, 
    getEmpleado: getEmpleado,
    deleteEmpleado: deleteEmpleado,
    updateEmpleado: updateEmpleado,
    createEmpleado: createEmpleado
};