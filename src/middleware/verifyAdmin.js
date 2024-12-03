const passport = require('../passport/passport');
const { createUserResponse } = require('../utils/utils');

const verifyAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user || user.role.toLowerCase() !== 'admin')
        res.status(403).json(createUserResponse(403, 'Este endpoint es para usuarios administradores', req, null));
    else next();
}

const verifyViewsAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user || user.role.toLowerCase() !== 'admin') {
        const redirectUrl = ("/views" + req.url);
        return res.redirect('/views/login?redirect=' + redirectUrl);
    }
    else next();
}

module.exports = { verifyAdmin, verifyViewsAdmin };