const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema( {
    nombre: {
        type: String,
        required: "Agrega tu nombre",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
    }
})

const Usuario = mongoose.model('Usuario', storeSchema);

module.exports = {Usuario}