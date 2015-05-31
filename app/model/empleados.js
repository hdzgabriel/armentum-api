var mongoose = require('mongoose');

var EmpleadoSchema = new mongoose.Schema ({
    _id: {type: String, required: true},
	no_empleado: String,
	apellidos: {type: String, required: true},
	nombres: {type: String, required: true},
	categoria: String,
	activo: {type: Boolean, required: true},
    ext_user: String,
    email: {type: String, required: true},
    email_alt: String,
    movil: String,
    movil_vpn: String,
    telefono: String,
	contratacion: [{contratacion_id: Number, activo: Boolean}],
	equipodesa: [{equipodesa_id: Number, asignado: Date, activo: Boolean}],
    perfiles: [Number],
	asignaciones: [Number]
}, {
    _id: false
});

mongoose.model('Empleado', EmpleadoSchema, 'empleados');