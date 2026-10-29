const {Router} = require('express');
const controladorPuestos = require('../../controladores/controladorPuestos');
const {body, query} = require('express-validator');
const router = Router();

router.get('/', controladorPuestos.listarPuestos);

router.get('/id',
    query('id').notEmpty().withMessage('El id del puesto es obligatorio')
        .isInt().withMessage('El id del puesto debe ser un número entero'),
    controladorPuestos.obtenerPuestoPorId
);

router.post('/',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('estudianteId').notEmpty().withMessage('El id del estudiante es obligatorio')
        .isInt().withMessage('El id del estudiante debe ser un número entero'),
    controladorPuestos.crearPuesto
);

router.put('/id',
    query('id').notEmpty().withMessage('El id del puesto es obligatorio')
        .isInt().withMessage('El id del puesto debe ser un número entero'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('estudianteId').notEmpty().withMessage('El id del estudiante es obligatorio')
        .isInt().withMessage('El id del estudiante debe ser un número entero'),
    controladorPuestos.actualizarPuesto
);

module.exports = router;
