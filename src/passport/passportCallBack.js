const { createUserResponse } = require('../utils/utils');
const passport = require('../passport/passport');
const { LogoutServices } = require('../services/logout.services');

const passportCallBack = (strategy, type) => {
    return async (req, res, next) => {
        const result = await LogoutServices.getToken(req.cookies.token);    
        passport.authenticate(strategy, async (err, user, info) => {
            if (result && type === 'api') {
                return res.status(401).json(createUserResponse(401, 'No Autorizado', req, 'La sesión ya fue finalizada'));
            }
            if (result && type === 'views') {
                const redirectUrl = ("/views" + req.url);
                return res.redirect('/views/login?redirect=' + redirectUrl);
            }
            if (err) return next(err);
            if (!user && type === 'api') {
                return res.status(401).json(createUserResponse(401, 'No Autorizado', req, info.messages ? info.messages : info.toString()));
            }
            if (!user && type === 'views') {
                const redirectUrl = ("/views" + req.url);
                return res.redirect('/views/login?redirect=' + redirectUrl);
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

module.exports = { passportCallBack };