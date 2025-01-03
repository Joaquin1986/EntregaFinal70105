const { Adoption, AdoptionDao } = require('../dao/adoption.dao');
const { PetDao } = require('../dao/pet.dao');
const { UserDao } = require('../dao/user.dao');

class AdoptionServices {

    // Devuelve todas las adopciones(por cuestiones de tiempo no se implementa, pero debería llevar Paginate)
    static async getAdoptions() {
        try {
            return await AdoptionDao.getAdoptions();
        } catch (error) {
            throw new Error(`⛔ Error al obtener las adopciones de la BD: ${error.message}`);
        }
    }

    static async getPaginatedAdoptions(criteria, options) {
        try {
            return await AdoptionDao.getPaginatedAdoptions(criteria, options);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo obtener listado de adopciones => error: ${error.message}`)
        }
    }

    // En caso de encontrarlo, devuelve un objeto 'Adoption' de acuerdo a id proporcionado por argumento.
    static async getAdoptionById(id) {
        try {
            return await AdoptionDao.getAdoptionById(id);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo obtener la adopción #${id} => error: ${error.message}`);
        }
    }

    static async createAdoption(oid, pid) {
        const ownerExists = await UserDao.getUserById(oid);
        const petExists = await PetDao.getPetById(pid);
        if (!petExists || !ownerExists)
            return {
                "payload": { "error": "Dueño o mascota no encontrados" },
                "code": 404,
                "description": "Dueño o mascota no encontrados"
            }
        if (petExists.adopted)
            return {
                "payload": { "error": "La mascota ya se encuentra adoptada" },
                "code": 409,
                "description": "Mascota adoptada"
            }
        const newAdoption = new Adoption(oid, pid)
        const result = await AdoptionDao.addAdoption(newAdoption);
        await UserDao.addPetToOwnersList(oid, pid);
        await PetDao.addOwnerToPet(pid, oid);
        return {
            "payload": { "newAdoption": result },
            "code": 201,
            "description": "Se creó la adopción"
        }
    }

}

module.exports = { AdoptionServices };