const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const db = require('./configuracion/db'); // Importar la configuración de la base de datos

const rutas = require('./rutas/index');
const port = process.env.PORT || 3001;
const swaggerSetup = require('./configuracion/swaggers'); // Importar la configuración de Swagger
const app = express();

app.use(morgan('common')); // Middleware para registrar solicitudes HTTP
// Middleware para analizar el cuerpo de las solicitudes entrantes en formato JSON
app.use(express.json());

app.use ('/api/imagenes', express.static(path.join(__dirname, '../public/img'))); // Usar las rutas importadas con el prefijo '/api'

// Importar las rutas desde el archivo rutas/index.js
app.use('/api', rutas); // Usar las rutas importadas con el prefijo '/api'
swaggerSetup(app); // Configurar Swagger para la documentación de la API
// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});