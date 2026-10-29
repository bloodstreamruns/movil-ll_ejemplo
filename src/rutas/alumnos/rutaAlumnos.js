const {Router} = require('express');
const controladorAlumnos = require('../../controladores/controladorAlumnos');
const { body, query } = require('express-validator');
const router = Router();

// Ruta para obtener todos los alumnos
router.get('/', controladorAlumnos.listarAlumnos);
// Ruta para obtener un alumno por su ID
router.get('/buscarid', 
    query('id').notEmpty().withMessage('El ID del alumno es obligatorio')
    .isInt().withMessage('El ID del alumno debe ser un número entero'),
    controladorAlumnos.obtenerAlumnoPorId);

router.post('/guardar',
  body('name').notEmpty().withMessage('El nombre del alumno es obligatorio')
  .isLength({ min: 3, max: 50 }).withMessage('El nombre del alumno debe tener entre 3 y 50 caracteres'),
  controladorAlumnos.crearAlumno
);

router.put( '/actualizar',
  query('id').notEmpty().withMessage('El ID del alumno es obligatorio')
  .isInt().withMessage('El ID del alumno debe ser un número entero'),
  body('name').notEmpty().withMessage('El nombre del alumno es obligatorio')
  .isLength({ min: 3, max: 50 }).withMessage('El nombre del alumno debe tener entre 3 y 50 caracteres'),
  controladorAlumnos.actualizarAlumno
);

router.delete( '/eliminar',
  query('id').notEmpty().withMessage('El ID del alumno es obligatorio')
  .isInt().withMessage('El ID del alumno debe ser un número entero'),
  controladorAlumnos.eliminarAlumno
);

module.exports = router;