const { validationResult } = require('express-validator');
const Carrera = require('../modelos/carreras');

// Controlador para listar todas las carreras
const listarCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.findAll();
    res.json(carreras);
  } catch (error) {
    console.error('Error al listar las carreras:', error);
    res.status(500).json({ error: 'Error al listar las carreras' });
  }
};

// Controlador para obtener una carrera por su ID
const obtenerCarreraPorId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  try {
    const carrera = await Carrera.findByPk(id);
    if (!carrera) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }
    res.json(carrera);
  } catch (error) {
    console.error('Error al obtener la carrera por ID:', error);
    res.status(500).json({ error: 'Error al obtener la carrera por ID' });
  }
};

// Controlador para crear una nueva carrera
const crearCarrera = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, descripcion = null, codigo, estado = true, grado } = req.body;
  try {
    const nuevaCarrera = await Carrera.create({ nombre, descripcion, codigo, estado, grado });
    res.status(201).json(nuevaCarrera);
  } catch (error) {
    console.error('Error al crear la carrera:', error);
    res.status(500).json({ error: 'Error al crear la carrera' });
  }
};

// Controlador para actualizar una carrera existente
const actualizarCarrera = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const { nombre, descripcion, codigo, estado, grado } = req.body;
  try {
    const carrera = await Carrera.findByPk(id);
    if (!carrera) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }
    carrera.nombre = nombre;
    carrera.descripcion = descripcion;
    carrera.codigo = codigo;
    carrera.estado = estado;
    carrera.grado = grado;
    await carrera.save();
    res.json(carrera);
  } catch (error) {
    console.error('Error al actualizar la carrera:', error);
    res.status(500).json({ error: 'Error al actualizar la carrera' });
  }
};

// Controlador para eliminar una carrera
const eliminarCarrera = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  try {
    const carrera = await Carrera.findByPk(id);
    if (!carrera) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }
    await carrera.destroy();
    res.json({ message: 'Carrera eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la carrera:', error);
    res.status(500).json({ error: 'Error al eliminar la carrera' });
  }
};

module.exports = {
  listarCarreras,
  obtenerCarreraPorId,
  crearCarrera,
  actualizarCarrera,
  eliminarCarrera
};