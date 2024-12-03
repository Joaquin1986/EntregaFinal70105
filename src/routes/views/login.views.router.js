const { Router } = require('express');
const { SessionsViewsControllers } = require('../../controllers/sessions.views.controllers');

const loginViewsRouter = Router();

loginViewsRouter.get('/login', SessionsViewsControllers.login);

module.exports = loginViewsRouter;