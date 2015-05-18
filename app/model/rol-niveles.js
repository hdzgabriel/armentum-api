var mongoose = require('mongoose');

var RolNivelSchema = new mongoose.Schema({
    _id: Number,
    nivel: String
});

mongoose.model('RolNivel', RolNivelSchema, 'rolnivel');