const {Usuario} = require('../../models/usuarios')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { token } = require('morgan');
const cookieParser = require('cookie-parser');




const ingreso = async (req, res, next) => {
    //Buscar Formulario
    const {email, password} = req.body
    const usuario = await Usuario.findOne({ email })

    if (!usuario) {
        //si el usuario existe
        await res.status(401).json({mensaje: "Ese usuario no existe"})
        next()
    } else {
        //El usuario existe, verificar el password es correcto
        if(!bcrypt.compareSync(password, usuario.password)) {
            // Password incorrecto
            await res.status(401).json({mensaje: 'Password Incorrecto'})
            next()
        } else {
            // password correcto, firmar el token

            const user = {username: email}
            const accessToken = generarAccessToken(user)
           
            res.header('authorization', accessToken).json({
                message: "Usuario Autenticado", 
                token: accessToken
            })

            
            // const cookiesOptions = {
            //     expires: new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
            //     httpOnly: true
            // }
            // res.cookie('jwt', token, cookiesOptions)
            // res.send('logueado')
            // // res.cookie("accessToken", accessToken, {
            // //     maxAge: 60*60*24*30*1000
            // })
        }   


    }

    function generarAccessToken(user) {
        return jwt.sign({
            email: usuario.email,
            nombre: usuario.nombre,
            id: usuario._id
        },
        'LLAVESECRETA',
        {
            expiresIn: '1h'
        });

    }

}


function validateToken(req, res, next){
    const accessToken = req.headers['authorization'] || req.query.accessToken
    if(!accessToken) res.send('Access Denied')

    jwt.verify(accessToken, 'LLAVESECRETA', (err, user) => {
        if(err) {
            res.send('Access denied, token expired or incorrect')
        } else {
            next()
        }
    })
}





const salir = (req, res) => {
    req.session.destroy(() => res.redirect('/api/'))
}


const registro = async (req, res) => {

    const usuario = new Usuario(req.body)
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save()
        res.json({mensaje: "Usuario Creado correctamente"})
    } catch (error) {
        console.log(error)
        res.json({mensaje: "Hubo un error"})
    }
        
    }


    // connection.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], async (error, results)=> {
    //         if(error) {throw error}
            
    //         if(results.length == 0) {
    //             res.send('El correo y/o contraseña es incorrecto')
    //         } else if ( (await bcrypt.compare(req.body.password, results[0].password)) === false) {
    //             res.send('El correo y/o contraseña es incorrecto')
    //         } else {
    //             req.session.user_id = results[0].id
    
    //             res.redirect('/')
    //         }
    //     })
    



module.exports = {registro, ingreso, salir, validateToken}
