const { UserServices } = require('../../services/user.services');
const { LogoutServices } = require('../../services/logout.services');
const { createUserResponse } = require('../../utils/utils');
const passportGetUser = require('../../passport/passportGetUser')

class SessionsController {

    static async createUser(req, res) {
        try {
            const { first_name, last_name, email, age = 1, password } = req.body;
            if (!first_name || !last_name || !email || !password)
                return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                    'Error':
                        'Petición incorrecta (faltan valores para crear el usuario)'
                }));
            const result = await UserServices.createUser("user", first_name, last_name, email, age, password);
            if (!result.error) {
                return res.status(result.code).json(createUserResponse(result.code, 'Usuario creado', req, { "newUser": result.userId }));
            }
            return res.status(result.code).json(createUserResponse(result.code, 'Error', req, { "error": result.reason }));
        } catch (error) {
            return res.status(500).json(createUserResponse(500, 'Error interno', req, { 'internalError:': error.message }));
        }
    }

    static async createAdminUser(req, res) {
        try {
            const { first_name, last_name, email, age = 1, password } = req.body;
            if (!first_name || !last_name || !email || !password)
                return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                    'Error':
                        'Petición incorrecta (faltan valores para crear el administrador)'
                }));
            const result = await UserServices.createUser("admin", first_name, last_name, email, age, password);
            if (!result.error) {
                return res.status(result.code).json(createUserResponse(result.code, 'Administrador creado', req, { "newAdmin": result.userId }));
            }
            return res.status(result.code).json(createUserResponse(result.code, 'Error', req, { "error": result.reason }));
        } catch (error) {
            return res.status(500).json(createUserResponse(500, 'Error interno', req, { 'internalError:': error.message }));
        }
    }

    static async getUser(req, res) {
        try {
            const { uid } = req.params;
            if (!uid)
                return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                    'Error':
                        'Petición incorrecta'
                }));
            const result = await UserServices.getDtoUserById(uid);
            if (result)
                return res.status(200).json(createUserResponse(200, 'Usuario encontrado', req, { "user": result }));
            return res.status(404).json(createUserResponse(404, 'Usuario no encontrado', req, {
                'Error':
                    `Usuario #${uid} no encontrado`
            }));
        } catch (error) {
            return res.status(500).json(createUserResponse(500, 'Error interno', req, { 'internalError:': error.message }));
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                    'Error':
                        'Petición incorrecta'
                }));
            const result = await UserServices.login(email, password, res);
            return res.status(result.code).json(createUserResponse(result.code, result.reason, req, result.token));
        } catch (error) {
            return res.status(500).json(createUserResponse(500, 'Error interno', req, { 'internalError:': error.message }));
        }
    }

    static async logout(req, res) {
        try {
            passportGetUser('current', req, res);
            if (req.user && req.cookies.token) {
                const originalToken = req.cookies.token;
                // Para que sea óptimo el uso de la BD, se debería implementar un proceso que limpie
                // cada cierto tiempo la colección "logouts" (ya sea a nivel de la BD, servidor, etc.)
                const result = await LogoutServices.create({ "token": originalToken });
                if (result) {
                    res.clearCookie('token', { domain: 'localhost', httpOnly: true })
                    return res.status(200).json(createUserResponse(200, "Sesión Finalizada", req, "La sesión ha sido finalizada"));
                }
                return res.status(500).json(createUserResponse(500, 'Error interno', req, {
                    'Error:':
                        'Ocurrió un error al intentar cerrar sesión -> (acceso a la DB)'
                }));
            } else {
                return res.status(400).json(createUserResponse(400, 'Sesión no iniciada', req, {
                    'Error':
                        'Sesión aún no iniciada, no es posible cerrarla'
                }));
            }
        } catch (error) {
            return res.status(500).json(createUserResponse(500, 'Error interno', req, {
                'internalError:':
                    error.message
            }));
        }
    }

    static async getCurrentSession(req, res) {
        try {
            if (req.user) {
                const result = await UserServices.getCurrentSession(req.user.userId);
                res.status(200).json(createUserResponse(200, "Autorizado", req, result));
            } else {
                return res.status(401).json(createUserResponse(401, 'No Autorizado', req, null))
            }
        } catch (error) {
            return res.status(500).json(createUserResponse(500, 'Error interno', req, { 'internalError:': error.message }));
        }
    }
}

module.exports = { SessionsController };