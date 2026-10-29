const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Carreras',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de carreras universitarias',
    },
    servers: [
      {
        url: 'http://localhost:' + process.env.PORT, // Cambia esto según tu configuración
      },
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: [ path.join(__dirname, '../rutas/rutasCarreras.js') ], // Archivos donde se encuentran las rutas con anotaciones Swagger
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};