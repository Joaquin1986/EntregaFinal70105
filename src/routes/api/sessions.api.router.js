// Se realizan los imports mediante 'require', de acuerdo a lo visto en clase
const { Router } = require('express');
const { SessionsController } = require('../../controllers/api/sessions.api.controller');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyAdmin } = require('../../middleware/verifyAdmin');

const sessionsApiRouter = Router();

// El endpoint "/sessions/login" es para registrar los usuarios, mientras que el "/sessions/login" es 
// para realizar inicio de sesión, pasando un obj usuario en el body.
// El enpoint '/sessions/current' valida la sesión del usuario

sessionsApiRouter.post('/sessions/register', SessionsController.createUser);

// Solamente un admin puede crear a otro
sessionsApiRouter.post('/sessions/register/admin', passportCallBack('current', 'api'), verifyAdmin, SessionsController.createAdminUser);

sessionsApiRouter.post('/sessions/login', SessionsController.login);

sessionsApiRouter.post('/sessions/logout', SessionsController.logout);

sessionsApiRouter.get('/sessions/current', passportCallBack('current', 'api'), SessionsController.getCurrentSession);

// Para consulta de usuarios, sólo para Administradores (para evitar revelar información sensible)
sessionsApiRouter.get('/sessions/user/:uid', passportCallBack('current', 'api'), verifyAdmin, SessionsController.getUser);

module.exports = sessionsApiRouter;