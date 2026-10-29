const { validationResult } = require('express-validator');
exports.listarAlumnos = (req, res) => {
  // Aquí podrías obtener los alumnos desde una base de datos o cualquier otra fuente de datos
  const alumnos = [
    { id: 1, name: 'Juan' },
    { id: 2, name: 'María' },
    { id: 3, name: 'Pedro' }
  ];
  res.json(alumnos);
};
exports.inicio = (req, res) => {
  res.json({ message: 'Bienvenido a la API de movil 2' });
};
exports.obtenerAlumnoPorId = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.query;
  // Aquí podrías obtener el alumno desde una base de datos o cualquier otra fuente de datos
  const alumno = { id: parseInt(id), name: 'Juan' }; // Ejemplo de alumno
  res.json(alumno);
};
exports.crearAlumno = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  // Aquí podrías guardar el alumno en una base de datos o cualquier otra fuente de datos
  const nuevoAlumno = { id: Date.now(), name }; // Ejemplo de nuevo alumno
  res.status(201).json(nuevoAlumno);
};
exports.actualizarAlumno = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.query;
  const { name } = req.body;
  // Aquí podrías actualizar el alumno en una base de datos o cualquier otra fuente de datos
  const alumnoActualizado = { id: parseInt(id), name }; // Ejemplo de alumno actualizado
  res.json(alumnoActualizado);
};
exports.eliminarAlumno = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.query;
  // Aquí podrías eliminar el alumno desde una base de datos o cualquier otra fuente de datos
  res.json({ message: `Alumno con id ${id} eliminado` });
};