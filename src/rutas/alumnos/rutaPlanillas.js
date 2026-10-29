const {Router} = require('express');
const controladorPlanillas = require('../../controladores/controladorPlanillas');
const {body, query} = require('express-validator');
const router = Router();

router.get('/', controladorPlanillas.listarPlanillas);

router.get('/id',
    query('id').notEmpty().withMessage('El id de la planilla es obligatorio')
        .isInt().withMessage('El id de la planilla debe ser un número entero'),
    controladorPlanillas.obtenerPlanillaPorId
);

router.post('/',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('carreraId').notEmpty().withMessage('El id de la carrera es obligatorio')
        .isInt().withMessage('El id de la carrera debe ser un número entero'),
    controladorPlanillas.crearPlanilla
);

router.put('/id',
    query('id').notEmpty().withMessage('El id de la planilla es obligatorio')
        .isInt().withMessage('El id de la planilla debe ser un número entero'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('carreraId').notEmpty().withMessage('El id de la carrera es obligatorio')
        .isInt().withMessage('El id de la carrera debe ser un número entero'),
    controladorPlanillas.actualizarPlanilla
);

module.exports = router;
