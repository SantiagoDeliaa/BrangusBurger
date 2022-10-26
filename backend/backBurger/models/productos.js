const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema( {
    nombre: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    imagen:{
        type: String,
        required: false,
    }
})

const Producto = mongoose.model('Producto', storeSchema);

module.exports = {Producto}