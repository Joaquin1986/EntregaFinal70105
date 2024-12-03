const petModel = require('./models/pet.model');
const mongoose = require('mongoose');

// Clase Pet para el endpoint "/mockingpets", que genera mascotas falsas (mocking)
class Pet {
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
class PetDao {

    // Crea una nueva mascota en la BD
    static async addPet(pet) {
        try {
            const newPet = await petModel.create(pet);
            if (newPet) {
                console.log(`✅ Mascota #'${newPet._id}' agregada exitosamente a la BD`);
                return newPet._id;
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear la mascota en la BD => error: ${error.message}`);
        }
    }

    // Crea un array de mascotas en la BD
    static async addManyPets(pets) {
        try {
            const result = await petModel.create(pets);
            if (result) {
                console.log(`✅ ${pets.length} mascotas agregadas exitosamente a la BD`);
                return result;
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudieron agregar ${pets.length} mascotas a la BD => error: ${error.message}`);
        }
    }

    // Obtiene una mascota a partir de su id
    static async getPetById(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                return await petModel.findById(id).lean();
            }
            return undefined;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe la mascota #${id}  => error: ${error.message}`)
        }
    }

}

module.exports = { Pet, PetDao };
