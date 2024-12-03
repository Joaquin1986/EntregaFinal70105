const passport = require('../passport/passport');

const passportViewsCallBack = (strategy, req, res, next) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                const redirectUrl = ("/views" + req.url);
                return res.redirect('/views/login?redirect=' + redirectUrl);
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

module.exports = { passportViewsCallBack };