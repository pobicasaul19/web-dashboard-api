import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Writer/Editor Dashboard Site API Documentation',
      version: '1.0.0',
      description: 'Automatically generated API documentation.',
    },
    components: {
      securitySchemes: {
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
          description: 'JWT stored in an HTTP-only cookie',
        },
      },
    },
    security: [
      {
        CookieAuth: [],
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerInfo = swaggerJSDoc(swaggerOptions);

export default swaggerInfo;
