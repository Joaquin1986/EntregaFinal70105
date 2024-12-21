const logoutModel = require('./models/logout.model');

// Clase Logout para el endpoint "/sessions/logout"
class Logout {
    constructor(name, specie, birthDate, adopted, owner, image) {
        this.name = name;
        this.specie = specie;
        this.birthDate = birthDate;
        this.adopted = adopted;
        this.owner = owner;
        this.image = image;
    }
}

// Clase PetDao para el manejo de mascotas
class LogoutDao {

    // Crea una nueva mascota en la BD
    static async addToken(token) {
        try {
            const newLogout = await logoutModel.create(token);
            if (newLogout) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(error)
            throw new Error(`⛔ Error: No se pudo cerrar la sesión => error: ${error.message}`);
        }
    }

    static async getToken(originalToken) {
        try {
            const result = await logoutModel.findOne({ token: originalToken }).lean();
            return result;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo buscar el token en la BD => error: ${error.message}`)
        }
    }

}

module.exports = { Logout, LogoutDao };
