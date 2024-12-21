const passport = require('../passport/passport');

const passportGetUser = (strategy, req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
        if (user)
            req.user = user;
    })(req, res, next);
}

module.exports = passportGetUser;