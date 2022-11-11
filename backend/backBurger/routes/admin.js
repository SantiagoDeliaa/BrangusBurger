const express = require('express');
const router = express.Router();
// const {create, store, edit, borrar} = require('../controller/admin/productos.js');
// const multer = require('multer')
// const upload = multer({ storage: multer.memoryStorage() })
// const sharp = require('sharp')

const controller = require('../controller/admin/productos');
const controllerAuth = require('../controller/auth/auth');


// const { route } = require('./api');


router.get('/', controllerAuth.validateToken, controller.index)



// router.post('/productos/store', upload.single('imagen'), controller.store)
router.post('/', controller.store)
router.get('/:id', controller.edit);



router.put('/', controller.update)

router.delete('/:id', controller.borrar)


module.exports = router;