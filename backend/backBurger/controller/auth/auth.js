const { body } = require('express-validator')
const {Usuario} = require('../../models/usuarios')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs');


const ingresar = (req, res) => {     
    res.render('auth/login', {layout:'layout-auth'})
}

const ingreso = async (req, res) => {
    try {
        const usuario = await Usuario.find({email: {$eq : req.body.email}})

        if(usuario.length == 0) {
            res.send('Email y/o contraseña incorrecta');
        } else if (await bcryptjs.compare(req.body.password, usuario[0].password) == false) {
            res.send('Email y/o contraseña incorrecta');
        } else{
            req.session.user_id = usuario[0]._id
            console.log(req.session.user_id)
            res.redirect('/admin/')
        }
    } catch (error) {
        console.log(error)
    }
}

const salir = (req, res) => {
    req.session.destroy(() => res.redirect('/api/'))
}


const registrar = (req, res) => {
    res.render('auth/registro', {layout: 'layout-auth'})
}

const registro = async (req, res) => {

        try {
                const hash = await bcryptjs.hash(req.body.password, 8);

            const errors = validationResult(req);

            if(errors.isEmpty()) {
                const save = new Usuario({nombre: req.body.nombre, email: req.body.email, password: hash});
                console.log(`esto es save ${save}`)
                await save.save()
                res.redirect('/admin/')
            } else {
                res.render('auth/registro', { values:req.body, errors: errors.array()})

            // res.status(501).json({msg: "No se puede registrar el Usuario", error})
            }

        } catch (error) {
        
            const usuario = await Usuario.find({email: {$eq : req.body.email}}) 
            const mailDuplicado = 'El mail ya se encuentra registrado'
                if(usuario) {
                    res.render('auth/registro', { values:req.body, mailDuplicado})
        }
            
    }

        

    
        
    }


    // connection.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], async (error, results)=> {
        //     if(error) {throw error}
            
        //     if(results.length == 0) {
        //         res.send('El correo y/o contraseña es incorrecto')
        //     } else if ( (await bcryptjs.compare(req.body.password, results[0].password)) === false) {
        //         res.send('El correo y/o contraseña es incorrecto')
        //     } else {
        //         req.session.user_id = results[0].id
    
        //         res.redirect('/')
        //     }
        // })
    



module.exports = {ingresar, registrar, registro, ingreso, salir}
