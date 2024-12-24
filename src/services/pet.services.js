const { Pet, PetDao } = require('../dao/pet.dao');

class PetServices {

    // Devuelve todas las mascotas(por cuestiones de tiempo no se implementa, pero debería llevar Paginate)
    static async getPets() {
        try {
            return await PetDao.getPets();
        } catch (error) {
            throw new Error(`⛔ Error al obtener las mascotas de la BD: ${error.message}`);
        }
    }

    // En caso de encontrarlo, devuelve un objeto 'Pet' de acuerdo a id proporcionado por argumento.
    static async getPetById(id) {
        try {
            return await PetDao.getPetById(id);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el producto con id: ${id} => error: ${error.message}`);
        }
    }

    static async createPet(name, specie, birthDate, image, req) {
        const newPet = new Pet(name, specie, birthDate, false, image);
        if (req.file)
            newPet.image = req.file;
        const result = await PetDao.addPet(newPet);
        if (result) {
            console.log("✅Mascota Creada --> id#" + result._id);
            return {
                "error": false,
                "_id": result._id
            };
        }
        return {
            "error": true,
            "reason": "No se pudo crear la mascota solicitada"
        };
    }

    static async deletePet(id) {
        try {
            return await PetDao.deletePet(id);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo borrar la mascota => error: ${error.message}`)
        }
    }
}

module.exports = { PetServices };