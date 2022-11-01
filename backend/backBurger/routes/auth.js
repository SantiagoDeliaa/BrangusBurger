const express = require('express');
const router = express.Router();
const { body, validationResult, check} = require('express-validator');

const controllerAuth = require('../controller/auth/auth');

router.get('/login', controllerAuth.ingresar)
router.post('/login', controllerAuth.ingreso)

router.get('/logout', controllerAuth.salir)


router.get('/registro', controllerAuth.registrar)

router.post('/registro', [
    check('nombre')
        .exists()
        .withMessage('El mensaje es obligatorio')
        .isLength(5)
        .withMessage('El nombre debe ser mayor a 5 caracteres')
        .escape(),
    check('email')
        .exists()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Debe introducir un email valido')
        .escape(),
    check('password')
        .exists()
        .withMessage('La contraseña es obligatoria')
        .isLength(8)
        .withMessage('Debe tener al menos 8 caracteres')
        .escape(),

], controllerAuth.registro)

module.exports = router;
