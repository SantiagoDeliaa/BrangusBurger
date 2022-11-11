require('dotenv').config();


const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const {dbConnection} = require('./db/db');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))


app.use(express.json())
app.use(cors())

// app.use('/auth', authRouter);
app.use('/admin',  adminRouter);
app.use('/auth',  authRouter);


app.use((req, res, next) => {
    res.status(404).send('Not found');
});

const port = process.env.PORT || 3000;


app.listen(port,  () => {
    console.log(`http://localhost:${port}`)
})

dbConnection()


module.exports = app;
