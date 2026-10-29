const {Router} = require('express');
const controladorEstudiantes = require('../../controladores/controladorEstudiantes');
const Carrera = require('../../modelos/carreras');
const Estudiante = require('../../modelos/estudiante');
const { body, query } = require('express-validator');
const router = Router(); 
router.get('/', controladorEstudiantes.listarEstudiantes);

router.get('/buscarid', 
    query('id').notEmpty().withMessage('El ID del estudiante es obligatorio')
    .isInt().withMessage('El ID del estudiante debe ser un número entero'),
    controladorEstudiantes.obtenerEstudiantePorId);

router.post('/guardar',
  body('identidad').notEmpty().withMessage('La identidad del estudiante es obligatoria')
  .isLength({ min: 13, max: 13 }).withMessage('La identidad del estudiante debe tener 13 caracteres'),
  body('cuenta').notEmpty().withMessage('La cuenta del estudiante es obligatoria')
  .isLength({ min: 1, max: 20 }).withMessage('La cuenta del estudiante debe tener entre 1 y 20 caracteres'),
  body('primerNombre').notEmpty().withMessage('El primer nombre del estudiante es obligatorio')
  .isLength({ min: 3, max: 50 }).withMessage('El primer nombre del estudiante debe tener entre 3 y 50 caracteres'),
  body('segundoNombre').optional().isLength({ min: 3, max: 50 }).withMessage('El segundo nombre del estudiante debe tener entre 3 y 50 caracteres'),
  body('primerApellido').notEmpty().withMessage('El primer apellido del estudiante es obligatorio')
  .isLength({ min: 3, max: 50 }).withMessage('El primer apellido del estudiante debe tener entre 3 y 50 caracteres'),
  body('segundoApellido').optional().isLength({ min: 3, max: 50 }).withMessage('El segundo apellido del estudiante debe tener entre 3 y 50 caracteres'),
  body('correoElectronico').notEmpty().withMessage('El correo electrónico del estudiante es obligatorio')
  .isEmail().withMessage('El correo electrónico del estudiante debe ser un correo válido')
  .isLength({ max: 100 }).withMessage('El correo electrónico del estudiante debe tener un máximo de 100 caracteres')
  .custom(async (value) => {
    const estudianteExistente = await Estudiante.findOne({ where: { correoElectronico: value } });
    if (estudianteExistente) {
      throw new Error('El correo electrónico del estudiante ya está en uso');
    }
    return true;
  }),
  body('estado').optional().isBoolean().withMessage('El estado del estudiante debe ser un valor booleano'),
  body('carreraId').notEmpty().withMessage('El ID de la carrera es obligatorio')
  .isInt().withMessage('El ID de la carrera debe ser un número entero')
  .custom(async (value) => {
    const carrera = await Carrera.findByPk(value);
    if (!carrera) {
      throw new Error('La carrera con el ID proporcionado no existe');
    }
    return true;
  }),
  controladorEstudiantes.crearEstudiante
);

router.put('/actualizar',
  query('id').notEmpty().withMessage('El ID del estudiante es obligatorio')
  .isInt().withMessage('El ID del estudiante debe ser un número entero'),
  body('identidad').notEmpty().withMessage('La identidad del estudiante es obligatoria')
  .isLength({ min: 13, max: 13 }).withMessage('La identidad del estudiante debe tener 13 caracteres'),
  body('cuenta').notEmpty().withMessage('La cuenta del estudiante es obligatoria')
  .isLength({ min: 1, max: 20 }).withMessage('La cuenta del estudiante debe tener entre 1 y 20 caracteres'),
  body('primerNombre').notEmpty().withMessage('El primer nombre del estudiante es obligatorio')
  .isLength({ min: 3, max: 50 }).withMessage('El primer nombre del estudiante debe tener entre 3 y 50 caracteres'),
  body('segundoNombre').optional().isLength({ min: 3, max: 50 }).withMessage('El segundo nombre del estudiante debe tener entre 3 y 50 caracteres'),
  body('primerApellido').notEmpty().withMessage('El primer apellido del estudiante es obligatorio')
  .isLength({ min: 3, max: 50 }).withMessage('El primer apellido del estudiante debe tener entre 3 y 50 caracteres'),
  body('segundoApellido').optional().isLength({ min: 3, max: 50 }).withMessage('El segundo apellido del estudiante debe tener entre 3 y 50 caracteres'),
  body('correoElectronico').notEmpty().withMessage('El correo electrónico del estudiante es obligatorio')
  .isEmail().withMessage('El correo electrónico del estudiante debe ser un correo válido')
  .isLength({ max: 100 }).withMessage('El correo electrónico del estudiante debe tener un máximo de 100 caracteres'),
  body('estado').optional().isBoolean().withMessage('El estado del estudiante debe ser un valor booleano'),
  body('carreraId').notEmpty().withMessage('El ID de la carrera es obligatorio')
  .isInt().withMessage('El ID de la carrera debe ser un número entero'),
  controladorEstudiantes.actualizarEstudiante
);

router.delete('/eliminar',
  query('id').notEmpty().withMessage('El ID del estudiante es obligatorio')
  .isInt().withMessage('El ID del estudiante debe ser un número entero'),
  controladorEstudiantes.eliminarEstudiante
);

module.exports = router;