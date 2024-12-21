// Se definen los modulos a importar
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const passport = require('./passport/passport');

const productsApiRouter = require('./routes/api/products.api.router');
const cartsApiRouter = require('./routes/api/carts.api.router');
const sessionsApiRouter = require('./routes/api/sessions.api.router');
const mocksApiRouter = require('./routes/api/mocks.api.router');
const petsApiRouter = require('./routes/api/pets.api.router');
const productsViewsRouter = require('./routes/views/products.views.router');
const loginViewsRouter = require('./routes/views/login.views.router');
const cartsViewsRouter = require('./routes/views/carts.views.router');

const { notFound404, notFound404Views } = require('./middleware/notFound404');
const errorHandler = require('./middleware/errorHandler');

const { publicPath, viewsPath } = require("./utils/utils");

const initServer = require('./server/server');
const connectMongoDB = require('./db/mongodb');

const app = express();

initServer(app).then(() => {
    connectMongoDB();
    app
        .engine('handlebars', handlebars.engine())
        .set('views', viewsPath)
        .set('view engine', 'handlebars')
        .use(express.static(publicPath))
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(cookieParser())
        .use('/api', productsApiRouter)
        .use('/api', cartsApiRouter)
        .use('/api', sessionsApiRouter)
        .use('/api/mocks', mocksApiRouter)
        .use('/api', petsApiRouter)
        .use('/views', productsViewsRouter)
        .use('/views', loginViewsRouter)
        .use('/views', cartsViewsRouter)
        .use('/views/*', notFound404Views)
        .use('*', notFound404)
        .use(errorHandler);
});

module.exports = app;