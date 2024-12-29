const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Entrega Final de Backend III (Comisión 70105)',
            version: '2.0.1',
            description: 'Documentación de los Endpoints de los Módulos <b>\'Sessions/Users\'</b> y <b>\'Adoptions\'</b>'
        },
        servers: [{ url: 'http://localhost:8080' }],
    },
    apis: ['./src/docs/*.yaml'],
};

module.exports = swaggerOptions;