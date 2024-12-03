class SessionsViewsControllers {

    static async login(req, res) {
        const { redirect } = req.query;
        let reason = null;
        if (redirect === '/views/realtimeproducts')
            reason = '(Solo para Administradores)'
        const title = 'APP -> Inicio de Sesión🔐';
        res.render('login', { title: title, redirect: redirect, reason: reason });
    }
}

module.exports = { SessionsViewsControllers }