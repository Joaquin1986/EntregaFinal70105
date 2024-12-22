const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Entrega Final de Backend III (Comisión 70105)',
            version: '1.0.1',
            description: 'Documentación que explica el funcionamiento del módulo de Usuarios y Sesiones, implementado en la Entrega Final de Backend III (Comisión 70105)'
        },
        servers: [{ url: 'http://localhost:8080' }],
    },
    apis: ['./src/docs/*.yaml'],
};

module.exports = swaggerOptions;