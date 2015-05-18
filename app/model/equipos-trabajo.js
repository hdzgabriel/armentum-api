var mongoose = require('mongoose');

var EquipoTrabajoSchema = new mongoose.Schema({
    _id: Number,
    equipo: String
});

mongoose.model('EquipoTrabajo', EquipoTrabajoSchema, 'equipos_trabajo');