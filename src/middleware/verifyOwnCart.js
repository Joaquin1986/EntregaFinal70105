const passport = require('../passport/passport');
const { createUserResponse } = require('../utils/utils');
const { UserServices } = require('../services/user.services');

const verifyOwnCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        if (!cid)
            res.status(400).json(createUserResponse(400, 'Request incorrecto', req, null));
        const user = await UserServices.getUserById(req.user.userId);
        if (user.cart._id != cid)
            res.status(400).json(createUserResponse(400, 'Carrito no perteneciente al usuario', req, null));
        else next();
    } catch (error) {
        throw new Error("⛔ No se pudo realizar la verificación de pertenencia del carrito");

    }
}

const verifyOwnCartViews = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const user = await UserServices.getUserById(req.user.userId);
        if (user.cart._id != cid) {
            const info = "Carrito no válido ⛔";
            return res.render('errorView', { info: info });
        }
        else next();
    } catch (error) {
        throw new Error("⛔ No se pudo realizar la verificación de pertenencia del carrito");

    }
}

module.exports = { verifyOwnCart, verifyOwnCartViews };