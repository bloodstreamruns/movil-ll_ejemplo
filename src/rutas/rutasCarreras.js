const {Router} = require('express');
const controladorCarreras = require('../controladores/controladorCarreras');
const { body, query } = require('express-validator');
const router = Router();

// Ruta para obtener todas las carreras
/**
 * @swagger
 * /api/carreras:
 *   get:
 *     summary: Obtener todas las carreras
 *     tags: [Carreras]
 *     responses:
 *       200:
 *         description: Lista de carreras obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carrera'
 */
router.get('/', controladorCarreras.listarCarreras);

// Ruta para obtener una carrera por su ID
router.get('/buscarid', 
    query('id').notEmpty().withMessage('El ID de la carrera es obligatorio')
    .isInt().withMessage('El ID de la carrera debe ser un número entero'),
    controladorCarreras.obtenerCarreraPorId);

// Ruta para crear una nueva carrera
router.post('/guardar',
  body('nombre').notEmpty().withMessage('El nombre de la carrera es obligatorio')
  .isLength({ min: 3, max: 100 }).withMessage('El nombre de la carrera debe tener entre 3 y 100 caracteres'),
  body('codigo').notEmpty().withMessage('El código de la carrera es obligatorio')
  .isLength({ min: 1, max: 10 }).withMessage('El código de la carrera debe tener entre 1 y 10 caracteres'),
  body('grado').notEmpty().withMessage('El grado de la carrera es obligatorio')
  .isIn(['Licenciatura', 'Maestría', 'Doctorado']).withMessage('El grado de la carrera debe ser uno de los valores permitidos'),
  body('descripcion').optional().isLength({ min: 10, max: 255 }).withMessage('La descripción de la carrera debe ser una cadena de texto con un máximo de 255 caracteres'),
  body('estado').optional().isBoolean().withMessage('El estado de la carrera debe ser un valor booleano'),
  controladorCarreras.crearCarrera
);

// Ruta para actualizar una carrera existente
router.put('/actualizar',
  query('id').notEmpty().withMessage('El ID de la carrera es obligatorio')
  .isInt().withMessage('El ID de la carrera debe ser un número entero'),
  body('nombre').notEmpty().withMessage('El nombre de la carrera es obligatorio')
  .isLength({ min: 3, max: 100 }).withMessage('El nombre de la carrera debe tener entre 3 y 100 caracteres'),
  body('codigo').notEmpty().withMessage('El código de la carrera es obligatorio')
  .isLength({ min: 1, max: 10 }).withMessage('El código de la carrera debe tener entre 1 y 10 caracteres'),
  body('descripcion').optional().isLength({ min: 10, max: 255 }).withMessage('La descripción de la carrera debe ser una cadena de texto con un máximo de 255 caracteres'),
  body('estado').isBoolean().withMessage('El estado de la carrera debe ser un valor booleano'),
  body('grado').isIn(['Licenciatura', 'Maestría', 'Doctorado']).withMessage('El grado de la carrera debe ser uno de los valores permitidos'),
  controladorCarreras.actualizarCarrera
);

// Ruta para eliminar una carrera por su ID
router.delete('/eliminar',
  query('id').notEmpty().withMessage('El ID de la carrera es obligatorio')
  .isInt().withMessage('El ID de la carrera debe ser un número entero'),
  controladorCarreras.eliminarCarrera
);
/**
 * @swagger
 * components:
 *   schemas:
 *     Carrera:
 *       type: object
 *       required:
 *         - nombre
 *         - codigo
 *         - grado
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la carrera
 *         nombre:
 *           type: string
 *           description: Nombre de la carrera
 *         codigo:
 *           type: string
 *           description: Código de la carrera
 *         descripcion:
 *           type: string
 *           description: Descripción de la carrera
 *         estado:
 *           type: boolean
 *           description: Estado de la carrera (activo/inactivo)
 *         grado:
 *           type: string
 *           enum: [Licenciatura, Maestría, Doctorado]
 *           description: Grado académico de la carrera
 */
module.exports = router;