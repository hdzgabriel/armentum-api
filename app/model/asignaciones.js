var mongoose = require('mongoose');

var AsignacionSchema = new mongoose.Schema({
    'fecha_ini': {type: Date, required: true},
    'fecha_fin': Date,
    'rol_id': {type: Number,  required: true},
    'rol_nivel': {type: Number, required: true},
    'equipo_trabajo': {type: Number, required: true},
    'proyecto': {type: Number, required: true},
    'tarea': {type: [Number], required: true},
    'tecs': [Number],
    'desempenio': {
        'tecnica': Number,
        'innova': Number,
        'proact': Number,
        'gestion': Number,
    },
    'comentarios': String
});

mongoose.model('Asignacion', AsignacionSchema, 'asignaciones');