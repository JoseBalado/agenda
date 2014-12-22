var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActividadSchema = new Schema({
    nombre: String,
    día: String,
    número: Number,
    mes: String,
    hora: String,
    lugar: String,
    texto: String,
    genteAnotada: [String]
});

module.exports = mongoose.model('Actividad', ActividadSchema);
