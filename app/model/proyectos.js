var mongoose = require('mongoose');

var ProyectoSchema = new mongoose.Schema({
    _id: Number,
    nombre: String,
    desc: String,
});

mongoose.model('Proyecto', ProyectoSchema, 'proyectos');