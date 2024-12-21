const { LogoutDao } = require('../dao/logout.dao');

class LogoutServices {

    static async create(token) {
        try {
            return await LogoutDao.addToken(token);
        } catch (error) {
            throw new Error(`⛔ Error: fallo al cerrar la sesión => error: ${error.message}`)
        }
    }

    static async getToken(token) {
        try {
            return await LogoutDao.getToken(token);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo obtener el token por id => error: ${error.message}`)
        }
    }
}

module.exports = { LogoutServices };