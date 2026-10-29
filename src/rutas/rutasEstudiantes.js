const {Router} = require('express');
const controladorEstudiantes = require('../controladores/controladorEstudiantes');
const Carrera = require('../modelos/carrera');
const Estudiante = require('../modelos/estudiante');
const { body, query } = require('express-validator');
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Rutas para la gestión de estudiantes
 */
/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudiante'
 */  
router.get('/', controladorEstudiantes.listarEstudiantes);
/**
 * @swagger
 * /estudiantes/buscarid:
 *   get:
 *     summary: Obtener un estudiante por su ID
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estudiante a buscar
 *     responses:
 *       200:
 *         description: Estudiante encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: Estudiante no encontrado
 */
router.get('/buscarid', 
    query('id').notEmpty().withMessage('El ID del estudiante es obligatorio')
    .isInt().withMessage('El ID del estudiante debe ser un número entero'),
    controladorEstudiantes.obtenerEstudiantePorId);
/**
 * @swagger
 * /estudiantes/buscaridentidad:
 *   get:
 *     summary: Obtener un estudiante por su identidad
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: query
 *         name: identidad
 *         schema:
 *           type: string
 *         required: true
 *         description: Identidad del estudiante a buscar
 *     responses:
 *       200:
 *         description: Estudiante encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: Estudiante no encontrado
 */
router.get('/buscaridentidad', 
    query('identidad').notEmpty().withMessage('La identidad del estudiante es obligatoria')
    .isLength({ min: 13, max: 13 }).withMessage('La identidad del estudiante debe tener 13 caracteres'),
    controladorEstudiantes.obtenerEstudiantePorIdentidad);
/**
 * @swagger
 * /estudiantes/guardar:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: Error en la solicitud (validación fallida)
 */
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
/**
 * @swagger
 * /estudiantes/actualizar:
 *   put:
 *     summary: Actualizar un estudiante existente
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: Error en la solicitud (validación fallida)
 */
router.put('/actualizar',
  query('id').notEmpty().withMessage('El ID del estudiante es obligatorio')
  .isInt().withMessage('El ID del estudiante debe ser un número entero'),
  body('identidad').notEmpty().withMessage('La identidad del estudiante es obligatoria')
  .isLength({ min: 13, max: 13 }).withMessage('La identidad del estudiante debe tener 13 caracteres'),
  body('cuenta').notEmpty().withMessage('La cuenta del estudiante es obligatoria')
  .isLength({ min: 1, max: 10 }).withMessage('La cuenta del estudiante debe tener entre 1 y 10 caracteres'),
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
/**
 * @swagger
 * /estudiantes/eliminar:
 *   delete:
 *     summary: Eliminar un estudiante existente
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estudiante a eliminar
 *     responses:
 *       200:
 *         description: Estudiante eliminado exitosamente
 *       404:
 *         description: Estudiante no encontrado
 */
router.delete('/eliminar',
  query('id').notEmpty().withMessage('El ID del estudiante es obligatorio')
  .isInt().withMessage('El ID del estudiante debe ser un número entero'),
  controladorEstudiantes.eliminarEstudiante
);
/**
 * @swagger
 * /estudiantes/imagen:
 *   put:
 *     summary: Actualizar la imagen de un estudiante existente
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del estudiante a actualizar
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del estudiante a subir (JPEG, PNG o JPG)
 *     responses:
 *       200:
 *         description: Imagen del estudiante actualizada exitosamente
 *       400:
 *         description: Error en la solicitud (validación fallida o error de carga de archivo)
 */
router.put('/imagen/', controladorEstudiantes.validarImagenEstudiante, controladorEstudiantes.actualizarImagenEstudiante);

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del estudiante
 *         identidad:
 *           type: string
 *           description: Identidad del estudiante
 *         cuenta:
 *           type: string
 *           description: Cuenta del estudiante
 *         primerNombre:
 *           type: string
 *           description: Primer nombre del estudiante
 *         segundoNombre:
 *           type: string
 *           description: Segundo nombre del estudiante (opcional)
 *         primerApellido:
 *           type: string
 *           description: Primer apellido del estudiante
 *         segundoApellido:
 *           type: string
 *           description: Segundo apellido del estudiante (opcional)
 *         correoElectronico:
 *           type: string
 *           description: Correo electrónico del estudiante
 *         estado:
 *           type: boolean
 *           description: Estado del estudiante (activo/inactivo)
 *         imagen:
 *           type: string
 *           description: URL de la imagen del estudiante (opcional)
 *         carreraId:
 *           type: integer
 *           description: ID de la carrera asociada al estudiante
 */

module.exports = router;