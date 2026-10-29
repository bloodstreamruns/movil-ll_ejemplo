const {Router} = require('express');
const router = Router();
router.use('/alumnos', require('./alumnos/rutaAlumnos')); // Importar las rutas de alumnos
router.use('/carreras', require('./rutasCarreras')); // Importar las rutas de carreras
module.exports = router;