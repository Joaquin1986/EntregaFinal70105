const adoptionModel = require('./models/adoption.model');
const mongoose = require('mongoose');

// Clase Adoption, implementada para la entrega final del curso.
class Adoption {
    constructor(owner, pet) {
        this.owner = owner;
        this.pet = pet;
    }
}

// Clase AdoptionDao para la gestión de adopciones
class AdoptionDao {

    // Crea una nueva adopción en la BD
    static async addAdoption(adoption) {
        try {
            const newAdoption = await adoptionModel.create(adoption);
            if (newAdoption) {
                console.log(`✅ Adopción #'${newAdoption._id}' agregada exitosamente a la BD`);
                return newAdoption._id;
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo agregar la adopción en la BD => error: ${error.message}`);
        }
    }

    // Obtiene una mascota a partir de su id
    static async getAdoptionById(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                return await adoptionModel.findById(id).lean();
            }
            return undefined;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo obtener la adopción #${id}  => error: ${error.message}`)
        }
    }


    // Devuelve todos los productos creados hasta el momento en la BD
    static async getAdoptions() {
        try {
            return await adoptionModel.find().lean();
        } catch (error) {
            throw new Error(`⛔ Error al obtener todas las adopciones de la BD: ${error.message}`);
        }
    }

}

module.exports = { Adoption, AdoptionDao };