const {Router} = require('express');
const controladorElecciones = require('../../controladores/controladorElecciones');
const {body, query} = require('express-validator');
const router = Router();

router.get('/', controladorElecciones.listarElecciones);

router.get('/id',
    query('id').notEmpty().withMessage('El id de la elección es obligatorio')
        .isInt().withMessage('El id de la elección debe ser un número entero'),
    controladorElecciones.obtenerEleccionPorId
);

router.post('/',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    controladorElecciones.crearEleccion
);

router.put('/id',
    query('id').notEmpty().withMessage('El id de la elección es obligatorio')
        .isInt().withMessage('El id de la elección debe ser un número entero'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    controladorElecciones.actualizarEleccion
);

router.delete('/id',
    query('id').notEmpty().withMessage('El id de la elección es obligatorio')
        .isInt().withMessage('El id de la elección debe ser un número entero'),
    controladorElecciones.eliminarEleccion
);

module.exports = router;
