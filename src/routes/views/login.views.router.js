const { Router } = require('express');
const { SessionsViewsController } = require('../../controllers/views/sessions.views.controller');

const loginViewsRouter = Router();

loginViewsRouter.get('/login', SessionsViewsController.login);

module.exports = loginViewsRouter;