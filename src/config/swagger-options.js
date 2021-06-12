module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Brazil University list API',
      version: '1.0.0',
      description: 'A api for listing Brazil Universities'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ]
  },
  apis: ['./src/routes/*.js']
}
