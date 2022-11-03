const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('conectado al puerto ' + process.env.PORT)
    } catch (error) {
        console.log('Error a la hora de iniciar la base de datos' + error)
    }
}

module.exports = {dbConnection}