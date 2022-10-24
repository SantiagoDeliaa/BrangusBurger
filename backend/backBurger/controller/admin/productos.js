// const {validationResult} = require('express-validator')

// const { body } = require('express-validator')
// const { stringify } = require('postcss')
// const sharp = require('sharp')
const {Producto} = require('../../models/productos')

const create = (req, res) => {
    res.render('admin/productos/create', { layout:'layout-admin'})
}

const index = async (req, res) => {
    try {
        const producto = await Producto.find()
        console.log(producto)
        // res.json({producto})
        res.json(producto)
    } catch (error) {
        console.log(error)
    }
}


const store = async (req, res) => {
    console.log(req.body)
    if(req.body.tipo !== "") {
        try {
            const save = new Producto(req.body);
            console.log(`esto es save ${save}`)
            console.log(save.id)
            await save.save()
            // sharp(req.file.buffer).resize(300).toFile(`./public/images/producto_${save.id}.jpg`)

        } catch (error) {
            res.status(501).json({msg: "No se puede guardar el producto", error})
        }
    }
    res.redirect('/admin/')
}

const edit = async (req, res) => {
    try {
        const producto = await Producto.find({_id: {$eq : req.params.id}})
        console.log(producto)
        res.json(producto)
        
    } catch (error) {
        console.log(error)
    }
}

const update = async (req, res) => {
    const producto = await Producto.find()
    let body = req.body
    console.log("body", body)
    Producto.updateOne({_id: body.id}, {
            $set: {
            nombre: body.nombre,
            desc: body.desc,
            precio: body.precio,
            imagen: body.imagen
        }

    },
    function(error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el cliente',
                err
            });
        } else {
            res.json(producto)
        }
    }

)}

const borrar = async (req, res) => {
    try {
        const producto = await Producto.find({_id: {$eq : req.params.id}})
        console.log(`aca... ${producto[0]}`)
        
        await Producto.findOneAndDelete({_id: producto[0].id})
        console.log(`producto.id? ${producto[0].id}`)
        res.json(producto)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {create, index, store, edit, update, borrar}