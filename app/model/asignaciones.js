var mongoose = require('mongoose');

var AsignacionSchema = new mongoose.Schema({
    _id: Number,
    fecha_ini: Date,
    fecha_fin: Date,
    rol_id: Number, 
    rol_nivel: Number,
    equipo_trabajo: Number,
    proyecto: Number,
    tarea: [Number],
    tecs: [Number],
    desempenio: {
        tecnica: Number,
        innova: Number,
        proact: Number,
        gestion: Number
    },
    commentarios: String
});

mongoose.model('Asignacion', AsignacionSchema, 'asignaciones');