var mongoose = require('mongoose');

var TareaSchema = new mongoose.Schema({
    _id: Number,
    tarea: String
});

mongoose.model('Tarea', TareaSchema, 'tareas');