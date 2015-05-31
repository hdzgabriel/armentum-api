var mongoose = require('mongoose');

var EmpleadoSchema = new mongoose.Schema ({
    _id: String,
	no_empleado: String,
	apellidos: String,
	nombres: String,
	categoria: String,
	activo: Boolean,
    ext_user: String,
    email: String,
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