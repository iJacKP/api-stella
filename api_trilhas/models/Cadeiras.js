const mongoose = require('mongoose')

const Cadeira = mongoose.model('Cadeira', {
    Name : String,
    Trilha : String,
    Horario : [Number],
    Dia : [String],
    Professor: String,
    Sobre: String
})

module.exports = Cadeira